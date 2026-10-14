import { Code } from "lucide-react"
import s from "./landing-agent.module.css"
import { starField } from "./stars"

// НОВЫЙ ПЕРВЫЙ ЭКРАН ГЛАВНОЙ (узел, шаг 477). Владелец 2026-10-14: «создаём новый первый экран взамен того, который мы удалим …
// позиционирование по центру, бейдж становится в центр, под ним идёт заголовок, который растягивается на всю ширину экрана.
// Описание — просто надпись “Инфраструктура нулевого дня”. В качестве background те же самые звёзды, которые есть на вокзале,
// размер первого экрана определяется из размеров устройства и занимает всё пространство экрана за исключением высоты шапки.
// Вторым экраном становится вокзал». Бейдж — табличка «Open source» (H1, как прежде); надпись — заголовок секции «Инфраструктура
// нулевого дня» ссылкой к ней (`#zero-day`). Небо — цвет верха неба вокзала, поэтому граница с фасадом не видна.

const STARS = starField(150, 1600, 900, 11)

export function FirstScreen({ title, titleMark, plate, sub }: {
  title: string
  titleMark?: string
  plate?: string
  sub?: { text: string; href: string }
}) {
  // Страница без H1 не бывает: нет бейджа — H1 становится заголовок.
  const TitleTag = plate ? "p" : "h1"
  const at = titleMark ? title.indexOf(titleMark) : -1
  return (
    <section data-block="ozaic" className={s.cosmos}>
      <svg className={s.cosmosSky} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {STARS.map(([x, y, r, o]) => <circle key={`${x}-${y}`} className={s.fStar} cx={x} cy={y} r={r} opacity={o} />)}
      </svg>
      <div data-block="kr4sb" className={s.cosmosInner}>
        {plate && (
          // Эмалевая табличка вокзала: главные слова (в данных — между звёздочками) крупнее и основным шрифтом.
          <h1 data-block="s3148" className={`${s.plate} ${s.cosmosPlate}`}>
            <span className={s.plateMark} aria-hidden="true"><Code className="size-4" strokeWidth={2.5} /></span>
            <span className={s.plateText}>
              {plate.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <strong key={i} className={s.plateKey}>{part}</strong> : part))}
            </span>
          </h1>
        )}
        <TitleTag className={s.cosmosTitle}>
          {at >= 0 && titleMark ? (
            <>
              {title.slice(0, at)}
              <span className={s.titleMark}>{titleMark}</span>
              {title.slice(at + titleMark.length)}
            </>
          ) : title}
        </TitleTag>
        {sub && <a href={sub.href} className={s.cosmosSub}>{sub.text}</a>}
      </div>
    </section>
  )
}
