"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateQuery, normalizeQuery } from "@/lib/orders";

interface Props {
  initialValue?: string;
  // When provided, render in compact mode (used inside /orders/[id] search bar).
  compact?: boolean;
}

export default function TrackForm({ initialValue = "", compact = false }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Keep the input synced with the URL's ?q=. This lets TrackResults swap a national-ID
  // lookup for the canonical order number after a successful match — the input and URL
  // both upgrade, so sharing / refreshing never leaks the national ID.
  useEffect(() => {
    const urlQ = searchParams?.get("q") ?? "";
    if (urlQ && urlQ !== value) setValue(urlQ);
    if (!urlQ && !value) return;
    setLoading(false);
    // We intentionally depend only on searchParams; value changes shouldn't re-trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const v = validateQuery(value);
    if (!v.ok) {
      setError(v.message);
      return;
    }

    setLoading(true);
    const q = normalizeQuery(value);
    // Navigate with query param; the results page performs the actual lookup.
    router.push(`/track-order?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "" : "space-y-3"}>
      <div className="relative">
        <input
          type="text"
          inputMode="text"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="TRF-2026-0001 أو رقم الهوية"
          aria-label="رقم الطلب أو رقم الهوية"
          aria-invalid={!!error}
          aria-describedby={error ? "track-error" : undefined}
          className={`w-full h-14 pe-14 ps-4 rounded-xl border-2 bg-white text-navy placeholder:text-gray/70 outline-none transition-colors ${
            error ? "border-red-300 focus:border-red-500" : "border-light focus:border-blue"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute top-1/2 -translate-y-1/2 end-2 h-10 px-5 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-blue/90 disabled:opacity-60 transition-colors"
        >
          {loading ? "…" : "متابعة الطلب"}
        </button>
      </div>

      {error && (
        <p id="track-error" role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      {!compact && !error && (
        <p className="text-xs text-gray">
          تُقبل صيغ: رقم الطلب (مثل <span className="font-mono">TRF-2026-0001</span>) أو رقم الهوية
          الوطنية / السجل التجاري.
        </p>
      )}
    </form>
  );
}
