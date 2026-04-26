import { whatsappUrl } from "@/lib/whatsapp";
import type { SiteSettings } from "@/lib/cms";

export type CtaTarget =
  | "contact"
  | "whatsappChat"
  | "whatsappTalk"
  | "phone"
  | "custom";

/** Resolve a CMS CTA target+href into an actual URL string. */
export function resolveCtaHref(
  target: CtaTarget | string | undefined,
  customHref: string | undefined,
  site: SiteSettings,
): string {
  switch (target) {
    case "contact":
      return "/contact";
    case "whatsappChat":
      return whatsappUrl(site.contact.whatsappE164, site.whatsapp.prefillChat);
    case "whatsappTalk":
      return whatsappUrl(site.contact.whatsappE164, site.whatsapp.prefillTalk);
    case "phone":
      return `tel:${site.contact.phone.replace(/\s/g, "")}`;
    case "custom":
    default:
      return customHref || "/contact";
  }
}

export function isExternalCta(target: CtaTarget | string | undefined): boolean {
  return target === "whatsappChat" || target === "whatsappTalk" || target === "phone";
}
