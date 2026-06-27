// Sentry — instrumentação do runtime EDGE.
// Hoje nenhuma rota usa runtime "edge" (a /api/chat é "nodejs"), mas o
// middleware e o roteamento do Next podem executar no edge. Manter este
// config é barato e correto; carregado quando NEXT_RUNTIME === "edge".
// Obs.: o cutover para Cloudflare/OpenNext NÃO suporta runtime "edge" —
// se algum dia uma rota virar "edge", revisar o CUTOVER-CLOUDFLARE.md.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
  sendDefaultPii: false,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});
