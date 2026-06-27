"use client";

import { Globe } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";

export function LangToggle() {
  const { lang, toggleLang, t } = useLang();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.common.langLabel}
      title={t.common.langLabel}
      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span>{lang === "pt" ? "PT" : "EN"}</span>
    </button>
  );
}
