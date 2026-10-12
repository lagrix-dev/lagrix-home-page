import { urlFor } from "@/lib/seo/alternates"
import { readme, withSiteLinks } from "../_libs/docs"

// Markdown-двойник /docs (для агентов, node step 457-3): README репозитория, ссылки — на полные адреса этого сайта.
export const dynamic = "force-static"

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return new Response(withSiteLinks(readme(lang), lang, urlFor), { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
