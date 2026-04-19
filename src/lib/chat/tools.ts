// Tool schemas the assistant uses to surface extracted data + signal finalization.
// Kept loose (all optional strings) so the model never blocks on an unknown field.

import type Anthropic from "@anthropic-ai/sdk";

export interface KnownFields {
  name?: string;
  phone?: string;
  service?: string;
  nationality?: string;
  city?: string;
  budget?: string;
  urgency?: string; // immediate | soon | flexible
}

export const CHAT_TOOLS: Anthropic.Tool[] = [
  {
    name: "update_known_fields",
    description:
      "Call this EVERY time you learn new info from the customer: name, phone, service type, nationality, city, budget, urgency. Send ONLY the fields that changed or are newly known. Values must be in Arabic and taken verbatim from the customer. Do not ask the user about this tool.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "الاسم الكامل للعميل" },
        phone: {
          type: "string",
          description: "رقم الجوال كما أدخله العميل (أرقام فقط)",
        },
        service: {
          type: "string",
          description:
            "نوع الخدمة المطلوبة، مثل: عاملة منزلية، سائق خاص، طباخ، ممرضة، استقدام منشآت",
        },
        nationality: { type: "string", description: "الجنسية المفضّلة" },
        city: { type: "string", description: "المدينة" },
        budget: {
          type: "string",
          description: "الميزانية المتوقعة كنص، مثل: 1500 ر.س أو مرن",
        },
        urgency: {
          type: "string",
          enum: ["immediate", "soon", "flexible"],
          description: "درجة الاستعجال",
        },
      },
    },
  },
  {
    name: "finalize_lead",
    description:
      "Call this ONLY when the customer has explicitly confirmed they want to register their request and you have at least name + phone + service. The server will persist the lead and notify the team.",
    input_schema: {
      type: "object",
      properties: {
        confirm: {
          type: "boolean",
          description: "Must be true — the customer has confirmed registration.",
        },
      },
      required: ["confirm"],
    },
  },
];
