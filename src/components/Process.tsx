'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, Cpu, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const STEP_ICONS = [Search, Lightbulb, Cpu, Rocket];

export default function Process() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    { icon: 0, num: '01', titleKey: 'step1_title', descKey: 'step1_desc' },
    { icon: 1, num: '02', titleKey: 'step2_title', descKey: 'step2_desc' },
    { icon: 2, num: '03', titleKey: 'step3_title', descKey: 'step3_desc' },
    { icon: 3, num: '04', titleKey: 'step4_title', descKey: 'step4_desc' },
  ];

  return (
    <section id="processo" className="py-28 px-5" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full">
            {t('nav_process')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            {t('process_title')}
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">{t('process_subtitle')}</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* linha conectora (desktop) */}
          <div
            className="hidden lg:block absolute top-[34px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent"
            aria-hidden="true"
          />
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto w-[68px] h-[68px] rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center mb-5 group hover:border-[var(--color-accent)]/50 transition-colors">
                  <Icon size={26} className="text-[var(--color-accent)]" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-[11px] font-bold flex items-center justify-center font-display">
                    {step.num}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-ink font-semibold text-lg mb-2">{t(step.titleKey)}</h3>
                  <p className="text-muted text-sm leading-relaxed max-w-[240px] mx-auto">{t(step.descKey)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
