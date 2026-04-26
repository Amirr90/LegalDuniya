/**
 * CMS data layer. Public server components import from here instead of touching
 * `src/content/*` directly. Behavior:
 *
 * 1. If the Payload DB is reachable AND has data, return the live data.
 * 2. Otherwise, return a fallback derived from `src/content/*` so the site still
 *    renders during local development before Postgres is configured.
 *
 * Each loader is wrapped in React's `cache()` so calls within a single request
 * are deduplicated automatically.
 */
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  advocates as legacyAdvocates,
  clientLogos as legacyClientLogos,
  contactChannels as legacyContact,
  legalUpdates as legacyLegalUpdates,
  offices as legacyOffices,
  socialProfiles as legacySocial,
  stats as legacyStats,
  testimonials as legacyTestimonials,
  whatsappPrefillChat as legacyPrefillChat,
  whatsappPrefillHeader as legacyPrefillHeader,
  whatsappPrefillTalk as legacyPrefillTalk,
} from "@/content/site";
import { brandName, footerCopy } from "@/content/pageCopy";
import { homeServiceSections } from "@/content/servicePages";
import {
  businessIprMenu,
  comprehensiveLegalSolutionLinks,
  headerServiceStripLinks,
  lawyerServicesMenu,
  propertyServicesMenu,
  propertySuggestedLinks,
  serviceCategories,
} from "@/content/menus";
import {
  getServicePage as legacyGetServicePage,
  type ServicePageContent,
} from "@/content/servicePages";

/* ─────────────────────────── shared shapes ───────────────────────────── */

export type ImageRef = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type SiteSettings = {
  brandName: string;
  tagline: string;
  contact: {
    phone: string;
    whatsappE164: string;
    emailInfo: string;
    emailCare: string;
  };
  whatsapp: {
    prefillChat: string;
    prefillTalk: string;
    prefillHeader: string;
  };
  social: {
    instagram: string;
    linkedin: string;
  };
  theme: {
    background: string;
    foreground: string;
    muted: string;
    surface: string;
    surfaceElevated: string;
    border: string;
    accent: string;
    accentForeground: string;
    glow: string;
  };
  logo: ImageRef | null;
  favicon: ImageRef | null;
  ogImage: ImageRef | null;
};

export type ServiceTile = {
  title: string;
  slug: string;
  imageSrc: string;
  tagline?: string;
  featured?: boolean;
};

export type Advocate = {
  name: string;
  practice: string;
  imageSrc: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location?: string;
};

export type LegalUpdate = {
  title: string;
  date: string;
  slug?: string;
};

export type Office = {
  label: string;
  lines: string[];
};

export type StatItem = { value: string; label: string };

export type MenuLink = {
  label: string;
  href: string;
  icon?: string;
  ariaLabel?: string;
  children?: MenuLink[];
};

export type ServiceArticleSection = {
  heading: string;
  body: string;
};

export type ServiceLanding = {
  slug: string;
  title: string;
  tagline?: string;
  heroImageSrc: string;
  heroSummary: string;
  articleLead: string;
  sections: ServiceArticleSection[];
  metaDescription: string;
};

/* ──────────────────────────── defaults ──────────────────────────────── */

const DEFAULT_THEME: SiteSettings["theme"] = {
  background: "#0a0c10",
  foreground: "#eef0f4",
  muted: "#a8b3c4",
  surface: "#121822",
  surfaceElevated: "#1a2230",
  border: "#2a3545",
  accent: "#d4af37",
  accentForeground: "#0a0c10",
  glow: "#4a6fa5",
};

const FALLBACK_TILE_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80";

const FALLBACK_ADVOCATE_IMAGE =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&q=80";

/* ───────────────────── payload bridge with fallbacks ─────────────────── */

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

let payloadPromise: Promise<PayloadInstance> | null = null;

async function tryGetPayload(): Promise<PayloadInstance | null> {
  if (!process.env.DATABASE_URI) return null;
  if (!payloadPromise) {
    payloadPromise = getPayload({ config }).catch((err) => {
      console.warn("[cms] Payload not available, falling back to static content:", err?.message);
      payloadPromise = null;
      throw err;
    });
  }
  try {
    return await payloadPromise;
  } catch {
    return null;
  }
}

function mediaToImageRef(value: unknown): ImageRef | null {
  if (!value || typeof value !== "object") return null;
  const m = value as { url?: string; alt?: string; width?: number; height?: number };
  if (!m.url) return null;
  return { url: m.url, alt: m.alt ?? "", width: m.width, height: m.height };
}

/* ───────────────────────── site settings ─────────────────────────────── */

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const fallback: SiteSettings = {
    brandName,
    tagline: footerCopy.tagline,
    contact: {
      phone: legacyContact.phone,
      whatsappE164: legacyContact.whatsappE164,
      emailInfo: legacyContact.emailInfo,
      emailCare: legacyContact.emailCare,
    },
    whatsapp: {
      prefillChat: legacyPrefillChat,
      prefillTalk: legacyPrefillTalk,
      prefillHeader: legacyPrefillHeader,
    },
    social: {
      instagram: legacySocial.instagram,
      linkedin: legacySocial.linkedin,
    },
    theme: { ...DEFAULT_THEME },
    logo: null,
    favicon: null,
    ogImage: null,
  };

  const payload = await tryGetPayload();
  if (!payload) return fallback;

  try {
    const doc = (await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    })) as Record<string, unknown> | null;

    if (!doc) return fallback;

    const theme = (doc.theme as Partial<SiteSettings["theme"]>) ?? {};

    return {
      brandName: (doc.brandName as string) || fallback.brandName,
      tagline: (doc.tagline as string) || fallback.tagline,
      contact: {
        phone: (doc.phone as string) || fallback.contact.phone,
        whatsappE164: (doc.whatsappE164 as string) || fallback.contact.whatsappE164,
        emailInfo: (doc.emailInfo as string) || fallback.contact.emailInfo,
        emailCare: (doc.emailCare as string) || fallback.contact.emailCare,
      },
      whatsapp: {
        prefillChat: (doc.whatsappPrefillChat as string) || fallback.whatsapp.prefillChat,
        prefillTalk: (doc.whatsappPrefillTalk as string) || fallback.whatsapp.prefillTalk,
        prefillHeader: (doc.whatsappPrefillHeader as string) || fallback.whatsapp.prefillHeader,
      },
      social: {
        instagram: (doc.instagramUrl as string) || fallback.social.instagram,
        linkedin: (doc.linkedinUrl as string) || fallback.social.linkedin,
      },
      theme: {
        background: theme.background || fallback.theme.background,
        foreground: theme.foreground || fallback.theme.foreground,
        muted: theme.muted || fallback.theme.muted,
        surface: theme.surface || fallback.theme.surface,
        surfaceElevated: theme.surfaceElevated || fallback.theme.surfaceElevated,
        border: theme.border || fallback.theme.border,
        accent: theme.accent || fallback.theme.accent,
        accentForeground: theme.accentForeground || fallback.theme.accentForeground,
        glow: theme.glow || fallback.theme.glow,
      },
      logo: mediaToImageRef(doc.logo),
      favicon: mediaToImageRef(doc.favicon),
      ogImage: mediaToImageRef(doc.ogImage),
    };
  } catch {
    return fallback;
  }
});

/* ─────────────────────────── services ────────────────────────────────── */

function legacyTilesByFlag(featured: boolean): ServiceTile[] {
  const top = homeServiceSections.find((s) => s.id === "top-services")?.tiles ?? [];
  const specialized = homeServiceSections.find((s) => s.id === "specialized-services")?.tiles ?? [];
  if (featured) {
    return top.map((t) => ({
      title: t.title,
      slug: t.slug,
      imageSrc: t.imageSrc,
      tagline: t.tagline,
      featured: true,
    }));
  }
  return specialized.map((t) => ({
    title: t.title,
    slug: t.slug,
    imageSrc: t.imageSrc,
    tagline: t.tagline,
    featured: false,
  }));
}

function serviceDocToTile(doc: Record<string, unknown>): ServiceTile {
  const heroImage = mediaToImageRef(doc.heroImage);
  const tagline = typeof doc.tagline === "string" && doc.tagline ? doc.tagline : undefined;
  return {
    title: doc.title as string,
    slug: doc.slug as string,
    imageSrc: heroImage?.url ?? FALLBACK_TILE_IMAGE,
    tagline,
    featured: Boolean(doc.featured),
  };
}

export const getFeaturedServices = cache(async (): Promise<ServiceTile[]> => {
  const payload = await tryGetPayload();
  if (!payload) return legacyTilesByFlag(true);
  try {
    const res = await payload.find({
      collection: "services",
      where: { featured: { equals: true } },
      sort: "order",
      limit: 200,
      depth: 1,
    });
    if (res.docs.length === 0) return legacyTilesByFlag(true);
    return res.docs.map((d) => serviceDocToTile(d as Record<string, unknown>));
  } catch {
    return legacyTilesByFlag(true);
  }
});

export const getSpecializedServices = cache(async (): Promise<ServiceTile[]> => {
  const payload = await tryGetPayload();
  if (!payload) return legacyTilesByFlag(false);
  try {
    const res = await payload.find({
      collection: "services",
      where: { featured: { not_equals: true } },
      sort: "order",
      limit: 200,
      depth: 1,
    });
    if (res.docs.length === 0) return legacyTilesByFlag(false);
    return res.docs.map((d) => serviceDocToTile(d as Record<string, unknown>));
  } catch {
    return legacyTilesByFlag(false);
  }
});

export const getServicesByIds = cache(async (ids: (string | number)[]): Promise<ServiceTile[]> => {
  if (ids.length === 0) return [];
  const payload = await tryGetPayload();
  if (!payload) return [];
  try {
    const res = await payload.find({
      collection: "services",
      where: { id: { in: ids } },
      limit: ids.length,
      depth: 1,
    });
    const bySlug = new Map(res.docs.map((d) => [String((d as { id: string | number }).id), d]));
    return ids
      .map((id) => bySlug.get(String(id)))
      .filter((d): d is NonNullable<typeof d> => Boolean(d))
      .map((d) => serviceDocToTile(d as Record<string, unknown>));
  } catch {
    return [];
  }
});

export const getAllServices = cache(async (): Promise<ServiceTile[]> => {
  const payload = await tryGetPayload();
  if (!payload) {
    return [...legacyTilesByFlag(true), ...legacyTilesByFlag(false)];
  }
  try {
    const res = await payload.find({
      collection: "services",
      sort: "order",
      limit: 1000,
      depth: 1,
    });
    if (res.docs.length === 0) {
      return [...legacyTilesByFlag(true), ...legacyTilesByFlag(false)];
    }
    return res.docs.map((d) => serviceDocToTile(d as Record<string, unknown>));
  } catch {
    return [...legacyTilesByFlag(true), ...legacyTilesByFlag(false)];
  }
});

export const getAllServiceSlugs = cache(async (): Promise<string[]> => {
  const services = await getAllServices();
  return services.map((s) => s.slug);
});

const _getServiceBySlug = cache(
  async (slug: string, draft: boolean): Promise<ServiceLanding | null> => {
    const payload = await tryGetPayload();
    if (payload) {
      try {
        const res = await payload.find({
          collection: "services",
          where: { slug: { equals: slug } },
          limit: 1,
          depth: 1,
          draft,
        });
        const doc = res.docs[0] as Record<string, unknown> | undefined;
        if (doc) {
          const heroImage = mediaToImageRef(doc.heroImage);
          const sectionsRaw =
            (doc.sections as Array<{ heading: string; body: string }> | undefined) ?? [];
          const cmsSections = sectionsRaw.length ? sectionsRaw : null;
          if (cmsSections && cmsSections.length > 0 && (doc.heroSummary || doc.articleLead)) {
            return {
              slug: doc.slug as string,
              title: doc.title as string,
              tagline: typeof doc.tagline === "string" ? doc.tagline : undefined,
              heroImageSrc: heroImage?.url ?? FALLBACK_TILE_IMAGE,
              heroSummary: (doc.heroSummary as string) ?? "",
              articleLead: (doc.articleLead as string) ?? "",
              sections: cmsSections.map((s) => ({ heading: s.heading, body: s.body })),
              metaDescription: (doc.metaDescription as string) ?? "",
            };
          }
          // No body content yet; fall back to legacy auto-generated content for this slug.
          const fallback = legacyGetServicePage(slug);
          if (fallback) {
            return mapLegacyServicePage(fallback, {
              heroImageSrc: heroImage?.url ?? fallback.heroImageSrc,
              tagline: typeof doc.tagline === "string" ? doc.tagline : undefined,
              metaDescription: (doc.metaDescription as string) || fallback.metaDescription,
            });
          }
        }
      } catch {
        // fall through to legacy
      }
    }

    const fallback = legacyGetServicePage(slug);
    if (!fallback) return null;
    return mapLegacyServicePage(fallback);
  },
);

export async function getServiceBySlug(
  slug: string,
  options: { draft?: boolean } = {},
): Promise<ServiceLanding | null> {
  return _getServiceBySlug(slug, options.draft ?? false);
}

function mapLegacyServicePage(
  legacy: ServicePageContent,
  overrides: Partial<ServiceLanding> = {},
): ServiceLanding {
  return {
    slug: legacy.slug,
    title: legacy.title,
    tagline: undefined,
    heroImageSrc: legacy.heroImageSrc,
    heroSummary: legacy.heroSummary,
    articleLead: legacy.articleLead,
    sections: legacy.sections.map((s) => ({ heading: s.heading, body: s.body })),
    metaDescription: legacy.metaDescription,
    ...overrides,
  };
}

/* ─────────────────────────── advocates ───────────────────────────────── */

export const getAdvocates = cache(async (): Promise<Advocate[]> => {
  const fallback: Advocate[] = legacyAdvocates.map((a) => ({
    name: a.name,
    practice: a.practice,
    imageSrc: a.imageSrc,
  }));

  const payload = await tryGetPayload();
  if (!payload) return fallback;

  try {
    const res = await payload.find({
      collection: "advocates",
      sort: "order",
      limit: 100,
      depth: 1,
    });
    if (res.docs.length === 0) return fallback;
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      const image = mediaToImageRef(doc.image);
      return {
        name: doc.name as string,
        practice: doc.practice as string,
        imageSrc: image?.url ?? FALLBACK_ADVOCATE_IMAGE,
      };
    });
  } catch {
    return fallback;
  }
});

export const getAdvocatesByIds = cache(async (ids: (string | number)[]): Promise<Advocate[]> => {
  if (ids.length === 0) return [];
  const payload = await tryGetPayload();
  if (!payload) return [];
  try {
    const res = await payload.find({
      collection: "advocates",
      where: { id: { in: ids } },
      limit: ids.length,
      depth: 1,
    });
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      const image = mediaToImageRef(doc.image);
      return {
        name: doc.name as string,
        practice: doc.practice as string,
        imageSrc: image?.url ?? FALLBACK_ADVOCATE_IMAGE,
      };
    });
  } catch {
    return [];
  }
});

/* ──────────────────────── testimonials / updates ─────────────────────── */

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const fallback: Testimonial[] = legacyTestimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    location: t.location,
  }));
  const payload = await tryGetPayload();
  if (!payload) return fallback;
  try {
    const res = await payload.find({
      collection: "testimonials",
      sort: "order",
      limit: 100,
    });
    if (res.docs.length === 0) return fallback;
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      return {
        quote: doc.quote as string,
        name: doc.name as string,
        role: doc.role as string,
        location: typeof doc.location === "string" ? doc.location : undefined,
      };
    });
  } catch {
    return fallback;
  }
});

export const getTestimonialsByIds = cache(async (ids: (string | number)[]): Promise<Testimonial[]> => {
  if (ids.length === 0) return [];
  const payload = await tryGetPayload();
  if (!payload) return [];
  try {
    const res = await payload.find({
      collection: "testimonials",
      where: { id: { in: ids } },
      limit: ids.length,
    });
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      return {
        quote: doc.quote as string,
        name: doc.name as string,
        role: doc.role as string,
        location: typeof doc.location === "string" ? doc.location : undefined,
      };
    });
  } catch {
    return [];
  }
});

export const getLegalUpdates = cache(async (limit = 50): Promise<LegalUpdate[]> => {
  const fallback: LegalUpdate[] = legacyLegalUpdates.map((u) => ({
    title: u.title,
    date: u.date,
  }));
  const payload = await tryGetPayload();
  if (!payload) return fallback.slice(0, limit);
  try {
    const res = await payload.find({
      collection: "legal-updates",
      sort: "order",
      limit,
    });
    if (res.docs.length === 0) return fallback.slice(0, limit);
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      return {
        title: doc.title as string,
        date: doc.date as string,
        slug: typeof doc.slug === "string" ? doc.slug : undefined,
      };
    });
  } catch {
    return fallback.slice(0, limit);
  }
});

export const getOffices = cache(async (): Promise<Office[]> => {
  const fallback: Office[] = legacyOffices.map((o) => ({ label: o.label, lines: [...o.lines] }));
  const payload = await tryGetPayload();
  if (!payload) return fallback;
  try {
    const res = await payload.find({
      collection: "offices",
      sort: "order",
      limit: 100,
    });
    if (res.docs.length === 0) return fallback;
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      const lines = (doc.lines as Array<{ text: string }> | undefined) ?? [];
      return {
        label: doc.label as string,
        lines: lines.map((l) => l.text).filter(Boolean),
      };
    });
  } catch {
    return fallback;
  }
});

export const getClientLogos = cache(async (): Promise<string[]> => {
  const fallback = [...legacyClientLogos];
  const payload = await tryGetPayload();
  if (!payload) return fallback;
  try {
    const res = await payload.find({
      collection: "client-logos",
      sort: "order",
      limit: 100,
    });
    if (res.docs.length === 0) return fallback;
    return res.docs.map((d) => (d as Record<string, unknown>).name as string);
  } catch {
    return fallback;
  }
});

export const getStats = cache(async (): Promise<readonly StatItem[]> => {
  return legacyStats.map((s) => ({ value: s.value, label: s.label }));
});

/* ────────────────────────────── menus ────────────────────────────────── */

type MenuItemDoc = {
  id: string | number;
  label: string;
  menuRoot: string;
  href?: string;
  service?: { slug?: string } | string | number | null;
  parent?: { id: string | number } | string | number | null;
  icon?: string;
  ariaLabel?: string;
  order?: number;
};

function resolveHref(item: MenuItemDoc): string {
  if (item.service && typeof item.service === "object" && "slug" in item.service && item.service.slug) {
    return `/service/${item.service.slug}`;
  }
  return item.href ?? "#";
}

function buildTree(items: MenuItemDoc[]): MenuLink[] {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const byId = new Map<string, MenuItemDoc & { children: MenuLink[] }>();
  for (const item of sorted) {
    byId.set(String(item.id), { ...item, children: [] });
  }
  const roots: MenuLink[] = [];
  for (const item of sorted) {
    const node = byId.get(String(item.id))!;
    const link: MenuLink = {
      label: item.label,
      href: resolveHref(item),
      icon: item.icon,
      ariaLabel: item.ariaLabel,
      children: node.children,
    };
    const parentId =
      item.parent && typeof item.parent === "object" && "id" in item.parent
        ? String(item.parent.id)
        : item.parent != null
        ? String(item.parent)
        : null;
    if (parentId && byId.has(parentId)) {
      byId.get(parentId)!.children.push(link);
    } else {
      roots.push(link);
    }
  }
  return roots;
}

export const getMenuTree = cache(async (root: string): Promise<MenuLink[]> => {
  const payload = await tryGetPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "menu-items",
        where: { menuRoot: { equals: root } },
        sort: "order",
        limit: 500,
        depth: 1,
      });
      if (res.docs.length > 0) {
        return buildTree(res.docs as unknown as MenuItemDoc[]);
      }
    } catch {
      // fallthrough to static menus
    }
  }
  return legacyMenuTree(root);
});

function legacyMenuTree(root: string): MenuLink[] {
  switch (root) {
    case "headerStripLeft":
      return headerServiceStripLinks.left.map((it) => ({ label: it.label, href: it.href }));
    case "headerStripRight":
      return headerServiceStripLinks.right.map((it) => ({ label: it.label, href: it.href }));
    case "serviceCategories":
      return serviceCategories.map((it) => ({ label: it.label, href: it.href }));
    case "comprehensiveLegalSolutions":
      return comprehensiveLegalSolutionLinks.map((it) => ({ label: it.label, href: it.href }));
    case "lawyerServices":
      return lawyerServicesMenu.map((cat) => ({
        label: cat.label,
        href: "#",
        children: cat.items.map((it) => ({ label: it.label, href: it.href })),
      }));
    case "propertyServices":
      return propertyServicesMenu.map((cat) => ({
        label: cat.label,
        href: "#",
        children: cat.items.map((it) => ({ label: it.label, href: it.href })),
      }));
    case "propertySuggested":
      return propertySuggestedLinks.map((it) => ({ label: it.label, href: it.href, ariaLabel: it.ariaLabel }));
    case "businessIpr":
      return businessIprMenu.map((sec) => ({
        label: sec.label,
        href: "#",
        children: sec.categories.map((cat) => ({
          label: cat.label,
          href: "#",
          children: cat.items.map((it) => ({ label: it.label, href: it.href })),
        })),
      }));
    case "footerExplore":
      return footerCopy.links.map((it) => ({ label: it.label, href: it.href }));
    default:
      return [];
  }
}

/* ───────────────────────────── home page ─────────────────────────────── */

export type HomePageBlock = {
  blockType: string;
  blockName?: string;
  [key: string]: unknown;
};

const _getHomePage = cache(
  async (draft: boolean): Promise<{ layout: HomePageBlock[] } | null> => {
    const payload = await tryGetPayload();
    if (!payload) return null;
    try {
      const doc = (await payload.findGlobal({
        slug: "home-page",
        depth: 2,
        draft,
      })) as { layout?: HomePageBlock[] } | null;
      if (!doc?.layout || doc.layout.length === 0) return null;
      return { layout: doc.layout };
    } catch {
      return null;
    }
  },
);

export async function getHomePage(
  options: { draft?: boolean } = {},
): Promise<{ layout: HomePageBlock[] } | null> {
  return _getHomePage(options.draft ?? false);
}
