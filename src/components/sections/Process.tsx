const steps = [
  {
    number: '01',
    title: 'تقديم الطلب',
    description: 'قدّم طلبك عبر الموقع أو تواصل معنا مباشرة. نستقبل طلبك ونفهم احتياجاتك بالتفصيل.',
  },
  {
    number: '02',
    title: 'الاختيار والتوثيق',
    description: 'نعرض عليك أفضل المرشحين المناسبين ونتولّى جميع إجراءات التوثيق والتأشيرات.',
  },
  {
    number: '03',
    title: 'الوصول والاستلام',
    description: 'نتابع رحلة العامل من بلده حتى وصوله إليك مع ضمان جاهزيته الكاملة للعمل.',
  },
  {
    number: '04',
    title: 'متابعة وضمان',
    description: 'نبقى معك بعد الاستلام بمتابعة مستمرة وفترة ضمان شاملة لراحة بالك.',
  },
]

export default function Process() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-[var(--font-en)] text-blue text-sm font-semibold tracking-widest uppercase">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3 mb-4">
            أربع خطوات فقط
          </h2>
          <p className="text-gray text-base sm:text-lg max-w-2xl mx-auto">
            نجعل عملية الاستقدام سهلة وشفافة من البداية إلى النهاية
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connector Line (desktop only) */}
          <div className="hidden lg:block absolute top-16 start-[12.5%] end-[12.5%] h-0.5 bg-gradient-to-l from-blue via-gold to-blue opacity-20" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Big Faded Number */}
              <div className="font-[var(--font-en)] text-7xl sm:text-8xl font-bold text-navy/5 leading-none select-none mb-0">
                {step.number}
              </div>

              {/* Step Circle */}
              <div className="relative -mt-10 mx-auto w-12 h-12 rounded-full bg-blue text-white flex items-center justify-center font-[var(--font-en)] font-bold text-sm mb-5 ring-4 ring-blue/10 group-hover:ring-blue/25 transition-all z-10">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-gray text-sm leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
