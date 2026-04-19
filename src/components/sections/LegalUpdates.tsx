import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { legalUpdates } from "@/content/site";

export function LegalUpdates() {
  return (
    <Section id="updates" muted disableReveal>
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Latest legal updates</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Headlines that shape strategy
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Short briefs on judgments, policy shifts, and regulatory signals—curated for founders, in-house
                teams, and families navigating disputes.
              </p>
            </div>
            <Link href="/#updates" className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
              View updates
            </Link>
          </div>
        </ScrollReveal>

        <StaggerReveal
          as="ul"
          className="mt-10 list-none divide-y divide-border rounded-2xl border border-border bg-background/40"
        >
          {legalUpdates.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="flex flex-col gap-2 px-5 py-4 transition hover:bg-surface sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="font-medium text-foreground">{item.title}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">{item.date}</div>
              </Link>
            </li>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
