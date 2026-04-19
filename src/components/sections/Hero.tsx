import { HeroVisual } from "@/components/sections/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { contactChannels, whatsappPrefillChat, whatsappPrefillTalk } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const heroImage =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80";

const waTalk = whatsappUrl(contactChannels.whatsappE164, whatsappPrefillTalk);
const waChat = whatsappUrl(contactChannels.whatsappE164, whatsappPrefillChat);

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface to-background">
      <div className="hero-backdrop-aurora" aria-hidden />
      <div className="hero-backdrop-grid" aria-hidden />
      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <ScrollReveal rootMargin="22% 0px -12% 0px">
          <div className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Legal work, streamlined</p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Serious legal work—handled by verified counsel, on your timeline.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              From filings and diligence to disputes and compliance: connect with advocates for family, property,
              corporate, criminal, and regulatory matters. Confidential consultations with clear, practical guidance.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={waTalk} variant="primary" external>
                Talk to lawyer
              </ButtonLink>
              <ButtonLink href={waChat} variant="outline" external>
                Chat with lawyer
              </ButtonLink>
            </div>
            <dl className="grid max-w-lg grid-cols-2 gap-4 text-sm text-muted sm:grid-cols-3">
              <div className="rounded-xl border border-border/80 bg-surface/60 p-3">
                <dt className="text-xs uppercase tracking-wide text-muted">Experts</dt>
                <dd className="font-display text-xl font-semibold text-foreground">700+</dd>
              </div>
              <div className="rounded-xl border border-border/80 bg-surface/60 p-3">
                <dt className="text-xs uppercase tracking-wide text-muted">Cities</dt>
                <dd className="font-display text-xl font-semibold text-foreground">100+</dd>
              </div>
              <div className="col-span-2 rounded-xl border border-border/80 bg-surface/60 p-3 sm:col-span-1">
                <dt className="text-xs uppercase tracking-wide text-muted">Availability</dt>
                <dd className="font-display text-xl font-semibold text-foreground">24/7</dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>

        <HeroVisual heroImage={heroImage} />
      </Container>
    </section>
  );
}
