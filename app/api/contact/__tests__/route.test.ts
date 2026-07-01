import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest } from "next/server"

// --- mocks ---
vi.mock("@/lib/notion", () => ({
  saveLeadToNotion: vi.fn(),
}))

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => true),
}))

import { POST } from "../route"
import { saveLeadToNotion } from "@/lib/notion"
import { rateLimit } from "@/lib/rate-limit"

// ---

function makeRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  })
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(rateLimit).mockReturnValue(true)
    vi.mocked(saveLeadToNotion).mockResolvedValue(undefined)
  })

  it("returns 200 with valid payload", async () => {
    const res = await POST(makeRequest({ name: "Ana", email: "ana@exemplo.com", message: "Olá" }))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toEqual({ ok: true })
    expect(saveLeadToNotion).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@exemplo.com",
      message: "Olá",
    })
  })

  it("trims whitespace from fields", async () => {
    await POST(makeRequest({ name: "  Ana  ", email: "  ana@exemplo.com  ", message: "  Olá  " }))
    expect(saveLeadToNotion).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@exemplo.com",
      message: "Olá",
    })
  })

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ email: "ana@exemplo.com", message: "Olá" }))
    expect(res.status).toBe(400)
    expect(saveLeadToNotion).not.toHaveBeenCalled()
  })

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ name: "Ana", message: "Olá" }))
    expect(res.status).toBe(400)
  })

  it("returns 400 when message is empty string", async () => {
    const res = await POST(makeRequest({ name: "Ana", email: "ana@exemplo.com", message: "   " }))
    expect(res.status).toBe(400)
  })

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ name: "Ana", email: "not-an-email", message: "Olá" }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain("Email inválido")
  })

  it("returns 400 when message exceeds 2000 chars", async () => {
    const res = await POST(
      makeRequest({ name: "Ana", email: "ana@exemplo.com", message: "x".repeat(2001) })
    )
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain("2000")
  })

  it("returns 429 when rate limit is exceeded", async () => {
    vi.mocked(rateLimit).mockReturnValue(false)
    const res = await POST(makeRequest({ name: "Ana", email: "ana@exemplo.com", message: "Olá" }))
    expect(res.status).toBe(429)
    expect(saveLeadToNotion).not.toHaveBeenCalled()
  })

  it("returns 500 when Notion throws", async () => {
    vi.mocked(saveLeadToNotion).mockRejectedValue(new Error("Notion down"))
    const res = await POST(makeRequest({ name: "Ana", email: "ana@exemplo.com", message: "Olá" }))
    expect(res.status).toBe(500)
  })

  it("returns 400 for invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
      body: "not json",
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
