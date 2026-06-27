'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { lang, toggle, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav_services'), href: '#servicos' },
    { label: t('nav_process'), href: '#processo' },
    { label: t('nav_portfolio'), href: '#portfolio' },
    { label: t('nav_contact'), href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="iV Soluções em IA — Início">
          <Image
            src="/logo-iv-white.png"
            alt="iV Soluções em IA"
            width={28}
            height={28}
            priority
            className="object-contain h-7 w-7 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display font-semibold text-ink text-lg tracking-tight">
            Soluções
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted hover:text-ink transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={`Trocar idioma para ${lang === 'pt' ? 'inglês' : 'português'}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] text-muted hover:text-ink transition-all duration-200"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <a
            href="#contato"
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-md shadow-[var(--color-accent)]/25"
          >
            {t('nav_cta')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ink p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[var(--color-bg-soft)] border-t border-[var(--color-border)] overflow-hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-ink hover:text-[var(--color-accent)] transition-colors font-medium py-3 border-b border-[var(--color-border-soft)] last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => { toggle(); setIsOpen(false); }}
                  className="text-sm text-muted hover:text-[var(--color-accent)] transition-colors"
                  aria-label="Trocar idioma"
                >
                  {lang === 'pt' ? '🇺🇸 English' : '🇧🇷 Português'}
                </button>
                <a
                  href="#contato"
                  className="ml-auto bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav_cta')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
