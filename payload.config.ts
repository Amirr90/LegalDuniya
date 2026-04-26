import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Advocates } from "./src/payload/collections/Advocates";
import { ClientLogos } from "./src/payload/collections/ClientLogos";
import { LegalUpdates } from "./src/payload/collections/LegalUpdates";
import { Media } from "./src/payload/collections/Media";
import { MenuItems } from "./src/payload/collections/MenuItems";
import { Offices } from "./src/payload/collections/Offices";
import { Services } from "./src/payload/collections/Services";
import { Testimonials } from "./src/payload/collections/Testimonials";
import { Users } from "./src/payload/collections/Users";
import { HomePage } from "./src/payload/globals/HomePage";
import { SiteSettings } from "./src/payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "src"),
    },
    meta: {
      titleSuffix: " · LexBridge admin",
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
        const target = (path: string) =>
          `${base}/api/preview?slug=${encodeURIComponent(path)}`;
        if (globalConfig?.slug === "home-page") {
          return target("/");
        }
        if (collectionConfig?.slug === "services") {
          const slug = (data as { slug?: string } | undefined)?.slug;
          return target(slug ? `/service/${slug}` : "/");
        }
        return target("/");
      },
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
      collections: ["services"],
      globals: ["home-page"],
    },
  },
  routes: {
    admin: "/admin",
    api: "/api/payload",
    graphQL: "/api/payload/graphql",
    graphQLPlayground: "/api/payload/graphql-playground",
  },
  collections: [
    Users,
    Media,
    Services,
    Advocates,
    Testimonials,
    LegalUpdates,
    Offices,
    ClientLogos,
    MenuItems,
  ],
  globals: [SiteSettings, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "dev-only-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
  }),
  sharp,
});
