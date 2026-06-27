"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLang } from "@/components/providers/LanguageProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const label = theme === "dark" ? t.common.themeLight : t.common.themeDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      <Sun className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-5 w-5 dark:block" aria-hidden="true" />
    </button>
  );
}
