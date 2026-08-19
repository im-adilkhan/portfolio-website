"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent2 shadow-[0_0_0_0_rgb(var(--accent)/0.5)] hover:shadow-[0_8px_30px_-6px_rgb(var(--accent)/0.55)]",
  outline: "border border-line text-fg hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-fg",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
    styles[variant],
    className
  );

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="contents"
    >
      {children}
    </motion.span>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
