import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { SYSTEM_PROMPT } from "@/lib/chat/prompt";
import { CHAT_TOOLS, type KnownFields } from "@/lib/chat/tools";
import {
  assignTeam,
  classifyLead,
  classificationToPriority,
} from "@/lib/chat/classify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  sessionId: string;
  messages: ClientMessage[];
  known?: KnownFields;
}

interface ResponseBody {
  reply: string;
  known: KnownFields;
  finalized: boolean;
  classification?: "hot" | "warm" | "cold";
  error?: string;
}

// Merge fields from tool calls on top of whatever the client already knows,
// letting the client keep a single source of truth for extracted data.
function mergeFields(base: KnownFields, incoming: Partial<KnownFields>): KnownFields {
  const out: KnownFields = { ...base };
  for (const k of Object.keys(incoming) as (keyof KnownFields)[]) {
    const v = incoming[k];
    if (typeof v === "string" && v.trim().length > 0) out[k] = v.trim();
  }
  return out;
}

async function persistLead(
  sessionId: string,
  fields: KnownFields,
  classification: "hot" | "warm" | "cold",
  transcript: ClientMessage[],
): Promise<void> {
  // Defensive: we never persist without contact info.
  if (!fields.name || !fields.phone || !fields.service) return;

  const priority = classificationToPriority(classification);
  const team = assignTeam(fields.service);
  const notesParts: string[] = [];
  if (fields.nationality) notesParts.push(`الجنسية: ${fields.nationality}`);
  if (fields.budget) notesParts.push(`الميزانية: ${fields.budget}`);
  if (fields.urgency) notesParts.push(`الاستعجال: ${fields.urgency}`);
  const notes = notesParts.join(" • ");

  const existing = await prisma.lead.findFirst({ where: { sessionId } });

  const data = {
    name: fields.name,
    phone: fields.phone,
    service: fields.service,
    notes,
    source: "chat",
    status: "qualified",
    priority,
    team,
    sessionId,
    classification,
    city: fields.city ?? "",
    nationality: fields.nationality ?? "",
    budget: fields.budget ?? "",
    urgency: fields.urgency ?? "",
    transcript: JSON.stringify(transcript),
  };

  if (existing) {
    await prisma.lead.update({ where: { id: existing.id }, data });
  } else {
    await prisma.lead.create({ data });
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not configured");
    return NextResponse.json<ResponseBody>(
      {
        reply:
          "عذراً، خدمة المستشار غير متاحة حالياً. يمكنك التواصل معنا عبر الواتساب ونساعدك فوراً.",
        known: {},
        finalized: false,
        error: "missing_api_key",
      },
      { status: 503 },
    );
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { sessionId, messages } = body;
  if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Basic sanity: cap history to avoid runaway costs on abused sessions.
  const safeMessages = messages.slice(-40).map((m) => ({
    role: m.role,
    content: String(m.content ?? "").slice(0, 4000),
  }));

  const client = new Anthropic({ apiKey });
  let known = body.known ?? {};
  let finalizeRequested = false;

  try {
    // One round-trip: send history + tool results back until the model stops
    // calling tools. In practice the model issues at most one or two tool
    // calls per turn (update_known_fields and optionally finalize_lead).
    let conversation: Anthropic.MessageParam[] = safeMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let finalText = "";

    for (let hop = 0; hop < 4; hop++) {
      const resp = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools: CHAT_TOOLS,
        messages: conversation,
      });

      const toolUses: Anthropic.ToolUseBlock[] = [];
      const textChunks: string[] = [];
      for (const block of resp.content) {
        if (block.type === "text") textChunks.push(block.text);
        else if (block.type === "tool_use") toolUses.push(block);
      }
      finalText = textChunks.join("\n").trim();

      if (toolUses.length === 0 || resp.stop_reason !== "tool_use") {
        break; // model is done
      }

      // Append assistant turn + synthetic tool results, then loop.
      conversation = [
        ...conversation,
        { role: "assistant", content: resp.content },
        {
          role: "user",
          content: toolUses.map<Anthropic.ToolResultBlockParam>((u) => {
            if (u.name === "update_known_fields") {
              known = mergeFields(known, (u.input as KnownFields) ?? {});
              return {
                type: "tool_result",
                tool_use_id: u.id,
                content: "ok",
              };
            }
            if (u.name === "finalize_lead") {
              finalizeRequested = true;
              return {
                type: "tool_result",
                tool_use_id: u.id,
                content: "ok",
              };
            }
            return {
              type: "tool_result",
              tool_use_id: u.id,
              content: "unknown tool",
              is_error: true,
            };
          }),
        },
      ];
    }

    // Decide whether to persist. We also auto-save when enough info is present
    // even if the model didn't call finalize_lead, so the sales team never
    // loses a qualified lead due to a missed tool call.
    const classification = classifyLead(known);
    const shouldPersist =
      finalizeRequested ||
      (classification !== "cold" && !!known.name && !!known.phone && !!known.service);

    let persisted = false;
    if (shouldPersist) {
      try {
        await persistLead(sessionId, known, classification, safeMessages);
        persisted = true;
      } catch (e) {
        console.error("persistLead failed:", e);
      }
    }

    return NextResponse.json<ResponseBody>({
      reply:
        finalText ||
        "تم استلام طلبك. سيتواصل معك فريق الترف قريباً، شكراً لك.",
      known,
      finalized: persisted,
      classification: shouldPersist ? classification : undefined,
    });
  } catch (err) {
    console.error("chat endpoint error:", err);
    return NextResponse.json<ResponseBody>(
      {
        reply:
          "عذراً، حدث اضطراب في الخدمة. يمكنك إعادة المحاولة أو التواصل عبر الواتساب.",
        known,
        finalized: false,
        error: "upstream_error",
      },
      { status: 502 },
    );
  }
}
