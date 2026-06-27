'use client';

import Image from 'next/image';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';
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
    t('svc1_title'),
    t('svc2_title'),
    t('svc3_title'),
    t('svc4_title'),
    t('svc5_title'),
    t('svc6_title'),
  ];

  return (
    <footer className="relative bg-bg-soft border-t border-[var(--color-border)] pt-16 pb-8 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Marca */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4" aria-label="IV Soluções — Início">
              <Image
                src="/logo-iv-white.png"
                alt="IV Soluções em IA"
                width={36}
                height={36}
                className="object-contain h-8 w-8"
              />
              <span className="font-display font-bold text-ink text-lg tracking-tight">
                IV <span className="text-muted font-medium">Soluções</span>
              </span>
            </a>
            <p className="text-muted text-sm leading-relaxed mb-5 max-w-[240px]">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5531984496889"
                target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-lg flex items-center justify-center text-muted transition-all"
              >
                <MessageCircle size={16} aria-hidden="true" />
              </a>
              <a
                href="mailto:contato@ivsolucoesia.com.br" aria-label="E-mail"
                className="w-9 h-9 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-lg flex items-center justify-center text-muted transition-all"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-display text-ink font-semibold text-sm mb-5 uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted hover:text-[var(--color-accent)] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluções */}
          <div>
            <h3 className="font-display text-ink font-semibold text-sm mb-5 uppercase tracking-wider">
              {t('nav_services')}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {services.map((svc) => (
                <li key={svc}>
                  <a href="#servicos" className="text-muted hover:text-[var(--color-accent)] transition-colors text-sm">
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-display text-ink font-semibold text-sm mb-5 uppercase tracking-wider">
              {t('nav_contact')}
            </h3>
            <p className="text-muted text-sm mb-4 leading-relaxed">{t('contact_subtitle')}</p>
            <a
              href="https://wa.me/5531984496889"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              aria-label={t('contact_whatsapp')}
            >
              <MessageCircle size={15} aria-hidden="true" />
              {t('contact_whatsapp')}
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-faint text-sm">{t('footer_rights')}</p>
          <div className="flex items-center gap-5">
            <p className="text-faint text-sm">
              Feito com <span className="text-[var(--color-accent)]">♥</span> por Inamar &amp; Victor
            </p>
            <a
              href="#"
              className="text-faint hover:text-[var(--color-accent)] transition-colors flex items-center gap-1 text-sm"
              aria-label="Voltar ao topo"
            >
              Topo <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
