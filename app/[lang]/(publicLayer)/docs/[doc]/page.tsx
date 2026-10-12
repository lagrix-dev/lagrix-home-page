import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allSlugs, docOf } from "../_libs/docs"
import { createContentPost } from "@/lib/content/create-content-post"
import { docConfigOf } from "../_libs/post"

// ДОКУМЕНТ ВЕТКИ /docs (шаг узла 457-2, вид — 458-4): один файл `docs/<язык>/<имя>.md` репозитория — одна страница
// `/<язык>/docs/<имя>`, нарисованная как пост блога (`createContentPost`, формат document → TechArticle). Все документы рисуются
// при сборке; имени, которого нет в репозитории, нет и на сайте (404).
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return allSlugs().map((doc) => ({ doc }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; doc: string }> }): Promise<Metadata> {
  const { lang, doc } = await params
  if (!docOf(lang, doc)) return {}
  return createContentPost(docConfigOf(doc)).generateMetadata({ params: Promise.resolve({ lang }) })
}

export default async function DocsPage({ params }: { params: Promise<{ lang: string; doc: string }> }) {
  const { lang, doc } = await params
  if (!docOf(lang, doc)) notFound()
  return createContentPost(docConfigOf(doc)).Page({ params: Promise.resolve({ lang }) })
}
