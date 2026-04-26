import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export type OfficeCard = {
  label: string;
  lines: readonly string[];
};

export type ContactStripProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  callCtaLabel: string;
  whatsappCtaLabel: string;
  emailCtaLabel: string;
  callHref: string;
  whatsappHref: string;
  emailHref: string;
  /** Google Maps (or other) directions URL for the head office. */
  mapHref?: string;
  mapCtaLabel?: string;
  offices: readonly OfficeCard[];
};

export function ContactStrip({
  eyebrow,
  title,
  subtitle,
  callCtaLabel,
  whatsappCtaLabel,
  emailCtaLabel,
  callHref,
  whatsappHref,
  emailHref,
  mapHref,
  mapCtaLabel,
  offices,
}: ContactStripProps) {
  return (
    <section className="border-y border-border bg-gradient-to-r from-surface via-background to-surface py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ScrollReveal delayMs={40}>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              {title}
            </h2>
            {subtitle ? <p className="text-muted">{subtitle}</p> : null}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={callHref} variant="primary" external>
                {callCtaLabel}
              </ButtonLink>
              <ButtonLink href={whatsappHref} variant="outline" external>
                {whatsappCtaLabel}
              </ButtonLink>
              <ButtonLink href={emailHref} variant="outline" external>
                {emailCtaLabel}
              </ButtonLink>
              {mapHref && mapCtaLabel ? (
                <ButtonLink href={mapHref} variant="outline" external>
                  {mapCtaLabel}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </ScrollReveal>

        {offices.length > 0 ? (
          <StaggerReveal className="grid gap-4 sm:grid-cols-2">
            {offices.map((office) => (
              <div
                key={office.label}
                className="card-interactive rounded-2xl border border-border bg-surface-elevated/60 p-4 hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-accent">{office.label}</div>
                <div className="mt-2 text-sm text-muted">
                  {office.lines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </StaggerReveal>
        ) : null}
      </Container>
    </section>
  );
}
