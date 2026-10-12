import type { Metadata } from "next"
import { brand } from "@/lib/brand"
import { urlFor } from "@/lib/seo/alternates"
import { descriptionOf, titleOf } from "./docs"

// МЕТАДАННЫЕ ПРОДВИЖЕНИЯ СТРАНИЦ ВЕТКИ /docs (node step 457-3). Разметку рисует виджет ветки widget-static-docs-reader.
// Продвижение (владелец: «надо добавить атрибуты связанные с продвижением»): title — заголовок документа, description —
// его первый абзац, canonical и hreflang — `buildAlternates`, вызванный самой страницей (тот же, что у всех страниц сайта, со ссылкой на
// Markdown-двойник), Open Graph и Twitter, JSON-LD `TechArticle`.


export function docMetadata(lang: string, subPath: string, md: string, alternates: Metadata["alternates"], open: boolean): Metadata {
  const title = titleOf(md) || brand().name
  const description = descriptionOf(md)
  const url = urlFor(lang, subPath)
  return {
    title,
    description,
    alternates,
    // Закрытая поиску версия — noindex (люди видят все языки, поисковик — только открытые).
    ...(open ? {} : { robots: { index: false, follow: true } }),
    openGraph: { type: "article", title, description, url, siteName: brand().name, locale: lang },
    twitter: { card: "summary", title, description },
  }
}
