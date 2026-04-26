import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

export const Advocates: CollectionConfig = {
  slug: "advocates",
  labels: { singular: "Advocate", plural: "Advocates" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "practice", "order"],
    description: "Advocates featured on the home page showcase.",
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "practice",
      type: "text",
      required: true,
      admin: { description: "Short practice area summary, e.g. \"Civil, criminal & family\"." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Portrait photo (4:5 aspect works best)." },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first." },
    },
  ],
};
