import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getContactTopicLabel } from "@/content/contactTopics";
import { contactChannels, offices } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact LexBridge",
  description:
    "Reach LexBridge by phone, email, or the contact form for consultations and intake. We respond to time-sensitive criminal and cyber matters quickly.",
};

type PageProps = {
  searchParams: Promise<{ topic?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const { topic: topicRaw } = await searchParams;
  const topic = topicRaw?.trim() || undefined;
  const topicLabel = topic ? getContactTopicLabel(topic) : "";

  return (
    <div className="border-b border-border bg-gradient-to-b from-background to-surface py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ScrollReveal rootMargin="12% 0px -10% 0px">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
              <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">Let&apos;s talk</h1>
              {topic ? (
                <p className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-foreground">
                  You&apos;re contacting us about:{" "}
                  <span className="font-semibold">{topicLabel || topic}</span>
                </p>
              ) : null}
              <p className="text-muted">
                Share a short summary of your matter and preferred contact window. For emergencies, call the
                number below—our intake desk will prioritize time-sensitive criminal and cyber incidents.
              </p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${contactChannels.phone.replace(/\s/g, "")}`}
                      className="text-accent hover:underline"
                    >
                      {contactChannels.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Email</dt>
                  <dd className="mt-1 space-y-1">
                    <div>
                      <a href={`mailto:${contactChannels.emailInfo}`} className="hover:text-accent">
                        {contactChannels.emailInfo}
                      </a>
                    </div>
                    <div>
                      <span className="text-muted">Care: </span>
                      <a href={`mailto:${contactChannels.emailCare}`} className="hover:text-accent">
                        {contactChannels.emailCare}
                      </a>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground">Offices</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {offices.map((office) => (
                    <div key={office.label} className="rounded-2xl border border-border bg-surface-elevated/60 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-accent">{office.label}</div>
                      <div className="mt-2 text-xs text-muted">
                        {office.lines.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100} rootMargin="12% 0px -10% 0px">
            <ContactForm initialTopic={topic} />
          </ScrollReveal>
        </div>
      </Container>
    </div>
  );
}
