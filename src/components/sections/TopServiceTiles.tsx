import Image from "next/image";
import Link from "next/link";
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

        <StaggerReveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
          {section.tiles.map((tile) => (
            <Link
              key={tile.slug}
              href={`/service/${tile.slug}`}
              className="card-interactive group flex flex-col overflow-hidden rounded-2xl border border-border bg-background/40 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
                <Image
                  src={tile.imageSrc}
                  alt={tile.title}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-contain object-center transition duration-300"
                />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 text-center">
                <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
                  {tile.title}
                </span>
                {tile.tagline ? <span className="text-xs text-muted">{tile.tagline}</span> : null}
              </div>
            </Link>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
