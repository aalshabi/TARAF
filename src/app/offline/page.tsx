import Link from "next/link";

export const metadata = {
  title: "لا يوجد اتصال | الترف",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="pt-[72px] min-h-[calc(100vh-72px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-light flex items-center justify-center">
          <svg className="w-10 h-10 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5zM3 3l18 18" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-3">لا يوجد اتصال بالإنترنت</h1>
        <p className="text-gray mb-8">يبدو أنك غير متصل حالياً. تحقق من اتصالك وحاول مرة أخرى.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue/90 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
