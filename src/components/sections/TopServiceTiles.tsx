import { ServiceCatalogCard } from "@/components/service/ServiceCatalogCard";
import type { ServiceSectionSpec } from "@/content/servicePages";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

type TopServiceTilesProps = {
  section: ServiceSectionSpec;
  muted?: boolean;
};

export function TopServiceTiles({ section, muted = true }: TopServiceTilesProps) {
  return (
    <Section id={section.id} muted={muted} disableReveal>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{section.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{section.title}</h2>
            <p className="mt-4 text-muted">{section.description}</p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.tiles.map((tile) => (
            <ServiceCatalogCard key={tile.slug} tile={tile} />
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
