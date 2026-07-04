import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ivsolucoes.com.br";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${base}/privacidade/villas-park`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
