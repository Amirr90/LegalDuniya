import type { Block } from "payload";

export const ClientLogosBlock: Block = {
  slug: "clientLogos",
  labels: { singular: "Client logos", plural: "Client logos" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Trusted by teams at" },
  ],
};
