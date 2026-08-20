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
    <div className="pt-20 sm:pt-24">
      <About />
      <Skills />

      <section className="section-x mx-auto max-w-6xl pb-4">
        <div className="rounded-lg border border-line bg-surface/40 p-4 backdrop-blur-xl sm:p-6">
          <ExperienceBarChart />
        </div>
      </section>

      <ExperienceTimeline />
      <Testimonials />
    </div>
  );
}
