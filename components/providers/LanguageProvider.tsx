"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dict, type Lang, type Dict } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Começa SEMPRE em PT — idêntico ao HTML renderizado no servidor. Ler o
  // localStorage aqui (no 1º render do cliente) causaria mismatch de hidratação
  // de TEXTO para quem salvou EN (o servidor manda PT, o cliente hidrataria EN).
  // O idioma salvo é aplicado logo depois, no effect abaixo — e, num refresh, a
  // abertura (#iv-splash) cobre a tela nesse instante, então a troca PT→EN é
  // imperceptível. Nas navegações SPA o provider não remonta, então o idioma
  // escolhido permanece.
  const [lang, setLangState] = useState<Lang>("pt");

  // Após hidratar, aplica o idioma salvo no navegador (uma vez).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("iv-lang");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza uma vez com o localStorage (sistema externo, só no cliente)
      if (saved === "en") setLangState("en");
    } catch {
      // ignora
    }
  }, []);

  // Mantém o atributo lang do <html> em sincronia com o idioma escolhido.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    try {
      localStorage.setItem("iv-lang", next);
    } catch {
      // ignora
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "pt" ? "en" : "pt";
      document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
      try {
        localStorage.setItem("iv-lang", next);
      } catch {
        // ignora
      }
      return next;
    });
  }, []);

  // Memoiza o value (e o dicionário): só muda quando o idioma muda de fato —
  // evita re-render desnecessário de todos os consumidores de `t`.
  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: dict[lang] }),
    [lang, setLang, toggleLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang deve ser usado dentro de <LanguageProvider>");
  return ctx;
}
