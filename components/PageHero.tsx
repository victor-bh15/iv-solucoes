"use client";

type PageHeroKey = "about" | "services" | "portfolio" | "contact";

import { useLang } from "@/components/providers/LanguageProvider";

export function PageHero({ section }: { section: PageHeroKey }) {
  const { t } = useLang();
  const map = {
    about: { eyebrow: t.about.eyebrow, title: t.about.title, subtitle: "" },
    services: {
      eyebrow: t.services.eyebrow,
      title: t.services.title,
      subtitle: t.services.subtitle,
    },
    portfolio: {
      eyebrow: t.portfolio.eyebrow,
      title: t.portfolio.title,
      subtitle: t.portfolio.subtitle,
    },
    contact: {
      eyebrow: t.contact.eyebrow,
      title: t.contact.title,
      subtitle: t.contact.subtitle,
    },
  } as const;

  const { eyebrow, title, subtitle } = map[section];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-30%] h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,107,255,0.18),transparent_70%)] blur-2xl" />
      </div>
      <div className="mx-auto max-w-4xl px-4 pb-14 pt-36 text-center sm:px-6 sm:pt-40">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-strong animate-fade-up">
          <span className="h-1 w-1 rounded-full bg-iris" />
          {eyebrow}
        </span>
        <h1 className="display-xl mt-4 text-4xl text-foreground animate-fade-up sm:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted animate-fade-up">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
