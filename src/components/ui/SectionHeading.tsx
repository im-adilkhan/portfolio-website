"use client";

import { motion } from "framer-motion";
import { drawLine, fadeInUp, VIEWPORT } from "@/lib/animations";
import SplitText from "@/components/animations/SplitText";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-4 flex items-center gap-2.5"
        >
          <span aria-hidden className="h-2.5 w-2.5 bg-accent" />
          <span className="label-mono text-accent">{eyebrow}</span>
        </motion.p>
      )}

      <SplitText
        as="h2"
        text={title}
        className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
      />

      <motion.div
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={cn(
          "axis-rule relative mt-6 w-full origin-left",
          align === "center" && "origin-center"
        )}
      >
        {/* axis pe highlighted range */}
        <span
          aria-hidden
          className={cn(
            "absolute top-0 h-px w-16 bg-accent",
            align === "center" && "left-1/2 -translate-x-1/2"
          )}
        />
      </motion.div>

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ delay: 0.15 }}
          className="mt-5 text-base leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
