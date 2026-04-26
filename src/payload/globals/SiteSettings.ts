import type { GlobalConfig } from "payload";

import { anyone, isAdminField, isAuthenticated } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description:
      "Global site configuration: brand, contact channels, theme colors, social links, and SEO defaults. Visible to all visitors but only editable by admins/editors.",
  },
  access: {
    read: anyone,
    update: isAuthenticated,
    readVersions: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand",
          fields: [
            { name: "brandName", type: "text", required: true, defaultValue: "LexBridge" },
            {
              name: "tagline",
              type: "textarea",
              admin: { description: "Footer paragraph that introduces the brand." },
            },
            { name: "logo", type: "upload", relationTo: "media" },
            { name: "favicon", type: "upload", relationTo: "media" },
            { name: "ogImage", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              name: "phone",
              type: "text",
              required: true,
              defaultValue: "+91 99566 66699",
              admin: { description: "Display phone with country code." },
            },
            {
              name: "whatsappE164",
              type: "text",
              required: true,
              defaultValue: "919956666699",
              admin: {
                description:
                  "WhatsApp Business number, digits only with country code (e.g. 919876543210).",
              },
            },
            {
              name: "emailInfo",
              type: "email",
              required: true,
              defaultValue: "legaldunia@gmail.com",
            },
            {
              name: "emailCare",
              type: "email",
              required: true,
              defaultValue: "legaldunia@gmail.com",
            },
            {
              name: "whatsappPrefillChat",
              type: "textarea",
              defaultValue:
                "Hello, I would like to chat with a lawyer about my legal matter. Please let me know how to proceed.",
              admin: { description: "Prefilled WhatsApp text when user taps \u201cChat with lawyer\u201d." },
            },
            {
              name: "whatsappPrefillTalk",
              type: "textarea",
              defaultValue:
                "Hello, I would like to speak with a lawyer. Please suggest a time for a call or voice consultation.",
            },
            {
              name: "whatsappPrefillHeader",
              type: "textarea",
              defaultValue:
                "Hello, I am on the LexBridge website and would like to speak with a lawyer. Please let me know the next steps.",
            },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "instagramUrl", type: "text", defaultValue: "https://www.instagram.com/" },
            { name: "linkedinUrl", type: "text", defaultValue: "https://www.linkedin.com/" },
          ],
        },
        {
          label: "Theme",
          description:
            "Brand colors are written into CSS variables on every page. Format: any valid CSS color (hex, rgb, hsl, oklch...).",
          fields: [
            {
              name: "theme",
              type: "group",
              fields: [
                {
                  name: "background",
                  type: "text",
                  defaultValue: "#0a0c10",
                },
                {
                  name: "foreground",
                  type: "text",
                  defaultValue: "#eef0f4",
                },
                {
                  name: "muted",
                  type: "text",
                  defaultValue: "#a8b3c4",
                },
                {
                  name: "surface",
                  type: "text",
                  defaultValue: "#121822",
                },
                {
                  name: "surfaceElevated",
                  type: "text",
                  defaultValue: "#1a2230",
                },
                {
                  name: "border",
                  type: "text",
                  defaultValue: "#2a3545",
                },
                {
                  name: "accent",
                  type: "text",
                  defaultValue: "#d4af37",
                  admin: { description: "Primary brand color (the gold)." },
                },
                {
                  name: "accentForeground",
                  type: "text",
                  defaultValue: "#0a0c10",
                  admin: { description: "Text color used on top of accent backgrounds." },
                },
                {
                  name: "glow",
                  type: "text",
                  defaultValue: "#4a6fa5",
                  admin: { description: "Secondary slate-blue used for hero washes." },
                },
              ],
              access: {
                update: isAdminField,
              },
              admin: {
                description: "Only admins can change global theme tokens.",
              },
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "siteUrl",
              type: "text",
              admin: {
                description:
                  "Public site URL (no trailing slash). Falls back to NEXT_PUBLIC_SITE_URL env if blank.",
              },
            },
            {
              name: "metaTitle",
              type: "text",
              admin: { description: "Default <title> for the home page." },
            },
            {
              name: "metaDescription",
              type: "textarea",
              admin: { description: "Default meta description for the home page." },
            },
          ],
        },
      ],
    },
  ],
};
