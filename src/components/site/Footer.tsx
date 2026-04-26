import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brandName, footerCopy } from "@/content/pageCopy";
import { contactChannels, headOfficeMapsUrl, offices, socialProfiles, whatsappPrefillChat } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const waChat = whatsappUrl(contactChannels.whatsappE164, whatsappPrefillChat);

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-10 pt-14 text-sm text-muted">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="font-display text-lg font-semibold text-foreground">{footerCopy.brandTitle}</div>
          <p className="max-w-md leading-relaxed">{footerCopy.tagline}</p>
          <p className="text-xs leading-relaxed text-muted/90">
            <strong className="text-foreground">{footerCopy.disclaimerLabel}</strong> {footerCopy.disclaimerBody}
          </p>
          <div className="pt-2">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/85">
              {footerCopy.socialHeading}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={socialProfiles.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brandName} on Instagram`}
                className="group relative flex size-12 items-center justify-center rounded-2xl border border-border/90 bg-surface-elevated/70 text-muted shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#E4405F]/55 hover:bg-[#E4405F]/12 hover:text-[#f77737] hover:shadow-[0_12px_40px_-12px_rgba(228,64,95,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 20%, rgba(247,119,55,0.22), transparent 55%), radial-gradient(100% 100% at 80% 80%, rgba(228,64,95,0.2), transparent 50%)",
                  }}
                />
                <InstagramGlyph className="relative size-[22px]" />
              </a>
              <a
                href={socialProfiles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brandName} on LinkedIn`}
                className="group relative flex size-12 items-center justify-center rounded-2xl border border-border/90 bg-surface-elevated/70 text-muted shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#0A66C2]/55 hover:bg-[#0A66C2]/12 hover:text-[#70b5f9] hover:shadow-[0_12px_40px_-12px_rgba(10,102,194,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <LinkedInGlyph className="relative size-[22px]" />
              </a>
              <a
                href={waChat}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="group relative flex size-12 items-center justify-center rounded-2xl border border-border/90 bg-surface-elevated/70 text-muted shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#25D366]/55 hover:bg-[#25D366]/12 hover:text-[#5fe49b] hover:shadow-[0_12px_40px_-12px_rgba(37,211,102,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <WhatsAppGlyph className="relative size-[22px]" />
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 font-semibold text-foreground">{footerCopy.exploreHeading}</div>
          <ul className="space-y-2">
            {footerCopy.links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 font-semibold text-foreground">{footerCopy.contactHeading}</div>
          <ul className="space-y-2">
            <li>
              <span className="text-foreground">{footerCopy.phoneLabel}</span>{" "}
              <a href={`tel:${contactChannels.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {contactChannels.phone}
              </a>
            </li>
            <li>
              <span className="text-foreground">{footerCopy.whatsappLabel}</span>{" "}
              <a href={waChat} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
                {footerCopy.whatsappLink}
              </a>
            </li>
            <li>
              <span className="text-foreground">{footerCopy.emailLabel}</span>{" "}
              <a href={`mailto:${contactChannels.emailInfo}`} className="hover:text-accent">
                {contactChannels.emailInfo}
              </a>
            </li>
          </ul>
          <div className="mt-6 space-y-4">
            {offices.map((office) => (
              <div key={office.label}>
                <div className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                  {office.label}
                </div>
                <div className="mt-1 text-xs leading-relaxed">
                  {office.lines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <a
                  href={headOfficeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                >
                  {footerCopy.mapLinkLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="mt-10 flex flex-col gap-2 border-t border-border/80 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>{footerCopy.copyright(new Date().getFullYear())}</span>
        <span className="text-muted/80">{footerCopy.inspiredNote}</span>
      </Container>
    </footer>
  );
}
