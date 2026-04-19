import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getContactTopicLabel } from "@/content/contactTopics";
import { contactPage } from "@/content/pageCopy";
import { contactChannels, offices } from "@/content/site";

export const metadata: Metadata = contactPage.metadata;

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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{contactPage.eyebrow}</p>
              <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">{contactPage.title}</h1>
              {topic ? (
                <p className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-foreground">
                  {contactPage.topicLinePrefix}{" "}
                  <span className="font-semibold">{topicLabel || topic}</span>
                </p>
              ) : null}
              <p className="text-muted">{contactPage.intro}</p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {contactPage.phoneLabel}
                  </dt>
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
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {contactPage.emailLabel}
                  </dt>
                  <dd className="mt-1 space-y-1">
                    <div>
                      <a href={`mailto:${contactChannels.emailInfo}`} className="hover:text-accent">
                        {contactChannels.emailInfo}
                      </a>
                    </div>
                    <div>
                      <span className="text-muted">{contactPage.carePrefix}</span>
                      <a href={`mailto:${contactChannels.emailCare}`} className="hover:text-accent">
                        {contactChannels.emailCare}
                      </a>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground">{contactPage.officesHeading}</h2>
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
