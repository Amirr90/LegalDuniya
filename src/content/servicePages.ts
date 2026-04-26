import { getMegaMenuServiceLeaves } from "./site";
import { complianceServicePageCopy, servicePageCopy } from "./servicePageCopy";

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

  const heroSummary = complianceServicePageCopy.heroSummary({ topic });

  const articleLead = complianceServicePageCopy.articleLead({ topic });

  const sections: ServiceArticleSection[] = [
    {
      heading: "Clear scope and deliverables",
      body: complianceServicePageCopy.sectionBodies.clearScope({ topic }),
    },
    {
      heading: "Accurate filings and responses",
      body: complianceServicePageCopy.sectionBodies.filingsAndResponses({ topic }),
    },
    {
      heading: "Coordination across disciplines",
      body: complianceServicePageCopy.sectionBodies.coordinationAcrossDisciplines(),
    },
    {
      heading: "Ongoing compliance awareness",
      body: complianceServicePageCopy.sectionBodies.ongoingAwareness({ topic }),
    },
    {
      heading: "Fast intake and follow-up",
      body: complianceServicePageCopy.sectionBodies.intakeAndFollowup({ topic }),
    },
  ];

  const metaDescription = complianceServicePageCopy.metaDescription(label);

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
  const labelLower = label.toLowerCase();
  const focus = tile.tagline ? `${tile.tagline.toLowerCase()}` : labelLower;

  const heroSummary = servicePageCopy.heroSummary({ labelLower, focus });

  const articleLead = servicePageCopy.articleLead({ labelLower, focus });

  const sections: ServiceArticleSection[] = [
    {
      heading: "Specialized legal knowledge",
      body: servicePageCopy.sectionBodies.specializedKnowledge({ labelLower, focus }),
    },
    {
      heading: "Personalized approach",
      body: servicePageCopy.sectionBodies.personalizedApproach({ labelLower, focus }),
    },
    {
      heading: "Skilled negotiation and mediation",
      body: `Many disputes resolve outside a full trial. Your advocate can explore negotiation, mediation, or structured settlements where appropriate, while keeping your rights protected throughout.`,
    },
    {
      heading: "Litigation support when needed",
      body: servicePageCopy.sectionBodies.litigationSupport(),
    },
    {
      heading: "Technology-enabled updates",
      body: servicePageCopy.sectionBodies.techUpdates({ labelLower, focus }),
    },
  ];

  const metaDescription = servicePageCopy.metaDescription({ labelLower, focus }, label);

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
