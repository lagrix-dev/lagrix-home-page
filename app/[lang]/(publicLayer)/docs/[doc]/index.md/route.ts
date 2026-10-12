import { urlFor } from "@/lib/seo/alternates"
import { DOCS_LANGUAGES, allSlugs, docOf, liveDocs, withSiteLinks } from "../../_libs/docs"

// Markdown-двойник документа (для агентов, node step 457-3): текст репозитория, ссылки — на полные адреса этого сайта.
export const dynamic = "force-static"
export const revalidate = 300
export const dynamicParams = true

// Обработчик маршрута не наследует язык из [lang] в заранее построенные адреса (замерено: только { doc } → 404 на всех) —
// пары «язык + документ» задаются здесь явно.
export function generateStaticParams() {
  return DOCS_LANGUAGES.flatMap((lang) => allSlugs().map((doc) => ({ lang, doc })))
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; doc: string }> }) {
  const { lang, doc } = await params
  await liveDocs()
  const found = docOf(lang, doc)
  if (!found) return new Response("Not found", { status: 404 })
  return new Response(withSiteLinks(found.doc.text, found.lang, urlFor), { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
