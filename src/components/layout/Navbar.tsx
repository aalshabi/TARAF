"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  { label: "العمالة المنزلية", href: "/services/domestic" },
  { label: "التأجير الشهري", href: "/services/monthly-rental" },
  { label: "الخدمات المميزة", href: "/services/premium" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-shadow duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="شركة ترف"
            width={40}
            height={40}
            className="rounded-md"
          />
          <div className="leading-tight">
            <span className="block text-navy font-bold text-base">
              شركة ترف
            </span>
            <span
              className="block text-gray text-[10px] tracking-wider font-medium"
              style={{ fontFamily: "var(--font-en)" }}
            >
              AL TARAF RECRUITMENT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-navy hover:text-blue transition-colors"
          >
            الرئيسية
          </Link>

          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="text-sm font-medium text-navy hover:text-blue transition-colors flex items-center gap-1"
            >
              خدماتنا
              <svg
                className={`w-4 h-4 transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full mt-2 start-0 w-52 bg-white rounded-xl shadow-xl border border-light py-2 animate-in fade-in slide-in-from-top-2">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-navy hover:bg-light hover:text-blue transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="#how-it-works"
            className="text-sm font-medium text-navy hover:text-blue transition-colors"
          >
            آلية العمل
          </Link>
          <Link
            href="#why-us"
            className="text-sm font-medium text-navy hover:text-blue transition-colors"
          >
            لماذا الترف
          </Link>
          <Link
            href="#contact"
            className="text-sm font-semibold text-white bg-blue hover:bg-blue/90 px-5 py-2.5 rounded-lg transition-colors"
          >
            تواصل معنا
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-navy hover:bg-light transition-colors"
          aria-label="فتح القائمة"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto">
          <div className="flex flex-col p-6 gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-4 text-base font-medium text-navy hover:bg-light rounded-lg transition-colors"
            >
              الرئيسية
            </Link>

            {/* Mobile Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full py-3 px-4 text-base font-medium text-navy hover:bg-light rounded-lg transition-colors flex items-center justify-between"
              >
                خدماتنا
                <svg
                  className={`w-4 h-4 transition-transform ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="mr-4 border-r-2 border-light">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-4 text-sm text-gray hover:text-blue transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-4 text-base font-medium text-navy hover:bg-light rounded-lg transition-colors"
            >
              آلية العمل
            </Link>
            <Link
              href="#why-us"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-4 text-base font-medium text-navy hover:bg-light rounded-lg transition-colors"
            >
              لماذا الترف
            </Link>

            <div className="mt-4 px-4">
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center text-base font-semibold text-white bg-blue hover:bg-blue/90 py-3 rounded-lg transition-colors"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
