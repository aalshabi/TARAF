const stats = [
  { number: '5,000', prefix: '+', suffix: '', label: 'عميل مستفيد' },
  { number: '15', prefix: '+', suffix: '', label: 'جنسية متاحة' },
  { number: '98', prefix: '', suffix: '%', label: 'نسبة رضا العملاء' },
  { number: '10', prefix: '+', suffix: '', label: 'سنوات خبرة' },
]

export default function Stats() {
  return (
    <section className="bg-navy py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-[var(--font-en)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                <span className="text-gold">{stat.prefix}</span>
                {stat.number}
                <span className="text-gold">{stat.suffix}</span>
              </div>
              <div className="text-white/70 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
