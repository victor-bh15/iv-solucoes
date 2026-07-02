"use client";

import Link from "next/link";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useLang } from "@/components/providers/LanguageProvider";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { href: "/sobre", label: t.nav.about },
    { href: "/servicos", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/blog", label: t.nav.blog },
    { href: "/contato", label: t.nav.contact },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface dark:border-white/5 dark:bg-surface/70 dark:backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.5fr]">
          {/* Marca + tagline */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappLink(t.contact.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {site.whatsappDisplay}
                </a>
              </li>
              {site.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {email}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Clock className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {t.contact.hoursValue}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacidade"
              className="transition-colors hover:text-foreground"
            >
              Política de Privacidade
            </Link>
            <p>{t.footer.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
