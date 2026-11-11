import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { SiteNav } from "@/components/nav/SiteNav";
import { PortfolioScene } from "@/components/portfolio/PortfolioScene";
import { ProjectsSection } from "@/components/projects/ProjectsSection";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <PortfolioScene />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
