"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fundo do TEMA CLARO — sóbrio e sofisticado. Em vez do 3D (que polui no
 * claro), usa leves auroras de luz da marca derivando devagar + uma grade
 * técnica bem discreta. Tudo com transform/opacity (60fps) e respeitando
 * prefers-reduced-motion.
 */
export function LightBackdrop() {
  const reduce = useReducedMotion();

  const blobs = [
    { c: "bg-navy-300/30", s: "h-[540px] w-[720px]", t: "top-[-16%] left-[4%]", dx: 70, dy: 40, d: 24 },
    { c: "bg-sky-300/25", s: "h-[460px] w-[600px]", t: "top-[22%] right-[-4%]", dx: -60, dy: 55, d: 28 },
    { c: "bg-indigo-300/18", s: "h-[400px] w-[540px]", t: "bottom-[-12%] left-[32%]", dx: 50, dy: -45, d: 32 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Grade técnica discreta com máscara radial (blueprint sutil) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_25%,black,transparent_75%)]" />

      {/* Auroras de luz da marca, derivando lentamente */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${b.c} ${b.s} ${b.t}`}
          animate={reduce ? undefined : { x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.1, 1] }}
          transition={reduce ? undefined : { duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Brilho superior sutil */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(31,58,107,0.06),transparent_60%)]" />
    </div>
  );
}
