export type Advocate = {
  name: string;
  practice: string;
  imageSrc: string;
};

export type LegalUpdate = {
  title: string;
  date: string;
  href: string;
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

/** Vakilsearch-style Lawyer Services tree; links go to contact until dedicated pages exist. */
export const lawyerServicesMenu: LawyerServicesCategory[] = [
  {
    id: "specialization",
    label: "Lawyers specialization",
    items: [
      { label: "Finance lawyers", href: "/contact?topic=finance-lawyers" },
      { label: "Cheque bounce lawyers", href: "/contact?topic=cheque-bounce-lawyers" },
      { label: "Child custody lawyers", href: "/contact?topic=child-custody-lawyers" },
      { label: "Civil lawyers", href: "/contact?topic=civil-lawyers" },
      { label: "Consumer protection lawyers", href: "/contact?topic=consumer-protection-lawyers" },
      { label: "Contract lawyers", href: "/contact?topic=contract-lawyers" },
      { label: "Corporate lawyers", href: "/contact?topic=corporate-lawyers" },
      { label: "Criminal lawyers", href: "/contact?topic=criminal-lawyers" },
      { label: "Cyber crime lawyers", href: "/contact?topic=cyber-crime-lawyers" },
      { label: "Property lawyers", href: "/contact?topic=property-lawyers" },
      { label: "Divorce lawyers", href: "/contact?topic=divorce-lawyers" },
      { label: "Family lawyers", href: "/contact?topic=family-lawyers" },
      { label: "GST lawyers", href: "/contact?topic=gst-lawyers" },
      { label: "Intellectual property lawyers", href: "/contact?topic=ip-lawyers" },
      { label: "Labour lawyers", href: "/contact?topic=labour-lawyers" },
      { label: "Money recovery lawyers", href: "/contact?topic=money-recovery-lawyers" },
      { label: "Motor accident lawyers", href: "/contact?topic=motor-accident-lawyers" },
      { label: "Muslim law lawyers", href: "/contact?topic=muslim-law-lawyers" },
      {
        label: "Technology, media and telecom (TMT)",
        href: "/contact?topic=tmt-lawyers",
      },
      {
        label: "Risk management and regulatory",
        href: "/contact?topic=risk-regulatory-lawyers",
      },
    ],
  },
  {
    id: "legal-notice",
    label: "Legal notice",
    items: [
      { label: "Legal notice for money recovery", href: "/contact?topic=notice-money-recovery" },
      { label: "Legal notice recovery of dues", href: "/contact?topic=notice-recovery-dues" },
      {
        label: "Legal notice under Consumer Protection Act",
        href: "/contact?topic=notice-consumer-act",
      },
      { label: "Cheque bounce notice", href: "/contact?topic=notice-cheque-bounce" },
      { label: "Reply to ITR notice", href: "/contact?topic=notice-reply-itr" },
      { label: "Caveat petition", href: "/contact?topic=caveat-petition" },
      { label: "Tenant rental notice", href: "/contact?topic=tenant-rental-notice" },
    ],
  },
  {
    id: "litigation",
    label: "Litigation",
    items: [
      { label: "Defamation complaint", href: "/contact?topic=litigation-defamation" },
      { label: "Intellectual property infringement", href: "/contact?topic=litigation-ip" },
      { label: "Employment dispute litigation", href: "/contact?topic=litigation-employment" },
      { label: "Contract dispute litigation", href: "/contact?topic=litigation-contract" },
      { label: "Cheque bounce complaint", href: "/contact?topic=litigation-cheque-bounce" },
      { label: "Property litigation", href: "/contact?topic=litigation-property" },
      { label: "Cyber crime litigation", href: "/contact?topic=litigation-cyber-crime" },
      { label: "Mutual divorce", href: "/contact?topic=litigation-mutual-divorce" },
      { label: "Contested divorce", href: "/contact?topic=litigation-contested-divorce" },
      {
        label: "Restitution of conjugal rights",
        href: "/contact?topic=litigation-restitution-conjugal",
      },
      { label: "POSH compliance", href: "/contact?topic=litigation-posh" },
      { label: "RERA complaint", href: "/contact?topic=litigation-rera" },
      { label: "US litigation service", href: "/contact?topic=litigation-us" },
    ],
  },
  {
    id: "consumer-complaint",
    label: "Consumer complaint",
    items: [
      { label: "Automobile", href: "/contact?topic=consumer-automobile" },
      { label: "Bank", href: "/contact?topic=consumer-bank" },
      { label: "Courier and logistics", href: "/contact?topic=consumer-courier" },
      { label: "E-commerce", href: "/contact?topic=consumer-ecommerce" },
      { label: "Education", href: "/contact?topic=consumer-education" },
      { label: "Grievances", href: "/contact?topic=consumer-grievances" },
      { label: "Home appliances", href: "/contact?topic=consumer-home-appliances" },
      { label: "Hotels", href: "/contact?topic=consumer-hotels" },
      { label: "IT companies", href: "/contact?topic=consumer-it" },
      { label: "Insurance", href: "/contact?topic=consumer-insurance" },
      { label: "Investments", href: "/contact?topic=consumer-investments" },
      { label: "Medical", href: "/contact?topic=consumer-medical" },
      { label: "Real estate", href: "/contact?topic=consumer-real-estate" },
      { label: "Retail business", href: "/contact?topic=consumer-retail" },
      { label: "Streaming platforms", href: "/contact?topic=consumer-streaming" },
      { label: "Travel", href: "/contact?topic=consumer-travel" },
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

/** Business & IPR mega menu; StartUp section mirrors LegalKart startup tree; links go to contact until dedicated pages exist. */
export const businessIprMenu: BusinessIprSection[] = [
  {
    id: "startup",
    label: "StartUp",
    categories: [
      {
        id: "company-formation",
        label: "Company Formation",
        items: [
          { label: "Partnership Firm", href: "/contact?topic=startup-partnership-firm" },
          { label: "Private Limited Company", href: "/contact?topic=startup-private-limited" },
          { label: "One Person Company", href: "/contact?topic=startup-opc" },
          { label: "Limited Liability Partnership", href: "/contact?topic=startup-llp" },
        ],
      },
      {
        id: "intellectual-property",
        label: "Intellectual Property",
        items: [
          { label: "Copyright", href: "/contact?topic=startup-copyright" },
          { label: "Respond to Tm Objections", href: "/contact?topic=startup-tm-objections" },
          { label: "Patent", href: "/contact?topic=startup-patent" },
          { label: "Trademark", href: "/contact?topic=startup-trademark" },
        ],
      },
      {
        id: "registrations-licenses",
        label: "Registrations & Licenses",
        items: [
          { label: "Gst Registration", href: "/contact?topic=startup-gst-registration" },
          { label: "Annual Gst Return Filing", href: "/contact?topic=startup-annual-gst-return" },
          { label: "Export Import Code", href: "/contact?topic=startup-export-import-code" },
        ],
      },
    ],
  },
];

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
    name: "Yanina V.",
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
    href: "#updates",
  },
  {
    title: "Supreme Court signals tighter guidelines on wrongful conviction compensation",
    date: "3 Nov 2025",
    href: "#updates",
  },
  {
    title: "Matrimonial courts caution against indiscriminate family-wide allegations",
    date: "24 Oct 2025",
    href: "#updates",
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
  phone: "+91 74993 83674",
  emailInfo: "info@example.com",
  emailCare: "care@example.com",
} as const;
