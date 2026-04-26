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
    'w-full bg-[#111111] border border-[#2A2A2A] focus:border-[#C8741A] rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#555] outline-none transition-colors';

  return (
    <section id="contato" className="py-28 px-4 bg-[#0D0D0D]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[#C8741A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-[#C8741A]/30 bg-[#C8741A]/5 px-4 py-1.5 rounded-full">
            {t('nav_contact')}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t('contact_title')}
          </h2>
          <p className="text-[#8A8A8A] text-lg">{t('contact_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info sidebar */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#C8741A]/10 rounded-lg flex items-center justify-center">
                  <MessageCircle size={20} className="text-[#C8741A]" aria-hidden="true" />
                </div>
                <span className="text-[#F5F5F5] font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  WhatsApp
                </span>
              </div>
              <a
                href="https://wa.me/5531984496889"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8A8A] hover:text-[#C8741A] transition-colors text-sm"
                aria-label="Enviar mensagem via WhatsApp"
              >
                +55 31 98449-6889
              </a>
            </div>

            <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#C8741A]/10 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-[#C8741A]" aria-hidden="true" />
                </div>
                <span className="text-[#F5F5F5] font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  E-mail
                </span>
              </div>
              <a
                href="mailto:contato@ivsolucoesia.com.br"
                className="text-[#8A8A8A] hover:text-[#C8741A] transition-colors text-sm"
                aria-label="Enviar e-mail"
              >
                contato@ivsolucoesia.com.br
              </a>
            </div>

            <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#C8741A]/10 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-[#C8741A]" aria-hidden="true" />
                </div>
                <span className="text-[#F5F5F5] font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Telefone
                </span>
              </div>
              <p className="text-[#8A8A8A] text-sm">+55 31 98449-6889</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
              aria-label="Formulário de contato"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-[#8A8A8A] text-xs font-medium mb-1.5 block">
                    {t('contact_name')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="João Silva"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-[#8A8A8A] text-xs font-medium mb-1.5 block">
                    {t('contact_email')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@empresa.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-[#8A8A8A] text-xs font-medium mb-1.5 block">
                  {t('contact_message')}
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte um pouco sobre o seu projeto..."
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#C8741A] hover:bg-[#E8840A] text-white font-medium py-3 rounded-xl transition-colors"
                  aria-label={t('contact_send')}
                >
                  <Send size={16} aria-hidden="true" />
                  {t('contact_send')}
                </button>

                <span className="hidden sm:flex items-center text-[#555] text-sm px-1">
                  {t('contact_or')}
                </span>

                <a
                  href="https://wa.me/5531984496889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#C8741A] text-[#C8741A] hover:bg-[#C8741A] hover:text-white font-medium py-3 rounded-xl transition-all"
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
