import type { ReactNode } from "react"
import { DocsList } from "./static/widget-static-docs-list"

// Виджеты ветки /docs (шаг узла 458-5): оглавление документов под README корня. 🪦 widget-static-docs-reader (вид GitHub,
// шаг 457) удалён: документы рисует фабрика постов — владелец 2026-10-12: «документы в стиле и дизайне от блога».
export const WIDGETS: Record<string, (lang: string) => ReactNode> = {
  "widget-static-docs-list": (lang) => <DocsList lang={lang} />,
}
