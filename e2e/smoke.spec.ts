import { test, expect } from "@playwright/test"

test.describe("Smoke — página principal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  // ── Metadata ──────────────────────────────────────────────────────────────

  test("title e meta description corretos", async ({ page }) => {
    await expect(page).toHaveTitle(/Gabriel Pacheco/)
    const desc = page.locator('meta[name="description"]')
    await expect(desc).toHaveAttribute("content", /Analytics Engineer/)
  })

  test("OG image meta tag presente", async ({ page }) => {
    const og = page.locator('meta[property="og:image"]')
    await expect(og).toHaveAttribute("content", /opengraph-image/)
  })

  test("JSON-LD Schema.org presente no <head>", async ({ page }) => {
    const ld = await page.$eval(
      'script[type="application/ld+json"]',
      (el) => JSON.parse(el.textContent ?? "{}")
    )
    expect(ld["@context"]).toBe("https://schema.org")
    expect(ld["@graph"]).toHaveLength(3)
    const person = ld["@graph"].find((n: { "@type": string }) => n["@type"] === "Person")
    expect(person?.name).toBe("Gabriel Pacheco")
  })

  // ── Navbar ────────────────────────────────────────────────────────────────

  test("navbar renderiza com links de navegação", async ({ page }) => {
    const nav = page.locator("header nav")
    await expect(nav).toBeVisible()
    await expect(nav.getByRole("link", { name: /sobre/i })).toBeVisible()
    await expect(nav.getByRole("link", { name: /contato/i }).first()).toBeVisible()
  })

  // ── Seções ────────────────────────────────────────────────────────────────

  test("hero section visível com headline real", async ({ page }) => {
    const hero = page.locator("#hero")
    await expect(hero).toBeVisible()
    await expect(hero.getByText(/Gabriel Pacheco/)).toBeVisible()
    await expect(hero.getByText(/Analytics Engineer/)).toBeVisible()
  })

  test("seção about renderiza", async ({ page }) => {
    await page.locator("#about").scrollIntoViewIfNeeded()
    await expect(page.locator("#about")).toBeVisible()
    await expect(page.locator("#about").getByText(/dado/i).first()).toBeVisible()
  })

  test("seção experience renderiza com Bionexo", async ({ page }) => {
    await page.locator("#experience").scrollIntoViewIfNeeded()
    await expect(page.locator("#experience")).toBeVisible()
    await expect(page.locator("#experience").getByText(/Saúde/)).toBeVisible()
  })

  test("seção soluções renderiza", async ({ page }) => {
    await page.locator("#solucoes").scrollIntoViewIfNeeded()
    await expect(page.locator("#solucoes")).toBeVisible()
  })

  test("seção projects renderiza com filtros", async ({ page }) => {
    await page.locator("#projects").scrollIntoViewIfNeeded()
    await expect(page.locator("#projects")).toBeVisible()
    await expect(page.locator("#projects").getByText(/Todos/)).toBeVisible()
  })

  test("filtro de projetos por categoria funciona", async ({ page }) => {
    await page.locator("#projects").scrollIntoViewIfNeeded()
    const iaButton = page.locator("#projects").getByRole("button", { name: /IA/i })
    await iaButton.scrollIntoViewIfNeeded()
    await iaButton.click({ force: true })
    await expect(page.locator("#projects").getByText(/TARS/)).toBeVisible()
  })

  test("seção stack renderiza", async ({ page }) => {
    await page.locator("#stack").scrollIntoViewIfNeeded()
    await expect(page.locator("#stack")).toBeVisible()
    await expect(page.locator("#stack").getByText(/SQL/).first()).toBeVisible()
  })

  test("seção testimonials renderiza", async ({ page }) => {
    await page.locator("#testimonials").scrollIntoViewIfNeeded()
    await expect(page.locator("#testimonials")).toBeVisible()
  })

  test("seção contact renderiza com formulário", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded()
    await expect(page.locator("#contact")).toBeVisible()
    await expect(page.locator("#contact input#name")).toBeVisible()
    await expect(page.locator("#contact input#email")).toBeVisible()
    await expect(page.locator("#contact textarea#message")).toBeVisible()
    await expect(
      page.locator("#contact button[type='submit']")
    ).toBeVisible()
  })

  // ── Formulário de contato ─────────────────────────────────────────────────

  test("formulário de contato valida campos obrigatórios (HTML5)", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded()
    await page.locator("#contact button[type='submit']").click()
    // Campos required — o browser bloqueia a submissão sem disparar fetch
    // Validamos que o formulário ainda está visível (não foi para success state)
    await expect(page.locator("#contact input#name")).toBeVisible()
  })

  // ── Footer ────────────────────────────────────────────────────────────────

  test("footer renderiza com link do LinkedIn", async ({ page }) => {
    const footer = page.locator("footer")
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
    await expect(
      footer.getByRole("link", { name: /linkedin/i })
    ).toHaveAttribute("href", /linkedin\.com/)
  })

  // ── Rotas utilitárias ─────────────────────────────────────────────────────

  test("robots.txt acessível", async ({ page }) => {
    const res = await page.request.get("/robots.txt")
    expect(res.status()).toBe(200)
    expect(await res.text()).toContain("User-Agent")
  })

  test("sitemap.xml acessível", async ({ page }) => {
    const res = await page.request.get("/sitemap.xml")
    expect(res.status()).toBe(200)
    expect(await res.text()).toContain("<urlset")
  })

  test("OG image retorna 200", async ({ page }) => {
    const res = await page.request.get("/opengraph-image")
    expect(res.status()).toBe(200)
    expect(res.headers()["content-type"]).toContain("image/png")
  })
})
