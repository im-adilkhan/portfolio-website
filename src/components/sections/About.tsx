"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/socials";
import { stats } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/animations/CountUp";
import StaggerContainer from "@/components/animations/StaggerContainer";
import PipelineCard from "@/components/charts/PipelineCard";
import { SERIES } from "@/components/charts/chartTheme";
import { fadeInUp } from "@/lib/animations";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="About"
        title="From raw data to decisions"
        subtitle={`Based in ${profile.location}. I build the reporting layer teams run on — and then automate the parts nobody should be doing by hand.`}
      />

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <StaggerContainer className="space-y-5 text-base leading-relaxed text-muted">
            <motion.p variants={fadeInUp}>
              I&apos;m a Data Analyst with 2+ years across MIS reporting, dashboard
              development and recruitment-industry analytics. Day to day that means SQL
              and Python for the analysis, Power BI and Excel for getting it in front of
              people, and whatever scripting it takes to stop the same work repeating
              next week.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Most of my work starts messy — scattered spreadsheets, inconsistent
              datatypes, no schema guarantees. I focus on data extraction, cleaning,
              validation and transformation first, because a dashboard built on
              unvalidated data is worse than no dashboard.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Recently I designed an end-to-end ETL/ELT platform processing 2.2M+ loan
              records through Python, dbt, DuckDB and PostgreSQL into a governed
              warehouse with Superset dashboards on top. Alongside that, I build workflow
              automation on Google Apps Script and Excel VBA.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Currently pursuing a BCA at Dr. A.P.J. Abdul Kalam Technical University,
              and open to Data Analyst / MIS / BI roles.
            </motion.p>
          </StaggerContainer>

          {/* KPI tiles — dashboard scorecard */}
          <StaggerContainer className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="group relative bg-bg px-4 py-5 transition-colors hover:bg-surface"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px opacity-70"
                  style={{ background: SERIES[i % SERIES.length] }}
                />
                <p className="label-mono mb-3 leading-relaxed">{s.label}</p>
                <p
                  className="font-mono text-3xl font-semibold tracking-tight"
                  style={{ color: SERIES[i % SERIES.length] }}
                >
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        <PipelineCard />
      </div>
    </section>
  );
}
