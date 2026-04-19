import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/content/servicePages";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl().origin;
  const staticPaths = ["", "/about", "/contact", "/privacy", "/terms", "/cookies", "/services"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: path === "" ? origin : `${origin}${path}`,
    lastModified: new Date(),
  }));

  for (const slug of getAllServiceSlugs()) {
    entries.push({
      url: `${origin}/service/${slug}`,
      lastModified: new Date(),
    });
  }

  return entries;
}
