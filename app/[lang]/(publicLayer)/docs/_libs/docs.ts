import "server-only"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import DOCS from "./docs.generated.json"
import { INDEXED_LANGUAGES } from "@/config/translations/translations.config"

import SOURCE from "./source.json"

// ДОКУМЕНТЫ ВЕТКИ /docs (node step 457-2). Источник — репозиторий `lagrix-dev/lagrix`: ветка рисует ровно то, что лежит на
// GitHub, один в один. Язык: документ на языке страницы, а нет его — английский (закон элемента «языки — это файлы»). README —
// свой у каждого языка (README.<язык>.md, шаг 458-1), нет своего — английский.
//
// 🔒 ЖИВОЕ ЧТЕНИЕ, БЕЗ ПЕРЕСБОРКИ (шаг 458-9). Владелец 2026-10-12: «проверь подтвердишь что когда я буду обновлять или дополнить
// страницы в GitHub здесь будут происходить те же сам изменения» → выбор «Живое чтение с GitHub». Каждая страница, маршрут и
// карта ветки первым делом зовут `liveDocs()`: она спрашивает GitHub через кэш данных Next — последний коммит ветки не чаще раза
// в 5 минут (`revalidate`), дерево и файлы — по хэшу коммита (неизменны, берутся один раз на коммит). Таймеров и опроса нет:
// запрос к GitHub бывает только тогда, когда страницу рисуют (заход посетителя после истечения кэша). Лимит GitHub без ключа —
// 60 запросов к API в час; здесь их не больше 12 в час плюс одно дерево на коммит.
// Нет сети или GitHub отказал — остаётся последнее прочитанное, а до первого чтения — копия сборки (`docs.generated.json`,
// `scripts/sync-lagrix-docs.mjs` в prebuild): сайт не теряет документы из-за GitHub.

export type Doc = { slug: string; file: string; title: string; text: string }
type Docs = { source: { repo: string; branch: string; updatedAt?: string; syncedAt: string }; readme: Record<string, string>; languages: Record<string, Doc[]> }
let data = DOCS as Docs

export const LIVE_REVALIDATE = 300
const API = "https://api.github.com"
const RAW = "https://raw.githubusercontent.com"
// 🔒 ЗАКРЫТЫЙ РЕПОЗИТОРИЙ (шаг узла 489): тот же ключ, что у сборки, — свой ключ GitHub элемента со страницы GitHub ядра
// (`<SERVICE_DATA_DIR>/github/.env`). С ним запросы идут с `Authorization`, файлы — через API contents (raw.githubusercontent.com
// закрытый репозиторий без ключа не отдаёт). Без ключа — прежний путь без ключа. Читается при каждом чтении: замена ключа
// на странице GitHub действует без перезапуска.
function ghToken(): string | null {
  const dir = process.env.SERVICE_DATA_DIR?.trim()
  if (!dir) return null
  try {
    const line = readFileSync(join(dir, "github", ".env"), "utf8").split(/\r?\n/).find((l) => l.startsWith("GITHUB_TOKEN="))
    return line?.slice("GITHUB_TOKEN=".length).trim() || null
  } catch { return null }
}

async function readLive(): Promise<Docs> {
  const token = ghToken()
  const auth: Record<string, string> = token ? { authorization: `Bearer ${token}`, "x-github-api-version": "2022-11-28" } : {}
  const GH_HEADERS = { accept: "application/vnd.github+json", "user-agent": "fractera-docs-live", ...auth }
  const src = SOURCE as { repo: string; branch: string; readme: string | Record<string, string>; docsDir: string; languages: string[] }
  const readmes: Record<string, string> = typeof src.readme === "string" ? { en: src.readme } : src.readme
  // Последний коммит ветки: его хэш делает дальнейшие адреса неизменными, его дата — дата документов.
  const commitRes = await fetch(`${API}/repos/${src.repo}/commits/${encodeURIComponent(src.branch)}`, { headers: GH_HEADERS, next: { revalidate: LIVE_REVALIDATE } })
  if (!commitRes.ok) throw new Error(`commit ${commitRes.status}`)
  const commit = (await commitRes.json()) as { sha: string; commit: { committer: { date: string } } }
  const treeRes = await fetch(`${API}/repos/${src.repo}/git/trees/${commit.sha}?recursive=1`, { headers: GH_HEADERS, cache: "force-cache" })
  if (!treeRes.ok) throw new Error(`tree ${treeRes.status}`)
  const tree = (await treeRes.json()) as { truncated: boolean; tree: { path: string; type: string }[] }
  if (tree.truncated) throw new Error("tree truncated")
  const blobs = tree.tree.filter((t) => t.type === "blob").map((t) => t.path)
  const raw = async (p: string) => {
    const enc = p.split("/").map(encodeURIComponent).join("/")
    const r = token
      ? await fetch(`${API}/repos/${src.repo}/contents/${enc}?ref=${commit.sha}`, { headers: { ...GH_HEADERS, accept: "application/vnd.github.raw+json" }, cache: "force-cache" })
      : await fetch(`${RAW}/${src.repo}/${commit.sha}/${enc}`, { cache: "force-cache" })
    if (!r.ok) throw new Error(`${p} ${r.status}`)
    return r.text()
  }
  const out: Docs = { source: { repo: src.repo, branch: src.branch, updatedAt: commit.commit.committer.date, syncedAt: new Date().toISOString() }, readme: {}, languages: {} }
  const baseReadme = blobs.includes(readmes.en) ? await raw(readmes.en) : ""
  for (const lang of src.languages) {
    out.readme[lang] = readmes[lang] && blobs.includes(readmes[lang]) ? await raw(readmes[lang]) : baseReadme
    const prefix = `${src.docsDir}/${lang}/`
    const files = blobs.filter((p) => p.startsWith(prefix) && p.endsWith(".md")).sort()
    out.languages[lang] = await Promise.all(files.map(async (p) => {
      const text = await raw(p)
      return { slug: p.slice(prefix.length, -3), file: p, title: (text.match(/^#\s+(.+)$/m)?.[1] ?? "").trim(), text }
    }))
  }
  return out
}

/** Свежие документы с GitHub (через кэш данных Next); отказ — последнее прочитанное. Звать первым в каждой точке входа ветки. */
export async function liveDocs(): Promise<void> {
  try {
    data = await readLive()
  } catch (e) {
    console.warn(`===DOCS_LIVE_FALLBACK=== ${(e as Error).message} — the last copy stays (${data.source.syncedAt})`)
  }
}

/** Откуда и когда взяты документы, которые сейчас на сайте. */
export function docsSource(): Docs["source"] {
  return data.source
}
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
  return DOCS_LANGUAGES.filter((l) => data.languages[l]?.some((d) => d.slug === slug))
}

/** README на языке страницы; нет своего — английский (синхронизация уже подставила его). */
export function readme(lang: string): string {
  return data.readme[lang] ?? data.readme[FALLBACK] ?? ""
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
 * `README.md` и `README.<язык>.md` — /docs; прочие файлы репозитория — на GitHub; внешние адреса и якоря — как есть.
 * `site(lang, subPath)` строит адрес: в странице — относительный, в Markdown-двойнике — полный.
 */
export function rewriteHref(href: string, lang: string, site: (lang: string, subPath: string) => string): string {
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const [pathPart, hash = ""] = href.split("#")
  const anchor = hash ? `#${hash}` : ""
  const inDocs = pathPart.match(/(?:^|\/)docs\/([a-z]{2})\/([^/]+)\.md$/)
  if (inDocs) return site(inDocs[1], `/docs/${inDocs[2]}`) + anchor
  const local = pathPart.match(/^(?:\.\/)?([^/]+)\.md$/)
  // README.<язык>.md — /docs этого языка, README.md — английский (ссылки «English version» / «Русская версия», 458-1).
  const readmeLink = pathPart.match(/(?:^|\/)README(?:\.([a-z]{2}))?\.md$/)
  if (readmeLink) return site(readmeLink[1] ?? FALLBACK, "/docs") + anchor
  if (local) return site(lang, `/docs/${local[1]}`) + anchor
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
