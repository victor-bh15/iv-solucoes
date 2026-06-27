'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Send, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Sou ${name}.\n\n${message}\n\nE-mail para retorno: ${email}`;
    const url = `https://wa.me/5531984496889?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full bg-bg border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-xl px-4 py-3 text-sm text-ink placeholder-[var(--color-faint)] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-accent)]/20';

  const channels = [
    { icon: MessageCircle, label: 'WhatsApp', value: '+55 31 98449-6889', href: 'https://wa.me/5531984496889', ext: true },
    { icon: Mail, label: 'E-mail', value: 'contato@ivsolucoesia.com.br', href: 'mailto:contato@ivsolucoesia.com.br', ext: false },
    { icon: Phone, label: t('contact_phone'), value: '+55 31 98449-6889', href: 'tel:+5531984496889', ext: false },
  ];

  return (
    <section id="contato" className="py-28 px-5 bg-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 rounded-full">
            {t('nav_contact')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-muted text-lg">{t('contact_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Canais */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-accent)]/50 transition-colors"
                >
                  <div className="w-11 h-11 shrink-0 bg-[var(--color-accent)]/12 border border-[var(--color-accent)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-accent)]/20 transition-colors">
                    <Icon size={20} className="text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-ink font-semibold text-sm">{c.label}</p>
                    <p className="text-muted text-sm group-hover:text-ink transition-colors">{c.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Formulário */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
              aria-label="Formulário de contato"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-muted text-xs font-medium mb-1.5 block">
                    {t('contact_name')}
                  </label>
                  <input
                    id="contact-name" type="text" value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact_name_placeholder')} required className={inputClass}
                    autoComplete="off" data-lpignore="true" data-form-type="other"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-muted text-xs font-medium mb-1.5 block">
                    {t('contact_email')}
                  </label>
                  <input
                    id="contact-email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@empresa.com" required className={inputClass}
                    autoComplete="off" data-lpignore="true" data-form-type="other"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-muted text-xs font-medium mb-1.5 block">
                  {t('contact_message')}
                </label>
                <textarea
                  id="contact-message" value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact_message_placeholder')} rows={5} required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1 items-stretch sm:items-center">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-[var(--color-accent)]/25"
                  aria-label={t('contact_send')}
                >
                  <Send size={16} aria-hidden="true" />
                  {t('contact_send')}
                </button>
                <span className="text-faint text-sm text-center px-1">{t('contact_or')}</span>
                <a
                  href="https://wa.me/5531984496889"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-[var(--color-border)] text-ink hover:border-[var(--color-accent)]/60 hover:bg-white/[0.03] font-medium py-3 rounded-xl transition-all"
                  aria-label={t('contact_whatsapp')}
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  {t('contact_whatsapp')}
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
