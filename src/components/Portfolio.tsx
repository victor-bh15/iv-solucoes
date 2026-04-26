'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const PROJECTS = [
  {
    title: 'ChatBot Atendimento',
    desc: 'Assistente virtual com NLP para atendimento ao cliente 24/7',
    tag: 'Next.js + Gemini',
    gradient: 'from-orange-900/60 to-[#0A0A0A]',
    accent: '#C8741A',
  },
  {
    title: 'Automação de Vendas',
    desc: 'Pipeline automatizado com qualificação de leads por IA',
    tag: 'Python + Zapier',
    gradient: 'from-purple-900/60 to-[#0A0A0A]',
    accent: '#9333EA',
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Análise preditiva de dados com machine learning',
    tag: 'React + TensorFlow',
    gradient: 'from-blue-900/60 to-[#0A0A0A]',
    accent: '#3B82F6',
  },
  {
    title: 'Assistente de RH',
    desc: 'Triagem automática de currículos e onboarding inteligente',
    tag: 'Node.js + OpenAI',
    gradient: 'from-green-900/60 to-[#0A0A0A]',
    accent: '#22C55E',
  },
  {
    title: 'Plataforma E-learning',
    desc: 'Ensino adaptativo com recomendações personalizadas de IA',
    tag: 'Next.js + Claude',
    gradient: 'from-pink-900/60 to-[#0A0A0A]',
    accent: '#EC4899',
  },
  {
    title: 'Sistema de Logística',
    desc: 'Otimização de rotas e previsão de demanda com IA',
    tag: 'Python + TensorFlow',
    gradient: 'from-cyan-900/60 to-[#0A0A0A]',
    accent: '#06B6D4',
  },
];

export default function Portfolio() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="portfolio" className="py-28 px-4 bg-[#0D0D0D]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[#C8741A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[#C8741A]/30 bg-[#C8741A]/5 px-4 py-1.5 rounded-full">
            {t('nav_portfolio')}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t('portfolio_title')}
          </h2>
          <p className="text-[#8A8A8A] text-lg">{t('portfolio_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden
                hover:border-[#C8741A]/50 hover:shadow-[0_0_30px_rgba(200,116,26,0.08)] transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, ${project.accent} 0%, transparent 50%)`,
                  }}
                />
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
                    style={{ color: project.accent }}
                  >
                    {project.tag}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3
                  className="text-[#F5F5F5] font-semibold text-base mb-1.5"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {project.title}
                </h3>
                <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4">{project.desc}</p>
                <button
                  className="group/btn flex items-center gap-1.5 text-[#C8741A] text-sm font-medium hover:text-[#E8840A] transition-colors"
                  aria-label={`${t('portfolio_btn')} — ${project.title}`}
                >
                  {t('portfolio_btn')}
                  <ExternalLink
                    size={14}
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
