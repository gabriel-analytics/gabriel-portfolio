import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { ServicesSection } from "@/components/sections/services"
import { ProjectsSection } from "@/components/sections/projects"
import { StackSection } from "@/components/sections/stack"
import { ContactSection } from "@/components/sections/contact"

// TestimonialsSection removida temporariamente — só tinha cards placeholder
// ("Substitua este texto por um depoimento real..."). Componente e dados
// continuam em components/sections/testimonials.tsx e data/testimonials.ts,
// prontos pra voltar assim que houver depoimentos reais.

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </>
  )
}
