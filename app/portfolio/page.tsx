import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Portfolio } from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Conheça projetos já entregues pela IV Soluções: sistemas de gestão, assistentes de IA e painéis de indicadores em tempo real.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero section="portfolio" />
      <Portfolio showHeading={false} />
    </>
  );
}
