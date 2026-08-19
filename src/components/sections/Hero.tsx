"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/socials";
import SplitText from "@/components/animations/SplitText";
import TypingRoles from "@/components/animations/TypingRoles";
import MagneticButton from "@/components/animations/MagneticButton";
import Button from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/animations";

/** Hero ka background chart — decorative, isliye real data nahi, sirf shape. */
const TREND = [42, 38, 47, 44, 58, 52, 66, 61, 75, 70, 84, 92];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* graph paper */}
      <div
        aria-hidden
        className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_78%)]"
      />
      {/* baseline area chart */}
      <TrendBackdrop />
      {/* scanning gridline — jaise dashboard refresh ho raha ho */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-accent/[0.05] to-transparent" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-6xl px-6 pt-28"
      >
        {/* status bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-line bg-surface/60 px-3 py-2 backdrop-blur-xl"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent2" />
            </span>
            <span className="label-mono text-fg/80">
              {profile.available ? "Available for work" : "Currently booked"}
            </span>
          </span>
          <span aria-hidden className="h-3 w-px bg-line" />
          <span className="label-mono">{profile.location}</span>
          <span aria-hidden className="h-3 w-px bg-line" />
          <span className="label-mono">SQL · Python · Power BI</span>
        </motion.div>

        <h1 className="font-display text-[13vw] font-semibold leading-[0.92] tracking-tighter sm:text-[9vw] lg:text-[7.5rem]">
          <SplitText text={profile.name} delay={0.25} stagger={0.035} />
          <span className="block text-accent">
            <TypingRoles roles={profile.roles} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT_EXPO }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE_OUT_EXPO }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <Button href="/projects">View my work</Button>
          </MagneticButton>
          <MagneticButton>
            <Button href="/contact" variant="outline">
              Get in touch
            </Button>
          </MagneticButton>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Neeche chalta hua area chart — sirf texture ke liye, aria-hidden. */
function TrendBackdrop() {
  const w = 1200;
  const h = 300;
  const max = Math.max(...TREND);
  const points = TREND.map((v, i) => {
    const x = (i / (TREND.length - 1)) * w;
    const py = h - (v / max) * h * 0.82;
    return `${x.toFixed(1)},${py.toFixed(1)}`;
  });

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] w-full opacity-70"
    >
      <defs>
        <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.20" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6 }}
        points={`0,${h} ${points.join(" ")} ${w},${h}`}
        fill="url(#hero-area)"
      />
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
        points={points.join(" ")}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeOpacity={0.55}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
