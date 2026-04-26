import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/lib/cms";
import { getSiteUrl } from "@/lib/siteUrl";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl().origin;
  const staticPaths = ["", "/about", "/contact", "/privacy", "/terms", "/cookies", "/services"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: path === "" ? origin : `${origin}${path}`,
    lastModified: new Date(),
  }));

  const slugs = await getAllServiceSlugs();
  for (const slug of slugs) {
    entries.push({
      url: `${origin}/service/${slug}`,
      lastModified: new Date(),
    });
  }

  return entries;
}
