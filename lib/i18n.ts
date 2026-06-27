// Dicionário de traduções PT/EN. Edite os textos aqui — o site inteiro lê deste arquivo.

export type Lang = "pt" | "en";

export const dict = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      portfolio: "Projetos",
      blog: "Blog",
      contact: "Contato",
      cta: "Falar no WhatsApp",
    },
    hero: {
      badge: "Tecnologia • IA • Software sob medida",
      title: "Seu negócio, muito mais inteligente.",
      subtitle:
        "Criamos inteligências artificiais, sistemas e sites que automatizam tarefas, organizam dados e fazem sua empresa render mais — sem complicação.",
      ctaPrimary: "Começar agora",
      ctaSecondary: "Ver projetos",
      stat1: "Soluções sob medida",
      stat1label: "nada de modelo pronto",
      stat2: "IA aplicada",
      stat2label: "ao seu dia a dia",
      stat3: "Atendimento",
      stat3label: "07h às 22h",
    },
    about: {
      eyebrow: "Quem somos",
      title: "Tecnologia que trabalha por você",
      p1: "A IV Soluções nasceu para aproximar pequenas e médias empresas, startups e profissionais do que há de mais moderno em tecnologia. Unimos inteligência artificial, desenvolvimento de sistemas e criação de sites em soluções práticas, feitas sob medida para o seu negócio.",
      p2: "Acreditamos que tecnologia boa é aquela que resolve um problema real e fica simples de usar. Por isso entendemos a fundo a sua operação antes de escrever uma linha de código — e entregamos algo que realmente faz diferença no dia a dia.",
      values: [
        {
          title: "Sob medida",
          desc: "Cada projeto é pensado para a sua realidade, não um modelo genérico.",
        },
        {
          title: "Inteligência aplicada",
          desc: "Usamos IA onde ela gera valor de verdade: tempo e dinheiro economizados.",
        },
        {
          title: "Parceria de verdade",
          desc: "Acompanhamos de perto, do primeiro contato até depois da entrega.",
        },
      ],
      foundersTitle: "Fundadores",
      foundersDesc:
        "A IV Soluções é tocada de perto por quem a criou — você fala direto com quem decide e constrói.",
    },
    services: {
      eyebrow: "O que fazemos",
      title: "Três frentes, uma só missão: deixar seu negócio mais inteligente",
      subtitle:
        "Da automação com IA ao site que conquista clientes, cuidamos da tecnologia para você focar no que importa.",
      items: [
        {
          title: "Inteligências Artificiais",
          desc: "Agentes e assistentes de IA que respondem clientes, organizam informações e automatizam tarefas repetitivas — treinados com o conhecimento do seu negócio.",
          bullets: [
            "Chatbots e assistentes virtuais",
            "Automação de processos com IA",
            "Análise inteligente de dados",
          ],
        },
        {
          title: "Sistemas",
          desc: "Plataformas e painéis sob medida para gerenciar sua operação: dados em tempo real, controle de acessos e relatórios que cabem na palma da mão.",
          bullets: [
            "Dashboards e painéis de gestão",
            "Controle de acesso por perfil",
            "Integrações e relatórios",
          ],
        },
        {
          title: "Sites",
          desc: "Sites e landing pages rápidos, bonitos e prontos para vender — otimizados para o Google e perfeitos no celular.",
          bullets: [
            "Sites institucionais e landing pages",
            "Otimização para o Google (SEO)",
            "Design responsivo e moderno",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Veja em movimento",
      title: "A IV Soluções em 90 segundos",
      subtitle:
        "Um panorama rápido de como transformamos IA, sistemas e sites em resultado para o seu negócio.",
      play: "Assistir ao vídeo",
      soon: "Vídeo em breve",
      soonDesc: "Estamos finalizando nossa apresentação. Volte logo para conferir.",
      caption: "Apresentação institucional IV Soluções",
    },
    portfolio: {
      eyebrow: "Projetos",
      title: "Soluções que já estão no ar",
      subtitle:
        "Alguns dos sistemas e plataformas que desenvolvemos para nossos clientes.",
      visit: "Conhecer projeto",
      tagSystem: "Sistema",
      tagAI: "Inteligência Artificial",
      items: [
        {
          name: "Onmnia — Controle de Empenhos",
          category: "Sistema de gestão",
          desc: "Plataforma para gestão e análise de empenhos, do pedido à entrega: dashboard com cruzamento de dados em tempo real, validação de terceirizados e acesso por perfil, seguro e auditável.",
          tags: ["Dashboard", "Tempo real", "Acesso por perfil"],
        },
        {
          name: "Onmnia — Auditor Gênio",
          category: "Inteligência Artificial",
          desc: "Assistente de IA que explora catálogos e produtos (reagentes, equipamentos e códigos comerciais) e responde perguntas com precisão, exportando resultados em PDF e documento.",
          tags: ["IA", "Busca inteligente", "Multi-cliente"],
        },
        {
          name: "SIEM — Excelência Médica",
          category: "Sistema de indicadores",
          desc: "Sistema Integrado de Excelência Médica para a Rede Paulo de Tarso: painel do corpo clínico com Índice de Excelência Médica de 0 a 100 e acompanhamento de indicadores em tempo real por perfil.",
          tags: ["Indicadores", "Saúde", "Tempo real"],
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Vamos deixar seu negócio mais inteligente?",
      subtitle:
        "Conte o que você precisa. Respondemos rápido e sem compromisso — a primeira conversa é por nossa conta.",
      whatsappCta: "Conversar no WhatsApp",
      whatsappDesc: "Resposta rápida, das 07h às 22h",
      emailCta: "Enviar e-mail",
      emailLabel: "E-mail",
      hoursLabel: "Atendimento",
      hoursValue: "Todos os dias, das 07h às 22h",
      defaultMessage:
        "Olá! Vim pelo site da IV Soluções e gostaria de saber mais sobre os serviços de vocês.",
    },
    blog: {
      eyebrow: "Blog",
      title: "Estamos preparando algo especial",
      subtitle:
        "Em breve, conteúdos sobre inteligência artificial, tecnologia e como usar tudo isso para crescer. Volte logo!",
      badge: "Em construção",
      back: "Voltar para o início",
    },
    footer: {
      tagline: "Inteligência artificial, sistemas e sites sob medida para o seu negócio.",
      navTitle: "Navegação",
      contactTitle: "Contato",
      rights: "Todos os direitos reservados.",
      madeWith: "Desenvolvido pela IV Soluções",
    },
    chatbot: {
      title: "Assistente IV",
      subtitle: "Tire suas dúvidas sobre a IV Soluções",
      placeholder: "Escreva sua pergunta...",
      welcome:
        "Olá! 👋 Sou o assistente virtual da IV Soluções. Posso explicar nossos serviços de IA, sistemas e sites. Como posso ajudar?",
      send: "Enviar",
      error:
        "Tive um problema para responder agora. Que tal falar direto com a equipe no WhatsApp?",
      rate:
        "Você enviou muitas mensagens em pouco tempo. Aguarde um instante e tente de novo — ou fale direto no WhatsApp.",
      whatsappFallback: "Falar no WhatsApp",
      thinking: "Digitando...",
      open: "Abrir assistente",
      close: "Fechar assistente",
    },
    common: {
      langLabel: "Idioma",
      themeLight: "Tema claro",
      themeDark: "Tema escuro",
      skipToContent: "Pular para o conteúdo",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Projects",
      blog: "Blog",
      contact: "Contact",
      cta: "Chat on WhatsApp",
    },
    hero: {
      badge: "Technology • AI • Custom software",
      title: "Your business, far more intelligent.",
      subtitle:
        "We build artificial intelligence, systems and websites that automate tasks, organize data and make your company more productive — without the hassle.",
      ctaPrimary: "Get started",
      ctaSecondary: "See projects",
      stat1: "Tailor-made",
      stat1label: "no off-the-shelf templates",
      stat2: "Applied AI",
      stat2label: "in your daily routine",
      stat3: "Support",
      stat3label: "7am to 10pm",
    },
    about: {
      eyebrow: "Who we are",
      title: "Technology that works for you",
      p1: "IV Soluções was created to bring small and medium businesses, startups and professionals closer to the latest in technology. We combine artificial intelligence, software development and web design into practical, tailor-made solutions for your business.",
      p2: "We believe good technology solves a real problem and stays simple to use. That's why we deeply understand your operation before writing a single line of code — and deliver something that truly makes a difference every day.",
      values: [
        {
          title: "Tailor-made",
          desc: "Every project is built for your reality, never a generic template.",
        },
        {
          title: "Applied intelligence",
          desc: "We use AI where it creates real value: time and money saved.",
        },
        {
          title: "A real partnership",
          desc: "We stay close, from the first contact to long after delivery.",
        },
      ],
      foundersTitle: "Founders",
      foundersDesc:
        "IV Soluções is run hands-on by its founders — you talk directly to the people who decide and build.",
    },
    services: {
      eyebrow: "What we do",
      title: "Three fronts, one mission: making your business smarter",
      subtitle:
        "From AI automation to a website that wins clients, we handle the technology so you can focus on what matters.",
      items: [
        {
          title: "Artificial Intelligence",
          desc: "AI agents and assistants that answer customers, organize information and automate repetitive tasks — trained on your business knowledge.",
          bullets: [
            "Chatbots and virtual assistants",
            "AI-powered process automation",
            "Intelligent data analysis",
          ],
        },
        {
          title: "Systems",
          desc: "Custom platforms and dashboards to manage your operation: real-time data, access control and reports in the palm of your hand.",
          bullets: [
            "Management dashboards",
            "Role-based access control",
            "Integrations and reports",
          ],
        },
        {
          title: "Websites",
          desc: "Fast, beautiful websites and landing pages ready to sell — optimized for Google and perfect on mobile.",
          bullets: [
            "Company sites and landing pages",
            "Google optimization (SEO)",
            "Modern, responsive design",
          ],
        },
      ],
    },
    video: {
      eyebrow: "See it in motion",
      title: "IV Soluções in 90 seconds",
      subtitle:
        "A quick overview of how we turn AI, systems and websites into results for your business.",
      play: "Watch the video",
      soon: "Video coming soon",
      soonDesc: "We're finishing our presentation. Come back soon to watch it.",
      caption: "IV Soluções company overview",
    },
    portfolio: {
      eyebrow: "Projects",
      title: "Solutions already live",
      subtitle: "Some of the systems and platforms we built for our clients.",
      visit: "View project",
      tagSystem: "System",
      tagAI: "Artificial Intelligence",
      items: [
        {
          name: "Onmnia — Commitment Control",
          category: "Management system",
          desc: "A platform to manage and analyze purchase commitments, from order to delivery: a dashboard with real-time data, third-party validation and secure, auditable role-based access.",
          tags: ["Dashboard", "Real-time", "Role-based access"],
        },
        {
          name: "Onmnia — Genius Auditor",
          category: "Artificial Intelligence",
          desc: "An AI assistant that explores catalogs and products (reagents, equipment and commercial codes) and answers questions accurately, exporting results to PDF and documents.",
          tags: ["AI", "Smart search", "Multi-client"],
        },
        {
          name: "SIEM — Medical Excellence",
          category: "Indicators system",
          desc: "Integrated Medical Excellence System for Rede Paulo de Tarso: a clinical staff panel with a Medical Excellence Index from 0 to 100 and real-time, role-based indicator tracking.",
          tags: ["Indicators", "Healthcare", "Real-time"],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Shall we make your business smarter?",
      subtitle:
        "Tell us what you need. We reply fast and with no commitment — the first conversation is on us.",
      whatsappCta: "Chat on WhatsApp",
      whatsappDesc: "Fast reply, from 7am to 10pm",
      emailCta: "Send an email",
      emailLabel: "Email",
      hoursLabel: "Hours",
      hoursValue: "Every day, from 7am to 10pm",
      defaultMessage:
        "Hi! I came from the IV Soluções website and would like to know more about your services.",
    },
    blog: {
      eyebrow: "Blog",
      title: "We're preparing something special",
      subtitle:
        "Soon: content about artificial intelligence, technology and how to use it all to grow. Come back soon!",
      badge: "Under construction",
      back: "Back to home",
    },
    footer: {
      tagline: "Custom artificial intelligence, systems and websites for your business.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      rights: "All rights reserved.",
      madeWith: "Built by IV Soluções",
    },
    chatbot: {
      title: "IV Assistant",
      subtitle: "Ask us anything about IV Soluções",
      placeholder: "Type your question...",
      welcome:
        "Hi! 👋 I'm IV Soluções' virtual assistant. I can explain our AI, systems and website services. How can I help?",
      send: "Send",
      error:
        "I had trouble answering right now. How about talking to the team directly on WhatsApp?",
      rate:
        "You've sent too many messages in a short time. Please wait a moment and try again — or reach us on WhatsApp.",
      whatsappFallback: "Chat on WhatsApp",
      thinking: "Typing...",
      open: "Open assistant",
      close: "Close assistant",
    },
    common: {
      langLabel: "Language",
      themeLight: "Light theme",
      themeDark: "Dark theme",
      skipToContent: "Skip to content",
    },
  },
};

export type Dict = (typeof dict)["pt"];
