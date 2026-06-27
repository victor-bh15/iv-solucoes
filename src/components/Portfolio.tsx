'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Building2, Sparkles, CalendarClock, BarChart3, Globe2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PROJECTS, type Project } from '@/content';
import ProjectModal from './ProjectModal';

const ICONS = {
  siem: Activity,
  villas: Building2,
  genio: Sparkles,
  chronos: CalendarClock,
  painel: BarChart3,
  site: Globe2,
} as const;

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative py-28 px-5" ref={ref}>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full">
            {t('nav_portfolio')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">{t('portfolio_title')}</h2>
          <p className="text-muted text-lg">{t('portfolio_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, idx) => {
            const Icon = ICONS[p.iconKey];
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setActive(p)}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative text-left overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]
                  transition-colors duration-300 hover:border-[var(--color-accent)]/60
                  hover:shadow-[0_18px_50px_-12px_rgba(46,85,212,0.5)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                aria-label={`${t('portfolio_btn')}: ${p.title}`}
              >
                <div className="relative h-32 overflow-hidden border-b border-[var(--color-border)]"
                  style={{ background: 'radial-gradient(120% 120% at 20% 10%, rgba(46,85,212,0.32), transparent 55%), var(--color-bg)' }}>
                  <div className="absolute inset-0 grid-fade opacity-60" aria-hidden="true" />
                  <div className="absolute left-5 top-5 w-12 h-12 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <Icon size={22} className="text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <span className="absolute right-4 top-4 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-ink/80">
                    {p.sector[lang]}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-ink font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{p.tagline[lang]}</p>
                  <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] text-sm font-medium group-hover:gap-2.5 transition-all">
                    {t('portfolio_btn')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
