import { Hero } from "@/components/sections/Hero";
import { Servicos } from "@/components/sections/Servicos";
import { Portfolio } from "@/components/sections/Portfolio";
import { Sobre } from "@/components/sections/Sobre";
import { Contato } from "@/components/sections/Contato";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicos />
      <Portfolio />
      <Sobre />
      <Contato />
    </>
  );
}
