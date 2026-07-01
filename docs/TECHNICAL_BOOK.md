# Livro Técnico — Portfolio Gabriel Pacheco
> Documentação completa: concepção, decisões, implementação, testes e deploy
> Data: 2026-07-01 | Versão: 1.0

---

## Índice

1. [Concepção e Contexto](#1-concepção-e-contexto)
2. [Decisões de Stack](#2-decisões-de-stack)
3. [Decisões de Design (UI/UX)](#3-decisões-de-design-uiux)
4. [Estrutura de Pastas](#4-estrutura-de-pastas)
5. [Task 1–5 — Estrutura e Seções Principais](#5-tasks-15--estrutura-e-seções-principais)
6. [Task 6 — Testimonials + Contact](#6-task-6--testimonials--contact)
7. [Task 7 — Notion API + Rate Limiting + Testes Unitários](#7-task-7--notion-api--rate-limiting--testes-unitários)
8. [Task 8 — SEO Completo](#8-task-8--seo-completo)
9. [Task 9 — E2E Smoke Tests + Deploy Vercel](#9-task-9--e2e-smoke-tests--deploy-vercel)
10. [Bugs Encontrados e Soluções](#10-bugs-encontrados-e-soluções)
11. [Padrão data/*.ts — Conteúdo Separado de UI](#11-padrão-datats--conteúdo-separado-de-ui)
12. [Configuração do Notion (Lead Capture)](#12-configuração-do-notion-lead-capture)
13. [Checklist Pós-Deploy](#13-checklist-pós-deploy)
14. [Próximos Passos](#14-próximos-passos)

---

## 1. Concepção e Contexto

### Objetivo
Criar um portfolio profissional para Gabriel Pacheco (Analytics Engineer + Fundador da TARS Intelligence) que:
- Apresente projetos com **impacto mensurável** ($300k, 77%, $30k+/ano)
- Capture leads qualificados via formulário → Notion CRM
- Tenha SEO sólido para aparecer em buscas por "Analytics Engineer São Paulo"
- Sirva como **vitrine da TARS Intelligence** (consultoria de dados + IA)

### Público-alvo
- CTOs e Head of Data de empresas mid-market
- Founders que precisam estruturar dados
- Recrutadores buscando Analytics Engineers
- Potenciais mentorados

### Repositório
- **GitHub:** `https://github.com/gabriel-analytics/gabriel-portfolio`
- **Branch principal:** `master`
- **Deploy:** `https://gabriel-portfolio-neon.vercel.app`
- **Domínio futuro:** `gabrielpacheco.dev`

### Organização de Projetos
Antes de criar o portfolio, foi feita uma reorganização: todos os repositórios foram movidos para `C:\Users\lineg\projects\` como diretório central de projetos.

---

## 2. Decisões de Stack

### Por que Next.js 14 (App Router)?
- SSG por padrão — páginas geradas em build, carregamento instantâneo
- `app/opengraph-image.tsx` nativo — OG image sem pacote extra
- `app/sitemap.ts` e `app/robots.ts` — geração automática
- API Routes integradas — `/api/contact` sem servidor separado
- Ecossistema maduro com Vercel (deploy trivial)

**Versão:** `14.2.35` (não 15+, pois Geist font só existe no 15+)

### Por que Tailwind CSS v3?
- Utility-first — sem CSS customizado para casos simples
- `darkMode: ["class"]` — dark mode controlado por JS (sem flash)
- Tokens HSL em CSS variables — tema coerente em light e dark

**Atenção:** Tailwind v3 não suporta `oklch()` nativo. Todos os tokens usam HSL.

### Por que Radix UI (não shadcn@latest)?
`npx shadcn@latest` em 2026 instala a versão experimental com `@base-ui/react` e `oklch()`, **incompatível com Tailwind v3**. A solução foi:
1. Remover `@base-ui/react` e `shadcn`
2. Instalar `@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@radix-ui/react-separator`
3. Reescrever todos os componentes UI do zero

### Por que framer-motion + react-intersection-observer?
- `framer-motion` — animações declarativas, `AnimatePresence` para filtros de projetos
- `react-intersection-observer` — ativa animações só quando a seção entra na viewport (`triggerOnce: true`)
- Combinação standard: `useInView` + `motion.div variants={stagger}`

### Por que Vitest (unit) + Playwright (E2E)?
- **Vitest:** mais rápido que Jest, configuração simples com `@vitejs/plugin-react`
- **Playwright:** único framework que testa o browser real (não jsdom) — essencial para testar hidratação React

### Por que next-themes?
- Provider simples para dark/light toggle sem flash de conteúdo
- `suppressHydrationWarning` + `disableTransitionOnChange` evitam hydration mismatch

---

## 3. Decisões de Design (UI/UX)

### Paleta de cores — Roxo/Índigo (brand)
```css
/* Light */
--primary: 262 80% 55%;       /* roxo médio */
--background: 0 0% 99%;       /* quase branco */
--foreground: 0 0% 9%;
--border: 0 0% 88%;

/* Dark (padrão) */
--primary: 262 78% 68%;       /* roxo mais claro no escuro */
--background: 0 0% 7%;        /* quase preto */
--border: 0 0% 18%;
```

**Por que roxo?** Associado a tecnologia + criatividade. Diferencia de portfolios genéricos azuis/cinza.

### Tokens semânticos (não valores diretos)
Tailwind usa `hsl(var(--token))` — troca de tema sem reescrever classes:
```ts
// tailwind.config.ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
  border: "hsl(var(--border))",
  card: "hsl(var(--card))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
}
```

### Tipografia
- **Font:** `Inter` via `next/font/google` (não Geist — só disponível no Next.js 15+)
- `variable: "--font-sans"` → usada em `body { font-family: var(--font-sans) }`

### Layout padrão das seções
Todas as seções seguem o mesmo padrão:
```tsx
<section id="X" className="py-24 px-4 sm:px-6 [bg-muted/30 alternado]">
  <div className="max-w-6xl mx-auto">
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
      {/* label mono uppercase + h2 com primary span */}
      {/* conteúdo */}
    </motion.div>
  </div>
</section>
```

### Animações
```ts
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}
const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}
```

---

## 4. Estrutura de Pastas

```
gabriel-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       ├── __tests__/
│   │       │   └── route.test.ts      # 10 unit tests (vitest)
│   │       └── route.ts               # POST handler: validação + rate limit + Notion
│   ├── fonts/                         # (gerado pelo create-next-app)
│   ├── globals.css                    # CSS variables HSL, scroll-smooth
│   ├── layout.tsx                     # RootLayout: Inter, ThemeProvider, JSON-LD, metadata
│   ├── opengraph-image.tsx            # OG image dinâmica 1200×630 (edge runtime)
│   ├── page.tsx                       # Home: importa todas as 8 seções
│   ├── robots.ts                      # Gera /robots.txt
│   └── sitemap.ts                     # Gera /sitemap.xml
│
├── components/
│   ├── sections/                      # Uma seção por arquivo
│   │   ├── hero.tsx                   # Hero com stats, grid bg, glow, scroll indicator
│   │   ├── about.tsx                  # 2 colunas: bio + valores
│   │   ├── experience.tsx             # Timeline vertical
│   │   ├── services.tsx               # 3-col grid com card highlight
│   │   ├── projects.tsx               # Filtros por categoria + AnimatePresence
│   │   ├── stack.tsx                  # Chips com level (expert/proficient/familiar)
│   │   ├── testimonials.tsx           # Cards com avatar e depoimento
│   │   └── contact.tsx                # Formulário + info lateral
│   ├── ui/                            # Primitivos (Radix-based)
│   │   ├── badge.tsx
│   │   ├── button.tsx                 # asChild pattern (Radix Slot)
│   │   ├── card.tsx
│   │   ├── separator.tsx
│   │   └── sheet.tsx                  # Mobile menu (Radix Dialog)
│   ├── footer.tsx
│   ├── navbar.tsx                     # Fixed, ThemeToggle, Sheet mobile
│   └── theme-toggle.tsx               # mounted check para evitar hydration mismatch
│
├── data/                              # TODO: conteúdo separado de UI
│   ├── about.ts                       # bio[], values[], education[], certifications[]
│   ├── experience.ts                  # ExperienceItem[]
│   ├── hero.ts                        # name, headline, stats, cta
│   ├── projects.ts                    # ProjectItem[] com category filter
│   ├── services.ts                    # ServiceItem[] com highlight flag
│   ├── stack.ts                       # StackCategory[] com level
│   └── testimonials.ts                # TestimonialItem[] (placeholders)
│
├── e2e/
│   └── smoke.spec.ts                  # 18 Playwright E2E tests
│
├── lib/
│   ├── notion.ts                      # getNotionClient() + saveLeadToNotion()
│   ├── rate-limit.ts                  # IP rate limiter in-memory (3 req/10min)
│   └── utils.ts                       # cn() = clsx + tailwind-merge
│
├── public/
│   └── images/
│       └── avatar.jpg                 # ⚠️ PENDENTE: adicionar foto real
│
├── docs/
│   └── TECHNICAL_BOOK.md             # Este documento
│
├── .env.example                       # Template das env vars
├── .env.local                         # ⚠️ NÃO vai ao git (.gitignore)
├── next.config.mjs
├── tailwind.config.ts
├── playwright.config.ts
├── vitest.config.ts
├── vitest.setup.ts
└── package.json
```

---

## 5. Tasks 1–5 — Estrutura e Seções Principais

### Task 1: Setup do Projeto
```bash
npx create-next-app@14 gabriel-portfolio \
  --typescript --tailwind --eslint --app --src-dir=no
```

**Ajustes manuais após o create:**
1. Remover `@base-ui/react` e `shadcn` (incompatíveis com Tailwind v3)
2. Instalar Radix UI primitivos:
   ```bash
   npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-separator
   ```
3. Instalar framer-motion, react-intersection-observer, next-themes:
   ```bash
   npm install framer-motion react-intersection-observer next-themes
   ```
4. Instalar ferramentas de test:
   ```bash
   npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @playwright/test
   ```

### Task 2: Design System
Configurar `tailwind.config.ts` com tokens semânticos e `app/globals.css` com variáveis HSL.

**Decisão crítica:** usar `hsl(var(--token))` em vez de valores diretos. Permite troca de tema sem alterar classes Tailwind.

**Dark mode:**
```ts
// tailwind.config.ts
darkMode: ["class"],  // controlado pela classe .dark no <html>
```

### Task 3: Componentes UI Base
Reescrever 5 componentes com Radix (não shadcn):

**`button.tsx` — padrão asChild:**
```tsx
import { Slot } from "@radix-ui/react-slot"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants(...))} ref={ref} {...props} />
  }
)
```
**Por quê?** O padrão `asChild` permite que o `SheetTrigger` use o `Button` como elemento raiz, evitando `<button><button>` aninhado (erro de hidratação).

### Task 4: Layout Base
`app/layout.tsx`:
```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
// suppressHydrationWarning em <html> E <body> — necessário com next-themes
// ThemeProvider sem enableSystem, com disableTransitionOnChange
```

**Por que sem `enableSystem`?** `enableSystem: true` causa divergência server/client (servidor não conhece a preferência do OS) → hydration mismatch.

### Task 5: Seções Hero → Stack

**Hero (`components/sections/hero.tsx`):**
- Grid pattern via `bg-grid-white/[0.03]` no background
- Glow roxo atrás do avatar: `bg-primary/20 blur-3xl`
- Stats reais: `$300k`, `77%`, `$30k+/ano`
- Scroll indicator animado com `animate-bounce`

**Experience (`components/sections/experience.tsx`):**
- Timeline vertical: linha contínua + dots filled (atual) ou outline (passado)
- `font-mono` nos períodos para estética técnica

**Projects (`components/sections/projects.tsx`):**
- `AnimatePresence mode="wait"` para transição suave ao filtrar
- Estado `active: ProjectCategory | "all"` controlado localmente
- Categoria como chip monoespaçado no topo do card

**Stack (`components/sections/stack.tsx`):**
- 3 levels: `expert` (bg-primary), `proficient` (bg-primary/20), `familiar` (bg-secondary)
- `hover:scale-105` nos chips para feedback visual

---

## 6. Task 6 — Testimonials + Contact

### Testimonials
Cards com:
- Aspas decorativas `&ldquo;` em `text-4xl text-primary/30`
- Avatar com inicial do nome (fallback enquanto não há foto)
- CTA para LinkedIn pedir depoimento real

**Status:** Placeholders — substituir em `data/testimonials.ts` quando tiver depoimentos reais.

### Contact Form
Estados do formulário:
```ts
type FormState = "idle" | "sending" | "success" | "error"
```

Fluxo:
1. `idle` → usuário preenche
2. `sending` → spinner no botão, campos desabilitados
3. `success` → tela de confirmação com botão "Enviar outra mensagem"
4. `error` → mensagem com fallback para email direto

### API Route (stub)
`app/api/contact/route.ts` foi criado como stub nesta task, com log no servidor. A integração real com Notion foi feita na Task 7.

**Bug corrigido nesta task:**
- `components/sections/hero.tsx` tinha `useEffect` e `useRef` importados mas não usados → ESLint error no build → removidos

---

## 7. Task 7 — Notion API + Rate Limiting + Testes Unitários

### Arquitetura da integração

```
formulário → POST /api/contact → rate-limit.ts → notion.ts → Notion API
```

### `lib/notion.ts`
```ts
export async function saveLeadToNotion(lead: LeadPayload): Promise<void> {
  const client = getNotionClient()  // singleton com lazy init
  await client.pages.create({
    parent: { database_id: process.env.NOTION_LEADS_DATABASE_ID },
    properties: {
      Nome: { title: [{ text: { content: lead.name } }] },
      Email: { email: lead.email },
      Mensagem: { rich_text: [{ text: { content: lead.message } }] },
      Status: { select: { name: "Novo" } },
      "Data de contato": { date: { start: new Date().toISOString() } },
    },
  })
}
```

**Problema encontrado:** O database foi criado via Notion MCP, que retorna o ID interno da coleção (`c7f95ef1-...`), diferente do ID público da URL (`2db05ad6d8a84f038cf3d094fdefd2eb`). A API REST do Notion usa o ID público da URL.

**Lição:** Sempre extrair o ID do database da URL no browser, não do response do MCP.

### `lib/rate-limit.ts`
Rate limiter in-memory com Map:
```ts
// 3 requests por IP a cada 10 minutos
const RATE_LIMIT = 3
const WINDOW_MS = 10 * 60 * 1000
```

**Por que in-memory e não Redis?** Para MVP é suficiente. Em serverless (Vercel), cada instância tem sua própria memória — não é 100% preciso com múltiplas instâncias, mas é adequado para o volume esperado.

### Validações na API route
1. Parse JSON (400 se inválido)
2. Rate limit por IP (429 se excedido)
3. Tipo dos campos (400 se não string)
4. Trim + campos vazios após trim (400)
5. Regex de email (400)
6. Mensagem > 2000 chars (400)
7. Salva no Notion (500 se falhar)

**Bug corrigido:** A validação de email via regex era feita ANTES do trim → email com espaços (`" ana@x.com "`) falhava na regex mesmo sendo válido. Solução: trim primeiro, depois validar.

### Testes unitários (Vitest)
10 testes em `app/api/contact/__tests__/route.test.ts`:

```ts
// Mocks:
vi.mock("@/lib/notion", () => ({ saveLeadToNotion: vi.fn() }))
vi.mock("@/lib/rate-limit", () => ({ rateLimit: vi.fn(() => true) }))

// Casos testados:
// ✓ payload válido → 200 + saveLeadToNotion chamado
// ✓ trim de campos → nome/email/mensagem trimados antes de salvar
// ✓ campo ausente → 400
// ✓ email inválido → 400
// ✓ mensagem vazia (só espaços) → 400
// ✓ mensagem > 2000 chars → 400
// ✓ rate limit excedido → 429
// ✓ Notion throws → 500
// ✓ JSON inválido → 400
```

### Setup do Notion (passo a passo)

1. **Criar integração:** https://www.notion.so/profile/integrations
   - Nome: "Leads do Portfolio"
   - Método: Token de acesso
   - Workspace: seu workspace

2. **Copiar o token** (começa com `ntn_...`)

3. **Criar o database** — usar o Notion MCP ou criar manualmente com colunas:
   - `Nome` (Title)
   - `Email` (Email)
   - `Mensagem` (Text)
   - `Status` (Select: Novo/Em andamento/Respondido/Arquivado)
   - `Data de contato` (Created time)

4. **Conectar a integração ao database:**
   - Abrir o database → `•••` → Connections → buscar "Leads do Portfolio" → Connect

5. **Pegar o ID do database:**
   - Da URL: `notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` → esse é o `NOTION_LEADS_DATABASE_ID`

6. **Configurar env vars:**
   ```
   # .env.local (local)
   NOTION_TOKEN=ntn_...
   NOTION_LEADS_DATABASE_ID=2db05ad6d8a84f038cf3d094fdefd2eb

   # Vercel → Settings → Environment Variables (produção)
   NOTION_TOKEN=ntn_...
   NOTION_LEADS_DATABASE_ID=2db05ad6d8a84f038cf3d094fdefd2eb
   NEXT_PUBLIC_SITE_URL=https://gabrielpacheco.dev
   ```

---

## 8. Task 8 — SEO Completo

### Metadata (`app/layout.tsx`)
```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Gabriel Pacheco",  // para páginas futuras
  },
  description: DESCRIPTION,
  keywords: ["Analytics Engineer", "dbt", "SQL", ...],
  authors: [{ name: "Gabriel Pacheco" }],
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    googleBot: { "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
}
```

### OG Image dinâmica (`app/opengraph-image.tsx`)
```tsx
export const runtime = "edge"  // gerada no edge, sem cold start
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    <div style={{ background: "#111", ... }}>
      {/* Brand dot + URL */}
      {/* Nome + título */}
      {/* Stack: SQL · dbt · Python · IA Aplicada */}
      {/* Stats: $300k, 77%, $30k+/ano */}
    </div>,
    { ...size }
  )
}
```

**Resultado:** quando você compartilha o link no LinkedIn, aparece uma imagem profissional com seu nome, cargo e métricas de impacto.

### Schema.org JSON-LD
3 nós no `<head>`:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "name": "Gabriel Pacheco", "jobTitle": "Analytics Engineer", ... },
    { "@type": "WebSite", "url": "https://gabrielpacheco.dev", ... },
    { "@type": "WebPage", "name": "...", ... }
  ]
}
```

Google usa isso para entender **quem você é** (não só o que o texto diz) — aparece em rich results de busca.

### Sitemap e Robots
```ts
// app/sitemap.ts → /sitemap.xml
// app/robots.ts → /robots.txt (User-Agent: * / Allow: /)
```

Gerados estaticamente em build. O Next.js 14 App Router faz isso nativamente.

---

## 9. Task 9 — E2E Smoke Tests + Deploy Vercel

### Playwright config (`playwright.config.ts`)
```ts
{
  testDir: "./e2e",
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,  // não reinicia se já estiver rodando
  },
}
```

### 18 smoke tests (`e2e/smoke.spec.ts`)

| # | Teste | O que valida |
|---|-------|-------------|
| 1 | title e meta description | `<title>` contém "Gabriel Pacheco" |
| 2 | OG image meta tag | `og:image` aponta para `/opengraph-image` |
| 3 | JSON-LD Schema.org | Grafo com 3 nós, Person.name === "Gabriel Pacheco" |
| 4 | navbar | Links "Sobre" e "Contato" visíveis |
| 5 | hero | Seção visível, headline com nome e cargo |
| 6 | about | Seção visível com texto sobre dado |
| 7 | experience | Seção visível com "Saúde" (Plataforma de Saúde B2B) |
| 8 | services | Seção visível |
| 9 | projects | Seção com botão "Todos" |
| 10 | filtro projetos | Click "IA" → TARS Intelligence aparece |
| 11 | stack | Seção com "SQL" |
| 12 | testimonials | Seção visível |
| 13 | contact form | Campos name, email, message, button visíveis |
| 14 | validação HTML5 | Submit sem dados não avança para success state |
| 15 | footer | Link com `href` contendo `linkedin.com` |
| 16 | robots.txt | Status 200, contém "User-Agent" |
| 17 | sitemap.xml | Status 200, contém `<urlset` |
| 18 | OG image route | Status 200, `content-type: image/png` |

**Resultado: 18/18 ✓ em 10.2s** (local e produção)

### Deploy Vercel — Passo a Passo

**1. Importar repositório:**
- https://vercel.com/new → Import Git Repository
- Selecionar `gabriel-analytics/gabriel-portfolio`

**2. Configurações do projeto:**
- Framework Preset: **Next.js** (auto-detectado)
- Build Command: `next build` (padrão)
- Node.js Version: **20.x**

**3. Environment Variables (obrigatórias):**
```
NOTION_TOKEN              = ntn_424658...  (token completo da integração)
NOTION_LEADS_DATABASE_ID  = 2db05ad6d8a84f038cf3d094fdefd2eb
NEXT_PUBLIC_SITE_URL      = https://gabrielpacheco.dev
```

**4. Deploy** → ~2 minutos

**5. Verificar após deploy:**
- OG image: https://opengraph.xyz → colar URL
- JSON-LD: https://search.google.com/test/rich-results → colar URL
- Formulário: preencher e checar se lead aparece no Notion

**6. Domínio personalizado (quando registrar):**
- Registro.br → registrar `gabrielpacheco.dev`
- Vercel → Settings → Domains → Add `gabrielpacheco.dev`
- DNS: CNAME `@` → `cname.vercel-dns.com`
- Propagar em até 48h

---

## 10. Bugs Encontrados e Soluções

### Bug 1: `border-border class does not exist` (build error)
**Causa:** `npx shadcn@latest` instalou versão experimental que usa `@base-ui/react` e `oklch()` — incompatível com Tailwind v3.

**Solução:**
```bash
npm remove @base-ui/react shadcn
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-separator
```
Reescrever `button.tsx`, `sheet.tsx`, `badge.tsx`, `card.tsx`, `separator.tsx` com Radix puro. Migrar CSS de `oklch()` para HSL.

---

### Bug 2: `Geist is not exported from next/font/google`
**Causa:** Geist font só existe no Next.js 15+. Projeto usa v14.2.35.

**Solução:** Substituir por `Inter`:
```ts
// antes
import { Geist } from "next/font/google"
// depois
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
```

---

### Bug 3: Hydration mismatch — `<button>` dentro de `<button>`
**Causa:** `SheetTrigger` (Radix Dialog.Trigger) renderiza `<button>` por padrão. Quando wrappado em `<Button>` (que também é `<button>`), cria HTML inválido que React detecta como mismatch no F5.

**Solução:** padrão `asChild` do Radix:
```tsx
// antes (errado)
<SheetTrigger className="md:hidden">
  <Button variant="ghost" size="icon">
    <Menu className="h-5 w-5" />
  </Button>
</SheetTrigger>

// depois (correto)
<SheetTrigger asChild>
  <Button variant="ghost" size="icon" className="md:hidden">
    <Menu className="h-5 w-5" />
  </Button>
</SheetTrigger>
```
`asChild` faz o Trigger usar o elemento filho como raiz — SheetTrigger + Button = um único `<button>`.

---

### Bug 4: Hydration mismatch — dark mode flash
**Causa:** `enableSystem: true` no `ThemeProvider` causa divergência: servidor renderiza sem tema, cliente aplica tema do OS.

**Solução:**
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  disableTransitionOnChange
  // sem enableSystem
>
```
Adicionalmente: `suppressHydrationWarning` em `<html>` e `<body>`.

---

### Bug 5: `Github` e `Linkedin` não exportados do lucide-react
**Causa:** Versão do lucide-react instalada não tem esses ícones.

**Solução:** SVG inline para ícones sociais:
```tsx
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2..." />
    </svg>
  )
}
```

---

### Bug 6: Notion API — ID errado do database
**Causa:** Notion MCP retorna o ID interno da coleção (`c7f95ef1-...`). A API REST do Notion usa o ID público que aparece na URL (`2db05ad6d8a84f038cf3d094fdefd2eb`).

**Solução:** Sempre pegar o `NOTION_LEADS_DATABASE_ID` da URL do browser, não do response do MCP.

---

### Bug 7: Vitest — email com espaços falha na regex antes do trim
**Causa:** A rota validava o formato de email antes de fazer trim. `" ana@x.com "` falhava.

**Solução:** Trim todos os campos ANTES de qualquer validação:
```ts
const name = raw.name.trim()
const email = raw.email.trim()
const message = raw.message.trim()
// só então: validar formato, checar vazio, etc.
```

---

### Bug 8: Playwright strict mode — múltiplos elementos
**Causa:** `page.locator("#stack").getByText(/SQL/)` resolvia para 3 elementos ("SQL & Dados", "SQL", "PostgreSQL").

**Solução:** `.first()` para pegar o primeiro match:
```ts
await expect(page.locator("#stack").getByText(/SQL/).first()).toBeVisible()
```

---

### Bug 9: Playwright — Next.js gera "User-Agent" (A maiúsculo)
**Causa:** O test esperava `"User-agent"` mas o Next.js gera `"User-Agent"`.

**Solução:** Ajustar o assert:
```ts
expect(await res.text()).toContain("User-Agent")  // A maiúsculo
```

---

## 11. Padrão data/*.ts — Conteúdo Separado de UI

Todos os dados do site vivem em `data/` — você pode atualizar sem tocar nos componentes:

### `data/hero.ts`
```ts
export const hero = {
  name: "Gabriel Pacheco",
  headline: "Analytics Engineer & Fundador da TARS Intelligence",
  stats: [
    { value: "$300k", label: "impacto identificado" },
    { value: "77%", label: "melhoria em pipeline" },
    { value: "$30k+", label: "economia/ano gerada" },
  ],
  location: "São Paulo, Brasil",
  openToWork: false,  // alterar para true quando buscar oportunidades
}
```

### `data/testimonials.ts` — como adicionar depoimento real
```ts
export const testimonials: TestimonialItem[] = [
  {
    name: "Nome do Colega",
    role: "Head of Data",
    company: "Empresa X",
    text: "Texto do depoimento aqui. Peça via LinkedIn ou email.",
  },
]
```

### `data/experience.ts` — como atualizar Bionexo
A empresa está como "Plataforma de Saúde B2B" por discrição. Para usar o nome real:
```ts
company: "Bionexo",  // alterar quando quiser
```

---

## 12. Configuração do Notion (Lead Capture)

### Como ver os leads
1. Acessar o workspace do Notion
2. Buscar "Leads do Portfolio"
3. Leads chegam com Status = "Novo" — alterar para "Em andamento" ao iniciar conversa, "Respondido" ao responder

### Como gerir o pipeline
Sugestão de uso:
- **Novo** → chegou via formulário
- **Em andamento** → você entrou em contato
- **Respondido** → call/reunião agendada
- **Arquivado** → não avançou

---

## 13. Checklist Pós-Deploy

### Imediato (hoje)
- [ ] Adicionar foto real em `public/images/avatar.jpg` (quadrada, mín. 400×400px)
- [ ] Configurar env vars na Vercel (`NOTION_TOKEN`, `NOTION_LEADS_DATABASE_ID`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Testar formulário de contato em produção e verificar lead no Notion

### Esta semana
- [ ] Substituir 3 placeholders em `data/testimonials.ts` por depoimentos reais
- [ ] Revisar bullets de `data/experience.ts` (confirmar o que pode ser público da Bionexo)
- [ ] Revisar `data/about.ts` (educação, detalhes adicionais)

### Após registrar o domínio
- [ ] Registrar `gabrielpacheco.dev` no Registro.br (~R$40/ano)
- [ ] Adicionar domínio na Vercel (Settings → Domains)
- [ ] Apontar DNS: CNAME `@` → `cname.vercel-dns.com`
- [ ] Atualizar `NEXT_PUBLIC_SITE_URL` para `https://gabrielpacheco.dev`
- [ ] Submeter sitemap no Google Search Console
- [ ] Validar JSON-LD: https://search.google.com/test/rich-results

### Próximo mês
- [ ] Publicar URL no LinkedIn (seção "Em destaque")
- [ ] Coletar primeiros 3 depoimentos reais
- [ ] Verificar leads capturados e iniciar follow-up

---

## 14. Próximos Passos

### Features planejadas (backlog)
- **Blog/Artigos técnicos** — rota `/blog` com MDX
- **Case studies detalhados** — `/cases/datamart-optimization` com gráficos
- **Calculadora de ROI** — widget interativo para serviços
- **i18n** — versão em inglês para oportunidades internacionais

### Melhorias técnicas
- Adicionar Google Analytics / Plausible (privacy-first)
- Rate limiting com Upstash Redis (mais preciso em serverless)
- Testes de acessibilidade com axe-playwright
- Lighthouse CI no GitHub Actions (performance budget)

### Padrão de commits
```
feat(task-N): descrição
fix: descrição
data: descrição
docs: descrição
```

---

## Referências Técnicas

| Tópico | Referência |
|--------|-----------|
| Next.js 14 App Router | https://nextjs.org/docs/app |
| Radix UI | https://www.radix-ui.com |
| framer-motion | https://www.framer.com/motion |
| next-themes | https://github.com/pacocoursey/next-themes |
| Notion API | https://developers.notion.com |
| Playwright | https://playwright.dev |
| Vitest | https://vitest.dev |
| Schema.org Person | https://schema.org/Person |
| OG Image Next.js | https://nextjs.org/docs/app/api-reference/file-conventions/opengraph-image |

---

*Documentação gerada em 2026-07-01 | Gabriel Pacheco + TARS Intelligence*
