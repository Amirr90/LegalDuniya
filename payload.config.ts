import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";

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
  },
  routes: {
    admin: "/admin",
    api: "/api/payload",
    graphQL: "/api/payload/graphql",
    graphQLPlayground: "/api/payload/graphql-playground",
  },
  collections: [Users],
  globals: [],
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
