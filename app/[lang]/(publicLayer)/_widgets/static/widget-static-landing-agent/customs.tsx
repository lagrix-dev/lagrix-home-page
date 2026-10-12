import s from "./landing-agent.module.css"
import { CustomsHall } from "./customs-hall.client"

// ТАМОЖНЯ (шаг 467, владелец 2026-10-12): «эта секция должна иллюстрировать идею о том что наша архитектура lagrix … отвечает
// требованиям регуляторов» (формулировка на странице — «спроектирован, чтобы отвечать на вопросы регуляторов», выбор владельца).
// Комната того же вокзала, что «Зал ожидания»: табличка на цепочках — справа, слева тревожный фонарь «Внимание, идёт проверка»,
// под ними — конвейер через весь экран на ножках, стоящих на полу зала; в центре — ящик рентгена шириной с киоск справочного бюро,
// на его табло — вопрос регулятора (красный) и ответ Lagrix (зелёный). Ящик не сжимается — на узком экране срезаются края зала с
// чемоданами; на телефоне остаётся только ящик (как телевизор зала ожидания). Шапку рисует сервер; зал — островок
// `customs-hall.client.tsx` (467-3): его серверная разметка — неподвижная сцена, видимая без JavaScript. Цвета — роли макета.

type Words = { title: string; text: string; lamp: string; scene: string; question: string; answer: string; items: { q: string; a: string }[] }

function CustomsLamp({ label }: { label: string }) {
  return (
    <div data-block="cslmp" className={s.customsLamp}>
      <svg className={s.lampSvg} viewBox="0 0 120 120" aria-hidden="true">
        <circle className={s.lampGlow} cx={60} cy={58} r={52} />
        <path className={s.lampDome} d="M30 84 V58 Q30 26 60 26 Q90 26 90 58 V84 Z" />
        <path className={s.lampShine} d="M44 70 V58 Q44 42 56 38" />
        <path className={s.lampCage} d="M30 58 H90 M45 30 V84 M75 30 V84" />
        <rect className={s.lampBase} x={22} y={84} width={76} height={14} rx={3} />
        <rect className={s.lampBase} x={34} y={98} width={52} height={8} rx={2} />
      </svg>
      <p data-block="cslbl" className={s.lampLabel}>{label}</p>
    </div>
  )
}

export function Customs({ w }: { w: Words }) {
  return (
    <section data-block="cstm1" id="customs" className={s.customs}>
      <div data-block="cstm2" className={`${s.wrap} ${s.customsHead}`}>
        <CustomsLamp label={w.lamp} />
        {/* Табличка — та же, что у «Зала ожидания», только справа (владелец: «у таможни она будет находиться справа»). */}
        <div data-block="cssgn" className={`${s.waitingSign} ${s.customsSign}`}>
          <span className={s.gateRods} aria-hidden="true" />
          <div data-block="csplt" className={s.waitingPlate}>
            <h2 data-block="csttl" className={s.waitingTitle}>{w.title}</h2>
            <p data-block="cstxt" className={s.waitingText}>{w.text}</p>
          </div>
        </div>
      </div>
      <CustomsHall w={{ question: w.question, answer: w.answer, scene: w.scene, items: w.items }} />
    </section>
  )
}
