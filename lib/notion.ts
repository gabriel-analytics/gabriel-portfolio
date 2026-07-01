import { Client } from "@notionhq/client"

let _client: Client | null = null

export function getNotionClient(): Client {
  if (!_client) {
    const token = process.env.NOTION_TOKEN
    if (!token) throw new Error("NOTION_TOKEN not set")
    _client = new Client({ auth: token })
  }
  return _client
}

export interface LeadPayload {
  name: string
  email: string
  message: string
}

export async function saveLeadToNotion(lead: LeadPayload): Promise<void> {
  const client = getNotionClient()
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID
  if (!databaseId) throw new Error("NOTION_LEADS_DATABASE_ID not set")

  await client.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Nome: {
        title: [{ text: { content: lead.name } }],
      },
      Email: {
        email: lead.email,
      },
      Mensagem: {
        rich_text: [{ text: { content: lead.message } }],
      },
      Status: {
        select: { name: "Novo" },
      },
      "Data de contato": {
        date: { start: new Date().toISOString() },
      },
    },
  })
}
