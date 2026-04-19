// Shared contracts & helpers for the "track order" feature.
// Re-used by the API route, the client pages, and any future admin UI.

export type OrderStatus =
  | "new"
  | "under_review"
  | "approved"
  | "in_progress"
  | "completed"
  | "rejected";

export type AttachmentStatus = "uploaded" | "missing" | "rejected" | "approved";

export interface AttachmentDTO {
  id: string;
  kind: string;
  label: string;
  status: AttachmentStatus;
  url: string;
  createdAt: string;
}

export interface StatusEventDTO {
  id: string;
  status: OrderStatus;
  note: string;
  createdAt: string;
}

export interface OrderDTO {
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;

  // Customer (some fields partially masked for privacy on public lookup)
  customerName: string;
  nationalIdMasked: string;
  phoneMasked: string;
  email: string;
  city: string;
  region: string;

  // Request details
  profession: string;
  nationality: string;
  gender: string;
  ageFrom: number | null;
  ageTo: number | null;
  expectedSalary: number | null;
  experienceYears: number | null;
  language: string;
  contractMonths: number | null;

  attachments: AttachmentDTO[];
  events: StatusEventDTO[];

  hasMissingDocs: boolean;
}

// Ordered list of the "happy path" stages shown in the stepper.
// `rejected` is handled separately as a terminal error state.
export const STATUS_FLOW: OrderStatus[] = [
  "new",
  "under_review",
  "approved",
  "in_progress",
  "completed",
];

export const STATUS_LABELS_AR: Record<OrderStatus, string> = {
  new: "جديد",
  under_review: "مراجعة",
  approved: "اعتماد",
  in_progress: "تحت الإجراء",
  completed: "مكتمل",
  rejected: "مرفوض",
};

export const STATUS_DESCRIPTIONS_AR: Record<OrderStatus, string> = {
  new: "تم استلام طلبك وهو قيد الإعداد.",
  under_review: "يقوم فريقنا بمراجعة بياناتك ومستنداتك.",
  approved: "تم اعتماد طلبك وسيُبدأ تنفيذه قريباً.",
  in_progress: "طلبك تحت التنفيذ حالياً.",
  completed: "اكتمل طلبك بنجاح.",
  rejected: "تم إيقاف الطلب. تواصل معنا لمعرفة التفاصيل.",
};

// Partial masking — keep only the last 4 digits visible.
export function maskDigits(value: string, visible = 4): string {
  const digits = (value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= visible) return digits;
  const tail = digits.slice(-visible);
  return "*".repeat(Math.max(0, digits.length - visible)) + tail;
}

// Accepts order number or national ID / CR. Trims spaces, removes dashes.
export function normalizeQuery(raw: string): string {
  return (raw || "").trim().replace(/\s+/g, "").toUpperCase();
}

// Validates the input client-side so we can show useful errors before hitting the API.
export function validateQuery(raw: string): { ok: true } | { ok: false; message: string } {
  const q = normalizeQuery(raw);
  if (!q) return { ok: false, message: "الرجاء إدخال رقم الطلب أو رقم الهوية." };
  if (q.length < 6) return { ok: false, message: "المُدخل قصير جداً. تأكد من صحة الرقم." };
  // Either a TRF-YYYY-NNNN pattern or a 10-digit numeric ID / CR.
  const isOrderNo = /^TRF-\d{4}-\d{3,6}$/.test(q);
  const isNumericId = /^\d{9,15}$/.test(q);
  if (!isOrderNo && !isNumericId) {
    return {
      ok: false,
      message: "الصيغة غير صحيحة. مثال: TRF-2026-0001 أو رقم هوية مكوّن من 10 أرقام.",
    };
  }
  return { ok: true };
}
