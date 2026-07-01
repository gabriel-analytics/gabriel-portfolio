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
    title: "Otimização de Datamart — 77% mais rápido",
    description:
      "Pipeline crítico que processava 2h15min com problemas de qualidade e performance. Redesenho completo do modelo gerou 77% de melhoria e $30k+/ano de economia em infraestrutura.",
    category: "analytics",
    tags: ["SQL", "ETL", "Modelagem Dimensional", "Otimização", "Python"],
    highlights: [
      "Redução de 2h15min → 30min de processamento (77% de melhoria)",
      "Redesenho do modelo: tabela pré-agregada alinhada com necessidades reais do negócio",
      "Replicado para 3 tabelas adicionais — $30k+/ano de economia total em infra",
      "Reconhecimento interno + convite para o time de Engenharia de Dados",
    ],
  },
  {
    title: "Análise de Impacto Financeiro — $300k identificados",
    description:
      "Empresa de seguros com queda recorrente de 0.5% em produto financeiro. Análise de regressão estimou o impacto real, resultando em mudança de estratégia executiva.",
    category: "analytics",
    tags: ["Python", "SQL", "Regressão", "Análise de Impacto", "Storytelling com Dados"],
    highlights: [
      "Identificação de queda recorrente de 0.5% em produto financeiro",
      "Análise de regressão estimou perda anual de $300k USD",
      "Apresentação para a diretoria com dados e recomendação",
      "Mudança na estratégia de incentivos e melhora no desempenho do produto",
    ],
  },
  {
    title: "TARS Intelligence Hub",
    description:
      "Knowledge pipeline pessoal com RAG, busca semântica e observabilidade de LLMs. Captura conteúdo de YouTube, PDFs e URLs e armazena no vault Obsidian com embeddings no Qdrant.",
    category: "ia",
    tags: ["Python", "Qdrant", "Langfuse", "RAG", "FastAPI", "Obsidian"],
    highlights: [
      "Pipeline de captura automática: YouTube → transcrição → vault Obsidian",
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
]
