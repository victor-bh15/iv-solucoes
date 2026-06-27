'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Layers, Lock, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Diferenciais reais da IV — substitui as métricas fabricadas (50+ projetos,
 * 100% satisfação) que não temos como comprovar. Aqui só afirmação verdadeira.
 */
const ITEMS = [
  { icon: ShieldCheck, titleKey: 'diff1_title', descKey: 'diff1_desc' },
  { icon: Layers, titleKey: 'diff2_title', descKey: 'diff2_desc' },
  { icon: Lock, titleKey: 'diff3_title', descKey: 'diff3_desc' },
  { icon: HeartHandshake, titleKey: 'diff4_title', descKey: 'diff4_desc' },
];

export default function Differentials() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 px-5" ref={ref} aria-label={t('diff_title')}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full">
            {t('diff_subtitle')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            {t('diff_title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] p-7
                  hover:border-[var(--color-accent)]/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/12 border border-[var(--color-accent)]/20 flex items-center justify-center mb-5 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                  <Icon size={22} className="text-[var(--color-accent)]" aria-hidden="true" />
                </div>
                <h3 className="font-display text-ink font-semibold text-base mb-2">{t(item.titleKey)}</h3>
                <p className="text-muted text-sm leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
