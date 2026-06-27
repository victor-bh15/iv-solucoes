import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Servicos } from "@/components/sections/Servicos";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Inteligências artificiais, sistemas e sites sob medida. Conheça os serviços da IV Soluções para deixar o seu negócio mais inteligente.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHero section="services" />
      <Servicos showHeading={false} />
    </>
  );
}
