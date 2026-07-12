import type { Metadata } from "next";
import { DICT } from "@/lib/i18n";
import SegurancaClient from "./SegurancaClient";

export const metadata: Metadata = {
  title: DICT.pt.seguranca.meta.title,
  description: DICT.pt.seguranca.meta.description,
};

export default function SegurancaPage() {
  return <SegurancaClient />;
}
