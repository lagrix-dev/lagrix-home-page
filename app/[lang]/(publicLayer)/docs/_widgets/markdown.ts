import { markdown as docsReader } from "./static/widget-static-docs-reader/markdown"

// Реестр текста виджетов ветки /docs для машин (пара к index.tsx, node step 457-3).
export const WIDGET_MARKDOWN: Record<string, (lang: string) => string> = {
  "widget-static-docs-reader": docsReader,
}
