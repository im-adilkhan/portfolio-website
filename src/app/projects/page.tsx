import type { Metadata } from "next";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "ETL pipelines, Power BI dashboards, MIS reporting and workflow automation built by Adil Khan.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <ProjectsGrid projects={projects} />
    </div>
  );
}
