"use client";

import { motion } from "framer-motion";
import { staggerContainer, VIEWPORT } from "@/lib/animations";

export default function StaggerContainer({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      variants={{
        ...staggerContainer,
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}
