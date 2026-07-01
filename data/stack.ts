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
    name: "Data Engineering",
    items: [
      { name: "dbt", category: "Data Engineering", level: "expert" },
      { name: "BigQuery", category: "Data Engineering", level: "expert" },
      { name: "SQL", category: "Data Engineering", level: "expert" },
      { name: "Python", category: "Data Engineering", level: "expert" },
      { name: "Airflow", category: "Data Engineering", level: "proficient" },
      { name: "Airbyte", category: "Data Engineering", level: "proficient" },
    ],
  },
  {
    name: "Analytics & BI",
    items: [
      { name: "Metabase", category: "Analytics & BI", level: "expert" },
      { name: "Looker", category: "Analytics & BI", level: "proficient" },
      { name: "Power BI", category: "Analytics & BI", level: "proficient" },
      { name: "Evidence.dev", category: "Analytics & BI", level: "proficient" },
      { name: "Plotly", category: "Analytics & BI", level: "proficient" },
    ],
  },
  {
    name: "IA & Machine Learning",
    items: [
      { name: "LangChain / LangGraph", category: "IA & Machine Learning", level: "proficient" },
      { name: "Qdrant", category: "IA & Machine Learning", level: "proficient" },
      { name: "Langfuse", category: "IA & Machine Learning", level: "proficient" },
      { name: "scikit-learn", category: "IA & Machine Learning", level: "proficient" },
      { name: "Claude API", category: "IA & Machine Learning", level: "proficient" },
      { name: "RAG / Embeddings", category: "IA & Machine Learning", level: "proficient" },
    ],
  },
  {
    name: "Backend & APIs",
    items: [
      { name: "FastAPI", category: "Backend & APIs", level: "proficient" },
      { name: "PostgreSQL", category: "Backend & APIs", level: "proficient" },
      { name: "Redis", category: "Backend & APIs", level: "proficient" },
      { name: "MinIO / S3", category: "Backend & APIs", level: "proficient" },
      { name: "Docker", category: "Backend & APIs", level: "proficient" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "Next.js", category: "Frontend", level: "proficient" },
      { name: "TypeScript", category: "Frontend", level: "proficient" },
      { name: "Tailwind CSS", category: "Frontend", level: "proficient" },
      { name: "React", category: "Frontend", level: "proficient" },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "GCP", category: "Cloud & DevOps", level: "proficient" },
      { name: "AWS", category: "Cloud & DevOps", level: "familiar" },
      { name: "Terraform", category: "Cloud & DevOps", level: "familiar" },
      { name: "GitHub Actions", category: "Cloud & DevOps", level: "proficient" },
      { name: "Vercel", category: "Cloud & DevOps", level: "proficient" },
    ],
  },
]
