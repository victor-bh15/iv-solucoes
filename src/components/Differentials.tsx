'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface CounterProps {
  target: number;
  prefix?: string;
  suffix: string;
  inView: boolean;
}

function Counter({ target, prefix = '', suffix, inView }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Differentials() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { target: 50, suffix: '+', label: t('diff1_label') },
    { target: 100, suffix: '%', label: t('diff2_label') },
    { target: 24, suffix: 'h', label: t('diff3_label') },
    { target: 3, suffix: 'x', label: t('diff4_label') },
  ];

  return (
    <section className="py-24 px-4 bg-[#0D0D0D]" ref={ref} aria-label={t('diff_title')}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t('diff_title')}
          </h2>
          <p className="text-[#8A8A8A] text-lg">{t('diff_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center bg-[#111111] border border-[#1E1E1E] rounded-2xl py-10 px-4
                hover:border-[#C8741A]/50 transition-colors duration-300"
            >
              <div
                className="text-5xl md:text-6xl font-bold text-[#C8741A] mb-3"
                style={{ fontFamily: 'Syne, sans-serif' }}
                aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
              >
                <Counter target={stat.target} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-[#8A8A8A] font-medium text-sm tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
