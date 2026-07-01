export interface StackItem {
  name: string
  category: string
  level: "expert" | "proficient" | "familiar"
}

export interface StackCategory {
  name: string
  items: StackItem[]
}

export const stack: StackCategory[] = [
  {
    name: "SQL & Dados",
    items: [
      { name: "SQL", category: "SQL & Dados", level: "expert" },
      { name: "Python", category: "SQL & Dados", level: "proficient" },
      { name: "dbt Core", category: "SQL & Dados", level: "proficient" },
      { name: "DuckDB", category: "SQL & Dados", level: "proficient" },
      { name: "Pandas / NumPy", category: "SQL & Dados", level: "proficient" },
      { name: "Modelagem Dimensional", category: "SQL & Dados", level: "proficient" },
    ],
  },
  {
    name: "Cloud & Warehouses",
    items: [
      { name: "BigQuery (GCP)", category: "Cloud & Warehouses", level: "proficient" },
      { name: "Snowflake", category: "Cloud & Warehouses", level: "proficient" },
      { name: "AWS + Spark", category: "Cloud & Warehouses", level: "familiar" },
      { name: "Terraform", category: "Cloud & Warehouses", level: "familiar" },
      { name: "Docker", category: "Cloud & Warehouses", level: "proficient" },
    ],
  },
  {
    name: "Analytics & BI",
    items: [
      { name: "Power BI", category: "Analytics & BI", level: "proficient" },
      { name: "Streamlit", category: "Analytics & BI", level: "proficient" },
      { name: "Plotly", category: "Analytics & BI", level: "proficient" },
      { name: "Metabase", category: "Analytics & BI", level: "proficient" },
      { name: "scipy", category: "Analytics & BI", level: "proficient" },
    ],
  },
  {
    name: "Orquestração",
    items: [
      { name: "Apache Airflow", category: "Orquestração", level: "proficient" },
    ],
  },
  {
    name: "IA Aplicada",
    items: [
      { name: "LangGraph", category: "IA Aplicada", level: "proficient" },
      { name: "RAG / Embeddings", category: "IA Aplicada", level: "proficient" },
      { name: "Qdrant", category: "IA Aplicada", level: "proficient" },
      { name: "Langfuse", category: "IA Aplicada", level: "proficient" },
      { name: "Claude API", category: "IA Aplicada", level: "proficient" },
    ],
  },
  {
    name: "Backend & Frontend",
    items: [
      { name: "FastAPI", category: "Backend & Frontend", level: "proficient" },
      { name: "PostgreSQL", category: "Backend & Frontend", level: "proficient" },
      { name: "Next.js", category: "Backend & Frontend", level: "proficient" },
      { name: "TypeScript", category: "Backend & Frontend", level: "proficient" },
      { name: "Redis", category: "Backend & Frontend", level: "proficient" },
    ],
  },
]
