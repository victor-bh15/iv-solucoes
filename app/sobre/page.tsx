import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Sobre } from "@/components/sections/Sobre";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a IV Soluções: tecnologia, inteligência artificial e sistemas sob medida para pequenas e médias empresas, startups e profissionais.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero section="about" />
      <Sobre showHeading={false} />
    </>
  );
}
