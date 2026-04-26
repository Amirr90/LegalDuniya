import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  imageAltText: "Hero",
  fields: [
    { name: "headline", type: "text", required: true },
    { name: "subtext", type: "textarea" },
    {
      name: "checklist",
      type: "array",
      labels: { singular: "Checklist item", plural: "Checklist items" },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      type: "row",
      fields: [
        { name: "primaryCtaLabel", type: "text" },
        {
          name: "primaryCtaTarget",
          type: "select",
          defaultValue: "contact",
          options: [
            { label: "Contact page", value: "contact" },
            { label: "WhatsApp – chat prefill", value: "whatsappChat" },
            { label: "WhatsApp – talk prefill", value: "whatsappTalk" },
            { label: "Phone (tel:)", value: "phone" },
            { label: "Custom URL", value: "custom" },
          ],
        },
        {
          name: "primaryCtaHref",
          type: "text",
          admin: {
            condition: (_, sib) => sib?.primaryCtaTarget === "custom",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "secondaryCtaLabel", type: "text" },
        {
          name: "secondaryCtaTarget",
          type: "select",
          defaultValue: "whatsappChat",
          options: [
            { label: "Contact page", value: "contact" },
            { label: "WhatsApp – chat prefill", value: "whatsappChat" },
            { label: "WhatsApp – talk prefill", value: "whatsappTalk" },
            { label: "Phone (tel:)", value: "phone" },
            { label: "Custom URL", value: "custom" },
          ],
        },
        {
          name: "secondaryCtaHref",
          type: "text",
          admin: {
            condition: (_, sib) => sib?.secondaryCtaTarget === "custom",
          },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hero image (right column on desktop). Optional." },
    },
  ],
};
