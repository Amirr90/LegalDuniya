"use client";

import { useMemo, useState, type FormEvent } from "react";
import { getContactTopicLabel } from "@/content/contactTopics";
import { contactChannels, whatsappPrefillChat } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

type ContactFormProps = {
  initialTopic?: string;
};

export function ContactForm({ initialTopic }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [copyDone, setCopyDone] = useState(false);
  const [draftForCopy, setDraftForCopy] = useState<string | null>(null);
  const [deliveredByServer, setDeliveredByServer] = useState(false);
  const topicLabel = useMemo(
    () => (initialTopic ? getContactTopicLabel(initialTopic) : ""),
    [initialTopic],
  );
  const waChat = useMemo(
    () => whatsappUrl(contactChannels.whatsappE164, whatsappPrefillChat),
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    const topicLine =
      initialTopic && topicLabel
        ? `Topic: ${topicLabel} (${initialTopic})\n\n`
        : initialTopic
          ? `Topic: ${initialTopic}\n\n`
          : "";

    const plainBody = `${topicLine}${message}\n\nFrom: ${name}\nEmail: ${email}`;
    setDraftForCopy(plainBody);
    setCopyDone(false);
    setDeliveredByServer(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          topic: initialTopic,
          company,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; mode?: string };
      if (res.ok && json.ok && json.mode === "sent") {
        setDeliveredByServer(true);
        setStatus("sent");
        return;
      }
      if (res.status === 400) {
        setStatus("error");
        return;
      }
    } catch {
      /* fall through to mailto */
    }

    const subject = encodeURIComponent(`LexBridge inquiry from ${name}`);
    const body = encodeURIComponent(plainBody);
    window.location.href = `mailto:${contactChannels.emailInfo}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  async function copyDraft() {
    if (!draftForCopy) return;
    try {
      await navigator.clipboard.writeText(draftForCopy);
      setCopyDone(true);
    } catch {
      setCopyDone(false);
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
      {initialTopic ? (
        <div className="rounded-xl border border-border bg-surface-elevated/60 px-4 py-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Reason for contact</p>
          <p className="mt-1 font-medium text-foreground">{topicLabel || initialTopic}</p>
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
          placeholder="Your full name"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
          placeholder="Briefly describe your legal matter, jurisdiction, and urgency."
        />
      </div>

      <div className="sr-only" aria-hidden>
        <label htmlFor="contact-company">Leave this field empty</label>
        <input tabIndex={-1} id="contact-company" name="company" type="text" autoComplete="off" />
      </div>

      {status === "error" ? (
        <p className="text-xs text-red-400" role="alert">
          Please complete all fields before submitting.
        </p>
      ) : null}
      {status === "sent" ? (
        <div className="space-y-2 text-xs text-accent" role="status">
          {deliveredByServer ? (
            <p>Thanks — we received your message and will get back to you shortly.</p>
          ) : (
            <p>
              Opening your email client… If nothing happens, email us directly at{" "}
              <a href={`mailto:${contactChannels.emailInfo}`} className="underline-offset-2 hover:underline">
                {contactChannels.emailInfo}
              </a>
              .
            </p>
          )}
          <p>
            <a href={waChat} className="font-semibold underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              Prefer WhatsApp?
            </a>
          </p>
          {draftForCopy ? (
            <button
              type="button"
              onClick={() => void copyDraft()}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent/60"
            >
              {copyDone ? "Copied" : "Copy message text"}
            </button>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 sm:w-auto"
      >
        Submit now
      </button>
      <p className="text-xs text-muted">
        We may deliver this form by email (when configured) or through your default mail client. See our{" "}
        <a href="/privacy" className="text-accent underline-offset-2 hover:underline">
          privacy notice
        </a>
        .
      </p>
    </form>
  );
}
