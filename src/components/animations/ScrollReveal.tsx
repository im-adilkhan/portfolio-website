"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-linked parallax + fade. `speed` jitna zyada, utna zyada parallax.
 */
export default function ScrollReveal({
  children,
  speed = 60,
  fade = true,
  scale = false,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  fade?: boolean;
  scale?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scaleV = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity: fade ? opacity : undefined,
        scale: scale ? scaleV : undefined,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
