import { urlFor } from "@/lib/seo/alternates"
import { docsFor } from "../../../_libs/docs"
import WORDS from "../../../_libs/words.json"

// ТЕКСТ ВИДЖЕТА ДЛЯ МАШИН (node step 457-3): список документов ветки /docs со ссылками — тот же, что слева на странице.
// Тексты самих документов агенты берут из Markdown-двойников (`/docs/index.md`, `/docs/<документ>/index.md`) и llms-full.txt.
export function markdown(lang: string): string {
  const w = (WORDS as Record<string, { nav: string }>)[lang] ?? WORDS.en
  const rows = docsFor(lang).map((d) => `- [${d.title}](${urlFor(lang, `/docs/${d.slug}`)})`)
  return [`## ${w.nav}`, "", ...rows].join("\n")
}
