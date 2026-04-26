# LexBridge

A Next.js 16 marketing site with an embedded Payload CMS v3 admin panel and visual page builder.

- Public site: `/`
- Admin login: [`/admin`](http://localhost:3000/admin)
- Storage: Postgres (recommended: [Neon](https://neon.tech) free tier)
- Auth: Payload's built-in session auth, with `admin` and `editor` roles

## Quick start

```bash
# 1. install
npm install

# 2. copy env file and fill DATABASE_URI + PAYLOAD_SECRET
cp .env.example .env.local

# 3. run dev server
npm run dev
```

Visit [http://localhost:3000/admin](http://localhost:3000/admin) — the first time you load it, Payload will prompt you to create the first admin user. After that, log in to manage all content.

## Setting up Postgres on Neon (recommended)

1. Sign up at [neon.tech](https://neon.tech) and create a project (free tier is fine).
2. From the project dashboard, copy the **Pooled connection** string. It looks like:
   ```
   postgres://user:pass@ep-xyz-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```
3. Paste it into `.env.local` as `DATABASE_URI=...`.
4. Generate a Payload secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Set the output as `PAYLOAD_SECRET=...` in `.env.local`.
5. Start the dev server (`npm run dev`). Payload will run schema migrations against your Postgres on first boot.

## Local Postgres (Docker alternative)

```bash
docker run -d --name lexbridge-postgres \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=lexbridge \
  -p 5432:5432 postgres:16
```

Then:
```
DATABASE_URI=postgres://postgres:postgres@localhost:5432/lexbridge
```

## Admin runbook

| What | How |
|------|-----|
| Open admin panel | `npm run dev`, visit `/admin` |
| Create first user | Auto-prompted on first `/admin` visit when no users exist |
| Generate Payload TS types | `npm run payload:generate-types` |
| Regenerate admin import map | `npm run payload:generate-importmap` |
| Seed DB from current `src/content/*` | `npm run seed` (after Phase 1 lands) |
| Reset admin password | `/admin/forgot` (email link logged to server stdout if SMTP not configured) |

### Roles

- **admin** — full access, can create users and edit Site Settings (theme, contact channels).
- **editor** — can edit collections (Services, Advocates, Testimonials, etc.) and the homepage layout, but cannot manage users or change theme.

## Routing layout

The app uses two Next.js root layouts via route groups:

```
src/app/
  (frontend)/          public marketing site (existing layout, header, footer)
    layout.tsx
    page.tsx           homepage (block-driven after Phase 2)
    about/  contact/  cookies/  privacy/  service/[slug]/  services/  terms/
    api/contact/route.ts
    api/chat/route.ts
  (payload)/           Payload admin + REST/GraphQL APIs
    layout.tsx
    admin/[[...segments]]/
    api/payload/[...slug]/
    api/payload/graphql/
    api/payload/graphql-playground/
```

Payload's REST API is mounted under `/api/payload/*` to avoid colliding with the existing `/api/contact` and `/api/chat` routes.

## Deploy notes

- Any Node host works (Vercel, Render, Fly, Railway, a plain VPS).
- On Vercel, set `DATABASE_URI` and `PAYLOAD_SECRET` as environment variables. Use Neon for Postgres so cold starts can connect over the pooled URL.
- For media uploads in production, swap the local-disk media adapter for `@payloadcms/storage-vercel-blob` or `@payloadcms/storage-s3` (see Phase 3 in the implementation plan).
- Build command: `npm run build` (Payload schema migrations run automatically before Next.js compiles).

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- Payload CMS v3 (admin + page builder)
- Postgres via `@payloadcms/db-postgres`
- Lexical rich text editor
- TypeScript, Zod (forms validation)
