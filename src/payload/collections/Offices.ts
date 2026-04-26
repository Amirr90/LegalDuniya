import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

export const Offices: CollectionConfig = {
  slug: "offices",
  labels: { singular: "Office", plural: "Offices" },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "order"],
    description: "Office locations shown in the contact strip and footer.",
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      admin: { description: "e.g. \"Corporate office (Lucknow)\"." },
    },
    {
      name: "lines",
      type: "array",
      required: true,
      labels: { singular: "Line", plural: "Lines" },
      fields: [{ name: "text", type: "text", required: true }],
      admin: { description: "Address lines, in order." },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
