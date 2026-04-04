import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'

export default function Hero() {
  return (
    <section
      className="pt-[72px] min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 40%, #EDF2F9 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green/10 text-green text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green inline-block" />
              مرخّص من وزارة الموارد البشرية
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
              استقدام بثقة.
              <br />
              خدمة بتميز.
            </h1>

            {/* English subtitle */}
            <p
              className="font-[var(--font-en)] text-gray text-sm sm:text-base tracking-wide mb-4"
            >
              Trusted Recruitment. Exceptional Service.
            </p>

            {/* Description */}
            <p className="text-gray text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              نوفّر لك حلول استقدام متكاملة بأعلى معايير الجودة والموثوقية.
              من اختيار العمالة إلى المتابعة بعد الوصول، نحن معك في كل خطوة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue hover:bg-blue/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                ابدأ طلبك الآن
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+966XXXXXXXXX"
                className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                اتصل بنا
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                مرخّص رسمياً
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                تقييم 4.9/5
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                خدمة على مدار الساعة
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Gradient top border */}
              <div className="h-1.5 bg-gradient-to-l from-blue to-gold" />
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-navy mb-1">احصل على استشارة مجانية</h2>
                <p className="text-gray text-sm mb-6">أدخل بياناتك وسنتواصل معك خلال 24 ساعة</p>
                <LeadForm source="home" compact={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
