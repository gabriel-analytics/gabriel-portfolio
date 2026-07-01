"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { services } from "@/data/services"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
}

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-2 max-w-xl">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">
              O que faço
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Serviços e <span className="text-primary">entregas</span>
            </h2>
            <p className="text-muted-foreground">
              Do pipeline de dados à IA aplicada — entrego soluções que o
              negócio usa de verdade.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  className={`relative p-6 rounded-xl border transition-all group cursor-default ${
                    service.highlight
                      ? "border-primary/50 bg-primary/5 hover:bg-primary/10"
                      : "border-border/50 bg-card hover:border-primary/30 hover:bg-accent/20"
                  }`}
                >
                  {service.highlight && (
                    <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      destaque
                    </span>
                  )}

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                      service.highlight
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    } transition-colors`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5">
                    {service.deliverables.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center pt-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-10 px-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Fale sobre o seu projeto
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
