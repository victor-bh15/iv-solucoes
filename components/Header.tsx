"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DICT, type Lang, whatsappLink } from "@/lib/i18n";

/** Header com nav por intenção (Soluções / Método / Sobre / Contato) + toggle PT/EN.
 * Auto-contido: lê/grava o idioma em localStorage e avisa a página via onLangChange
 * (Home usa isso para trocar o próprio conteúdo bilíngue).
 * Abaixo de `sm` (640px), a nav vira um drawer (hambúrguer) com os mesmos 4 links
 * + CTA de WhatsApp — trava o scroll do body, fecha no Esc/clique fora e devolve
 * o foco ao botão que abriu. */
export default function Header({ onLangChange }: { onLangChange?: (lang: Lang) => void }) {
  const [lang, setLang] = useState<Lang>("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = DICT[lang];
  const waUrl = whatsappLink(t.contact.defaultMessage);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("iv-lang");
    if (saved === "en") {
      setLang("en");
      onLangChange?.("en");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();

      function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") setMenuOpen(false);
      }
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        document.removeEventListener("keydown", onKeyDown);
      };
    }
    if (wasOpenRef.current) {
      toggleBtnRef.current?.focus();
    }
  }, [menuOpen]);

  function toggleLang() {
    const next: Lang = lang === "pt" ? "en" : "pt";
    setLang(next);
    window.localStorage.setItem("iv-lang", next);
    document.documentElement.lang = next === "en" ? "en" : "pt-BR";
    onLangChange?.(next);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-sm">
      <nav className="container-iv flex items-center justify-between py-4">
        <Link href="/" aria-label="IV Soluções — início" className="flex items-center gap-2">
          <Image src="/logo-mark.svg" alt="IV Soluções" width={32} height={32} priority />
        </Link>

        <div className="flex items-center gap-6 text-small sm:gap-8">
          <Link href="/solucoes" className="hidden text-ink-2 transition-colors hover:text-ink sm:block">
            {t.nav.solutions}
          </Link>
          <Link href="/metodo" className="hidden text-ink-2 transition-colors hover:text-ink sm:block">
            {t.nav.method}
          </Link>
          <Link href="/sobre" className="hidden text-ink-2 transition-colors hover:text-ink sm:block">
            {t.nav.about}
          </Link>
          <Link href="/contato" className="tap-44 text-ink-2 transition-colors hover:text-ink">
            {t.nav.contact}
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-iv-azul px-4 py-1.5 text-small text-white transition-colors hover:bg-iv-azul-strong md:block"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
            className="tap-44 num text-small tracking-wider text-muted transition-colors hover:text-ink"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>

          {/* Hambúrguer — só abaixo de `sm`, abre o drawer com a nav completa */}
          <button
            type="button"
            ref={toggleBtnRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={
              menuOpen
                ? lang === "pt"
                  ? "Fechar menu"
                  : "Close menu"
                : lang === "pt"
                  ? "Abrir menu"
                  : "Open menu"
            }
            className="flex h-11 w-11 items-center justify-center text-ink-2 transition-colors hover:text-ink sm:hidden"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Backdrop do drawer — clique fora fecha */}
      <div
        className={`iv-drawer-backdrop sm:hidden ${menuOpen ? "iv-drawer-backdrop--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Painel do drawer */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={lang === "pt" ? "Menu" : "Menu"}
        tabIndex={-1}
        inert={!menuOpen}
        className={`iv-drawer-panel sm:hidden ${menuOpen ? "iv-drawer-panel--open" : ""}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="text-small tracking-[0.2em] text-muted uppercase">Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label={lang === "pt" ? "Fechar menu" : "Close menu"}
            className="flex h-11 w-11 items-center justify-center text-ink-2 transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          <Link
            href="/solucoes"
            onClick={closeMenu}
            className="rounded-sm px-3 py-3 text-body text-ink-2 transition-colors hover:bg-bg-subtle hover:text-ink"
          >
            {t.nav.solutions}
          </Link>
          <Link
            href="/metodo"
            onClick={closeMenu}
            className="rounded-sm px-3 py-3 text-body text-ink-2 transition-colors hover:bg-bg-subtle hover:text-ink"
          >
            {t.nav.method}
          </Link>
          <Link
            href="/sobre"
            onClick={closeMenu}
            className="rounded-sm px-3 py-3 text-body text-ink-2 transition-colors hover:bg-bg-subtle hover:text-ink"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contato"
            onClick={closeMenu}
            className="rounded-sm px-3 py-3 text-body text-ink-2 transition-colors hover:bg-bg-subtle hover:text-ink"
          >
            {t.nav.contact}
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-3 rounded-sm bg-iv-azul px-4 py-3 text-center text-body text-white transition-colors hover:bg-iv-azul-strong"
          >
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
