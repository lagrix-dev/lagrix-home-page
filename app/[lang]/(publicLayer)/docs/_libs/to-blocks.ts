import "server-only"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import type { Root, RootContent, PhrasingContent, ListItem } from "mdast"
import type { Block } from "@/lib/content/blocks/types"

// MARKDOWN ДОКУМЕНТА → БЛОКИ СТРАНИЦЫ (шаг узла 458-4). Владелец 2026-10-12: «документы в стиле и дизайне от блога, без
// какого-либо другого навыка дизайна в размётки Markdown». Документ репозитория рисуется теми же `text-*` типографики
// элемента, что и любая страница сайта: заголовки, абзацы, списки, цитаты, код, таблицы. Своих стилей у документов нет.
//
// Разметка внутри строки переводится в язык `inline` (`**жирный**`, `*курсив*`, код, `[ссылка](адрес)`); адрес ссылки
// проходит через `link` — документы ссылаются на файлы репозитория, сайт показывает свои адреса.
// Первый заголовок первого уровня — H1 страницы (его ставит фабрика), в тело он не попадает.

type LinkFn = (href: string) => string

function phrasing(nodes: PhrasingContent[], link: LinkFn): string {
  return nodes
    .map((n): string => {
      switch (n.type) {
        case "text":
          return n.value.replace(/\s*\n\s*/g, " ")
        case "strong":
          return `**${phrasing(n.children, link)}**`
        case "emphasis":
          return `*${phrasing(n.children, link)}*`
        case "inlineCode":
          return `\`${n.value}\``
        case "link":
          return `[${phrasing(n.children, link)}](${link(n.url)})`
        case "break":
          return " "
        case "delete":
          return phrasing(n.children, link)
        default:
          return "value" in n && typeof n.value === "string" ? n.value : ""
      }
    })
    .join("")
}

/** Текст узла-контейнера одной строкой (пункт списка, цитата): абзацы через пробел, вложенный список — через «; ». */
function flat(nodes: RootContent[], link: LinkFn): string {
  return nodes
    .map((n) => {
      if (n.type === "paragraph" || n.type === "heading") return phrasing(n.children, link)
      if (n.type === "list") return n.children.map((li) => flat(li.children, link)).join("; ")
      if (n.type === "code") return `\`${n.value}\``
      if (n.type === "blockquote") return flat(n.children, link)
      return ""
    })
    .filter(Boolean)
    .join(" ")
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[`*_[\]()]/g, "").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "")

/** Блоки документа и его H1. */
export function markdownToBlocks(md: string, link: LinkFn): { title: string; blocks: Block[] } {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(md) as Root
  let title = ""
  const blocks: Block[] = []
  for (const n of tree.children) {
    switch (n.type) {
      case "heading": {
        const text = phrasing(n.children, link)
        if (n.depth === 1 && !title) {
          title = text.replace(/[*_`]/g, "")
          break
        }
        const id = slugify(text)
        blocks.push(n.depth <= 2 ? { kind: "text-h2", text, id } : n.depth === 3 ? { kind: "text-h3", text, id } : { kind: "text-h4", text, id })
        break
      }
      case "paragraph":
        blocks.push({ kind: "text-p", text: phrasing(n.children, link) })
        break
      case "list":
        blocks.push({ kind: "text-list", ordered: !!n.ordered, items: n.children.map((li: ListItem) => flat(li.children, link)) })
        break
      case "blockquote":
        blocks.push({ kind: "text-quote", text: flat(n.children, link) })
        break
      case "code":
        blocks.push({ kind: "text-code", text: n.value })
        break
      case "table": {
        const [head, ...rows] = n.children.map((row) => row.children.map((cell) => phrasing(cell.children, link)))
        blocks.push({ kind: "text-table", head: head ?? [], rows, align: n.align ?? undefined })
        break
      }
      // thematicBreak, html, definition — у страницы своих разделителей достаточно; сырой HTML в блоки не переносится.
      default:
        break
    }
  }
  return { title, blocks }
}

/** Примерное время чтения: 200 слов в минуту, не меньше минуты. */
export function readingMinutes(md: string): number {
  return Math.max(1, Math.round(md.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length / 200))
}
