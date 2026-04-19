/** Canonical site origin for metadata, sitemap, and robots (no trailing slash). */
export function getSiteUrl(): URL {
  const raw =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.trim()) ||
    "http://localhost:3000";
  const url = new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
  return url;
}
