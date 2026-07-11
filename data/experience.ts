export interface ExperienceItem {
  company: string
  logo?: string
  role: string
  period: string
  current: boolean
  bullets: string[]
  tags: string[]
}

// Fonte única de verdade: job-search-automation/cv.md (seções Experiência e
// Projetos). Qualquer alteração aqui deve ser reconciliada lá primeiro.
export const experience: ExperienceItem[] = [
  {
    company: "Bionexo S.A. — Marketplace de Saúde B2B (Healthtech)",
    role: "Analista de Dados Sênior — Analytics Engineer",
    period: "ago/2021 — presente",
    current: true,
    bullets: [
      "Otimizei e mantive pipelines analíticos em AWS (Athena, EMR, Redshift), com foco em performance e redução de custos, estruturando dados da ingestão ao consumo para múltiplas áreas de negócio",
      "Otimizei pipeline crítico de datamart: redução de 7h → 4h no tempo de execução (~43%) via otimização de queries SQL, gerando economia de $30k+/ano em infraestrutura (FinOps)",
      "Modelei datamarts e camadas semânticas (star schema), habilitando produtos de dados escaláveis e suporte à decisão executiva",
      "Construí e evoluí o módulo de Inteligência de Mercado (Bioanalytics) embarcado na plataforma Bionexo 360, substituindo o uso do MicroStrategy nesse módulo — reduzindo custos de licenciamento e entregando experiência mais integrada aos clientes",
      "Desenvolvi dashboards em Metabase e MicroStrategy, com prototipação em Figma; melhorias e correções em dashboards/gráficos aumentaram a confiabilidade percebida dos dados, contribuindo para evolução do NPS do produto",
      "Atuei na resolução de incidentes e backlog técnico e em qualidade/governança de dados, elevando a estabilidade da plataforma e a confiabilidade das análises em alinhamento com squads de produto e engenharia",
    ],
    tags: ["SQL", "AWS", "Modelagem Dimensional", "Metabase", "MicroStrategy", "Qualidade de Dados"],
  },
  {
    company: "TARS Intelligence",
    role: "Fundador & Analytics Engineer",
    period: "2024 — presente",
    current: true,
    bullets: [
      "Arquitetei e implementei um 'Segundo Cérebro' pessoal: pipeline de captura de conteúdo alimentando uma base de conhecimento indexada em banco vetorial (Qdrant) para busca semântica — hoje com 2.084 documentos indexados (73 mil vetores)",
      "Construí servidores MCP (Model Context Protocol) customizados em Python, expondo busca híbrida (semântica + BM25 + reranking) como ferramentas para agentes de IA (Claude Code)",
      "Implementei observabilidade de LLM em produção com Langfuse self-hosted (tracing, custo, latência)",
      "Impacto real: esse conhecimento acelerou o desenvolvimento de outro projeto meu (SaaS de gestão jurídica) — em 2 sessões, gerei 64 cards de conhecimento e mapeei 46 componentes do sistema, 74% reaproveitados direto do vault",
    ],
    tags: ["Python", "Qdrant", "Langfuse", "MCP", "Claude Code", "RAG"],
  },
  {
    company: "Ebix Latin America · alocado em Bradesco Seguros",
    role: "Analista de Dados — Planejamento e Gestão Comercial",
    period: "out/2019 — ago/2021",
    current: false,
    bullets: [
      "Identifiquei perda anual estimada em +$300K USD em produto financeiro via análise de regressão e clusterização, influenciando diretamente revisão da estratégia comercial na diretoria",
      "Estruturei pipelines ETL com SAS, SQL Server e SSIS, garantindo qualidade e disponibilidade de dados para análises estratégicas e fechamento de indicadores",
      "Desenvolvi e monitorei KPIs, dashboards e indicadores de performance, apoiando decisões executivas e fortalecendo cultura data-driven",
    ],
    tags: ["SAS", "SQL Server", "SSIS", "Regressão", "Clusterização"],
  },
  {
    company: "Ibope DTM — Consultoria de Marketing & CRM",
    role: "Analista de Dados — Inteligência de Marketing & CRM",
    period: "mar/2018 — mar/2019",
    current: false,
    bullets: [
      "Atuei nas 8 fases da esteira de consultoria (prospecção → deploy), participando de projetos end-to-end de CRM e Analytics para clientes de diferentes segmentos",
      "Desenvolvi dashboards em Tableau, Power BI e QlikSense (piloto de implantação) e realizei análises exploratórias e modelos estatísticos para otimização de campanhas",
    ],
    tags: ["Tableau", "Power BI", "QlikSense", "CRM", "Consultoria"],
  },
  {
    company: "Dabasons Imp Exp Com Ltda",
    role: "Analista de Informações Gerenciais",
    period: "mai/2014 — abr/2018",
    current: false,
    bullets: [
      "Desenvolvi relatórios gerenciais e análises de comissionamento, apoiando o fechamento contábil e a gestão comercial com Excel, Microsiga e MS Dynamics",
    ],
    tags: ["Excel", "Microsiga", "MS Dynamics"],
  },
]
