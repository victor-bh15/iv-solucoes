# Cutover — Site IV Soluções: Vercel Hobby → Cloudflare Workers (Caminho A)

> **Motivo:** o site está no **Vercel Hobby**, cujo ToS proíbe uso **comercial/empresarial**
> (site institucional = comercial). Para sair da violação **sem pagar Vercel Pro**, migramos
> para **Cloudflare Workers** (free tier permite uso comercial) via adaptador **OpenNext**.
>
> **Status:** PREPARADO, **não executado**. Nada foi publicado. Não mexer em DNS sem ordem do Victor.

---

## O que já está pronto neste repo (inerte — não afeta a Vercel)
- `wrangler.jsonc.template` — config do Worker (name, nodejs_compat, assets, self-reference).
- `open-next.config.ts.template` — config do OpenNext (sem cache R2; site é quase todo SSG).
- Mantidos como `.template` **de propósito**: se ativados antes de instalar o pacote,
  o `open-next.config.ts` quebra o `next build` (tsc não acha `@opennextjs/cloudflare`).
  Build atual segue **verde** com eles neutralizados.

## Por que Caminho A é viável (verificado em 13/06/2026)
- Next.js **16** + **App Router**: suportados pelo `@opennextjs/cloudflare` (todas as minors do 16).
- Única rota dinâmica: `app/api/chat/route.ts` com `runtime = "nodejs"` → **suportado**
  (`nodejs_compat`). A rota só faz `fetch` p/ DeepSeek/Gemini — sem `fs`/Buffer/crypto Node-only.
- **Atenção:** OpenNext **NÃO** suporta `runtime = "edge"`. A nossa rota usa `nodejs`, então OK.
  Se algum dia alguém trocar para `edge`, o deploy Cloudflare quebra.
- three.js / @react-three: roda **no cliente** (browser), **não** entra no bundle do Worker —
  então não estoura o limite do Worker. (Confirmar no `preview` mesmo assim — ver passo 5.)

---

## PASSO A PASSO do cutover (executar só com ordem do Victor)

### 1. Instalar o adaptador (branch local; mexe no package.json/lockfile)
```bash
cd "SITE IV SOLUÇÕES/iv-solucoes"
git checkout -b cloudflare-cutover   # (este repo ainda não tem remote; é git local)
npm install --save-dev @opennextjs/cloudflare wrangler
```

### 2. Ativar os arquivos de config
```bash
mv wrangler.jsonc.template wrangler.jsonc
mv open-next.config.ts.template open-next.config.ts
```

### 3. Adicionar scripts no package.json
```jsonc
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "preview:cf": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
  "deploy:cf": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
}
```

### 4. Configurar as variáveis de ambiente / segredos
- Local (preview): manter `.env.local` (DEEPSEEK_API_KEY, GEMINI_API_KEY, NEXT_PUBLIC_GA_ID).
- Produção Cloudflare (segredos — **nunca** no repo):
```bash
npx wrangler secret put DEEPSEEK_API_KEY
npx wrangler secret put GEMINI_API_KEY
```
- `NEXT_PUBLIC_GA_ID` (pública): precisa existir **no build**. Definir em `.env.local`
  antes do `build`, OU em `vars` no `wrangler.jsonc`.

### 5. PORTÃO DE VERIFICAÇÃO (antes de qualquer deploy)
```bash
npm run build              # next build continua verde?
npm run preview:cf         # sobe o Worker LOCAL (Miniflare) em http://localhost:8788
```
Conferir no preview local:
- [ ] Home, /servicos, /sobre, /portfolio, /contato, /privacidade, /blog renderizam.
- [ ] Chatbot responde (POST /api/chat) com DeepSeek; fallback Gemini.
- [ ] Splash/intro e os componentes three.js (fundo) carregam sem erro de console.
- [ ] robots.txt e sitemap.xml respondem.
- [ ] Lighthouse mobile ≥ 80 (regra dura da Bruna; ideal ≥ 90).

### 6. Deploy de teste no Cloudflare (subdomínio *.workers.dev — NÃO toca no domínio)
```bash
npx wrangler login
npm run deploy:cf          # publica em https://iv-solucoes.<conta>.workers.dev
```
Repetir os checks do passo 5 no domínio temporário `*.workers.dev`. **Domínio real intacto.**

### 7. Cutover do domínio (SÓ com ordem explícita do Victor — mexe em DNS)
1. No painel Cloudflare Workers → projeto `iv-solucoes` → **Custom Domains** → add `ivsolucoes.com.br`.
2. Na **Hostinger** (DNS atual), trocar o registro de `ivsolucoes.com.br`:
   - hoje aponta para a **Vercel** (`76.76.21.21` / CNAME Vercel).
   - passar para o alvo que a Cloudflare indicar (CNAME do Worker) — ou migrar os
     nameservers para a Cloudflare (recomendado, habilita CDN/SSL grátis da CF).
3. Aguardar propagação; validar HTTPS (SSL automático da Cloudflare).
4. Só **depois** de validado: remover/aposentar o projeto na Vercel (encerra a violação de ToS).

### 8. Pós-cutover
- Atualizar `PAINEL_DE_CONTROLE.md`: hospedagem Site IV = **Cloudflare Workers (free)**; Vercel removida.
- Conferir que a fatura da Vercel não tem mais o Site IV (se o Pro não for usado por outro sistema).

---

## Riscos concretos e mitigação
| Risco | Probabilidade | Mitigação |
|---|---|---|
| Rota `/api/chat` mudar p/ `runtime="edge"` no futuro | baixa | manter `nodejs`; documentado aqui |
| Bundle do Worker estourar (three.js) | baixa | three é client-side; validar no passo 5 |
| Rate-limit em memória (Map) zera a cada isolate | já existe na Vercel também | aceitável p/ site institucional; se precisar, Upstash Redis |
| DNS/propagação derrubar o site na troca | média | testar em `*.workers.dev` antes; trocar DNS em janela de baixo tráfego |
| Diferença de comportamento SSR Vercel × Worker | baixa | preview local (Miniflare) + deploy de teste cobrem |

## Rollback
Enquanto o projeto Vercel não for apagado, basta **reapontar o DNS de volta** para a Vercel.
Manter o projeto Vercel pausado (não deletado) por ~1 semana após o cutover.
