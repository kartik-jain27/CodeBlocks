import type { MetadataRoute } from "next";

import { blockCategories, blocksRegistry } from "@/lib/blocks-registry";
import { getAppUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getAppUrl();
  const lastModified = new Date();

  const staticRoutes = ["", "/blocks", "/pricing", "/docs", "/terms", "/privacy"];
  const categoryRoutes = blockCategories.map(
    (category) => `/blocks/${category.slug}`,
  );
  const blockRoutes = blocksRegistry.map(
    (block) => `/blocks/${block.category}/${block.name}`,
  );

  return [...staticRoutes, ...categoryRoutes, ...blockRoutes].map((route) => ({
    url: `${appUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/blocks") ? 0.8 : 0.6,
  }));
}
