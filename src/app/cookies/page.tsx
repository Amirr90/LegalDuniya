import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { cookiesPage } from "@/content/pageCopy";

export const metadata: Metadata = cookiesPage.metadata;

export default function CookiesPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-background to-surface py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <strong>{cookiesPage.draftBannerTitle}</strong> {cookiesPage.draftBannerBody}
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">{cookiesPage.title}</h1>
        <p className="text-sm leading-relaxed text-muted">{cookiesPage.body}</p>
      </Container>
    </div>
  );
}
