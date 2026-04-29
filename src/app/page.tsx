import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Manifesto from '@/components/Manifesto';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Manifesto />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <ChatBot />
    </LanguageProvider>
  );
}
