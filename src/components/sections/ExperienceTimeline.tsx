"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education, experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-x section-y relative mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="From intern maintaining master datasets to owning MIS reporting and building automation end to end."
      />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        {/* scroll-drawn spine */}
        <div className="absolute left-0 top-2 h-full w-px bg-line sm:left-2">
          <motion.div
            style={{ scaleY: lineScale }}
            className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent2"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="space-y-14"
        >
          {experience.map((job) => (
            <motion.div key={`${job.company}-${job.period}`} variants={fadeInUp} className="relative">
              <span className="absolute -left-8 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-bg bg-accent sm:-left-10" />

              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {job.period}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {job.role}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {job.company} · {job.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>

              <ul className="mt-4 space-y-2">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 sm:mt-20">
        <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Education
        </h3>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-6 space-y-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.degree}
              variants={fadeInUp}
              className="rounded-xl border border-line bg-surface/40 p-5 backdrop-blur-xl sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg font-semibold tracking-tight">
                  {edu.degree}
                </h4>
                <span className="font-mono text-xs text-muted">{edu.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {edu.school} · {edu.location}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {edu.coursework.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
