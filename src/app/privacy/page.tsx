import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "LexBridge privacy notice (draft template for legal review).",
};

export default function PrivacyPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-background to-surface py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <strong>Draft — legal review required.</strong> Replace this page with counsel-approved text before
          production launch.
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Privacy notice</h1>
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            This placeholder describes how LexBridge would typically handle personal data: what you collect (e.g.
            name, email, phone, messages), why you collect it, how long you retain it, who you share it with, and
            how users exercise rights (access, correction, deletion) under applicable law including India&apos;s
            Digital Personal Data Protection Act where relevant.
          </p>
          <p>
            If you use third parties (hosting, email, CRM, analytics, WhatsApp), list them here with purpose and
            legal basis. If the contact form only opens a mail client and does not transmit data to your servers,
            say so clearly.
          </p>
        </div>
      </Container>
    </div>
  );
}
