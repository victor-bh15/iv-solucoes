"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { DICT, type Lang, whatsappLink, WHATSAPP_DISPLAY, EMAIL, INSTAGRAM_URL } from "@/lib/i18n";

export default function ContatoClient() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = DICT[lang].contact;
  const waUrl = whatsappLink(t.defaultMessage);

  return (
    <>
      <Header onLangChange={setLang} />
      <main>
        <section className="container-iv py-20 sm:py-28">
          <Reveal>
            <p className="text-small tracking-[0.2em] text-muted uppercase">{t.eyebrow}</p>
            <h1 className="text-display mt-4 max-w-xl text-ink">{t.title}</h1>
            <p className="text-body mt-4 max-w-xl text-ink-2">{t.subtitle}</p>
          </Reveal>
          <div className="mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0} className="h-full">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-iv card-iv--link block h-full p-6"
              >
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{t.whatsapp}</p>
                <p className="num mt-2 text-ink">{WHATSAPP_DISPLAY}</p>
                <p className="text-small mt-1 text-muted">{t.whatsappNote}</p>
              </a>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <a href={`mailto:${EMAIL}`} className="card-iv card-iv--link block h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{t.email}</p>
                <p className="mt-2 text-ink break-all">{EMAIL}</p>
                <p className="text-small mt-1 text-muted">{t.emailNote}</p>
              </a>
            </Reveal>
            <Reveal delay={160} className="h-full">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card-iv card-iv--link block h-full p-6"
              >
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{t.instagram}</p>
                <p className="mt-2 text-ink">@iv.solucoes</p>
                <p className="text-small mt-1 text-muted">{t.instagramNote}</p>
              </a>
            </Reveal>
            <Reveal delay={240} className="h-full">
              <div className="card-iv block h-full p-6">
                <p className="text-small tracking-[0.15em] text-iv-azul uppercase">{t.hours}</p>
                <p className="num mt-2 text-ink">{t.hoursValue}</p>
                <p className="text-small mt-1 text-muted">{t.hoursNote}</p>
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
