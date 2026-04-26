import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

export const ClientLogos: CollectionConfig = {
  slug: "client-logos",
  labels: { singular: "Client logo", plural: "Client logos" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
    description:
      "Client / partner names rendered as text in the \u201cTrusted by teams at\u201d strip. Optionally attach a logo image for future use.",
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
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional logo image (not used today, reserved for future)." },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
