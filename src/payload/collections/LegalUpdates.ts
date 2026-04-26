import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { anyone, isAuthenticated } from "../access";

export const LegalUpdates: CollectionConfig = {
  slug: "legal-updates",
  labels: { singular: "Legal update", plural: "Legal updates" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "order"],
    description:
      "Short legal-news entries. The home page \u201cLegal updates\u201d block lists these in order.",
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "date",
      type: "text",
      required: true,
      admin: {
        description:
          "Display string, e.g. \"3 Nov 2025\". Kept as text so editors can use any format.",
      },
    },
    {
      name: "slug",
      type: "text",
      admin: { description: "Optional slug if/when articles get their own /updates/[slug] route." },
    },
    {
      name: "body",
      type: "richText",
      editor: lexicalEditor(),
      admin: {
        description: "Optional full body for a future /updates/[slug] page.",
      },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
