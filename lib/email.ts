import { Resend } from "resend"
import type { LeadPayload } from "./notion"

let _client: Resend | null = null

function getResendClient(): Resend {
  if (!_client) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error("RESEND_API_KEY not set")
    _client = new Resend(apiKey)
  }
  return _client
}

// Alerta por email quando um novo lead chega pelo formulário de contato.
// Fonte de verdade continua sendo o Notion (saveLeadToNotion) — isso é só
// notificação, não deve bloquear nem falhar a resposta ao usuário do site.
export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? "gabrielmepv@gmail.com"
  const resend = getResendClient()

  await resend.emails.send({
    from: "Portfólio <onboarding@resend.dev>",
    to,
    subject: `Novo lead no portfólio: ${lead.name}`,
    html: `
      <h2>Novo contato pelo portfólio</h2>
      <p><strong>Nome:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>
      <hr>
      <p style="color:#888;font-size:12px;">Registrado também no Notion (Leads do Portfolio).</p>
    `,
  })
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
