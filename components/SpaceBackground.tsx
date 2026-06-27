"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/providers/ThemeProvider";
import { LightBackdrop } from "@/components/LightBackdrop";

/**
 * Fundo GLOBAL do site (atrás de tudo). No tema escuro, as FORMAS de partículas
 * (cérebro → chip) flutuam e morfam, sobre um véu leve que garante a legibilidade
 * do conteúdo. Tema claro: backdrop sóbrio dedicado.
 *
 * PERFORMANCE: o fundo 3D (pesado) só MONTA depois que a abertura (IntroSplash)
 * termina — assim a entrada 3D carrega sozinha (sem disputar GPU), bem mais
 * rápido no mobile. Fallback de 9s caso a classe do splash não some.
 */
const BrainField = dynamic(
  () => import("@/components/BrainField").then((m) => m.BrainField),
  { ssr: false },
);

export function SpaceBackground() {
  const { theme } = useTheme();
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const aberturaAcabou = () =>
      !document.documentElement.classList.contains("iv-splash-active");
    if (aberturaAcabou()) {
      setPronto(true);
      return;
    }
    const id = window.setInterval(() => {
      if (aberturaAcabou()) {
        setPronto(true);
        window.clearInterval(id);
      }
    }, 300);
    const fallback = window.setTimeout(() => {
      setPronto(true);
      window.clearInterval(id);
    }, 9000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(fallback);
    };
  }, []);

  if (theme === "light") return <LightBackdrop />;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* formas de partículas — montadas só após a abertura (perf no mobile) */}
      {pronto && <BrainField />}

      {/* véu p/ legibilidade do conteúdo por cima (não apaga as formas) */}
      <div className="absolute inset-0 bg-background/35" />
    </div>
  );
}
