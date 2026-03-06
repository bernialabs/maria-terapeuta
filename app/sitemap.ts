import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mariaterapeuta.com",
      lastModified: new Date("2026-03-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://mariaterapeuta.com/diadica",
      lastModified: new Date("2026-03-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mariaterapeuta.com/test-parejas",
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://mariaterapeuta.com/test-parejas/monotonia",
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://mariaterapeuta.com/test-parejas/lenguaje-del-amor",
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}
