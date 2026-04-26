'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav_services'), href: '#servicos' },
    { label: t('nav_process'), href: '#processo' },
    { label: t('nav_portfolio'), href: '#portfolio' },
    { label: t('nav_contact'), href: '#contato' },
  ];

  const services = [
    'Chatbots com IA',
    'Automação de Processos',
    'Consultoria em IA',
    'Desenvolvimento de Sistemas',
    'Integração de APIs',
    'Treinamento de Equipes',
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#1A1A1A] pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="logo-wrapper mb-4 inline-block">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 12px #C8741A)' }}
              >
                <Image
                  src="/Logo.png"
                  alt="IV Soluções em IA"
                  width={70}
                  height={44}
                  className="object-contain"
                />
              </motion.div>
            </div>
            <p className="text-[#8A8A8A] text-sm leading-relaxed mb-5 max-w-[220px]">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5531984496889"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C8741A] hover:text-[#C8741A] rounded-lg flex items-center justify-center text-[#8A8A8A] transition-all"
              >
                <MessageCircle size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C8741A] hover:text-[#C8741A] rounded-lg flex items-center justify-center text-[#8A8A8A] transition-all"
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Site"
                className="w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C8741A] hover:text-[#C8741A] rounded-lg flex items-center justify-center text-[#8A8A8A] transition-all"
              >
                <Globe size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-[#F5F5F5] font-semibold text-sm mb-5 uppercase tracking-wider"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Navegação
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#8A8A8A] hover:text-[#C8741A] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-[#F5F5F5] font-semibold text-sm mb-5 uppercase tracking-wider"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Serviços
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {services.map((svc) => (
                <li key={svc}>
                  <a
                    href="#servicos"
                    className="text-[#8A8A8A] hover:text-[#C8741A] transition-colors text-sm"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3
              className="text-[#F5F5F5] font-semibold text-sm mb-5 uppercase tracking-wider"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Contato
            </h3>
            <p className="text-[#8A8A8A] text-sm mb-4 leading-relaxed">
              Pronto para transformar seu negócio com IA?
            </p>
            <a
              href="https://wa.me/5531984496889"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C8741A] hover:bg-[#E8840A] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-sm">{t('footer_rights')}</p>
          <p className="text-[#555] text-sm">
            Feito com{' '}
            <span className="text-[#C8741A]">♥</span>
            {' '}por Inamar & Victor
          </p>
        </div>
      </div>
    </footer>
  );
}
