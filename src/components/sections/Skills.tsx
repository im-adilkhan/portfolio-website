"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills, SKILL_CATEGORIES } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillRadarChart from "@/components/charts/SkillRadarChart";
import ToolsUsagePieChart from "@/components/charts/ToolsUsagePieChart";
import { SERIES } from "@/components/charts/chartTheme";
import { EASE_OUT_EXPO } from "@/lib/animations";

/** Har category ka apna series color — radar chart se match karta hai. */
function categoryColor(category: string) {
  const i = SKILL_CATEGORIES.indexOf(category as (typeof SKILL_CATEGORIES)[number]);
  return SERIES[(i < 0 ? 0 : i) % SERIES.length];
}

function SkillBar({
  name,
  level,
  category,
  index,
}: {
  name: string;
  level: number;
  category: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const color = categoryColor(category);

  return (
    <div ref={ref} className="group">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="flex items-center gap-2 text-sm text-fg">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0"
            style={{ backgroundColor: color }}
          />
          {name}
        </span>
        <span className="font-mono text-xs tabular-nums text-muted">{level}%</span>
      </div>

      {/* track + 25% gridlines — chart axis jaisa */}
      <div className="relative h-1.5 bg-line/70">
        <div aria-hidden className="absolute inset-0 flex justify-between">
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className="w-px bg-bg/70" />
          ))}
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.05, ease: EASE_OUT_EXPO }}
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Skills"
        title="Toolkit"
        subtitle="The stack I work in day to day — from SQL and Python through to the BI layer and the automation that keeps it running. Levels are self-assessed."
      />

      <ul className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
        {SKILL_CATEGORIES.map((c, i) => (
          <li key={c} className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2"
              style={{ backgroundColor: SERIES[i % SERIES.length] }}
            />
            <span className="label-mono">{c}</span>
          </li>
        ))}
      </ul>

      <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            category={skill.category}
            index={i}
          />
        ))}
      </div>

      <div className="mt-20 grid gap-8 rounded-lg border border-line bg-surface/40 p-6 backdrop-blur-xl lg:grid-cols-2">
        <SkillRadarChart />
        <ToolsUsagePieChart />
      </div>
    </section>
  );
}
