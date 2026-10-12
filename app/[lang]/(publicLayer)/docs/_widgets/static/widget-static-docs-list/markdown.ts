import { urlFor } from "@/lib/seo/alternates"
import { descriptionOf, docsFor, titleOf } from "../../../_libs/docs"
import { docsWords } from "../../../_libs/post"

// Текст оглавления для машин (Markdown-двойник корня /docs, шаг узла 458-5): тот же список, что видит человек.
export function markdown(lang: string): string {
  const w = docsWords(lang)
  return [`## ${w.list}`, "", ...docsFor(lang).map((d) => `- [${titleOf(d.text)}](${urlFor(lang, `/docs/${d.slug}`)}) — ${descriptionOf(d.text)}`)].join("\n")
}
