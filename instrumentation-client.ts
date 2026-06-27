// Sentry — instrumentação do CLIENTE (browser).
// No Next.js 16 este arquivo substitui o antigo `sentry.client.config.ts`.
// Roda DEPOIS do HTML carregar e ANTES da hidratação do React (ver doc
// `node_modules/next/dist/docs/.../instrumentation-client.md`).
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Sem amostragem de performance por padrão: site institucional, mantém o
  // volume baixo (free tier) e evita custo. Ajustar se quisermos tracing.
  tracesSampleRate: 0,

  // LGPD: NÃO enviar PII (IP, headers, cookies, corpo de request).
  sendDefaultPii: false,

  // Liga o Sentry só quando há DSN configurado (evita ruído em dev/local).
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});

// Instrumenta o início das transições de navegação do App Router.
// Disponível no SDK a partir da v9.12.0.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
