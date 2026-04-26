import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export type AdvocateCard = {
  name: string;
  practice: string;
  imageSrc: string;
};

export type AdvocatesShowcaseProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  viewAllLinkLabel?: string;
  viewAllHref?: string;
  cardCtaLabel?: string;
  cardCtaHref?: string;
  advocates: readonly AdvocateCard[];
};

export function AdvocatesShowcase({
  eyebrow,
  title,
  subtitle,
  viewAllLinkLabel,
  viewAllHref = "/contact",
  cardCtaLabel = "Ask a lawyer",
  cardCtaHref = "/contact",
  advocates,
}: AdvocatesShowcaseProps) {
  if (!advocates.length) return null;
  return (
    <Section id="advocates" disableReveal>
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
            {viewAllLinkLabel ? (
              <Link
                href={viewAllHref}
                className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                {viewAllLinkLabel}
              </Link>
            ) : null}
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advocates.map((person) => (
            <article
              key={person.name}
              className="card-interactive flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:-translate-y-1 hover:border-accent/45"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-elevated">
                <Image
                  src={person.imageSrc}
                  alt={`${person.name}, ${person.practice}`}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain object-top"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{person.name}</h3>
                  <p className="mt-1 text-xs text-muted">{person.practice}</p>
                </div>
                <Link
                  href={cardCtaHref}
                  className="mt-auto inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
                >
                  {cardCtaLabel}
                </Link>
              </div>
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
