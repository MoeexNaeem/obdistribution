import type { MetadataRoute } from "next";
import { categories } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://obdistributions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core marketing pages.
  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/categories", priority: 0.9, freq: "weekly" },
    { path: "/wholesale-program", priority: 0.9, freq: "monthly" },
    { path: "/why-ob-distributions", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
  ];

  // Programmatic per-category pages.
  const categoryRoutes = categories.map((c) => ({
    path: `/categories/${c.slug}`,
    priority: 0.8,
    freq: "weekly" as const,
  }));

  return [...staticRoutes, ...categoryRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
