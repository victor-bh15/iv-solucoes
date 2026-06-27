# Como publicar o site na internet (Vercel) — passo a passo

O site será publicado **grátis** na Vercel. Você fará tudo pelo navegador,
clicando — **eu não preciso (e não devo) acessar suas contas ou senhas.**

> Antes de publicar, confira que `npm run build` roda sem erros (já testamos ✅).

---

## Recomendado: publicar pelo GitHub (atualiza sozinho depois)

### 1) Criar um repositório no GitHub
- Entre em https://github.com e faça login.
- Clique em **New repository** (Novo repositório).
- Dê um nome (ex.: `site-iv-solucoes`), deixe **Private** se quiser, e clique
  em **Create repository**. Não marque nenhuma opção extra.

### 2) Enviar o código (no terminal, dentro da pasta `iv-solucoes`)
```bash
git add .
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/site-iv-solucoes.git
git push -u origin main
```
(Troque `SEU-USUARIO` e o nome do repositório pelos seus.)

### 3) Conectar na Vercel
- Entre em https://vercel.com e faça login **com a conta do GitHub**.
- Clique em **Add New → Project**.
- Selecione o repositório `site-iv-solucoes` e clique em **Import**.

### 4) Configurar as chaves de IA (variáveis de ambiente)
Antes de clicar em Deploy, abra **Environment Variables** e adicione:

| Name | Value |
|------|-------|
| `DEEPSEEK_API_KEY` | sua chave do DeepSeek |
| `GEMINI_API_KEY` | sua chave do Gemini |
| `NEXT_PUBLIC_GA_ID` | seu ID do Analytics (opcional) |

> Cole as chaves aqui na Vercel (é um lugar seguro). Sem isso, o chatbot
> mostra a mensagem pedindo contato no WhatsApp, mas o site funciona normal.

### 5) Publicar
- Clique em **Deploy**. Em 1–2 minutos o site estará no ar, num endereço
  como `site-iv-solucoes.vercel.app`.
- **Daqui pra frente:** sempre que você rodar `git push`, a Vercel atualiza
  o site sozinha. 🎉

---

## Quando comprar o domínio próprio (ex.: ivsolucoes.com.br)

1. Na Vercel: seu projeto → **Settings → Domains → Add**.
2. Digite seu domínio. A Vercel mostra uns registros DNS.
3. Cole esses registros no painel de onde você comprou o domínio
   (Registro.br, GoDaddy, Hostinger, etc.).
4. O cadeado HTTPS é configurado automaticamente.

Depois de conectar o domínio, me avise para eu atualizar o endereço em
`lib/site.ts` (campo `url`) — isso ajuda o SEO e o compartilhamento em redes.

---

## Alternativa rápida (sem GitHub): Vercel CLI
```bash
npm i -g vercel
vercel          # segue as perguntas (Enter aceita os padrões) e faz login no navegador
vercel --prod   # publica a versão final
```
Lembre de adicionar as chaves depois em **Settings → Environment Variables**.
