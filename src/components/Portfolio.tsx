'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Building2, Sparkles, CalendarClock, BarChart3, Globe2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const PROJECTS = [
  {
    icon: Activity,
    title: 'SIEM — Excelência Médica',
    sector: 'Saúde',
    desc: 'Índice que transforma dados clínicos em decisão, com o julgamento humano no centro.',
  },
  {
    icon: Building2,
    title: 'Villas Park',
    sector: 'Condomínios',
    desc: 'App do morador + painel do síndico: reservas, ouvidoria, comunicados e gestão num só lugar.',
  },
  {
    icon: Sparkles,
    title: 'Gênio IV',
    sector: 'IA · RAG',
    desc: 'Assistente que lê a base de documentos da empresa e responde com precisão e fonte.',
  },
  {
    icon: CalendarClock,
    title: 'Chronos — Ponto Médico',
    sector: 'Saúde',
    desc: 'Registro de ponto, escalas e plantões com validação inteligente e relatórios.',
  },
  {
    icon: BarChart3,
    title: 'Painel de Gestão',
    sector: 'Gestão',
    desc: 'Dashboard de indicadores e dados consolidados para decisão rápida e visual.',
  },
  {
    icon: Globe2,
    title: 'Site IV Soluções',
    sector: 'Web',
    desc: 'Site institucional rápido e moderno — este mesmo que você está navegando agora.',
  },
];

export default function Portfolio() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="portfolio" className="py-28 px-5 bg-bg-soft" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full">
            {t('nav_portfolio')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-muted text-lg">{t('portfolio_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]
                  transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50
                  hover:shadow-[0_12px_40px_-12px_rgba(124,108,255,0.4)]"
              >
                {/* Cabeçalho visual */}
                <div className="relative h-32 overflow-hidden border-b border-[var(--color-border)]"
                  style={{ background: 'radial-gradient(120% 120% at 20% 10%, rgba(124,108,255,0.28), transparent 55%), var(--color-bg)' }}
                >
                  <div className="absolute inset-0 grid-fade opacity-60" aria-hidden="true" />
                  <div className="absolute left-5 top-5 w-12 h-12 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon size={22} className="text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <span className="absolute right-4 top-4 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-ink/80">
                    {p.sector}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-ink font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{p.desc}</p>
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-1.5 text-[var(--color-accent)] text-sm font-medium hover:gap-2.5 transition-all"
                    aria-label={`${t('portfolio_btn')} — ${p.title}`}
                  >
                    {t('portfolio_btn')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
