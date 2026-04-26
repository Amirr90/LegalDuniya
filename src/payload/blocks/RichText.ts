import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich text", plural: "Rich text" },
  fields: [
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor(),
    },
    {
      name: "muted",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Use a muted (surface) background." },
    },
  ],
};
