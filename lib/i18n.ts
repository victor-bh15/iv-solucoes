export type Lang = "pt" | "en";

/** Dicionário do site — copy do IV Soluções v3 (site de empresa, não landing page). */
export const DICT = {
  pt: {
    nav: {
      solutions: "Soluções",
      method: "Método",
      about: "Sobre",
      contact: "Contato",
      seguranca: "Segurança & LGPD",
      cta: "Falar no WhatsApp",
    },
    hero: {
      title: "Software sob medida que chega à produção.",
      subtitle:
        "IA, sistemas e sites para saúde, condomínios e setor público — diagnóstico, construção e auditoria dupla antes de cada entrega.",
      ctaPrimary: "Falar no WhatsApp",
      ctaSecondary: "Ver soluções",
      panel: {
        eyebrow: "Índice de Excelência",
        score: "94",
        range: "0 – 100",
        percent: 94,
        caption: "Conceito do painel de indicadores do corpo clínico — ver case completo abaixo.",
      },
    },
    proof: {
      eyebrow: "Em números",
      items: [
        { value: "5", label: "sistemas sob medida" },
        { value: "3", label: "setores atendidos — saúde, condomínios e setor público" },
        { value: "07h–22h", label: "atendimento direto, todos os dias" },
      ],
    },
    solutions: {
      eyebrow: "Soluções",
      title: "Cinco frentes de produto, descritas pelo que fazem.",
      viewAllEyebrow: "Catálogo completo",
      viewAll: "Ver todas as soluções",
      items: [
        {
          slug: "saude-excelencia-clinica",
          category: "Saúde",
          title: "Excelência Clínica",
          desc: "Painel de indicadores do corpo clínico com Índice de Excelência de 0 a 100, acompanhamento em tempo real e acesso por perfil.",
        },
        {
          slug: "condominios",
          category: "Condomínios",
          title: "Gestão de Condomínios",
          desc: "Plataforma de gestão de condomínio: comunicação com moradores, controle de acesso e informações centralizadas, com acesso por perfil (síndico, portaria, morador).",
        },
        {
          slug: "setor-publico-licitacoes",
          category: "Setor Público",
          title: "Empenhos & Licitações",
          desc: "Gestão e análise de empenhos, do pedido à entrega: dashboard com cruzamento de dados em tempo real, validação de terceirizados e acesso por perfil, seguro e auditável.",
        },
        {
          slug: "ponto-escalas",
          category: "Saúde",
          title: "Ponto & Escalas",
          desc: "Aplicativo de ponto e escalas para equipes de saúde: registro por selfie e geolocalização apenas no momento do registro, com gestão de escala centralizada.",
        },
        {
          slug: "ia-aplicada-rag",
          category: "IA aplicada",
          title: "IA aplicada & RAG",
          desc: "Assistentes de IA que exploram catálogos e bases de conhecimento do seu negócio e respondem com precisão, com exportação de resultados em PDF e documento.",
        },
      ],
    },
    case: {
      eyebrow: "Case",
      category: "Saúde — indicadores do corpo clínico",
      title: "Um índice único para medir excelência clínica em tempo real.",
      problem: {
        label: "Problema",
        text: "Acompanhar o desempenho do corpo clínico dependia de relatório manual, sem visão consolidada por papel.",
      },
      solution: {
        label: "Solução",
        text: "Painel com Índice de Excelência de 0 a 100, indicadores em tempo real e acesso segmentado por perfil (gestor, coordenador, profissional).",
      },
      result: {
        label: "Resultado",
        text: "Cada papel vê exatamente o que precisa, com dado atualizado em tempo real — sem planilha nem relatório manual.",
      },
    },
    method: {
      eyebrow: "Método",
      title: "Autoridade verificável, não adjetivo.",
      subtitle: "Todo sistema segue o mesmo pipeline, do diagnóstico à operação.",
      steps: [
        { n: "01", title: "Diagnóstico", desc: "Mapeamos o problema real antes de escrever uma linha de código." },
        { n: "02", title: "Construção", desc: "Time dedicado constrói com critério verificável a cada entrega." },
        { n: "03", title: "Auditoria dupla", desc: "Toda mudança passa por auditoria independente de lógica e de interface antes do merge." },
        { n: "04", title: "Segurança & LGPD", desc: "Segredo em cofre, acesso por perfil e conformidade LGPD desde o desenho." },
      ],
      linkMethod: "Ver o método completo",
      linkSecurity: "Ver segurança",
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
      instagram: "Instagram",
      instagramNote: "Fale com a gente por lá",
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
      instagram: "Instagram",
      rights: "Todos os direitos reservados.",
    },
    chatbot: {
      label: "Fale com a Ivy",
      title: "Ivy",
      subtitle: "Pergunte sobre a IV Soluções",
      welcome:
        "Olá! 👋 Sou a Ivy, assistente virtual da IV Soluções. Posso explicar nossos serviços de IA, sistemas e sites. Como posso ajudar?",
      placeholder: "Escreva sua pergunta...",
      send: "Enviar",
      open: "Abrir assistente",
      close: "Fechar assistente",
      error: "Tive um problema para responder agora. Que tal falar direto com o time no WhatsApp?",
      rate: "Você enviou muitas mensagens em pouco tempo. Aguarde um instante e tente de novo — ou chame no WhatsApp.",
      whatsappFallback: "Conversar no WhatsApp",
    },
    solutionsIndex: {
      meta: {
        title: "Soluções",
        description: "As cinco frentes de produto da IV Soluções, descritas pelo que fazem — sem nome de cliente.",
      },
      eyebrow: "Soluções",
      title: "O que construímos.",
      subtitle: "Cinco frentes de produto, descritas pelo que fazem — sem nome de cliente.",
    },
    solutionPages: {
      labels: {
        problem: "Problema",
        delivers: "O que a IV entrega",
        how: "Como funciona",
        result: "Resultado",
        back: "← Todas as soluções",
      },
      items: {
        "saude-excelencia-clinica": {
          meta: { title: "Excelência Clínica — IV Soluções" },
          headline: "Um índice único para medir excelência clínica em tempo real.",
          problem:
            "Acompanhar o desempenho do corpo clínico dependia de relatório manual, sem visão consolidada por papel.",
          delivers:
            "Painel com Índice de Excelência de 0 a 100, indicadores em tempo real e acesso segmentado por perfil (gestor, coordenador, profissional).",
          how: "Cada papel entra com seu perfil e vê só os indicadores que competem à sua função; o índice é recalculado com o dado mais recente.",
          result:
            "Em produção com cliente real do setor de saúde. Cada papel vê exatamente o que precisa, com dado atualizado em tempo real — sem planilha nem relatório manual.",
          ctaMessage: "Olá! Vim pela página de Excelência Clínica e quero saber mais sobre esse sistema.",
        },
        condominios: {
          meta: { title: "Gestão de Condomínios — IV Soluções" },
          headline: "Um canal único para síndico, portaria e morador — cada um vendo só o que precisa.",
          problem:
            "Comunicação e controle de acesso de condomínio ficam espalhados entre grupo de mensagem, papel e planilha, sem um lugar único por papel.",
          delivers:
            "Plataforma de gestão de condomínio: comunicação com moradores, controle de acesso e informações centralizadas, com acesso por perfil (síndico, portaria, morador).",
          how: "Síndico, portaria e morador entram com o perfil próprio; cada um vê e faz só o que cabe ao seu papel, em um único sistema.",
          result:
            "Em produção em condomínio real. Comunicação e acesso centralizados em um canal único, por perfil — sem depender de grupo de mensagem ou planilha paralela.",
          ctaMessage: "Olá! Vim pela página de Gestão de Condomínios e quero saber mais sobre esse sistema.",
        },
        "setor-publico-licitacoes": {
          meta: { title: "Empenhos & Licitações — IV Soluções" },
          headline: "Do pedido à entrega, com trilha de auditoria em cada etapa.",
          problem:
            "O processo de empenho tradicionalmente fica disperso entre planilhas paralelas, sem cruzamento de dados nem validação formal de terceirizados.",
          delivers:
            "Sistema de gestão e análise de empenhos, do pedido à entrega, com dashboard em tempo real, validação de terceirizados e acesso por perfil seguro e auditável.",
          how: "O dashboard cruza os dados em tempo real do pedido à entrega; cada perfil (gestor, terceirizado, auditor) acessa só o que compete à sua função, com registro auditável.",
          result:
            "Em produção no setor público. Processo auditável do pedido à entrega, com validação de terceirizado embutida e acesso por perfil — sem planilha paralela.",
          ctaMessage: "Olá! Vim pela página de Empenhos & Licitações e quero saber mais sobre esse sistema.",
        },
        "ponto-escalas": {
          meta: { title: "Ponto & Escalas — IV Soluções" },
          headline: "Ponto e escala centralizados, com prova de presença no momento certo.",
          problem:
            "Ponto e escala de equipes de saúde costumam ficar divididos entre papel, planilha e aplicativo genérico, sem geolocalização real do registro.",
          delivers:
            "Aplicativo de ponto e escalas desenvolvido sob medida para equipes de saúde: registro por selfie e geolocalização apenas no momento do registro, com gestão de escala centralizada.",
          how: "O profissional registra o ponto com selfie; a geolocalização é capturada só naquele instante (sem rastreamento contínuo); o gestor centraliza e ajusta as escalas em um painel único.",
          result:
            "Sistema desenvolvido sob medida, pronto para centralizar ponto e escala de qualquer equipe de plantão, com prova de presença por geolocalização pontual.",
          ctaMessage: "Olá! Vim pela página de Ponto & Escalas e quero saber mais sobre esse sistema.",
        },
        "ia-aplicada-rag": {
          meta: { title: "IA aplicada & RAG — IV Soluções" },
          headline: "A IA responde com o dado real do seu negócio — não com conhecimento genérico.",
          problem:
            'Encontrar informação em catálogo ou base de conhecimento grande depende de busca manual ou de perguntar direto a quem "sabe".',
          delivers:
            "Assistente de IA que explora catálogos e bases de conhecimento do negócio e responde com precisão, com exportação de resultados em PDF e documento.",
          how: "A IA consulta a base de conhecimento ou catálogo do cliente antes de responder (busca aumentada por recuperação) — a resposta é ancorada no dado real do negócio, e o resultado sai em PDF ou documento.",
          result:
            "Assistente desenvolvido sob medida, pronto para reduzir o tempo de busca em catálogo ou base de conhecimento.",
          ctaMessage: "Olá! Vim pela página de IA aplicada & RAG e quero saber mais sobre esse sistema.",
        },
      },
    },
    methodPage: {
      meta: {
        title: "Método — IV Soluções",
        description: "O pipeline da IV Soluções: diagnóstico, construção, auditoria dupla e segurança por padrão.",
      },
      eyebrow: "Método",
      title: "Autoridade verificável, não adjetivo.",
      subtitle: "Todo sistema segue o mesmo pipeline, do diagnóstico à operação.",
      steps: [
        {
          n: "01",
          title: "Diagnóstico",
          desc: "Mapeamos o problema real do setor antes de escrever uma linha de código: quem usa o sistema, qual decisão ele precisa tomar e qual dado hoje é manual ou disperso.",
        },
        {
          n: "02",
          title: "Construção",
          desc: "Time dedicado constrói com critério verificável a cada entrega — nada é considerado pronto sem um teste objetivo passando.",
        },
        {
          n: "03",
          title: "Auditoria dupla",
          desc: "Toda mudança passa por auditoria independente de lógica e de interface antes do merge — quem constrói não é quem audita, e o achado é corrigido antes de qualquer entrega.",
        },
        {
          n: "04",
          title: "Segurança & LGPD",
          desc: "Segredo em cofre (nunca em código), acesso por perfil e conformidade com a LGPD desde o desenho — não como ajuste de última hora.",
        },
      ],
      whyTitle: "Por que o rigor é diferencial",
      whyText:
        "A maioria dos sistemas sob medida não tem uma segunda pessoa olhando o código antes de ir ao ar. Na IV, quem constrói e quem audita são papéis separados, sempre — a auditoria independente de lógica e de interface acontece antes de cada merge, não depois que o problema aparece em produção.",
      linkSecurity: "Ver segurança",
    },
    aboutPage: {
      meta: {
        title: "Sobre — IV Soluções",
        description: "Quem constrói a IV Soluções: origem, missão e os fundadores.",
      },
      eyebrow: "Sobre",
      title: "Quem constrói.",
      originText:
        "A IV Soluções nasceu para colocar Inteligência Artificial, sistemas e sites sob medida ao alcance de quem normalmente fica de fora deles: pequenas e médias empresas, startups, profissionais autônomos e consumidor final.",
      missionLabel: "Missão",
      missionText:
        '"Seu negócio, muito mais inteligente." — tecnologia sob medida, entregue com o mesmo rigor de auditoria em todo projeto, não só nos maiores.',
      foundersLabel: "Fundadores",
      founders: [
        { name: "Victor Guilherme", role: "Fundador" },
        { name: "Inamar Miranda", role: "Sócio" },
      ],
      foundersText:
        "O time fala direto com quem decide e constrói cada sistema — sem camada de atendimento entre o cliente e quem entende do projeto.",
      valuesLabel: "Valores",
      values: [
        {
          text: "Lealdade: dizemos a verdade sobre prazo, risco e limitação do sistema — mesmo quando não é a resposta mais confortável.",
        },
        {
          text: "Rigor: nenhuma entrega vai ao ar sem auditoria independente de lógica e de interface.",
        },
        {
          text: "Segurança: segredo em cofre, acesso por perfil e LGPD desde o desenho — não como reação a incidente.",
        },
      ],
    },
    contactPage: {
      meta: {
        title: "Contato — IV Soluções",
        description: "Fale com a IV Soluções por WhatsApp, e-mail ou Instagram — atendimento das 07h às 22h, todos os dias.",
      },
    },
    seguranca: {
      meta: {
        title: "Segurança & LGPD",
        description:
          "Como a IV Soluções protege dados pessoais e sensíveis: controle de acesso, trilha de auditoria e conformidade com a LGPD.",
      },
      hero: {
        eyebrow: "Segurança & LGPD",
        title: "Como protegemos os dados que você confia a nós.",
        subtitle:
          "Trabalhamos com organizações de saúde, direito e setor público — áreas onde um dado fora do lugar tem consequência real. Esta página explica, sem promessas vazias, o que fazemos hoje para proteger informação pessoal e sensível.",
      },
      compromisso: {
        title: "Compromisso com a privacidade",
        body: "Tratamos dado pessoal como responsabilidade, não como recurso. Os sistemas que construímos — para clínicas, condomínios, escritórios e órgãos públicos — nascem com controle de acesso, registro de uso e minimização como parte do desenho, não como reforço depois de pronto. Isso não significa que somos infalíveis: significa que sabemos exatamente o que tratamos, por quê, e como está protegido — e dizemos aqui só o que de fato praticamos.",
      },
      protecao: {
        title: "Como protegemos os dados",
        intro: "Medidas técnicas e organizacionais que aplicamos nos sistemas que desenvolvemos e operamos:",
        items: [
          {
            title: "Acesso por perfil",
            desc: "Cada pessoa vê só o que sua função exige. Perfis definem o que é lido, editado ou exportado — sem acesso genérico de administrador para tarefas do dia a dia.",
          },
          {
            title: "Controle em nível de linha (RLS)",
            desc: "Nos bancos de dados que sustentam nossos sistemas, o próprio banco aplica a regra de acesso — não só a tela. Isso reduz o risco de um erro de programação expor dado de quem não deveria ver.",
          },
          {
            title: "Trilha de auditoria",
            desc: "Sistemas que tratam dado sensível registram quem acessou ou alterou o quê, e quando — sem gravar o próprio dado sensível dentro do registro de auditoria.",
          },
          {
            title: "Segredos fora do código",
            desc: "Senhas, chaves e tokens de acesso ficam em cofre e variáveis de ambiente protegidas — nunca escritos no código-fonte.",
          },
          {
            title: "Conexão cifrada",
            desc: "Todo tráfego entre você e nossos sistemas viaja por conexão criptografada (HTTPS/TLS).",
          },
          {
            title: "Revisão antes de qualquer mudança",
            desc: "Nenhuma alteração de código entra em produção sem passar por uma revisão técnica independente da pessoa que a escreveu.",
          },
          {
            title: "Backup",
            desc: "Mantemos rotina de backup dos bancos de dados, com frequência maior nos sistemas que tratam dado sensível.",
          },
        ],
        iaNota:
          "Quando um assistente de IA responde por aqui, o texto enviado é processado por um provedor de IA (Google Gemini e/ou DeepSeek), o que pode envolver transferência internacional de dados (art. 33 da LGPD) para servidores fora do Brasil; esse envio é regido pelos acordos de tratamento de dados (DPA) e cláusulas contratuais de cada provedor. Por isso, pedimos que você não envie dado sensível ou confidencial pelo chat.",
      },
      lgpd: {
        title: "Conformidade com a LGPD",
        body: "Seguimos a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Na maioria dos projetos que desenvolvemos, atuamos como operadores (art. 5º, VII e art. 39 da LGPD): tratamos dado pessoal em nome do cliente, que é o controlador (art. 5º, VI) e a quem cabe definir a finalidade e a base legal do tratamento sobre o dado dos seus próprios usuários, moradores ou pacientes. A IV Soluções opera estritamente segundo as instruções e a base legal definidas pelo controlador — não decide, por conta própria, o que tratar nem por qual motivo. Antes de iniciar qualquer tratamento, mapeamos com o cliente os dois papéis e buscamos formalizar essa relação em contrato específico (contrato de operador/DPA); a IV Soluções não responde por decisão de tratamento, finalidade ou base legal definida incorretamente pelo cliente-controlador — essa responsabilidade é dele.",
        direitos: {
          title: "Seus direitos como titular de dados",
          intro: "Conforme o art. 18 da LGPD, você pode solicitar, a qualquer momento:",
          bullets: [
            "Confirmação de que tratamos seu dado, e acesso a ele",
            "Correção de dado incompleto, inexato ou desatualizado",
            "Anonimização, bloqueio ou eliminação de dado desnecessário ou excessivo",
            "Portabilidade a outro fornecedor, quando aplicável",
            "Eliminação do dado tratado com base no seu consentimento",
            "Informação sobre com quem compartilhamos seu dado",
            "Revogação do consentimento, quando essa for a base legal",
          ],
          cta: "Para dados que a IV Soluções trata como operadora — de pacientes, moradores ou usuários de um sistema que construímos para um cliente —, esses direitos são exercidos junto ao cliente (controlador), responsável pela decisão sobre o tratamento; a IV Soluções auxilia o cliente no atendimento, mas não decide o pedido. Quando a IV Soluções é a própria controladora do dado — como o de visitantes e leads deste site —, fale diretamente com o nosso encarregado.",
        },
        incidente: {
          title: "Se algo der errado",
          body: "Se identificarmos um incidente de segurança envolvendo dado que tratamos em nome de um cliente (controlador), comunicamos o cliente sem demora — cabe a ele, como controlador, decidir e executar a comunicação à Autoridade Nacional de Proteção de Dados (ANPD) e aos titulares afetados, nos prazos e termos do art. 48 da LGPD e da regulamentação da ANPD. Quando a IV Soluções é a própria controladora do dado — por exemplo, dos visitantes deste site —, é ela quem comunica diretamente a ANPD e os titulares, seguindo o mesmo prazo e critério. Nenhum sistema é imune a incidentes — o que assumimos como compromisso é agir com transparência e sem demora, em qualquer um dos dois papéis.",
        },
      },
      saude: {
        title: "Dados sensíveis de saúde",
        body: "Alguns dos sistemas que desenvolvemos operam no setor de saúde e podem tratar dado de saúde — que a LGPD classifica como dado pessoal sensível (art. 11). Tratamos esse tipo de dado com rigor adicional: só o necessário para a finalidade declarada (por exemplo, gestão de escala ou indicadores clínicos), com base legal específica, acesso restrito por perfil e trilha de auditoria. Nome de profissional de saúde é dado comum; prontuário, evento clínico ou informação de saúde de paciente é dado sensível — e recebe peso diferente na nossa análise. Um exemplo concreto: no aplicativo de ponto eletrônico que desenvolvemos para equipes de saúde, o registro biométrico facial usado para confirmar identidade é apagado assim que deixa de ser necessário para essa finalidade, conforme o prazo de retenção definido pelo cliente-controlador — que pode considerar, inclusive, prazos de guarda probatória trabalhista aplicáveis ao seu setor; mantém-se apenas o registro do ponto em si.",
      },
      encarregado: {
        title: "Fale com o encarregado de dados",
        body: "Dúvidas, solicitações sobre seus dados ou preocupações de segurança podem ser enviadas diretamente ao nosso encarregado (DPO), conforme o art. 41 da LGPD. Se o seu pedido for sobre um dado tratado por um sistema que construímos para um cliente — por exemplo, de paciente ou morador —, o encarregado te orienta e direciona ao controlador responsável, a quem cabe atender e decidir a solicitação.",
        emailLabel: "E-mail",
        cta: "Entrar em contato",
      },
      disclaimer: {
        body: "As práticas descritas aqui refletem o que aplicamos hoje e evoluem conforme nossos sistemas crescem. Esta página não constitui parecer jurídico nem garante imunidade a incidentes de segurança — representa nosso compromisso contínuo com a proteção de dados.",
      },
    },
  },
  en: {
    nav: {
      solutions: "Solutions",
      method: "Method",
      about: "About",
      contact: "Contact",
      seguranca: "Security & Data Protection",
      cta: "Chat on WhatsApp",
    },
    hero: {
      title: "Custom software that reaches production.",
      subtitle:
        "AI, systems and websites for healthcare, condominiums and the public sector — diagnosis, construction and dual audit before every release.",
      ctaPrimary: "Chat on WhatsApp",
      ctaSecondary: "See solutions",
      panel: {
        eyebrow: "Excellence Index",
        score: "94",
        range: "0 – 100",
        percent: 94,
        caption: "Concept from our clinical-staff indicators panel — see the full case below.",
      },
    },
    proof: {
      eyebrow: "By the numbers",
      items: [
        { value: "5", label: "custom systems delivered" },
        { value: "3", label: "sectors served — healthcare, condominiums and public sector" },
        { value: "07am–10pm", label: "direct support, every day" },
      ],
    },
    solutions: {
      eyebrow: "Solutions",
      title: "Five product lines, described by what they do.",
      viewAllEyebrow: "Full catalog",
      viewAll: "See all solutions",
      items: [
        {
          slug: "saude-excelencia-clinica",
          category: "Healthcare",
          title: "Clinical Excellence",
          desc: "A clinical-staff indicators panel with an Excellence Index from 0 to 100, real-time tracking and role-based access.",
        },
        {
          slug: "condominios",
          category: "Condominiums",
          title: "Condominium Management",
          desc: "A condominium management platform: resident communication, access control and centralized information, with role-based access (manager, front desk, resident).",
        },
        {
          slug: "setor-publico-licitacoes",
          category: "Public Sector",
          title: "Commitments & Procurement",
          desc: "Management and analysis of purchase commitments, from order to delivery: a dashboard with real-time data, third-party validation and secure, auditable role-based access.",
        },
        {
          slug: "ponto-escalas",
          category: "Healthcare",
          title: "Time & Shift Tracking",
          desc: "A time-and-shift app for healthcare teams: selfie and geolocation captured only at check-in, with centralized shift management.",
        },
        {
          slug: "ia-aplicada-rag",
          category: "Applied AI",
          title: "Applied AI & RAG",
          desc: "AI assistants that explore your business catalogs and knowledge base and answer accurately, exporting results to PDF and documents.",
        },
      ],
    },
    case: {
      eyebrow: "Case",
      category: "Healthcare — clinical-staff indicators",
      title: "A single index to measure clinical excellence in real time.",
      problem: {
        label: "Problem",
        text: "Tracking clinical-staff performance relied on manual reporting, with no consolidated view by role.",
      },
      solution: {
        label: "Solution",
        text: "A panel with an Excellence Index from 0 to 100, real-time indicators and role-based access (manager, coordinator, professional).",
      },
      result: {
        label: "Result",
        text: "Each role sees exactly what it needs, with real-time data — no spreadsheet, no manual report.",
      },
    },
    method: {
      eyebrow: "Method",
      title: "Verifiable authority, not an adjective.",
      subtitle: "Every system follows the same pipeline, from diagnosis to operation.",
      steps: [
        { n: "01", title: "Diagnosis", desc: "We map the real problem before writing a line of code." },
        { n: "02", title: "Construction", desc: "A dedicated team builds with a verifiable criterion at every delivery." },
        { n: "03", title: "Dual audit", desc: "Every change goes through independent logic and interface audit before merge." },
        { n: "04", title: "Security & compliance", desc: "Secrets in a vault, role-based access and compliance by design." },
      ],
      linkMethod: "See the full method",
      linkSecurity: "See security",
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
      instagram: "Instagram",
      instagramNote: "Reach us there",
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
      instagram: "Instagram",
      rights: "All rights reserved.",
    },
    chatbot: {
      label: "Talk to Ivy",
      title: "Ivy",
      subtitle: "Ask us anything about IV Soluções",
      welcome:
        "Hi! 👋 I'm Ivy, IV Soluções' virtual assistant. I can explain our AI, systems and website services. How can I help?",
      placeholder: "Type your question...",
      send: "Send",
      open: "Open assistant",
      close: "Close assistant",
      error: "I had trouble answering right now. How about talking to the team directly on WhatsApp?",
      rate: "You've sent too many messages in a short time. Please wait a moment and try again — or reach us on WhatsApp.",
      whatsappFallback: "Chat on WhatsApp",
    },
    solutionsIndex: {
      meta: {
        title: "Solutions",
        description: "The five product lines built by IV Soluções, described by what they do — no client names.",
      },
      eyebrow: "Solutions",
      title: "What we build.",
      subtitle: "Five product lines, described by what they do — no client names.",
    },
    solutionPages: {
      labels: {
        problem: "Problem",
        delivers: "What IV delivers",
        how: "How it works",
        result: "Result",
        back: "← All solutions",
      },
      items: {
        "saude-excelencia-clinica": {
          meta: { title: "Clinical Excellence — IV Soluções" },
          headline: "A single index to measure clinical excellence in real time.",
          problem:
            "Tracking clinical-staff performance relied on manual reporting, with no consolidated view by role.",
          delivers:
            "A panel with a 0–100 Excellence Index, real-time indicators and role-segmented access (manager, coordinator, professional).",
          how: "Each role signs in with its own profile and sees only the indicators relevant to its function; the index recalculates with the latest data.",
          result:
            "In production with a real healthcare-sector client. Each role sees exactly what it needs, with real-time data — no spreadsheet, no manual report.",
          ctaMessage: "Hi! I came from the Clinical Excellence page and would like to know more about this system.",
        },
        condominios: {
          meta: { title: "Condominium Management — IV Soluções" },
          headline: "One single channel for manager, front desk and resident — each seeing only what they need.",
          problem:
            "Condominium communication and access control get scattered across chat groups, paper and spreadsheets, with no single place per role.",
          delivers:
            "A condominium management platform: resident communication, access control and centralized information, with role-based access (manager, front desk, resident).",
          how: "Manager, front desk and resident each sign in with their own role and see and do only what fits that role, in a single system.",
          result:
            "In production at a real condominium. Communication and access centralized in a single, role-based channel — no chat group or side spreadsheet needed.",
          ctaMessage:
            "Hi! I came from the Condominium Management page and would like to know more about this system.",
        },
        "setor-publico-licitacoes": {
          meta: { title: "Commitments & Procurement — IV Soluções" },
          headline: "From order to delivery, with an audit trail at every step.",
          problem:
            "The commitment process is traditionally scattered across side spreadsheets, with no data cross-check and no formal third-party validation.",
          delivers:
            "A purchase-commitment management and analysis system, from order to delivery, with a real-time dashboard, third-party validation and secure, auditable role-based access.",
          how: "The dashboard cross-checks data in real time from order to delivery; each role (manager, third party, auditor) accesses only what fits its function, with an auditable record.",
          result:
            "In production in the public sector. An auditable process from order to delivery, with built-in third-party validation and role-based access — no side spreadsheet.",
          ctaMessage:
            "Hi! I came from the Commitments & Procurement page and would like to know more about this system.",
        },
        "ponto-escalas": {
          meta: { title: "Time & Shift Tracking — IV Soluções" },
          headline: "Time and shift tracking centralized, with proof of presence at the right moment.",
          problem:
            "Time and shift tracking for healthcare teams is often split across paper, spreadsheets and generic apps, with no real geolocation at check-in.",
          delivers:
            "A tailor-made time-and-shift app for healthcare teams: selfie and geolocation captured only at check-in, with centralized shift management.",
          how: "The professional checks in with a selfie; geolocation is captured only at that moment (no continuous tracking); the manager centralizes and adjusts shifts in a single panel.",
          result:
            "A tailor-made system, ready to centralize time and shift tracking for any on-call team, with proof of presence via point-in-time geolocation.",
          ctaMessage:
            "Hi! I came from the Time & Shift Tracking page and would like to know more about this system.",
        },
        "ia-aplicada-rag": {
          meta: { title: "Applied AI & RAG — IV Soluções" },
          headline: "The AI answers with your business's real data — not generic knowledge.",
          problem:
            'Finding information in a large catalog or knowledge base depends on manual search or asking whoever "knows".',
          delivers:
            "An AI assistant that explores your business catalogs and knowledge base and answers accurately, exporting results to PDF and documents.",
          how: "The AI consults the client's knowledge base or catalog before answering (retrieval-augmented generation) — the answer is grounded in real business data, and the result exports to PDF or a document.",
          result:
            "A tailor-made assistant, ready to cut down search time across a catalog or knowledge base.",
          ctaMessage: "Hi! I came from the Applied AI & RAG page and would like to know more about this system.",
        },
      },
    },
    methodPage: {
      meta: {
        title: "Method — IV Soluções",
        description: "IV Soluções' pipeline: diagnosis, construction, dual audit and security by design.",
      },
      eyebrow: "Method",
      title: "Verifiable authority, not an adjective.",
      subtitle: "Every system follows the same pipeline, from diagnosis to operation.",
      steps: [
        {
          n: "01",
          title: "Diagnosis",
          desc: "We map the sector's real problem before writing a line of code: who uses the system, what decision it needs to support, and what data is manual or scattered today.",
        },
        {
          n: "02",
          title: "Construction",
          desc: "A dedicated team builds with a verifiable criterion at every delivery — nothing is considered done without an objective test passing.",
        },
        {
          n: "03",
          title: "Dual audit",
          desc: "Every change goes through an independent logic and interface audit before merge — whoever builds is not whoever audits, and findings are fixed before any delivery.",
        },
        {
          n: "04",
          title: "Security & compliance",
          desc: "Secrets in a vault (never in code), role-based access and LGPD compliance by design — not as a last-minute adjustment.",
        },
      ],
      whyTitle: "Why the rigor is a differentiator",
      whyText:
        "Most custom software has no second pair of eyes on the code before it ships. At IV, whoever builds and whoever audits are always separate roles — the independent logic and interface audit happens before every merge, not after the problem shows up in production.",
      linkSecurity: "See security",
    },
    aboutPage: {
      meta: {
        title: "About — IV Soluções",
        description: "Who builds IV Soluções: origin, mission and founders.",
      },
      eyebrow: "About",
      title: "Who builds.",
      originText:
        "IV Soluções was created to put tailor-made AI, systems and websites within reach of those usually left out of them: small and medium businesses, startups, independent professionals and end consumers.",
      missionLabel: "Mission",
      missionText:
        '"Your business, much smarter." — tailor-made technology, delivered with the same audit rigor on every project, not just the largest ones.',
      foundersLabel: "Founders",
      founders: [
        { name: "Victor Guilherme", role: "Founder" },
        { name: "Inamar Miranda", role: "Partner" },
      ],
      foundersText:
        "The team talks directly to the decision-maker and to whoever builds each system — no support layer between the client and whoever understands the project.",
      valuesLabel: "Values",
      values: [
        {
          text: "Loyalty: we tell the truth about deadline, risk and system limitations — even when it's not the most comfortable answer.",
        },
        {
          text: "Rigor: no delivery ships without an independent logic and interface audit.",
        },
        {
          text: "Security: secrets in a vault, role-based access and LGPD compliance by design — not as a reaction to an incident.",
        },
      ],
    },
    contactPage: {
      meta: {
        title: "Contact — IV Soluções",
        description: "Talk to IV Soluções via WhatsApp, email or Instagram — support from 7am to 10pm, every day.",
      },
    },
    seguranca: {
      meta: {
        title: "Security & Data Protection",
        description: "How IV Soluções protects personal and sensitive data: access control, audit trail and LGPD compliance.",
      },
      hero: {
        eyebrow: "Security & Data Protection",
        title: "How we protect the data you trust us with.",
        subtitle:
          "We work with healthcare, legal and public-sector organizations — where data out of place has real consequences. This page explains, plainly and without empty promises, what we actually do today to protect personal and sensitive data.",
      },
      compromisso: {
        title: "Our commitment to privacy",
        body: "We treat personal data as a responsibility, not a resource. The systems we build — for clinics, condominiums, law firms and public agencies — are designed with access control, usage logging and data minimization from the start, not bolted on afterward. This doesn't mean we're infallible: it means we know exactly what we handle, why, and how it's protected — and we only state here what we actually practice.",
      },
      protecao: {
        title: "How we protect data",
        intro: "Technical and organizational measures we apply in the systems we build and operate:",
        items: [
          {
            title: "Role-based access",
            desc: "Each person sees only what their role requires. Roles define what can be read, edited or exported — no generic admin access for everyday tasks.",
          },
          {
            title: "Row-level security (RLS)",
            desc: "In the databases behind our systems, the database itself enforces the access rule — not just the screen. This reduces the risk of a coding mistake exposing data to someone who shouldn't see it.",
          },
          {
            title: "Audit trail",
            desc: "Systems that handle sensitive data log who accessed or changed what, and when — without recording the sensitive data itself inside the audit log.",
          },
          {
            title: "Secrets stay out of the code",
            desc: "Passwords, keys and access tokens live in a vault and protected environment variables — never written into the source code.",
          },
          {
            title: "Encrypted connection",
            desc: "All traffic between you and our systems travels over an encrypted connection (HTTPS/TLS).",
          },
          {
            title: "Review before any change ships",
            desc: "No code change reaches production without an independent technical review from someone other than the person who wrote it.",
          },
          {
            title: "Backups",
            desc: "We keep a database backup routine, running more frequently on systems that handle sensitive data.",
          },
        ],
        iaNota:
          "When an AI assistant answers here, the text you send is processed by an AI provider (Google Gemini and/or DeepSeek), which may involve an international data transfer (Art. 33 of the LGPD) to servers outside Brazil; this transfer is governed by each provider's data processing agreements (DPA) and standard contractual clauses. Please don't send sensitive or confidential data through the chat.",
      },
      lgpd: {
        title: "LGPD compliance",
        body: "We follow Brazil's General Data Protection Law (Lei nº 13.709/2018 — LGPD). In most projects we build, we act as processor (Art. 5, VII and Art. 39 of the LGPD): we handle personal data on behalf of the client, who is the controller (Art. 5, VI) and who defines the purpose and legal basis for processing their own users', residents' or patients' data. IV Soluções operates strictly under the instructions and legal basis set by the controller — we do not decide, on our own, what to process or why. Before starting any processing, we map both roles together with the client and work to formalize that relationship in a specific processor agreement (DPA); IV Soluções is not responsible for processing decisions, purposes or legal bases wrongly adopted by the client-controller — that responsibility is theirs.",
        direitos: {
          title: "Your rights as a data subject",
          intro: "Under Article 18 of the LGPD, you can request, at any time:",
          bullets: [
            "Confirmation that we process your data, and access to it",
            "Correction of incomplete, inaccurate or outdated data",
            "Anonymization, blocking or deletion of unnecessary or excessive data",
            "Portability to another provider, when applicable",
            "Deletion of data processed based on your consent",
            "Information about who we've shared your data with",
            "Withdrawal of consent, when that is the legal basis",
          ],
          cta: "For data IV Soluções processes as processor — of patients, residents or users of a system we build for a client —, these rights are exercised with the client (controller), who is responsible for deciding on the processing; IV Soluções assists the client in handling the request but does not decide it. When IV Soluções is itself the controller of the data — such as this site's visitors and leads — contact our data protection officer directly.",
        },
        incidente: {
          title: "If something goes wrong",
          body: "If we identify a security incident involving data we process on behalf of a client (controller), we notify the client without delay — it is up to the client, as controller, to decide and carry out the communication to Brazil's National Data Protection Authority (ANPD) and the affected data subjects, within the timeframes and terms of Art. 48 of the LGPD and ANPD regulation. When IV Soluções is itself the controller of the data — for example, this site's visitors — we notify the ANPD and the data subjects directly, following the same timeframe and criteria. No system is immune to incidents — what we commit to is acting transparently and without delay, in either role.",
        },
      },
      saude: {
        title: "Sensitive health data",
        body: "Some of the systems we build operate in the healthcare sector and may handle health data — which the LGPD classifies as sensitive personal data (Art. 11). We treat this data with extra rigor: only what's necessary for the stated purpose (e.g., shift management or clinical indicators), with a specific legal basis, role-restricted access and an audit trail. A healthcare professional's name is common data; a medical record, clinical event or a patient's health information is sensitive data — and carries different weight in our analysis. A concrete example: in the time-tracking app we built for healthcare teams, the facial biometric record used to confirm identity is deleted as soon as it's no longer necessary for that purpose, following the retention period set by the client-controller — who may factor in labor-law evidentiary retention requirements applicable to their sector; only the time-clock record itself is kept.",
      },
      encarregado: {
        title: "Talk to our data protection officer",
        body: "Questions, data requests or security concerns can be sent directly to our data protection officer (DPO), as required by Article 41 of the LGPD. If your request concerns data processed by a system we built for a client — for example, a patient's or resident's data —, our DPO will guide you and direct the request to the responsible controller, who is in charge of handling and deciding on it.",
        emailLabel: "Email",
        cta: "Get in touch",
      },
      disclaimer: {
        body: "The practices described here reflect what we apply today and evolve as our systems grow. This page is not legal advice and does not guarantee immunity from security incidents — it represents our ongoing commitment to data protection.",
      },
    },
  },
} as const;

export type SolutionSlug = keyof typeof DICT.pt.solutionPages.items;

export const WHATSAPP_NUMBER = "5531996715639";
export const WHATSAPP_DISPLAY = "(31) 99671-5639";
export const EMAIL = "victor-bh15@hotmail.com";
/** E-mail do encarregado (DPO) — placeholder até decisão do Victor sobre domínio final.
 * Usar SÓ no card de encarregado de /seguranca; o EMAIL geral (contato/WhatsApp) fica intacto. */
export const DPO_EMAIL = "encarregado@ivsolucoes.com.br";
export const INSTAGRAM_URL = "https://www.instagram.com/iv.solucoes";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
