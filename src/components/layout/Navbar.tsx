"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/socials";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import MagneticButton from "@/components/animations/MagneticButton";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const progress = useScrollProgress();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      {/* scroll progress bar */}
      <div className="fixed left-0 top-0 z-50 h-0.5 w-full bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-accent to-accent2"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-line/70 bg-bg/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6"
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight transition-colors hover:text-accent"
          >
            <span aria-hidden className="flex h-4 items-end gap-[3px]">
              <span className="w-[3px] bg-muted transition-all duration-300 group-hover:bg-accent" style={{ height: "45%" }} />
              <span className="w-[3px] bg-muted transition-all duration-300 group-hover:bg-accent" style={{ height: "75%" }} />
              <span className="w-[3px] bg-accent transition-all duration-300" style={{ height: "100%" }} />
            </span>
            {profile.name.split(" ")[0]}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative block px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-md border border-line bg-surface"
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <span className="label-mono tabular-nums" aria-hidden>
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
            <MagneticButton>
              <Button href={profile.resume} variant="outline" className="px-5 py-2.5">
                Resume
              </Button>
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-fg md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-bg/95 backdrop-blur-2xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl tracking-tight hover:text-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
