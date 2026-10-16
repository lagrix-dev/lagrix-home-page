import type { Block } from '@/lib/content/blocks/types'

// НУМЕРАЦИЯ ЗАГОЛОВКОВ СТАТЬИ (владелец 2026-10-16: «используй нумерацию, позволяющую видеть заголовки второго, третьего и
// четвёртого уровня»). H2 — «1.», H3 — «1.1.», H4 — «1.1.1.». Номера ПОРОЖДАЮТСЯ здесь, а не пишутся в данных: рукописный номер
// расходится с порядком молча. Одна функция на страницу, её оглавление и её копию Markdown — номера везде одинаковые.
// Заголовок, уже начинающийся с номера («17.1 …»), не трогается: его пронумеровал автор документа.

const NUMBERED = /^\d+(\.\d+)*\.?\s/

export function numberHeadings(blocks: Block[]): Block[] {
  if (blocks.some((b) => (b.kind === 'text-h2' || b.kind === 'text-h3') && NUMBERED.test(String((b as { text?: string }).text ?? '')))) return blocks
  let h2 = 0, h3 = 0, h4 = 0
  return blocks.map((b) => {
    const text = (b as { text?: string }).text
    if (typeof text !== 'string') return b
    if (b.kind === 'text-h2') { h2 += 1; h3 = 0; h4 = 0; return { ...b, text: `${h2}. ${text}` } as Block }
    if (b.kind === 'text-h3' && h2) { h3 += 1; h4 = 0; return { ...b, text: `${h2}.${h3}. ${text}` } as Block }
    if (b.kind === 'text-h4' && h2 && h3) { h4 += 1; return { ...b, text: `${h2}.${h3}.${h4}. ${text}` } as Block }
    return b
  })
}
