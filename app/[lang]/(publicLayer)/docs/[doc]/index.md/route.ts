import { urlFor } from "@/lib/seo/alternates"
import { allSlugs, docOf, withSiteLinks } from "../../_libs/docs"

// Markdown-двойник документа (для агентов, node step 457-3): текст репозитория, ссылки — на полные адреса этого сайта.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return allSlugs().map((doc) => ({ doc }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; doc: string }> }) {
  const { lang, doc } = await params
  const found = docOf(lang, doc)
  if (!found) return new Response("Not found", { status: 404 })
  return new Response(withSiteLinks(found.doc.text, found.lang, urlFor), { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
