import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/tour-2026", priority: 0.9 },
    { path: "/galerie", priority: 0.7 },
    { path: "/initiatives", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority,
  }));
}
