const testimonials = [
  {
    name: 'أحمد المالكي',
    city: 'الرياض',
    initial: 'أ',
    text: 'تعاملت مع الترف للاستقدام وكانت التجربة ممتازة من البداية للنهاية. سرعة في الإنجاز واحترافية عالية في التعامل. أنصح الجميع بالتعامل معهم.',
    rating: 5,
  },
  {
    name: 'نورة العتيبي',
    city: 'جدة',
    initial: 'ن',
    text: 'خدمة التأجير الشهري ممتازة جداً. وفّرت عليّ كثير وقت وجهد. العاملة المنزلية كانت مدرّبة ومحترفة. شكراً الترف على هذه الخدمة المميزة.',
    rating: 5,
  },
  {
    name: 'فهد الشمري',
    city: 'الدمام',
    initial: 'ف',
    text: 'من أفضل مكاتب الاستقدام اللي تعاملت معها. المتابعة كانت مستمرة حتى بعد وصول العامل. فريق عمل محترم ومتعاون. تجربة أكثر من رائعة.',
    rating: 5,
  },
]

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-light py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-[var(--font-en)] text-blue text-sm font-semibold tracking-widest uppercase">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3 mb-4">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-gray text-base sm:text-lg max-w-2xl mx-auto">
            آراء حقيقية من عملاء استفادوا من خدماتنا وتجربتهم معنا
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal text-sm sm:text-base leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue/10 text-blue flex items-center justify-center font-bold text-sm">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">{t.name}</div>
                  <div className="text-gray text-xs">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
