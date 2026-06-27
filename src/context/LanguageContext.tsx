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
    nav_services: 'Soluções',
    nav_process: 'Processo',
    nav_portfolio: 'Portfólio',
    nav_contact: 'Contato',
    nav_cta: 'Fale Conosco',

    hero_badge: 'Tecnologia • IA • Software sob medida',
    hero_line1: 'Seu negócio,',
    hero_line2: 'muito mais',
    hero_subtitle:
      'Criamos inteligências artificiais, sistemas e sites que automatizam tarefas, organizam seus dados e fazem sua empresa render mais — sem complicação.',
    hero_cta1: 'Ver soluções',
    hero_cta2: 'Falar no WhatsApp',
    hero_trust1: 'Projetos sob medida',
    hero_trust2: 'Conformidade LGPD',
    hero_trust3: 'Suporte humano real',
    hero_demo_role: 'Assistente da IV',
    hero_demo_q: 'Como a IA pode reduzir meu trabalho manual?',
    hero_demo_a:
      'Automatizando o atendimento, organizando seus dados e cuidando das tarefas repetitivas — você foca no que importa. Quer ver como?',
    hero_demo_placeholder: 'Pergunte ao IVY...',

    services_title: 'O que fazemos',
    services_subtitle: 'Soluções completas de IA e software para transformar a sua operação',
    svc1_title: 'Chatbots & Agentes de IA',
    svc1_desc: 'Atendimento inteligente 24/7 com linguagem natural, contexto e ação — não só respostas.',
    svc2_title: 'Automação de Processos',
    svc2_desc: 'Elimine tarefas repetitivas e ganhe horas da equipe com fluxos inteligentes ponta a ponta.',
    svc3_title: 'Sistemas sob Medida',
    svc3_desc: 'Plataformas, painéis e apps construídos para a realidade exata do seu negócio.',
    svc4_title: 'Sites & Plataformas Web',
    svc4_desc: 'Sites rápidos, modernos e que convertem — do institucional ao produto digital.',
    svc5_title: 'Integração de Dados & APIs',
    svc5_desc: 'Conecte ferramentas, bancos e plataformas com inteligência centralizada e segura.',
    svc6_title: 'Consultoria em IA',
    svc6_desc: 'Estratégia, viabilidade e roadmap para aplicar IA com retorno real no seu negócio.',

    diff_title: 'Por que a IV Soluções',
    diff_subtitle: 'O que nos torna diferentes',
    diff1_title: 'IA em cross-correção',
    diff1_desc: 'Usamos mais de um modelo (Gemini + DeepSeek), com uma IA revisando a outra para reduzir erros.',
    diff2_title: 'Sob medida, de verdade',
    diff2_desc: 'Nada de template engessado: cada solução é desenhada para o seu fluxo e seus dados.',
    diff3_title: 'LGPD desde o início',
    diff3_desc: 'Privacidade e segurança de dados consideradas no projeto, não como remendo no fim.',
    diff4_title: 'Parceria contínua',
    diff4_desc: 'Acompanhamos, medimos e evoluímos a solução depois da entrega — com suporte humano real.',

    process_title: 'Como trabalhamos',
    process_subtitle: 'Da ideia ao resultado, em um caminho claro',
    step1_title: 'Diagnóstico',
    step1_desc: 'Entendemos seu negócio e mapeamos oportunidades reais de IA e automação.',
    step2_title: 'Estratégia',
    step2_desc: 'Desenhamos um plano personalizado, viável e priorizado por retorno.',
    step3_title: 'Desenvolvimento',
    step3_desc: 'Construímos, testamos e refinamos a solução com rigor de engenharia.',
    step4_title: 'Lançamento',
    step4_desc: 'Implantamos, monitoramos e acompanhamos os resultados de perto.',

    portfolio_title: 'O que já construímos',
    portfolio_subtitle: 'Produtos e plataformas que tiram empresas do trabalho manual',
    portfolio_btn: 'Saber mais',

    manifesto_label: 'Nossa Missão',
    manifesto_quote:
      'Acreditamos que a inteligência artificial deve ser acessível, ética e transformadora — uma ferramenta a serviço de pessoas e negócios reais.',
    manifesto_signature: 'Inamar Miranda & Victor Andrade',

    contact_title: 'Vamos conversar',
    contact_subtitle: 'Pronto para transformar seu negócio com IA?',
    contact_name: 'Seu nome',
    contact_email: 'Seu e-mail',
    contact_message: 'Sua mensagem',
    contact_phone: 'Telefone',
    contact_name_placeholder: 'João Silva',
    contact_message_placeholder: 'Conte um pouco sobre o seu projeto...',
    contact_send: 'Enviar mensagem',
    contact_whatsapp: 'Falar no WhatsApp',
    contact_or: 'ou',

    faq_title: 'Perguntas frequentes',
    faq_subtitle: 'Tudo que você precisa saber antes de começar',

    footer_rights: '© 2026 IV Soluções em IA. Todos os direitos reservados.',
    footer_tagline: 'A melhor maneira de pensar, interagir e agir.',

    chat_title: 'IVY · Gênio da IV',
    chat_subtitle: 'Assistente da IV Soluções',
    chat_placeholder: 'Digite sua mensagem...',
    chat_send: 'Enviar',
    chat_welcome:
      'Olá! Sou o IVY, assistente virtual da IV Soluções em IA. Como posso ajudar você hoje?',
    chat_error: 'Desculpe, ocorreu um erro. Tente novamente.',
  },
  en: {
    nav_services: 'Solutions',
    nav_process: 'Process',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contact',
    nav_cta: 'Contact Us',

    hero_badge: 'Technology • AI • Custom software',
    hero_line1: 'Your business,',
    hero_line2: 'far more',
    hero_subtitle:
      'We build AI, systems and websites that automate tasks, organize your data and make your company perform better — without the hassle.',
    hero_cta1: 'See solutions',
    hero_cta2: 'Chat on WhatsApp',
    hero_trust1: 'Tailor-made projects',
    hero_trust2: 'LGPD compliant',
    hero_trust3: 'Real human support',
    hero_demo_role: 'IV Assistant',
    hero_demo_q: 'How can AI reduce my manual work?',
    hero_demo_a:
      'By automating support, organizing your data and handling repetitive tasks — so you focus on what matters. Want to see how?',
    hero_demo_placeholder: 'Ask IVY...',

    services_title: 'What we do',
    services_subtitle: 'Complete AI and software solutions to transform your operation',
    svc1_title: 'AI Chatbots & Agents',
    svc1_desc: 'Intelligent 24/7 support with natural language, context and action — not just replies.',
    svc2_title: 'Process Automation',
    svc2_desc: 'Eliminate repetitive tasks and free up your team with end-to-end intelligent flows.',
    svc3_title: 'Custom Systems',
    svc3_desc: 'Platforms, dashboards and apps built for the exact reality of your business.',
    svc4_title: 'Websites & Web Platforms',
    svc4_desc: 'Fast, modern websites that convert — from institutional to digital product.',
    svc5_title: 'Data & API Integration',
    svc5_desc: 'Connect tools, databases and platforms with centralized, secure intelligence.',
    svc6_title: 'AI Consulting',
    svc6_desc: 'Strategy, feasibility and roadmap to apply AI with real return for your business.',

    diff_title: 'Why IV Soluções',
    diff_subtitle: 'What makes us different',
    diff1_title: 'Cross-checked AI',
    diff1_desc: 'We use more than one model (Gemini + DeepSeek), with one AI reviewing the other to reduce errors.',
    diff2_title: 'Truly tailor-made',
    diff2_desc: 'No rigid templates: each solution is designed for your workflow and your data.',
    diff3_title: 'Privacy from day one',
    diff3_desc: 'Data privacy and security considered in the design, not patched at the end.',
    diff4_title: 'Ongoing partnership',
    diff4_desc: 'We monitor, measure and evolve the solution after launch — with real human support.',

    process_title: 'How we work',
    process_subtitle: 'From idea to result, on a clear path',
    step1_title: 'Diagnosis',
    step1_desc: 'We understand your business and map real AI and automation opportunities.',
    step2_title: 'Strategy',
    step2_desc: 'We design a personalized, viable plan prioritized by return.',
    step3_title: 'Development',
    step3_desc: 'We build, test and refine the solution with engineering rigor.',
    step4_title: 'Launch',
    step4_desc: 'We deploy, monitor and follow the results closely.',

    portfolio_title: 'What we have built',
    portfolio_subtitle: 'Products and platforms that move companies out of manual work',
    portfolio_btn: 'Learn more',

    manifesto_label: 'Our Mission',
    manifesto_quote:
      'We believe artificial intelligence should be accessible, ethical and transformative — a tool at the service of real people and businesses.',
    manifesto_signature: 'Inamar Miranda & Victor Andrade',

    contact_title: "Let's talk",
    contact_subtitle: 'Ready to transform your business with AI?',
    contact_name: 'Your name',
    contact_email: 'Your email',
    contact_message: 'Your message',
    contact_phone: 'Phone',
    contact_name_placeholder: 'John Smith',
    contact_message_placeholder: 'Tell us a little about your project...',
    contact_send: 'Send message',
    contact_whatsapp: 'Chat on WhatsApp',
    contact_or: 'or',

    faq_title: 'FAQ',
    faq_subtitle: 'Everything you need to know before starting',

    footer_rights: '© 2026 IV Soluções em IA. All rights reserved.',
    footer_tagline: 'The best way to think, interact, and act.',

    chat_title: 'IVY · IV Genius',
    chat_subtitle: 'IV Soluções Assistant',
    chat_placeholder: 'Type your message...',
    chat_send: 'Send',
    chat_welcome:
      "Hello! I'm IVY, virtual assistant of IV Soluções em IA. How can I help you today?",
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
