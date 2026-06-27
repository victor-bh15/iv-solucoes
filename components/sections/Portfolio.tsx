"use client";

import { useState } from "react";
import { LayoutDashboard, Bot, Activity, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

// Identidade visual de cada projeto. `file` é o nome do print real (opcional):
// salve em public/projetos/<file>. Se o arquivo existir, ele é usado; senão,
// mostramos a prévia gerada por CSS automaticamente.
const visuals: {
  icon: LucideIcon;
  gradient: string;
  accent: string;
  file: string;
}[] = [
  {
    icon: LayoutDashboard,
    gradient: "from-navy-800 via-navy-700 to-navy-900",
    accent: "text-navy-200",
    file: "/projetos/onmnia-empenhos.jpg",
  },
  {
    icon: Bot,
    gradient: "from-emerald-900 via-emerald-800 to-slate-900",
    accent: "text-emerald-300",
    file: "/projetos/auditor-genio.jpg",
  },
  {
    icon: Activity,
    gradient: "from-sky-900 via-blue-800 to-navy-900",
    accent: "text-sky-300",
    file: "/projetos/siem.jpg",
  },
];

function ProjectPreview({
  file,
  gradient,
  accent,
  icon: Icon,
  name,
}: {
  file: string;
  gradient: string;
  accent: string;
  icon: LucideIcon;
  name: string;
}) {
  const [hasImage, setHasImage] = useState(true);

  // Com imagem real: moldura de "janela de navegador" com a tela inteira
  // visível (object-contain), sem cortes — enquadramento correto.
  if (hasImage) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-navy-950">
        {/* Barra superior estilo navegador */}
        <div className="flex h-7 items-center gap-1.5 bg-navy-900 px-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        {/* Tela do projeto, inteira e centralizada */}
        <div className="absolute inset-x-0 bottom-0 top-7 flex items-center justify-center bg-navy-950 p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- carregamento opcional com fallback via onError */}
          <img
            src={file}
            alt={`Tela do projeto ${name}`}
            onError={() => setHasImage(false)}
            className="max-h-full max-w-full rounded-sm object-contain"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // Sem imagem: prévia gerada por CSS (fallback)
  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute left-4 top-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <Icon className={`h-12 w-12 ${accent}`} aria-hidden="true" />
        <span className="px-6 text-center font-display text-lg font-bold text-white/90">
          {name}
        </span>
      </div>
    </div>
  );
}

export function Portfolio({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            eyebrow={t.portfolio.eyebrow}
            title={t.portfolio.title}
            subtitle={t.portfolio.subtitle}
          />
        )}

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {t.portfolio.items.map((item, i) => {
            const v = visuals[i];
            return (
              <Reveal
                as="article"
                key={item.name}
                delay={i * 120}
                className="ring-gradient group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-2xl hover:shadow-iris/10 motion-reduce:hover:translate-y-0"
              >
                <ProjectPreview
                  file={v.file}
                  gradient={v.gradient}
                  accent={v.accent}
                  icon={v.icon}
                  name={item.name.split("—")[0].trim()}
                />

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
