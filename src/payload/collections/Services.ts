import type { CollectionConfig } from "payload";

import { anyone, isAuthenticated } from "../access";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "tagline", "featured", "order"],
    description:
      "Service landing pages and tiles. Each service powers a /service/[slug] route plus tiles on the home page and mega menus.",
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Card",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              admin: { description: "Display name shown on tiles and the page hero." },
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              admin: {
                description:
                  "URL fragment under /service/. Use kebab-case, e.g. divorce-lawyer.",
              },
            },
            {
              name: "tagline",
              type: "text",
              admin: { description: "Short label shown below the tile title." },
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              required: false,
              admin: {
                description:
                  "Tile and hero image. If empty, falls back to a default category image.",
              },
            },
            {
              name: "featured",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description: "Show this service in the homepage \u201cTop services\u201d section.",
              },
            },
            {
              name: "order",
              type: "number",
              defaultValue: 0,
              admin: {
                description:
                  "Lower numbers appear first when ordering tiles within a section.",
              },
            },
            {
              name: "menuRoots",
              type: "select",
              hasMany: true,
              admin: {
                description:
                  "Which mega-menu roots should list this service. Leave empty if not part of a mega menu.",
              },
              options: [
                { label: "Home \u2014 Top services", value: "homeTop" },
                { label: "Home \u2014 Specialized", value: "homeSpecialized" },
                { label: "Header strip", value: "headerStrip" },
                { label: "Lawyer services menu", value: "lawyerServices" },
                { label: "Property services menu", value: "propertyServices" },
                { label: "Business & IPR menu", value: "businessIpr" },
                { label: "Property suggested links", value: "propertySuggested" },
              ],
            },
          ],
        },
        {
          label: "Landing page",
          fields: [
            {
              name: "heroSummary",
              type: "textarea",
              required: false,
              admin: {
                description:
                  "Lead paragraph on the /service/[slug] page hero (under the title).",
              },
            },
            {
              name: "articleLead",
              type: "textarea",
              admin: {
                description:
                  "Intro paragraph above the article body sections on the landing page.",
              },
            },
            {
              name: "sections",
              type: "array",
              labels: { singular: "Section", plural: "Sections" },
              admin: {
                description: "Body sections of the landing article, in order.",
              },
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "metaDescription",
              type: "textarea",
              maxLength: 320,
              admin: {
                description:
                  "Used as <meta name=\"description\"> on the service page. ~150 chars is ideal.",
              },
            },
          ],
        },
      ],
    },
  ],
};
