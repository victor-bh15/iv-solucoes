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
    window.addEventListener('scroll', onScroll);
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
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="logo-wrapper" aria-label="IV Soluções em IA — Início">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 20px #C8741A)' }}
          >
            <Image
              src="/Logo.png"
              alt="IV Soluções em IA"
              width={90}
              height={56}
              priority
              className="object-contain"
            />
          </motion.div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#F5F5F5] hover:text-[#C8741A] transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label={`Trocar idioma para ${lang === 'pt' ? 'inglês' : 'português'}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-[#2A2A2A] hover:border-[#C8741A] text-[#8A8A8A] hover:text-[#C8741A] transition-all duration-200"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <a
            href="#contato"
            className="bg-[#C8741A] hover:bg-[#E8840A] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-md shadow-[#C8741A]/20"
          >
            {t('nav_cta')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#F5F5F5] p-1"
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
            className="md:hidden bg-[#0D0D0D] border-t border-[#1E1E1E]"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#F5F5F5] hover:text-[#C8741A] transition-colors font-medium py-3 border-b border-[#1A1A1A] last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => { toggle(); setIsOpen(false); }}
                  className="text-sm text-[#8A8A8A] hover:text-[#C8741A] transition-colors"
                  aria-label="Trocar idioma"
                >
                  {lang === 'pt' ? '🇺🇸 English' : '🇧🇷 Português'}
                </button>
                <a
                  href="#contato"
                  className="ml-auto bg-[#C8741A] hover:bg-[#E8840A] text-white text-sm font-medium px-5 py-2.5 rounded-lg"
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
