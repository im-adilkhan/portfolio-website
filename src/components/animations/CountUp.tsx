"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  compact = true,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(decimals > 0 ? Number(v.toFixed(decimals)) : Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, end, duration, decimals]);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : compact && end >= 10000
        ? formatNumber(count)
        : String(count);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
