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
} as const;

// Minimal company identity used in the footer copyright line.
export const COMPANY = {
  name: { ar: "شركة الترف للاستقدام", en: "Al Taraf Recruitment Company" },
  legalForm: { ar: "شركة مساهمة مقفلة", en: "Closed Joint Stock Company" },
} as const;

export function formatLicenseEndDate(): string {
  const [y, m, d] = LICENSE.endDate.split("-");
  return `${d}/${m}/${y}`;
}
