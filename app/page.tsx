"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HorizonHero from "@/components/HorizonHero";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import {
  DICT,
  type Lang,
  whatsappLink,
  WHATSAPP_DISPLAY,
  EMAIL,
  INSTAGRAM_URL,
} from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];

  // idioma persistido; <html lang> acompanha
  useEffect(() => {
    const saved = window.localStorage.getItem("iv-lang");
    if (saved === "en") setLang("en");
  }, []);
  useEffect(() => {
    window.localStorage.setItem("iv-lang", lang);
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  const waUrl = whatsappLink(t.contact.defaultMessage);

  return (
    <main className="relative">
      {/* Cena do amanhecer — fundo vivo */}
      <HorizonHero />

      {/* Navegação */}
      <header className="fixed inset-x-0 top-0 z-30">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" aria-label="IV Soluções — início">
            <Image src="/logo-iv.png" alt="IV Soluções" width={44} height={42} priority />
          </a>
          <div className="flex items-center gap-4 text-sm text-white/70 sm:gap-7">
            <a href="#servicos" className="hidden transition-colors hover:text-white sm:block">
              {t.nav.services}
            </a>
            <a href="#projetos" className="transition-colors hover:text-white">
              {t.nav.projects}
            </a>
            <a href="#sobre" className="hidden transition-colors hover:text-white sm:block">
              {t.nav.about}
            </a>
            <a
              href="#contato"
              className="rounded-sm border border-white/25 px-4 py-1.5 text-white/90 transition-colors hover:border-iv-mist hover:text-white"
            >
              {t.nav.contact}
            </a>
            {/* Toggle de idioma */}
            <button
              type="button"
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
              className="text-xs tracking-wider text-white/55 tabular-nums transition-colors hover:text-white"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex h-svh flex-col items-center justify-center px-6 text-center">
        <Image
          src="/logo-iv.png"
          alt=""
          width={132}
          height={127}
          priority
          className="iv-rise mb-10"
          style={{ animationDelay: "0.1s" }}
        />
        <h1
          className="iv-rise max-w-3xl text-4xl font-light tracking-tight text-white sm:text-6xl"
          style={{ animationDelay: "0.3s" }}
        >
          {t.hero.title1}
          <br />
          <span className="text-iv-mist">{t.hero.title2}</span>
        </h1>
        <p
          className="iv-rise mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          style={{ animationDelay: "0.5s" }}
        >
          {t.hero.subtitle}
        </p>
        <div
          className="iv-rise mt-10 flex items-center gap-4"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#contato"
            className="rounded-sm border border-iv-mist/60 px-6 py-2.5 text-sm text-white transition-colors hover:border-iv-mist hover:bg-iv-navy/40"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#projetos"
            className="px-2 py-2.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div
          className="iv-rise absolute bottom-8 flex flex-col items-center gap-2 text-white/55"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-xs tracking-[0.25em] uppercase">{t.hero.explore}</span>
          <span className="iv-drift block h-6 w-px bg-white/40" />
        </div>
      </section>

      {/* CONTEÚDO — painel escuro sólido sobre a cena */}
      <div className="relative z-10 bg-linear-to-b from-transparent via-iv-deep/95 via-10% to-iv-deep to-15%">
        {/* SERVIÇOS */}
        <section id="servicos" className="mx-auto max-w-6xl scroll-mt-20 px-6 pt-40 pb-28">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-iv-mist uppercase">
              {t.services.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-tight text-white sm:text-4xl">
              {t.services.title}
            </h2>
            <p className="mt-4 max-w-xl text-white/55">{t.services.subtitle}</p>
          </Reveal>
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
            {t.services.items.map((s, i) => (
              <div key={s.title} className="bg-iv-panel p-8">
                <Reveal delay={i * 120}>
                  <span className="text-xs text-iv-mist tabular-nums">0{i + 1}</span>
                  <h3 className="mt-3 text-xl text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                    {s.bullets.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-white/70">
                        <span className="text-iv-mist">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-iv-mist uppercase">
              {t.projects.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-tight text-white sm:text-4xl">
              {t.projects.title}
            </h2>
            <p className="mt-4 max-w-xl text-white/55">{t.projects.subtitle}</p>
          </Reveal>
          <div className="mt-14 space-y-px border border-white/10 bg-white/10">
            {t.projects.items.map((p, i) => (
              <article key={p.title} className="bg-iv-panel p-8 sm:p-10">
                <Reveal delay={i * 100}>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-xs tracking-[0.2em] text-iv-mist uppercase">
                        {p.category}
                      </p>
                      <h3 className="mt-2 text-xl text-white sm:text-2xl">{p.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
                    </div>
                    <ul className="flex shrink-0 flex-wrap gap-2 sm:max-w-45 sm:justify-end">
                      {p.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-sm border border-white/15 px-2.5 py-1 text-xs text-white/60"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <div className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs tracking-[0.25em] text-iv-mist uppercase">
                {t.about.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
                {t.about.title}
              </h2>
              <p className="mt-6 leading-relaxed text-white/60">{t.about.p1}</p>
              <p className="mt-4 leading-relaxed text-white/60">{t.about.p2}</p>
              <p className="mt-8 border-l border-iv-mist/50 pl-4 text-sm text-white/50">
                {t.about.founders} <span className="text-white/80">Victor Guilherme</span>{" "}
                {lang === "pt" ? "e" : "and"}{" "}
                <span className="text-white/80">Inamar Miranda</span> {t.about.foundersTail}
              </p>
            </Reveal>
            <div className="space-y-px self-center border border-white/10 bg-white/10">
              {t.about.values.map((v, i) => (
                <div key={v.title} className="bg-iv-panel p-7">
                  <Reveal delay={i * 120}>
                    <h3 className="text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{v.desc}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CONTATO — a cena reaparece: olhar para o horizonte antes da conversa */}
      <section
        id="contato"
        className="relative z-10 flex min-h-[80svh] scroll-mt-20 items-center bg-linear-to-b from-iv-deep via-transparent via-40% to-transparent"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-iv-mist uppercase">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-tight text-white sm:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mt-5 max-w-xl text-white/60">{t.contact.subtitle}</p>
            <div className="mt-12 grid max-w-3xl gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-iv-deep/80 p-6 backdrop-blur-sm transition-colors hover:bg-iv-navy/50"
              >
                <p className="text-xs tracking-[0.2em] text-iv-mist uppercase">
                  {t.contact.whatsapp}
                </p>
                <p className="mt-2 text-white tabular-nums group-hover:underline">
                  {WHATSAPP_DISPLAY}
                </p>
                <p className="mt-1 text-xs text-white/55">{t.contact.whatsappNote}</p>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group bg-iv-deep/80 p-6 backdrop-blur-sm transition-colors hover:bg-iv-navy/50"
              >
                <p className="text-xs tracking-[0.2em] text-iv-mist uppercase">
                  {t.contact.email}
                </p>
                <p className="mt-2 break-all text-white group-hover:underline">{EMAIL}</p>
                <p className="mt-1 text-xs text-white/55">{t.contact.emailNote}</p>
              </a>
              <div className="bg-iv-deep/80 p-6 backdrop-blur-sm">
                <p className="text-xs tracking-[0.2em] text-iv-mist uppercase">
                  {t.contact.hours}
                </p>
                <p className="mt-2 text-white tabular-nums">{t.contact.hoursValue}</p>
                <p className="mt-1 text-xs text-white/55">{t.contact.hoursNote}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-iv-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Image src="/logo-iv.png" alt="IV Soluções" width={36} height={35} />
            <p className="mt-4 text-sm leading-relaxed text-white/50">{t.footer.tagline}</p>
          </div>
          <nav className="flex gap-12 text-sm">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] text-white/55 uppercase">
                {t.footer.nav}
              </p>
              <a href="#servicos" className="block text-white/60 transition-colors hover:text-white">
                {t.nav.services}
              </a>
              <a href="#projetos" className="block text-white/60 transition-colors hover:text-white">
                {t.nav.projects}
              </a>
              <a href="#sobre" className="block text-white/60 transition-colors hover:text-white">
                {t.nav.about}
              </a>
              <a href="#contato" className="block text-white/60 transition-colors hover:text-white">
                {t.nav.contact}
              </a>
            </div>
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] text-white/55 uppercase">
                {t.footer.legal}
              </p>
              <a href="/privacidade" className="block text-white/60 transition-colors hover:text-white">
                {t.footer.privacy}
              </a>
              <a
                href="/privacidade/villas-park"
                className="block text-white/60 transition-colors hover:text-white"
              >
                {t.footer.privacyVillas}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/60 transition-colors hover:text-white"
              >
                {t.footer.instagram}
              </a>
            </div>
          </nav>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/55 tabular-nums">
            © {new Date().getFullYear()} IV Soluções — {t.footer.madeBy}
          </p>
        </div>
      </footer>

      {/* Assistente de IA */}
      <Chatbot lang={lang} />
    </main>
  );
}
