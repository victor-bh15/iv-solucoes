"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em ms para escalonar elementos em sequência */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Revela o conteúdo com uma animação sutil de "subir e aparecer" (mola) quando
 * ele entra na tela. Respeita prefers-reduced-motion: nesse caso aparece
 * imediatamente, sem movimento.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 20,
        delay: delay / 1000,
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </MotionTag>
  );
}
