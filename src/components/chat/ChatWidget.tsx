"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useChatSession } from "./useChatSession";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { state, sending, send, reset } = useChatSession();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide on admin pages — staff don't need the customer assistant.
  const hideOn = pathname?.startsWith("/admin");

  // Auto-scroll to newest message.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.messages, sending, open]);

  // Focus input when opening.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // Close on ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (hideOn) return null;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input;
    setInput("");
    void send(text);
  }

  return (
    <>
      {/* Launcher — bottom-right to avoid overlap with WhatsApp (bottom-left) */}
      <button
        type="button"
        aria-label={open ? "إغلاق المستشارة" : "فتح مستشارتك ترف"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-navy text-white shadow-xl border-2 border-gold/70 hover:bg-navy/90 active:scale-95 transition-all px-4 h-14 sm:h-14"
      >
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gold/20">
          <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 01-13.3 7.92L3 21l1.08-4.7A9 9 0 1121 12z"
            />
          </svg>
          {!open && (
            <span
              aria-hidden
              className="absolute top-0 end-0 w-2.5 h-2.5 rounded-full bg-green border border-white"
            />
          )}
        </span>
        <span className="text-sm font-semibold">مستشارتك ترف</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="مستشارتك ترف"
          className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] z-50 flex flex-col bg-white shadow-2xl border border-light sm:rounded-2xl overflow-hidden max-h-[85vh] sm:max-h-[620px] animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 bg-navy text-white">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 01-13.3 7.92L3 21l1.08-4.7A9 9 0 1121 12z"
                  />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">مستشارتك ترف</p>
                <p className="text-[11px] text-white/70 leading-tight">
                  متصل الآن • نرد خلال دقائق
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                title="بدء محادثة جديدة"
                aria-label="بدء محادثة جديدة"
                className="p-1.5 rounded-md text-white/80 hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق"
                className="p-1.5 rounded-md text-white/80 hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-light/40 space-y-3"
          >
            {state.messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} />
            ))}
            {sending && <TypingIndicator />}
            {state.finalized && <QualifiedBanner />}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-light bg-white px-3 py-3">
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending}
                placeholder="اكتب رسالتك…"
                className="flex-1 h-11 px-3 rounded-xl border border-light focus:border-blue outline-none text-sm bg-light/60 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="إرسال"
                className="h-11 w-11 rounded-xl bg-blue text-white flex items-center justify-center disabled:opacity-50 hover:bg-blue/90 transition-colors"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray mt-2 text-center">
              المحادثة محفوظة على جهازك فقط. قد يتواصل معك الفريق عبر الجوال المُدخل.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const mine = role === "user";
  return (
    <div className={`flex ${mine ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap leading-relaxed text-sm rounded-2xl px-3.5 py-2.5 shadow-sm ${
          mine
            ? "bg-blue text-white rounded-bl-sm"
            : "bg-white text-charcoal border border-light rounded-br-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-end">
      <div className="bg-white border border-light rounded-2xl rounded-br-sm px-3.5 py-3 shadow-sm inline-flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gray/60 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray/60 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray/60 animate-bounce" />
      </div>
    </div>
  );
}

function QualifiedBanner() {
  return (
    <div
      role="status"
      className="mx-auto max-w-[90%] text-xs text-green bg-green/10 border border-green/30 rounded-lg px-3 py-2 text-center"
    >
      ✅ تم تسجيل طلبك. سيتواصل معك فريق الترف قريباً.
    </div>
  );
}
