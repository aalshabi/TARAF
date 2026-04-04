import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/forms/LeadForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الخدمات المميزة | شركة ترف للاستقدام",
  description:
    "خدمات استقدام مميزة تشمل التمريض المنزلي، الطهاة المحترفين، الحراسة الأمنية، وخدمات VIP. جودة استثنائية لعملائنا المميزين.",
  keywords: [
    "تمريض منزلي",
    "طباخ خاص",
    "حراسة أمنية",
    "خدمات VIP",
    "استقدام مميز",
  ],
  openGraph: {
    title: "الخدمات المميزة | شركة ترف للاستقدام",
    description: "خدمات استثنائية لأسلوب حياة راقٍ",
  },
};

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "التمريض المنزلي",
    subtitle: "Home Nursing",
    description:
      "رعاية طبية متخصصة في منزلك. ممرضات وممرضون مؤهلون لتقديم أفضل رعاية صحية لكبار السن والحالات الخاصة.",
    features: [
      "ممرضات مرخصات ومعتمدات",
      "رعاية كبار السن على مدار الساعة",
      "متابعة الأدوية والعلامات الحيوية",
      "رعاية ما بعد العمليات",
      "تقارير صحية دورية للعائلة",
      "تنسيق مع الطبيب المعالج",
    ],
    color: "blue" as const,
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
      </svg>
    ),
    title: "الطهاة المحترفون",
    subtitle: "Professional Chefs",
    description:
      "طهاة محترفون من مختلف المطابخ العالمية. وجبات راقية يومياً في منزلك بأعلى معايير الجودة والنظافة.",
    features: [
      "طهاة متخصصون في المطابخ العالمية",
      "قوائم طعام مخصصة حسب ذوقك",
      "خبرة في المطبخ العربي والغربي والآسيوي",
      "الالتزام بمعايير السلامة الغذائية",
      "إمكانية طلب وجبات للمناسبات",
      "مرونة في أوقات العمل",
    ],
    color: "gold" as const,
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "حراسة أمنية",
    subtitle: "Security Services",
    description:
      "حراسة أمنية احترافية لمنزلك أو منشأتك. حراس مدربون على أعلى المستويات لضمان أمانك وسلامة عائلتك.",
    features: [
      "حراس أمن مدربون ومرخصون",
      "مراقبة على مدار الساعة",
      "تدريب على إدارة الأزمات",
      "كفاءة في التعامل مع التقنيات الأمنية",
      "تقارير أمنية دورية",
      "تنسيق مع الجهات الأمنية عند الحاجة",
    ],
    color: "navy" as const,
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "خدمات VIP",
    subtitle: "VIP Services",
    description:
      "خدمات حصرية مصممة خصيصاً لعملائنا المميزين. من المساعد الشخصي إلى إدارة المنزل الكاملة بأعلى مستويات الفخامة.",
    features: [
      "مساعد شخصي متعدد اللغات",
      "إدارة كاملة لشؤون المنزل",
      "خدمة كونسيرج خاصة",
      "تنسيق السفر والمواعيد",
      "مدير حساب مخصص على مدار الساعة",
      "سرية تامة وخصوصية مطلقة",
    ],
    color: "gold" as const,
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue/5",
    icon: "text-blue",
    border: "border-blue/20",
    badge: "bg-blue/10 text-blue",
  },
  gold: {
    bg: "bg-gold/5",
    icon: "text-gold",
    border: "border-gold/20",
    badge: "bg-gold/10 text-gold",
  },
  navy: {
    bg: "bg-navy/5",
    icon: "text-navy",
    border: "border-navy/20",
    badge: "bg-navy/10 text-navy",
  },
};

export default function PremiumServicesPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-[#1a0a2e] via-navy to-[#0d2a52] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gold/20">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-gold text-sm font-medium">
                خدمات حصرية
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              الخدمات المميزة
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-3 font-medium">
              خدمات استثنائية لأسلوب حياة راقٍ
            </p>
            <p
              className="text-base text-white/50 tracking-wide mb-10"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Premium Services
            </p>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
            >
              استكشف الخدمات
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              خدمات مصممة للتميز
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              نقدم مجموعة من الخدمات المتخصصة التي تلبي أعلى معايير الجودة
              والاحترافية
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {services.map((service, idx) => {
              const colors = colorMap[service.color];
              const isReversed = idx % 2 !== 0;
              const isNursing = service.title === "التمريض المنزلي";

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border ${colors.border} overflow-hidden`}
                >
                  {/* Nursing Service Image Banner */}
                  {isNursing && (
                    <div className="relative h-56 md:h-64 w-full">
                      <Image
                        src="/images/elderly-care.png"
                        alt="رعاية كبار السن - التمريض المنزلي"
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>
                  )}

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-5 gap-0 ${
                      isReversed ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Info side */}
                    <div
                      className={`col-span-3 p-6 md:p-10 ${
                        isReversed ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div
                          className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center ${colors.icon} shrink-0`}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-charcoal">
                            {service.title}
                          </h3>
                          <p
                            className="text-gray text-sm mt-1"
                            style={{ fontFamily: "var(--font-en)" }}
                          >
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <a
                        href="#lead-form"
                        className="inline-flex items-center gap-2 bg-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue/90 transition-colors"
                      >
                        اطلب الخدمة
                        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>

                    {/* Features side */}
                    <div
                      className={`col-span-2 ${colors.bg} p-6 md:p-10 ${
                        isReversed ? "lg:order-1" : ""
                      }`}
                    >
                      <h4 className="text-lg font-bold text-charcoal mb-4">
                        مميزات الخدمة
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <svg
                              className={`w-5 h-5 ${colors.icon} shrink-0 mt-0.5`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-charcoal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Premium */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              لماذا تختار خدماتنا المميزة؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                ),
                title: "كفاءات مختارة",
                description: "نختار أفضل الكفاءات من خلال عملية فحص صارمة",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "دعم 24/7",
                description: "فريق دعم متاح على مدار الساعة لخدمتك",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: "خصوصية تامة",
                description: "نضمن سرية بياناتك وخصوصية عائلتك",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                ),
                title: "جودة استثنائية",
                description: "معايير عالية في الاختيار والتدريب والمتابعة",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow border border-gray/5"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                اطلب خدمتك المميزة
              </h2>
              <p className="text-gray text-lg mb-8 leading-relaxed">
                أخبرنا عن احتياجاتك وسنقوم بتصميم الحل المثالي لك. فريقنا
                المتخصص جاهز لمساعدتك.
              </p>
              <div className="bg-light/50 rounded-2xl p-6 border border-gray/10">
                <h4 className="font-bold text-charcoal mb-3">
                  ماذا تتوقع بعد إرسال الطلب؟
                </h4>
                <ol className="space-y-3 text-gray">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </span>
                    <span>تواصل خلال ساعات قليلة لفهم احتياجاتك بدقة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </span>
                    <span>عرض مفصل يشمل الخيارات والأسعار</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </span>
                    <span>ترشيح أفضل الكفاءات المناسبة لمتطلباتك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      4
                    </span>
                    <span>بدء الخدمة في أسرع وقت ممكن</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-light/50 rounded-2xl border border-gray/10 p-6 md:p-8">
              <LeadForm source="premium-services" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-bl from-[#1a0a2e] via-navy to-[#0d2a52] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            تستحق الأفضل
          </h2>
          <p className="text-blue-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            دع فريق الترف يعتني بالتفاصيل حتى تتفرغ لما يهمك فعلاً
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
            >
              اطلب الآن
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
