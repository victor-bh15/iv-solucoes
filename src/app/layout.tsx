import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IV Soluções em IA — Seu negócio, muito mais inteligente",
  description:
    "Criamos inteligências artificiais, sistemas e sites que automatizam tarefas, organizam seus dados e fazem sua empresa render mais. Chatbots, automação, sistemas sob medida e consultoria em IA.",
  keywords: ["IA", "inteligência artificial", "chatbot", "automação", "sistemas sob medida", "consultoria IA", "IV Soluções"],
  authors: [{ name: "IV Soluções em IA" }],
  openGraph: {
    title: "IV Soluções em IA — Seu negócio, muito mais inteligente",
    description: "IA, sistemas e sites que automatizam tarefas e fazem sua empresa render mais.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#08070F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
