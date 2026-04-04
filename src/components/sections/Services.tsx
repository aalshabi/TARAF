import Link from 'next/link'

const services = [
  {
    title: 'العمالة المنزلية',
    description: 'استقدام عمالة منزلية مؤهّلة من أفضل الجنسيات بإجراءات سريعة وموثوقة.',
    href: '/domestic-recruitment',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'السائقون الخاصون',
    description: 'سائقون محترفون مرخّصون لخدمتك وخدمة عائلتك بأمان واحترافية.',
    href: '/domestic-recruitment',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h3.068c.297 0 .582.118.792.328l2.016 2.016a1.125 1.125 0 00.792.328H14.25M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h9.346c.297 0 .582.118.792.328l4.908 4.908c.21.21.328.495.328.792v5.972" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'التمريض المنزلي',
    description: 'ممرضون وممرضات بخبرة عالية للرعاية الصحية المنزلية على مدار الساعة.',
    href: '/premium-services',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'الطهاة المحترفون',
    description: 'طهاة محترفون من مختلف المطابخ العالمية لتلبية ذوقك الخاص.',
    href: '/premium-services',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'حراسة أمنية',
    description: 'حراس أمن مدرّبون لحماية منزلك ومنشأتك بأعلى معايير الأمان.',
    href: '/premium-services',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'التأجير الشهري',
    description: 'عمالة بنظام التأجير الشهري المرن بدون التزام طويل الأمد. الحل الأمثل.',
    href: '/monthly-staffing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    highlight: true,
  },
]

export default function Services() {
  return (
    <section className="bg-light py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-[var(--font-en)] text-blue text-sm font-semibold tracking-widest uppercase">
            SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3 mb-4">
            خدمات تغطي كل احتياجاتك
          </h2>
          <p className="text-gray text-base sm:text-lg max-w-2xl mx-auto">
            نقدّم مجموعة شاملة من خدمات الاستقدام والتوظيف لتلبية احتياجاتك المنزلية والتجارية
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.href}
              className={`group relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-r-4 border-r-transparent hover:border-r-blue ${
                service.highlight
                  ? 'ring-2 ring-gold/50 shadow-md'
                  : 'shadow-sm'
              }`}
            >
              {/* Highlight Badge */}
              {service.highlight && (
                <span className="absolute -top-3 start-6 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                  الأكثر طلباً
                </span>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center mb-5 group-hover:bg-blue group-hover:text-white transition-colors">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-gray text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Arrow */}
              <span className="inline-flex items-center gap-1 text-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                اعرف المزيد
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
