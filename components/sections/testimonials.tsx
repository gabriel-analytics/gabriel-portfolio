"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { testimonials } from "@/data/testimonials"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-2 text-center">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">
              Quem já trabalhou comigo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              O que dizem sobre <span className="text-primary">meu trabalho</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors"
              >
                {/* Quote mark */}
                <span className="text-4xl text-primary/30 font-serif leading-none mb-3">
                  &ldquo;
                </span>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  {/* Avatar placeholder */}
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA para pedir depoimento */}
          <motion.p variants={fadeUp} className="text-center text-xs text-muted-foreground">
            Trabalhamos juntos?{" "}
            <a
              href="https://www.linkedin.com/in/gabriel-pacheco-5541024a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Deixe um depoimento no LinkedIn
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
