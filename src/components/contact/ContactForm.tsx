"use client";

import { useState, type FormEvent } from "react";
import { contactChannels } from "@/content/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`LexBridge inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${contactChannels.emailInfo}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
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

      {status === "error" ? (
        <p className="text-xs text-red-400" role="alert">
          Please complete all fields before submitting.
        </p>
      ) : null}
      {status === "sent" ? (
        <p className="text-xs text-accent" role="status">
          Opening your email client… If nothing happens, email us directly at {contactChannels.emailInfo}.
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 sm:w-auto"
      >
        Submit now
      </button>
      <p className="text-xs text-muted">
        Submissions are routed through your default mail client as a demo-only flow—no data is stored on this
        static site.
      </p>
    </form>
  );
}
