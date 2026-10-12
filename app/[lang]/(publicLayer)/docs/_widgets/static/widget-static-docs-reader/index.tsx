import { brand } from "@/lib/brand"
import { urlFor } from "@/lib/seo/alternates"
import { MarkdownDoc, DocsNav } from "./markdown-doc"
import { docsFor, descriptionOf, titleOf } from "../../../_libs/docs"
import WORDS from "../../../_libs/words.json"

// ВИДЖЕТ ВЕТКИ /docs (node step 457-2): список документов слева, документ справа в виде GitHub, JSON-LD TechArticle.
// Виджет маршрута — законный источник раскладки страницы (CLAUDE.md, «What goes on a page»).

const words = (lang: string) => (WORDS as Record<string, { nav: string; home: string }>)[lang] ?? WORDS.en

export function DocPage({ lang, subPath, md, current }: { lang: string; subPath: string; md: string; current?: string }) {
  const w = words(lang)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: titleOf(md),
    description: descriptionOf(md),
    inLanguage: lang,
    url: urlFor(lang, subPath),
    isPartOf: { "@type": "WebSite", name: brand().name, url: urlFor(lang, "") },
  }
  return (
    <div data-block="dc457" className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[14rem_minmax(0,1fr)] md:px-8">
      <aside data-block="dn457" className="md:sticky md:top-20 md:self-start">
        <DocsNav docs={docsFor(lang)} lang={lang} current={current} label={w.nav} home={w.home} />
      </aside>
      <div data-block="da457" className="min-w-0">
        <MarkdownDoc md={md} lang={lang} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
