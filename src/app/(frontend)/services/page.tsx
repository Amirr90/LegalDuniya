import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCatalogCard } from "@/components/service/ServiceCatalogCard";
import { Container } from "@/components/ui/Container";
import { servicesCatalogPage } from "@/content/pageCopy";
import { servicesCatalogHref } from "@/content/servicePages";
import { getFeaturedServices, getSpecializedServices } from "@/lib/cms";

export const metadata: Metadata = servicesCatalogPage.metadata;
export const revalidate = 60;

export default async function ServicesCatalogPage() {
  const [featured, specialized] = await Promise.all([
    getFeaturedServices(),
    getSpecializedServices(),
  ]);

  const sections = [
    { id: "top-services", title: "Top services", tiles: featured },
    { id: "specialized-services", title: "Specialized services", tiles: specialized },
  ].filter((s) => s.tiles.length > 0);

  return (
    <div className="min-h-0 flex-1">
      <Container className="pb-20 pt-8 sm:pt-10">
        <div className="mb-8 flex flex-col gap-5 border-b border-border pb-6">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-muted transition hover:text-accent"
          >
            {servicesCatalogPage.backLinkLabel}
          </Link>
          <nav
            aria-label={servicesCatalogPage.jumpNavAriaLabel}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {sections.map((sec) => (
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-glow">{servicesCatalogPage.eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {servicesCatalogPage.title}
          </h1>
          <p className="mt-4 text-muted">{servicesCatalogPage.subtitle}</p>
        </header>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-3">
                <h2 className="max-w-[min(100%,28rem)] font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {section.title}
                </h2>
                <p className="text-sm text-muted">
                  {section.tiles.length}{" "}
                  {section.tiles.length === 1
                    ? servicesCatalogPage.serviceWord
                    : servicesCatalogPage.servicesWord}
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
