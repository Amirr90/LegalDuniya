import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { advocates } from "@/content/site";

export function AdvocatesShowcase() {
  return (
    <Section id="advocates" disableReveal>
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured advocates</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Hire and consult experienced counsel
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                A snapshot of senior practitioners on our roster—each vetted for credentials, responsiveness,
                and domain depth.
              </p>
            </div>
            <Link
              href="/contact"
              className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              View all advocates
            </Link>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advocates.map((person) => (
            <article
              key={person.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-elevated">
                <Image
                  src={person.imageSrc}
                  alt={`${person.name}, ${person.practice}`}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{person.name}</h3>
                  <p className="mt-1 text-xs text-muted">{person.practice}</p>
                </div>
                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
                >
                  Ask a lawyer
                </Link>
              </div>
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
