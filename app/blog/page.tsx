import type { Metadata } from "next";
import { BlogEmConstrucao } from "@/components/BlogEmConstrucao";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Em breve: conteúdos sobre inteligência artificial, tecnologia e inovação pela IV Soluções.",
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return <BlogEmConstrucao />;
}
