"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang, DPO_EMAIL } from "@/lib/i18n";

/** Copy verificada por HELENA — texto reproduzido tal como aprovado, PT e EN;
 * não editar afirmações jurídicas. Sem campo "última atualização" (decisão do Ivo). */
export default function SegurancaClient() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];
  const s = t.seguranca;

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        <section className="container-iv py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{s.hero.eyebrow}</p>
            <h1 className="text-display mt-4 max-w-2xl text-ink">{s.hero.title}</h1>
            <p className="text-body mt-4 max-w-2xl text-ink-2">{s.hero.subtitle}</p>
          </Reveal>

          <Reveal delay={80} className="mt-16 max-w-2xl">
            <h2 className="text-h2 text-ink">{s.compromisso.title}</h2>
            <p className="text-body mt-4 text-ink-2">{s.compromisso.body}</p>
          </Reveal>

          <Reveal delay={120} className="mt-16">
            <h2 className="text-h2 max-w-2xl text-ink">{s.protecao.title}</h2>
            <p className="text-body mt-4 max-w-2xl text-ink-2">{s.protecao.intro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {s.protecao.items.map((item) => (
                <div key={item.title} className="card-iv h-full p-6">
                  <h3 className="text-h3 text-ink">{item.title}</h3>
                  <p className="text-small mt-2 text-ink-2">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-small mt-8 max-w-2xl border-l-2 border-line pl-4 text-muted">
              {s.protecao.iaNota}
            </p>
          </Reveal>

          <Reveal delay={160} className="mt-16 max-w-2xl">
            <h2 className="text-h2 text-ink">{s.lgpd.title}</h2>
            <p className="text-body mt-4 text-ink-2">{s.lgpd.body}</p>

            <div className="card-iv mt-8 p-6">
              <h3 className="text-h3 text-ink">{s.lgpd.direitos.title}</h3>
              <p className="text-small mt-2 text-ink-2">{s.lgpd.direitos.intro}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-small text-ink-2">
                {s.lgpd.direitos.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="text-small mt-4 text-ink-2">{s.lgpd.direitos.cta}</p>
            </div>

            <div className="card-iv mt-6 p-6">
              <h3 className="text-h3 text-ink">{s.lgpd.incidente.title}</h3>
              <p className="text-small mt-2 text-ink-2">{s.lgpd.incidente.body}</p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-16 max-w-2xl">
            <h2 className="text-h2 text-ink">{s.saude.title}</h2>
            <p className="text-body mt-4 text-ink-2">{s.saude.body}</p>
          </Reveal>

          <Reveal delay={240} className="mt-16">
            <div className="card-iv max-w-2xl p-8">
              <h2 className="text-h2 text-ink">{s.encarregado.title}</h2>
              <p className="text-body mt-4 text-ink-2">{s.encarregado.body}</p>
              <a
                href={`mailto:${DPO_EMAIL}`}
                className="mt-6 inline-block rounded-sm bg-iv-azul px-6 py-3 text-small text-white transition-colors hover:bg-iv-azul-strong"
              >
                {s.encarregado.cta}
              </a>
              <p className="text-small mt-3 text-muted">
                {s.encarregado.emailLabel}: {DPO_EMAIL}
              </p>
            </div>
          </Reveal>

          <p className="text-small mt-16 max-w-2xl text-muted">{s.disclaimer.body}</p>
        </section>
      </main>
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
