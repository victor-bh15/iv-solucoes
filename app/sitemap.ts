import type { MetadataRoute } from "next";
import { DICT } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ivsolucoes.com.br";
  const solutionRoutes: MetadataRoute.Sitemap = DICT.pt.solutions.items.map((item) => ({
    url: `${base}/solucoes/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/solucoes`, changeFrequency: "monthly", priority: 0.8 },
    ...solutionRoutes,
    { url: `${base}/metodo`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/sobre`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/seguranca`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contato`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${base}/privacidade/villas-park`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
