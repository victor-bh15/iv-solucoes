// Sentry — instrumentação do SERVIDOR (Next.js 16).
// `register()` é chamado UMA vez na subida de cada instância do servidor.
// Selecionamos o config certo por runtime via NEXT_RUNTIME (ver doc
// `node_modules/next/dist/docs/.../instrumentation.md`).
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Captura erros de renderização/route handlers no servidor e os envia ao
// Sentry. `onRequestError` foi estabilizado no Next 15 e é o hook oficial.
export const onRequestError = Sentry.captureRequestError;
