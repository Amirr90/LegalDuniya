import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export type LegalUpdateItem = {
  title: string;
  date: string;
};

export type LegalUpdatesProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items: readonly LegalUpdateItem[];
};

export function LegalUpdates({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
  items,
}: LegalUpdatesProps) {
  if (!items.length) return null;
  return (
    <Section id="updates" muted disableReveal>
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {title}
              </h2>
              {subtitle ? <p className="mt-3 max-w-2xl text-muted">{subtitle}</p> : null}
            </div>
            {ctaLabel ? (
              <Link href={ctaHref} className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
                {ctaLabel}
              </Link>
            ) : null}
          </div>
        </ScrollReveal>

        <StaggerReveal
          as="ul"
          className="mt-10 list-none divide-y divide-border rounded-2xl border border-border bg-background/40"
        >
          {items.map((item) => (
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
