"use client";

import Link from "next/link";
import { Hammer, ArrowLeft } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";

export function BlogEmConstrucao() {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-500/10 blur-[120px] dark:bg-navy-400/15" />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <span className="ring-gradient inline-flex animate-float items-center justify-center rounded-2xl border border-border bg-surface/70 p-5 shadow-lg backdrop-blur-sm">
          <Hammer className="h-10 w-10 text-brand-strong" aria-hidden="true" />
        </span>

        <span className="mt-8 inline-block rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-strong backdrop-blur-sm">
          {t.blog.badge}
        </span>

        <h1 className="display-xl mt-5 text-3xl text-foreground sm:text-5xl">
          {t.blog.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
          {t.blog.subtitle}
        </p>

        <Link
          href="/"
          className="btn-gradient mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.blog.back}
        </Link>
      </div>
    </section>
  );
}
