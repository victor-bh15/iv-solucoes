'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import CloudBackground from './CloudBackground';

const ROTATING: Record<string, string[]> = {
  pt: ['inteligente.', 'eficiente.', 'automatizado.', 'lucrativo.'],
  en: ['intelligent.', 'efficient.', 'automated.', 'profitable.'],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const words = ROTATING[lang] ?? ROTATING.pt;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-bg pt-28 pb-16"
      aria-label="Início"
    >
      <CloudBackground variant="hero" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Coluna texto */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 max-w-full text-[var(--color-accent)] text-[10px] sm:text-xs font-semibold tracking-[0.16em] uppercase mb-7 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Sparkles size={13} aria-hidden="true" />
            {t('hero_badge')}
          </motion.span>

          <motion.h1
            className="font-display font-bold text-ink leading-[1.04] text-[2.6rem] sm:text-6xl lg:text-7xl mb-7"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {t('hero_line1')}
            <br />
            {t('hero_line2')}{' '}
            <span className="relative inline-block align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[idx]}
                  initial={{ y: '0.5em', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-0.5em', opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="inline-block text-gradient"
                >
                  {words[idx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="text-muted text-lg md:text-xl mb-9 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3.5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease }}
          >
            <a
              href="https://wa.me/5531996715639"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-7 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/30"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t('hero_cta2')}
            </a>
            <a
              href="#servicos"
              className="group inline-flex items-center justify-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-accent)]/60 text-ink hover:bg-white/[0.03] px-7 py-3.5 rounded-xl text-base font-medium transition-all duration-300"
            >
              {t('hero_cta1')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Prova social discreta */}
          <motion.ul
            className="flex flex-wrap gap-x-6 gap-y-2 mt-9 text-sm text-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            role="list"
          >
            {[t('hero_trust1'), t('hero_trust2'), t('hero_trust3')].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-[var(--color-accent)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Coluna demo viva — preview do assistente IVY */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <div className="relative">
            <div className="absolute -inset-3 bg-[var(--color-accent)]/20 blur-3xl rounded-full aura" aria-hidden="true" />
            <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-xl p-5 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)]">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center font-display font-bold text-white text-sm">
                  iV
                </div>
                <div>
                  <p className="text-ink text-sm font-semibold leading-tight">IVY · {t('hero_demo_role')}</p>
                  <p className="text-[var(--color-accent)] text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" /> online
                  </p>
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <div className="ml-auto max-w-[80%] bg-[var(--color-accent)] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5">
                  {t('hero_demo_q')}
                </div>
                <div className="max-w-[88%] bg-white/[0.04] border border-[var(--color-border)] text-ink/90 text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 leading-relaxed">
                  {t('hero_demo_a')}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-bg/60 px-3.5 py-2.5">
                <span className="text-faint text-sm flex-1">{t('hero_demo_placeholder')}</span>
                <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <ArrowRight size={14} className="text-white" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-[var(--color-accent)]/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-[var(--color-accent)] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
