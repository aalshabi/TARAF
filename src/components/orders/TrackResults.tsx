"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { normalizeQuery, type OrderDTO } from "@/lib/orders";
import OrderDetailsCard from "./OrderDetailsCard";
import OrderSkeleton from "./OrderSkeleton";

interface Props {
  query: string;
}

type FetchState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string; status: number }
  | { kind: "success"; order: OrderDTO };

export default function TrackResults({ query }: Props) {
  const router = useRouter();
  const [state, setState] = useState<FetchState>({ kind: "idle" });

  useEffect(() => {
    if (!query) {
      setState({ kind: "idle" });
      return;
    }

    let cancelled = false;
    setState({ kind: "loading" });

    (async () => {
      try {
        const res = await fetch(`/api/orders/track?q=${encodeURIComponent(query)}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (cancelled) return;

        if (!res.ok) {
          setState({
            kind: "error",
            status: res.status,
            message: data?.error || "تعذر جلب بيانات الطلب.",
          });
          return;
        }

        const order = data as OrderDTO;
        setState({ kind: "success", order });

        // Upgrade the URL to the canonical order number when the customer searched by
        // national ID. Keeps the input, URL, and shareable link free of sensitive IDs.
        if (normalizeQuery(query) !== order.orderNumber) {
          router.replace(`/track-order?q=${encodeURIComponent(order.orderNumber)}`);
        }
      } catch {
        if (cancelled) return;
        setState({
          kind: "error",
          status: 0,
          message: "تعذر الاتصال بالخادم. تحقق من الإنترنت وحاول مجدداً.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query, router]);

  if (state.kind === "idle") {
    return (
      <div className="rounded-2xl border border-dashed border-light bg-light/30 p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-gray/60 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h4m5 4H5a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-sm text-gray">
          أدخل رقم الطلب أو رقم الهوية في الأعلى لعرض تفاصيل طلبك.
        </p>
      </div>
    );
  }

  if (state.kind === "loading") {
    return <OrderSkeleton />;
  }

  if (state.kind === "error") {
    const notFound = state.status === 404;
    return (
      <div
        role="alert"
        className={`rounded-2xl border p-6 sm:p-8 text-center ${
          notFound
            ? "border-amber-200 bg-amber-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        <div
          className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            notFound ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-base font-bold text-navy mb-1">
          {notFound ? "لم نعثر على طلب مطابق" : "تعذر جلب البيانات"}
        </h3>
        <p className="text-sm text-charcoal/80">{state.message}</p>
        <p className="text-xs text-gray mt-3">
          للمساعدة، تواصل مع خدمة العملاء عبر واتساب من الزر العائم.
        </p>
      </div>
    );
  }

  return <OrderDetailsCard order={state.order} showShareLink />;
}
