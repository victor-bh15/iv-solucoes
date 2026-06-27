// Sentry — instrumentação do SERVIDOR (runtime Node.js).
// Carregado pelo `register()` em `instrumentation.ts` quando
// NEXT_RUNTIME === "nodejs". A rota /api/chat roda em nodejs.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
  // LGPD: não capturar IP/headers/cookies/corpo da requisição.
  sendDefaultPii: false,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});
