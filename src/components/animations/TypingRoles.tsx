"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** "Data Analyst" -> "Python Developer" -> ... rotating headline */
export default function TypingRoles({
  roles,
  interval = 2600,
  className,
}: {
  roles: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
    return () => clearInterval(id);
  }, [roles.length, interval]);

  return (
    <span className={className} style={{ display: "inline-grid" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: "0.5em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.5em", filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
