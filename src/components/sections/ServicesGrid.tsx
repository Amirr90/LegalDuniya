import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { services } from "@/content/site";

export function ServicesGrid() {
  return (
    <Section id="services" muted disableReveal>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our top services</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Comprehensive legal solutions for life and business
            </h2>
            <p className="mt-4 text-muted">
              From urgent disputes to proactive compliance, choose a practice area and we will match you with
              counsel who regularly handles matters like yours.
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col rounded-2xl border border-border bg-background/40 p-6 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                Ask a lawyer →
              </span>
            </Link>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
