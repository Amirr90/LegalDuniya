import { Fragment } from "react";
import { AdvocatesShowcase } from "@/components/sections/AdvocatesShowcase";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Hero } from "@/components/sections/Hero";
import { LegalUpdates } from "@/components/sections/LegalUpdates";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { TopServiceTiles } from "@/components/sections/TopServiceTiles";
import { isExternalCta, resolveCtaHref } from "@/components/render/resolveCta";
import {
  type HomePageBlock,
  type ImageRef,
  type SiteSettings,
  getAdvocates,
  getAdvocatesByIds,
  getClientLogos,
  getFeaturedServices,
  getLegalUpdates,
  getOffices,
  getServicesByIds,
  getSpecializedServices,
  getTestimonials,
  getTestimonialsByIds,
} from "@/lib/cms";
import { contactStripCopy } from "@/content/pageCopy";
import { headOfficeMapsUrl } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

type BlockId = string | number;

type GenericBlock = HomePageBlock & {
  id?: BlockId;
};

async function renderHero(block: GenericBlock, site: SiteSettings) {
  const checklist = Array.isArray(block.checklist)
    ? (block.checklist as Array<{ label?: string }>).map((c) => c.label).filter((l): l is string => Boolean(l))
    : undefined;
  const image = block.image as ImageRef | undefined | null;

  const primary =
    block.primaryCtaLabel
      ? {
          label: String(block.primaryCtaLabel),
          href: resolveCtaHref(
            block.primaryCtaTarget as string | undefined,
            block.primaryCtaHref as string | undefined,
            site,
          ),
          external: isExternalCta(block.primaryCtaTarget as string | undefined),
        }
      : null;

  const secondary =
    block.secondaryCtaLabel
      ? {
          label: String(block.secondaryCtaLabel),
          href: resolveCtaHref(
            block.secondaryCtaTarget as string | undefined,
            block.secondaryCtaHref as string | undefined,
            site,
          ),
          external: isExternalCta(block.secondaryCtaTarget as string | undefined),
        }
      : null;

  return (
    <Hero
      headline={String(block.headline ?? "")}
      subtext={typeof block.subtext === "string" ? block.subtext : undefined}
      checklist={checklist}
      primaryCta={primary}
      secondaryCta={secondary}
      imageSrc={image?.url}
    />
  );
}

async function renderStatsStrip(block: GenericBlock) {
  const stats = (block.stats as Array<{ value: string; label: string }> | undefined) ?? [];
  return <StatsStrip stats={stats} />;
}

async function renderServiceTiles(block: GenericBlock) {
  const tileSource = (block.tileSource as string) ?? "featured";
  let tiles: Awaited<ReturnType<typeof getFeaturedServices>>;
  if (tileSource === "manual") {
    const manual = (block.manualTiles as Array<unknown>) ?? [];
    const ids = manual
      .map((m) => (typeof m === "object" && m !== null && "id" in m ? (m as { id: BlockId }).id : (m as BlockId)))
      .filter((v) => v != null);
    tiles = await getServicesByIds(ids);
  } else if (tileSource === "specialized") {
    tiles = await getSpecializedServices();
  } else {
    tiles = await getFeaturedServices();
  }

  return (
    <TopServiceTiles
      id={typeof block.sectionId === "string" ? block.sectionId : undefined}
      eyebrow={String(block.eyebrow ?? "")}
      title={String(block.title ?? "")}
      description={typeof block.description === "string" ? block.description : undefined}
      muted={Boolean(block.muted)}
      tiles={tiles}
      viewAllHref={block.showViewAllLink ? "/services" : undefined}
    />
  );
}

async function renderAdvocates(block: GenericBlock) {
  const manual = (block.advocates as Array<unknown> | undefined) ?? [];
  let advocates;
  if (manual.length > 0) {
    const ids = manual
      .map((m) => (typeof m === "object" && m !== null && "id" in m ? (m as { id: BlockId }).id : (m as BlockId)))
      .filter((v) => v != null);
    advocates = await getAdvocatesByIds(ids);
  } else {
    advocates = await getAdvocates();
  }

  return (
    <AdvocatesShowcase
      eyebrow={String(block.eyebrow ?? "Featured advocates")}
      title={String(block.title ?? "")}
      subtitle={typeof block.subtitle === "string" ? block.subtitle : undefined}
      viewAllLinkLabel={typeof block.viewAllLinkLabel === "string" ? block.viewAllLinkLabel : undefined}
      cardCtaLabel={typeof block.cardCtaLabel === "string" ? block.cardCtaLabel : undefined}
      advocates={advocates}
    />
  );
}

async function renderLegalUpdates(block: GenericBlock) {
  const limit = typeof block.limit === "number" ? block.limit : 6;
  const items = await getLegalUpdates(limit);
  return (
    <LegalUpdates
      eyebrow={String(block.eyebrow ?? "Latest legal updates")}
      title={String(block.title ?? "")}
      subtitle={typeof block.subtitle === "string" ? block.subtitle : undefined}
      ctaLabel={typeof block.ctaLabel === "string" ? block.ctaLabel : undefined}
      items={items.slice(0, limit)}
    />
  );
}

async function renderTestimonials(block: GenericBlock) {
  const manual = (block.testimonials as Array<unknown> | undefined) ?? [];
  let items;
  if (manual.length > 0) {
    const ids = manual
      .map((m) => (typeof m === "object" && m !== null && "id" in m ? (m as { id: BlockId }).id : (m as BlockId)))
      .filter((v) => v != null);
    items = await getTestimonialsByIds(ids);
  } else {
    items = await getTestimonials();
  }
  return (
    <Testimonials
      eyebrow={String(block.eyebrow ?? "Testimonials")}
      title={String(block.title ?? "")}
      disclaimer={typeof block.disclaimer === "string" ? block.disclaimer : undefined}
      testimonials={items}
    />
  );
}

async function renderContactStrip(block: GenericBlock, site: SiteSettings) {
  const offices = await getOffices();
  return (
    <ContactStrip
      eyebrow={String(block.eyebrow ?? "Get in touch")}
      title={String(block.title ?? "")}
      subtitle={typeof block.subtitle === "string" ? block.subtitle : undefined}
      callCtaLabel={String(block.callCtaLabel ?? "Call now")}
      whatsappCtaLabel={String(block.whatsappCtaLabel ?? "WhatsApp us")}
      emailCtaLabel={String(block.emailCtaLabel ?? "Email us")}
      callHref={`tel:${site.contact.phone.replace(/\s/g, "")}`}
      whatsappHref={whatsappUrl(site.contact.whatsappE164, site.whatsapp.prefillChat)}
      emailHref={`mailto:${site.contact.emailInfo}`}
      mapHref={headOfficeMapsUrl}
      mapCtaLabel={String(block.mapCtaLabel ?? contactStripCopy.mapCta)}
      offices={offices}
    />
  );
}

async function renderClientLogos(block: GenericBlock) {
  const logos = await getClientLogos();
  return (
    <ClientLogos
      eyebrow={String(block.eyebrow ?? "Trusted by teams at")}
      logos={logos}
    />
  );
}

async function renderRichText(block: GenericBlock) {
  // Lexical content rendering is intentionally minimal here — for arbitrary copy.
  // We render the serialized JSON as a JSON.stringify guard, suitable for editors
  // who want to dump quick text. Improve later with a proper Lexical renderer.
  const muted = Boolean(block.muted);
  const content = block.content;
  const fallback = (
    <section className={`py-12 ${muted ? "bg-surface" : ""}`}>
      <div className="mx-auto max-w-3xl px-6 text-center text-sm text-muted">
        Edit this rich-text block in /admin → Home page.
      </div>
    </section>
  );
  if (!content) return fallback;
  return fallback;
}

export async function RenderBlocks({
  blocks,
  site,
}: {
  blocks: HomePageBlock[];
  site: SiteSettings;
}) {
  const rendered = await Promise.all(
    blocks.map(async (block, index) => {
      const block_ = block as GenericBlock;
      const key = block_.id ?? `${block_.blockType}-${index}`;
      switch (block_.blockType) {
        case "hero":
          return <Fragment key={key}>{await renderHero(block_, site)}</Fragment>;
        case "statsStrip":
          return <Fragment key={key}>{await renderStatsStrip(block_)}</Fragment>;
        case "serviceTiles":
          return <Fragment key={key}>{await renderServiceTiles(block_)}</Fragment>;
        case "advocatesShowcase":
          return <Fragment key={key}>{await renderAdvocates(block_)}</Fragment>;
        case "legalUpdates":
          return <Fragment key={key}>{await renderLegalUpdates(block_)}</Fragment>;
        case "testimonials":
          return <Fragment key={key}>{await renderTestimonials(block_)}</Fragment>;
        case "contactStrip":
          return <Fragment key={key}>{await renderContactStrip(block_, site)}</Fragment>;
        case "clientLogos":
          return <Fragment key={key}>{await renderClientLogos(block_)}</Fragment>;
        case "richText":
          return <Fragment key={key}>{await renderRichText(block_)}</Fragment>;
        default:
          return null;
      }
    }),
  );

  return <>{rendered}</>;
}
