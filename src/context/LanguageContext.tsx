'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'pt' | 'en';

interface LanguageCtx {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  pt: {
    nav_services: 'Serviços',
    nav_process: 'Processo',
    nav_portfolio: 'Portfólio',
    nav_contact: 'Contato',
    nav_cta: 'Fale Conosco',
    hero_badge: 'IV Soluções em IA',
    hero_title: 'Transformamos sua ideia em uma solução de IA',
    hero_keyword: 'IA',
    hero_subtitle: 'A melhor maneira de pensar, interagir e agir.',
    hero_cta1: 'Ver Serviços',
    hero_cta2: 'Fale no WhatsApp',
    services_title: 'Nossos Serviços',
    services_subtitle: 'Soluções completas de IA para transformar seu negócio',
    svc1_title: 'Chatbots com IA',
    svc1_desc: 'Atendimento inteligente 24/7 com processamento de linguagem natural e respostas contextuais.',
    svc2_title: 'Automação de Processos',
    svc2_desc: 'Elimine tarefas repetitivas e otimize sua operação com fluxos inteligentes de IA.',
    svc3_title: 'Consultoria em IA',
    svc3_desc: 'Estratégia personalizada para implementar inteligência artificial no seu negócio.',
    svc4_title: 'Desenvolvimento de Sistemas',
    svc4_desc: 'Sistemas inteligentes sob medida para as necessidades específicas do seu negócio.',
    svc5_title: 'Integração de APIs',
    svc5_desc: 'Conecte ferramentas, plataformas e dados com inteligência artificial centralizada.',
    svc6_title: 'Treinamento de Equipes',
    svc6_desc: 'Capacite seu time para trabalhar com as melhores ferramentas e práticas de IA.',
    diff_title: 'Nossos Números',
    diff_subtitle: 'Resultados que comprovam nossa expertise',
    diff1_label: 'Projetos',
    diff2_label: 'Satisfação',
    diff3_label: 'Suporte',
    diff4_label: 'ROI Médio',
    process_title: 'Nosso Processo',
    process_subtitle: 'Como transformamos sua ideia em realidade',
    step1_title: 'Diagnóstico',
    step1_desc: 'Entendemos seu negócio e mapeamos oportunidades reais de IA.',
    step2_title: 'Estratégia',
    step2_desc: 'Criamos um plano personalizado e viável para sua solução.',
    step3_title: 'Desenvolvimento',
    step3_desc: 'Construímos, testamos e refinamos sua solução com rigor.',
    step4_title: 'Lançamento',
    step4_desc: 'Implantamos, monitoramos e garantimos os resultados.',
    portfolio_title: 'Portfólio',
    portfolio_subtitle: 'Projetos que transformamos em resultados',
    portfolio_btn: 'Ver mais',
    manifesto_label: 'Nossa Missão',
    manifesto_quote:
      'Acreditamos que a inteligência artificial deve ser acessível, ética e transformadora.',
    manifesto_signature: 'Inamar Miranda & Victor Andrade',
    contact_title: 'Entre em Contato',
    contact_subtitle: 'Pronto para transformar seu negócio com IA?',
    contact_name: 'Seu nome',
    contact_email: 'Seu e-mail',
    contact_message: 'Sua mensagem',
    contact_phone: 'Telefone',
    contact_name_placeholder: 'João Silva',
    contact_message_placeholder: 'Conte um pouco sobre o seu projeto...',
    contact_send: 'Enviar Mensagem',
    contact_whatsapp: 'Falar no WhatsApp',
    contact_or: 'ou',
    faq_title: 'Perguntas Frequentes',
    faq_subtitle: 'Tudo que você precisa saber antes de começar',
    footer_rights: '© 2025 IV Soluções em IA. Todos os direitos reservados.',
    footer_tagline: 'A melhor maneira de pensar, interagir e agir.',
    chat_title: 'Gênio IA',
    chat_subtitle: 'Assistente da IV Soluções',
    chat_placeholder: 'Digite sua mensagem...',
    chat_send: 'Enviar',
    chat_welcome:
      'Olá! Sou o Gênio, assistente virtual da IV Soluções em IA. Como posso ajudar você hoje?',
    chat_error: 'Desculpe, ocorreu um erro. Tente novamente.',
  },
  en: {
    nav_services: 'Services',
    nav_process: 'Process',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contact',
    nav_cta: 'Contact Us',
    hero_badge: 'IV Soluções em IA',
    hero_title: 'We transform your idea into an AI solution',
    hero_keyword: 'AI',
    hero_subtitle: 'The best way to think, interact, and act.',
    hero_cta1: 'View Services',
    hero_cta2: 'Chat on WhatsApp',
    services_title: 'Our Services',
    services_subtitle: 'Complete AI solutions to transform your business',
    svc1_title: 'AI Chatbots',
    svc1_desc: 'Intelligent 24/7 support with natural language processing and contextual responses.',
    svc2_title: 'Process Automation',
    svc2_desc: 'Eliminate repetitive tasks and optimize your operations with intelligent AI flows.',
    svc3_title: 'AI Consulting',
    svc3_desc: 'Personalized strategy to implement artificial intelligence in your business.',
    svc4_title: 'System Development',
    svc4_desc: 'Custom intelligent systems tailored to your specific business needs.',
    svc5_title: 'API Integration',
    svc5_desc: 'Connect tools, platforms, and data with centralized artificial intelligence.',
    svc6_title: 'Team Training',
    svc6_desc: 'Empower your team to work with the best AI tools and practices.',
    diff_title: 'Our Numbers',
    diff_subtitle: 'Results that prove our expertise',
    diff1_label: 'Projects',
    diff2_label: 'Satisfaction',
    diff3_label: 'Support',
    diff4_label: 'Average ROI',
    process_title: 'Our Process',
    process_subtitle: 'How we turn your idea into reality',
    step1_title: 'Diagnosis',
    step1_desc: 'We understand your business and map real AI opportunities.',
    step2_title: 'Strategy',
    step2_desc: 'We create a personalized, viable plan for your solution.',
    step3_title: 'Development',
    step3_desc: 'We build, test, and refine your solution with rigor.',
    step4_title: 'Launch',
    step4_desc: 'We deploy, monitor, and guarantee the results.',
    portfolio_title: 'Portfolio',
    portfolio_subtitle: 'Projects we transformed into results',
    portfolio_btn: 'View more',
    manifesto_label: 'Our Mission',
    manifesto_quote:
      'We believe artificial intelligence should be accessible, ethical, and transformative.',
    manifesto_signature: 'Inamar Miranda & Victor Andrade',
    contact_title: 'Get in Touch',
    contact_subtitle: 'Ready to transform your business with AI?',
    contact_name: 'Your name',
    contact_email: 'Your email',
    contact_message: 'Your message',
    contact_phone: 'Phone',
    contact_name_placeholder: 'John Smith',
    contact_message_placeholder: 'Tell us a little about your project...',
    contact_send: 'Send Message',
    contact_whatsapp: 'Chat on WhatsApp',
    contact_or: 'or',
    faq_title: 'FAQ',
    faq_subtitle: 'Everything you need to know before starting',
    footer_rights: '© 2025 IV Soluções em IA. All rights reserved.',
    footer_tagline: 'The best way to think, interact, and act.',
    chat_title: 'Genius AI',
    chat_subtitle: 'IV Soluções Assistant',
    chat_placeholder: 'Type your message...',
    chat_send: 'Send',
    chat_welcome:
      "Hello! I'm Genius, virtual assistant of IV Soluções em IA. How can I help you today?",
    chat_error: 'Sorry, an error occurred. Please try again.',
  },
};

const LanguageContext = createContext<LanguageCtx>({
  lang: 'pt',
  toggle: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');
  const toggle = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'));
  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
