import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { legalUpdatesCopy } from "@/content/pageCopy";
import { legalUpdates } from "@/content/site";

export function LegalUpdates() {
  return (
    <Section id="updates" muted disableReveal>
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {legalUpdatesCopy.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {legalUpdatesCopy.title}
              </h2>
              <p className="mt-3 max-w-2xl text-muted">{legalUpdatesCopy.subtitle}</p>
            </div>
            <Link href="/contact" className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
              {legalUpdatesCopy.ctaLink}
            </Link>
          </div>
        </ScrollReveal>

        <StaggerReveal
          as="ul"
          className="mt-10 list-none divide-y divide-border rounded-2xl border border-border bg-background/40"
        >
          {legalUpdates.map((item) => (
            <li key={item.title}>
              <article className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-medium text-foreground">{item.title}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">{item.date}</div>
              </article>
            </li>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
