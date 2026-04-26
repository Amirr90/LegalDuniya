import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

export const MENU_ROOTS = [
  { label: "Header strip (left)", value: "headerStripLeft" },
  { label: "Header strip (right)", value: "headerStripRight" },
  { label: "Service categories nav", value: "serviceCategories" },
  { label: "Header services submenu", value: "comprehensiveLegalSolutions" },
  { label: "Lawyer services mega menu", value: "lawyerServices" },
  { label: "Property services mega menu", value: "propertyServices" },
  { label: "Property suggested links", value: "propertySuggested" },
  { label: "Business & IPR mega menu", value: "businessIpr" },
  { label: "Footer explore links", value: "footerExplore" },
] as const;

export const MenuItems: CollectionConfig = {
  slug: "menu-items",
  labels: { singular: "Menu item", plural: "Menu items" },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "menuRoot", "parent", "order"],
    description:
      "Self-referential tree. Choose a menu root, optionally a parent (for sub-categories), and an order to position.",
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "label", type: "text", required: true },
    {
      name: "menuRoot",
      type: "select",
      required: true,
      options: MENU_ROOTS as unknown as { label: string; value: string }[],
      admin: { description: "Which menu this item lives in." },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "menu-items",
      admin: {
        description:
          "Optional parent menu item. Use to build category groups inside a mega menu (e.g. Lawyer specializations \u2192 children).",
      },
    },
    {
      name: "href",
      type: "text",
      admin: {
        description:
          "Direct URL or path. Use this for external links and home anchors. For service pages, prefer the related service field below so URLs stay correct if a slug changes.",
      },
    },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      admin: {
        description:
          "Optional. If set, the link points at /service/{slug} of this service.",
      },
    },
    {
      name: "icon",
      type: "text",
      admin: {
        description:
          "Optional emoji or icon glyph for header strip items (e.g. \uD83D\uDE97 for Challan).",
      },
    },
    {
      name: "ariaLabel",
      type: "text",
      admin: {
        description:
          "Optional aria-label override for accessibility (used by Property suggested links).",
      },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
