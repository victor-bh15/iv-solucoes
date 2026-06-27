import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a IV Soluções coleta, usa e protege seus dados, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mt-3 text-sm text-muted">
        Última atualização: 7 de junho de 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">
        <p>
          Esta política explica como a <strong className="text-foreground">{site.name}</strong>{" "}
          trata os dados de quem visita este site e de quem usa nossos aplicativos móveis,
          em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          O tratamento de dados do site está descrito nas seções 1 a 3; o aplicativo
          <strong className="text-foreground"> Ponto Eletrônico</strong> é tratado na seção 4.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-foreground">1. Quem é o responsável</h2>
          <p className="mt-2">
            O controlador dos dados é a {site.name} ({site.founders.join(" e ")}).
            Contato: {site.emails.join(", ")} ou WhatsApp {site.whatsappDisplay}.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">2. Dados que tratamos</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-foreground">Mensagens do assistente virtual:</strong> o
              texto que você digita no chat do site.
            </li>
            <li>
              <strong className="text-foreground">Contato voluntário:</strong> os dados que você
              decide nos enviar por WhatsApp ou e-mail (como nome e telefone).
            </li>
            <li>
              <strong className="text-foreground">Preferências do site:</strong> tema (claro/escuro)
              e idioma, guardados apenas no seu navegador (localStorage) — não são enviados aos
              nossos servidores.
            </li>
          </ul>
          <p className="mt-2">
            No site, não exigimos cadastro e não coletamos dados sensíveis. Pedimos que você não
            envie informações sensíveis ou confidenciais pelo chat. O tratamento de dados sensíveis
            (como a selfie biométrica) ocorre apenas no aplicativo Ponto Eletrônico, com as
            salvaguardas descritas na seção 4.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">3. Para que usamos</h2>
          <p className="mt-2">
            Para responder às suas dúvidas e solicitações de contato, e para entender e melhorar
            o site. Não usamos seus dados para decisões automatizadas que afetem você.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            4. Aplicativos móveis — Ponto Eletrônico
          </h2>
          <p className="mt-2">
            O <strong className="text-foreground">Ponto Eletrônico</strong> é um aplicativo de
            registro de ponto para equipes médicas. Por sua natureza, ele trata dados pessoais e,
            de forma controlada, um dado pessoal sensível (biométrico). Tudo o que é coletado tem
            finalidade específica de gestão de escala e controle de ponto, descrita abaixo.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">4.1. Dados que o aplicativo coleta</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-foreground">Selfie (foto facial):</strong> capturada no
              momento de bater o ponto. É um dado biométrico, considerado sensível pela LGPD
              (art. 11), usado exclusivamente para confirmar a identidade de quem registra o ponto.
            </li>
            <li>
              <strong className="text-foreground">Localização (GPS):</strong> capturada
              <strong className="text-foreground"> apenas no momento do registro</strong> do ponto
              (entrada e saída), para comprovar o local em que ele foi batido. Não há rastreamento
              contínuo nem em segundo plano.
            </li>
            <li>
              <strong className="text-foreground">CPF:</strong> usado como identificador de login
              (alternativa ao e-mail).
            </li>
            <li>
              <strong className="text-foreground">Cadastro do profissional:</strong> nome, e-mail,
              telefone e horário de trabalho.
            </li>
            <li>
              <strong className="text-foreground">Registros de ponto:</strong> data, hora e tipo
              (entrada/saída).
            </li>
          </ul>

          <h3 className="mt-4 font-semibold text-foreground">4.2. Finalidade e base legal</h3>
          <p className="mt-2">
            Os dados são tratados para a gestão de escala e o controle de ponto da equipe médica.
            As bases legais são a execução do contrato de trabalho, o cumprimento de obrigação legal
            e o legítimo interesse do empregador. A selfie biométrica tem como base o cumprimento de
            obrigação e a confirmação de identidade de quem registra o ponto, e não é usada para
            qualquer outra finalidade.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">4.3. Retenção</h3>
          <p className="mt-2">
            A <strong className="text-foreground">selfie é apagada após 90 dias</strong>, mantendo-se
            apenas o registro do ponto (sem a foto). Os demais dados são mantidos enquanto durar o
            vínculo profissional e pelos prazos legais aplicáveis.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">4.4. Armazenamento e acesso</h3>
          <p className="mt-2">
            Os dados ficam em servidor seguro (banco de dados PostgreSQL/Neon), com acesso restrito
            por papel: apenas o próprio profissional e o organizador da sua organização têm acesso
            aos seus registros. <strong className="text-foreground">Não vendemos nem
            compartilhamos</strong> esses dados com terceiros para fins de marketing.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">4.5. Direitos do titular</h3>
          <p className="mt-2">
            Você pode solicitar acesso, correção, exclusão e portabilidade dos seus dados a qualquer
            momento, pelos contatos da {site.name} indicados na seção 10.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            5. Assistente virtual (inteligência artificial)
          </h2>
          <p className="mt-2">
            As mensagens enviadas no chat são processadas por provedores de IA
            (DeepSeek e Google Gemini) apenas para gerar a resposta. Por isso, evite incluir dados
            pessoais sensíveis ou confidenciais nessas mensagens.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">6. Com quem compartilhamos</h2>
          <p className="mt-2">
            Apenas com os serviços necessários para o site funcionar: hospedagem (Vercel), os
            provedores de IA citados acima e, quando ativo, o serviço de medição de audiência
            (Google Analytics). <strong className="text-foreground">Não vendemos nem
            alugamos</strong> seus dados a terceiros.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">7. Cookies e medição de audiência</h2>
          <p className="mt-2">
            Usamos armazenamento local apenas para lembrar sua preferência de tema e idioma — é
            essencial ao funcionamento e não rastreia você. Podemos usar o Google Analytics para
            entender, de forma agregada, como o site é utilizado e assim melhorá-lo. Quando ativo,
            ele é configurado com <strong className="text-foreground">anonimização de IP</strong> e
            não identifica você pessoalmente. Não usamos esses dados para publicidade nem os
            vendemos. Caso passemos a usar rastreamento que exija seu consentimento, atualizaremos
            esta política e solicitaremos sua autorização.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">8. Seus direitos (LGPD)</h2>
          <p className="mt-2">
            Você pode, a qualquer momento, confirmar a existência de tratamento, acessar, corrigir,
            anonimizar, eliminar seus dados ou revogar consentimento. Para exercer esses direitos,
            fale conosco pelos contatos abaixo.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">9. Retenção e segurança</h2>
          <p className="mt-2">
            Mantemos os dados de contato apenas pelo tempo necessário para atendê-lo e adotamos
            medidas técnicas e organizacionais razoáveis para protegê-los.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">10. Contato (encarregado de dados)</h2>
          <p className="mt-2">
            Dúvidas ou solicitações sobre seus dados:{" "}
            {site.emails.map((email, i) => (
              <span key={email}>
                <a
                  href={`mailto:${email}`}
                  className="text-brand underline transition-colors hover:text-foreground"
                >
                  {email}
                </a>
                {i < site.emails.length - 1 ? " · " : ""}
              </span>
            ))}
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">11. Alterações</h2>
          <p className="mt-2">
            Podemos atualizar esta política periodicamente. A data no topo indica a versão mais
            recente.
          </p>
        </div>
      </div>
    </section>
  );
}
