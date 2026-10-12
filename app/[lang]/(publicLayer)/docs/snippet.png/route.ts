import { descriptionOf, readme, titleOf } from '../_libs/docs'
import { snippetResponse } from '@/lib/snippet/page-snippet'

// Сниппет корня документации (шаг узла 458-3): заголовок и первый абзац README языка страницы.
export const revalidate = 300
export const dynamicParams = true
export function generateStaticParams() {
  return []
}
export async function GET(_req: Request, ctx: { params: Promise<{ lang: string }> }) {
  const { lang } = await ctx.params
  const md = readme(lang)
  return snippetResponse(titleOf(md), descriptionOf(md))
}
