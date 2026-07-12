import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DICT, type SolutionSlug } from "@/lib/i18n";
import SolucaoClient from "./SolucaoClient";

export function generateStaticParams() {
  return DICT.pt.solutions.items.map((item) => ({ slug: item.slug }));
}

function findSlug(slug: string): SolutionSlug | null {
  const known = Object.keys(DICT.pt.solutionPages.items) as SolutionSlug[];
  return known.includes(slug as SolutionSlug) ? (slug as SolutionSlug) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findSlug(slug);
  // meta.title do conteúdo já vem com o sufixo "— IV Soluções" (BRUNA/HELENA) —
  // `absolute` evita duplicar com o template "%s | IV Soluções" do layout raiz.
  const title = found ? DICT.pt.solutionPages.items[found].meta.title : "Solução";
  return { title: { absolute: title } };
}

export default async function SolucaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findSlug(slug);
  if (!found) notFound();

  return <SolucaoClient slug={found} />;
}
