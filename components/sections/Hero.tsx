"use client";

/**
 * Hero da home — conteúdo (badge, título, subtítulo, CTAs e cartão de IA) sobre
 * o FUNDO GLOBAL de partículas (cérebro→lâmpada), que agora vive no
 * SpaceBackground e flutua por todo o site. Aqui não há canvas: só o conteúdo.
 */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { AIPrompt } from "@/components/AIPrompt";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-40 sm:px-6 sm:pt-48 lg:min-h-[92vh] lg:grid-cols-2 lg:pb-0 lg:pt-0">
        <div className="max-w-xl text-center lg:text-left">
          <motion.span
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-iris" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            {...fade(0.08)}
            className="display-xl mt-7 text-[2.9rem] text-foreground sm:text-6xl lg:text-7xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0 sm:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <Link
              href="/contato"
              className="btn-gradient group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-foreground/85 transition-colors hover:border-iris/50 hover:text-foreground"
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Cartão de IA */}
        <motion.div {...fade(0.34)} className="flex justify-center lg:justify-end lg:self-end lg:pb-16">
          <AIPrompt />
        </motion.div>
      </div>
    </section>
  );
}
