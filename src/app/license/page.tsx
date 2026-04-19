import type { Metadata } from "next";
import QRCode from "qrcode";
import {
  COMPANY,
  LICENSE,
  formatCapitalSar,
  formatLicenseEndDate,
} from "@/lib/license";

export const metadata: Metadata = {
  title: `ترخيص شركة الترف للاستقدام | #${LICENSE.number}`,
  description:
    "ترخيص رسمي من وزارة الموارد البشرية والتنمية الاجتماعية — منصة مساند (استقدام).",
  alternates: { canonical: "/license" },
};

// Server-side QR generation keeps the bundle small and works without JS.
async function renderQrSvg(): Promise<string> {
  return QRCode.toString(LICENSE.qrPayload, {
    type: "svg",
    margin: 1,
    width: 220,
    errorCorrectionLevel: "M",
    color: { dark: "#0A1F3F", light: "#FFFFFF" },
  });
}

export default async function LicensePage() {
  const qrSvg = await renderQrSvg();
  const endDate = formatLicenseEndDate();

  return (
    <div className="min-h-screen bg-light/40 pt-[88px] pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            شهادة الترخيص
          </h1>
          <p className="mt-2 text-sm text-gray">
            ترخيص رسمي من وزارة الموارد البشرية والتنمية الاجتماعية — منصة مساند
          </p>
        </header>

        {/* Certificate card — mirrors the Musaned certificate layout */}
        <article className="bg-white rounded-2xl shadow-sm border border-light overflow-hidden">
          {/* Top ribbon */}
          <div className="grid grid-cols-3 items-center gap-4 p-6 sm:p-8 border-b border-light">
            {/* Istiqdam logo — text placeholder (brand mark) */}
            <div className="text-start">
              <div
                className="text-2xl font-bold text-green"
                style={{ fontFamily: "var(--font-en)" }}
              >
                ISTIQDAM
              </div>
              <div className="text-sm text-green font-medium">إستقدام</div>
            </div>

            {/* License number — centered box */}
            <div className="justify-self-center text-center border-2 border-navy rounded-lg px-5 py-3 min-w-[180px]">
              <div className="flex items-center justify-center gap-2 text-xs text-gray mb-1">
                <span>الترخيص #</span>
                <span style={{ fontFamily: "var(--font-en)" }}>/ License #</span>
              </div>
              <div
                className="text-xl font-bold text-navy tracking-wide"
                style={{ fontFamily: "var(--font-en)" }}
              >
                {LICENSE.number}
              </div>
            </div>

            {/* Ministry mark */}
            <div className="text-end">
              <div className="text-[11px] sm:text-xs text-navy font-semibold leading-snug">
                الموارد البشرية
                <br />
                والتنمية الاجتماعية
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div className="px-6 sm:px-8 py-4 border-b border-light text-center text-sm text-charcoal/80">
            ترخيص شركة الترف للاستقدام
          </div>

          {/* Details grid (bilingual, RTL + LTR side by side) */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 p-6 sm:p-8">
            <Field
              labelEn="Establishment Kind"
              labelAr="نوع المنشأة"
              valueEn={LICENSE.establishmentKind.en}
              valueAr={LICENSE.establishmentKind.ar}
            />
            <Field
              labelEn="License Class"
              labelAr="فئة الترخيص"
              valueEn={LICENSE.licenseClass.en}
              valueAr={LICENSE.licenseClass.ar}
            />
            <Field
              labelEn="License End Date"
              labelAr="تاريخ انتهاء الترخيص"
              valueEn={endDate}
              valueAr={endDate}
            />
            <Field
              labelEn="Commercial Register"
              labelAr="رقم السجل التجاري"
              valueEn={LICENSE.commercialRegister}
              valueAr={LICENSE.commercialRegister}
            />
          </dl>

          {/* QR block */}
          <div className="border-t border-light p-6 sm:p-8 text-center">
            <p className="text-sm text-charcoal/80 mb-2">
              رجاء استخدام الرمز المعرّف للتحقق من صلاحية شهادة الترخيص والاطلاع على معلومات المنشأة
            </p>
            <p
              className="text-xs text-gray mb-5"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Please use the QR code to verify the license certificate and view establishment information
            </p>

            <div
              className="mx-auto inline-block p-3 bg-white border border-light rounded-lg"
              aria-label={`رمز QR للترخيص ${LICENSE.number}`}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />

            <div className="mt-5 pt-5 border-t border-light">
              <p className="text-xs text-gray">
                خدمة معتمدة من وزارة الموارد البشرية والتنمية الاجتماعية
              </p>
              <p
                className="text-[11px] text-gray/80 mt-1"
                style={{ fontFamily: "var(--font-en)" }}
              >
                A verified service from the Ministry of Human Resources and Social Development
              </p>
            </div>
          </div>
        </article>

        <p className="text-center text-xs text-gray mt-6">
          للتحقق المباشر، امسح الرمز أعلاه أو زر منصة مساند.
        </p>

        {/* Company formation details — from the Articles of Association */}
        <article className="mt-8 bg-white rounded-2xl shadow-sm border border-light overflow-hidden">
          <header className="px-6 sm:px-8 py-5 border-b border-light">
            <h2 className="text-lg font-bold text-navy">بيانات تأسيس الشركة</h2>
            <p
              className="text-xs text-gray mt-1"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Company Formation Details
            </p>
          </header>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 p-6 sm:p-8">
            <Field
              labelEn="Company Name"
              labelAr="اسم الشركة"
              valueEn={COMPANY.name.en}
              valueAr={COMPANY.name.ar}
            />
            <Field
              labelEn="Legal Form"
              labelAr="الشكل القانوني"
              valueEn={COMPANY.legalForm.en}
              valueAr={COMPANY.legalForm.ar}
            />
            <Field
              labelEn="Headquarters"
              labelAr="المركز الرئيسي"
              valueEn={COMPANY.headquarters.en}
              valueAr={COMPANY.headquarters.ar}
            />
            <Field
              labelEn="Company Duration"
              labelAr="مدة الشركة"
              valueEn="Unlimited"
              valueAr="غير محددة"
            />
            <Field
              labelEn="Issued Capital"
              labelAr="رأس المال المصدر"
              valueEn={`SAR ${formatCapitalSar("en")}`}
              valueAr={`${formatCapitalSar("ar")} ريال سعودي`}
            />
            <Field
              labelEn="Shares"
              labelAr="الأسهم"
              valueEn={`${COMPANY.capital.shareCount.toLocaleString("en-US")} shares · SAR ${COMPANY.capital.sharePriceSar}`}
              valueAr={`${COMPANY.capital.shareCount.toLocaleString("ar-SA")} سهم • ${COMPANY.capital.sharePriceSar} ريال للسهم`}
            />
            <Field
              labelEn="Fiscal Year"
              labelAr="السنة المالية"
              valueEn={COMPANY.fiscalYear.en}
              valueAr={COMPANY.fiscalYear.ar}
            />
            <Field
              labelEn="Commercial Register"
              labelAr="رقم السجل التجاري"
              valueEn={LICENSE.commercialRegister}
              valueAr={LICENSE.commercialRegister}
            />
          </dl>

          {/* Board of Directors */}
          <div className="border-t border-light p-6 sm:p-8">
            <h3 className="text-sm font-bold text-navy mb-4">مجلس الإدارة</h3>
            <ul className="space-y-3">
              {COMPANY.board.map((m) => (
                <li
                  key={m.nameAr}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl border border-light bg-light/40"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy truncate">
                      {m.nameAr}
                    </p>
                    <p
                      className="text-[11px] text-gray mt-0.5 truncate"
                      style={{ fontFamily: "var(--font-en)" }}
                    >
                      {m.nameEn}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-blue bg-blue/10 px-2.5 py-1 rounded-full">
                    {m.roleAr}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

function Field({
  labelEn,
  labelAr,
  valueEn,
  valueAr,
}: {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}) {
  return (
    <>
      <div className="text-start">
        <dt
          className="text-xs text-gray mb-1"
          style={{ fontFamily: "var(--font-en)" }}
        >
          {labelEn}
        </dt>
        <dd
          className="text-sm font-semibold text-navy"
          style={{ fontFamily: "var(--font-en)" }}
        >
          {valueEn}
        </dd>
      </div>
      <div className="text-end">
        <dt className="text-xs text-gray mb-1">{labelAr}</dt>
        <dd className="text-sm font-semibold text-navy">{valueAr}</dd>
      </div>
    </>
  );
}
