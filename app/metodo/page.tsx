import type { Metadata } from "next";
import { DICT } from "@/lib/i18n";
import MetodoClient from "./MetodoClient";

export const metadata: Metadata = {
  title: { absolute: DICT.pt.methodPage.meta.title },
  description: DICT.pt.methodPage.meta.description,
};

export default function MetodoPage() {
  return <MetodoClient />;
}
