import type { Metadata } from "next";
import { DICT } from "@/lib/i18n";
import SobreClient from "./SobreClient";

export const metadata: Metadata = {
  title: { absolute: DICT.pt.aboutPage.meta.title },
  description: DICT.pt.aboutPage.meta.description,
};

export default function SobrePage() {
  return <SobreClient />;
}
