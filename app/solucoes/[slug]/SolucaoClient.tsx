"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang, type SolutionSlug, whatsappLink } from "@/lib/i18n";

/** Template fixo de produto: headline · problema · o que a IV entrega · como
 * funciona · resultado · CTA WhatsApp. Categoria/nome curto reaproveitam
 * `solutions.items` (mesma fonte da Home e do índice /solucoes). */
export default function SolucaoClient({ slug }: { slug: SolutionSlug }) {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang];
  const card = t.solutions.items.find((item) => item.slug === slug);
  if (!card) notFound();
  const page = t.solutionPages.items[slug];
  const labels = t.solutionPages.labels;
  const waUrl = whatsappLink(page.ctaMessage);

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        <section className="container-iv py-20 sm:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{card.category}</p>
            <p className="text-small mt-2 text-muted">{card.title}</p>
            <h1 className="text-display mt-4 text-ink">{page.headline}</h1>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal delay={0}>
              <div className="card-iv h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{labels.problem}</p>
                <p className="text-small mt-3 text-ink-2">{page.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card-iv h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{labels.delivers}</p>
                <p className="text-small mt-3 text-ink-2">{page.delivers}</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="card-iv h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{labels.how}</p>
                <p className="text-small mt-3 text-ink-2">{page.how}</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="card-iv h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{labels.result}</p>
                <p className="text-small mt-3 text-ink-2">{page.result}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-10">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-iv-azul px-6 py-3 text-small text-white transition-colors hover:bg-iv-azul-strong"
            >
              {t.nav.cta}
            </a>
            <Link href="/solucoes" className="text-small text-iv-azul underline-offset-4 hover:underline">
              {labels.back}
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </>
  );
}
