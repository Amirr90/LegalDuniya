import { AdvocatesShowcase } from "@/components/sections/AdvocatesShowcase";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Hero } from "@/components/sections/Hero";
import { LegalUpdates } from "@/components/sections/LegalUpdates";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <AdvocatesShowcase />
      <LegalUpdates />
      <Testimonials />
      <ContactStrip />
      <ClientLogos />
    </>
  );
}
