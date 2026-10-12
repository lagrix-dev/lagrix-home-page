import { urlFor } from "@/lib/seo/alternates"
import { readme, withSiteLinks } from "../_libs/docs"
import { WIDGET_MARKDOWN } from "../_widgets/markdown"

// Markdown-двойник /docs (для агентов, node step 457-3): README репозитория на языке страницы, ссылки — на полные адреса этого
// сайта; 458-5 — и оглавление документов, то же, что карточки под README.
export const dynamic = "force-static"

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const body = [withSiteLinks(readme(lang), lang, urlFor).trimEnd(), WIDGET_MARKDOWN["widget-static-docs-list"](lang)].join("\n\n")
  return new Response(body + "\n", { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
