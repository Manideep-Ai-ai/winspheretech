import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.winspheretech.com", lastModified: new Date(), priority: 1 }];
}
