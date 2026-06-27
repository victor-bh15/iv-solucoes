import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Chatbot } from "@/components/Chatbot";
import { Analytics } from "@/components/Analytics";
import { SpaceBackground } from "@/components/SpaceBackground";
import { IntroSplash } from "@/components/IntroSplash";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "IV Soluções — IA, Sistemas e Sites sob medida",
    description:
      "Inteligências artificiais, sistemas e sites sob medida para o seu negócio.",
  },
  robots: { index: true, follow: true },
};

// Cor da barra do navegador (mobile) por tema — alinhada à marca.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Roda ANTES da primeira pintura. (1) Aplica o tema (.dark) e o idioma para
// evitar flash. (2) Liga a trava de scroll da abertura (#iv-splash já vem no
// HTML do servidor e é mostrado pelo CSS), garantindo que a MARCA apareça na
// hora ao abrir/atualizar, sem o conteúdo surgir antes da intro.
const bootScript = `
(function() {
  try {
    var el = document.documentElement;
    el.classList.add('dark'); // o site inicia SEMPRE no escuro
    var lang = localStorage.getItem('iv-lang');
    if (lang === 'en') el.lang = 'en';
    el.classList.add('iv-splash-active');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <IntroSplash />
        <ThemeProvider>
          <SpaceBackground />
          <LanguageProvider>
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy-700 focus:px-4 focus:py-2 focus:text-white"
            >
              Pular para o conteúdo
            </a>
            <Header />
            <main id="conteudo" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <Chatbot />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
