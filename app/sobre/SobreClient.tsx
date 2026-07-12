"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang } from "@/lib/i18n";

/** Divide "Rótulo: resto da frase" só para estilo (negrito no rótulo) — não
 * altera a copy, apenas realça visualmente a primeira palavra dada pela HELENA/BRUNA. */
function splitValue(text: string): { label: string; body: string } {
  const i = text.indexOf(": ");
  if (i === -1) return { label: "", body: text };
  return { label: text.slice(0, i), body: text.slice(i + 2) };
}

export default function SobreClient() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];
  const a = t.aboutPage;

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        <section className="container-iv py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{a.eyebrow}</p>
            <h1 className="text-display mt-4 max-w-2xl text-ink">{a.title}</h1>
            <p className="text-body mt-6 max-w-2xl text-ink-2">{a.originText}</p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <Reveal delay={0}>
              <div className="card-iv h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{a.missionLabel}</p>
                <p className="text-body mt-3 text-ink-2">{a.missionText}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card-iv h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{a.foundersLabel}</p>
                <ul className="mt-3 space-y-1">
                  {a.founders.map((f) => (
                    <li key={f.name} className="text-ink">
                      <strong>{f.name}</strong> — {f.role}
                    </li>
                  ))}
                </ul>
                <p className="text-small mt-3 text-ink-2">{a.foundersText}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="mt-14">
            <p className="text-small tracking-[0.2em] text-muted uppercase">{a.valuesLabel}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {a.values.map((v) => {
                const { label, body } = splitValue(v.text);
                const bodyCap = body.charAt(0).toUpperCase() + body.slice(1);
                return (
                  <div key={v.text} className="card-iv h-full p-6">
                    <h2 className="text-h3 text-ink">{label}</h2>
                    <p className="text-small mt-2 text-ink-2">{bodyCap}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      </main>
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
