"use client";

import Image from "next/image";
import { Target, Cpu, HeartHandshake, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";
import { site } from "@/lib/site";

const valueIcons = [Target, Cpu, HeartHandshake];

export function Sobre({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();

  return (
    <section id="sobre" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            align="left"
          />
        )}

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <p className="text-lg leading-relaxed text-muted">{t.about.p1}</p>
            <p className="text-lg leading-relaxed text-muted">{t.about.p2}</p>
          </Reveal>

          {/* Logo da marca, sem fundo atrás (transparente nos dois temas) */}
          <Reveal delay={120} className="flex justify-center">
            <div className="w-full max-w-sm px-4">
              {/* Versão escura — para o tema claro */}
              <Image
                src="/logo.png"
                alt="Logotipo da IV Soluções"
                width={1144}
                height={720}
                className="h-auto w-full dark:hidden"
                priority
              />
              {/* Versão clara — para o tema escuro */}
              <Image
                src="/logo-light.png"
                alt="Logotipo da IV Soluções"
                width={1144}
                height={720}
                className="hidden h-auto w-full dark:block"
                priority
              />
            </div>
          </Reveal>
        </div>

        {/* Valores */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {t.about.values.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <Reveal
                key={value.title}
                delay={i * 120}
                className="ring-gradient rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-iris/12 text-brand-strong">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Fundadores */}
        <Reveal className="ring-gradient mt-12 rounded-2xl border border-border bg-surface/70 p-8 backdrop-blur-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-strong">
                <Users className="h-4 w-4" aria-hidden="true" />
                {t.about.foundersTitle}
              </span>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t.about.foundersDesc}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-4">
              {site.founders.map((name) => {
                const initials = name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("");
                return (
                  <div key={name} className="flex flex-col items-center gap-2 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-electric via-iris to-violet font-display text-lg font-bold text-white">
                      {initials}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
