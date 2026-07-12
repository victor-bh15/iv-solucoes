import type { Metadata } from "next";
import { DICT } from "@/lib/i18n";
import SolucoesClient from "./SolucoesClient";

export const metadata: Metadata = {
  title: DICT.pt.solutionsIndex.meta.title,
  description: DICT.pt.solutionsIndex.meta.description,
};

export default function SolucoesPage() {
  return <SolucoesClient />;
}
