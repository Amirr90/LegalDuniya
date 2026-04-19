import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  homeServiceSections,
  servicesCatalogHref,
  type ServiceTile,
} from "@/content/servicePages";

export const metadata: Metadata = {
  title: "Service library",
  description:
    "Browse LexBridge practice areas by category—family, disputes, property, corporate, and more. Each service links to an overview and consult options.",
};

function ServiceCatalogCard({ tile }: { tile: ServiceTile }) {
  const chromeLabel = `lexbridge.in/${tile.slug}`;

  return (
    <Link
      href={`/service/${tile.slug}`}
      className="card-interactive group flex flex-col overflow-hidden rounded-2xl border border-border bg-background/40 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-3 py-2">
        <span className="flex shrink-0 gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/90" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/90" />
        </span>
        <span className="min-w-0 truncate font-mono text-[10px] text-muted sm:text-[11px]">{chromeLabel}</span>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
        <Image
          src={tile.imageSrc}
          alt={tile.title}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 42vw, 100vw"
          className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4 text-center">
        <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
          {tile.title}
        </span>
        {tile.tagline ? <span className="text-xs text-muted">{tile.tagline}</span> : null}
      </div>
    </Link>
  );
}

export default function ServicesCatalogPage() {
  return (
    <div className="min-h-0 flex-1">
      <Container className="pb-20 pt-8 sm:pt-10">
        <div className="mb-8 flex flex-col gap-5 border-b border-border pb-6">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-muted transition hover:text-accent"
          >
            ← LexBridge
          </Link>
          <nav
            aria-label="Jump to category"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {homeServiceSections.map((sec) => (
              <Link
                key={sec.id}
                href={`${servicesCatalogHref}#${sec.id}`}
                className="shrink-0 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground/90 transition hover:border-accent/50 hover:text-accent sm:text-sm"
              >
                {sec.title}
              </Link>
            ))}
          </nav>
        </div>

        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-glow">Service library</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Browse by category
          </h1>
          <p className="mt-4 text-muted">
            Every card opens a dedicated overview for that practice area. Explore by category, then reach
            out for a confidential consult when you are ready.
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24">
          {homeServiceSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-3">
                <h2 className="max-w-[min(100%,28rem)] font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {section.title}
                </h2>
                <p className="text-sm text-muted">
                  {section.tiles.length} {section.tiles.length === 1 ? "service" : "services"}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.tiles.map((tile) => (
                  <ServiceCatalogCard key={tile.slug} tile={tile} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
