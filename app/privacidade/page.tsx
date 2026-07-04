import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a IV Soluções coleta, usa e protege seus dados, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/"
        className="text-sm text-iv-mist transition-colors hover:text-white"
      >
        ← IV Soluções
      </Link>

      <p className="mt-10 text-xs tracking-[0.25em] text-iv-mist uppercase">
        Privacidade
      </p>
      <h1 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mt-3 text-sm text-white/50">
        Última atualização: 7 de junho de 2026
      </p>

      <div className="mt-12 text-sm leading-relaxed text-white/70">
        <p>
          Esta política explica como a <strong className="text-white">IV Soluções</strong>{" "}
          trata os dados de quem visita este site e de quem usa nossos aplicativos móveis,
          em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          O tratamento de dados do site está descrito nas seções 1 a 3; o aplicativo
          <strong className="text-white"> Ponto Eletrônico</strong> é tratado na seção 4.
        </p>

        <div className="mt-6 border border-white/10 p-4">
          <p>
            O aplicativo{" "}
            <strong className="text-white">Villas Park III</strong> (gestão de condomínio)
            possui Política de Privacidade própria, com o detalhamento dos dados, finalidades e
            bases legais específicos:{" "}
            <Link
              href="/privacidade/villas-park"
              className="text-iv-mist underline transition-colors hover:text-white"
            >
              ver a Política do Villas Park III
            </Link>
            .
          </p>
        </div>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          1. Quem é o responsável
        </h2>
        <p>
          O controlador dos dados é a IV Soluções (Victor Guilherme e Inamar Miranda).
          Contato: victor-bh15@hotmail.com ou WhatsApp (31) 99671-5639.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          2. Dados que tratamos
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-white">Mensagens do assistente virtual:</strong> o
            texto que você digita no chat do site.
          </li>
          <li>
            <strong className="text-white">Contato voluntário:</strong> os dados que você
            decide nos enviar por WhatsApp ou e-mail (como nome e telefone).
          </li>
          <li>
            <strong className="text-white">Preferências do site:</strong> tema (claro/escuro)
            e idioma, guardados apenas no seu navegador (localStorage) — não são enviados aos
            nossos servidores.
          </li>
        </ul>
        <p className="mt-3">
          No site, não exigimos cadastro e não coletamos dados sensíveis. Pedimos que você não
          envie informações sensíveis ou confidenciais pelo chat. O tratamento de dados sensíveis
          (como a selfie biométrica) ocorre apenas no aplicativo Ponto Eletrônico, com as
          salvaguardas descritas na seção 4.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          3. Para que usamos
        </h2>
        <p>
          Para responder às suas dúvidas e solicitações de contato, e para entender e melhorar
          o site. Não usamos seus dados para decisões automatizadas que afetem você.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          4. Aplicativos móveis — Ponto Eletrônico
        </h2>
        <p>
          O <strong className="text-white">Ponto Eletrônico</strong> é um aplicativo de
          registro de ponto para equipes médicas. Por sua natureza, ele trata dados pessoais e,
          de forma controlada, um dado pessoal sensível (biométrico). Tudo o que é coletado tem
          finalidade específica de gestão de escala e controle de ponto, descrita abaixo.
        </p>

        <h3 className="mt-6 mb-2 text-base text-white">
          4.1. Dados que o aplicativo coleta
        </h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-white">Selfie (foto facial):</strong> capturada no
            momento de bater o ponto. É um dado biométrico, considerado sensível pela LGPD
            (art. 11), usado exclusivamente para confirmar a identidade de quem registra o ponto.
          </li>
          <li>
            <strong className="text-white">Localização (GPS):</strong> capturada
            <strong className="text-white"> apenas no momento do registro</strong> do ponto
            (entrada e saída), para comprovar o local em que ele foi batido. Não há rastreamento
            contínuo nem em segundo plano.
          </li>
          <li>
            <strong className="text-white">CPF:</strong> usado como identificador de login
            (alternativa ao e-mail).
          </li>
          <li>
            <strong className="text-white">Cadastro do profissional:</strong> nome, e-mail,
            telefone e horário de trabalho.
          </li>
          <li>
            <strong className="text-white">Registros de ponto:</strong> data, hora e tipo
            (entrada/saída).
          </li>
        </ul>

        <h3 className="mt-6 mb-2 text-base text-white">4.2. Finalidade e base legal</h3>
        <p>
          Os dados são tratados para a gestão de escala e o controle de ponto da equipe médica.
          As bases legais são a execução do contrato de trabalho, o cumprimento de obrigação legal
          e o legítimo interesse do empregador. A selfie biométrica tem como base o cumprimento de
          obrigação e a confirmação de identidade de quem registra o ponto, e não é usada para
          qualquer outra finalidade.
        </p>

        <h3 className="mt-6 mb-2 text-base text-white">4.3. Retenção</h3>
        <p>
          A <strong className="text-white">selfie é apagada após 90 dias</strong>, mantendo-se
          apenas o registro do ponto (sem a foto). Os demais dados são mantidos enquanto durar o
          vínculo profissional e pelos prazos legais aplicáveis.
        </p>

        <h3 className="mt-6 mb-2 text-base text-white">4.4. Armazenamento e acesso</h3>
        <p>
          Os dados ficam em servidor seguro (banco de dados PostgreSQL/Neon), com acesso restrito
          por papel: apenas o próprio profissional e o organizador da sua organização têm acesso
          aos seus registros. <strong className="text-white">Não vendemos nem
          compartilhamos</strong> esses dados com terceiros para fins de marketing.
        </p>

        <h3 className="mt-6 mb-2 text-base text-white">4.5. Direitos do titular</h3>
        <p>
          Você pode solicitar acesso, correção, exclusão e portabilidade dos seus dados a qualquer
          momento, pelos contatos da IV Soluções indicados na seção 10.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          5. Assistente virtual (inteligência artificial)
        </h2>
        <p>
          As mensagens enviadas no chat são processadas por provedores de IA
          (DeepSeek e Google Gemini) apenas para gerar a resposta. Por isso, evite incluir dados
          pessoais sensíveis ou confidenciais nessas mensagens.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          6. Com quem compartilhamos
        </h2>
        <p>
          Apenas com os serviços necessários para o site funcionar: hospedagem (Vercel), os
          provedores de IA citados acima e, quando ativo, o serviço de medição de audiência
          (Google Analytics). <strong className="text-white">Não vendemos nem
          alugamos</strong> seus dados a terceiros.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          7. Cookies e medição de audiência
        </h2>
        <p>
          Usamos armazenamento local apenas para lembrar sua preferência de tema e idioma — é
          essencial ao funcionamento e não rastreia você. Podemos usar o Google Analytics para
          entender, de forma agregada, como o site é utilizado e assim melhorá-lo. Quando ativo,
          ele é configurado com <strong className="text-white">anonimização de IP</strong> e
          não identifica você pessoalmente. Não usamos esses dados para publicidade nem os
          vendemos. Caso passemos a usar rastreamento que exija seu consentimento, atualizaremos
          esta política e solicitaremos sua autorização.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          8. Seus direitos (LGPD)
        </h2>
        <p>
          Você pode, a qualquer momento, confirmar a existência de tratamento, acessar, corrigir,
          anonimizar, eliminar seus dados ou revogar consentimento. Para exercer esses direitos,
          fale conosco pelos contatos abaixo.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          9. Retenção e segurança
        </h2>
        <p>
          Mantemos os dados de contato apenas pelo tempo necessário para atendê-lo e adotamos
          medidas técnicas e organizacionais razoáveis para protegê-los.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          10. Contato (encarregado de dados)
        </h2>
        <p>
          Dúvidas ou solicitações sobre seus dados:{" "}
          <a
            href="mailto:victor-bh15@hotmail.com"
            className="text-iv-mist underline transition-colors hover:text-white"
          >
            victor-bh15@hotmail.com
          </a>
          .
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          11. Alterações
        </h2>
        <p>
          Podemos atualizar esta política periodicamente. A data no topo indica a versão mais
          recente.
        </p>
      </div>
    </main>
  );
}
