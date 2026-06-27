'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FAQS = [
  {
    q: 'Quanto tempo leva para colocar uma solução de IA no ar?',
    a: 'Depende do escopo, mas projetos enxutos costumam ir ao ar em poucas semanas. No diagnóstico já te damos um prazo realista — sem promessa que não cabe.',
  },
  {
    q: 'Vocês atendem empresas de qual porte?',
    a: 'De pequenos negócios a operações maiores. Como tudo é sob medida, adaptamos o escopo (e o investimento) ao tamanho e ao momento da sua empresa.',
  },
  {
    q: 'Quais tecnologias de IA vocês utilizam?',
    a: 'Trabalhamos principalmente com Google Gemini e DeepSeek, em cross-correção (uma IA revisa a outra para reduzir erros), além de modelos open-source quando fazem sentido. Escolhemos a melhor opção para cada caso — não há um único modelo certo para tudo.',
  },
  {
    q: 'É possível integrar a IA com os sistemas que já uso?',
    a: 'Sim. Somos especialistas em integração via API e conectamos sua solução a CRMs, ERPs, planilhas, WhatsApp e praticamente qualquer plataforma com API disponível.',
  },
  {
    q: 'Como ficam a privacidade e a LGPD dos meus dados?',
    a: 'Tratamos privacidade desde o desenho do projeto, não como remendo no fim. Definimos o que é coletado, onde fica e quem acessa — alinhado à LGPD e ao tipo de dado do seu negócio.',
  },
  {
    q: 'E o suporte depois da entrega?',
    a: 'Não sumimos no lançamento. Acompanhamos, medimos resultados e evoluímos a solução, com suporte humano real e canais diretos com a equipe.',
  },
];

interface FAQItemProps {
  q: string;
  a: string;
  index: number;
  inView: boolean;
}

function FAQItem({ q, a, index, inView }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-card)] hover:border-[var(--color-accent)]/40 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-white/[0.02] transition-colors group gap-4"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-display text-ink font-medium text-[15px] group-hover:text-[var(--color-accent)] transition-colors">
          {q}
        </span>
        <span
          className={`flex-shrink-0 text-[var(--color-accent)] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <Plus size={18} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 px-5 bg-bg" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">{t('faq_title')}</h2>
          <p className="text-muted text-lg">{t('faq_subtitle')}</p>
        </motion.div>

        <div className="flex flex-col gap-3" role="list">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
