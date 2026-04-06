import type { MetadataRoute } from "next";

type ProductLite = {
  id: number | string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "daily",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/products`,
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date(),
    },
  ];

  try {
    const res = await fetch("https://dummyjson.com/products?limit=100", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return staticRoutes;

    const data = (await res.json()) as { products?: ProductLite[] };
    const products = data.products ?? [];

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${siteUrl}/products/${p.id}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}