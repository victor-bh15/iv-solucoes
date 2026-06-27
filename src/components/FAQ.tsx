'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FAQS } from '@/content';
import CloudBackground from './CloudBackground';

function FAQItem({ q, a, index, inView }: { q: string; a: string; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-card)] hover:border-[var(--color-accent)]/40 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-white/[0.02] transition-colors group gap-4"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-display text-ink font-medium text-[15px] group-hover:text-[var(--color-accent)] transition-colors">{q}</span>
        <span className={`flex-shrink-0 text-[var(--color-accent)] transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { lang, t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 px-5 bg-bg overflow-hidden" ref={ref}>
      <CloudBackground variant="desert" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">{t('faq_title')}</h2>
          <p className="text-muted text-lg">{t('faq_subtitle')}</p>
        </motion.div>

        <div className="flex flex-col gap-3" role="list">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q[lang]} a={faq.a[lang]} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
