import Link from "next/link";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "آلية العمل", href: "#how-it-works" },
  { label: "لماذا الترف", href: "#why-us" },
  { label: "تواصل معنا", href: "#contact" },
];

const serviceLinks = [
  { label: "العمالة المنزلية", href: "/services/domestic" },
  { label: "التأجير الشهري", href: "/services/monthly-rental" },
  { label: "الخدمات المميزة", href: "/services/premium" },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com/AlTaraf_Sa",
    color: "bg-black text-white",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/Altaraf_sa",
    color: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "https://snapchat.com/add/AlTaraf_sa",
    color: "bg-[#FFFC00] text-black",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
        <path d="M496.9 366.6c-3.4-9.2-9.8-14.1-17.1-18.2-1.4-.8-2.8-1.5-4.3-2.3-8.8-4.7-18-9.2-20.7-14.7-2.4-5 .3-14.1 3-23.5 6.9-24.2 16.4-57.3-4.3-78.5-12.4-12.7-30.3-18.7-56.2-18.7-16.1 0-30.5 2.5-39.4 4.3-2.3.5-5 1-6.4 1.1.2-16.5-.4-43.7-4.6-67C339 107.9 316 51.3 272.6 22.2 257.6 12.5 240.9 7.5 223.1 7.5c-33.8 0-65.5 18.4-88.7 51.8-20.3 29.2-34.1 68.1-40 112.8-11.8-.9-30.6-1.5-46.9 4.3-19.5 6.9-32 21.3-36.2 41.6-4.5 21.7 2.8 44.7 9.8 62.7.8 2.2 1.6 4.3 2.3 6.3 2.6 7.6 1.4 10.8-.6 15.5-.6 1.3-1.2 2.7-1.7 4.2-7.4 20.6-5.9 37.3 4.7 51.2 9 11.8 24.2 20.2 42.7 24.4 5 1.1 10.1 1.9 15 2.5-1.7 4.4-3.2 10.8-1.2 18.4 3 11.1 11.9 19.2 25.7 23.4 10.9 3.3 21.2 3.3 30 3.3 6.2 0 11.9-.1 17-1 15.5-2.7 28.5-10.1 41.1-17.3 10.8-6.1 22-12.5 35.5-15.5 5.7-1.2 11.3-1.9 16.6-1.9 14.5 0 27.4 4.3 40 8.5 15 5 30.5 10.2 48.3 10.2 18.5 0 33.3-7.1 42.8-20.6 8.2-11.6 10.6-26.7 7-43.6-.3-1.6-.7-3.2-1.1-4.6 4.9-.8 9.9-1.8 14.8-3.4 21.4-7 34.8-21.2 38.8-41.2 2.9-14.5.4-28.5-5.7-45.1z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@AlTaraf_sa",
    color: "bg-[#FF0000] text-white",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white border-t-4 border-gold">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-2">شركة الترف للاستقدام</h3>
            <p
              className="text-xs text-gold/80 tracking-wider font-medium mb-4"
              style={{ fontFamily: "var(--font-en)" }}
            >
              AL TARAF RECRUITMENT
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              استقدام بثقة، خدمة بتميز. حلول استقدام متكاملة للأسر والمنشآت
              السعودية بمعايير عالية من الجودة والاحترافية.
            </p>
            <a
              href="https://altaraf.com.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-gold hover:text-gold/80 transition-colors"
              style={{ fontFamily: "var(--font-en)" }}
            >
              altaraf.com.sa
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${s.color} hover:opacity-80 transition-opacity shadow-lg`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <a
                  href="https://maps.app.goo.gl/MD9o6cibHTnqbPoM8?g_st=iwb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  الرياض - حي الحمراء - طريق الامام عبدالله بن سعود بن عبدالعزيز
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+966543222787"
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                    dir="ltr"
                  >
                    +966 543222787
                  </a>
                  <a
                    href="tel:+966543220105"
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                    dir="ltr"
                  >
                    +966 543220105
                  </a>
                  <a
                    href="tel:+966114222267"
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                    dir="ltr"
                  >
                    +966 114222267
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:Info@altaraf.com.sa"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                  dir="ltr"
                >
                  Info@altaraf.com.sa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; 2026 شركة الترف للاستقدام. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              مرخصة من وزارة الموارد البشرية
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              مسجلة في مساند
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
