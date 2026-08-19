"use client";

import { motion } from "framer-motion";
import { fadeIn, VIEWPORT } from "@/lib/animations";

export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
