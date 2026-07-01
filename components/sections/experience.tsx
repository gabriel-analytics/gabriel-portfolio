"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/data/experience"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
}

export function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-2">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">
              Trajetória
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Experiência <span className="text-primary">profissional</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-[13px] md:left-[21px] top-1.5 w-3 h-3 rounded-full border-2 ${
                      item.current
                        ? "border-primary bg-primary"
                        : "border-border bg-background"
                    }`}
                  />

                  <div className="p-5 rounded-xl border border-border/50 bg-background hover:border-primary/30 hover:shadow-sm transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg leading-tight">
                            {item.role}
                          </h3>
                          {item.current && (
                            <Badge className="text-[10px] h-4 px-1.5">
                              atual
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium text-sm mt-0.5">
                          {item.company}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                        {item.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {item.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0">
                            ›
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
