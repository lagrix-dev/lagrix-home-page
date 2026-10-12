import "server-only"
import DOCS from "./docs.generated.json"
import { INDEXED_LANGUAGES } from "@/config/translations/translations.config"

// ДОКУМЕНТЫ ВЕТКИ /docs (node step 457-2). Источник — копия репозитория `lagrix-dev/lagrix`, снятая при сборке
// (`scripts/sync-lagrix-docs.mjs` → `docs.generated.json`): ветка рисует ровно то, что лежит на GitHub, один в один.
// Язык: документ на языке страницы, а нет его — английский (закон элемента «языки — это файлы»). README в репозитории один.

export type Doc = { slug: string; file: string; title: string; text: string }
type Docs = { source: { repo: string; branch: string; syncedAt: string }; readme: string; languages: Record<string, Doc[]> }
const data = DOCS as Docs

export const DOCS_SOURCE = data.source
export const DOCS_LANGUAGES = Object.keys(data.languages)
const FALLBACK = DOCS_LANGUAGES.includes("en") ? "en" : DOCS_LANGUAGES[0]

/** Документы языка страницы, по порядку файлов репозитория; нет языка — английские. */
export function docsFor(lang: string): Doc[] {
  return data.languages[lang] ?? data.languages[FALLBACK] ?? []
}

/** Документ по имени файла без `.md`; нет на языке страницы — английский; нет вовсе — null. */
export function docOf(lang: string, slug: string): { doc: Doc; lang: string } | null {
  const own = data.languages[lang]?.find((d) => d.slug === slug)
  if (own) return { doc: own, lang }
  const en = data.languages[FALLBACK]?.find((d) => d.slug === slug)
  return en ? { doc: en, lang: FALLBACK } : null
}

/** Все имена документов всех языков — для заранее нарисованных страниц. */
export function allSlugs(): string[] {
  return [...new Set(Object.values(data.languages).flat().map((d) => d.slug))]
}

/** Языки, на которых документ есть, — для hreflang и карты сайта. */
export function languagesOf(slug: string): string[] {
  return DOCS_LANGUAGES.filter((l) => data.languages[l].some((d) => d.slug === slug))
}

export function readme(): string {
  return data.readme
}

export function titleOf(md: string): string {
  return (md.match(/^#\s+(.+)$/m)?.[1] ?? "").replace(/[*_`]/g, "").trim()
}

/** Описание для поисковиков: первый обычный абзац (не заголовок, не таблица, не код), без разметки, до 160 знаков. */
export function descriptionOf(md: string): string {
  const para = md
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .find((b) => b && !/^(#|\||>|-|\*|\d+\.|<|!\[)/.test(b))
  const plain = (para ?? "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").replace(/\s+/g, " ").trim()
  return plain.length > 160 ? plain.slice(0, 157).replace(/\s+\S*$/, "") + "…" : plain
}

/**
 * Ссылка из Markdown репозитория → адрес на этом сайте. `docs/<язык>/x.md` и `x.md` внутри документа — страница документа,
 * `README.md` — /docs; прочие файлы репозитория — на GitHub; внешние адреса и якоря — как есть.
 * `site(lang, subPath)` строит адрес: в странице — относительный, в Markdown-двойнике — полный.
 */
export function rewriteHref(href: string, lang: string, site: (lang: string, subPath: string) => string): string {
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const [pathPart, hash = ""] = href.split("#")
  const anchor = hash ? `#${hash}` : ""
  const inDocs = pathPart.match(/(?:^|\/)docs\/([a-z]{2})\/([^/]+)\.md$/)
  if (inDocs) return site(inDocs[1], `/docs/${inDocs[2]}`) + anchor
  const local = pathPart.match(/^(?:\.\/)?([^/]+)\.md$/)
  if (local && local[1] !== "README") return site(lang, `/docs/${local[1]}`) + anchor
  if (/(^|\/)README\.md$/.test(pathPart)) return site(lang, "/docs") + anchor
  const clean = pathPart.replace(/^(\.\.\/)+|^\.\//, "")
  return `https://github.com/${data.source.repo}/blob/${data.source.branch}/${clean}${anchor}`
}

/** Текст документа со ссылками, переписанными на адреса сайта (для Markdown-двойника). */
export function withSiteLinks(md: string, lang: string, site: (lang: string, subPath: string) => string): string {
  return md.replace(/\]\(([^)\s]+)\)/g, (_, href: string) => `](${rewriteHref(href, lang, site)})`)
}

/**
 * Открыта ли версия поиску — тот же закон, что у всех страниц сайта (шаг узла 340, lib/seo/translation-state.ts): язык открыт
 * поисковикам (APP-CONFIG languages.indexed) И документ на нём есть, а не подменён английским. Закрытая версия — noindex и без
 * hreflang; открытая перечисляет только открытые языки. ✗ 457: /ru/docs объявлял hreflang ru при закрытом русском (аудит 2026-10-12).
 */
export function isOpen(lang: string, languages: string[]): boolean {
  return INDEXED_LANGUAGES.includes(lang) && languages.includes(lang)
}
export function openAlternates(lang: string, languages: string[]): string[] {
  return isOpen(lang, languages) ? languages.filter((l) => INDEXED_LANGUAGES.includes(l)) : []
}
