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
import { CHART, SERIES, tooltipStyle } from "./chartTheme";

export default function SkillRadarChart() {
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
      <h3 className="mb-1 text-sm font-medium text-fg">Skill coverage by area</h3>
      <p className="mb-3 font-mono text-[11px] text-muted">Average proficiency, 0–100</p>

      <ResponsiveContainer width="100%" height="82%">
        <RadarChart data={skillRadarData} outerRadius="72%">
          <PolarGrid stroke={CHART.grid} />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: CHART.muted, fontSize: 11 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={{ fill: CHART.muted, fontSize: 10 }}
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
    </motion.div>
  );
}
