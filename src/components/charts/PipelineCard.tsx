"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SERIES } from "./chartTheme";
import CountUp from "@/components/animations/CountUp";

const stages = [
  { name: "Extract", detail: "Raw loan extracts" },
  { name: "Validate", detail: "Schema + business rules" },
  { name: "Transform", detail: "Clean, dedupe, cast" },
  { name: "Feature engineering", detail: "Ratios, segments, risk" },
  { name: "Load", detail: "DuckDB + PostgreSQL" },
  { name: "Model (dbt)", detail: "Staging → marts + tests" },
  { name: "Serve", detail: "SQL views + Superset" },
];

export default function PipelineCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-lg border border-line bg-surface/60 p-5 backdrop-blur-xl sm:p-6"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Loan Analytics pipeline
      </p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        <CountUp end={2.2} decimals={1} suffix="M+" />
        <span className="ml-2 align-middle text-xs font-normal text-muted">
          records processed
        </span>
      </p>

      <ol className="mt-6 space-y-0">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.name}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-4 pb-5 last:pb-0"
          >
            {/* connector */}
            {i < stages.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[5px] top-3 h-full w-px bg-line"
              />
            )}
            <span
              className="relative mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: SERIES[i % SERIES.length] }}
              aria-hidden
            />
            <div className="-mt-0.5">
              <p className="text-sm font-medium text-fg">{stage.name}</p>
              <p className="text-xs text-muted">{stage.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}
