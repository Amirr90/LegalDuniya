import { AdvocatesShowcase } from "@/components/sections/AdvocatesShowcase";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Hero } from "@/components/sections/Hero";
import { LegalUpdates } from "@/components/sections/LegalUpdates";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { TopServiceTiles } from "@/components/sections/TopServiceTiles";
import { homeServiceSections } from "@/content/servicePages";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      {homeServiceSections.map((section, index) => (
        <TopServiceTiles key={section.id} section={section} muted={index % 2 === 0} />
      ))}
      <AdvocatesShowcase />
      <LegalUpdates />
      <Testimonials />
      <ContactStrip />
      <ClientLogos />
    </>
  );
}
