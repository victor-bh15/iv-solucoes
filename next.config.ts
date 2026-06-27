import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  // Identificação do projeto no Sentry (org/projeto). Não são segredos.
  org: "iv-solucoes",
  project: "site-iv",

  // Silencia os logs do plugin Sentry no build local; mostra em CI.
  silent: !process.env.CI,

  // Upload de sourcemaps exige SENTRY_AUTH_TOKEN. Sem o token, o plugin
  // apenas pula o upload (não quebra o build). Para symbolicação no Sentry,
  // definir SENTRY_AUTH_TOKEN no ambiente de build.

  // Cobre arquivos client extras na instrumentação de sourcemaps.
  widenClientFileUpload: true,

  // Não enviar telemetria do próprio plugin Sentry.
  telemetry: false,
});
