"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { experience } from "@/data/experience";
import { CHART, SERIES, tooltipStyle } from "./chartTheme";

const data = [...experience]
  .reverse()
  .map((job) => ({ role: job.role.replace(" & AI Automation Engineer", " (AI Auto.)"), months: job.months }));

export default function ExperienceBarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const total = data.reduce((sum, d) => sum + d.months, 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="h-[340px] w-full"
    >
      <h3 className="mb-1 text-sm font-medium text-fg">Time in each role</h3>
      <p className="mb-3 font-mono text-[11px] text-muted">
        Months · {total} total ({(total / 12).toFixed(1)} years)
      </p>

      <ResponsiveContainer width="100%" height="82%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 40, bottom: 0, left: 8 }}
        >
          <CartesianGrid stroke={CHART.grid} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: CHART.muted, fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: CHART.axis }}
          />
          <YAxis
            type="category"
            dataKey="role"
            width={150}
            tick={{ fill: CHART.muted, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            formatter={(v: number) => [`${v} months`, "Duration"]}
          />
          <Bar
            dataKey="months"
            radius={[0, 4, 4, 0]}
            barSize={26}
            isAnimationActive={inView}
            animationDuration={1200}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={SERIES[i % SERIES.length]} />
            ))}
            <LabelList
              dataKey="months"
              position="right"
              formatter={(v: number) => `${v} mo`}
              fill={CHART.ink2}
              fontSize={11}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
