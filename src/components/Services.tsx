'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Zap, Brain, Code2, Link2, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = [Bot, Zap, Brain, Code2, Link2, Users];

const SERVICES = [
  { icon: 0, titleKey: 'svc1_title', descKey: 'svc1_desc' },
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
    <section id="servicos" className="py-28 px-4 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[#C8741A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[#C8741A]/30 bg-[#C8741A]/5 px-4 py-1.5 rounded-full">
            {t('nav_services')}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t('services_title')}
          </h2>
          <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto">{t('services_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, idx) => {
            const Icon = ICONS[svc.icon];
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative bg-[#111111] border border-[#1E1E1E] rounded-xl p-6 cursor-default
                  hover:border-[#C8741A] hover:shadow-[0_0_30px_rgba(200,116,26,0.12)] transition-all duration-300"
                aria-label={t(svc.titleKey)}
              >
                <div
                  className="mb-5 w-12 h-12 bg-[#C8741A]/10 rounded-xl flex items-center justify-center
                    group-hover:bg-[#C8741A]/20 transition-colors duration-300"
                >
                  <Icon size={22} className="text-[#C8741A]" aria-hidden="true" />
                </div>
                <h3
                  className="text-[#F5F5F5] font-semibold text-lg mb-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {t(svc.titleKey)}
                </h3>
                <p className="text-[#8A8A8A] text-sm leading-relaxed">{t(svc.descKey)}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
