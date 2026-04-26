import { brandName } from "./pageCopy";
import {
  businessIprMenu,
  headerServiceStripLinks,
  lawyerServicesMenu,
  propertyServicesMenu,
  propertySuggestedLinks,
} from "./menus";

/** Production: set `NEXT_PUBLIC_*` in `.env` — see repository `.env.example`. */
function publicEnv(key: string, fallback: string): string {
  const v = typeof process !== "undefined" ? process.env[key] : undefined;
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

export type Advocate = {
  name: string;
  practice: string;
  imageSrc: string;
};

export type LegalUpdate = {
  title: string;
  date: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location?: string;
};

export type Office = {
  label: string;
  lines: string[];
};

export const stats = [
  { value: "1100+", label: "Verified experts" },
  { value: "100+", label: "Cities covered" },
  { value: "24/7", label: "Chat & call access" },
  { value: "100%", label: "Confidential consults" },
] as const;

export type LawyerServicesLink = {
  label: string;
  href: string;
};

export type LawyerServicesCategory = {
  id: string;
  label: string;
  items: LawyerServicesLink[];
};


export type PropertySuggestedLink = LawyerServicesLink & {
  ariaLabel: string;
};


export type BusinessIprCategory = {
  id: string;
  label: string;
  items: LawyerServicesLink[];
};

export type BusinessIprSection = {
  id: string;
  label: string;
  categories: BusinessIprCategory[];
};


const SERVICE_PATH_PREFIX = "/service/";

function slugFromServiceHref(href: string): string | null {
  if (!href.startsWith(SERVICE_PATH_PREFIX)) return null;
  const slug = href.slice(SERVICE_PATH_PREFIX.length).split("?")[0]?.trim() ?? "";
  return slug.length ? slug : null;
}

/** Unique leaf entries from mega menus for service page registration (slug + display title). */
export function getMegaMenuServiceLeaves(): { title: string; slug: string }[] {
  const seen = new Set<string>();
  const out: { title: string; slug: string }[] = [];

  const push = (title: string, href: string) => {
    const slug = slugFromServiceHref(href);
    if (!slug || seen.has(slug)) return;
    seen.add(slug);
    out.push({ title, slug });
  };

  for (const sec of businessIprMenu) {
    for (const cat of sec.categories) {
      for (const item of cat.items) push(item.label, item.href);
    }
  }
  for (const cat of lawyerServicesMenu) {
    for (const item of cat.items) push(item.label, item.href);
  }
  for (const cat of propertyServicesMenu) {
    for (const item of cat.items) push(item.label, item.href);
  }
  for (const item of propertySuggestedLinks) {
    push(item.label, item.href);
  }
  for (const item of [...headerServiceStripLinks.left, ...headerServiceStripLinks.right]) {
    push(item.label, item.href);
  }

  return out;
}

export const advocates: Advocate[] = [
  {
    name: "Adv. Pooja Kashyap",
    practice: "Civil, criminal & family",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&q=80",
  },
  {
    name: "Adv. Gurnaad Singh",
    practice: "Consumer, cyber & contracts",
    imageSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=80",
  },
  {
    name: "Adv. Yanina V.",
    practice: "International arbitration",
    imageSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=640&q=80",
  },
  {
    name: "Sangappa Mittalkod (Retd.)",
    practice: "Criminal, civil & family",
    imageSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=640&q=80",
  },
];

export const legalUpdates: LegalUpdate[] = [
  {
    title: "India–EU FTA: what changed for cross-border services contracts",
    date: "2 Feb 2026",
  },
  {
    title: "Supreme Court signals tighter guidelines on wrongful conviction compensation",
    date: "3 Nov 2025",
  },
  {
    title: "Matrimonial courts caution against indiscriminate family-wide allegations",
    date: "24 Oct 2025",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Five minutes on LexBridge gave me clarity on an overseas immigration query. The advocate was precise and practical.",
    name: "Rohit Agarwal",
    role: "Product lead",
    location: "United States",
  },
  {
    quote:
      "We run pan-India labour and corporate queries. The advisory flow is fast and well documented for our compliance team.",
    name: "Jitendra Walia",
    role: "Chief Growth Officer, BVG India Ltd",
  },
  {
    quote:
      "Property diligence in Lucknow was thorough—title search, encumbrances, and local risks spelled out plainly.",
    name: "Ravi Tiwari",
    role: "Senior Manager, Abbott Laboratories",
  },
];

export const offices: Office[] = [
  {
    label: "Corporate office (Lucknow)",
    lines: ["Sector 8, House 166", "Indira Nagar, Lucknow 226016"],
  },
  {
    label: "Regional office (Delhi)",
    lines: ["D17, 3rd Floor, Mata Wali Gali", "Old Gupta Colony, New Delhi 110009"],
  },
  {
    label: "Regional office (Hyderabad)",
    lines: ["302, Plot 175, Balaji Nagar", "Ameenpur, Hyderabad 502032"],
  },
];

export const clientLogos = [
  "Me N Moms",
  "Next Education",
  "L&T Financial",
  "BillDesk",
  "BIMTECH",
  "Hero Mindmine",
  "Amar Ujala",
  "IEX",
  "S Chand Group",
] as const;

export const contactChannels = {
  phone: publicEnv("NEXT_PUBLIC_CONTACT_PHONE", "+91 74993 83674"),
  /** WhatsApp Business number, digits only (e.g. India 919876543210). */
  whatsappE164: publicEnv("NEXT_PUBLIC_WHATSAPP_E164", "919876543210"),
  emailInfo: publicEnv("NEXT_PUBLIC_EMAIL_INFO", "info@example.com"),
  emailCare: publicEnv("NEXT_PUBLIC_EMAIL_CARE", "care@example.com"),
};

/** Full profile URLs; override in `.env` with `NEXT_PUBLIC_*`. */
export const socialProfiles = {
  instagram: publicEnv("NEXT_PUBLIC_INSTAGRAM_URL", "https://www.instagram.com/"),
  linkedin: publicEnv("NEXT_PUBLIC_LINKEDIN_URL", "https://www.linkedin.com/"),
} as const;

/** Prefilled message when user taps “Chat with lawyer”. */
export const whatsappPrefillChat =
  "Hello, I would like to chat with a lawyer about my legal matter. Please let me know how to proceed.";

/** Prefilled message when user taps the header WhatsApp icon (or header chat CTA). */
export const whatsappPrefillHeader = `Hello, I am on the ${brandName} website and would like to speak with a lawyer. Please let me know the next steps.`;

/** Prefilled message when user taps “Talk to lawyer”. */
export const whatsappPrefillTalk =
  "Hello, I would like to speak with a lawyer. Please suggest a time for a call or voice consultation.";

/** Prefilled WhatsApp message from a service landing page. */
export function whatsappPrefillForService(serviceTitle: string, slug: string): string {
  return `Hello, I would like to speak with a lawyer about: ${serviceTitle} (service: ${slug}). Please advise on next steps.`;
}
