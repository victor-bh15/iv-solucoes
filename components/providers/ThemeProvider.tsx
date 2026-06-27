"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Inicializador "lazy": a FONTE DA VERDADE é o localStorage (não o DOM). O
  // <html> tem className controlado pelo React; o script anti-flash (layout.tsx)
  // adiciona .dark antes da pintura, mas a reconciliação do React pode descartar
  // essa classe — então ler o DOM aqui levaria a um falso "claro". Lemos a
  // preferência salva (padrão: escuro) e DEPOIS impomos no DOM via efeito abaixo.
  // O site inicia SEMPRE no escuro (ignora preferência salva no carregamento).
  const [theme, setTheme] = useState<Theme>("dark");

  // IMPÕE o tema no <html> sempre que mudar (e no mount). Isso reaplica .dark
  // caso a hidratação do React tenha removido a classe posta pelo bootScript,
  // eliminando o flash escuro→claro que deixava o site claro após assentar.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Usa o estado anterior para alternar — assim a referência da função fica
  // estável (não muda a cada troca de tema) e não dispara re-render em cascata.
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("iv-theme", next);
      } catch {
        // ignora
      }
      return next;
    });
  }, []);

  // Memoiza o value: só muda quando o tema muda de fato — evita re-render de
  // toda a árvore (inclusive a cena 3D) por nova referência de objeto.
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  return ctx;
}
