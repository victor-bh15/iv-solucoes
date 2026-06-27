"use client";

import { useEffect, useRef } from "react";

/**
 * Orbs de luz (azul→violeta) do fundo GLOBAL, no espírito Dala.
 *
 * Cada orb flutua sozinho (keyframe CSS na camada interna) e, por cima, a camada
 * externa recebe PARALLAX + REPULSÃO do mouse via transform (translate3d) — só
 * composição na GPU, zero repaint/layout. Um único loop rAF faz lerp suave do
 * estado atual → alvo, então o movimento "persegue" o cursor com inércia.
 *
 * Performance: 6 orbs grandes e borrados (baratos de compor), listener passivo,
 * loop pausa com a aba oculta. Sem mouse (touch) só sobra a flutuação CSS.
 * prefers-reduced-motion: orbs estáticos, sem rAF e sem seguir o mouse.
 */

type Orb = {
  /** posição base em % da viewport */
  x: number;
  y: number;
  /** tamanho em px */
  size: number;
  /** profundidade do parallax (0–1): maior = se mexe mais com o mouse */
  depth: number;
  /** cor central (rgb) */
  color: string;
  /** opacidade do brilho */
  alpha: number;
  /** parâmetros da flutuação própria */
  floatDur: number;
  floatDelay: number;
};

const ORBS: Orb[] = [
  { x: 18, y: 22, size: 520, depth: 0.18, color: "37,99,235", alpha: 0.22, floatDur: 19, floatDelay: 0 },
  { x: 78, y: 18, size: 440, depth: 0.34, color: "124,92,255", alpha: 0.2, floatDur: 23, floatDelay: -4 },
  { x: 62, y: 64, size: 600, depth: 0.12, color: "91,107,255", alpha: 0.18, floatDur: 27, floatDelay: -9 },
  { x: 30, y: 78, size: 380, depth: 0.42, color: "124,92,255", alpha: 0.16, floatDur: 21, floatDelay: -14 },
  { x: 88, y: 70, size: 320, depth: 0.5, color: "37,99,235", alpha: 0.16, floatDur: 17, floatDelay: -6 },
  { x: 48, y: 36, size: 300, depth: 0.6, color: "91,107,255", alpha: 0.14, floatDur: 15, floatDelay: -11 },
];

export function InteractiveOrbs() {
  const layerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // orbs ficam estáticos (só o CSS de posição/flutuação parada)

    const els = orbRefs.current;
    // alvo (para onde o mouse empurra) e atual (lerp) — em px
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    // posição do cursor em px (para a repulsão por orb)
    const mouse = { x: -9999, y: -9999, active: false };

    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // -1..1 a partir do centro
      target.x = (e.clientX / w - 0.5) * 2;
      target.y = (e.clientY / h - 0.5) * 2;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      mouse.active = false;
    };

    const AMP = 46; // amplitude máx. do parallax em px
    const REPEL_R = 240; // raio de repulsão em px
    const REPEL_F = 34; // força de repulsão em px

    const tick = () => {
      if (!running) return;
      // inércia: aproxima o atual do alvo
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      const w = window.innerWidth;
      const h = window.innerHeight;

      for (let i = 0; i < ORBS.length; i++) {
        const el = els[i];
        if (!el) continue;
        const o = ORBS[i];

        // parallax: orbs mais "fundos" (depth alto) se deslocam mais
        let tx = -cur.x * AMP * o.depth;
        let ty = -cur.y * AMP * o.depth;

        // repulsão local: empurra o orb para longe do cursor quando perto
        if (mouse.active) {
          const ox = (o.x / 100) * w;
          const oy = (o.y / 100) * h;
          const dx = ox - mouse.x;
          const dy = oy - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_R && dist > 0.01) {
            const push = (1 - dist / REPEL_R) * REPEL_F;
            tx += (dx / dist) * push;
            ty += (dy / dist) * push;
          }
        }

        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="absolute inset-0">
      {ORBS.map((o, i) => (
        <div
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          className="absolute will-change-transform"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.size,
            height: o.size,
            marginLeft: -o.size / 2,
            marginTop: -o.size / 2,
          }}
        >
          {/* camada interna: flutuação própria (some no reduced-motion via globals.css) */}
          <div
            className="orb-float h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(${o.color},${o.alpha}), rgba(${o.color},${o.alpha * 0.35}) 42%, transparent 70%)`,
              filter: "blur(56px)",
              animationDuration: `${o.floatDur}s`,
              animationDelay: `${o.floatDelay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
