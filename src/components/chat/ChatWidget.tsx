"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CHATBOT_FAQ, CHATBOT_FALLBACK_ANSWER, matchChatbotFaq } from "@/content/chatbotFaq";

type ChatRole = "user" | "assistant";

type ChatLine = {
  id: string;
  role: ChatRole;
  content: string;
};

const WELCOME =
  "Hi, I am the LexBridge assistant. I can answer common questions about how LexBridge works. This is general information only—not legal advice. For your specific situation, please speak with a qualified lawyer via our Contact page.";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<ChatLine[]>([
    { id: newId(), role: "assistant", content: WELCOME },
  ]);
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, open, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const appendAssistant = (content: string) => {
    setLines((prev) => [...prev, { id: newId(), role: "assistant", content }]);
  };

  const appendUser = (content: string) => {
    setLines((prev) => [...prev, { id: newId(), role: "user", content }]);
  };

  const handleFaqQuestion = (question: string) => {
    const entry = CHATBOT_FAQ.find((e) => e.question === question);
    if (!entry) return;
    appendUser(question);
    appendAssistant(entry.answer);
  };

  const sendFreeText = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    appendUser(text);

    const faqHit = matchChatbotFaq(text);
    if (faqHit) {
      appendAssistant(faqHit.answer);
      return;
    }

    setBusy(true);
    try {
      const messages = lines
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));
      messages.push({ role: "user", content: text });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!res.ok) {
        appendAssistant(CHATBOT_FALLBACK_ANSWER);
        return;
      }
      if (data.reply) {
        appendAssistant(data.reply);
        return;
      }
      appendAssistant(CHATBOT_FALLBACK_ANSWER);
    } catch {
      appendAssistant(CHATBOT_FALLBACK_ANSWER);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex flex-col items-end gap-3 p-4 sm:p-6">
      {open ? (
        <div
          id={panelId}
          className="pointer-events-auto flex max-h-[min(32rem,70vh)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xl shadow-black/40"
          role="dialog"
          aria-label="LexBridge chat assistant"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">LexBridge assistant</p>
              <p className="text-xs text-muted">General info only</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-muted transition hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close chat"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm leading-relaxed"
          >
            {lines.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ml-6 whitespace-pre-wrap rounded-2xl rounded-br-md bg-accent/15 px-3 py-2 text-foreground"
                    : "mr-4 whitespace-pre-wrap rounded-2xl rounded-bl-md border border-border/80 bg-surface px-3 py-2 text-foreground/95"
                }
              >
                {m.content}
              </div>
            ))}
            {busy ? (
              <p className="text-xs text-muted" aria-live="polite">
                Thinking…
              </p>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-border px-3 py-2">
            <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-muted">Quick questions</p>
            <div className="mb-3 flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
              {CHATBOT_FAQ.map((f) => (
                <button
                  key={f.question}
                  type="button"
                  disabled={busy}
                  onClick={() => handleFaqQuestion(f.question)}
                  className="max-w-full truncate rounded-full border border-border bg-surface px-2.5 py-1 text-left text-[0.7rem] text-foreground/90 transition hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  {f.question}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void sendFreeText();
              }}
            >
              <label htmlFor="lexbridge-chat-input" className="sr-only">
                Message
              </label>
              <input
                id="lexbridge-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question…"
                disabled={busy}
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="shrink-0 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
              >
                Send
              </button>
            </form>
            <p className="mt-2 text-[0.65rem] leading-snug text-muted">
              Not legal advice.{" "}
              <a href="/contact" className="text-accent underline-offset-2 hover:underline">
                Contact
              </a>{" "}
              for a lawyer.
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/25 transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? <CloseIcon className="h-7 w-7" /> : <ChatIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H5.17L4 17.17V4h16v12z" />
      <path d="M7 9h2v2H7zm4 0h6v2h-6zm-4 4h6v2H7z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}
