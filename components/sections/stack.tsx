"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { stack } from "@/data/stack"

const LEVEL_LABEL = {
  expert: "Expert",
  proficient: "Proficiente",
  familiar: "Familiarizado",
} as const

const LEVEL_COLOR = {
  expert: "bg-primary text-primary-foreground",
  proficient: "bg-primary/20 text-primary",
  familiar: "bg-secondary text-muted-foreground",
} as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
}

export function StackSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="stack" className="py-24 px-4 sm:px-6">
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
              Ferramentas
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Stack <span className="text-primary">técnica</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              Tecnologias que uso no dia a dia — do pipeline de dados ao deploy em produção.
            </p>
          </motion.div>

          {/* Legend */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 text-xs">
            {(["expert", "proficient", "familiar"] as const).map((level) => (
              <span key={level} className={`px-2.5 py-1 rounded-full font-medium ${LEVEL_COLOR[level]}`}>
                {LEVEL_LABEL[level]}
              </span>
            ))}
          </motion.div>

          {/* Categories grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((category) => (
              <motion.div key={category.name} variants={fadeUp} className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item.name}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-transform hover:scale-105 cursor-default ${LEVEL_COLOR[item.level]}`}
                      title={LEVEL_LABEL[item.level]}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
