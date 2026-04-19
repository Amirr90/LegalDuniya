import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms",
  description: "LexBridge terms of use (draft template for legal review).",
};

export default function TermsPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-surface to-background py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <strong>Draft — legal review required.</strong> Replace this page with counsel-approved text before
          production launch.
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Terms of use</h1>
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            This placeholder outlines site rules: acceptable use, disclaimers that site content is not legal
            advice, limitation of liability where permitted, governing law and jurisdiction, account termination
            if applicable, and links to the privacy notice.
          </p>
        </div>
      </Container>
    </div>
  );
}
