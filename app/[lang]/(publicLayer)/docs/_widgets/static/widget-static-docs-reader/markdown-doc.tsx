import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "github-markdown-css/github-markdown.css"
import { rewriteHref, type Doc } from "../../../_libs/docs"

// ДОКУМЕНТ В ВИДЕ GITHUB (node step 457-2, владелец 2026-10-12: «стандартный Markdown Design … один в один такой как GitHub»).
// Разметка — `react-markdown` + `remark-gfm` (таблицы, списки задач, зачёркивание — как на GitHub), вид — официальные стили
// GitHub `github-markdown-css` (класс `markdown-body`; светлая и тёмная тема — по настройке системы). 🔒 Это названное
// исключение из закона «вид только из токенов Дизайна»: владелец заказал вид GitHub один в один. Рисует сервер.
// Ссылки на документы репозитория становятся ссылками сайта (`next/link`, переход без перезагрузки — навык soft-navigation).

const siteHref = (lang: string, subPath: string) => `/${lang}${subPath}`

export function MarkdownDoc({ md, lang }: { md: string; lang: string }) {
  return (
    <article data-block="bcn45" className="markdown-body" style={{ background: "transparent" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            const to = rewriteHref(href, lang, siteHref)
            return to.startsWith("/") ? <Link href={to}>{children}</Link> : <a href={to} rel="noopener">{children}</a>
          },
        }}
      >
        {md}
      </ReactMarkdown>
    </article>
  )
}

/** Список документов слева: тот же порядок, что в репозитории; текущий отмечен. */
export function DocsNav({ docs, lang, current, label, home }: { docs: Doc[]; lang: string; current?: string; label: string; home: string }) {
  return (
    <nav data-block="g2kja" aria-label={label} className="text-sm">
      <p data-block="ss7rp" className="mb-2 font-semibold text-foreground">
        <Link href={`/${lang}/docs`} aria-current={current ? undefined : "page"} className="hover:underline">{home}</Link>
      </p>
      <ul data-block="nmv0a" className="grid gap-1.5 border-l border-border pl-3">
        {docs.map((d) => (
          <li data-block="uaohe" key={d.slug}>
            <Link
              href={`/${lang}/docs/${d.slug}`}
              aria-current={d.slug === current ? "page" : undefined}
              className={d.slug === current ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}
            >
              {d.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
