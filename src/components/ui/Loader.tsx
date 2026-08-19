"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} role="status">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-current"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </span>
  );
}
