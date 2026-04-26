/**
 * One-shot import of existing TypeScript content (src/content/*) into the Payload DB.
 *
 * Run after Postgres + PAYLOAD_SECRET are configured:
 *   npm run seed
 *
 * The script is idempotent within a single collection: it deletes existing rows in each
 * collection before inserting fresh ones from the static modules. Re-running is safe but
 * will overwrite manual edits made via /admin.
 */
import { getPayload } from "payload";
import config from "../payload.config";

import {
  advocates as staticAdvocates,
  clientLogos as staticClientLogos,
  contactChannels,
  legalUpdates as staticLegalUpdates,
  offices as staticOffices,
  socialProfiles,
  testimonials as staticTestimonials,
  whatsappPrefillChat,
  whatsappPrefillHeader,
  whatsappPrefillTalk,
} from "../src/content/site";
import { brandName, footerCopy } from "../src/content/pageCopy";
import {
  businessIprMenu,
  comprehensiveLegalSolutionLinks,
  headerServiceStripLinks,
  lawyerServicesMenu,
  propertyServicesMenu,
  propertySuggestedLinks,
  serviceCategories,
} from "../src/content/menus";
import { homeServiceSections } from "../src/content/servicePages";
import { getMegaMenuServiceLeaves } from "../src/content/site";

type SeededService = { id: string | number; slug: string };

async function clearCollection(payload: Awaited<ReturnType<typeof getPayload>>, slug: string) {
  await payload.delete({
    collection: slug as Parameters<typeof payload.delete>[0]["collection"],
    where: { id: { exists: true } },
  });
}

async function seed() {
  const payload = await getPayload({ config });

  payload.logger.info("Seeding LexBridge content into Payload…");

  for (const slug of [
    "menu-items",
    "services",
    "advocates",
    "testimonials",
    "legal-updates",
    "offices",
    "client-logos",
  ] as const) {
    await clearCollection(payload, slug);
  }

  payload.logger.info("Cleared existing collections.");

  // ── SiteSettings ───────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      brandName,
      tagline: footerCopy.tagline,
      phone: contactChannels.phone,
      whatsappE164: contactChannels.whatsappE164,
      emailInfo: contactChannels.emailInfo,
      emailCare: contactChannels.emailCare,
      whatsappPrefillChat,
      whatsappPrefillTalk,
      whatsappPrefillHeader,
      instagramUrl: socialProfiles.instagram,
      linkedinUrl: socialProfiles.linkedin,
    },
  });

  payload.logger.info("Site settings seeded.");

  // ── Services ───────────────────────────────────────────────────────────────
  const seenServiceSlugs = new Set<string>();
  const seededServices: SeededService[] = [];

  const homeTopTiles = homeServiceSections.find((s) => s.id === "top-services")?.tiles ?? [];
  const homeSpecializedTiles = homeServiceSections.find((s) => s.id === "specialized-services")?.tiles ?? [];

  const homeTopSlugs = new Set(homeTopTiles.map((t) => t.slug));
  const homeSpecializedSlugs = new Set(homeSpecializedTiles.map((t) => t.slug));

  const headerStripSlugs = new Set(
    [...headerServiceStripLinks.left, ...headerServiceStripLinks.right]
      .map((it) => it.href.replace(/^\/service\//, "").split("?")[0])
      .filter(Boolean) as string[],
  );
  const lawyerServiceSlugs = new Set(
    lawyerServicesMenu.flatMap((cat) => cat.items.map((it) => it.href.replace(/^\/service\//, "").split("?")[0])).filter(Boolean) as string[],
  );
  const propertyServiceSlugs = new Set(
    propertyServicesMenu.flatMap((cat) => cat.items.map((it) => it.href.replace(/^\/service\//, "").split("?")[0])).filter(Boolean) as string[],
  );
  const businessIprSlugs = new Set(
    businessIprMenu.flatMap((sec) =>
      sec.categories.flatMap((cat) => cat.items.map((it) => it.href.replace(/^\/service\//, "").split("?")[0])),
    ).filter(Boolean) as string[],
  );
  const propertySuggestedSlugs = new Set(
    propertySuggestedLinks.map((it) => it.href.replace(/^\/service\//, "").split("?")[0]).filter(Boolean) as string[],
  );

  function menuRootsFor(slug: string): string[] {
    const roots: string[] = [];
    if (homeTopSlugs.has(slug)) roots.push("homeTop");
    if (homeSpecializedSlugs.has(slug)) roots.push("homeSpecialized");
    if (headerStripSlugs.has(slug)) roots.push("headerStrip");
    if (lawyerServiceSlugs.has(slug)) roots.push("lawyerServices");
    if (propertyServiceSlugs.has(slug)) roots.push("propertyServices");
    if (businessIprSlugs.has(slug)) roots.push("businessIpr");
    if (propertySuggestedSlugs.has(slug)) roots.push("propertySuggested");
    return roots;
  }

  // Seed home tiles first (with featured + order)
  let order = 0;
  for (const tile of homeTopTiles) {
    if (seenServiceSlugs.has(tile.slug)) continue;
    seenServiceSlugs.add(tile.slug);
    const created = await payload.create({
      collection: "services",
      data: {
        title: tile.title,
        slug: tile.slug,
        tagline: tile.tagline,
        featured: true,
        order: order++,
        menuRoots: menuRootsFor(tile.slug),
      },
    });
    seededServices.push({ id: created.id, slug: tile.slug });
  }
  for (const tile of homeSpecializedTiles) {
    if (seenServiceSlugs.has(tile.slug)) continue;
    seenServiceSlugs.add(tile.slug);
    const created = await payload.create({
      collection: "services",
      data: {
        title: tile.title,
        slug: tile.slug,
        tagline: tile.tagline,
        featured: false,
        order: order++,
        menuRoots: menuRootsFor(tile.slug),
      },
    });
    seededServices.push({ id: created.id, slug: tile.slug });
  }

  // Then mega-menu leaves not already seeded
  const allLeaves = getMegaMenuServiceLeaves();
  for (const leaf of allLeaves) {
    if (seenServiceSlugs.has(leaf.slug)) continue;
    seenServiceSlugs.add(leaf.slug);
    const created = await payload.create({
      collection: "services",
      data: {
        title: leaf.title,
        slug: leaf.slug,
        featured: false,
        order: order++,
        menuRoots: menuRootsFor(leaf.slug),
      },
    });
    seededServices.push({ id: created.id, slug: leaf.slug });
  }

  payload.logger.info(`Seeded ${seededServices.length} services.`);

  // ── Advocates ─────────────────────────────────────────────────────────────
  for (let i = 0; i < staticAdvocates.length; i++) {
    const adv = staticAdvocates[i]!;
    await payload.create({
      collection: "advocates",
      data: {
        name: adv.name,
        practice: adv.practice,
        order: i,
      },
    });
  }
  payload.logger.info(`Seeded ${staticAdvocates.length} advocates.`);

  // ── Testimonials ──────────────────────────────────────────────────────────
  for (let i = 0; i < staticTestimonials.length; i++) {
    const t = staticTestimonials[i]!;
    await payload.create({
      collection: "testimonials",
      data: {
        quote: t.quote,
        name: t.name,
        role: t.role,
        location: t.location,
        order: i,
      },
    });
  }
  payload.logger.info(`Seeded ${staticTestimonials.length} testimonials.`);

  // ── Legal updates ─────────────────────────────────────────────────────────
  for (let i = 0; i < staticLegalUpdates.length; i++) {
    const u = staticLegalUpdates[i]!;
    await payload.create({
      collection: "legal-updates",
      data: {
        title: u.title,
        date: u.date,
        order: i,
      },
    });
  }
  payload.logger.info(`Seeded ${staticLegalUpdates.length} legal updates.`);

  // ── Offices ───────────────────────────────────────────────────────────────
  for (let i = 0; i < staticOffices.length; i++) {
    const o = staticOffices[i]!;
    await payload.create({
      collection: "offices",
      data: {
        label: o.label,
        lines: o.lines.map((text) => ({ text })),
        order: i,
      },
    });
  }
  payload.logger.info(`Seeded ${staticOffices.length} offices.`);

  // ── Client logos ──────────────────────────────────────────────────────────
  for (let i = 0; i < staticClientLogos.length; i++) {
    const name = staticClientLogos[i]!;
    await payload.create({
      collection: "client-logos",
      data: { name, order: i },
    });
  }
  payload.logger.info(`Seeded ${staticClientLogos.length} client logos.`);

  // ── Menu items ────────────────────────────────────────────────────────────
  const serviceIdBySlug = new Map(seededServices.map((s) => [s.slug, s.id] as const));

  function slugFromHref(href: string): string | null {
    if (!href.startsWith("/service/")) return null;
    return href.slice("/service/".length).split("?")[0] ?? null;
  }

  async function createMenuItem(args: {
    label: string;
    menuRoot: string;
    href?: string;
    parent?: string | number;
    icon?: string;
    ariaLabel?: string;
    order: number;
  }) {
    const slug = args.href ? slugFromHref(args.href) : null;
    const serviceId = slug ? serviceIdBySlug.get(slug) : undefined;
    const created = await payload.create({
      collection: "menu-items",
      data: {
        label: args.label,
        menuRoot: args.menuRoot,
        href: serviceId ? undefined : args.href,
        service: serviceId,
        parent: args.parent,
        icon: args.icon,
        ariaLabel: args.ariaLabel,
        order: args.order,
      },
    });
    return created.id;
  }

  let menuOrder = 0;

  // Header strip (left + right) – flat
  for (let i = 0; i < headerServiceStripLinks.left.length; i++) {
    const it = headerServiceStripLinks.left[i]!;
    await createMenuItem({
      label: it.label,
      menuRoot: "headerStripLeft",
      href: it.href,
      icon: it.icon,
      order: i,
    });
  }
  for (let i = 0; i < headerServiceStripLinks.right.length; i++) {
    const it = headerServiceStripLinks.right[i]!;
    await createMenuItem({
      label: it.label,
      menuRoot: "headerStripRight",
      href: it.href,
      icon: it.icon,
      order: i,
    });
  }

  // Service categories nav (in-page anchors) – flat
  for (let i = 0; i < serviceCategories.length; i++) {
    const it = serviceCategories[i]!;
    await createMenuItem({
      label: it.label,
      menuRoot: "serviceCategories",
      href: it.href,
      order: i,
    });
  }

  // Header services submenu (flat list of leaves)
  for (let i = 0; i < comprehensiveLegalSolutionLinks.length; i++) {
    const it = comprehensiveLegalSolutionLinks[i]!;
    await createMenuItem({
      label: it.label,
      menuRoot: "comprehensiveLegalSolutions",
      href: it.href,
      order: i,
    });
  }

  // Lawyer services mega menu — categories with children
  for (let ci = 0; ci < lawyerServicesMenu.length; ci++) {
    const cat = lawyerServicesMenu[ci]!;
    const parentId = await createMenuItem({
      label: cat.label,
      menuRoot: "lawyerServices",
      order: ci,
    });
    for (let i = 0; i < cat.items.length; i++) {
      const it = cat.items[i]!;
      await createMenuItem({
        label: it.label,
        menuRoot: "lawyerServices",
        href: it.href,
        parent: parentId,
        order: i,
      });
    }
  }

  // Property services mega menu
  for (let ci = 0; ci < propertyServicesMenu.length; ci++) {
    const cat = propertyServicesMenu[ci]!;
    const parentId = await createMenuItem({
      label: cat.label,
      menuRoot: "propertyServices",
      order: ci,
    });
    for (let i = 0; i < cat.items.length; i++) {
      const it = cat.items[i]!;
      await createMenuItem({
        label: it.label,
        menuRoot: "propertyServices",
        href: it.href,
        parent: parentId,
        order: i,
      });
    }
  }

  // Property suggested links – flat
  for (let i = 0; i < propertySuggestedLinks.length; i++) {
    const it = propertySuggestedLinks[i]!;
    await createMenuItem({
      label: it.label,
      menuRoot: "propertySuggested",
      href: it.href,
      ariaLabel: it.ariaLabel,
      order: i,
    });
  }

  // Business & IPR – sections → categories → items (3 levels)
  for (let si = 0; si < businessIprMenu.length; si++) {
    const sec = businessIprMenu[si]!;
    const sectionId = await createMenuItem({
      label: sec.label,
      menuRoot: "businessIpr",
      order: si,
    });
    for (let ci = 0; ci < sec.categories.length; ci++) {
      const cat = sec.categories[ci]!;
      const categoryId = await createMenuItem({
        label: cat.label,
        menuRoot: "businessIpr",
        parent: sectionId,
        order: ci,
      });
      for (let i = 0; i < cat.items.length; i++) {
        const it = cat.items[i]!;
        await createMenuItem({
          label: it.label,
          menuRoot: "businessIpr",
          href: it.href,
          parent: categoryId,
          order: i,
        });
      }
    }
  }

  // Footer explore links – flat
  for (let i = 0; i < footerCopy.links.length; i++) {
    const it = footerCopy.links[i]!;
    await createMenuItem({
      label: it.label,
      menuRoot: "footerExplore",
      href: it.href,
      order: i,
    });
  }

  payload.logger.info(`Menu items seeded (final order index: ${menuOrder}).`);
  payload.logger.info("Done.");

  process.exit(0);
}

void seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
