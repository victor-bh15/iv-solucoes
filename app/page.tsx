"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang, whatsappLink, WHATSAPP_DISPLAY, EMAIL } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];
  const waUrl = whatsappLink(t.contact.defaultMessage);

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        {/* 1. HERÓI */}
        <section className="container-iv pt-20 pb-20 sm:pt-28 sm:pb-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal className="max-w-xl">
              <h1 className="text-display text-ink">{t.hero.title}</h1>
              <p className="text-body mt-6 text-ink-2">{t.hero.subtitle}</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm bg-iv-azul px-6 py-3 text-small text-white transition-colors hover:bg-iv-azul-strong"
                >
                  {t.hero.ctaPrimary}
                </a>
                <Link
                  href="/solucoes"
                  className="text-small text-iv-azul underline-offset-4 transition-colors hover:underline"
                >
                  {t.hero.ctaSecondary} →
                </Link>
              </div>
            </Reveal>

            {/* Painel visual — conceito do Índice de Excelência (0–100), ver case abaixo */}
            <Reveal delay={100}>
              <div className="card-iv mx-auto w-full max-w-md p-8 lg:mx-0 lg:ml-auto">
                <p className="text-small tracking-[0.2em] text-muted uppercase">
                  {t.hero.panel.eyebrow}
                </p>
                <p className="num mt-4 text-7xl text-iv-azul">{t.hero.panel.score}</p>
                <p className="text-small mt-1 text-muted">{t.hero.panel.range}</p>
                <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-iv-azul"
                    style={{ width: `${t.hero.panel.percent}%` }}
                  />
                </div>
                <p className="text-small mt-6 text-ink-2">{t.hero.panel.caption}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. PROVA / NÚMEROS */}
        <section className="border-y border-line bg-bg-subtle">
          <div className="container-iv py-14">
            <Reveal>
              <p className="text-small tracking-[0.2em] text-muted uppercase">{t.proof.eyebrow}</p>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {t.proof.items.map((p, i) => (
                <Reveal key={p.label} delay={i * 100}>
                  <p className="num text-display text-iv-azul">{p.value}</p>
                  <p className="text-small mt-2 max-w-xs text-ink-2">{p.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. VITRINE DE SOLUÇÕES */}
        <section id="solucoes" className="container-iv scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{t.solutions.eyebrow}</p>
            <h2 className="text-h2 mt-4 max-w-2xl text-ink">{t.solutions.title}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.solutions.items.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/solucoes/${item.slug}`}
                  className="card-iv card-iv--link flex h-full flex-col p-6"
                >
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{item.category}</p>
                  <h3 className="text-h3 mt-3 text-ink">{item.title}</h3>
                  <p className="text-small mt-3 flex-1 text-ink-2">{item.desc}</p>
                  <span className="text-small mt-5 text-iv-azul">
                    {lang === "pt" ? "Ver solução →" : "See solution →"}
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={t.solutions.items.length * 80} className="h-full">
              <Link
                href="/solucoes"
                className="card-iv card-iv--link flex h-full flex-col justify-center gap-2 p-6"
              >
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                  {t.solutions.viewAllEyebrow}
                </p>
                <p className="text-h3 text-ink">{t.solutions.viewAll} →</p>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* 4. CASE ANONIMIZADO */}
        <section className="border-y border-line bg-bg-subtle">
          <div className="container-iv py-20 sm:py-28">
            <Reveal>
              <p className="text-small tracking-[0.2em] text-muted uppercase">
                {t.case.eyebrow} · {t.case.category}
              </p>
              <h2 className="text-h2 mt-4 max-w-2xl text-ink">{t.case.title}</h2>
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                <div className="card-iv p-6">
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                    {t.case.problem.label}
                  </p>
                  <p className="text-small mt-3 text-ink-2">{t.case.problem.text}</p>
                </div>
                <div className="card-iv p-6">
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                    {t.case.solution.label}
                  </p>
                  <p className="text-small mt-3 text-ink-2">{t.case.solution.text}</p>
                </div>
                <div className="card-iv p-6">
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                    {t.case.result.label}
                  </p>
                  <p className="text-small mt-3 text-ink-2">{t.case.result.text}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. MÉTODO / AUTORIDADE */}
        <section id="metodo" className="container-iv scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{t.method.eyebrow}</p>
            <h2 className="text-h2 mt-4 max-w-2xl text-ink">{t.method.title}</h2>
            <p className="text-body mt-4 max-w-xl text-ink-2">{t.method.subtitle}</p>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.method.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="h-full">
                <li className="card-iv h-full p-6">
                  <span className="num text-small text-iv-azul">{s.n}</span>
                  <h3 className="text-h3 mt-3 text-ink">{s.title}</h3>
                  <p className="text-small mt-2 text-ink-2">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link href="/metodo" className="text-small text-iv-azul hover:underline">
              {t.method.linkMethod} →
            </Link>
            <Link href="/seguranca" className="text-small text-iv-azul hover:underline">
              {t.method.linkSecurity} →
            </Link>
          </div>
        </section>

        {/* 6. CTA ÚNICO DE CONTATO */}
        <section id="contato" className="scroll-mt-20 border-t border-line bg-bg-subtle">
          <div className="container-iv py-20 sm:py-28">
            <Reveal>
              <p className="text-small tracking-[0.2em] text-muted uppercase">{t.contact.eyebrow}</p>
              <h2 className="text-h2 mt-4 max-w-xl text-ink">{t.contact.title}</h2>
              <p className="text-body mt-4 max-w-xl text-ink-2">{t.contact.subtitle}</p>
              <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-iv card-iv--link p-6"
                >
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                    {t.contact.whatsapp}
                  </p>
                  <p className="num mt-2 text-ink">{WHATSAPP_DISPLAY}</p>
                  <p className="text-small mt-1 text-muted">{t.contact.whatsappNote}</p>
                </a>
                <a href={`mailto:${EMAIL}`} className="card-iv card-iv--link p-6">
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                    {t.contact.email}
                  </p>
                  <p className="mt-2 text-ink break-all">{EMAIL}</p>
                  <p className="text-small mt-1 text-muted">{t.contact.emailNote}</p>
                </a>
                <div className="card-iv p-6">
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">
                    {t.contact.hours}
                  </p>
                  <p className="num mt-2 text-ink">{t.contact.hoursValue}</p>
                  <p className="text-small mt-1 text-muted">{t.contact.hoursNote}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
