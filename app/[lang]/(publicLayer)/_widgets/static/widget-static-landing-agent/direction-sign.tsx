import { ArrowDown, Footprints, Signpost } from "lucide-react"
import s from "./landing-agent.module.css"
import type { LandingExtra } from "./words"

// ЖЁЛТАЯ ВЫВЕСКА «КУДА ДВИГАТЬСЯ» ПОД ТАБЛО (узел, шаг 477). Владелец 2026-10-14: «второй экран — табло … под табло сделаем жёлтую
// вывеску куда двигаться, третьим экраном будет справочная служба» и «мы предлагаем людям не слоган … а движение в эту сторону».
// Анатомия — указатель к гейтам в аэропорту, как табличка к чату на вывеске станции: две цепочки, жёлтое поле, маршруты (две
// миссии), вопрос и ответ, время пути и стрелка. Вывеска — ссылка в справочную службу (`#help-desk`), что стоит сразу под ней.
// Под вывеской — объявление движения и строка о доверии без посредника. Слова — `landing.direction` данных главной.

type Direction = NonNullable<LandingExtra["direction"]>

export function DirectionSign({ w }: { w: Direction }) {
  return (
    <section data-block="iqccn" className={s.direction}>
      <div data-block="iy47g" className={s.wrap}>
        <a href="#help-desk" className={s.dirSign} title={w.label}>
          <span className={s.gateRods} aria-hidden="true" />
          <span className={s.dirBar}>
            <span className={s.gateRoutes}>
              <span className={s.gateIcon} aria-hidden="true"><Signpost className="size-5" strokeWidth={2.4} /></span>
              {w.routes.map((r) => <span key={r} className={s.gateRoute}>{r}</span>)}
            </span>
            <span className={s.dirExit}>
              <span className={s.gateWords}>
                <span className={s.gateAsk}>{w.ask}</span>
                <span className={s.dirAnswer}>{w.answer}</span>
                <span className={s.dirAnswerMobile}>{w.answerMobile}</span>
              </span>
              <span className={s.gateTime}><Footprints className="size-4" aria-hidden="true" />{w.walk}</span>
              <span className={s.gateArrow} aria-hidden="true"><ArrowDown strokeWidth={3} /></span>
            </span>
          </span>
        </a>
        <p data-block="f5p5k" className={s.dirText}>{w.text}</p>
        <p data-block="q708i" className={s.dirLine}>{w.line}</p>
      </div>
    </section>
  )
}
