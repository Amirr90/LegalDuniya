import Link from "next/link";
import {
  ServiceCatalogCard,
  type ServiceCatalogTile,
} from "@/components/service/ServiceCatalogCard";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export type TopServiceTilesProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  tiles: readonly ServiceCatalogTile[];
  muted?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function TopServiceTiles({
  id,
  eyebrow,
  title,
  description,
  tiles,
  muted = true,
  viewAllHref,
  viewAllLabel = "View all services",
}: TopServiceTilesProps) {
  if (!tiles.length) return null;
  return (
    <Section id={id} muted={muted} disableReveal>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
            {description ? <p className="mt-4 text-muted">{description}</p> : null}
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tiles.map((tile) => (
            <ServiceCatalogCard key={tile.slug} tile={tile} />
          ))}
        </StaggerReveal>

        {viewAllHref ? (
          <div className="mt-10 flex justify-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              {viewAllLabel}
            </Link>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
