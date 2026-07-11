import { NextRequest, NextResponse } from "next/server"
import { saveLeadToNotion } from "@/lib/notion"
import { sendLeadNotification } from "@/lib/email"
import { rateLimit } from "@/lib/rate-limit"

// 3 requests per IP per 10 minutes
const RATE_LIMIT = 3
const WINDOW_MS = 10 * 60 * 1000

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"

  if (!rateLimit(ip, RATE_LIMIT, WINDOW_MS)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const raw = body as Record<string, unknown>

  if (typeof raw.name !== "string" || typeof raw.email !== "string" || typeof raw.message !== "string") {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
  }

  const name = raw.name.trim()
  const email = raw.email.trim()
  const message = raw.message.trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  if (message.length > 2000) {
    return NextResponse.json({ error: "Mensagem muito longa (máx. 2000 caracteres)" }, { status: 400 })
  }

  try {
    await saveLeadToNotion({ name, email, message })
  } catch (err) {
    console.error("[contact] Notion error:", err)
    return NextResponse.json({ error: "Erro ao salvar contato" }, { status: 500 })
  }

  // Alerta por email — best-effort: se falhar, não derruba a resposta, já que
  // o Notion (acima) é a fonte de verdade do lead. Mas precisa ser AWAITED:
  // em serverless (Vercel), a função pode ser congelada/encerrada assim que a
  // resposta é enviada, matando qualquer promise "fire-and-forget" pendente
  // no meio do caminho — foi exatamente isso que causou emails perdidos
  // intermitentemente antes dessa correção.
  try {
    await sendLeadNotification({ name, email, message })
  } catch (err) {
    console.error("[contact] Email notification error:", err)
  }

  return NextResponse.json({ ok: true })
}
