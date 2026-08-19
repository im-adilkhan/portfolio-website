"use client";

import { motion } from "framer-motion";
import { fadeInUp, VIEWPORT } from "@/lib/animations";

export default function SlideUp({
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
      variants={fadeInUp}
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
