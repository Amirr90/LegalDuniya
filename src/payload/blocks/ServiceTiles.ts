import type { Block } from "payload";

export const ServiceTilesBlock: Block = {
  slug: "serviceTiles",
  labels: { singular: "Service tiles", plural: "Service tiles" },
  fields: [
    { name: "sectionId", type: "text", admin: { description: "Optional anchor id (e.g. top-services)." } },
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    {
      name: "tileSource",
      type: "select",
      defaultValue: "featured",
      required: true,
      options: [
        { label: "Featured services (auto)", value: "featured" },
        { label: "All non-featured services (auto)", value: "specialized" },
        { label: "Manually picked services", value: "manual" },
      ],
      admin: {
        description:
          "Featured = services flagged Featured. Specialized = the rest. Manual = pick exactly which services to show below.",
      },
    },
    {
      name: "manualTiles",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      admin: {
        condition: (_, sib) => sib?.tileSource === "manual",
        description: "Drag to reorder. Order here is preserved on the home page.",
      },
    },
    {
      name: "muted",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Use the muted (surface) background for this section." },
    },
    {
      name: "showViewAllLink",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show the \u201cView all services\u201d outline button below the grid." },
    },
  ],
};
