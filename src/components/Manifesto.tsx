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
    <section
      className="relative py-32 px-4 bg-[#0A0A0A] overflow-hidden"
      ref={ref}
      aria-label="Manifesto"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8741A] rounded-full opacity-[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span
          className="inline-block text-[#C8741A] text-xs font-semibold tracking-[0.2em] uppercase mb-10 border border-[#C8741A]/30 bg-[#C8741A]/5 px-4 py-1.5 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('manifesto_label')}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Quote
            size={48}
            className="text-[#C8741A]/30 mx-auto mb-8"
            aria-hidden="true"
          />
          <blockquote>
            <p
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F5] leading-snug mb-10"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {t('manifesto_quote')}
            </p>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-px bg-[#C8741A]/40" aria-hidden="true" />
          <p className="text-[#8A8A8A] text-base font-medium">{t('manifesto_signature')}</p>
          <p className="text-[#C8741A]/70 text-sm">Fundadores, IV Soluções em IA</p>
        </motion.div>
      </div>
    </section>
  );
}
