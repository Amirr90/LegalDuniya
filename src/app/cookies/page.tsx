import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Cookies",
  description: "LexBridge cookie notice (draft template).",
};

export default function CookiesPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-background to-surface py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <strong>Draft — legal review required.</strong> Expand this page if you add analytics or non-essential
          cookies.
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Cookie notice</h1>
        <p className="text-sm leading-relaxed text-muted">
          LexBridge currently uses only cookies and storage strictly necessary for the site to function (for
          example session or preferences). If you enable marketing or analytics scripts, list each cookie, its
          purpose, retention, and how users can opt out.
        </p>
      </Container>
    </div>
  );
}
