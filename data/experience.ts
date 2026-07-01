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
    company: "Bionexo",
    role: "Analytics Engineer",
    period: "2023 — presente",
    current: true,
    bullets: [
      "Arquitetura e manutenção do data warehouse com dbt + BigQuery, cobrindo mais de 50 modelos em produção",
      "Desenvolvimento de pipelines de dados para o marketplace B2B de saúde, processando milhões de transações mensais",
      "Implementação de testes de qualidade de dados com Elementary e dbt test, reduzindo incidentes em produção",
      "Criação de dashboards executivos no Metabase e Looker para times de negócio e produto",
      "Liderança técnica em migrações de SQL legado para camadas semânticas reutilizáveis",
    ],
    tags: ["dbt", "BigQuery", "Python", "Metabase", "Looker", "SQL", "Elementary"],
  },
  {
    company: "TARS Intelligence",
    role: "Fundador & Analytics Engineer",
    period: "2024 — presente",
    current: true,
    bullets: [
      "Consultoria de dados e IA para empresas que precisam transformar dados em decisões",
      "Desenvolvimento do TARS Hub — knowledge pipeline com RAG, Qdrant e Langfuse para gestão do conhecimento",
      "Construção do produto assessoria-juridica SaaS: plataforma multi-tenant com FastAPI, PostgreSQL RLS e MinIO",
      "Criação de conteúdo técnico sobre Analytics Engineering e IA aplicada no LinkedIn e YouTube",
    ],
    tags: ["Consultoria", "RAG", "FastAPI", "Next.js", "IA Aplicada", "SaaS"],
  },
  {
    company: "Experiências anteriores",
    role: "Analista de Dados / BI",
    period: "2020 — 2023",
    current: false,
    bullets: [
      "Desenvolvimento de relatórios e dashboards em Power BI e Tableau para áreas de operações e financeiro",
      "Análises ad hoc em SQL e Python para suporte à tomada de decisão de stakeholders",
      "Modelagem dimensional com star schema para data marts de vendas e logística",
    ],
    tags: ["Power BI", "Tableau", "SQL", "Python", "Modelagem Dimensional"],
  },
]
