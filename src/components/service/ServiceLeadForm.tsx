"use client";

import { useMemo, useState, type FormEvent } from "react";
import { contactChannels, whatsappPrefillChat, whatsappPrefillForService } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

type ServiceLeadFormProps = {
  serviceTitle: string;
  serviceSlug: string;
};

export function ServiceLeadForm({ serviceTitle, serviceSlug }: ServiceLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [copyDone, setCopyDone] = useState(false);
  const [draftForCopy, setDraftForCopy] = useState<string | null>(null);
  const [deliveredByServer, setDeliveredByServer] = useState(false);

  const waService = useMemo(
    () =>
      whatsappUrl(
        contactChannels.whatsappE164,
        whatsappPrefillForService(serviceTitle, serviceSlug),
      ),
    [serviceTitle, serviceSlug],
  );

  const waGeneral = useMemo(
    () => whatsappUrl(contactChannels.whatsappE164, whatsappPrefillChat),
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") || "").trim();
    if (company) return;

    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !mobile || !email || !message) {
      setStatus("error");
      return;
    }

    const plain = `${message}\n\nService: ${serviceTitle}\nFrom: ${name}\nMobile: ${mobile}\nEmail: ${email}`;
    setDraftForCopy(plain);
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
          mobile,
          service: `${serviceTitle} (${serviceSlug})`,
          company: "",
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
      /* mailto fallback */
    }

    const subject = encodeURIComponent(`LexBridge — ${serviceTitle} — ${name}`);
    const body = encodeURIComponent(plain);
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
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
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

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface-elevated/50 px-3 py-3 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Prefer WhatsApp?</span>
          <a
            href={waService}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-accent/60 hover:text-accent"
          >
            WhatsApp — {serviceTitle}
          </a>
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
                Opening your email client… If nothing happens, write to {contactChannels.emailInfo}.
              </p>
            )}
            <p>
              <a href={waGeneral} className="font-semibold underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
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
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
        >
          Submit
        </button>
        <p className="text-xs text-muted">
          We may deliver this form by email (when configured) or through your default mail client. See our{" "}
          <a href="/privacy" className="text-accent underline-offset-2 hover:underline">
            privacy notice
          </a>
          .
        </p>
      </div>
    </form>
  );
}
