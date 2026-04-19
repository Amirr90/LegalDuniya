import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { privacyPage } from "@/content/pageCopy";

export const metadata: Metadata = privacyPage.metadata;

export default function PrivacyPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-background to-surface py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <strong>{privacyPage.draftBannerTitle}</strong> {privacyPage.draftBannerBody}
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">{privacyPage.title}</h1>
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          {privacyPage.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}
