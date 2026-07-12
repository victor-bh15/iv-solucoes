import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ivsolucoes.com.br"),
  title: {
    default: "IV Soluções — IA, Sistemas e Sites sob medida",
    template: "%s | IV Soluções",
  },
  description:
    "A IV Soluções cria inteligências artificiais, sistemas e sites sob medida para deixar o seu negócio muito mais inteligente. Atendimento das 07h às 22h.",
  keywords: [
    "inteligência artificial",
    "criação de sites",
    "desenvolvimento de sistemas",
    "automação com IA",
    "chatbot",
    "IV Soluções",
  ],
  authors: [{ name: "IV Soluções" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "IV Soluções",
    title: "IV Soluções — IA, Sistemas e Sites sob medida",
    description:
      "Inteligências artificiais, sistemas e sites sob medida para o seu negócio.",
    url: "https://ivsolucoes.com.br",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IV Soluções — IA, Sistemas e Sites sob medida",
    description:
      "Inteligências artificiais, sistemas e sites sob medida para o seu negócio.",
    images: ["/og.jpg"],
  },
};

// Falha-segura (playbook Fable): habilita a classe `js` no <html> ANTES de
// qualquer reveal — se o script falhar, o CSS estático já mostra tudo.
// Garantidor independente: revela qualquer .iv-reveal ainda oculto após 1.4s
// (cobre falha silenciosa do IntersectionObserver/React).
const BOOT_SCRIPT = `
document.documentElement.classList.add('js');
setTimeout(function () {
  document.querySelectorAll('.iv-reveal:not(.iv-revealed)').forEach(function (el) {
    el.classList.add('iv-revealed');
  });
}, 1400);
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* script inline no INÍCIO do body — nunca ancorado em `load` */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        {/* sem JS, o conteúdo aparece direto (Reveal depende de JS) */}
        <noscript>
          <style>{`.iv-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
