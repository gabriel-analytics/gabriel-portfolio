import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabrielpacheco-portfolio.vercel.app"
const TITLE = "Gabriel Pacheco — Analytics Engineer"
const DESCRIPTION =
  "Analytics Engineer especializado em SQL, dbt, Python e IA aplicada. Projetos com impacto mensurável: $300k identificados, 43% de redução em pipeline crítico, $30k+/ano de economia."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Gabriel Pacheco",
  },
  description: DESCRIPTION,
  keywords: [
    "Analytics Engineer",
    "Data Engineer",
    "dbt",
    "BigQuery",
    "SQL",
    "Python",
    "IA aplicada",
    "consultoria de dados",
    "Power BI",
    "Airflow",
    "Snowflake",
    "São Paulo",
  ],
  authors: [{ name: "Gabriel Pacheco", url: SITE_URL }],
  creator: "Gabriel Pacheco",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Gabriel Pacheco",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gabriel Pacheco — Analytics Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Gabriel Pacheco",
      url: SITE_URL,
      jobTitle: "Analytics Engineer",
      description: DESCRIPTION,
      email: "gabrielmepv@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressCountry: "BR",
      },
      sameAs: [
        "https://www.linkedin.com/in/gabriel-pacheco-5541024a",
        "https://github.com/gabriel-analytics",
      ],
      knowsAbout: [
        "Analytics Engineering",
        "dbt",
        "SQL",
        "Python",
        "IA Aplicada",
        "Data Engineering",
        "Snowflake",
        "BigQuery",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Gabriel Pacheco",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      description: DESCRIPTION,
      inLanguage: "pt-BR",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn(inter.variable)} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
