'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Manifesto() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-32 px-5" ref={ref} aria-label="Manifesto">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[380px] bg-[var(--color-accent)] rounded-full opacity-25 blur-[120px] aura-strong" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] bg-[var(--color-accent-hover)] rounded-full opacity-20 blur-[90px] aura-strong" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span
          className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-10 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('manifesto_label')}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Quote size={44} className="text-[var(--color-accent)]/40 mx-auto mb-8" aria-hidden="true" />
          <blockquote>
            <p className="font-display text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-ink leading-snug mb-10 text-balance">
              {t('manifesto_quote')}
            </p>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-px bg-[var(--color-accent)]/40" aria-hidden="true" />
          <p className="text-ink text-base font-medium">{t('manifesto_signature')}</p>
          <p className="text-[var(--color-accent)]/80 text-sm">{t('manifesto_founders')}</p>
        </motion.div>
      </div>
    </section>
  );
}
