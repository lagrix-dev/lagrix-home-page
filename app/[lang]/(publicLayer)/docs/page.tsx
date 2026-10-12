import type { Metadata } from "next"
import { createContentPost } from "@/lib/content/create-content-post"
import { docsRootConfig } from "./_libs/post"
import { WIDGETS } from "./_widgets"
import { liveDocs } from "./_libs/docs"

// КОРЕНЬ ВЕТКИ /docs (шаг узла 457-2, вид — 458-5): README репозитория lagrix-dev/lagrix на языке страницы как пост блога
// (`createContentPost`, формат document) и под ним оглавление документов карточками (виджет ветки). Страница статическая;
// новая версия документов приходит пересборкой — `scripts/sync-lagrix-docs.mjs` в prebuild.
export const dynamic = "force-static"
// 458-9: документы читаются с GitHub на лету (liveDocs) — страница перерисовывается не реже раза в 5 минут, без пересборки.
export const revalidate = 300

const post = createContentPost(docsRootConfig((lang) => WIDGETS["widget-static-docs-list"](lang)))

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  await liveDocs()
  return post.generateMetadata({ params })
}

export default async function DocsHome({ params }: { params: Promise<{ lang: string }> }) {
  await liveDocs()
  return post.Page({ params })
}
