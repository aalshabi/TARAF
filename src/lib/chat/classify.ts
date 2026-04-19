import type { KnownFields } from "./tools";

// Deterministic hot/warm/cold classification — runs on the server AFTER the
// model has extracted fields, so the decision cannot be tampered with by
// prompt injection.
//
// hot:   enough info to serve + urgency signal (immediate/soon) + contact
// warm:  contactable + at least 3 fields filled (intent visible)
// cold:  missing contact or fewer than 3 fields (tire-kicker / curiosity)
export type Classification = "hot" | "warm" | "cold";

const URGENT = new Set(["immediate", "soon"]);

export function classifyLead(f: KnownFields): Classification {
  const hasContact = !!(f.name && f.phone);
  const filled = [
    f.name,
    f.phone,
    f.service,
    f.nationality,
    f.city,
    f.budget,
    f.urgency,
  ].filter((v) => typeof v === "string" && v.trim().length > 0).length;

  const urgent = !!(f.urgency && URGENT.has(f.urgency));

  if (hasContact && filled >= 6 && urgent) return "hot";
  if (hasContact && filled >= 3) return "warm";
  return "cold";
}

// Map chat classification onto the existing `priority` column so the admin
// dashboard's priority filter continues to work without schema churn.
export function classificationToPriority(c: Classification): string {
  switch (c) {
    case "hot":
      return "high";
    case "warm":
      return "normal";
    case "cold":
      return "low";
  }
}

// Assign a team based on service string — mirrors /api/leads/route.ts so
// chat leads land in the same operational bucket as form leads.
export function assignTeam(service: string): string {
  const a = ["عاملة منزلية", "سائق خاص", "ممرض", "ممرضة", "طباخ", "طباخة"];
  const b = ["استقدام منشآت", "شركات", "تأجير شهري"];
  if (a.some((s) => service.includes(s))) return "team_a";
  if (b.some((s) => service.includes(s))) return "team_b";
  return "team_a";
}
