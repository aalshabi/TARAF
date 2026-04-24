import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/forms/LeadForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الاستقدام المنزلي | شركة الترف للاستقدام",
  description:
    "استقدام عمالة منزلية من الفلبين، إندونيسيا، بنغلاديش، كينيا، أوغندا وإثيوبيا. إجراءات سريعة وضمانات شاملة مع شركة الترف للاستقدام.",
  keywords: [
    "استقدام عاملة منزلية",
    "استقدام فلبينية",
    "استقدام إندونيسية",
    "عمالة منزلية الرياض",
    "استقدام بنغلاديشية",
  ],
  openGraph: {
    title: "الاستقدام المنزلي | شركة الترف للاستقدام",
    description:
      "عمالة منزلية مؤهلة من جنسيات متعددة مع إجراءات سريعة وضمانات شاملة",
  },
};

const nationalities = [
  {
    name: "فلبينية",
    flag: "🇵🇭",
    features: ["إجادة اللغة الإنجليزية", "خبرة في رعاية الأطفال", "مهارة عالية في التنظيف"],
  },
  {
    name: "إندونيسية",
    flag: "🇮🇩",
    features: ["مهارات طبخ متنوعة", "طيبة ومتعاونة", "خبرة في الأعمال المنزلية"],
  },
  {
    name: "بنغلاديشية",
    flag: "🇧🇩",
    features: ["اجتهاد وإخلاص في العمل", "تكلفة مناسبة", "سرعة في التعلم"],
  },
  {
    name: "كينية",
    flag: "🇰🇪",
    features: ["إجادة اللغة الإنجليزية", "لياقة بدنية عالية", "تعامل ممتاز مع الأطفال"],
  },
  {
    name: "أوغندية",
    flag: "🇺🇬",
    features: ["نشاط وحيوية", "مهارات متنوعة", "سهلة التأقلم"],
  },
  {
    name: "إثيوبية",
    flag: "🇪🇹",
    features: ["أمانة والتزام", "خبرة في الطبخ", "قدرة على تعدد المهام"],
  },
];

const steps = [
  {
    number: "01",
    title: "تقديم الطلب",
    description:
      "أرسل طلبك عبر الموقع أو تواصل معنا مباشرة. حدد الجنسية المفضلة والمتطلبات الخاصة بك.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "الاختيار والمطابقة",
    description:
      "نعرض عليك سير ذاتية مرشحات مطابقة لمتطلباتك. يمكنك إجراء مقابلة مرئية مع المرشحة.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "الإجراءات والتأشيرة",
    description:
      "نتكفل بجميع الإجراءات الحكومية: التأشيرة، الفحص الطبي، توثيق العقد، وتدريب العاملة.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "الوصول والتسليم",
    description:
      "نستقبل العاملة في المطار ونسلمها لك بعد التأكد من جاهزيتها الكاملة. متابعة مستمرة بعد التسليم.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const guarantees = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "ضمان الاستبدال",
    description: "استبدال مجاني خلال فترة الضمان في حال عدم ملاءمة العاملة",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
    title: "فحص طبي شامل",
    description: "جميع العمالة تخضع لفحوصات طبية شاملة قبل السفر وبعد الوصول",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "تدريب وتأهيل",
    description: "برنامج تدريبي متكامل لتأهيل العاملة على المهام المطلوبة",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "متابعة مستمرة",
    description: "فريق دعم مخصص للمتابعة معك بعد التسليم وحل أي مشكلات",
  },
];

export default function DomesticRecruitmentPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-navy via-[#0d2a52] to-[#003366] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-start">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
                <span className="text-green text-sm font-medium">
                  جنسيات متعددة متوفرة
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                الاستقدام المنزلي
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-3 font-medium">
                عمالة مؤهلة من أفضل الجنسيات بإجراءات سريعة وموثوقة
              </p>
              <p
                className="text-base text-white/50 tracking-wide mb-10"
                style={{ fontFamily: "var(--font-en)" }}
              >
                Domestic Recruitment Services
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
                >
                  قدّم طلب استقدام
                  <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#nationalities"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  استعرض الجنسيات
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/cleaning.png"
                  alt="عمالة منزلية مؤهلة"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nationalities Section */}
      <section id="nationalities" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              الجنسيات المتوفرة
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              نوفر عمالة منزلية مؤهلة من جنسيات متنوعة لتلبية كافة احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {nationalities.map((nat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray/10 p-6 md:p-8 hover:shadow-lg hover:border-blue/20 transition-all group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-4xl">{nat.flag}</span>
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-blue transition-colors">
                    {nat.name}
                  </h3>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {nat.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-green shrink-0 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#lead-form"
                  className="inline-flex items-center gap-1 text-blue text-sm font-semibold hover:underline"
                >
                  اطلب الآن
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              خطوات الاستقدام
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              عملية بسيطة وواضحة من الطلب حتى التسليم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connector line - hidden on mobile and last item */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -left-4 w-8 h-0.5 bg-blue/20" />
                )}

                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray/5 text-center h-full">
                  <div className="w-14 h-14 bg-blue/5 rounded-2xl flex items-center justify-center text-blue mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-blue mb-2" style={{ fontFamily: "var(--font-en)" }}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              ضماناتنا لك
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              نلتزم بتقديم خدمة موثوقة مدعومة بضمانات حقيقية لراحة بالك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {guarantees.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 bg-light/50 rounded-2xl p-6 md:p-8 border border-gray/5"
              >
                <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center text-green shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 md:py-24 bg-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                قدّم طلب استقدام الآن
              </h2>
              <p className="text-gray text-lg mb-8 leading-relaxed">
                أرسل بياناتك وسيتواصل معك مستشارنا لمساعدتك في اختيار الأنسب
                لاحتياجات أسرتك.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium">إجراءات سريعة ومبسطة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium">ضمان استبدال شامل</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium">أسعار تنافسية وشفافة</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray/10 p-6 md:p-8 shadow-sm">
              <LeadForm source="domestic-recruitment" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-bl from-navy via-[#0d2a52] to-[#003366] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ابدأ رحلة الاستقدام اليوم
          </h2>
          <p className="text-blue-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            آلاف الأسر السعودية تثق بشركة الترف للاستقدام. انضم إليهم واستمتع بخدمة
            موثوقة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
            >
              قدّم طلبك الآن
            </a>
            <a
              href="tel:920018173"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
