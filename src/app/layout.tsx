import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IV Soluções em IA — Transformamos ideias em inteligência",
  description:
    "A melhor maneira de pensar, interagir e agir. Chatbots, automação de processos e consultoria em IA para o seu negócio.",
  keywords: ["IA", "inteligência artificial", "chatbot", "automação", "consultoria IA", "IV Soluções"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] antialiased">
        {children}
      </body>
    </html>
  );
}
