'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, Cpu, Rocket, ArrowRight } from 'lucide-react';
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
    <section id="processo" className="py-28 px-4 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[#C8741A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[#C8741A]/30 bg-[#C8741A]/5 px-4 py-1.5 rounded-full">
            {t('nav_process')}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t('process_title')}
          </h2>
          <p className="text-[#8A8A8A] text-lg max-w-xl mx-auto">{t('process_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <div key={idx} className="flex items-start lg:items-stretch gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="flex-1 bg-[#111111] border border-[#1E1E1E] rounded-xl p-6
                    hover:border-[#C8741A]/50 transition-colors duration-300 group"
                  role="listitem"
                  aria-label={`Etapa ${step.num}: ${t(step.titleKey)}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#C8741A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C8741A]/20 transition-colors">
                      <Icon size={20} className="text-[#C8741A]" aria-hidden="true" />
                    </div>
                    <span
                      className="text-2xl font-bold text-[#C8741A]/30"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="text-[#F5F5F5] font-semibold text-base mb-2"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-[#8A8A8A] text-sm leading-relaxed">{t(step.descKey)}</p>
                </motion.div>

                {/* Arrow between steps (desktop) */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center text-[#C8741A]/30 self-center"
                    aria-hidden="true"
                  >
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
