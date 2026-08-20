"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile, socials } from "@/data/socials";
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

  // route badla -> menu band, warna navigate ke baad overlay khula reh jaata hai
  useEffect(() => setOpen(false), [pathname]);

  // menu khula ho to background scroll lock + Escape se band
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // desktop width pe resize hua to mobile overlay hata do
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

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
          scrolled || open
            ? "border-b border-line/70 bg-bg/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-4 sm:py-6"
        )}
      >
        <nav className="section-x mx-auto flex max-w-6xl items-center justify-between">
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

          {/* icon 22px hai — tap target padding se 44px kiya, bina layout hilaye */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2.5 flex h-11 w-11 items-center justify-center text-fg md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            /* overflow-y-auto: landscape phone pe menu viewport se lamba ho sakta hai */
            className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-bg/95 backdrop-blur-2xl md:hidden"
          >
            <div className="section-x flex min-h-full flex-col justify-center gap-7 py-24">
              <ul className="flex flex-col gap-5">
                {navLinks.map((link, i) => {
                  const active =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.07, duration: 0.5 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline gap-3 font-display text-4xl tracking-tight transition-colors",
                          active ? "text-accent" : "text-fg hover:text-accent"
                        )}
                      >
                        <span className="label-mono w-6 shrink-0 text-muted/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="border-t border-line pt-7"
              >
                {/* resume desktop-only tha — mobile pe bhi chahiye */}
                <Button href={profile.resume} variant="outline" className="w-full">
                  Resume
                </Button>

                <ul className="mt-6 space-y-1">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-baseline justify-between gap-4 py-2.5 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <span className="shrink-0">{s.label}</span>
                        <span className="truncate font-mono text-xs">{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
