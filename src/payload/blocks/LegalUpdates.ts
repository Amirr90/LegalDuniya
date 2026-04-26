import type { Block } from "payload";

export const LegalUpdatesBlock: Block = {
  slug: "legalUpdates",
  labels: { singular: "Legal updates", plural: "Legal updates" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Latest legal updates" },
    { name: "title", type: "text", defaultValue: "Headlines that shape strategy" },
    { name: "subtitle", type: "textarea" },
    { name: "ctaLabel", type: "text", defaultValue: "Speak to counsel" },
    {
      name: "limit",
      type: "number",
      defaultValue: 6,
      admin: { description: "Maximum number of updates to display (newest first)." },
    },
  ],
};
