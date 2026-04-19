// Official Musaned (Istiqdam) license for Al Taraf Recruitment.
// Single source of truth — imported anywhere the license info is shown.

export const LICENSE = {
  number: "40011044",
  commercialRegister: "7005691352", // CR (رقم السجل التجاري)
  unifiedCallNumber: "920018173", // Unified 920 customer service number
  establishmentKind: { ar: "شركة", en: "Company" },
  licenseClass: {
    ar: "شركة استقدام عمالة منزلية (صغيرة)",
    en: "Domestic labor small recruitment company",
  },
  // ISO date so formatting is consistent; displayed as DD/MM/YYYY in the UI.
  endDate: "2031-04-19",
  // QR payload — the customer can verify the license against Musaned.
  // Use the official verification URL when known; falls back to a human-readable label.
  qrPayload: "https://musaned.com.sa/license/40011044",
} as const;

// Company formation data from the Articles of Association (نظام الأساس)
// Source: Ministry of Commerce request #851324, modified 2025/09/07.
export const COMPANY = {
  name: {
    ar: "شركة الترف للاستقدام",
    en: "Al Taraf Recruitment Company",
  },
  legalForm: {
    ar: "شركة مساهمة مقفلة",
    en: "Closed Joint Stock Company",
  },
  headquarters: { ar: "الرياض", en: "Riyadh" },
  durationUnlimited: true,
  capital: {
    totalSar: 5_000_000,
    shareCount: 500_000,
    sharePriceSar: 10,
  },
  fiscalYear: { ar: "1 يناير — 31 ديسمبر", en: "1 Jan — 31 Dec" },
  board: [
    {
      nameAr: "عبدالله فهد بن فراج السبيعي",
      nameEn: "Abdullah Fahad bin Faraj Al-Subaie",
      roleAr: "رئيس مجلس الإدارة",
      roleEn: "Chairman",
    },
    {
      nameAr: "خزنه فهد بن فراج السبيعي",
      nameEn: "Khazna Fahad bin Faraj Al-Subaie",
      roleAr: "نائب رئيس مجلس الإدارة",
      roleEn: "Vice Chairman",
    },
    {
      nameAr: "سلطان فهد بن فراج السبيعي",
      nameEn: "Sultan Fahad bin Faraj Al-Subaie",
      roleAr: "عضو مجلس الإدارة",
      roleEn: "Board Member",
    },
  ],
} as const;

// Intl-formatted capital, e.g. "٥٬٠٠٠٬٠٠٠" with Arabic grouping.
export function formatCapitalSar(locale: "ar" | "en" = "ar"): string {
  const n = COMPANY.capital.totalSar;
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US").format(n);
}

export function formatLicenseEndDate(): string {
  const [y, m, d] = LICENSE.endDate.split("-");
  return `${d}/${m}/${y}`;
}
