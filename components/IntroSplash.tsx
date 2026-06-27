"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const IntroIV3D = dynamic(() => import("@/components/IntroIV3D").then((m) => m.IntroIV3D), {
  ssr: false,
});

/**
 * Abertura do site (preloader) — linguagem visual "Dala", versão IV Soluções:
 *  - tela preta absoluta;
 *  - as LUZES (partículas azul→violeta) voam e FORMAM a marca "IV Soluções",
 *    seguram um instante e dispersam, revelando o site;
 *  - "LOADING." no canto superior esquerdo;
 *  - contador 0 → 100 no canto inferior direito (vira "COMPLETED" no fim);
 *  - tagline "Seu negócio, muito mais inteligente." abaixo da marca.
 *
 * SSR-safe: o overlay (#iv-splash) é renderizado no HTML do servidor e mostrado
 * pelo CSS já no primeiro paint (ver globals.css + script inline no layout que
 * liga a trava de scroll antes da pintura). Assim, ao abrir OU atualizar, nunca
 * se vê o conteúdo "antes da intro". O canvas só anima depois de montar no
 * cliente. A navegação client-side entre rotas NÃO remonta o componente (vive no
 * layout raiz), então a intro só toca em recarregamentos de verdade.
 */
export function IntroSplash() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [reduceUI, setReduceUI] = useState(false);
  // Liga a dispersão das partículas 3D quando a abertura vai fechar.
  const dispersingRef = useRef(false);

  // Contador 0 → 100 + fechamento
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let removeTimer: number | undefined;
    let raf = 0;

    const close = () => {
      if (root.classList.contains("iv-splash-done")) return;
      setDone(true);
      setProgress(100);
      dispersingRef.current = true; // manda as luzes dispersarem
      root.classList.add("iv-splash-done");
      removeTimer = window.setTimeout(
        () => {
          root.classList.remove("iv-splash-active");
          setMounted(false);
        },
        reduce ? 260 : 760,
      );
    };

    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- caminho sem movimento (matchMedia), decidido só no cliente
      setReduceUI(true);
      setProgress(100);
      const t = window.setTimeout(close, 700);
      return () => {
        window.clearTimeout(t);
        if (removeTimer) window.clearTimeout(removeTimer);
      };
    }

    const total = 4500; // 0→100 durante o espalhado (3s) + a junção (1,5s)
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - p, 2.2); // ease-out (não robótico)
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // segura a marca formada bem mais tempo na tela antes de revelar o site
        window.setTimeout(close, 3800);
      }
    };
    raf = requestAnimationFrame(tick);

    const onKey = () => close();
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      if (removeTimer) window.clearTimeout(removeTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="iv-splash"
      role="presentation"
      onClick={() => {
        dispersingRef.current = true;
        document.documentElement.classList.add("iv-splash-done");
      }}
    >
      {/* Abertura 3D: partículas se juntam formando "IV Soluções" */}
      {!reduceUI && (
        <div className="pointer-events-none absolute inset-0">
          <IntroIV3D dispersingRef={dispersingRef} />
        </div>
      )}

      {/* Fallback estático (prefers-reduced-motion): marca em texto */}
      {reduceUI && (
        <span className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          IV <span className="text-[--color-iris]">Soluções</span>
        </span>
      )}

      {/* LOADING. (canto superior esquerdo) */}
      <span className="absolute left-5 top-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white sm:left-7 sm:top-7">
        {done ? "COMPLETED" : "LOADING."}
      </span>

      {/* Contador 0 → 100 (canto inferior direito) */}
      <span className="absolute bottom-5 right-5 font-display text-3xl font-bold tabular-nums text-white/70 sm:bottom-7 sm:right-7 sm:text-4xl">
        {progress}
      </span>

      {/* Tagline abaixo da marca */}
      <p className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 text-center text-sm font-medium tracking-tight text-white/80 sm:text-base">
        Seu negócio, muito mais inteligente.
      </p>
    </div>
  );
}
