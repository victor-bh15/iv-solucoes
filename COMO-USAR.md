# Guia rápido — Site IV Soluções

Bem-vindo! Este é o site da IV Soluções, feito em **Next.js + Tailwind CSS**.
Aqui está tudo que você precisa para mexer nele, sem complicação.

---

## ▶️ Como ver o site no seu computador

1. Abra o terminal nesta pasta (`iv-solucoes`).
2. Rode uma vez (só na primeira vez): `npm install`
3. Para ligar: `npm run dev`
4. Abra **http://localhost:3000** no navegador.

Para desligar, volte ao terminal e aperte `Ctrl + C`.

---

## 🤖 Ligar o assistente de IA (chatbot)

O chatbot precisa de uma chave de IA para funcionar. **Sem chave, ele mostra
uma mensagem pedindo para falar no WhatsApp** (o site funciona normal).

Para ativar:

1. Abra o arquivo **`.env.local`** (está nesta pasta).
2. Cole suas chaves depois do `=`, **sem aspas**. Exemplo:
   ```
   DEEPSEEK_API_KEY=sk-suachaveaqui
   GEMINI_API_KEY=AIzaSy...suachaveaqui
   ```
   - Chave DeepSeek: https://platform.deepseek.com
   - Chave Gemini: https://aistudio.google.com/apikey
   - Você pode colocar só uma das duas. O site usa o DeepSeek primeiro e,
     se faltar, usa o Gemini.
3. Salve o arquivo e reinicie o `npm run dev`.

> 🔒 **Nunca** compartilhe essas chaves com ninguém nem cole na internet.
> O arquivo `.env.local` não é enviado para o GitHub — fica só no seu PC.

O assistente é **proibido de inventar**: ele só responde sobre a IV Soluções e,
quando não sabe, encaminha para o WhatsApp.

---

## 📊 Google Analytics (acompanhar visitas) — opcional

1. Crie uma conta em https://analytics.google.com e pegue o ID (formato `G-XXXXXXXXXX`).
2. No `.env.local`, preencha: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Salve e reinicie. Pronto — as visitas começam a ser contadas.

---

## ✏️ Onde mudar os textos e dados

- **Textos do site (PT e EN):** `lib/i18n.ts`
- **Telefone, e-mails, horário, WhatsApp:** `lib/site.ts`
- **Cores e fontes:** `app/globals.css`
- **O que o assistente de IA sabe:** `app/api/chat/route.ts` (a "BASE DE CONHECIMENTO")

---

## 🖼️ Trocar as imagens dos projetos (portfólio)

Hoje o portfólio usa prévias visuais geradas por código. Se quiser usar os
**prints reais** dos sistemas:

1. Salve as imagens em `public/projetos/`.
2. Me chame que eu troco as prévias pelas imagens — leva poucos minutos.

---

## 🚀 Publicar na internet (deploy)

O passo a passo completo está no arquivo **`DEPLOY.md`**.
