import { HeroVisual } from "@/components/sections/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80";

export type HeroCta = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeroProps = {
  headline: string;
  subtext?: string;
  checklist?: readonly string[];
  primaryCta?: HeroCta | null;
  secondaryCta?: HeroCta | null;
  imageSrc?: string;
};

export function Hero({
  headline,
  subtext,
  checklist,
  primaryCta,
  secondaryCta,
  imageSrc = FALLBACK_HERO_IMAGE,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface to-background">
      <div className="hero-backdrop-aurora" aria-hidden />
      <div className="hero-backdrop-grid" aria-hidden />
      <div className="hero-backdrop-legal" aria-hidden>
        <div className="hero-backdrop-legal-drift">
          <svg
            className="hero-backdrop-legal-svg"
            viewBox="0 0 1000 640"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <g className="hero-backdrop-legal-doc" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
              <rect x="36" y="72" width="320" height="496" rx="5" opacity="0.22" fill="currentColor" stroke="none" />
              <line x1="68" y1="118" x2="328" y2="118" opacity="0.45" />
              <line x1="68" y1="152" x2="300" y2="152" opacity="0.35" />
              <line x1="68" y1="186" x2="312" y2="186" opacity="0.35" />
              <line x1="68" y1="220" x2="280" y2="220" opacity="0.3" />
              <line x1="68" y1="254" x2="308" y2="254" opacity="0.3" />
              <line x1="56" y1="96" x2="56" y2="548" opacity="0.5" />
            </g>
            <g className="hero-backdrop-legal-scales" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="720" y1="520" x2="720" y2="168" opacity="0.55" />
              <line x1="560" y1="168" x2="880" y2="168" opacity="0.55" />
              <ellipse cx="618" cy="212" rx="46" ry="20" opacity="0.38" />
              <ellipse cx="822" cy="212" rx="46" ry="20" opacity="0.38" />
              <line x1="572" y1="168" x2="572" y2="200" opacity="0.4" />
              <line x1="868" y1="168" x2="868" y2="200" opacity="0.4" />
              <circle cx="720" cy="168" r="5" opacity="0.5" fill="currentColor" stroke="none" />
            </g>
            <g className="hero-backdrop-legal-secondary" fill="none" strokeWidth="0.75" strokeLinecap="round" opacity="0.55">
              <path d="M 420 420 Q 520 360 620 400 T 820 380" opacity="0.4" />
              <line x1="380" y1="480" x2="900" y2="440" opacity="0.25" />
            </g>
          </svg>
        </div>
      </div>
      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <ScrollReveal rootMargin="22% 0px -12% 0px">
          <div className="space-y-8">
            <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            {subtext ? (
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{subtext}</p>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {primaryCta ? (
                  <ButtonLink href={primaryCta.href} variant="primary" external={primaryCta.external}>
                    {primaryCta.label}
                  </ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant="outline" external={secondaryCta.external}>
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            )}
            {checklist && checklist.length > 0 ? (
              <ul className="flex max-w-xl flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <span className="font-semibold text-accent" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </ScrollReveal>

        <HeroVisual heroImage={imageSrc} />
      </Container>
    </section>
  );
}
