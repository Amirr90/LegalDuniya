import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About LexBridge",
  description:
    "Learn how LexBridge connects people and businesses with verified advocates through secure chat and call consultations.",
};

export default function AboutPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-surface to-background py-16 sm:py-20">
      <ScrollReveal rootMargin="15% 0px -8% 0px">
        <Container className="max-w-3xl space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About us</p>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Legal access that keeps pace with modern life
          </h1>
          <p className="text-lg text-muted">
            LexBridge is a demonstration legal-technology experience inspired by leading lawyer marketplaces. Our
            goal is simple: reduce friction between urgent legal questions and qualified counsel—without
            sacrificing confidentiality or professional independence.
          </p>
          <div className="space-y-4 text-muted">
            <p>
              We combine structured intake, transparent availability, and modern collaboration tooling so you can
              move from search to conversation in minutes. Every advocate profile emphasizes domain focus,
              jurisdictions served, and languages supported.
            </p>
            <p>
              This site is a static marketing prototype: there is no live booking, billing, or regulated
              referral workflow wired in. Use it as a visual and UX reference for your own legal-tech product.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              Talk to our team
            </ButtonLink>
            <ButtonLink href="/#services" variant="outline">
              Browse services
            </ButtonLink>
          </div>
        </Container>
      </ScrollReveal>
    </div>
  );
}
