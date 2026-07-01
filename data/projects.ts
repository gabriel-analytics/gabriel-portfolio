export type ProjectCategory = "analytics" | "ia" | "saas" | "infra"

export interface ProjectItem {
  title: string
  description: string
  image?: string
  tags: string[]
  category: ProjectCategory
  link?: string
  github?: string
  highlights: string[]
}

export const projects: ProjectItem[] = [
  {
    title: "TARS Intelligence Hub",
    description:
      "Knowledge pipeline pessoal com RAG, busca semântica e observabilidade de LLMs. Captura conteúdo de YouTube, PDFs e URLs e armazena no vault Obsidian com embeddings no Qdrant.",
    category: "ia",
    tags: ["Python", "Qdrant", "Langfuse", "RAG", "FastAPI", "Obsidian"],
    highlights: [
      "Pipeline de captura automática (YouTube → transcrição → vault)",
      "Busca semântica com Qdrant v1.9.7 + embeddings",
      "Observabilidade completa com Langfuse v2 self-hosted",
      "MCP server com 6 tools para integração com Claude Code",
    ],
    github: "https://github.com/gabriel-analytics/tars-intelligence-hub",
  },
  {
    title: "Assessoria Jurídica SaaS",
    description:
      "Plataforma multi-tenant para escritórios de advocacia: gestão de processos, documentos e clientes. Arquitetura com RLS no PostgreSQL, storage no MinIO e autenticação JWT.",
    category: "saas",
    tags: ["FastAPI", "PostgreSQL", "Redis", "MinIO", "Next.js", "Docker"],
    highlights: [
      "Multi-tenancy real com RLS no PostgreSQL — isolamento por tenant na camada de banco",
      "Armazenamento seguro de documentos com presigned URLs via MinIO + aioboto3",
      "Rate limiting e JWT blacklist com Redis",
      "Documentação OpenAPI + C4 diagrams + 6 bounded contexts DDD",
    ],
  },
  {
    title: "Credit Analytics 360",
    description:
      "Plataforma analítica de crédito com modelos de scoring, análise de cohort e dashboards de inadimplência para instituições financeiras.",
    category: "analytics",
    tags: ["dbt", "BigQuery", "Python", "Metabase", "scikit-learn"],
    highlights: [
      "Modelo de scoring de crédito com XGBoost — AUC 0.87",
      "Pipeline dbt com 30+ modelos: staging → intermediate → marts",
      "Dashboard executivo de inadimplência com drill-down por produto",
      "Testes de qualidade com Elementary + alertas automáticos",
    ],
    github: "https://github.com/gabriel-analytics/credit-analytics-360",
  },
  {
    title: "Delivery Analytics Case",
    description:
      "Case de análise de dados de operações de delivery: análise de SLA, eficiência de rotas e retenção de entregadores com visualizações interativas.",
    category: "analytics",
    tags: ["Python", "Plotly", "dbt", "SQL", "Pandas"],
    highlights: [
      "Análise exploratória completa com profiling automático",
      "Cálculo de SLA por região e categoria de produto",
      "Segmentação de entregadores com K-means + visualização UMAP",
      "Relatório executivo em Evidence.dev com SQL + Markdown",
    ],
    github: "https://github.com/gabriel-analytics/delivery-analytics-case",
  },
]
