export interface ExperienceItem {
  company: string
  logo?: string
  role: string
  period: string
  current: boolean
  bullets: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: "Plataforma de Saúde B2B",
    role: "Analytics Engineer / Data Analyst",
    period: "2023 — presente",
    current: true,
    bullets: [
      "Otimizei datamart crítico que processava 2h15min com problemas de qualidade: redesenhei o modelo para tabela pré-agregada, reduzindo para 30min (77% de melhoria) e gerando $30k+/ano de economia em infra",
      "Repliquei a otimização para 3 tabelas adicionais — reconhecimento interno e convite para integrar o time de Engenharia de Dados",
      "Construção e melhoria de dashboards e relatórios com impacto direto no NPS dos times que consomem os dados",
      "Garantia de qualidade dos dados: identificação de nulls, duplicatas e inconsistências, com validação colaborativa junto a devs e arquitetos",
      "Tradução de problemas de negócio em queries SQL complexas (CTEs, window functions) — datasets analíticos que suportam decisões de produto e operações",
    ],
    tags: ["SQL", "ETL", "Python", "Modelagem Dimensional", "BI", "Qualidade de Dados"],
  },
  {
    company: "TARS Intelligence",
    role: "Fundador & Analytics Engineer",
    period: "2024 — presente",
    current: true,
    bullets: [
      "Consultoria de dados e IA: diagnóstico de maturidade, estruturação de roadmap, desenvolvimento e deploy de soluções analíticas",
      "Desenvolvimento do TARS Hub — knowledge pipeline com RAG, Qdrant e Langfuse para gestão do conhecimento técnico",
      "Construção do produto assessoria-jurídica SaaS: plataforma multi-tenant com FastAPI, PostgreSQL RLS e MinIO",
      "Criação de conteúdo técnico sobre Analytics Engineering e IA aplicada no LinkedIn e YouTube",
    ],
    tags: ["Consultoria", "RAG", "FastAPI", "Next.js", "IA Aplicada", "SaaS"],
  },
  {
    company: "Consultoria de CRM & Analytics",
    role: "Analista de Dados / BI",
    period: "2020 — 2023",
    current: false,
    bullets: [
      "Vivência completa no ciclo de consultoria: prospecção, diagnóstico de maturidade de dados, onboarding, roadmap, desenvolvimento e deploy",
      "Análise de impacto financeiro para empresa de seguros: regressão identificou perda recorrente de $300k/ano, apresentada para diretoria e que resultou em mudança de estratégia de incentivos",
      "Desenvolvimento de relatórios e dashboards em Power BI para áreas de operações e financeiro",
      "Modelagem dimensional (star schema) para data marts de vendas e análise 360° de negócio",
    ],
    tags: ["Power BI", "SQL", "Python", "Modelagem Dimensional", "Consultoria", "CRM"],
  },
]
