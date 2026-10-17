import { surfaceFor } from './surfaces'
import { INDEXED_LANGUAGES, SUPPORTED_LANGUAGES } from '@/config/translations/translations.config'
import { urlFor } from '@/lib/seo/alternates'

/**
 * Заголовки КАЖДОЙ копии Markdown (507-3): тип и канонический адрес — страница, копией которой она является. Для не-HTML Google
 * берёт канонический адрес из заголовка `Link: <…>; rel="canonical"` (developers.google.com/search/docs/crawling-indexing/
 * consolidate-duplicate-urls); без него копия — второй адрес того же текста. Одна функция на все маршруты копий: дети и
 * главная (`markdownRoute`), `/docs` и каждый документ — правило в одном месте, а не в трёх из четырёх.
 * Язык, закрытый для поиска, получает `X-Robots-Tag: noindex` (владелец 2026-10-17: «проверь что только Английский язык открыт для
 * индексации»): у копии нет `<meta name="robots">`, и без заголовка она оставалась единственной открытой дверью закрытого языка —
 * канонический адрес лишь подсказка. Источник Google: «You can use the X-Robots-Tag for non-HTML files» (developers.google.com/search/docs/crawling-indexing/
 * robots-meta-tag, прочитано 2026-10-17).
 */
export function markdownHeaders(lang: string, subPath: string): HeadersInit {
  const h: Record<string, string> = { 'Content-Type': 'text/markdown; charset=utf-8', Link: `<${urlFor(lang, subPath)}>; rel="canonical"` }
  if (!INDEXED_LANGUAGES.includes(lang)) h['X-Robots-Tag'] = 'noindex'
  return h
}

// Общая начинка markdown-маршрута (шаг 505).
//
// Спецификация llmstxt.org просит, чтобы у страницы была markdown-версия: к
// адресу добавляется `.md`, а для адреса-каталога — `index.md`. Мы используем
// вторую форму для всех страниц разом: `/<язык>/blog/index.md`. Она работает
// везде одинаково и не требует сегментов с точкой внутри динамических частей.
//
// 🔒 ЭТИ АДРЕСА НЕ ПРОХОДЯТ ЧЕРЕЗ `proxy.ts`. Его матчер исключает всё, где есть
// точка (`.*\..*`), — то же исключение, по которому работает `/llms.txt`. Значит
// языковой маршрутизатор их не трогает и переписывать ничего не нужно.
//
// Маршрут на поверхность — три строки; вся логика здесь. Тонкий файл на каждую
// страницу нужен потому, что Next не допускает динамический перехват рядом с
// существующими страницами: `page.tsx` и общий `route.ts` на одном сегменте
// конфликтуют.

// 🔒 ЗНАЧЕНИЯ СЕГМЕНТА ЗДЕСЬ НЕ ЖИВУТ. Next разбирает `dynamic` и `dynamicParams`
// СТАТИЧЕСКИ, до выполнения кода, и переэкспорт из объекта не понимает — сборка
// падает с «needs to be a static boolean». Поэтому каждый маршрут объявляет их
// литералами у себя, а отсюда берёт только функции: их переэкспортировать можно.
export function markdownRoute(subPath: string) {
  return {
    generateStaticParams() {
      return SUPPORTED_LANGUAGES.map(lang => ({ lang }))
    },
    async GET(_req: Request, ctx: { params: Promise<{ lang: string }> }) {
      const { lang } = await ctx.params
      const surface = surfaceFor(lang, subPath)
      if (!surface) return new Response('Not found', { status: 404 })
      return new Response(surface.body(), {
        // `text/markdown` — тип, о котором просит спецификация: агент должен
        // понять формат до разбора, а не по содержимому.
        headers: markdownHeaders(lang, subPath),
      })
    },
  }
}
