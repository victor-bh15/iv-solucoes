"use client";

import { useEffect, useRef } from "react";

/**
 * Partículas de luz no fundo do hero: as letras ANDAM pela tela e, de tempo em
 * tempo, se JUNTAM e formam "IV SOLUÇÕES" (brilhando), depois dispersam de novo
 * — em ciclo. Cores vivas, brilho additive (2 camadas) e alta resolução.
 * Reage ao mouse (parallax + repulsão). Canvas 2D (leve, sem WebGL).
 * prefers-reduced-motion → marca estática e brilhante (sem rAF).
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = 0;
    let H = 0;
    type P = {
      tx: number; ty: number; // alvo (na letra)
      x: number; y: number;   // posição atual
      vx: number; vy: number; // velocidade (vagar)
      col: string;
      ph: number; amp: number; sp: number; r: number;
    };
    let parts: P[] = [];

    // MESMO ESTILO da abertura: gradiente azul→violeta por posição (vivo) +
    // faíscas claras p/ brilho.
    const GRAD = ["#2563eb", "#3b82f6", "#5b6bff", "#7c5cff", "#9b8cff"];
    const SPARK = ["#a9b2ff", "#e8ecff", "#c4b5fd"];

    const build = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(W));
      off.height = Math.max(1, Math.floor(H));
      const octx = off.getContext("2d")!;
      const fontOf = (px: number) =>
        `800 ${px}px "Space Grotesk", "Inter", system-ui, Arial, sans-serif`;

      const cxp = W / 2;
      const cyText = H * 0.4; // centro da marca na PARTE DE CIMA (longe do cartão do chat)
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      const drawText = (size: number) => {
        octx.clearRect(0, 0, off.width, off.height);
        octx.font = fontOf(size);
        octx.fillStyle = "#fff";
        octx.fillText("IV", cxp, cyText - size * 0.575);
        octx.fillText("SOLUÇÕES", cxp, cyText + size * 0.575);
      };

      // tamanho inicial: cabe na LARGURA (com margem lateral)
      let fs = Math.floor(W * 0.3);
      octx.font = fontOf(fs);
      while (octx.measureText("SOLUÇÕES").width > W * 0.74 && fs > 14) {
        fs -= 2;
        octx.font = fontOf(fs);
      }

      // à prova de corte: desenha, MEDE a caixa real (alpha) e ENCOLHE até caber
      // com margem em cima e embaixo — em qualquer proporção de tela.
      const pad = Math.max(8, Math.round(H * 0.06));
      let data = octx.getImageData(0, 0, off.width, off.height).data;
      for (let attempt = 0; attempt < 7; attempt++) {
        drawText(fs);
        data = octx.getImageData(0, 0, off.width, off.height).data;
        let minY = H;
        let maxY = 0;
        for (let y = 0; y < H; y += 2) {
          let hit = false;
          for (let x = 0; x < W; x += 4) {
            if (data[(y * off.width + x) * 4 + 3] > 128) { hit = true; break; }
          }
          if (hit) { if (y < minY) minY = y; if (y > maxY) maxY = y; }
        }
        // cabe com margem em cima E acima do cartão do chat (limite ~0.66·H)
        if (minY >= pad && maxY <= H * 0.66) break;
        fs = Math.floor(fs * 0.88);
        if (fs < 14) break;
      }

      const gap = Math.max(2, Math.round(fs / 48)); // grade fina = alta resolução
      parts = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            const u = x / W; // gradiente esq→dir, como na abertura
            const col =
              Math.random() < 0.09
                ? SPARK[Math.floor(Math.random() * SPARK.length)]
                : GRAD[Math.min(GRAD.length - 1, Math.floor(u * GRAD.length + Math.random() * 0.6))];
            parts.push({
              tx: x, ty: y, x, y,
              vx: (Math.random() - 0.5) * 0.7,
              vy: (Math.random() - 0.5) * 0.7,
              col,
              ph: Math.random() * Math.PI * 2,
              amp: 0.6 + Math.random() * 1.8,
              sp: 0.0006 + Math.random() * 0.0014,
              r: 0.9 + Math.random() * 0.5,
            });
            if (parts.length >= 2600) break;
          }
        }
        if (parts.length >= 2600) break;
      }
    };

    build();

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const mouse = { x: -9999, y: -9999, active: false };

    const onMove = (e: PointerEvent) => {
      const rct = canvas.getBoundingClientRect();
      const mx = e.clientX - rct.left;
      const my = e.clientY - rct.top;
      mouse.x = mx;
      mouse.y = my;
      mouse.active = mx >= 0 && my >= 0 && mx <= rct.width && my <= rct.height;
      target.x = (mx / rct.width - 0.5) * 2;
      target.y = (my / rct.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      mouse.active = false;
    };

    // desenha 1 partícula: núcleo NÍTIDO (pixel cravado) + glow apertado discreto
    const glow = (x: number, y: number, r: number, col: string, a: number) => {
      const rx = Math.round(x);
      const ry = Math.round(y);
      ctx.globalAlpha = a * 0.14;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(rx, ry, r * 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = a * 0.9;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    };

    if (reduce) {
      const drawStatic = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = "lighter";
        for (const p of parts) glow(p.tx, p.ty, p.r, p.col, 0.95);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      };
      drawStatic();
      const onResize = () => { build(); drawStatic(); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // ── ciclo: vagar → formar → segurar → dispersar → (repete) ──
    const DUR = { wander: 5200, form: 1700, hold: 3800, disperse: 1500 };
    const CYCLE = DUR.wander + DUR.form + DUR.hold + DUR.disperse;
    const AMP = 14;
    let raf = 0;
    let running = true;
    let t0 = 0;
    let lastPhase = "";

    const draw = (now: number) => {
      if (!running) return;
      if (!t0) t0 = now;
      const t = (now - t0) % CYCLE;
      let phase: "wander" | "form" | "hold" | "disperse";
      if (t < DUR.wander) phase = "wander";
      else if (t < DUR.wander + DUR.form) phase = "form";
      else if (t < DUR.wander + DUR.form + DUR.hold) phase = "hold";
      else phase = "disperse";

      if (phase !== lastPhase) {
        if (phase === "disperse") {
          for (const p of parts) {
            const a = Math.random() * Math.PI * 2;
            const s = 1.6 + Math.random() * 2.6;
            p.vx = Math.cos(a) * s;
            p.vy = Math.sin(a) * s;
          }
        }
        lastPhase = phase;
      }

      const formLocal = phase === "form" ? (t - DUR.wander) / DUR.form : 0;
      const ease = 1 - Math.pow(1 - formLocal, 3);

      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      const ox = -cur.x * AMP;
      const oy = -cur.y * AMP;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const p of parts) {
        if (phase === "wander" || phase === "disperse") {
          p.x += p.vx;
          p.y += p.vy;
          // quica nas bordas (andam pela tela sem sair)
          if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
          else if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx); }
          if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
          else if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy); }
          p.vx *= 0.992;
          p.vy *= 0.992;
          // mantém um mínimo de movimento durante o vagar
          if (phase === "wander") {
            p.vx += (Math.random() - 0.5) * 0.03;
            p.vy += (Math.random() - 0.5) * 0.03;
          }
        } else if (phase === "form") {
          const k = 0.04 + ease * 0.16;
          p.x += (p.tx - p.x) * k;
          p.y += (p.ty - p.y) * k;
        } else {
          // hold: CRAVADO no alvo (sem oscilar) → nítido, sem tremer
          p.x = p.tx;
          p.y = p.ty;
        }

        let x = p.x + ox;
        let y = p.y + oy;

        // repulsão pelo cursor (em qualquer fase)
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = (1 - d / 110) * 28;
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
        }

        // no hold a opacidade é constante (imagem estável/nítida); em movimento, cintila
        const a =
          phase === "hold" ? 0.95 : 0.55 + 0.4 * Math.sin(p.ph + now * 0.004);
        glow(x, y, p.r, p.col, a);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => build();
    let onScreen = true;
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const resume = () => {
      if (running || !onScreen || document.hidden) return;
      running = true;
      t0 = 0;
      raf = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      if (document.hidden) pause();
      else resume();
    };

    // pausa a animação quando o hero sai da viewport (não gasta CPU ao rolar)
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) resume();
        else pause();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-[40%] h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(91,107,255,0.22),rgba(124,92,255,0.06)_55%,transparent_72%)] blur-2xl" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
