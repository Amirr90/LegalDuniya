import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { contactChannels, offices, whatsappPrefillChat } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const waChat = whatsappUrl(contactChannels.whatsappE164, whatsappPrefillChat);

export function ContactStrip() {
  return (
    <section className="border-y border-border bg-gradient-to-r from-surface via-background to-surface py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ScrollReveal delayMs={40}>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get in touch</p>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Offices in Lucknow, Delhi, and Hyderabad
            </h2>
            <p className="text-muted">
              Prefer a call? Our intake team routes you to the right practice group in minutes—not days.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`tel:${contactChannels.phone.replace(/\s/g, "")}`} variant="primary" external>
                Call now
              </ButtonLink>
              <ButtonLink href={waChat} variant="outline" external>
                WhatsApp us
              </ButtonLink>
              <ButtonLink href={`mailto:${contactChannels.emailInfo}`} variant="outline" external>
                Email us
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>

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
      </Container>
    </section>
  );
}
