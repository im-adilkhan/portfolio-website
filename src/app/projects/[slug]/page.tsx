import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CountUp from "@/components/animations/CountUp";
import SlideUp from "@/components/animations/SlideUp";
import StaggerContainer from "@/components/animations/StaggerContainer";
import SplitText from "@/components/animations/SplitText";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-4xl px-6 pb-28 pt-32">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} /> All projects
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {project.year} · {project.role}
        </p>
        <SplitText
          as="h1"
          text={project.title}
          className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
        />
        <SlideUp delay={0.2}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.tagline}</p>
        </SlideUp>

        <SlideUp delay={0.3}>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <Badge key={t} tone="accent">
                {t}
              </Badge>
            ))}
          </div>
        </SlideUp>
      </header>

      {project.metrics.length > 0 && (
        <StaggerContainer className="my-12 grid grid-cols-1 gap-6 rounded-lg border border-line bg-surface/40 p-6 backdrop-blur-xl sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl font-semibold tracking-tight text-accent">
                <CountUp
                  end={m.value}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  decimals={m.decimals}
                />
              </p>
              <p className="mt-1 text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </StaggerContainer>
      )}
      {project.metrics.length === 0 && <div className="my-12 border-t border-line" />}

      <div className="space-y-12">
        <SlideUp>
          <h2 className="font-display text-2xl font-semibold tracking-tight">The problem</h2>
          <p className="mt-4 leading-relaxed text-muted">{project.problem}</p>
        </SlideUp>

        <SlideUp>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Approach</h2>
          <ol className="mt-4 space-y-4">
            {project.approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-accent/10 font-mono text-xs text-accent">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </SlideUp>

        <SlideUp>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Outcome</h2>
          <p className="mt-4 leading-relaxed text-muted">{project.outcome}</p>
        </SlideUp>

        {project.links && Object.values(project.links).some(Boolean) && (
          <SlideUp>
            <div className="flex flex-wrap gap-4">
              {project.links.live && (
                <Button href={project.links.live} variant="outline">
                  Live site <ArrowUpRight size={16} />
                </Button>
              )}
              {project.links.dashboard && (
                <Button href={project.links.dashboard} variant="outline">
                  Dashboard <ArrowUpRight size={16} />
                </Button>
              )}
              {project.links.repo && (
                <Button href={project.links.repo} variant="outline">
                  Code <ArrowUpRight size={16} />
                </Button>
              )}
            </div>
          </SlideUp>
        )}
      </div>

      <nav className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group rounded-xl border border-line p-5 transition-colors hover:border-accent/40"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Next project
            </p>
            <p className="mt-2 font-display text-lg tracking-tight transition-colors group-hover:text-accent">
              {p.title}
            </p>
          </Link>
        ))}
      </nav>
    </article>
  );
}
