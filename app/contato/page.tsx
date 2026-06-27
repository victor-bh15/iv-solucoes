import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contato } from "@/components/sections/Contato";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a IV Soluções pelo WhatsApp (31) 99671-5639 ou por e-mail. Atendimento todos os dias, das 07h às 22h.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero section="contact" />
      <Contato showHeading={false} />
    </>
  );
}
