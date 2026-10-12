import s from "./landing-agent.module.css"

// ТАМОЖНЯ (шаг 467, владелец 2026-10-12): «эта секция должна иллюстрировать идею о том что наша архитектура lagrix … отвечает
// требованиям регуляторов» (формулировка на странице — «спроектирован, чтобы отвечать на вопросы регуляторов», выбор владельца).
// Комната того же вокзала, что «Зал ожидания»: табличка на цепочках — справа, слева тревожный фонарь «Внимание, идёт проверка»,
// под ними — конвейер через весь экран на ножках, стоящих на полу зала; в центре — ящик рентгена шириной с киоск справочного бюро,
// на его табло — вопрос регулятора (красный) и ответ Lagrix (зелёный). Ящик не сжимается — на узком экране срезаются края зала с
// чемоданами; на телефоне остаётся только ящик (как телевизор зала ожидания). Неподвижная сцена — серверная разметка (видна без
// JavaScript, на табло первая пара в конечном состоянии «ответ»); движение — островок шага 467-3. Цвета — роли макета.

type Words = { title: string; text: string; lamp: string; scene: string; question: string; answer: string; items: { q: string; a: string }[] }

// Чемоданы стоят на ленте до оживления: смещение от центра зала в rem и цвет. Слева — те, что ждут досмотра, справа — прошедшие.
const BAGS: { x: number; tone: "poster" | "signal" | "board" | "chalk"; w: number }[] = [
  { x: -52, tone: "board", w: 6.2 },
  { x: -41, tone: "signal", w: 5 },
  { x: -31, tone: "poster", w: 6.6 },
  { x: 25, tone: "chalk", w: 5.4 },
  { x: 35, tone: "signal", w: 6 },
  { x: 46, tone: "poster", w: 5.2 },
]

export function Suitcase({ tone, className, style }: { tone: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} data-tone={tone} viewBox="0 0 100 86" aria-hidden="true">
      <path className={s.bagHandle} d="M36 18 V9 Q36 4 41 4 H59 Q64 4 64 9 V18" />
      <rect className={s.bagBody} x={4} y={16} width={92} height={60} rx={9} />
      <path className={s.bagStrap} d="M28 16 V76 M72 16 V76" />
      <path className={s.bagSeam} d="M4 44 H96" />
      <rect className={s.bagFoot} x={14} y={76} width={10} height={8} rx={2} />
      <rect className={s.bagFoot} x={76} y={76} width={10} height={8} rx={2} />
    </svg>
  )
}

export function CustomsLamp({ label }: { label: string }) {
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

// Табло ящика: два контейнера столбиком — вопрос и ответ. `phase` = "answer" — вопрос приглушён, ответ горит (конечное состояние
// досмотра; так табло видно без JavaScript), "question" — горит вопрос, ответа нет, "off" — табло погашено.
export function XrayDisplay({ w, index = 0, phase = "answer" }: { w: Words; index?: number; phase?: "off" | "question" | "answer" }) {
  const it = w.items[index] ?? w.items[0]
  return (
    <div data-block="csdsp" className={s.xrDisplay} data-phase={phase} aria-live="polite">
      <div data-block="csdq1" className={s.xrRow} data-tone="q">
        <span className={s.xrLamp} aria-hidden="true" />
        <div data-block="csdq2" className={s.xrBody}>
          <p data-block="ji7cj" className={s.xrLabel}>{w.question}</p>
          <p data-block="ik3se" className={s.xrText}>{it?.q}</p>
        </div>
      </div>
      <div data-block="csda1" className={s.xrRow} data-tone="a">
        <span className={s.xrLamp} aria-hidden="true" />
        <div data-block="csda2" className={s.xrBody}>
          <p data-block="w3b9o" className={s.xrLabel}>{w.answer}</p>
          <p data-block="ojl0c" className={s.xrText}>{it?.a}</p>
        </div>
      </div>
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
      <div data-block="cshal" className={s.customsHall}>
        <span className={s.srOnly}>{w.scene}</span>
        <div data-block="qke3r" className={s.hallFloor} aria-hidden="true" />
        <div data-block="x8dqh" className={s.beltLegs} aria-hidden="true" />
        <div data-block="qqbf1" className={s.belt} aria-hidden="true" />
        <div data-block="csbag" className={s.bags} aria-hidden="true">
          {BAGS.map((b, i) => (
            <Suitcase key={i} tone={b.tone} className={s.bag} style={{ "--x": `${b.x}rem`, "--w": `${b.w}rem` } as React.CSSProperties} />
          ))}
        </div>
        <div data-block="csbox" className={s.xray}>
          <span className={`${s.xrHood} ${s.xrHoodL}`} aria-hidden="true" />
          <span className={`${s.xrHood} ${s.xrHoodR}`} aria-hidden="true" />
          <XrayDisplay w={w} />
          <div data-block="i4zhg" className={s.xrTunnel} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
