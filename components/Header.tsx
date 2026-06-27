"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";
import { useLang } from "@/components/providers/LanguageProvider";
import { whatsappLink } from "@/lib/site";

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueia o scroll do fundo quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/sobre", label: t.nav.about },
    { href: "/servicos", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/blog", label: t.nav.blog },
    { href: "/contato", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Navegação desktop — UPPERCASE com espaçamento (estilo editorial) */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LangToggle />
            <ThemeToggle />
          </div>

          <a
            href={whatsappLink(t.contact.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t.nav.cta}
          </a>

          {/* Botão do menu mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-foreground/5"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink(t.contact.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-gradient mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t.nav.cta}
            </a>
            <div className="flex items-center gap-2 pt-3">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
