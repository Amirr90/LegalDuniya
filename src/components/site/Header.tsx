import { HeaderClient } from "@/components/site/HeaderClient";
import { getSiteSettings } from "@/lib/cms";
import { getHeaderMenus } from "@/lib/headerMenus";
import { whatsappUrl } from "@/lib/whatsapp";

const NAV_LINKS = [{ href: "/", label: "Home" }] as const;

const ALL_SERVICES_MENU_ITEM = { label: "All", href: "/services" } as const;

export async function Header() {
  const [settings, menus] = await Promise.all([getSiteSettings(), getHeaderMenus()]);
  const whatsappHref = whatsappUrl(
    settings.contact.whatsappE164,
    settings.whatsapp.prefillHeader,
  );

  return (
    <HeaderClient
      brandName={settings.brandName}
      whatsappHref={whatsappHref}
      navLinks={NAV_LINKS}
      allServicesMenuItem={ALL_SERVICES_MENU_ITEM}
      menus={menus}
    />
  );
}
