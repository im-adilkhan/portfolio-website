import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Testimonials from "@/components/sections/Testimonials";
import ContactSection from "@/components/sections/ContactSection";
import { featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsGrid projects={featuredProjects} />
      <ExperienceTimeline />
      <Testimonials />
      <ContactSection />
    </>
  );
}
