"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Link } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { projects, type ProjectCategory } from "@/data/projects"

const CATEGORIES: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Analytics", value: "analytics" },
  { label: "IA", value: "ia" },
  { label: "SaaS", value: "saas" },
  { label: "Infra", value: "infra" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.09 } },
}

export function ProjectsSection() {
  const [active, setActive] = useState<ProjectCategory | "all">("all")
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-2">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">
              Portfólio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Projetos em <span className="text-primary">destaque</span>
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  active === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {filtered.map((project) => (
                <div
                  key={project.title}
                  className="group flex flex-col p-6 rounded-xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-md transition-all"
                >
                  {/* Category chip */}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                    {project.category}
                  </span>

                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-5">
                    {project.highlights.map((h) => (
                      <li key={h} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary flex-shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.github || project.link) && (
                    <div className="flex gap-3 pt-2 border-t border-border/50">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Link className="h-3.5 w-3.5" />
                          GitHub
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Ver projeto
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
