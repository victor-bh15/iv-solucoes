"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang } from "@/lib/i18n";

export default function MetodoClient() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];
  const m = t.methodPage;

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        <section className="container-iv py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{m.eyebrow}</p>
            <h1 className="text-display mt-4 max-w-2xl text-ink">{m.title}</h1>
            <p className="text-body mt-4 max-w-xl text-ink-2">{m.subtitle}</p>
          </Reveal>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {m.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="h-full">
                <li className="card-iv h-full p-6">
                  <span className="num text-small text-iv-azul">{s.n}</span>
                  <h2 className="text-h3 mt-3 text-ink">{s.title}</h2>
                  <p className="text-small mt-2 text-ink-2">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={m.steps.length * 80} className="mt-14">
            <div className="card-iv max-w-3xl p-8">
              <h2 className="text-h2 text-ink">{m.whyTitle}</h2>
              <p className="text-body mt-4 text-ink-2">{m.whyText}</p>
            </div>
          </Reveal>

          <div className="mt-10">
            <Link href="/seguranca" className="text-small text-iv-azul hover:underline">
              {m.linkSecurity} →
            </Link>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
