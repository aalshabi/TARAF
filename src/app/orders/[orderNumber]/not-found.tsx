import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light/40 pt-[120px] pb-16 px-4">
      <div className="max-w-lg mx-auto text-center bg-white rounded-2xl border border-light p-8">
        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-navy mb-2">رقم الطلب غير موجود</h1>
        <p className="text-sm text-gray mb-6">
          تأكد من رقم الطلب أو جرّب البحث برقم الهوية الوطنية من صفحة المتابعة.
        </p>
        <Link
          href="/track-order"
          className="inline-block px-5 py-3 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-blue/90 transition-colors"
        >
          الذهاب إلى متابعة الطلب
        </Link>
      </div>
    </div>
  );
}
