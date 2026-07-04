export type Lang = "pt" | "en";

/** Dicionário do site — copy aprovada do site anterior, adaptada ao HORIZONTE IV. */
export const DICT = {
  pt: {
    nav: { services: "Serviços", projects: "Projetos", about: "Sobre", contact: "Contato" },
    hero: {
      title1: "Enxergamos além",
      title2: "do horizonte.",
      subtitle:
        "Criamos inteligências artificiais, sistemas e sites que automatizam tarefas, organizam dados e fazem sua empresa render mais — sem complicação.",
      ctaPrimary: "Começar agora",
      ctaSecondary: "Ver projetos →",
      explore: "explore",
    },
    services: {
      eyebrow: "O que fazemos",
      title: "Três frentes, uma só missão: deixar seu negócio mais inteligente.",
      subtitle:
        "Da automação com IA ao site que conquista clientes, cuidamos da tecnologia para você focar no que importa.",
      items: [
        {
          title: "Inteligências Artificiais",
          desc: "Agentes e assistentes de IA que respondem clientes, organizam informações e automatizam tarefas repetitivas — treinados com o conhecimento do seu negócio.",
          bullets: ["Chatbots e assistentes virtuais", "Automação de processos com IA", "Análise inteligente de dados"],
        },
        {
          title: "Sistemas",
          desc: "Plataformas e painéis sob medida para gerenciar sua operação: dados em tempo real, controle de acessos e relatórios que cabem na palma da mão.",
          bullets: ["Dashboards e painéis de gestão", "Controle de acesso por perfil", "Integrações e relatórios"],
        },
        {
          title: "Sites",
          desc: "Sites e landing pages rápidos, bonitos e prontos para vender — otimizados para o Google e perfeitos no celular.",
          bullets: ["Sites institucionais e landing pages", "Otimização para o Google (SEO)", "Design responsivo e moderno"],
        },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Soluções que já estão no ar.",
      subtitle:
        "Alguns dos sistemas e plataformas que desenvolvemos para nossos clientes — operando onde errar não é opção.",
      items: [
        {
          category: "Sistema de gestão",
          title: "Controle de Empenhos",
          desc: "Plataforma para gestão e análise de empenhos, do pedido à entrega: dashboard com cruzamento de dados em tempo real, validação de terceirizados e acesso por perfil, seguro e auditável.",
          tags: ["Dashboard", "Tempo real", "Acesso por perfil"],
        },
        {
          category: "Inteligência Artificial",
          title: "Auditor Gênio",
          desc: "Assistente de IA que explora catálogos e produtos (reagentes, equipamentos e códigos comerciais) e responde perguntas com precisão, exportando resultados em PDF e documento.",
          tags: ["IA", "Busca inteligente", "Multi-cliente"],
        },
        {
          category: "Sistema de indicadores",
          title: "Plataforma de Excelência Médica",
          desc: "Painel de indicadores do corpo clínico para o setor de saúde: Índice de Excelência de 0 a 100 e acompanhamento de indicadores em tempo real, com acesso por perfil.",
          tags: ["Indicadores", "Saúde", "Tempo real"],
        },
      ],
    },
    about: {
      eyebrow: "Quem somos",
      title: "Tecnologia que trabalha por você.",
      p1: "A IV Soluções nasceu para aproximar pequenas e médias empresas, startups e profissionais do que há de mais moderno em tecnologia. Unimos inteligência artificial, desenvolvimento de sistemas e criação de sites em soluções práticas, feitas sob medida para o seu negócio.",
      p2: "Acreditamos que tecnologia boa é aquela que resolve um problema real e fica simples de usar. Por isso entendemos a fundo a sua operação antes de escrever uma linha de código — e entregamos algo que realmente faz diferença no dia a dia.",
      founders: "Fundada por",
      foundersTail: "— você fala direto com quem decide e constrói.",
      values: [
        { title: "Sob medida", desc: "Cada projeto é pensado para a sua realidade, não um modelo genérico." },
        { title: "Inteligência aplicada", desc: "Usamos IA onde ela gera valor de verdade: tempo e dinheiro economizados." },
        { title: "Parceria de verdade", desc: "Acompanhamos de perto, do primeiro contato até depois da entrega." },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Vamos deixar seu negócio mais inteligente?",
      subtitle:
        "Conte o que você precisa. Respondemos rápido e sem compromisso — a primeira conversa é por nossa conta.",
      whatsapp: "WhatsApp",
      whatsappNote: "Resposta rápida",
      email: "E-mail",
      emailNote: "Retorno no mesmo dia",
      hours: "Atendimento",
      hoursValue: "07h — 22h",
      hoursNote: "Todos os dias",
      defaultMessage:
        "Olá! Vim pelo site da IV Soluções e quero deixar meu negócio mais inteligente.",
    },
    footer: {
      tagline: "Inteligência artificial, sistemas e sites sob medida para o seu negócio.",
      nav: "Navegue",
      legal: "Legal",
      privacy: "Privacidade",
      privacyVillas: "Privacidade — Villas Park",
      instagram: "Instagram",
      madeBy: "Desenvolvido pela IV Soluções.",
    },
    chatbot: {
      label: "Fale com a IA",
      title: "Assistente IV",
      subtitle: "Pergunte sobre a IV Soluções",
      welcome:
        "Olá! 👋 Sou o assistente virtual da IV Soluções. Posso explicar nossos serviços de IA, sistemas e sites. Como posso ajudar?",
      placeholder: "Escreva sua pergunta...",
      send: "Enviar",
      open: "Abrir assistente",
      close: "Fechar assistente",
      error: "Tive um problema para responder agora. Que tal falar direto com o time no WhatsApp?",
      rate: "Você enviou muitas mensagens em pouco tempo. Aguarde um instante e tente de novo — ou chame no WhatsApp.",
      whatsappFallback: "Conversar no WhatsApp",
    },
  },
  en: {
    nav: { services: "Services", projects: "Projects", about: "About", contact: "Contact" },
    hero: {
      title1: "We see beyond",
      title2: "the horizon.",
      subtitle:
        "We build artificial intelligence, systems and websites that automate tasks, organize data and make your company more productive — without the hassle.",
      ctaPrimary: "Get started",
      ctaSecondary: "See projects →",
      explore: "explore",
    },
    services: {
      eyebrow: "What we do",
      title: "Three fronts, one mission: making your business smarter.",
      subtitle:
        "From AI automation to a website that wins clients, we handle the technology so you can focus on what matters.",
      items: [
        {
          title: "Artificial Intelligence",
          desc: "AI agents and assistants that answer customers, organize information and automate repetitive tasks — trained on your business knowledge.",
          bullets: ["Chatbots and virtual assistants", "AI-powered process automation", "Intelligent data analysis"],
        },
        {
          title: "Systems",
          desc: "Custom platforms and dashboards to manage your operation: real-time data, access control and reports in the palm of your hand.",
          bullets: ["Management dashboards", "Role-based access control", "Integrations and reports"],
        },
        {
          title: "Websites",
          desc: "Fast, beautiful websites and landing pages ready to sell — optimized for Google and perfect on mobile.",
          bullets: ["Company sites and landing pages", "Google optimization (SEO)", "Modern, responsive design"],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Solutions already live.",
      subtitle:
        "Some of the systems and platforms we built for our clients — running where failure is not an option.",
      items: [
        {
          category: "Management system",
          title: "Commitment Control",
          desc: "A platform to manage and analyze purchase commitments, from order to delivery: a dashboard with real-time data, third-party validation and secure, auditable role-based access.",
          tags: ["Dashboard", "Real-time", "Role-based access"],
        },
        {
          category: "Artificial Intelligence",
          title: "Genius Auditor",
          desc: "An AI assistant that explores catalogs and products (reagents, equipment and commercial codes) and answers questions accurately, exporting results to PDF and documents.",
          tags: ["AI", "Smart search", "Multi-client"],
        },
        {
          category: "Indicators system",
          title: "Medical Excellence Platform",
          desc: "A clinical-staff indicators panel for the healthcare sector: an Excellence Index from 0 to 100 with real-time, role-based tracking.",
          tags: ["Indicators", "Healthcare", "Real-time"],
        },
      ],
    },
    about: {
      eyebrow: "Who we are",
      title: "Technology that works for you.",
      p1: "IV Soluções was created to bring small and medium businesses, startups and professionals closer to the latest in technology. We combine artificial intelligence, software development and web design into practical, tailor-made solutions for your business.",
      p2: "We believe good technology solves a real problem and stays simple to use. That's why we deeply understand your operation before writing a single line of code — and deliver something that truly makes a difference every day.",
      founders: "Founded by",
      foundersTail: "— you talk directly to the people who decide and build.",
      values: [
        { title: "Tailor-made", desc: "Every project is built for your reality, never a generic template." },
        { title: "Applied intelligence", desc: "We use AI where it creates real value: time and money saved." },
        { title: "A real partnership", desc: "We stay close, from the first contact to long after delivery." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Shall we make your business smarter?",
      subtitle:
        "Tell us what you need. We reply fast and with no commitment — the first conversation is on us.",
      whatsapp: "WhatsApp",
      whatsappNote: "Fast reply",
      email: "Email",
      emailNote: "Same-day reply",
      hours: "Hours",
      hoursValue: "7am — 10pm",
      hoursNote: "Every day",
      defaultMessage:
        "Hi! I came from the IV Soluções website and would like to know more about your services.",
    },
    footer: {
      tagline: "Custom artificial intelligence, systems and websites for your business.",
      nav: "Navigate",
      legal: "Legal",
      privacy: "Privacy",
      privacyVillas: "Privacy — Villas Park",
      instagram: "Instagram",
      madeBy: "Built by IV Soluções.",
    },
    chatbot: {
      label: "Talk to our AI",
      title: "IV Assistant",
      subtitle: "Ask us anything about IV Soluções",
      welcome:
        "Hi! 👋 I'm IV Soluções' virtual assistant. I can explain our AI, systems and website services. How can I help?",
      placeholder: "Type your question...",
      send: "Send",
      open: "Open assistant",
      close: "Close assistant",
      error: "I had trouble answering right now. How about talking to the team directly on WhatsApp?",
      rate: "You've sent too many messages in a short time. Please wait a moment and try again — or reach us on WhatsApp.",
      whatsappFallback: "Chat on WhatsApp",
    },
  },
} as const;

export const WHATSAPP_NUMBER = "5531996715639";
export const WHATSAPP_DISPLAY = "(31) 99671-5639";
export const EMAIL = "victor-bh15@hotmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/iv.solucoes";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
