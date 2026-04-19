import Link from "next/link";
import {
  STATUS_DESCRIPTIONS_AR,
  STATUS_LABELS_AR,
  type OrderDTO,
  type OrderStatus,
} from "@/lib/orders";
import { formatArDateTime } from "@/lib/format";
import StatusStepper from "./StatusStepper";
import AttachmentList from "./AttachmentList";
import InfoGrid from "./InfoGrid";
import Timeline from "./Timeline";

const STATUS_BADGE: Record<OrderStatus, string> = {
  new: "bg-gray-100 text-gray-700",
  under_review: "bg-amber-100 text-amber-800",
  approved: "bg-blue-100 text-blue",
  in_progress: "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

interface Props {
  order: OrderDTO;
  showShareLink?: boolean;
}

export default function OrderDetailsCard({ order, showShareLink = false }: Props) {
  const ageRange =
    order.ageFrom && order.ageTo
      ? `${order.ageFrom} – ${order.ageTo} سنة`
      : order.ageFrom
      ? `${order.ageFrom}+ سنة`
      : null;

  const customerRows = [
    { label: "اسم العميل", value: order.customerName },
    { label: "رقم الهوية / السجل", value: order.nationalIdMasked },
    { label: "رقم الجوال", value: order.phoneMasked },
    { label: "البريد الإلكتروني", value: order.email },
    { label: "المدينة", value: order.city },
    { label: "المنطقة", value: order.region },
  ];

  const requestRows = [
    { label: "المهنة المطلوبة", value: order.profession },
    { label: "الجنسية", value: order.nationality },
    { label: "الجنس", value: order.gender === "female" ? "أنثى" : order.gender === "male" ? "ذكر" : "" },
    { label: "الفئة العمرية", value: ageRange },
    { label: "الراتب المتوقع", value: order.expectedSalary ? `${order.expectedSalary} ر.س` : null },
    { label: "سنوات الخبرة", value: order.experienceYears ? `${order.experienceYears}+ سنوات` : null },
    { label: "اللغة", value: order.language },
    { label: "مدة العقد", value: order.contractMonths ? `${order.contractMonths} شهراً` : null },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="rounded-2xl border border-light bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-gray">رقم الطلب</p>
            <h2 className="text-xl sm:text-2xl font-bold text-navy mt-1">
              {order.orderNumber}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray">
              <span>أُنشئ في {formatArDateTime(order.createdAt)}</span>
              <span className="w-1 h-1 rounded-full bg-gray/50" aria-hidden />
              <span>آخر تحديث {formatArDateTime(order.updatedAt)}</span>
            </div>
          </div>

          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
              STATUS_BADGE[order.status]
            }`}
          >
            {STATUS_LABELS_AR[order.status]}
          </span>
        </div>

        <p className="mt-4 text-sm text-charcoal/80">
          {STATUS_DESCRIPTIONS_AR[order.status]}
        </p>

        {order.hasMissingDocs && order.status !== "completed" && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
          >
            <strong className="font-semibold">تنبيه:</strong> يوجد مستندات ناقصة في هذا الطلب. الرجاء استكمالها لتسريع الإجراء.
          </div>
        )}

        <div className="mt-6">
          <StatusStepper current={order.status} />
        </div>

        {showShareLink && (
          <div className="mt-5 pt-4 border-t border-light">
            <Link
              href={`/orders/${order.orderNumber}`}
              className="text-xs font-semibold text-blue hover:underline"
            >
              رابط مباشر للطلب ←
            </Link>
          </div>
        )}
      </div>

      {/* Two-column details on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoGrid title="بيانات العميل" rows={customerRows} />
        <InfoGrid title="تفاصيل طلب الاستقدام" rows={requestRows} />
      </div>

      {/* Attachments */}
      <section className="rounded-2xl border border-light bg-white p-5 sm:p-6">
        <h3 className="text-base font-bold text-navy mb-4">المرفقات</h3>
        <AttachmentList attachments={order.attachments} />
      </section>

      {/* Timeline */}
      <section className="rounded-2xl border border-light bg-white p-5 sm:p-6">
        <h3 className="text-base font-bold text-navy mb-4">سجل المتابعة</h3>
        <Timeline events={order.events} />
      </section>
    </div>
  );
}
