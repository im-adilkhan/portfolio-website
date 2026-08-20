"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { projects as allProjects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CountUp from "@/components/animations/CountUp";
import { SERIES } from "@/components/charts/chartTheme";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full" label={`${project.year} · ${project.role}`}>
        <Link href={`/projects/${project.slug}`} className="block h-full p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <ArrowUpRight
              size={20}
              className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </div>

          <p className="text-sm leading-relaxed text-muted">{project.description}</p>

          {project.metrics.length > 0 ? (
            <div className="my-6 grid grid-cols-1 gap-3 border-y border-line py-4 sm:grid-cols-3">
              {project.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between gap-3 sm:block"
                >
                  <p
                    className="font-mono text-lg font-semibold tracking-tight"
                    style={{ color: SERIES[i % SERIES.length] }}
                  >
                    <CountUp
                      end={m.value}
                      suffix={m.suffix}
                      prefix={m.prefix}
                      decimals={m.decimals}
                    />
                  </p>
                  <p className="label-mono text-right leading-relaxed sm:mt-1.5 sm:text-left">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="my-6 flex flex-wrap gap-2 border-y border-line py-4">
              {project.tags.map((tag) => (
                <Badge key={tag} tone="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tools.slice(0, 4).map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
            {project.tools.length > 4 && <Badge>+{project.tools.length - 4}</Badge>}
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

export default function ProjectsGrid({
  projects = allProjects,
  showHeading = true,
}: {
  projects?: Project[];
  showHeading?: boolean;
}) {
  return (
    <section id="projects" className="section-x section-y relative mx-auto max-w-6xl">
      {showHeading && (
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          subtitle="Pipelines, dashboards and automation built for real operations — recruitment MIS, loan portfolio analytics and internal workflow tooling."
        />
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid gap-5 sm:gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
