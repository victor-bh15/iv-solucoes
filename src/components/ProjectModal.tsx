'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/content';
import ProjectMock from './ProjectMock';

const WHATSAPP = '5531996715639'; // WhatsApp do Inamar

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (project) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label={t('modal_close')}
              className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center text-muted hover:text-ink hover:border-[var(--color-accent)] transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8">
              {/* Cabeçalho */}
              <span className="inline-block text-[var(--color-accent)] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-3 py-1 rounded-full">
                {project.sector[lang]}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">{project.title}</h3>
              <p className="text-[var(--color-accent)] text-sm mb-6">{project.tagline[lang]}</p>

              {/* Amostra (print) */}
              <div className="mb-7">
                <p className="text-[11px] uppercase tracking-wider text-faint mb-3">{t('modal_preview')}</p>
                <ProjectMock id={project.id} />
              </div>

              {/* Sobre */}
              <h4 className="font-display text-ink font-semibold text-sm uppercase tracking-wider mb-2">{t('modal_about')}</h4>
              <p className="text-muted text-sm leading-relaxed mb-7">{project.about[lang]}</p>

              {/* Features */}
              <h4 className="font-display text-ink font-semibold text-sm uppercase tracking-wider mb-3">{t('modal_features')}</h4>
              <ul className="grid sm:grid-cols-2 gap-2.5 mb-7" role="list">
                {project.features[lang].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="text-[var(--color-accent)] mt-0.5 shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <h4 className="font-display text-ink font-semibold text-sm uppercase tracking-wider mb-3">{t('modal_stack')}</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((s) => (
                  <span key={s} className="text-xs text-muted border border-[var(--color-border)] bg-[var(--color-card)] rounded-full px-3 py-1">
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vi o projeto "${project.title}" no site e quero algo assim.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[var(--color-accent)]/25"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {t('modal_cta')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
