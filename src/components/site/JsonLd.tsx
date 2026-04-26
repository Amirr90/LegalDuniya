import { contactChannels, headOfficeAddressFull } from "@/content/site";
import { getSiteUrl } from "@/lib/siteUrl";

export function JsonLd() {
  const url = getSiteUrl().href.replace(/\/$/, "");
  const tel = contactChannels.phone.replace(/\s/g, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LexBridge",
    url,
    description:
      "LexBridge connects individuals and businesses with verified advocates for confidential legal consultations.",
    address: {
      "@type": "PostalAddress",
      streetAddress: headOfficeAddressFull,
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: tel,
        contactType: "customer service",
        email: contactChannels.emailInfo,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
