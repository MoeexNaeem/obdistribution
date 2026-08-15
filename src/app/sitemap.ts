import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://obdistributions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/why-ob-distributions", "/contact"];
  const now = new Date();
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
