// Official Musaned (Istiqdam) license for Al Taraf Recruitment.
// Single source of truth — imported anywhere the license info is shown.

export const LICENSE = {
  number: "40011044",
  unifiedNumber: "7005691352", // Saudi unified (700) number
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

export function formatLicenseEndDate(): string {
  const [y, m, d] = LICENSE.endDate.split("-");
  return `${d}/${m}/${y}`;
}
