import { descriptionOf, docOf, titleOf } from '../../_libs/docs'
import { snippetResponse } from '@/lib/snippet/page-snippet'

// Сниппет документа (шаг узла 458-3): его заголовок и первый абзац; документ на языке страницы, нет его — английский.
export const revalidate = 300
export const dynamicParams = true
export function generateStaticParams() {
  return []
}
export async function GET(_req: Request, ctx: { params: Promise<{ lang: string; doc: string }> }) {
  const { lang, doc } = await ctx.params
  const found = docOf(lang, doc)
  if (!found) return new Response('Not found', { status: 404 })
  return snippetResponse(titleOf(found.doc.text), descriptionOf(found.doc.text))
}
