import { markdown as docsList } from "./static/widget-static-docs-list/markdown"

// Реестр текста виджетов ветки /docs для машин (пара к index.tsx, шаг узла 458-5).
export const WIDGET_MARKDOWN: Record<string, (lang: string) => string> = {
  "widget-static-docs-list": docsList,
}
