import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Apenas rotas indexáveis. /blog está noindex (em construção), por isso fica
  // de fora até o lançamento do conteúdo.
  const routes = [
    "",
    "/sobre",
    "/servicos",
    "/portfolio",
    "/contato",
    "/privacidade",
  ];
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/privacidade" ? 0.3 : 0.8,
  }));
}
