import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allSlugs, docOf, isOpen, languagesOf, openAlternates } from "../_libs/docs"
import { buildAlternates } from "@/lib/seo/alternates"
import { docMetadata } from "../_libs/seo"
import { DocPage } from "../_widgets/static/widget-static-docs-reader"

// ДОКУМЕНТ ВЕТКИ /docs (node step 457-2): один файл `docs/<язык>/<имя>.md` репозитория — одна страница `/<язык>/docs/<имя>`.
// Все документы рисуются при сборке; имени, которого нет в репозитории, нет и на сайте (404).
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return allSlugs().map((doc) => ({ doc }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; doc: string }> }): Promise<Metadata> {
  const { lang, doc } = await params
  const found = docOf(lang, doc)
  if (!found) return {}
  return docMetadata(lang, `/docs/${doc}`, found.doc.text, buildAlternates(lang, `/docs/${doc}`, openAlternates(lang, languagesOf(doc))), isOpen(lang, languagesOf(doc)))
}

export default async function DocsPage({ params }: { params: Promise<{ lang: string; doc: string }> }) {
  const { lang, doc } = await params
  const found = docOf(lang, doc)
  if (!found) notFound()
  return <DocPage lang={lang} subPath={`/docs/${doc}`} md={found.doc.text} current={doc} />
}
