"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "altaraf-install-dismissed";

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOS, setShowIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");

    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        // @ts-expect-error iOS Safari nonstandard
        window.navigator.standalone === true
    );

    const ua = navigator.userAgent;
    const isApple = /iPad|iPhone|iPod/.test(ua) && !/MSStream/.test(ua);
    setIsIOS(isApple);

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    const onInstalled = () => {
      setDeferred(null);
      setIsStandalone(true);
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (isStandalone || dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
    setShowIOS(false);
  };

  const handleClick = async () => {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setDeferred(null);
      return;
    }
    if (isIOS) {
      setShowIOS(true);
      return;
    }
    // Fallback: other browsers without beforeinstallprompt (e.g., desktop Safari)
    setShowIOS(true);
  };

  if (!deferred && !isIOS) return null;

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-24 start-4 z-40 inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-navy/90 transition-colors"
        aria-label="تثبيت التطبيق"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
        </svg>
        ثبّت التطبيق
      </button>

      {showIOS && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowIOS(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">تثبيت تطبيق الترف</h3>
              <button
                onClick={() => setShowIOS(false)}
                className="text-gray hover:text-charcoal"
                aria-label="إغلاق"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ol className="space-y-3 text-charcoal text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span>اضغط على زر المشاركة <span className="inline-block align-middle">⎋</span> في أسفل المتصفح</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <span>اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span>اضغط <strong>"إضافة"</strong> — راح تلقى أيقونة الترف على شاشتك</span>
              </li>
            </ol>
            <button
              onClick={dismiss}
              className="mt-5 w-full text-center text-sm text-gray hover:text-charcoal py-2"
            >
              لا تظهر هذه الرسالة مرة أخرى
            </button>
          </div>
        </div>
      )}
    </>
  );
}
