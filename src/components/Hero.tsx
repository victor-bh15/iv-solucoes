'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C8741A" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#C8741A] rounded-full opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C8741A] rounded-full opacity-[0.04] blur-[100px]" />
    </div>
  );
}

export default function Hero() {
  const { lang, t } = useLanguage();

  const title = t('hero_title');
  const keyword = lang === 'pt' ? 'IA' : 'AI';
  const parts = title.split(keyword);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-20"
      aria-label="Hero section"
    >
      <GridBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-block text-[#C8741A] text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-[#C8741A]/30 bg-[#C8741A]/5 px-5 py-2 rounded-full">
            {t('hero_badge')}
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F5F5F5] leading-tight mb-6"
          style={{ fontFamily: 'Syne, sans-serif' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        >
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <span className="text-[#C8741A]">{keyword}</span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="text-[#8A8A8A] text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <a
            href="#servicos"
            className="group flex items-center justify-center gap-2 border border-[#C8741A] text-[#C8741A] hover:bg-[#C8741A] hover:text-white px-8 py-4 rounded-lg text-base font-medium transition-all duration-300"
            aria-label={t('hero_cta1')}
          >
            {t('hero_cta1')}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <a
            href="https://wa.me/5531984496889"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#C8741A] hover:bg-[#E8840A] text-white px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 shadow-lg shadow-[#C8741A]/25"
            aria-label={t('hero_cta2')}
          >
            <MessageCircle size={18} />
            {t('hero_cta2')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-[#C8741A]/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#C8741A] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
