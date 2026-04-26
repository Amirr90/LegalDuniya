import type { Block } from "payload";

export const AdvocatesShowcaseBlock: Block = {
  slug: "advocatesShowcase",
  labels: { singular: "Advocates showcase", plural: "Advocates showcases" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Featured advocates" },
    {
      name: "title",
      type: "text",
      defaultValue: "Hire and consult experienced counsel",
    },
    { name: "subtitle", type: "textarea" },
    { name: "viewAllLinkLabel", type: "text", defaultValue: "View all advocates" },
    { name: "cardCtaLabel", type: "text", defaultValue: "Ask a lawyer" },
    {
      name: "advocates",
      type: "relationship",
      relationTo: "advocates",
      hasMany: true,
      admin: {
        description:
          "Optional manual selection. Leave empty to auto-include all advocates ordered by `order`.",
      },
    },
  ],
};
