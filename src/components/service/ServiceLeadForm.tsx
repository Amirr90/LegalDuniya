"use client";

import { useState, type FormEvent } from "react";
import { contactChannels } from "@/content/site";

type ServiceLeadFormProps = {
  serviceTitle: string;
};

export function ServiceLeadForm({ serviceTitle }: ServiceLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const trap = String(data.get("company") || "").trim();
    if (trap) {
      return;
    }

    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !mobile || !email || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`LexBridge — ${serviceTitle} — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nService: ${serviceTitle}\nFrom: ${name}\nMobile: ${mobile}\nEmail: ${email}`,
    );
    window.location.href = `mailto:${contactChannels.emailInfo}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="rounded-t-xl bg-surface-elevated px-4 py-3 sm:px-5">
        <h3 className="font-display text-lg font-semibold text-foreground">Connect with a lawyer</h3>
        <p className="mt-1 text-xs text-muted">Tell us how to reach you. We will route this to our intake desk.</p>
      </div>

      <div className="space-y-4 px-1 sm:px-2">
        <div>
          <label htmlFor="svc-name" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Full name
          </label>
          <input
            id="svc-name"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
            placeholder="Your full name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="svc-mobile" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Mobile no.
          </label>
          <input
            id="svc-mobile"
            name="mobile"
            type="tel"
            required
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
            placeholder="+91 …"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="svc-email" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Email
          </label>
          <input
            id="svc-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="svc-message" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Message
          </label>
          <textarea
            id="svc-message"
            name="message"
            required
            rows={4}
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/40 focus:ring-2"
            placeholder="Brief facts, city, and what you need."
          />
        </div>

        <div className="sr-only" aria-hidden>
          <label htmlFor="svc-company">Leave this empty</label>
          <input tabIndex={-1} id="svc-company" name="company" type="text" autoComplete="off" />
        </div>

        {status === "error" ? (
          <p className="text-xs text-red-400" role="alert">
            Please complete all fields before submitting.
          </p>
        ) : null}
        {status === "sent" ? (
          <p className="text-xs text-accent" role="status">
            Opening your email client… If nothing happens, write to {contactChannels.emailInfo}.
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
        >
          Submit
        </button>
        <p className="text-xs text-muted">
          Demo flow only: opens your mail app. Nothing is stored on this site.
        </p>
      </div>
    </form>
  );
}
