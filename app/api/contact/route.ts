import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body as {
      name: string
      email: string
      message: string
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    // Task 7: integração com Notion API será adicionada aqui
    // Por ora, loga no servidor e retorna sucesso
    console.log("[contact]", { name, email, message: message.slice(0, 80) })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
