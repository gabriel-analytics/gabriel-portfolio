import {
  Brain,
  FlaskConical,
  BarChart3,
  Microscope,
  Database,
  ShieldCheck,
  Rocket,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceProof {
  label: string
}

export interface ServiceItem {
  title: string
  tagline: string
  description: string
  icon: LucideIcon
  deliverables: string[]
  highlight?: boolean
  proof?: ServiceProof
}

// Ordem: prioridade por geração de receita/crescimento para quem contrata
// primeiro, eficiência interna por último. Ver job-search-automation/data/
// trajetoria-profissional-completa.md (seções 6.1-6.4) para o racional
// completo e a rastreabilidade de cada case.
export const services: ServiceItem[] = [
  {
    title: "Diagnóstico de Prontidão para IA",
    tagline: "Descubra se sua base de dados aguenta IA de verdade",
    description:
      "Avaliação rápida de qualidade, estrutura e governança dos seus dados para adoção de agentes/RAG — com roadmap objetivo do que precisa mudar antes de investir em IA que não vai funcionar em cima de dado ruim.",
    icon: Brain,
    highlight: true,
    deliverables: [
      "Auditoria de qualidade e estrutura de dados",
      "Avaliação de arquitetura para RAG/agentes",
      "Roadmap objetivo do que precisa mudar antes de investir",
      "Relatório executivo com prioridades claras",
    ],
  },
  {
    title: "Teste A/B & Experimentação",
    tagline: "Prove o impacto antes de escalar (e antes de gastar)",
    description:
      "Desenho, execução e validação estatística de testes A/B — rigor de teste de hipótese, intervalo de confiança e effect size — ligados a ROI real de negócio, não achismo com gráfico bonito.",
    icon: FlaskConical,
    highlight: true,
    deliverables: [
      "Desenho de experimento com randomização correta",
      "Teste de hipótese estatisticamente correto (Welch vs. Student)",
      "Intervalo de confiança e effect size, não só p-valor",
      "Cálculo de ROI do resultado",
    ],
    proof: { label: "Case real: Delivery Analytics — 6,4% de redução, ROI 274%" },
  },
  {
    title: "Agentes de IA Aplicados a Dados",
    tagline: "Automação que acelera entrega e abre receita nova",
    description:
      "Orquestração de agentes de IA sobre bases de conhecimento próprias, com busca semântica e observabilidade de LLM em produção — não é só organizar conhecimento, é ganhar velocidade que vira mais entrega e mais receita.",
    icon: Brain,
    highlight: true,
    deliverables: [
      "Sistemas RAG para busca semântica em documentos",
      "Orquestração de agentes autônomos (Claude Code, MCP)",
      "Observabilidade de LLM em produção (Langfuse)",
      "Bases de conhecimento próprias indexadas",
    ],
    proof: { label: "Case real: TARS — 64 cards → 46 componentes, 74% reaproveitados" },
  },
  {
    title: "Dashboards Que Decidem",
    tagline: "BI que gera decisão, não só visualização",
    description:
      "Da pergunta de negócio ao dashboard: KPIs definidos junto com o time, modelagem por trás, entrega em Power BI, Metabase ou Tableau — sem dado bonito que ninguém usa.",
    icon: BarChart3,
    deliverables: [
      "Dashboards executivos no Metabase, Power BI ou Tableau",
      "KPIs definidos junto com o time de negócio",
      "Modelagem por trás garantindo consistência",
      "Treinamento do time para self-service de dados",
    ],
    proof: { label: "Case real (anonimizado): substituição de BI paga, redução de custo" },
  },
  {
    title: "EDA — Análise Exploratória de Dados",
    tagline: "Encontre o que ninguém tinha visto ainda",
    description:
      "Investigação estatística de dados brutos — regressão, clusterização, detecção de padrões — para transformar 'não sabemos por que isso está acontecendo' em achado acionável.",
    icon: Microscope,
    deliverables: [
      "Análise exploratória e diagnóstica de dados brutos",
      "Regressão e clusterização para achar padrões",
      "Identificação de causas raiz, não só sintomas",
      "Recomendação acionável para o negócio",
    ],
    proof: { label: "Case real (anonimizado): perda de $300K identificada" },
  },
  {
    title: "Data Foundation",
    tagline: "Arquitetura de dados pronta pra escalar",
    description:
      "Modelagem dimensional, pipelines ETL/ELT em nuvem e qualidade de dados desde o design — a base que sustenta qualquer decisão confiável.",
    icon: Database,
    deliverables: [
      "Modelagem dimensional com dbt (staging → marts)",
      "Pipelines de ingestão e transformação em nuvem (AWS/GCP)",
      "Testes de qualidade e alertas automatizados",
      "Documentação técnica e catálogo de dados",
    ],
    proof: { label: "Case real (anonimizado): pipeline 7h → 4h, $30k+/ano" },
  },
  {
    title: "Governança e Qualidade de Dados",
    tagline: "Dados em que dá pra confiar",
    description:
      "Auditoria, validação de regras de negócio e estruturação de processos de qualidade — para decisão não ser tomada em cima de número errado.",
    icon: ShieldCheck,
    deliverables: [
      "Auditoria de qualidade e governança de dados",
      "Validação de regras de negócio",
      "Identificação e correção de inconsistências",
      "Estruturação de processos de qualidade contínua",
    ],
  },
  {
    title: "Mentoria e Consultoria de Dados",
    tagline: "Aceleração de carreira para profissionais de dados",
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
