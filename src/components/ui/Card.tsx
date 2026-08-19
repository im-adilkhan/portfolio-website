"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Dashboard panel — halka 3D tilt + cursor glow, corner crop-ticks ke saath.
 * `label` doge to upar mono header strip aa jaayegi (BI tile jaisa).
 */
export default function Card({
  children,
  className,
  label,
  tilt = 5,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  tilt?: number;
  glow?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [tilt, -tilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-tilt, tilt]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-surface/60 backdrop-blur-xl transition-colors duration-300 hover:border-accent/40",
        className
      )}
    >
      {/* panel ke andar ki faint graph paper */}
      <div aria-hidden className="grid-paper pointer-events-none absolute inset-0 opacity-60" />

      {glow && (
        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(300px circle at var(--gx) var(--gy), rgb(var(--accent)/0.12), transparent 70%)`,
            ["--gx" as string]: glowX,
            ["--gy" as string]: glowY,
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {/* corner crop-ticks — hover pe accent */}
      <CornerTicks />

      <div style={{ transform: "translateZ(40px)" }} className="relative h-full">
        {label && (
          <div className="flex items-center justify-between border-b border-line/70 px-5 py-2.5">
            <span className="label-mono">{label}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50 transition-colors group-hover:bg-accent" />
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}

function CornerTicks() {
  const base =
    "pointer-events-none absolute h-2.5 w-2.5 border-muted/30 transition-colors duration-300 group-hover:border-accent";
  return (
    <div aria-hidden>
      <span className={cn(base, "left-2 top-2 border-l border-t")} />
      <span className={cn(base, "right-2 top-2 border-r border-t")} />
      <span className={cn(base, "bottom-2 left-2 border-b border-l")} />
      <span className={cn(base, "bottom-2 right-2 border-b border-r")} />
    </div>
  );
}
