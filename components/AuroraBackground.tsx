"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fundo futurista animado: grade técnica + "auroras" de luz que derivam
 * lentamente + partículas flutuantes. Usa só transform/opacity (60fps) e
 * desliga o movimento quando o usuário pede prefers-reduced-motion.
 */
export function AuroraBackground({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "subtle";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isHero = variant === "hero";

  // Posições/tamanhos das auroras (blobs de luz desfocados)
  const blobs = isHero
    ? [
        { c: "bg-electric/25 dark:bg-electric/20", s: "h-[460px] w-[620px]", t: "top-[-12%] left-[8%]", dx: 60, dy: 40, d: 16 },
        { c: "bg-iris/20 dark:bg-iris/20", s: "h-[380px] w-[520px]", t: "top-[20%] right-[2%]", dx: -50, dy: 50, d: 20 },
        { c: "bg-violet/15 dark:bg-violet/18", s: "h-[300px] w-[420px]", t: "bottom-[-10%] left-[30%]", dx: 40, dy: -40, d: 24 },
      ]
    : [
        { c: "bg-iris/18 dark:bg-iris/16", s: "h-[320px] w-[460px]", t: "top-[-20%] right-[10%]", dx: -40, dy: 30, d: 22 },
        { c: "bg-violet/12 dark:bg-violet/14", s: "h-[260px] w-[360px]", t: "bottom-[-25%] left-[5%]", dx: 40, dy: -30, d: 26 },
      ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Grade técnica com máscara radial. A máscara fecha com um degradê suave
          (parada intermediária) para que NENHUMA linha da grade apareça como
          um traço horizontal nítido na borda — antes, no tema escuro, a última
          linha visível virava uma "linha atravessando a tela". */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black_30%,transparent_85%)] dark:opacity-40" />

      {/* Auroras de luz */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${b.c} ${b.s} ${b.t}`}
          animate={
            reduce
              ? undefined
              : { x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.12, 1] }
          }
          transition={
            reduce
              ? undefined
              : { duration: b.d, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* Partículas flutuantes (só no hero, e só com movimento permitido) */}
      {isHero && !reduce && (
        <div className="absolute inset-0">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-brand/50"
              style={{ left: p.left, top: p.top }}
              animate={{ y: [0, -22, 0], opacity: [0.15, 0.7, 0.15] }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Posições fixas (determinísticas) para as partículas — evita Math.random no SSR
const PARTICLES = [
  { left: "12%", top: "30%", dur: 7, delay: 0 },
  { left: "24%", top: "65%", dur: 9, delay: 1.2 },
  { left: "40%", top: "20%", dur: 8, delay: 0.6 },
  { left: "55%", top: "55%", dur: 10, delay: 1.8 },
  { left: "68%", top: "28%", dur: 7.5, delay: 0.3 },
  { left: "80%", top: "60%", dur: 9.5, delay: 2.1 },
  { left: "88%", top: "38%", dur: 8.5, delay: 1 },
  { left: "33%", top: "78%", dur: 11, delay: 0.9 },
];
