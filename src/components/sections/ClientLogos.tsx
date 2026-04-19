import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { clientLogos } from "@/content/site";

export function ClientLogos() {
  return (
    <section className="border-t border-border bg-surface py-12">
      <Container>
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Trusted by teams at
          </p>
        </ScrollReveal>
        <StaggerReveal className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-sm text-muted/90">
          {clientLogos.map((name) => (
            <span key={name} className="font-medium text-foreground/70">
              {name}
            </span>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
