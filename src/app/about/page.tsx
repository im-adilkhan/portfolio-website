import type { Metadata } from "next";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Testimonials from "@/components/sections/Testimonials";
import ExperienceBarChart from "@/components/charts/ExperienceBarChart";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills and experience — Data Analyst working in MIS, Power BI, SQL, Python and ETL automation.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <Skills />

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div className="rounded-lg border border-line bg-surface/40 p-6 backdrop-blur-xl">
          <ExperienceBarChart />
        </div>
      </section>

      <ExperienceTimeline />
      <Testimonials />
    </div>
  );
}
