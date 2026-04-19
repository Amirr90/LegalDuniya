import { brandName } from "./pageCopy";

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
  { value: "700+", label: "Verified experts" },
  { value: "100+", label: "Cities covered" },
  { value: "24/7", label: "Chat & call access" },
  { value: "100%", label: "Confidential consults" },
] as const;

export const navLinks = [{ href: "/", label: "Home" }] as const;

export const serviceCategories = [
  { href: "/#top-services", label: "Find a lawyer" },
  { href: "/#advocates", label: "Top advocates" },
  { href: "/#updates", label: "Legal updates" },
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

/** Vakilsearch-style Lawyer Services tree; leaf links open `/service/[slug]` landings. */
export const lawyerServicesMenu: LawyerServicesCategory[] = [
  {
    id: "specialization",
    label: "Lawyer specializations",
    items: [
      { label: "Finance lawyers", href: "/service/finance-lawyers" },
      { label: "Cheque bounce lawyers", href: "/service/cheque-bounce-lawyers" },
      { label: "Child custody lawyers", href: "/service/child-custody-lawyers" },
      { label: "Civil lawyers", href: "/service/civil-lawyers" },
      { label: "Consumer protection lawyers", href: "/service/consumer-protection-lawyers" },
      { label: "Contract lawyers", href: "/service/contract-lawyers" },
      { label: "Corporate lawyers", href: "/service/corporate-lawyers" },
      { label: "Criminal lawyers", href: "/service/criminal-lawyers" },
      { label: "Cyber crime lawyers", href: "/service/cyber-crime-lawyers" },
      { label: "Property lawyers", href: "/service/property-lawyers" },
      { label: "Divorce lawyers", href: "/service/divorce-lawyers" },
      { label: "Family lawyers", href: "/service/family-lawyers" },
      { label: "GST lawyers", href: "/service/gst-lawyers" },
      { label: "Intellectual property lawyers", href: "/service/ip-lawyers" },
      { label: "Labour lawyers", href: "/service/labour-lawyers" },
      { label: "Money recovery lawyers", href: "/service/money-recovery-lawyers" },
      { label: "Motor accident lawyers", href: "/service/motor-accident-lawyers" },
      { label: "Muslim law lawyers", href: "/service/muslim-law-lawyers" },
      {
        label: "Technology, media and telecom (TMT)",
        href: "/service/tmt-lawyers",
      },
      {
        label: "Risk management and regulatory",
        href: "/service/risk-regulatory-lawyers",
      },
    ],
  },
  {
    id: "legal-notice",
    label: "Legal notice",
    items: [
      { label: "Legal notice for money recovery", href: "/service/notice-money-recovery" },
      { label: "Legal notice recovery of dues", href: "/service/notice-recovery-dues" },
      {
        label: "Legal notice under Consumer Protection Act",
        href: "/service/notice-consumer-act",
      },
      { label: "Cheque bounce notice", href: "/service/notice-cheque-bounce" },
      { label: "Reply to ITR notice", href: "/service/notice-reply-itr" },
      { label: "Caveat petition", href: "/service/caveat-petition" },
      { label: "Tenant rental notice", href: "/service/tenant-rental-notice" },
    ],
  },
  {
    id: "litigation",
    label: "Litigation",
    items: [
      { label: "Defamation complaint", href: "/service/litigation-defamation" },
      { label: "Intellectual property infringement", href: "/service/litigation-ip" },
      { label: "Employment dispute litigation", href: "/service/litigation-employment" },
      { label: "Contract dispute litigation", href: "/service/litigation-contract" },
      { label: "Cheque bounce complaint", href: "/service/litigation-cheque-bounce" },
      { label: "Property litigation", href: "/service/litigation-property" },
      { label: "Cyber crime litigation", href: "/service/litigation-cyber-crime" },
      { label: "Mutual divorce", href: "/service/litigation-mutual-divorce" },
      { label: "Contested divorce", href: "/service/litigation-contested-divorce" },
      {
        label: "Restitution of conjugal rights",
        href: "/service/litigation-restitution-conjugal",
      },
      { label: "POSH compliance", href: "/service/litigation-posh" },
      { label: "RERA complaint", href: "/service/litigation-rera" },
      { label: "US litigation service", href: "/service/litigation-us" },
    ],
  },
  {
    id: "consumer-complaint",
    label: "Consumer complaint",
    items: [
      { label: "Automobile", href: "/service/consumer-automobile" },
      { label: "Bank", href: "/service/consumer-bank" },
      { label: "Courier and logistics", href: "/service/consumer-courier" },
      { label: "E-commerce", href: "/service/consumer-ecommerce" },
      { label: "Education", href: "/service/consumer-education" },
      { label: "Grievances", href: "/service/consumer-grievances" },
      { label: "Home appliances", href: "/service/consumer-home-appliances" },
      { label: "Hotels", href: "/service/consumer-hotels" },
      { label: "IT companies", href: "/service/consumer-it" },
      { label: "Insurance", href: "/service/consumer-insurance" },
      { label: "Investments", href: "/service/consumer-investments" },
      { label: "Medical", href: "/service/consumer-medical" },
      { label: "Real estate", href: "/service/consumer-real-estate" },
      { label: "Retail business", href: "/service/consumer-retail" },
      { label: "Streaming platforms", href: "/service/consumer-streaming" },
      { label: "Travel", href: "/service/consumer-travel" },
    ],
  },
];

export type PropertySuggestedLink = LawyerServicesLink & {
  ariaLabel: string;
};

/** Two shortcuts; distinct visible labels and hrefs. */
export const propertySuggestedLinks: PropertySuggestedLink[] = [
  {
    label: "Property — verification",
    href: "/service/property-suggested-verification",
    ariaLabel: "Property — verification",
  },
  {
    label: "Property — services",
    href: "/service/property-suggested-services",
    ariaLabel: "Property — services",
  },
];

/** Property mega menu; leaf links open `/service/[slug]` landings. */
export const propertyServicesMenu: LawyerServicesCategory[] = [
  {
    id: "property-verification",
    label: "Property verification",
    items: [
      { label: "Title verification", href: "/service/property-verify-title" },
      { label: "Encumbrance certificate (EC) review", href: "/service/property-verify-ec" },
      { label: "Chain of title analysis", href: "/service/property-verify-chain" },
      { label: "Property document verification", href: "/service/property-verify-docs" },
    ],
  },
  {
    id: "property-services",
    label: "Property services",
    items: [
      { label: "Property registration assistance", href: "/service/property-service-registration" },
      { label: "Obtain encumbrance certificate", href: "/service/property-service-ec-obtain" },
      { label: "Khata / mutation support", href: "/service/property-service-khata-mutation" },
      { label: "Valuation coordination", href: "/service/property-service-valuation" },
    ],
  },
  {
    id: "property-legal",
    label: "Property legal services",
    items: [
      { label: "Title search and due diligence", href: "/service/property-legal-title-diligence" },
      { label: "Sale deed drafting and review", href: "/service/property-legal-sale-deed" },
      { label: "Gift deed and partition deed", href: "/service/property-legal-gift-partition" },
      { label: "RERA complaints and builder disputes", href: "/service/property-legal-rera" },
      { label: "Lease and rental agreements", href: "/service/property-legal-lease" },
      { label: "Mutation and khata assistance", href: "/service/property-legal-mutation-khata" },
    ],
  },
];

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

/** Business & IPR mega menu; Vakilsearch-style pillars + Startup bundle; leaf links open `/service/[slug]` landings. */
export const businessIprMenu: BusinessIprSection[] = [
  {
    id: "business-registration",
    label: "Business registration",
    categories: [
      {
        id: "biz-company-structures",
        label: "Company structures",
        items: [
          { label: "Private Limited Company", href: "/service/startup-private-limited" },
          { label: "Limited Liability Partnership", href: "/service/startup-llp" },
          { label: "One Person Company", href: "/service/startup-opc" },
          { label: "Partnership firm", href: "/service/startup-partnership-firm" },
          { label: "Sole proprietorship", href: "/service/biz-reg-sole-proprietorship" },
          { label: "Nidhi company", href: "/service/biz-reg-nidhi-company" },
          { label: "Producer company", href: "/service/biz-reg-producer-company" },
          { label: "Section 8 company", href: "/service/biz-reg-section-8-company" },
        ],
      },
      {
        id: "biz-name-programs",
        label: "Name and startup programs",
        items: [
          { label: "Company name search", href: "/service/biz-reg-company-name-search" },
          { label: "Change company name", href: "/service/biz-reg-change-company-name" },
          { label: "Startup India registration", href: "/service/biz-reg-startup-india" },
        ],
      },
      {
        id: "biz-licenses",
        label: "Licenses and registrations",
        items: [
          { label: "Digital Signature Certificate (DSC)", href: "/service/biz-reg-digital-signature-certificate" },
          { label: "Udyam (MSME) registration", href: "/service/biz-reg-udyam-registration" },
          { label: "FSSAI license", href: "/service/biz-reg-fssai-license" },
          { label: "Import Export Code (IEC)", href: "/service/startup-export-import-code" },
        ],
      },
    ],
  },
  {
    id: "tax-compliance",
    label: "Tax and compliance",
    categories: [
      {
        id: "tax-gst",
        label: "GST",
        items: [
          { label: "GST registration", href: "/service/startup-gst-registration" },
          { label: "GST return filing", href: "/service/startup-annual-gst-return" },
          { label: "GST cancellation", href: "/service/tax-gst-cancellation" },
        ],
      },
      {
        id: "tax-company-changes",
        label: "Company changes",
        items: [
          { label: "Add director", href: "/service/tax-add-director" },
          { label: "Remove director", href: "/service/tax-remove-director" },
          { label: "Increase authorized capital", href: "/service/tax-increase-authorized-capital" },
          { label: "Change registered office", href: "/service/tax-change-registered-office" },
        ],
      },
      {
        id: "tax-annual-labour",
        label: "Annual filings and labour",
        items: [
          { label: "ROC annual filing", href: "/service/tax-roc-annual-filing" },
          { label: "LLP annual filing", href: "/service/tax-llp-annual-filing" },
          { label: "PF registration", href: "/service/tax-pf-registration" },
          { label: "ESI registration", href: "/service/tax-esi-registration" },
          { label: "Shops and establishment license", href: "/service/tax-shops-establishment" },
          { label: "Professional tax registration", href: "/service/tax-professional-tax-registration" },
        ],
      },
    ],
  },
  {
    id: "trademark-ip",
    label: "Trademark and IP",
    categories: [
      {
        id: "ip-trademark",
        label: "Trademark",
        items: [
          { label: "Trademark registration", href: "/service/startup-trademark" },
          { label: "Trademark search", href: "/service/ipr-trademark-search" },
          { label: "Respond to trademark objections", href: "/service/startup-tm-objections" },
          { label: "Trademark renewal", href: "/service/ipr-trademark-renewal" },
          { label: "Trademark assignment", href: "/service/ipr-trademark-assignment" },
        ],
      },
      {
        id: "ip-copyright-patent-design",
        label: "Copyright, patent, and design",
        items: [
          { label: "Copyright registration", href: "/service/startup-copyright" },
          { label: "Patent registration", href: "/service/startup-patent" },
          { label: "Provisional patent application", href: "/service/ipr-patent-provisional-application" },
          { label: "Design registration", href: "/service/ipr-design-registration" },
        ],
      },
    ],
  },
  {
    id: "startup",
    label: "Startup",
    categories: [
      {
        id: "company-formation",
        label: "Company Formation",
        items: [
          { label: "Partnership Firm", href: "/service/startup-partnership-firm" },
          { label: "Private Limited Company", href: "/service/startup-private-limited" },
          { label: "One Person Company", href: "/service/startup-opc" },
          { label: "Limited Liability Partnership", href: "/service/startup-llp" },
        ],
      },
      {
        id: "intellectual-property",
        label: "Intellectual Property",
        items: [
          { label: "Copyright", href: "/service/startup-copyright" },
          { label: "Respond to trademark objections", href: "/service/startup-tm-objections" },
          { label: "Patent", href: "/service/startup-patent" },
          { label: "Trademark", href: "/service/startup-trademark" },
        ],
      },
      {
        id: "registrations-licenses",
        label: "Registrations & Licenses",
        items: [
          { label: "GST registration", href: "/service/startup-gst-registration" },
          { label: "Annual GST return filing", href: "/service/startup-annual-gst-return" },
          { label: "Export Import Code", href: "/service/startup-export-import-code" },
        ],
      },
    ],
  },
];

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
