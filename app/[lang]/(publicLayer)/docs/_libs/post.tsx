import "server-only"
import type { ReactNode } from "react"
import type { ContentPostConfig } from "@/lib/content/create-content-post"
import { DEFAULT_LANGUAGE } from "@/config/translations/translations.config"
import { snippetPath } from "@/lib/snippet/page-snippet"
import { docsSource, docsFor, titleOf, descriptionOf, docOf, readme, rewriteHref, languagesOf, DOCS_LANGUAGES } from "./docs"
import { markdownToBlocks, readingMinutes } from "./to-blocks"
import WORDS from "./words.json"

// СТРАНИЦА ДОКУМЕНТАЦИИ = ПОСТ БЛОГА (шаг узла 458-4). Владелец 2026-10-12: «тебе нужно использовать структуру блога и его
// страницы для того чтобы создать правильный дизайн документов». Корень /docs и каждый документ рисует фабрика постов
// `createContentPost` (формат `document` → JSON-LD `TechArticle`): крошки, H1, дата и время чтения, обложка — сниппет страницы
// (`<страница>/snippet.png`, шаг 458-3), тело — блоки `text-*` из Markdown репозитория. Здесь — настройки фабрики; вызывает её сама
// страница (`page.tsx`), чтобы сторож SEO видел фабрику в файле страницы.
// Языки поиска — тот же закон, что у всех страниц (шаг 340): «перевод» документа есть, когда в репозитории лежит его файл
// на этом языке; язык без файла показывает английский текст и закрыт от поиска.

type Words = { crumb: string; suffix: string; list: string; listNote: string; minRead: string; next: string }
export const docsWords = (lang: string): Words => (WORDS as Record<string, Words>)[lang] ?? WORDS.en

const siteLink = (lang: string) => (href: string) => rewriteHref(href, lang, (l, p) => `/${l}${p}`)
/** Переводы страницы для фабрики: языки, где у документа есть свой файл (кроме основного — он «переведён» всегда). */
const translations = (langs: string[]) => ({ overrides: Object.fromEntries(langs.filter((l) => l !== DEFAULT_LANGUAGE).map((l) => [l, { own: true }])) })

function docPost(subPath: string, langs: string[], text: (lang: string) => { md: string; lang: string } | null, opts: { crumbs: (lang: string, title: string) => { label: string; href?: string }[]; back?: (lang: string) => { href: string; label: string }; next?: (lang: string) => { href: string; label: string; title: string } | undefined; afterBody?: (lang: string) => ReactNode }): ContentPostConfig {
  return {
    format: "document",
    subPath,
    data: translations(langs),
    titleSuffix: (lang) => docsWords(lang).suffix,
    minLabel: (lang) => docsWords(lang).minRead,
    afterBody: opts.afterBody,
    // Ссылка «назад» — у документа на оглавление; у корня уровня выше нет (пустой адрес — ссылки нет).
    chrome: (lang, post) => ({ breadcrumbs: opts.crumbs(lang, post.title), backHref: opts.back?.(lang).href ?? "", backLabel: opts.back?.(lang).label ?? "", next: opts.next?.(lang) }),
    resolve: (lang) => {
      const found = text(lang)
      const md = found?.md ?? ""
      const { title, blocks } = markdownToBlocks(md, siteLink(found?.lang ?? lang))
      const snippet = snippetPath(subPath).replace("{lang}", lang)
      return {
        title,
        description: descriptionOf(md),
        tags: [],
        date: (docsSource().updatedAt ?? docsSource().syncedAt).slice(0, 10),
        readingMinutes: readingMinutes(md),
        blocks,
        heroImage: snippet,
        ogImage: snippet,
        inLanguage: found?.lang ?? lang,
      }
    },
  }
}

/** Корень /docs: README на языке страницы и под ним оглавление документов. */
export function docsRootConfig(afterBody: (lang: string) => ReactNode) {
  return docPost("/docs", DOCS_LANGUAGES, (lang) => ({ md: readme(lang), lang }), {
    crumbs: (lang) => [{ label: docsWords(lang).crumb }],
    afterBody,
  })
}

/** Один документ репозитория. */
export function docConfigOf(doc: string) {
  return docPost(`/docs/${doc}`, languagesOf(doc), (lang) => {
    const found = docOf(lang, doc)
    return found ? { md: found.doc.text, lang: found.lang } : null
  }, {
    crumbs: (lang, title) => [{ label: docsWords(lang).crumb, href: `/${lang}/docs` }, { label: title }],
    back: (lang) => ({ href: `/${lang}/docs`, label: docsWords(lang).crumb }),
    // 458-11: «вперёд» — следующий документ того же языка по порядку файлов репозитория (номер документа); у последнего — нет.
    next: (lang) => {
      const list = docsFor(lang)
      const after = list[list.findIndex((d) => d.slug === doc) + 1]
      return after && list.some((d) => d.slug === doc) ? { href: `/${lang}/docs/${after.slug}`, label: docsWords(lang).next, title: titleOf(after.text) } : undefined
    },
  })
}
