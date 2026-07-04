import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* sem JS, o conteúdo aparece direto (Reveal depende de JS) */}
        <noscript>
          <style>{`.iv-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
