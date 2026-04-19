import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { contactChannels, offices, whatsappPrefillChat } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const waChat = whatsappUrl(contactChannels.whatsappE164, whatsappPrefillChat);

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/#top-services", label: "Services" },
  { href: "/#updates", label: "Legal news" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-10 pt-14 text-sm text-muted">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="font-display text-lg font-semibold text-foreground">LexBridge</div>
          <p className="max-w-md leading-relaxed">
            LexBridge is a legal-technology platform inspired by modern advocate marketplaces. We connect
            individuals and businesses with verified counsel for chat or call consultations—nationwide,
            confidential, and efficient.
          </p>
          <p className="text-xs leading-relaxed text-muted/90">
            <strong className="text-foreground">Disclaimer:</strong> Listings are informational and do not
            constitute a referral or endorsement. Nothing on this site is legal advice; consult a qualified
            advocate for your matter.
          </p>
        </div>

        <div>
          <div className="mb-3 font-semibold text-foreground">Explore</div>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 font-semibold text-foreground">Contact</div>
          <ul className="space-y-2">
            <li>
              <span className="text-foreground">Phone:</span>{" "}
              <a href={`tel:${contactChannels.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {contactChannels.phone}
              </a>
            </li>
            <li>
              <span className="text-foreground">WhatsApp:</span>{" "}
              <a href={waChat} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
                Chat with a lawyer
              </a>
            </li>
            <li>
              <span className="text-foreground">Email:</span>{" "}
              <a href={`mailto:${contactChannels.emailInfo}`} className="hover:text-accent">
                {contactChannels.emailInfo}
              </a>
            </li>
            <li>
              <span className="text-foreground">Care:</span>{" "}
              <a href={`mailto:${contactChannels.emailCare}`} className="hover:text-accent">
                {contactChannels.emailCare}
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
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="mt-10 flex flex-col gap-2 border-t border-border/80 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} LexBridge. All rights reserved.</span>
        <span className="text-muted/80">Inspired by public legal marketplace patterns—not affiliated with any specific operator.</span>
      </Container>
    </footer>
  );
}
