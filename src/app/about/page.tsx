import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { aboutPage } from "@/content/pageCopy";

export const metadata: Metadata = aboutPage.metadata;

export default function AboutPage() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-surface to-background py-16 sm:py-20">
      <ScrollReveal rootMargin="15% 0px -8% 0px">
        <Container className="max-w-3xl space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{aboutPage.eyebrow}</p>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">{aboutPage.title}</h1>
          <p className="text-lg text-muted">{aboutPage.paragraphs[0]}</p>
          <div className="space-y-4 text-muted">
            <p>{aboutPage.paragraphs[1]}</p>
            <p>{aboutPage.paragraphs[2]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              {aboutPage.primaryCta}
            </ButtonLink>
            <ButtonLink href="/#top-services" variant="outline">
              {aboutPage.secondaryCta}
            </ButtonLink>
          </div>
        </Container>
      </ScrollReveal>
    </div>
  );
}
