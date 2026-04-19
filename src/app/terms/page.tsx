import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { termsPage } from "@/content/pageCopy";

export const metadata: Metadata = termsPage.metadata;

export default function TermsPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-surface to-background py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <strong>{termsPage.draftBannerTitle}</strong> {termsPage.draftBannerBody}
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">{termsPage.title}</h1>
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>{termsPage.body}</p>
        </div>
      </Container>
    </div>
  );
}
