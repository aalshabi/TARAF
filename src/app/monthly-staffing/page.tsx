import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/forms/LeadForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "التأجير الشهري للعمالة | الترف للاستقدام",
  description:
    "حلول تأجير عمالة شهرية مرنة بدون كفالة. عمالة منزلية، سائقين، وطاقم متكامل باشتراك شهري واضح. استبدال فوري خلال 48 ساعة.",
  keywords: [
    "تأجير شهري",
    "عمالة شهرية",
    "تأجير عمالة",
    "بدون كفالة",
    "استقدام الرياض",
  ],
  openGraph: {
    title: "التأجير الشهري للعمالة | الترف للاستقدام",
    description:
      "حلول مرنة بدون التزام طويل - اشتراك شهري واضح بدون رسوم مخفية",
  },
};

const trustItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    text: "بدون كفالة",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    text: "عقود مرنة",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: "استبدال فوري",
  },
];

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    title: "مرونة كاملة",
    description: "غيّر أو أوقف الخدمة في أي وقت بدون غرامات أو شروط جزائية",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "بدون تعقيد",
    description: "لا تأشيرة، لا كفالة، لا إجراءات طويلة - نتكفل بكل شيء",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "استبدال فوري",
    description: "عامل بديل خلال 48 ساعة في حال عدم الرضا أو أي مشكلة",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "تكلفة شفافة",
    description: "اشتراك شهري واضح بدون رسوم مخفية أو تكاليف إضافية",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
    title: "فحص وتأهيل",
    description: "جميع العمالة مفحوصة صحياً ومؤهلة مهنياً قبل التعيين",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "متابعة مستمرة",
    description: "فريق دعم مخصص لخدمتك على مدار الساعة لضمان رضاك التام",
  },
];

const plans = [
  {
    name: "عمالة منزلية شهرية",
    description: "عاملة منزلية مدربة للتنظيف والطبخ وخدمة الأسرة",
    features: [
      "عاملة مدربة ومؤهلة",
      "تأمين صحي شامل",
      "استبدال خلال 48 ساعة",
      "متابعة دورية من فريقنا",
    ],
    popular: false,
  },
  {
    name: "سائق شهري",
    description: "سائق خاص محترف ملتزم بأعلى معايير السلامة",
    features: [
      "سائق مرخص ومعتمد",
      "معرفة كاملة بالمدينة",
      "التزام بمواعيد محددة",
      "سيارة مؤمنة ومفحوصة",
    ],
    popular: true,
  },
  {
    name: "طاقم متكامل",
    description: "حزمة شاملة تجمع عاملة وسائق وطباخ حسب احتياجك",
    features: [
      "طاقم متناسق ومدرب",
      "توفير كبير مقارنة بالأفراد",
      "مدير حساب مخصص",
      "عقد موحد مبسط",
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "ما هي مدة العقد الأدنى؟",
    answer:
      "الحد الأدنى للعقد شهر واحد فقط. يمكنك التجديد شهرياً أو الإلغاء في أي وقت بإشعار مسبق قبل نهاية الشهر الحالي.",
  },
  {
    question: "ماذا لو لم أكن راضياً عن العامل؟",
    answer:
      "نوفر استبدال فوري خلال 48 ساعة في حال عدم الرضا. هدفنا رضاك التام ونعمل على إيجاد البديل المناسب فوراً.",
  },
  {
    question: "هل الأسعار تشمل التأمين الصحي والإقامة؟",
    answer:
      "نعم، الاشتراك الشهري يشمل كل شيء: راتب العامل، التأمين الصحي، تصاريح العمل، والإقامة. لا توجد رسوم مخفية.",
  },
  {
    question: "هل يمكنني اختيار جنسية العامل؟",
    answer:
      "بالتأكيد، نوفر عمالة من جنسيات متعددة تشمل الفلبين، إندونيسيا، بنغلاديش، كينيا وغيرها. يمكنك تحديد الجنسية المفضلة عند الطلب.",
  },
  {
    question: "كم يستغرق توفير العمالة بعد التعاقد؟",
    answer:
      "عادة يتم توفير العمالة خلال 3-7 أيام عمل من تأكيد العقد. في الحالات العاجلة يمكن توفير عمالة خلال 24-48 ساعة.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-gray/10 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer p-5 md:p-6 bg-white hover:bg-light/50 transition-colors">
        <span className="text-base md:text-lg font-semibold text-charcoal pr-4">
          {question}
        </span>
        <svg
          className="w-5 h-5 text-blue shrink-0 transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-5 pb-5 md:px-6 md:pb-6 text-gray leading-relaxed">
        {answer}
      </div>
    </details>
  );
}

export default function MonthlyStaffingPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-navy via-[#0d2a52] to-[#003366] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-sm font-medium">
                الخدمة الأكثر طلباً
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              التأجير الشهري للعمالة
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-3 font-medium">
              حلول مرنة بدون التزام طويل
            </p>
            <p
              className="text-base text-white/50 tracking-wide mb-10"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Monthly Staffing Solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
              >
                احصل على عرض سعر
                <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://wa.me/966543222787"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-light">
            {trustItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 py-5 md:py-6"
              >
                <div className="text-blue">{item.icon}</div>
                <span className="text-base md:text-lg font-semibold text-charcoal">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12 md:mb-16">
            <div className="text-center lg:text-start">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                لماذا التأجير الشهري؟
              </h2>
              <p className="text-gray text-lg max-w-2xl">
                نوفر لك حلول عمالة مرنة تتكيف مع احتياجاتك بدون تعقيدات الاستقدام
                التقليدي
              </p>
            </div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mx-auto lg:mx-0 max-w-md lg:max-w-none">
              <Image
                src="/images/cleaning.png"
                alt="خدمات التأجير الشهري للعمالة المنزلية"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray/5"
              >
                <div className="w-14 h-14 bg-blue/5 rounded-xl flex items-center justify-center text-blue mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing-like Plans */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              باقات التأجير الشهري
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              اختر الباقة المناسبة لاحتياجاتك وتواصل معنا للحصول على أفضل الأسعار
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 md:p-8 border-2 transition-shadow ${
                  plan.popular
                    ? "border-blue shadow-lg shadow-blue/10"
                    : "border-gray/10 hover:border-blue/30 hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-blue text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      الأكثر طلباً
                    </span>
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green shrink-0 mt-0.5"
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
                      <span className="text-charcoal text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#lead-form"
                  className={`block w-full text-center font-bold py-3.5 rounded-xl transition-colors ${
                    plan.popular
                      ? "bg-blue text-white hover:bg-blue/90"
                      : "bg-light text-navy hover:bg-blue hover:text-white"
                  }`}
                >
                  تواصل للأسعار
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-gray text-lg">
              إجابات على أكثر الأسئلة شيوعاً حول خدمة التأجير الشهري
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                احصل على عرض سعر مجاني
              </h2>
              <p className="text-gray text-lg mb-8 leading-relaxed">
                أرسل بياناتك وسيتواصل معك فريقنا خلال ساعات قليلة لتقديم أفضل
                عرض يناسب احتياجاتك.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium">استشارة مجانية بدون التزام</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium">رد سريع خلال ساعات</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-charcoal font-medium">عرض سعر مفصل ومخصص</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-light/50 rounded-2xl border border-gray/10 p-6 md:p-8">
              <LeadForm source="monthly-staffing" defaultService="تأجير شهري" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-bl from-navy via-[#0d2a52] to-[#003366] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            جاهز لتوفير وقتك وجهدك؟
          </h2>
          <p className="text-blue-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            انضم لأكثر من 500 عميل يثقون بخدمات الترف للتأجير الشهري
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
            >
              ابدأ الآن
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
