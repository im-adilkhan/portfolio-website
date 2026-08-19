"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toolsUsage } from "@/data/skills";
import { CHART, SERIES, tooltipStyle } from "./chartTheme";

export default function ToolsUsagePieChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="h-[340px] w-full"
    >
      <h3 className="mb-1 text-sm font-medium text-fg">Where the week actually goes</h3>
      <p className="mb-3 font-mono text-[11px] text-muted">Share of hands-on time</p>

      <div className="flex h-[82%] items-center gap-4">
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number, n: string) => [`${v}%`, n]}
            />
            <Pie
              data={toolsUsage}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={2}
              stroke={CHART.surface}
              strokeWidth={2}
              isAnimationActive={inView}
              animationDuration={1200}
            >
              {toolsUsage.map((_, i) => (
                <Cell key={i} fill={SERIES[i % SERIES.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* legend — identity kabhi color-alone nahi */}
        <ul className="flex-1 space-y-2">
          {toolsUsage.map((t, i) => (
            <li key={t.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ background: SERIES[i % SERIES.length] }}
                aria-hidden
              />
              <span className="text-fg">{t.name}</span>
              <span className="ml-auto font-mono tabular-nums text-muted">{t.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
