'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FAQS = [
  {
    q: 'Quanto tempo leva para desenvolver um chatbot com IA?',
    a: 'Geralmente entre 2 e 4 semanas, dependendo da complexidade, das integrações necessárias e do volume de treinamento do modelo. Projetos simples podem ser entregues em menos tempo.',
  },
  {
    q: 'Vocês atendem empresas de qual porte?',
    a: 'Atendemos desde startups e pequenos negócios até grandes corporações. Temos soluções escaláveis e adaptadas para cada tamanho e segmento de mercado.',
  },
  {
    q: 'Quais tecnologias de IA vocês utilizam?',
    a: 'Trabalhamos com as principais plataformas do mercado: Google Gemini, OpenAI GPT-4, Anthropic Claude, além de modelos open-source como Llama e Mistral, sempre escolhendo a melhor opção para cada caso.',
  },
  {
    q: 'É possível integrar a IA com meus sistemas existentes?',
    a: 'Sim! Somos especialistas em integração de APIs e podemos conectar sua solução de IA com CRMs, ERPs, e-commerce, WhatsApp Business, Slack, e praticamente qualquer plataforma com API.',
  },
  {
    q: 'Como funciona o suporte pós-entrega?',
    a: 'Oferecemos suporte 24h para questões críticas e manutenção contínua com SLA definido. Acompanhamos métricas de performance e fazemos ajustes proativos conforme o uso cresce.',
  },
  {
    q: 'Posso ver cases de sucesso antes de contratar?',
    a: 'Claro! Agende uma consultoria gratuita e apresentamos cases detalhados do nosso portfólio, incluindo métricas reais de ROI, redução de custos e aumento de produtividade dos projetos.',
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border border-[#1E1E1E] rounded-xl overflow-hidden hover:border-[#C8741A]/30 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 bg-[#111111] hover:bg-[#141414] transition-colors group"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className="text-[#F5F5F5] font-medium text-sm pr-4 group-hover:text-[#C8741A] transition-colors"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {q}
        </span>
        <span className="flex-shrink-0 text-[#C8741A]" aria-hidden="true">
          {open ? <Minus size={16} /> : <Plus size={16} />}
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
            <p className="px-5 py-4 text-[#8A8A8A] text-sm leading-relaxed bg-[#0E0E0E] border-t border-[#1A1A1A]">
              {a}
            </p>
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
    <section className="py-28 px-4 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t('faq_title')}
          </h2>
          <p className="text-[#8A8A8A] text-lg">{t('faq_subtitle')}</p>
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
