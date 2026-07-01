import { BarChart3, Brain, Database, Layers, LineChart, Rocket } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceItem {
  title: string
  description: string
  icon: LucideIcon
  deliverables: string[]
  highlight?: boolean
}

export const services: ServiceItem[] = [
  {
    title: "Analytics Engineering",
    description:
      "Construção e manutenção de data warehouses modernos — da ingestão ao dado confiável consumido pelo negócio.",
    icon: Database,
    deliverables: [
      "Modelagem dimensional com dbt (staging → marts)",
      "Pipelines de qualidade com testes e alertas",
      "Documentação técnica e catálogo de dados",
      "Integração com BigQuery, Snowflake ou Redshift",
    ],
  },
  {
    title: "IA Aplicada a Dados",
    description:
      "Implementação de soluções de IA que resolvem problemas reais de negócio — sem complexidade desnecessária.",
    icon: Brain,
    highlight: true,
    deliverables: [
      "Sistemas RAG para busca semântica em documentos",
      "Modelos preditivos (churn, LTV, fraude, demanda)",
      "Agentes autônomos com LLMs e observabilidade",
      "Fine-tuning e avaliação de prompts com Langfuse",
    ],
  },
  {
    title: "Dashboards & Relatórios",
    description:
      "Visualizações que comunicam insights de forma clara para executivos e times de negócio.",
    icon: BarChart3,
    deliverables: [
      "Dashboards executivos no Metabase, Looker ou Power BI",
      "Relatórios analíticos interativos com Evidence.dev",
      "KPIs de negócio com métricas como código (dbt Semantic Layer)",
      "Treinamento do time para self-service de dados",
    ],
  },
  {
    title: "Arquitetura de Dados",
    description:
      "Design de arquiteturas escaláveis e documentadas — desde o C4 diagram até o ADR da decisão técnica.",
    icon: Layers,
    deliverables: [
      "Avaliação e seleção de stack de dados",
      "C4 diagrams e documentação de arquitetura",
      "ADRs (Architecture Decision Records)",
      "Roadmap técnico de evolução do data platform",
    ],
  },
  {
    title: "Consultoria em Analytics",
    description:
      "Diagnóstico do estado atual do dado na empresa e plano de ação para gerar valor com dados.",
    icon: LineChart,
    deliverables: [
      "Auditoria de qualidade e governança de dados",
      "Definição de KPIs e métricas de negócio",
      "Estruturação de times de dados (papéis e processos)",
      "Avaliação de maturidade analítica",
    ],
  },
  {
    title: "Mentoria em Dados",
    description:
      "Aceleração de carreira para profissionais de dados — do analista ao analytics engineer.",
    icon: Rocket,
    deliverables: [
      "Mentorias individuais (1:1) mensais",
      "Revisão de projetos e portfólio",
      "Trilha de estudos personalizada",
      "Acesso à comunidade TARS Intelligence",
    ],
  },
]
