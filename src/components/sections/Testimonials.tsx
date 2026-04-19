import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { testimonials } from "@/content/site";

export function Testimonials() {
  return (
    <Section disableReveal>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Testimonials</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              What clients say about LexBridge
            </h2>
            <p className="mt-3 text-xs text-muted">
              Illustrative stories for demonstration; not endorsements or typical results.
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/20"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                <div className="font-semibold text-foreground">{item.name}</div>
                <div className="text-xs text-muted">
                  {item.role}
                  {item.location ? ` · ${item.location}` : ""}
                </div>
              </figcaption>
            </figure>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
