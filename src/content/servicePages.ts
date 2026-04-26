import { getMegaMenuServiceLeaves } from "./site";

export type ServiceTile = {
  title: string;
  slug: string;
  imageSrc: string;
  tagline?: string;
};

export type ServiceSectionSpec = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tiles: ServiceTile[];
};

export type ServiceArticleSection = {
  heading: string;
  body: string;
};

export type ServicePageContent = {
  slug: string;
  title: string;
  heroSummary: string;
  heroImageSrc: string;
  articleLead: string;
  sections: ServiceArticleSection[];
  metaDescription: string;
};

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const homeServiceSections: ServiceSectionSpec[] = [
  {
    id: "top-services",
    eyebrow: "Our top services",
    title: "Comprehensive legal solutions",
    description:
      "We offer practical guidance across high-frequency practice areas. Choose a category to see how LexBridge matches you with counsel who handle matters like yours every day.",
    tiles: [
      {
        title: "Divorce lawyer",
        slug: "divorce-lawyer",
        imageSrc: img("photo-1450101499163-c8848c66ca85"),
        tagline: "Family and matrimonial",
      },
      {
        title: "Arbitration",
        slug: "arbitration",
        imageSrc: "/services/arbitration.jpg",
        tagline: "ADR and tribunals",
      },
      {
        title: "Court marriage",
        slug: "court-marriage",
        imageSrc: img("photo-1515934751635-c81c6bc9a2d8"),
        tagline: "Solemnisation and paperwork",
      },
      {
        title: "Cyber crime lawyer",
        slug: "cyber-crime-lawyer",
        imageSrc: img("photo-1563986768609-322da13575f3"),
        tagline: "Online offences and evidence",
      },
      {
        title: "Supreme Court lawyers",
        slug: "supreme-court-lawyers",
        imageSrc: "/services/supreme-court-lawyers.jpg",
        tagline: "SLPs and appeals",
      },
      {
        title: "High Court lawyer",
        slug: "high-court-lawyer",
        imageSrc: img("photo-1505664194779-8beaceb93744"),
        tagline: "Writs and appellate work",
      },
      {
        title: "Taxation lawyer",
        slug: "taxation-lawyer",
        imageSrc: img("photo-1554224155-6726b3ff858f"),
        tagline: "GST, income tax, disputes",
      },
      {
        title: "Lawyer for CBI",
        slug: "lawyer-for-cbi",
        imageSrc: img("photo-1589829545856-d10d557cf95f"),
        tagline: "Agency investigations",
      },
      {
        title: "Landlord / tenant",
        slug: "landlord-tenant",
        imageSrc: img("photo-1560518883-ce09059eeffa"),
        tagline: "Eviction, rent, leases",
      },
      {
        title: "Debt Recovery Tribunal",
        slug: "debt-recovery-tribunal",
        imageSrc: img("photo-1556761175-5973dc0f32e7"),
        tagline: "DRT and recovery suits",
      },
      {
        title: "Property lawyer",
        slug: "property-lawyer",
        imageSrc: img("photo-1486406146926-c627a92ad1ab"),
        tagline: "Title, RERA, conveyancing",
      },
      {
        title: "Corporate lawyer",
        slug: "corporate-lawyer",
        imageSrc: img("photo-1454165804606-c3d57bc86b40"),
        tagline: "Contracts and compliance",
      },
    ],
  },
  {
    id: "specialized-services",
    eyebrow: "Specialized counsel",
    title: "More ways we can help",
    description:
      "From white-collar defence to startup filings, these additional lanes cover disputes and transactions that often need urgent, senior attention.",
    tiles: [
      {
        title: "Criminal lawyer",
        slug: "criminal-lawyer",
        imageSrc: img("photo-1472099645785-5658abf4ff4e"),
        tagline: "Trials and FIR response",
      },
      {
        title: "Anticipatory bail",
        slug: "anticipatory-bail",
        imageSrc: img("photo-1582213782179-e0d53f98f2ca"),
        tagline: "Protective bail strategy",
      },
      {
        title: "Consumer law",
        slug: "consumer-law",
        imageSrc: img("photo-1551836022-d5d88e9218df"),
        tagline: "Forums and compensation",
      },
      {
        title: "Labour law",
        slug: "labour-law",
        imageSrc: img("photo-1521737604893-d14cc237f11d"),
        tagline: "HR, terminations, POSH",
      },
      {
        title: "Intellectual property",
        slug: "intellectual-property",
        imageSrc: img("photo-1434030216411-0b793f4b4173"),
        tagline: "TM, copyright, enforcement",
      },
      {
        title: "Immigration lawyer",
        slug: "immigration-lawyer",
        imageSrc: img("photo-1526304640581-d334cdbbf45e"),
        tagline: "Visas and cross-border moves",
      },
      {
        title: "International arbitration",
        slug: "international-arbitration",
        imageSrc: img("photo-1522202176988-66273c2fd55f"),
        tagline: "Institutional and ad hoc",
      },
      {
        title: "Wills & estate",
        slug: "wills-estate",
        imageSrc: img("photo-1507003211169-0a1dd7228f2d"),
        tagline: "Planning and probate",
      },
      {
        title: "Cheque bounce",
        slug: "cheque-bounce",
        imageSrc: img("photo-1554224154-22dec7ec8818"),
        tagline: "Section 138 and recovery",
      },
      {
        title: "RERA complaints",
        slug: "rera-complaints",
        imageSrc: img("photo-1541888946425-d81bb19240f5"),
        tagline: "Homebuyer remedies",
      },
      {
        title: "Family disputes",
        slug: "family-disputes",
        imageSrc: img("photo-1573496359142-b8d87734a5a2"),
        tagline: "Maintenance and custody",
      },
      {
        title: "Media & entertainment law",
        slug: "media-entertainment-law",
        imageSrc: img("photo-1492691527719-9d1e07e534b4"),
        tagline: "Contracts and clearances",
      },
    ],
  },
];

export const servicesCatalogHref = "/services";

function isComplianceServiceSlug(slug: string): boolean {
  return (
    slug.startsWith("biz-reg-") ||
    slug.startsWith("tax-") ||
    slug.startsWith("ipr-") ||
    slug.startsWith("startup-")
  );
}

function buildComplianceServicePage(tile: ServiceTile): ServicePageContent {
  const label = tile.title;
  const topic = label.toLowerCase();

  const heroSummary = `LexBridge helps you coordinate ${topic} with professionals used to government portals, timelines, and document checklists. Share your situation once and we will align you with the right specialist for filings, replies, and follow-ups.`;

  const articleLead = `Getting ${topic} right early reduces rework, rejections, and penalties. The overview below is general information about how LexBridge supports incorporation, tax, and IP filings—not legal, tax, or regulatory advice for your specific facts.`;

  const sections: ServiceArticleSection[] = [
    {
      heading: "Clear scope and deliverables",
      body: `You should know what documents are needed, what approvals apply, and what “done” looks like. LexBridge-connected company secretaries, chartered accountants, and advocates can explain the steps for ${topic} in plain language before work begins.`,
    },
    {
      heading: "Accurate filings and responses",
      body: `Many ${topic} matters depend on correct forms, class selections, and supporting evidence. Specialists can help you prepare submissions, track objections or queries, and respond within deadlines.`,
    },
    {
      heading: "Coordination across disciplines",
      body: `Registrations and compliance often touch more than one domain—for example, corporate changes alongside tax positions. LexBridge can help you sequence work so related filings stay consistent.`,
    },
    {
      heading: "Ongoing compliance awareness",
      body: `After the first milestone, calendars matter: renewals, event-based filings, and annual obligations. Ask about reminders and review cycles so ${topic} does not become a last-minute scramble.`,
    },
    {
      heading: "Fast intake and follow-up",
      body: `LexBridge is built for confidential intake and status updates. Request a callback or written next steps so you are not navigating ${topic} requirements alone.`,
    },
  ];

  const metaDescription = `${label} — LexBridge intake for registrations, compliance, and IP filings. General information only; not legal or tax advice.`;

  return {
    slug: tile.slug,
    title: label,
    heroSummary,
    heroImageSrc: tile.imageSrc,
    articleLead,
    sections,
    metaDescription,
  };
}

function buildServicePage(tile: ServiceTile): ServicePageContent {
  if (isComplianceServiceSlug(tile.slug)) {
    return buildComplianceServicePage(tile);
  }

  const label = tile.title;
  const focus = tile.tagline ? `${tile.tagline.toLowerCase()}` : label.toLowerCase();

  const heroSummary = `LexBridge helps you speak with advocates who regularly work on ${label.toLowerCase()} files. Whether you need a quick consult or end-to-end representation, share your facts and we will align you with counsel experienced in ${focus}.`;

  const articleLead = `Choosing the right advocate for ${label.toLowerCase()} matters can save time, cost, and stress. The overview below explains how LexBridge approaches these cases at a high level. It is general information only—not legal advice for your specific situation.`;

  const sections: ServiceArticleSection[] = [
    {
      heading: "Specialized legal knowledge",
      body: `Advocates on LexBridge who focus on ${label.toLowerCase()} stay current on procedural rules, evidentiary issues, and forum-specific practice. They can help you understand timelines, documents, and realistic outcomes before you commit to a strategy.`,
    },
    {
      heading: "Personalized approach",
      body: `No two matters are identical. Counsel can tailor advice to your priorities—whether that is speed, settlement, preserving relationships, or preparing for contested hearings related to ${label.toLowerCase()}.`,
    },
    {
      heading: "Skilled negotiation and mediation",
      body: `Many disputes resolve outside a full trial. Your advocate can explore negotiation, mediation, or structured settlements where appropriate, while keeping your rights protected throughout.`,
    },
    {
      heading: "Litigation support when needed",
      body: `If court or tribunal proceedings are necessary, LexBridge-connected advocates can help with drafting, filings, briefing, and hearing representation—always subject to your instructions and engagement terms.`,
    },
    {
      heading: "Technology-enabled updates",
      body: `LexBridge is built for fast, confidential intake and follow-ups. You can request a callback or written next steps so you are not navigating ${label.toLowerCase()} questions alone.`,
    },
  ];

  const metaDescription = `${label} — connect with LexBridge for a confidential consult. General information about how our network approaches ${label.toLowerCase()} matters. Not legal advice.`;

  return {
    slug: tile.slug,
    title: label,
    heroSummary,
    heroImageSrc: tile.imageSrc,
    articleLead,
    sections,
    metaDescription,
  };
}

const megaMenuHeroImageIds = [
  "photo-1450101499163-c8848c66ca85",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1505664194779-8beaceb93744",
  "photo-1554224155-6726b3ff858f",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1556761175-5973dc0f32e7",
] as const;

function megaMenuServiceTilesFromSite(): ServiceTile[] {
  const leaves = getMegaMenuServiceLeaves();
  return leaves.map((leaf, index) => ({
    title: leaf.title,
    slug: leaf.slug,
    imageSrc: img(megaMenuHeroImageIds[index % megaMenuHeroImageIds.length]!),
  }));
}

const homeTiles: ServiceTile[] = homeServiceSections.flatMap((s) => s.tiles);
const homeTileSlugs = new Set(homeTiles.map((t) => t.slug));
const megaMenuTiles = megaMenuServiceTilesFromSite().filter((t) => !homeTileSlugs.has(t.slug));
const allTiles: ServiceTile[] = [...homeTiles, ...megaMenuTiles];

const servicePagesBySlug = new Map<string, ServicePageContent>(
  allTiles.map((tile) => [tile.slug, buildServicePage(tile)]),
);

export function getAllServiceSlugs(): string[] {
  return allTiles.map((t) => t.slug);
}

/** Minimal catalog for header search (same slugs as service static params). */
export const searchableServiceLinks: { title: string; href: string }[] = allTiles.map((t) => ({
  title: t.title,
  href: `/service/${t.slug}`,
}));

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePagesBySlug.get(slug);
}
