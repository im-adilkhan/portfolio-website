"use client";

import { motion } from "framer-motion";
import { charReveal, staggerFast, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Character-by-character reveal. Words wrap-safe rehte hain. */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      variants={{
        ...staggerFast,
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn("inline-block", className)}
      style={{ perspective: 800 }}
      aria-label={text}
    >
      {text.split(" ").map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={`${char}-${ci}`}
              variants={charReveal}
              className="inline-block will-change-transform"
              aria-hidden
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </MotionTag>
  );
}
