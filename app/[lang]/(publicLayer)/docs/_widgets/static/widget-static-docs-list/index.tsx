import Link from "next/link"
import { Cards } from "@/components/blocks/block-cards"
import { Card } from "@/components/blocks/block-card"
import { H3, P } from "@/components/ui/typography"
import { snippetPath } from "@/lib/snippet/page-snippet"
import { descriptionOf, docsFor, titleOf } from "../../../_libs/docs"
import { docsWords } from "../../../_libs/post"

// ОГЛАВЛЕНИЕ ДОКУМЕНТАЦИИ (шаг узла 458-5): под README корня /docs — карточки документов, как оглавление блога: обложка
// (сниппет документа), заголовок, первый абзац. Секция и карточки — блоки `cards` и `card` из «Блоков»; виджет только
// раскладывает в них данные ветки. Порядок — порядок файлов репозитория (номер документа).
export function DocsList({ lang }: { lang: string }) {
  const w = docsWords(lang)
  return (
    <div data-block="dl458">
      <Cards blockKey="docs-list" title={w.list} note={w.listNote} cols={3}>
        {docsFor(lang).map((d) => {
          const href = `/${lang}/docs/${d.slug}`
          const title = titleOf(d.text)
          return (
            <Card data-block="yyzpb" key={d.slug}>
              <Link href={href} className="group flex flex-col gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- сниппет рисует маршрут при первом запросе, next/image ему не нужен */}
                <img src={snippetPath(`/docs/${d.slug}`).replace("{lang}", lang)} alt={title} width={1200} height={630} loading="lazy" decoding="async" className="aspect-[1200/630] w-full rounded-xl border border-border object-cover" />
                <H3 data-block="n1mgu" className="mt-2 group-hover:text-primary">{title}</H3>
                <P data-block="icwmf" className="line-clamp-3 text-muted-foreground">{descriptionOf(d.text)}</P>
              </Link>
            </Card>
          )
        })}
      </Cards>
    </div>
  )
}
