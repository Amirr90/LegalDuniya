import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "location", "order"],
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
      admin: { description: "The actual testimonial copy. Quotes added automatically." },
    },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "location", type: "text" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
