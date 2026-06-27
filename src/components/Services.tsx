'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Zap, Boxes, Globe, Workflow, Brain, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = [Bot, Zap, Boxes, Globe, Workflow, Brain];

const SERVICES = [
  { icon: 0, titleKey: 'svc1_title', descKey: 'svc1_desc', featured: true },
  { icon: 1, titleKey: 'svc2_title', descKey: 'svc2_desc' },
  { icon: 2, titleKey: 'svc3_title', descKey: 'svc3_desc' },
  { icon: 3, titleKey: 'svc4_title', descKey: 'svc4_desc' },
  { icon: 4, titleKey: 'svc5_title', descKey: 'svc5_desc' },
  { icon: 5, titleKey: 'svc6_title', descKey: 'svc6_desc' },
];

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="servicos" className="relative py-28 px-5" ref={ref}>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full">
            {t('nav_services')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            {t('services_title')}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t('services_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {SERVICES.map((svc, idx) => {
            const Icon = ICONS[svc.icon];
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-7
                  transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50
                  hover:shadow-[0_12px_40px_-12px_rgba(124,108,255,0.4)]
                  ${svc.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* brilho de hover */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[var(--color-accent)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/12 border border-[var(--color-accent)]/20 flex items-center justify-center group-hover:bg-[var(--color-accent)]/20 transition-colors">
                    <Icon size={22} className="text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-faint opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="relative font-display text-ink font-semibold text-lg mb-2">
                  {t(svc.titleKey)}
                </h3>
                <p className="relative text-muted text-sm leading-relaxed">{t(svc.descKey)}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
