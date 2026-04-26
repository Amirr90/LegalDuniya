import type { GlobalConfig } from "payload";

import { anyone, isAuthenticated } from "../access";
import {
  AdvocatesShowcaseBlock,
  ClientLogosBlock,
  ContactStripBlock,
  HeroBlock,
  LegalUpdatesBlock,
  RichTextBlock,
  ServiceTilesBlock,
  StatsStripBlock,
  TestimonialsBlock,
} from "../blocks";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  admin: {
    description:
      "Drag-and-drop blocks that compose the home page (/). Reorder, hide, or edit any section here \u2014 changes appear on the public site after the next request.",
  },
  versions: {
    drafts: true,
    max: 25,
  },
  access: {
    read: anyone,
    update: isAuthenticated,
    readVersions: isAuthenticated,
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      required: true,
      blocks: [
        HeroBlock,
        StatsStripBlock,
        ServiceTilesBlock,
        AdvocatesShowcaseBlock,
        LegalUpdatesBlock,
        TestimonialsBlock,
        ContactStripBlock,
        ClientLogosBlock,
        RichTextBlock,
      ],
      admin: {
        description: "Each block is one homepage section. Drag the handle to reorder.",
      },
    },
  ],
};
