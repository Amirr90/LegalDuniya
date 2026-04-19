import { Fragment } from "react";
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
import { homePage } from "@/content/pageCopy";
import { homeServiceSections, servicesCatalogHref } from "@/content/servicePages";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      {homeServiceSections.map((section, index) => (
        <Fragment key={section.id}>
          <TopServiceTiles section={section} muted={index % 2 === 0} />
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
      <AdvocatesShowcase />
      <LegalUpdates />
      <Testimonials />
      <ContactStrip />
      <ClientLogos />
    </>
  );
}
