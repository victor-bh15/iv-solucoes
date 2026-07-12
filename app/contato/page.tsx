import type { Metadata } from "next";
import { DICT } from "@/lib/i18n";
import ContatoClient from "./ContatoClient";

export const metadata: Metadata = {
  title: { absolute: DICT.pt.contactPage.meta.title },
  description: DICT.pt.contactPage.meta.description,
};

export default function ContatoPage() {
  return <ContatoClient />;
}
