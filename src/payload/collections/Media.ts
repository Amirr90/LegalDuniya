import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "mimeType", "filesize"],
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../../public/media"),
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 768, height: undefined },
      { name: "feature", width: 1280, height: undefined },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Short alt text for screen readers and SEO. Describe what the image shows.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description:
          "Optional photographer or source credit (visible only in the admin).",
      },
    },
  ],
};
