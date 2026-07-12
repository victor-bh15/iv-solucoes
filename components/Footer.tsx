import Image from "next/image";
import Link from "next/link";
import { DICT, INSTAGRAM_URL, type Lang } from "@/lib/i18n";

/** Rodapé compartilhado por todas as páginas do site. `lang` é sempre propagado
 * pela página (via estado de idioma do Header) — o default "pt" só cobre uso
 * defensivo caso algum caller futuro esqueça de passar a prop. */
export default function Footer({ lang = "pt" }: { lang?: Lang }) {
  const t = DICT[lang];

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-iv flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Image src="/logo-mark.svg" alt="IV Soluções" width={28} height={28} />
          <p className="text-small mt-4 leading-relaxed text-muted">{t.footer.tagline}</p>
        </div>
        <nav className="flex gap-12 text-small">
          <div className="space-y-3">
            <p className="text-small tracking-[0.2em] text-muted uppercase">{t.footer.nav}</p>
            <Link href="/solucoes" className="block text-ink-2 transition-colors hover:text-ink">
              {t.nav.solutions}
            </Link>
            <Link href="/metodo" className="block text-ink-2 transition-colors hover:text-ink">
              {t.nav.method}
            </Link>
            <Link href="/sobre" className="block text-ink-2 transition-colors hover:text-ink">
              {t.nav.about}
            </Link>
            <Link href="/contato" className="block text-ink-2 transition-colors hover:text-ink">
              {t.nav.contact}
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-small tracking-[0.2em] text-muted uppercase">{t.footer.legal}</p>
            <Link href="/privacidade" className="block text-ink-2 transition-colors hover:text-ink">
              {t.footer.privacy}
            </Link>
            <Link href="/seguranca" className="block text-ink-2 transition-colors hover:text-ink">
              {t.nav.seguranca}
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-ink-2 transition-colors hover:text-ink"
            >
              {t.footer.instagram}
            </a>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-iv num py-5 text-small text-muted">
          © {new Date().getFullYear()} IV Soluções. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
