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
    title: "Otimização de Pipeline — 43% mais rápido",
    description:
      "Pipeline crítico de datamart levando 7h para processar, gerando custo de infraestrutura e atraso na disponibilidade dos dados. Otimização de queries SQL reduziu o tempo de execução e gerou economia real.",
    category: "analytics",
    tags: ["SQL", "ETL", "Modelagem Dimensional", "Otimização", "Python"],
    highlights: [
      "Redução de 7h → 4h no tempo de execução (~43% de melhoria)",
      "Otimização de queries SQL do pipeline, sem comprometer qualidade/disponibilidade dos dados",
      "Economia de $30k+/ano em infraestrutura (FinOps)",
    ],
  },
  {
    title: "Análise de Impacto Financeiro — $300k identificados",
    description:
      "Produto financeiro de uma seguradora com performance sob suspeita, sem causa raiz identificada. Análise exploratória com regressão e clusterização estimou o impacto real, resultando em mudança de estratégia comercial.",
    category: "analytics",
    tags: ["SAS", "SQL Server", "Regressão", "Clusterização"],
    highlights: [
      "Identifiquei perda anual estimada em +$300K USD via análise de regressão e clusterização",
      "Influenciou diretamente a revisão da estratégia comercial na diretoria",
      "Parte de um trabalho mais amplo de pipelines ETL (SAS, SQL Server, SSIS) para análises estratégicas",
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
