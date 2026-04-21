"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STORAGE_KEY, type ChatMessage, type ChatState } from "./types";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "أهلاً بك في شركة الترف للاستقدام. أنا مستشارتك ترف، كيف أقدر أخدمك اليوم؟",
  ts: Date.now(),
};

function createSessionId(): string {
  // Good-enough IDs for session upsert — not used as a security boundary.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function loadState(): ChatState {
  if (typeof window === "undefined") {
    return {
      sessionId: createSessionId(),
      messages: [WELCOME],
      known: {},
      finalized: false,
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatState;
      if (parsed.sessionId && Array.isArray(parsed.messages)) {
        return parsed;
      }
    }
  } catch {
    // fall through
  }
  return {
    sessionId: createSessionId(),
    messages: [WELCOME],
    known: {},
    finalized: false,
  };
}

export function useChatSession() {
  const [state, setState] = useState<ChatState>(() => loadState());
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Persist state across refreshes.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // quota / private mode — ignore
    }
  }, [state]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: "user",
        content: trimmed,
        ts: Date.now(),
      };

      // Optimistic update.
      const nextMessages = [...state.messages, userMsg];
      setState((s) => ({ ...s, messages: nextMessages }));
      setSending(true);
      setError(null);

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            sessionId: state.sessionId,
            known: state.known,
            // Strip the synthetic welcome message — it was never sent to the model.
            messages: nextMessages
              .filter((m) => m.id !== "welcome")
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        const data = await res.json();

        const reply: ChatMessage = {
          id: `a_${Date.now()}`,
          role: "assistant",
          content:
            data.reply ||
            "عذراً، تعذّر الرد. حاول مرة أخرى أو تواصل معنا عبر الواتساب.",
          ts: Date.now(),
        };

        setState((s) => ({
          ...s,
          messages: [...nextMessages, reply],
          known: data.known ?? s.known,
          finalized: !!data.finalized || s.finalized,
          classification: data.classification ?? s.classification,
        }));

        if (!res.ok && data.error) setError(data.error);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setError("network");
        setState((s) => ({
          ...s,
          messages: [
            ...nextMessages,
            {
              id: `a_err_${Date.now()}`,
              role: "assistant",
              content:
                "تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مجدداً.",
              ts: Date.now(),
            },
          ],
        }));
      } finally {
        setSending(false);
      }
    },
    [sending, state.messages, state.sessionId, state.known],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    const fresh: ChatState = {
      sessionId: createSessionId(),
      messages: [{ ...WELCOME, ts: Date.now() }],
      known: {},
      finalized: false,
    };
    setState(fresh);
    setError(null);
  }, []);

  return { state, sending, error, send, reset };
}
