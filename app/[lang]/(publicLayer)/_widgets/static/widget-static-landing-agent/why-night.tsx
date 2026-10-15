import s from "./landing-agent.module.css"
import { WhyStage } from "./why-ride.client"

// «А ПОЧЕМУ ВСЁ-ТАКИ LAGRIX?» — НОЧНОЙ ГОРОД И ПАРОВОЗИК (шаг 470, владелец 2026-10-13): «этот блок стал выше на заднем фоне
// появились силуэты небоскрёбов в центре висела бы надпись тот самый заголовок а потом слева направо выезжал бы паровозик …
// больше похожий на детский мультфильм, но сам паровозик однотонный также как и силуэты домов как будто мы смотрим на него в ночи
// у паровозиков фонарь он освещает жёлтым цветом впереди себя дорогу … флаг … $LGX … вагончики разной ширины у этих вагончиков
// есть окошки в пространстве между окошками и низом вагончика едут слова по одному слову в каждом вагончике … одни вагончики
// будут иметь одно окошко другие … два … одни … на одном колесе другие на двух … ровно столько вагончиков сколько слов».
// И уточнение того же дня: «слова в вагончике определяют его размер … шрифт будет такого же размера как текст в заголовках
// второго уровня» — шрифт поезда = `.waitingTitle`, вагон меряется своим словом.
// Сервер рисует ночь и поезд; табличку-кнопку, рельсы и ход ведёт островок `why-ride.client.tsx` (470-2…470-4). Без нажатия поезда нет;
// ответ текстом — только для чтения с экрана и поиска (470-4: «тексты быть не должно»).
// Мир вокзала ночью: небо — табло, город и поезд — один тон каждый, свет — только жёлтый (`--poster`): луч фонаря и окошки.

type Words = { question: string; answer: string }

// Слова ответа по вагонам: знак препинания без букв («—») едет в вагоне предыдущего слова — вагонов столько, сколько слов.
export function wagonWords(answer: string): string[] {
  const out: string[] = []
  for (const t of answer.split(/\s+/).filter(Boolean)) {
    if (!/[\p{L}\p{N}]/u.test(t) && out.length) out[out.length - 1] += ` ${t}`
    else out.push(t)
  }
  return out
}

// Силуэты небоскрёбов: постоянный рисунок (ширина, высота, шпиль), а не случайность — сцена одинакова при каждой сборке.
const CITY: [number, number, number][] = [
  [70, 150, 0], [48, 210, 0], [90, 120, 0], [56, 270, 34], [80, 190, 0], [44, 140, 0], [96, 230, 0], [52, 300, 46],
  [74, 170, 0], [60, 250, 0], [88, 130, 0], [50, 205, 0], [70, 285, 28], [92, 160, 0], [46, 225, 0], [84, 140, 0],
  [58, 260, 40], [78, 180, 0], [64, 120, 0], [54, 240, 0], [96, 200, 0], [48, 295, 36], [82, 150, 0], [60, 215, 0],
]

function City() {
  const rects: { x: number; w: number; h: number; spire: number }[] = []
  let x = 0
  for (let i = 0; x < 1600; i++) {
    const [w, h, spire] = CITY[i % CITY.length]
    rects.push({ x, w, h, spire })
    x += w + 6
  }
  return (
    <svg className={s.whyCity} viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {rects.map((r) => (
        <g key={r.x}>
          <rect x={r.x} y={360 - r.h} width={r.w} height={r.h} />
          {r.spire > 0 && <rect x={r.x + r.w / 2 - 2} y={360 - r.h - r.spire} width={4} height={r.spire} />}
        </g>
      ))}
    </svg>
  )
}

// Паровозик смотрит влево — едет справа налево (470-4, владелец: «поезд должен ехать в обратную сторону»): фонарь и путеочиститель
// слева, будка справа. Геометрия отражена по координатам (x' = 210 − x), а не трансформом — надпись флага читается прямо.
// Однотонный (`currentColor`), светятся только окно будки и фонарь; флаг «Lagrix» — на шесте над будкой.
function Locomotive() {
  return (
    <span className={s.whyLoco}>
      <svg viewBox="0 0 210 180" aria-hidden="true">
        <line className={s.whyPole} x1={192} y1={52} x2={192} y2={4} />
        <rect className={s.whyFlag} x={128} y={4} width={64} height={28} rx={2} />
        <text className={s.whyFlagText} x={160} y={24.5} textAnchor="middle">Lagrix</text>
        <rect x={130} y={52} width={74} height={12} rx={4} />
        <rect x={136} y={60} width={62} height={70} rx={6} />
        <rect className={s.whyLit} x={152} y={74} width={32} height={26} rx={4} />
        <rect x={32} y={92} width={108} height={46} rx={23} />
        <circle cx={102} cy={92} r={13} />
        <rect x={50} y={64} width={20} height={34} />
        <path d="M40 66 h40 l-8 -16 h-24 z" />
        <rect className={s.whyLit} x={18} y={98} width={16} height={16} rx={3} />
        <path d="M12 134 h30 l6 24 h-46 z" />
        <rect x={30} y={134} width={168} height={8} rx={2} />
        <g className={s.whyWheel} data-size="big" style={{ transformOrigin: "166px 156px" }}>
          <circle cx={166} cy={156} r={24} />
          <path className={s.whySpoke} d="M166 136 V176 M146 156 H186 M180 142 L152 170 M152 142 L180 170" />
        </g>
        <g className={s.whyWheel} style={{ transformOrigin: "102px 164px" }}>
          <circle cx={102} cy={164} r={16} />
          <path className={s.whySpoke} d="M102 151 V177 M89 164 H115" />
        </g>
        <g className={s.whyWheel} style={{ transformOrigin: "62px 164px" }}>
          <circle cx={62} cy={164} r={16} />
          <path className={s.whySpoke} d="M62 151 V177 M49 164 H75" />
        </g>
      </svg>
      {/* Луч фонаря — вперёд по ходу, на дорогу. */}
      <span className={s.whyBeam} aria-hidden="true" />
    </span>
  )
}

// Вагончик меряется словом; окошки заполняют его ширину (CSS, 470-4: «рассчитай ширину и сделать больше окошек») — столько
// целых окошек с тем же шагом, сколько помещается; короткий вагон — на одном колесе.
function Wagon({ word }: { word: string }) {
  const letters = Array.from(word.replace(/[^\p{L}\p{N}]/gu, "")).length
  const wheels = letters > 3 ? 2 : 1
  return (
    <span className={s.wagon} data-wheels={wheels}>
      <span className={s.wagonWindows} />
      <span className={s.wagonWord}>{word}</span>
      <span className={s.wagonWheels}>{Array.from({ length: wheels }, (_, i) => <span key={i} className={s.wagonWheel}><span className={s.wagonSpoke} /></span>)}</span>
    </span>
  )
}

// Поезд целиком: паровоз первым и слева, за ним слова по порядку — состав читается слева направо (470-4).
export function WhyTrain({ answer }: { answer: string }) {
  return (
    <span className={s.whyTrain} aria-hidden="true">
      <Locomotive />
      {wagonWords(answer).map((w, i) => <Wagon key={i} word={w} />)}
    </span>
  )
}

export function WhyNight({ w }: { w: Words }) {
  return (
    <section data-block="wy470" className={s.whyNight}>
      <City />
      {/* 470-3: табличка — кнопка; путь и поезд появляются только после нажатия (островок). */}
      <WhyStage question={w.question} answer={w.answer}>
        <WhyTrain answer={w.answer} />
      </WhyStage>
    </section>
  )
}
