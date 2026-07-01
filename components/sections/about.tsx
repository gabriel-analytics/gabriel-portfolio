"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { about } from "@/data/about"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Left — bio */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="text-xs font-mono text-primary uppercase tracking-widest">
                Sobre mim
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Dado que gera{" "}
                <span className="text-primary">decisão</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {about.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Certifications */}
            {about.certifications.length > 0 && (
              <motion.div variants={fadeUp} className="space-y-2">
                <p className="text-sm font-medium">Certificações</p>
                <div className="flex flex-wrap gap-2">
                  {about.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — values */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="text-xs font-mono text-primary uppercase tracking-widest">
                Como trabalho
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Princípios que <span className="text-primary">guiam</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {about.values.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="flex gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-accent/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{value.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {value.description}
                    </p>
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
