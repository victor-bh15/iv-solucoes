"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang } from "@/lib/i18n";

/** Índice de soluções — reaproveita `solutions.items` (mesmos 5 cards da Home,
 * não duplicados) e propaga o toggle EN para o corpo inteiro da página. */
export default function SolucoesClient() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];
  const idx = t.solutionsIndex;

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        <section className="container-iv py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{idx.eyebrow}</p>
            <h1 className="text-display mt-4 max-w-2xl text-ink">{idx.title}</h1>
            <p className="text-body mt-4 max-w-xl text-ink-2">{idx.subtitle}</p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.solutions.items.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/solucoes/${item.slug}`}
                  className="card-iv card-iv--link flex h-full flex-col p-6"
                >
                  <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{item.category}</p>
                  <h2 className="text-h3 mt-3 text-ink">{item.title}</h2>
                  <p className="text-small mt-3 flex-1 text-ink-2">{item.desc}</p>
                  <span className="text-small mt-5 text-iv-azul">
                    {lang === "pt" ? "Ver solução →" : "See solution →"}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
