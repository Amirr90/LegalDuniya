import type { Block } from "payload";

export const ContactStripBlock: Block = {
  slug: "contactStrip",
  labels: { singular: "Contact strip", plural: "Contact strips" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Get in touch" },
    {
      name: "title",
      type: "text",
      defaultValue: "Head office in Lucknow",
    },
    { name: "subtitle", type: "textarea" },
    { name: "callCtaLabel", type: "text", defaultValue: "Call now" },
    { name: "whatsappCtaLabel", type: "text", defaultValue: "WhatsApp us" },
    { name: "emailCtaLabel", type: "text", defaultValue: "Email us" },
    {
      name: "mapCtaLabel",
      type: "text",
      defaultValue: "Open in Google Maps",
      admin: { description: "Label for the head office map / directions button." },
    },
  ],
};
