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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CHART, SERIES, tooltipStyle } from "./chartTheme";

const data = [...experience]
  .reverse()
  .map((job) => ({ role: job.role.replace(" & AI Automation Engineer", " (AI Auto.)"), months: job.months }));

type TickProps = {
  x?: number;
  y?: number;
  payload?: { value?: string };
  maxChars: number;
  fontSize: number;
};

/**
 * Recharts ka default category tick wrap nahi hota — mobile ki chhoti axis width
 * pe "Data Analyst (AI Auto.)" bas kat jaata tha. Ye do line tak word-wrap karta hai.
 */
function WrappedTick({ x = 0, y = 0, payload, maxChars, fontSize }: TickProps) {
  const words = String(payload?.value ?? "").split(" ");
  const lines: string[] = [];

  for (const word of words) {
    const last = lines[lines.length - 1];
    if (last && `${last} ${word}`.length <= maxChars) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
  }

  const shown = lines.slice(0, 2);
  if (lines.length > 2) shown[1] = `${shown[1]}…`;
  const offset = -((shown.length - 1) * fontSize * 1.15) / 2;

  return (
    <text x={x} y={y} textAnchor="end" fill={CHART.muted} fontSize={fontSize}>
      {shown.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? offset : fontSize * 1.15}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function ExperienceBarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isSm = useMediaQuery("(min-width: 640px)");
  const total = data.reduce((sum, d) => sum + d.months, 0);

  const axisWidth = isSm ? 150 : 104;
  const fontSize = isSm ? 11 : 10;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      /* fixed height + % wali chart height thi: heading do line mein wrap hote hi
         chart container se bahar nikal jaata tha. Ab flex column hai. */
      className="flex h-[320px] w-full flex-col sm:h-[360px]"
    >
      <h3 className="mb-1 text-sm font-medium text-fg">Time in each role</h3>
      <p className="mb-3 font-mono text-[11px] text-muted">
        Months · {total} total ({(total / 12).toFixed(1)} years)
      </p>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: isSm ? 40 : 30, bottom: 0, left: 0 }}
          >
            <CartesianGrid stroke={CHART.grid} horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: CHART.muted, fontSize }}
              tickLine={false}
              axisLine={{ stroke: CHART.axis }}
            />
            <YAxis
              type="category"
              dataKey="role"
              width={axisWidth}
              tickLine={false}
              axisLine={false}
              tick={<WrappedTick maxChars={isSm ? 24 : 15} fontSize={fontSize} />}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              formatter={(v: number) => [`${v} months`, "Duration"]}
            />
            <Bar
              dataKey="months"
              radius={[0, 4, 4, 0]}
              barSize={isSm ? 26 : 20}
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
                fontSize={fontSize}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
