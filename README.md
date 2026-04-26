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

> **No `DATABASE_URI` yet?** The site still renders. The CMS data layer in `src/lib/cms.ts` falls back to the static fixtures in `src/content/*` so the public site is fully usable while you finish setting up Postgres.

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
6. Visit `/admin`, create the first admin user, then run the seed script to populate the database with the existing site content:
   ```bash
   npm run seed
   ```

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
| Seed DB from current `src/content/*` | `npm run seed` (idempotent — skips rows that already exist) |
| Generate Payload TS types | `npm run payload:generate-types` |
| Regenerate admin import map | `npm run payload:generate-importmap` |
| Reset admin password | `/admin/forgot` (email link logged to server stdout if SMTP not configured) |

### Roles

- **admin** — full access, can create users and edit Site Settings (theme, contact channels).
- **editor** — can edit collections (Services, Advocates, Testimonials, etc.) and the homepage layout, but cannot manage users or change theme tokens.

### Live preview & drafts

Drafts are enabled on the **Home page** global and the **Services** collection. Inside the admin panel, click the eye icon on any drafted document to open Payload's split-pane live preview — the right side iframes the public site at `/api/preview?slug=...`, which enables Next.js draft mode for your session and renders the in-progress draft instead of the published version.

To exit preview mode and see the published site, hit `/api/preview/exit`.

### Visual page builder (homepage)

`/admin → Globals → Home page → Layout` is a drag-and-drop list of blocks. Each block maps 1:1 to a section component in `src/components/sections/`:

- `HeroBlock` → `Hero`
- `StatsStripBlock` → `StatsStrip`
- `ServiceTilesBlock` → `TopServiceTiles`
- `AdvocatesShowcaseBlock` → `AdvocatesShowcase`
- `LegalUpdatesBlock` → `LegalUpdates`
- `TestimonialsBlock` → `Testimonials`
- `ContactStripBlock` → `ContactStrip`
- `ClientLogosBlock` → `ClientLogos`
- `RichTextBlock` → free-form rich text section

Reorder rows or delete a block to change/hide sections. The dispatcher is `src/components/render/RenderBlocks.tsx`.

If the `Home page` global has an empty layout, the homepage falls back to the original fixed layout, populated from CMS data — so the site never breaks.

### Theme

`/admin → Globals → Site Settings → Theme` controls every CSS color variable used by the public site. Values can be any valid CSS color (hex, rgb, hsl, oklch...). The `ThemeStyle` server component injects them as `:root` overrides in the layout, so theme changes take effect on the next request without a redeploy.

## Routing layout

The app uses two Next.js root layouts via route groups:

```
src/app/
  (frontend)/          public marketing site (existing layout, header, footer)
    layout.tsx
    page.tsx           block-driven homepage (with static fallback)
    about/  contact/  cookies/  privacy/  service/[slug]/  services/  terms/
    api/contact/route.ts
    api/chat/route.ts
    api/preview/route.ts        enable Next.js draft mode for live preview
    api/preview/exit/route.ts   disable draft mode
  (payload)/           Payload admin + REST/GraphQL APIs
    layout.tsx
    admin/[[...segments]]/
    api/payload/[...slug]/
    api/payload/graphql/
    api/payload/graphql-playground/
```

Payload's REST API is mounted under `/api/payload/*` to avoid colliding with the existing `/api/contact` and `/api/chat` routes.

## Media storage

In development, uploads are stored on local disk under `public/media/`. For production deploys you should switch to a cloud bucket:

| Adapter | When to use |
|---------|-------------|
| `@payloadcms/storage-s3` | Any S3-compatible bucket (AWS, Cloudflare R2, Wasabi, Backblaze) |
| `@payloadcms/storage-vercel-blob` | Hosting on Vercel |

After installing the adapter, register it in `payload.config.ts` under the `plugins` array, and add the bucket hostname to `.env`:

```
MEDIA_HOSTNAME=my-bucket.s3.eu-west-1.amazonaws.com
```

`next.config.ts` reads `MEDIA_HOSTNAME` and adds it to `images.remotePatterns` so `<Image>` can load uploads from the CDN.

## Deploy notes

- Any Node host works (Vercel, Render, Fly, Railway, a plain VPS).
- On Vercel, set `DATABASE_URI`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SITE_URL` as environment variables. Use Neon for Postgres so cold starts can connect over the pooled URL.
- For media uploads in production, swap the local-disk media adapter for `@payloadcms/storage-vercel-blob` or `@payloadcms/storage-s3` (see *Media storage* above).
- Build command: `npm run build`. The build is safe to run without `DATABASE_URI` set — the CMS data layer falls back to static fixtures so prerendering still succeeds (handy for preview deploys).
- After deploying with a fresh database, log in to `/admin`, create the admin user, and run `npm run seed` from a one-off shell to populate the DB.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- Payload CMS v3 (admin + page builder + drafts + live preview)
- Postgres via `@payloadcms/db-postgres`
- Lexical rich text editor
- TypeScript, Zod (forms validation)
