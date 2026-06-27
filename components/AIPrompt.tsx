"use client";

/**
 * Cartão de IA do hero — micro-interação assinatura: a pergunta é digitada, a
 * IA "pensa" e responde, em loop. Extraído do Hero pra ser reusado no HeroBrain.
 */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";

type Demo = { q: string; a: string };

const DEMOS: Record<"pt" | "en", Demo[]> = {
  pt: [
    { q: "Como a IA pode reduzir meu trabalho manual?", a: "Automatizando tarefas repetitivas e o atendimento." },
    { q: "Vocês criam um sistema sob medida?", a: "Sim — do dashboard ao controle de acesso por perfil." },
    { q: "Quanto tempo para ter um site no ar?", a: "Rápido, responsivo e otimizado para o Google." },
  ],
  en: [
    { q: "How can AI reduce my manual work?", a: "By automating repetitive tasks and support." },
    { q: "Do you build custom systems?", a: "Yes — from dashboards to role-based access." },
    { q: "How long to get a website live?", a: "Fast, responsive and optimized for Google." },
  ],
};

export function AIPrompt() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const demos = DEMOS[lang];

  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(reduce ? 999 : 0);
  const [phase, setPhase] = useState<"typing" | "thinking" | "answer">(reduce ? "answer" : "typing");

  const q = demos[i].q;

  useEffect(() => {
    if (reduce) return;
    let t: number;
    if (phase === "typing") {
      t = window.setTimeout(
        () => (typed < q.length ? setTyped(typed + 1) : setPhase("thinking")),
        typed < q.length ? 38 : 400,
      );
    } else if (phase === "thinking") {
      t = window.setTimeout(() => setPhase("answer"), 900);
    } else {
      t = window.setTimeout(() => {
        setI((v) => (v + 1) % demos.length);
        setTyped(0);
        setPhase("typing");
      }, 2600);
    }
    return () => window.clearTimeout(t);
  }, [phase, typed, i, q.length, reduce, demos.length]);

  const shownQ = reduce ? q : q.slice(0, typed);

  return (
    <div className="ring-gradient w-full max-w-md rounded-2xl border border-border bg-surface/70 p-4 text-left shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-iris/15 text-brand-strong">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="min-h-[1.5rem] text-sm font-medium text-foreground sm:text-base">
          {shownQ}
          {!reduce && phase === "typing" && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-iris align-middle" />
          )}
        </p>
      </div>

      <div className="mt-3 border-t border-border pt-3">
        {phase === "thinking" ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
            </span>
            <span>{lang === "en" ? "Thinking…" : "Pensando…"}</span>
          </div>
        ) : phase === "answer" ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2.5 text-sm text-foreground/90 sm:text-base"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-iris/20 text-brand-strong">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>{demos[i].a}</span>
          </motion.div>
        ) : (
          <div className="h-5" />
        )}
      </div>
    </div>
  );
}
