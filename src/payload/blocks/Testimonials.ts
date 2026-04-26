import type { Block } from "payload";

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: { singular: "Testimonials", plural: "Testimonials" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Testimonials" },
    { name: "title", type: "text", defaultValue: "What clients say" },
    { name: "disclaimer", type: "textarea" },
    {
      name: "testimonials",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
      admin: {
        description:
          "Optional manual pick. Leave empty to show all testimonials sorted by `order`.",
      },
    },
  ],
};
