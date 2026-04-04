const features = [
  {
    title: 'ترخيص ومطابقة كاملة',
    description: 'مرخّصون من وزارة الموارد البشرية ونلتزم بكافة الأنظمة والتشريعات.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'سرعة في الإنجاز',
    description: 'إجراءات سريعة ومتابعة حثيثة لضمان وصول العمالة في أقصر وقت ممكن.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'ضمان فترة التجربة',
    description: 'فترة ضمان شاملة مع إمكانية الاستبدال لضمان رضاك التام عن الخدمة.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-7.54 0" />
      </svg>
    ),
  },
  {
    title: 'متابعة مستمرة',
    description: 'فريق متخصص للمتابعة معك بعد وصول العمالة وحل أي تحديات.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Quote Card */}
          <div className="bg-navy rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-6 end-6 w-24 h-24 border-2 border-white rounded-full" />
              <div className="absolute bottom-10 start-10 w-16 h-16 border-2 border-white rounded-full" />
            </div>

            <div className="relative">
              {/* Quote mark */}
              <svg className="w-12 h-12 text-gold/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              <p className="text-white text-xl sm:text-2xl leading-relaxed font-medium mb-8">
                نؤمن في الترف بأن الاستقدام ليس مجرّد خدمة، بل هو شراكة ثقة بيننا وبين عملائنا. نختار بعناية، ننفّذ بإتقان، ونتابع بحرص.
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  ت
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">إدارة الترف للاستقدام</div>
                  <div className="text-white/50 text-xs">رؤيتنا وفلسفتنا</div>
                </div>
              </div>

              {/* Gold bottom line */}
              <div className="absolute bottom-0 start-0 end-0 h-1 bg-gradient-to-l from-gold to-gold/30 -mb-8 sm:-mb-10 rounded-full" />
            </div>
          </div>

          {/* Features List */}
          <div>
            <span className="font-[var(--font-en)] text-blue text-sm font-semibold tracking-widest uppercase">
              WHY AL TARAF
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3 mb-4">
              لماذا يختارنا العملاء؟
            </h2>
            <p className="text-gray text-base mb-8">
              نتميّز بمعايير عالية في كل مرحلة من مراحل الاستقدام لنضمن لك تجربة استثنائية.
            </p>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center group-hover:bg-blue group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy mb-1">{feature.title}</h3>
                    <p className="text-gray text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
