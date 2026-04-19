import type { KnownFields } from "@/lib/chat/tools";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  ts: number;
}

export interface ChatState {
  sessionId: string;
  messages: ChatMessage[];
  known: KnownFields;
  finalized: boolean;
  classification?: "hot" | "warm" | "cold";
}

export const STORAGE_KEY = "taraf_chat_v1";
