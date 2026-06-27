/** Conteúdo bilíngue (PT/EN) — projetos do portfólio e FAQ.
 *  Centralizado aqui para o botão EN traduzir o site inteiro. */

export type Bi = { pt: string; en: string };

export interface Project {
  id: string;
  iconKey: 'siem' | 'villas' | 'genio' | 'chronos' | 'painel' | 'site';
  title: string;
  sector: Bi;
  tagline: Bi;
  about: Bi;
  features: { pt: string[]; en: string[] };
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'siem',
    iconKey: 'siem',
    title: 'SIEM — Excelência Médica',
    sector: { pt: 'Saúde', en: 'Healthcare' },
    tagline: {
      pt: 'Índice de excelência que transforma dados clínicos em decisão.',
      en: 'An excellence index that turns clinical data into decisions.',
    },
    about: {
      pt: 'Plataforma que avalia a qualidade do atendimento médico em um Índice de Excelência (0–100), cruzando indicadores clínicos por setor. Coloca o julgamento humano no centro — a "sentinela" valida o que a máquina aponta — com relatórios, visão financeira e conformidade com a LGPD para dado sensível.',
      en: 'A platform that scores the quality of medical care in an Excellence Index (0–100), crossing clinical indicators by sector. It keeps human judgment at the center — the "sentinel" validates what the machine flags — with reports, financial view and LGPD compliance for sensitive data.',
    },
    features: {
      pt: ['Índice de Excelência 0–100', 'Indicadores clínicos por setor', 'Sentinela (julgamento humano)', 'Relatórios e visão financeira', 'LGPD para dado sensível'],
      en: ['Excellence Index 0–100', 'Clinical indicators by sector', 'Sentinel (human judgment)', 'Reports & financial view', 'LGPD for sensitive data'],
    },
    stack: ['Next.js', 'Node/Express', 'Supabase', 'Gemini'],
  },
  {
    id: 'villas',
    iconKey: 'villas',
    title: 'Villas Park',
    sector: { pt: 'Condomínios', en: 'Communities' },
    tagline: {
      pt: 'O condomínio inteiro na palma da mão do morador e do síndico.',
      en: 'The whole community in the resident’s and manager’s hand.',
    },
    about: {
      pt: 'Aplicativo do morador (PWA) somado a um painel completo do síndico: reservas de áreas comuns, ouvidoria, comunicados, inspeções e modo administrativo. Inclui o assistente Lineu para tirar dúvidas e agilizar o dia a dia da comunidade.',
      en: 'A resident app (PWA) plus a full manager panel: amenity bookings, ombudsman, announcements, inspections and admin mode. Includes the Lineu assistant to answer questions and speed up community life.',
    },
    features: {
      pt: ['App do morador (PWA)', 'Reserva de áreas comuns', 'Ouvidoria e comunicados', 'Inspeções e checklist', 'Painel do síndico', 'Assistente Lineu (IA)'],
      en: ['Resident app (PWA)', 'Amenity bookings', 'Ombudsman & announcements', 'Inspections & checklist', 'Manager panel', 'Lineu assistant (AI)'],
    },
    stack: ['Next.js', 'PWA', 'Firebase'],
  },
  {
    id: 'genio',
    iconKey: 'genio',
    title: 'Gênio IV',
    sector: { pt: 'IA · RAG', en: 'AI · RAG' },
    tagline: {
      pt: 'Pergunte à base de conhecimento da empresa e receba a resposta com a fonte.',
      en: 'Ask your company knowledge base and get the answer with its source.',
    },
    about: {
      pt: 'Assistente de IA que lê toda a base de documentos da empresa e responde com precisão, citando a fonte. Usa busca semântica com embeddings (pgvector) e modelos em cross-correção (Gemini + DeepSeek) para reduzir erro e alucinação.',
      en: 'An AI assistant that reads the whole company document base and answers accurately, citing the source. It uses semantic search with embeddings (pgvector) and cross-checked models (Gemini + DeepSeek) to cut errors and hallucination.',
    },
    features: {
      pt: ['Busca semântica (pgvector)', 'Resposta com citação de fonte', 'Múltiplas bases de documentos', 'IA em cross-correção', 'Ingestão automática'],
      en: ['Semantic search (pgvector)', 'Answers with source citation', 'Multiple document bases', 'Cross-checked AI', 'Automatic ingestion'],
    },
    stack: ['Next.js', 'Supabase pgvector', 'Gemini', 'DeepSeek'],
  },
  {
    id: 'chronos',
    iconKey: 'chronos',
    title: 'Chronos — Ponto Médico',
    sector: { pt: 'Saúde', en: 'Healthcare' },
    tagline: {
      pt: 'Ponto, escala e plantão de médicos sem planilha e sem dor de cabeça.',
      en: 'Doctors’ time tracking, schedules and shifts without spreadsheets.',
    },
    about: {
      pt: 'Sistema de registro de ponto, escalas e plantões para equipes médicas, com validação inteligente e geolocalização. Gera relatórios prontos e elimina o controle manual de horas e trocas de plantão.',
      en: 'A time-tracking, scheduling and shift system for medical teams, with smart validation and geolocation. It generates ready reports and removes manual control of hours and shift swaps.',
    },
    features: {
      pt: ['Registro de ponto', 'Escalas e plantões', 'Validação + geolocalização', 'Relatórios automáticos'],
      en: ['Time tracking', 'Schedules & shifts', 'Validation + geolocation', 'Automatic reports'],
    },
    stack: ['Next.js', 'Node', 'Supabase'],
  },
  {
    id: 'painel',
    iconKey: 'painel',
    title: 'Painel de Gestão',
    sector: { pt: 'Gestão', en: 'Management' },
    tagline: {
      pt: 'Os números do negócio consolidados em uma tela só.',
      en: 'The business numbers consolidated on a single screen.',
    },
    about: {
      pt: 'Dashboard de indicadores que reúne dados de diferentes fontes em uma visão clara e visual, com gráficos e acesso por papel — para decidir rápido, com o dado certo na frente.',
      en: 'An indicators dashboard that brings data from different sources into a clear, visual view, with charts and role-based access — to decide fast with the right data in front of you.',
    },
    features: {
      pt: ['Indicadores em tempo real', 'Gráficos e tendências', 'Integração de dados', 'Acesso por papel'],
      en: ['Real-time indicators', 'Charts & trends', 'Data integration', 'Role-based access'],
    },
    stack: ['Next.js', 'Supabase'],
  },
  {
    id: 'site',
    iconKey: 'site',
    title: 'Site IV Soluções',
    sector: { pt: 'Web', en: 'Web' },
    tagline: {
      pt: 'Site institucional rápido e moderno — este mesmo que você navega.',
      en: 'A fast, modern company website — the very one you are browsing.',
    },
    about: {
      pt: 'Site institucional construído para abrir voando e passar confiança: fundo procedural, micro-interações com propósito, IA IVY embutida para atender visitantes e tradução PT/EN completa.',
      en: 'A company website built to load fast and convey trust: procedural background, purposeful micro-interactions, embedded IVY AI to serve visitors and full PT/EN translation.',
    },
    features: {
      pt: ['Next.js + Tailwind', 'Assistente IVY embutido', 'Tradução PT/EN', 'Performance e acessibilidade'],
      en: ['Next.js + Tailwind', 'Embedded IVY assistant', 'PT/EN translation', 'Performance & accessibility'],
    },
    stack: ['Next.js 16', 'Tailwind v4', 'Framer Motion'],
  },
];

export interface Faq { q: Bi; a: Bi }

export const FAQS: Faq[] = [
  {
    q: { pt: 'Quanto tempo leva para colocar uma solução de IA no ar?', en: 'How long does it take to launch an AI solution?' },
    a: {
      pt: 'Depende do escopo, mas projetos enxutos costumam ir ao ar em poucas semanas. No diagnóstico já te damos um prazo realista — sem promessa que não cabe.',
      en: 'It depends on scope, but lean projects usually go live in a few weeks. In the diagnosis we already give you a realistic timeline — no promises we can’t keep.',
    },
  },
  {
    q: { pt: 'Vocês atendem empresas de qual porte?', en: 'What size of companies do you serve?' },
    a: {
      pt: 'De pequenos negócios a operações maiores. Como tudo é sob medida, adaptamos o escopo (e o investimento) ao tamanho e ao momento da sua empresa.',
      en: 'From small businesses to larger operations. Since everything is tailor-made, we adapt the scope (and the investment) to your company’s size and moment.',
    },
  },
  {
    q: { pt: 'Quais tecnologias de IA vocês utilizam?', en: 'Which AI technologies do you use?' },
    a: {
      pt: 'Trabalhamos principalmente com Google Gemini e DeepSeek, em cross-correção (uma IA revisa a outra para reduzir erros), além de modelos open-source quando fazem sentido. Escolhemos a melhor opção para cada caso.',
      en: 'We work mainly with Google Gemini and DeepSeek, cross-checked (one AI reviews the other to reduce errors), plus open-source models when they make sense. We pick the best option for each case.',
    },
  },
  {
    q: { pt: 'É possível integrar a IA com os sistemas que já uso?', en: 'Can the AI integrate with the systems I already use?' },
    a: {
      pt: 'Sim. Somos especialistas em integração via API e conectamos sua solução a CRMs, ERPs, planilhas, WhatsApp e praticamente qualquer plataforma com API disponível.',
      en: 'Yes. We specialize in API integration and connect your solution to CRMs, ERPs, spreadsheets, WhatsApp and virtually any platform with an available API.',
    },
  },
  {
    q: { pt: 'Como ficam a privacidade e a LGPD dos meus dados?', en: 'What about my data privacy and LGPD?' },
    a: {
      pt: 'Tratamos privacidade desde o desenho do projeto, não como remendo no fim. Definimos o que é coletado, onde fica e quem acessa — alinhado à LGPD e ao tipo de dado do seu negócio.',
      en: 'We handle privacy from the project design, not as a patch at the end. We define what is collected, where it lives and who accesses it — aligned with LGPD and your data type.',
    },
  },
  {
    q: { pt: 'E o suporte depois da entrega?', en: 'And support after delivery?' },
    a: {
      pt: 'Não sumimos no lançamento. Acompanhamos, medimos resultados e evoluímos a solução, com suporte humano real e canais diretos com a equipe.',
      en: 'We don’t vanish at launch. We monitor, measure results and evolve the solution, with real human support and direct channels to the team.',
    },
  },
];
