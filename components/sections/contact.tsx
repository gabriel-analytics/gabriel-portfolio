"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Mail, MessageSquare, Send } from "lucide-react"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

type FormState = "idle" | "sending" | "success" | "error"

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [state, setState] = useState<FormState>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Falha no envio")
      setState("success")
      setForm({ name: "", email: "", message: "" })
    } catch {
      setState("error")
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
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
              Vamos conversar
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Entre em <span className="text-primary">contato</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info lateral */}
            <motion.div variants={fadeUp} className="space-y-8">
              <p className="text-muted-foreground leading-relaxed">
                Se sua empresa precisa de decisões mais rápidas, operação mais eficiente
                ou crescimento sustentado por dados de verdade — me conta o desafio e a
                gente desenha o próximo passo juntos.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:gabrielmepv@gmail.com"
                  className="flex items-center gap-3 group text-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    gabrielmepv@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/gabriel-pacheco-5541024a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <LinkedinIcon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    linkedin.com/in/gabriel-pacheco-5541024a
                  </span>
                </a>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    Respondo em até 24 horas nos dias úteis
                  </span>
                </div>
              </div>

              {/* Disponibilidade */}
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-1">
                  Disponibilidade
                </p>
                <p className="text-sm text-muted-foreground">
                  Aberto a projetos de consultoria, implantações de dados e mentorias.
                  Agenda para agosto/2026 com vagas limitadas.
                </p>
              </div>
            </motion.div>

            {/* Formulário */}
            <motion.div variants={fadeUp}>
              {state === "success" ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Mensagem enviada!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Obrigado pelo contato. Retorno em breve.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-2 text-xs text-primary hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium mb-1.5">
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium mb-1.5">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Conte brevemente o seu projeto ou necessidade..."
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-xs text-red-500">
                      Erro ao enviar. Tente novamente ou entre em contato via LinkedIn.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                  >
                    {state === "sending" ? (
                      <>
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar mensagem
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    Prefere ir direto?{" "}
                    <a
                      href="mailto:gabrielmepv@gmail.com"
                      className="text-primary hover:underline"
                    >
                      gabrielmepv@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
