import type { Metadata } from "next";

/** Single place to edit marketing copy, page titles, and UI labels shown across the site. */
export const brandName = "LexBridge";

export const layoutSiteMeta: Metadata = {
  title: {
    default: `${brandName} | Talk to verified lawyers`,
    template: `%s | ${brandName}`,
  },
  description: `${brandName} connects you with verified advocates for real legal work—diligence, disputes, compliance, and counsel across India. Confidential chat or call intake.`,
  openGraph: {
    title: `${brandName} | Talk to verified lawyers`,
    description:
      "Verified advocates for legal work across India—confidential consultations and practical guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | Talk to verified lawyers`,
    description:
      "Verified advocates for legal work across India—confidential consultations and practical guidance.",
  },
};

export const homePage = {
  viewAllServicesCta: "View all services",
} as const;

export const heroCopy = {
  headline:
    "Verified lawyers for property, business, family, and disputes — confidential consults across India",
  subtext:
    "Get expert legal assistance for property, business, family, or criminal matters. Transparent pricing. Confidential consultations. No delays.",
  primaryCta: "Talk to a lawyer now",
  secondaryCta: "Chat on WhatsApp",
  checklist: ["Verified Lawyers", "100% Confidential", "Quick Response"] as const,
} as const;

export const aboutPage = {
  metadata: {
    title: `About ${brandName}`,
    description:
      `Learn how ${brandName} connects people and businesses with verified advocates through secure chat and call consultations.`,
  } satisfies Metadata,
  eyebrow: "About us",
  title: "Legal access that keeps pace with modern life",
  paragraphs: [
    `${brandName} is a demonstration legal-technology experience inspired by leading lawyer marketplaces. Our goal is simple: reduce friction between urgent legal questions and qualified counsel—without sacrificing confidentiality or professional independence.`,
    "We combine structured intake, transparent availability, and modern collaboration tooling so you can move from search to conversation in minutes. Every advocate profile emphasizes domain focus, jurisdictions served, and languages supported.",
    "This site is a static marketing prototype: there is no live booking, billing, or regulated referral workflow wired in. Use it as a visual and UX reference for your own legal-tech product.",
  ] as const,
  primaryCta: "Talk to our team",
  secondaryCta: "Browse services",
} as const;

export const contactPage = {
  metadata: {
    title: `Contact ${brandName}`,
    description:
      `Reach ${brandName} by phone, email, or the contact form for consultations and intake. We respond to time-sensitive criminal and cyber matters quickly.`,
  } satisfies Metadata,
  eyebrow: "Contact",
  title: "Let's talk",
  topicLinePrefix: "You're contacting us about:",
  intro:
    "Share a short summary of your matter and preferred contact window. For emergencies, call the number below—our intake desk will prioritize time-sensitive criminal and cyber incidents.",
  phoneLabel: "Phone",
  emailLabel: "Email",
  carePrefix: "Care: ",
  officesHeading: "Offices",
} as const;

export const termsPage = {
  metadata: {
    title: "Terms",
    description: `${brandName} terms of use (draft template for legal review).`,
  } satisfies Metadata,
  draftBannerTitle: "Draft — legal review required.",
  draftBannerBody: "Replace this page with counsel-approved text before production launch.",
  title: "Terms of use",
  body:
    "This placeholder outlines site rules: acceptable use, disclaimers that site content is not legal advice, limitation of liability where permitted, governing law and jurisdiction, account termination if applicable, and links to the privacy notice.",
} as const;

export const privacyPage = {
  metadata: {
    title: "Privacy",
    description: `${brandName} privacy notice (draft template for legal review).`,
  } satisfies Metadata,
  draftBannerTitle: "Draft — legal review required.",
  draftBannerBody: "Replace this page with counsel-approved text before production launch.",
  title: "Privacy notice",
  paragraphs: [
    `This placeholder describes how ${brandName} would typically handle personal data: what you collect (e.g. name, email, phone, messages), why you collect it, how long you retain it, who you share it with, and how users exercise rights (access, correction, deletion) under applicable law including India's Digital Personal Data Protection Act where relevant.`,
    "If you use third parties (hosting, email, CRM, analytics, WhatsApp), list them here with purpose and legal basis. If the contact form only opens a mail client and does not transmit data to your servers, say so clearly.",
  ] as const,
} as const;

export const cookiesPage = {
  metadata: {
    title: "Cookies",
    description: `${brandName} cookie notice (draft template).`,
  } satisfies Metadata,
  draftBannerTitle: "Draft — legal review required.",
  draftBannerBody: "Expand this page if you add analytics or non-essential cookies.",
  title: "Cookie notice",
  body: `${brandName} currently uses only cookies and storage strictly necessary for the site to function (for example session or preferences). If you enable marketing or analytics scripts, list each cookie, its purpose, retention, and how users can opt out.`,
} as const;

export const servicesCatalogPage = {
  metadata: {
    title: "Service library",
    description: `Browse ${brandName} practice areas by category—family, disputes, property, corporate, and more. Each service links to an overview and consult options.`,
  } satisfies Metadata,
  backLinkLabel: `← ${brandName}`,
  jumpNavAriaLabel: "Jump to category",
  eyebrow: "Service library",
  title: "Browse by category",
  subtitle:
    "Every card opens a dedicated overview for that practice area. Explore by category, then reach out for a confidential consult when you are ready.",
  serviceWord: "service",
  servicesWord: "services",
} as const;

export const serviceLandingPage = {
  metadataFallbackTitle: "Service",
  breadcrumbHome: "Home",
  breadcrumbServices: "Services",
  articleDisclaimer: (serviceTitleLower: string) =>
    `This page is for general information about how ${brandName} triages ${serviceTitleLower} requests. It is not legal advice. Consult a qualified advocate for your matter.`,
  asideTitle: "Have any questions?",
  asideSubtitle: "Call us today",
  contactFormLink: "Full contact form",
  advocatesSectionTitle: "Top rated advocates",
  advocatesSectionSubtitle:
    "A sample of practitioners on our network—each vetted for responsiveness and domain depth.",
} as const;

export const footerCopy = {
  brandTitle: brandName,
  tagline: `${brandName} is a legal-technology platform inspired by modern advocate marketplaces. We connect individuals and businesses with verified counsel for chat or call consultations—nationwide, confidential, and efficient.`,
  disclaimerLabel: "Disclaimer:",
  disclaimerBody:
    "Listings are informational and do not constitute a referral or endorsement. Nothing on this site is legal advice; consult a qualified advocate for your matter.",
  exploreHeading: "Explore",
  socialHeading: "Connect with us",
  contactHeading: "Contact",
  phoneLabel: "Phone:",
  whatsappLabel: "WhatsApp:",
  whatsappLink: "Chat with a lawyer",
  emailLabel: "Email:",
  careLabel: "Care:",
  copyright: (year: number) => `© ${year} ${brandName}. All rights reserved.`,
  inspiredNote:
    "Inspired by public legal marketplace patterns—not affiliated with any specific operator.",
  links: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
    { href: "/#top-services", label: "Services" },
    { href: "/#updates", label: "Legal news" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
  ] as const,
} as const;

export const advocatesShowcaseCopy = {
  eyebrow: "Featured advocates",
  title: "Hire and consult experienced counsel",
  subtitle:
    "A snapshot of senior practitioners on our roster—each vetted for credentials, responsiveness, and domain depth.",
  viewAllLink: "View all advocates",
  cardCta: "Ask a lawyer",
} as const;

export const legalUpdatesCopy = {
  eyebrow: "Latest legal updates",
  title: "Headlines that shape strategy",
  subtitle:
    "Short briefs on judgments, policy shifts, and regulatory signals—curated for founders, in-house teams, and families navigating disputes. The items below are on this page for context (not separate articles).",
  ctaLink: "Speak to counsel",
} as const;

export const testimonialsCopy = {
  eyebrow: "Testimonials",
  title: `What clients say about ${brandName}`,
  disclaimer: "Illustrative stories for demonstration; not endorsements or typical results.",
} as const;

export const contactStripCopy = {
  eyebrow: "Get in touch",
  title: "Offices in Lucknow, Delhi, and Hyderabad",
  subtitle: "Prefer a call? Our intake team routes you to the right practice group in minutes—not days.",
  callCta: "Call now",
  whatsappCta: "WhatsApp us",
  emailCta: "Email us",
} as const;

export const clientLogosCopy = {
  eyebrow: "Trusted by teams at",
} as const;
