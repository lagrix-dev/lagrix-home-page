import type { Metadata } from "next"
import { DOCS_LANGUAGES, isOpen, openAlternates, readme } from "./_libs/docs"
import { buildAlternates } from "@/lib/seo/alternates"
import { docMetadata } from "./_libs/seo"
import { DocPage } from "./_widgets/static/widget-static-docs-reader"

// КОРЕНЬ ВЕТКИ /docs (node step 457-2): README репозитория lagrix-dev/lagrix и список документов. Рисуется при сборке целиком
// (страница статическая); новая версия документов приходит пересборкой — `scripts/sync-lagrix-docs.mjs` в prebuild.
export const dynamic = "force-static"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return docMetadata(lang, "/docs", readme(lang), buildAlternates(lang, "/docs", openAlternates(lang, DOCS_LANGUAGES)), isOpen(lang, DOCS_LANGUAGES))
}

export default async function DocsHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <DocPage lang={lang} subPath="/docs" md={readme(lang)} />
}
