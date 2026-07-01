import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Gabriel Pacheco — Analytics Engineer & TARS Intelligence",
  description:
    "Analytics Engineer com foco em dados, IA aplicada e arquitetura de dados. Fundador da TARS Intelligence. Transformando dados em decisões.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabrielpacheco.dev"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Gabriel Pacheco",
    title: "Gabriel Pacheco — Analytics Engineer & TARS Intelligence",
    description:
      "Analytics Engineer com foco em dados, IA aplicada e arquitetura de dados.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Pacheco — Analytics Engineer",
    description:
      "Analytics Engineer com foco em dados, IA aplicada e arquitetura de dados.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={cn(inter.variable)}>
      <body className="antialiased bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
