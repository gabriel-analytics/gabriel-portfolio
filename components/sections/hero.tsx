"use client"


import { motion } from "framer-motion"
import { ArrowDown, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { hero } from "@/data/hero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Location badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <Badge variant="outline" className="gap-1.5 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {hero.location}
          </Badge>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          {hero.name.split(" ")[0]}{" "}
          <span className="text-primary">{hero.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Headline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {hero.headline}
        </motion.p>

        {/* Subheadline */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-base text-muted-foreground/80 max-w-xl mx-auto"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <a
            href={hero.cta.primary.href}
            className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {hero.cta.primary.label}
          </a>
          <a
            href={hero.cta.secondary.href}
            className="inline-flex items-center justify-center h-10 px-6 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
          >
            {hero.cta.secondary.label}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center gap-8 pt-6 border-t border-border/50"
        >
          {hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
