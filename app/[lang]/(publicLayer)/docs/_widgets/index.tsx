import type { ReactNode } from "react"
import { DocPage } from "./static/widget-static-docs-reader"
import { readme } from "../_libs/docs"

// Виджеты ветки /docs (node step 457): один — список документов и документ в виде GitHub.
export const WIDGETS: Record<string, (lang: string) => ReactNode> = {
  "widget-static-docs-reader": (lang) => <DocPage lang={lang} subPath="/docs" md={readme()} />,
}
