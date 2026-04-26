import type { Block } from "payload";

export const StatsStripBlock: Block = {
  slug: "statsStrip",
  labels: { singular: "Stats strip", plural: "Stats strips" },
  fields: [
    {
      name: "stats",
      type: "array",
      minRows: 1,
      maxRows: 8,
      labels: { singular: "Stat", plural: "Stats" },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          admin: { description: "e.g. 1100+, 100%, 24/7." },
        },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};
