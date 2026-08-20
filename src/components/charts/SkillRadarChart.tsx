"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { skillRadarData } from "@/data/skills";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CHART, SERIES, tooltipStyle } from "./chartTheme";

/** Mobile pe poore category naam ring ke bahar nikal jaate hain. */
const SHORT: Record<string, string> = {
  "BI & Reporting": "BI",
  "SQL & Databases": "SQL",
  Programming: "Code",
  "ETL & Data Eng": "ETL",
  Automation: "Auto",
};

export default function SkillRadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isSm = useMediaQuery("(min-width: 640px)");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      /* mobile thoda lamba — short labels ki legend ko jagah chahiye */
      className="flex h-[380px] w-full flex-col sm:h-[360px]"
    >
      <h3 className="mb-1 text-sm font-medium text-fg">Skill coverage by area</h3>
      <p className="mb-3 font-mono text-[11px] text-muted">Average proficiency, 0–100</p>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skillRadarData} outerRadius={isSm ? "72%" : "62%"}>
            <PolarGrid stroke={CHART.grid} />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: CHART.muted, fontSize: isSm ? 11 : 10 }}
              tickFormatter={(v: string) => (isSm ? v : (SHORT[v] ?? v))}
            />
            {/* mobile pe radius ticks sirf shor hain — chhupa diya */}
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={isSm ? { fill: CHART.muted, fontSize: 10 } : false}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ stroke: CHART.axis }}
              formatter={(v: number) => [`${v}/100`, "Proficiency"]}
            />
            <Radar
              dataKey="level"
              stroke={SERIES[0]}
              strokeWidth={2}
              fill={SERIES[0]}
              fillOpacity={0.22}
              isAnimationActive={inView}
              animationDuration={1400}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* short labels ka matlab mobile pe legend se clear ho */}
      {!isSm && (
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {skillRadarData.map((d) => (
            <li key={d.category} className="label-mono tracking-[0.12em]">
              {SHORT[d.category] ?? d.category}
              <span className="ml-1 text-fg/70">= {d.category}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
