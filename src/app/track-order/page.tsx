import type { Metadata } from "next";
import { Suspense } from "react";
import TrackForm from "@/components/orders/TrackForm";
import TrackResults from "@/components/orders/TrackResults";
import { normalizeQuery } from "@/lib/orders";

export const metadata: Metadata = {
  title: "متابعة الطلب | شركة الترف للاستقدام",
  description:
    "تابع حالة طلب الاستقدام الخاص بك عبر رقم الطلب أو رقم الهوية الوطنية. اعرض المرفقات والتحديثات وحمّل المستندات.",
  alternates: { canonical: "/track-order" },
  openGraph: {
    title: "متابعة الطلب | شركة الترف للاستقدام",
    description:
      "تابع حالة طلب الاستقدام الخاص بك خطوة بخطوة.",
    locale: "ar_SA",
    type: "website",
  },
};

// Next 15+ makes searchParams a Promise in server components.
interface Props {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function TrackOrderPage({ searchParams }: Props) {
  const sp = await searchParams;
  const rawQ = Array.isArray(sp.q) ? sp.q[0] : sp.q ?? "";
  const q = normalizeQuery(rawQ);

  return (
    <div className="min-h-screen bg-light/40 pt-[88px] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">متابعة الطلب</h1>
          <p className="mt-2 text-sm sm:text-base text-gray max-w-xl mx-auto">
            أدخل رقم طلبك أو رقم الهوية الوطنية لعرض حالة طلب الاستقدام الخاص بك والمستندات المرفوعة.
          </p>
        </header>

        {/* Search + results share a Suspense because TrackForm reads useSearchParams() */}
        <Suspense fallback={null}>
          <div className="bg-white rounded-2xl shadow-sm border border-light p-5 sm:p-6 mb-6">
            <TrackForm initialValue={q} />
          </div>
          <TrackResults query={q} />
        </Suspense>
      </div>
    </div>
  );
}
