import { Fragment } from "react";
import { draftMode } from "next/headers";
import { AdvocatesShowcase } from "@/components/sections/AdvocatesShowcase";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Hero } from "@/components/sections/Hero";
import { LegalUpdates } from "@/components/sections/LegalUpdates";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { TopServiceTiles } from "@/components/sections/TopServiceTiles";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RenderBlocks } from "@/components/render/RenderBlocks";
import {
  advocatesShowcaseCopy,
  clientLogosCopy,
  contactStripCopy,
  heroCopy,
  homePage,
  legalUpdatesCopy,
  testimonialsCopy,
} from "@/content/pageCopy";
import { servicesCatalogHref } from "@/content/servicePages";
import {
  getAdvocates,
  getClientLogos,
  getFeaturedServices,
  getHomePage,
  getLegalUpdates,
  getOffices,
  getSiteSettings,
  getSpecializedServices,
  getStats,
  getTestimonials,
} from "@/lib/cms";
import { headOfficeMapsUrl } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const revalidate = 60;

export default async function Home() {
  const { isEnabled: isDraft } = await draftMode();
  const [home, site] = await Promise.all([
    getHomePage({ draft: isDraft }),
    getSiteSettings(),
  ]);

  // CMS-driven layout (admin-controlled)
  if (home && home.layout && home.layout.length > 0) {
    return <RenderBlocks blocks={home.layout} site={site} />;
  }

  // Fallback to legacy fixed layout, but with data from CMS where available so the
  // site renders before the admin has picked a layout.
  const [featured, specialized, advocates, testimonials, legalUpdates, offices, clientLogos, stats] =
    await Promise.all([
      getFeaturedServices(),
      getSpecializedServices(),
      getAdvocates(),
      getTestimonials(),
      getLegalUpdates(6),
      getOffices(),
      getClientLogos(),
      getStats(),
    ]);

  const waChat = whatsappUrl(site.contact.whatsappE164, site.whatsapp.prefillChat);

  const sections: Array<{ id: string; eyebrow: string; title: string; description: string; tiles: typeof featured }> = [];
  if (featured.length) {
    sections.push({
      id: "top-services",
      eyebrow: "Top services",
      title: "Browse top legal services",
      description:
        "Pick a category that matches your matter. Each card opens a deep overview, sample timelines, fee bands, and an intake form.",
      tiles: featured,
    });
  }
  if (specialized.length) {
    sections.push({
      id: "specialized-services",
      eyebrow: "Specialized services",
      title: "Niche practice areas",
      description:
        "Targeted advocacy for cyber, IP, regulatory, environmental, and constitutional matters where domain depth shifts outcomes.",
      tiles: specialized,
    });
  }

  return (
    <>
      <Hero
        headline={heroCopy.headline}
        subtext={heroCopy.subtext}
        checklist={heroCopy.checklist}
        primaryCta={{ label: heroCopy.primaryCta, href: "/contact" }}
        secondaryCta={{ label: heroCopy.secondaryCta, href: waChat, external: true }}
      />
      <StatsStrip stats={stats} />
      {sections.map((section, index) => (
        <Fragment key={section.id}>
          <TopServiceTiles
            id={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            tiles={section.tiles}
            muted={index % 2 === 0}
          />
          {section.id === "top-services" ? (
            <div className={index % 2 === 0 ? "bg-surface" : ""}>
              <Container className="flex justify-center pb-14 pt-2 sm:pb-16 sm:pt-3">
                <ButtonLink href={servicesCatalogHref} variant="outline">
                  {homePage.viewAllServicesCta}
                </ButtonLink>
              </Container>
            </div>
          ) : null}
        </Fragment>
      ))}
      <AdvocatesShowcase
        eyebrow={advocatesShowcaseCopy.eyebrow}
        title={advocatesShowcaseCopy.title}
        subtitle={advocatesShowcaseCopy.subtitle}
        viewAllLinkLabel={advocatesShowcaseCopy.viewAllLink}
        cardCtaLabel={advocatesShowcaseCopy.cardCta}
        advocates={advocates}
      />
      <LegalUpdates
        eyebrow={legalUpdatesCopy.eyebrow}
        title={legalUpdatesCopy.title}
        subtitle={legalUpdatesCopy.subtitle}
        ctaLabel={legalUpdatesCopy.ctaLink}
        items={legalUpdates}
      />
      <Testimonials
        eyebrow={testimonialsCopy.eyebrow}
        title={testimonialsCopy.title}
        disclaimer={testimonialsCopy.disclaimer}
        testimonials={testimonials}
      />
      <ContactStrip
        eyebrow={contactStripCopy.eyebrow}
        title={contactStripCopy.title}
        subtitle={contactStripCopy.subtitle}
        callCtaLabel={contactStripCopy.callCta}
        whatsappCtaLabel={contactStripCopy.whatsappCta}
        emailCtaLabel={contactStripCopy.emailCta}
        callHref={`tel:${site.contact.phone.replace(/\s/g, "")}`}
        whatsappHref={waChat}
        emailHref={`mailto:${site.contact.emailInfo}`}
        mapHref={headOfficeMapsUrl}
        mapCtaLabel={contactStripCopy.mapCta}
        offices={offices}
      />
      <ClientLogos eyebrow={clientLogosCopy.eyebrow} logos={clientLogos} />
    </>
  );
}
