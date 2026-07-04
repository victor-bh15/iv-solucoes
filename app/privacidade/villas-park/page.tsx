import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — Villas Park III",
  description:
    "Como são tratados os dados pessoais no aplicativo Villas Park III, em conformidade com a LGPD.",
};

const th =
  "border-b border-white/10 px-3 py-2 text-left text-sm font-medium text-white align-top";
const td = "border-b border-white/10 px-3 py-2 text-sm align-top";

export default function PrivacidadeVillasParkPage() {
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
        Política de Privacidade — Villas Park III
      </h1>
      <p className="mt-3 text-sm text-white/50">
        Última atualização: 28 de junho de 2026
      </p>

      <div className="mt-12 text-sm leading-relaxed text-white/70">
        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          1. Apresentação
        </h2>
        <p>
          Esta Política de Privacidade descreve como são tratados os dados pessoais coletados pelo
          aplicativo <strong className="text-white">Villas Park III</strong> (o
          &ldquo;Aplicativo&rdquo;), um aplicativo web progressivo (PWA) de gestão de condomínio.
          Este documento está em conformidade com a{" "}
          <strong className="text-white">
            Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)
          </strong>
          . Ao utilizar o Aplicativo, você (&ldquo;Titular&rdquo;) declara estar ciente das
          condições aqui descritas.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          2. Identificação do Controlador e do Operador
        </h2>
        <p>
          A LGPD distingue dois papéis no tratamento de dados. No contexto do Aplicativo Villas
          Park III:
        </p>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className={th}>Papel</th>
                <th className={th}>Quem é</th>
                <th className={th}>Responsabilidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>
                  <strong className="text-white">Controlador</strong>
                </td>
                <td className={td}>Condomínio Villas Park III</td>
                <td className={td}>
                  Decide quais dados são coletados e para quais finalidades. É o responsável pelas
                  decisões sobre o tratamento dos dados dos moradores.
                </td>
              </tr>
              <tr>
                <td className={td}>
                  <strong className="text-white">Operador</strong>
                </td>
                <td className={td}>IV Soluções</td>
                <td className={td}>
                  Desenvolve, hospeda e opera o Aplicativo seguindo as instruções do Condomínio
                  (Controlador). Trata os dados em nome do Condomínio.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          O <strong className="text-white">Condomínio Villas Park III</strong>, na qualidade
          de Controlador, é o responsável pelas decisões sobre o tratamento dos seus dados. A
          IV Soluções, como Operadora, atua exclusivamente conforme as instruções do Condomínio e
          os termos desta Política.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          3. Dados Pessoais Coletados
        </h2>
        <p>O Aplicativo coleta e trata os seguintes dados:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong className="text-white">Dados de conta e identificação:</strong> nome do
            morador, unidade (bloco/apartamento), papel no condomínio (morador, zelador, porteiro,
            síndico, administrador) e credencial de acesso (PIN/senha, sempre armazenada de forma
            cifrada).
          </li>
          <li>
            <strong className="text-white">Foto de perfil (avatar):</strong> imagem opcional,
            enviada pelo próprio morador. É um dado pessoal e seu envio é facultativo.
          </li>
          <li>
            <strong className="text-white">Dados de visitantes:</strong> nome, documento e
            datas de visita, informados pelo próprio morador (ver Seção 4 sobre a responsabilidade
            do morador ao informar dados de terceiros).
          </li>
          <li>
            <strong className="text-white">Encomendas:</strong> descrição e remetente da
            encomenda registrada na portaria.
          </li>
          <li>
            <strong className="text-white">Ouvidoria:</strong> manifestações (queixas,
            dúvidas, elogios e sugestões), que podem conter opiniões e dados pessoais fornecidos
            voluntariamente pelo morador.
          </li>
          <li>
            <strong className="text-white">Reservas, Censo e adimplência:</strong> reservas
            da área gourmet; respostas ao Censo/Pesquisa da unidade; e indicador de adimplência
            (status de bloqueio de funcionalidades), informado pela administração do condomínio.
          </li>
          <li>
            <strong className="text-white">Notificações push:</strong> endpoint/token do
            dispositivo e chaves criptográficas necessárias para o envio de avisos.
          </li>
          <li>
            <strong className="text-white">Assistente virtual &ldquo;Lineu&rdquo;:</strong>{" "}
            perguntas digitadas livremente pelo morador, processadas por inteligência artificial
            (ver Seção 6).
          </li>
          <li>
            <strong className="text-white">Logs técnicos e de auditoria:</strong> endereço
            IP, identificação do navegador/dispositivo (user-agent) e registros de acesso e de
            ações realizadas no Aplicativo.
          </li>
        </ul>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          4. Dados de terceiros informados pelo morador
        </h2>
        <p>
          Ao cadastrar <strong className="text-white">visitantes</strong>, o morador fornece
          dados pessoais de outra pessoa. O morador é responsável por informar ao visitante que
          seus dados (nome, documento e data de visita) serão registrados no Aplicativo para fins
          de controle de acesso do condomínio, e por garantir que possui base legítima para
          fornecê-los. O Condomínio e a IV Soluções tratam esses dados apenas para a finalidade de
          controle de portaria.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          5. Finalidades e Bases Legais do Tratamento
        </h2>
        <p>
          Cada tratamento de dado possui uma finalidade específica e uma base legal prevista na
          LGPD (arts. 7º e 11):
        </p>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className={th}>Dado</th>
                <th className={th}>Finalidade</th>
                <th className={th}>Base legal (LGPD)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Nome, unidade, papel, credencial", "Autenticar o acesso e identificar o usuário no Aplicativo", "Execução de contrato / legítimo interesse na gestão condominial (art. 7º, V e IX)"],
                ["Foto de perfil (avatar)", "Personalizar a conta do morador", "Consentimento do titular (art. 7º, I) — envio opcional"],
                ["Dados de visitantes", "Controle de acesso e segurança da portaria", "Legítimo interesse na segurança do condomínio (art. 7º, IX)"],
                ["Encomendas", "Registrar e notificar o recebimento de encomendas", "Legítimo interesse na gestão condominial (art. 7º, IX)"],
                ["Ouvidoria", "Receber e responder manifestações dos moradores", "Legítimo interesse / procedimento a pedido do titular (art. 7º, IX)"],
                ["Reservas da área gourmet", "Gerenciar o uso das áreas comuns", "Execução de contrato / legítimo interesse (art. 7º, V e IX)"],
                ["Censo/Pesquisa da unidade", "Atualizar cadastro e organizar a gestão do condomínio", "Legítimo interesse na gestão condominial (art. 7º, IX)"],
                ["Indicador de adimplência (bloqueio)", "Aplicar regras do condomínio quanto ao uso de funcionalidades", "Cumprimento de obrigação / legítimo interesse na gestão (art. 7º, IX)"],
                ["Notificações push (token, chaves)", "Enviar avisos e comunicados do condomínio", "Consentimento do titular ao habilitar notificações (art. 7º, I)"],
                ["Logs técnicos (IP, user-agent, auditoria)", "Segurança, prevenção a fraude e auditoria de acessos", "Cumprimento de obrigação legal e legítimo interesse (art. 7º, II e IX)"],
                ["Perguntas ao assistente “Lineu”", "Responder dúvidas sobre o regulamento do condomínio", "Legítimo interesse / procedimento a pedido do titular (art. 7º, IX)"],
              ].map(([d, f, b]) => (
                <tr key={d}>
                  <td className={td}>
                    <strong className="text-white">{d}</strong>
                  </td>
                  <td className={td}>{f}</td>
                  <td className={td}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          O Aplicativo <strong className="text-white">não tem por finalidade coletar dados
          pessoais sensíveis</strong> (art. 11 da LGPD). Caso o Titular insira voluntariamente
          dados sensíveis em campos abertos (como Ouvidoria ou no assistente &ldquo;Lineu&rdquo;),
          recomenda-se evitar fazê-lo, pois tais campos não foram projetados para essa finalidade.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          6. Assistente Virtual &ldquo;Lineu&rdquo; (Inteligência Artificial)
        </h2>
        <p>
          O assistente &ldquo;Lineu&rdquo; responde a dúvidas dos moradores com base
          exclusivamente no regulamento do condomínio, utilizando serviços de inteligência
          artificial de terceiros (Google Gemini e DeepSeek — ver Seções 7 e 8).
        </p>
        <p className="mt-3">
          <strong className="text-white">Importante:</strong> as perguntas digitadas no
          &ldquo;Lineu&rdquo; são enviadas a esses serviços de IA para processamento.{" "}
          <strong className="text-white">
            Recomendamos não inserir dados pessoais ou informações sensíveis nas perguntas
          </strong>{" "}
          (como números de documentos, dados de saúde ou de terceiros), pois o assistente foi
          projetado apenas para esclarecer dúvidas sobre as regras do condomínio.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          7. Compartilhamento e Operadores/Subprocessadores
        </h2>
        <p>
          Para operar o Aplicativo, a IV Soluções utiliza os seguintes prestadores de serviço
          (operadores/subprocessadores), cada um tratando dados apenas na medida necessária à sua
          função:
        </p>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className={th}>Subprocessador</th>
                <th className={th}>Função</th>
                <th className={th}>Dados envolvidos</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Supabase", "Banco de dados, autenticação e armazenamento de arquivos (storage)", "Todos os dados de conta, conteúdo e avatar"],
                ["Vercel", "Hospedagem da aplicação", "Tráfego da aplicação e logs técnicos"],
                ["Google Gemini", "Inteligência artificial primária do assistente “Lineu”", "Texto das perguntas enviadas ao assistente"],
                ["DeepSeek", "Inteligência artificial de validação/apoio do assistente “Lineu”", "Texto das perguntas enviadas ao assistente"],
              ].map(([s, f, d]) => (
                <tr key={s}>
                  <td className={td}>
                    <strong className="text-white">{s}</strong>
                  </td>
                  <td className={td}>{f}</td>
                  <td className={td}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Os dados <strong className="text-white">não são vendidos</strong> nem
          compartilhados para fins de marketing de terceiros. O compartilhamento ocorre apenas com
          os subprocessadores acima e quando houver determinação legal ou judicial.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          8. Transferência Internacional de Dados
        </h2>
        <p>
          Alguns subprocessadores processam dados <strong className="text-white">fora do
          Brasil</strong>, o que caracteriza transferência internacional de dados nos termos dos
          arts. 33 a 36 da LGPD:
        </p>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className={th}>Serviço</th>
                <th className={th}>País/Região</th>
                <th className={th}>Observação</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Supabase", "A confirmar (região do projeto)", "Armazenamento e autenticação"],
                ["Vercel", "Estados Unidos / infraestrutura global", "Hospedagem"],
                ["Google Gemini", "Estados Unidos", "Processamento das perguntas do “Lineu”"],
                ["DeepSeek", "China", "Processamento das perguntas do “Lineu”"],
              ].map(([s, p, o]) => (
                <tr key={s}>
                  <td className={td}>
                    <strong className="text-white">{s}</strong>
                  </td>
                  <td className={td}>{p}</td>
                  <td className={td}>{o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Ao utilizar o assistente &ldquo;Lineu&rdquo;, o texto das suas perguntas pode ser
          transmitido a servidores nos Estados Unidos (Google) e na China (DeepSeek). Esses países
          podem ter níveis de proteção de dados distintos dos previstos na legislação brasileira.{" "}
          <strong className="text-white">
            Por isso reforçamos a recomendação de não inserir dados pessoais nas perguntas ao
            assistente.
          </strong>{" "}
          As transferências são realizadas com base nas hipóteses do art. 33 da LGPD e nas
          garantias contratuais aplicáveis a cada prestador.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          9. Direitos do Titular (art. 18 da LGPD)
        </h2>
        <p>Você, como Titular dos dados, tem direito a:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Confirmação da existência de tratamento;</li>
          <li>Acesso aos seus dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados
            em desconformidade com a LGPD;
          </li>
          <li>Portabilidade dos dados a outro fornecedor, mediante requisição expressa;</li>
          <li>Eliminação dos dados tratados com base no consentimento;</li>
          <li>Informação sobre com quem os dados são compartilhados;</li>
          <li>
            Informação sobre a possibilidade de não fornecer consentimento e suas consequências;
          </li>
          <li>Revogação do consentimento.</li>
        </ul>
        <p className="mt-3">
          <strong className="text-white">Como exercer:</strong> os pedidos devem ser
          dirigidos ao <strong className="text-white">Condomínio Villas Park III</strong>{" "}
          (Controlador), por meio do canal de Ouvidoria do próprio Aplicativo ou do contato
          indicado na Seção 14. A IV Soluções, como Operadora, auxiliará o Condomínio no
          atendimento das solicitações.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          10. Prazo de Retenção
        </h2>
        <p>
          Os dados são mantidos enquanto o morador estiver vinculado ao condomínio e o Aplicativo
          estiver em uso, e pelo período adicional necessário ao cumprimento de obrigações legais,
          ao exercício regular de direitos ou conforme determinação do Condomínio. Encerrado o
          vínculo ou a finalidade, os dados são eliminados ou anonimizados, salvo hipóteses de
          guarda obrigatória previstas em lei (art. 16 da LGPD).
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          11. Segurança da Informação
        </h2>
        <p>
          São adotadas medidas técnicas e administrativas para proteger os dados, incluindo:
          controle de acesso por perfil/papel; credenciais armazenadas de forma cifrada;
          comunicação criptografada (HTTPS); e registros de auditoria de acessos e ações. Nenhum
          sistema é totalmente imune a incidentes; em caso de incidente de segurança que possa
          acarretar risco relevante aos titulares, o Condomínio e a IV Soluções adotarão as
          providências e comunicações exigidas pela LGPD (art. 48).
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          12. Cookies e Armazenamento Local
        </h2>
        <p>
          O Aplicativo é um PWA e utiliza <strong className="text-white">service
          worker</strong> e <strong className="text-white">armazenamento local</strong> no
          seu dispositivo para: permitir o funcionamento offline, manter sua sessão autenticada e
          melhorar o desempenho. Esses recursos são essenciais ao funcionamento do Aplicativo.
          Você pode limpar o armazenamento local nas configurações do seu navegador/dispositivo,
          ciente de que isso pode afetar a experiência de uso.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          13. Tratamento de Dados de Crianças e Adolescentes
        </h2>
        <p>
          O Aplicativo destina-se à gestão condominial e ao uso por moradores adultos responsáveis
          pela unidade. <strong className="text-white">Não há coleta intencional de dados de
          crianças e adolescentes.</strong> Caso dados de menores sejam eventualmente informados
          (por exemplo, como dependentes da unidade), seu tratamento observará o melhor interesse
          do menor, nos termos do art. 14 da LGPD, sob responsabilidade do Condomínio e do
          responsável legal que os informar.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          14. Encarregado pela Proteção de Dados (DPO)
        </h2>
        <p>
          Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento dos seus dados, e
          enquanto o Condomínio (Controlador) não designar formalmente um Encarregado, os pedidos
          podem ser encaminhados à IV Soluções (Operadora), que os direcionará ao Controlador:
        </p>
        <p className="mt-3">
          <a
            href="mailto:victor-bh15@hotmail.com"
            className="text-iv-mist underline transition-colors hover:text-white"
          >
            victor-bh15@hotmail.com
          </a>
          .
        </p>

        <h2 className="mt-12 mb-4 text-xl font-light tracking-tight text-white">
          15. Alterações nesta Política
        </h2>
        <p>
          Esta Política pode ser atualizada a qualquer momento. A versão vigente estará sempre
          disponível nesta página, com a respectiva data de última atualização. Recomendamos a
          consulta periódica.
        </p>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          Fonte legal consultada:{" "}
          <a
            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-iv-mist underline transition-colors hover:text-white"
          >
            Lei nº 13.709/2018 — LGPD (Planalto)
          </a>
          .
        </p>
      </div>
    </main>
  );
}
