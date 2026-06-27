"use client";

import { Bot, LayoutDashboard, Globe, Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt3D } from "@/components/Tilt3D";
import { useLang } from "@/components/providers/LanguageProvider";

const icons = [Bot, LayoutDashboard, Globe];

export function Servicos({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();

  return (
    <section id="servicos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
        )}

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Tilt3D key={item.title} className="h-full">
                <Reveal
                  as="article"
                  delay={i * 120}
                  className="ring-gradient group relative flex h-full flex-col rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur-sm transition-all duration-300 hover:border-iris/40 hover:shadow-2xl hover:shadow-iris/10"
                >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-iris/12 text-brand-strong transition-all group-hover:bg-linear-to-br group-hover:from-electric group-hover:via-iris group-hover:to-violet group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-strong" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                </Reveal>
              </Tilt3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
