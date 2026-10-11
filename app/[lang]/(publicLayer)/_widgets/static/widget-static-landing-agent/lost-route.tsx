import s from "./landing-agent.module.css"

// «ПЕШИЙ МАРШРУТ» (секция «Fractera vs LLM»). Владелец 2026-09-30: чаты хороши на коротком маршруте, но части проекта из разных
// мест не связать — пути идут параллельно, сливаются в один и в момент слияния заходят в тупик. Квадрат 600×600, как карта справа,
// чтобы экраны были одной высоты. Неподвижна намеренно: движение секции — у магистрали справа. Рисует сервер.
// 2026-10-11 (владелец): три станции-домика Google, ChatGPT, Claude; за тупиком станция с флагом «AI Freedom»; у каждой станции
// свой агент с флагом — Google: Android «I'm in charge», ChatGPT: голубой человечек на двух ножках «Max dependency», Claude: крабик
// Claude Code «Burn the tokens». Станции разнесены на всю высоту квадрата, чтобы флаги не пересекали пути.
// Android нарисован своим силуэтом в духе талисмана Android (Google, CC BY 3.0 — атрибуция в README виджета).

const STATION_Y = [130, 300, 470]
const TRACKS = [
  "M174 130 H240 C320 130 300 300 380 300",
  "M174 300 H380",
  "M174 470 H240 C320 470 300 300 380 300",
]
const MERGED = "M380 300 H402"
// Разрушение после слияния: обломок, рельсы по одному, шпалы и щебень.
const BROKEN: { d: string; turn: number; cx: number; cy: number }[] = [{ d: "M406 301 H420", turn: 4, cx: 413, cy: 301 }]
const RAILS: [number, number, number, number][] = [
  [424, 296, 440, 293],
  [425, 306, 439, 312],
  [446, 295, 456, 280],
  [445, 317, 459, 328],
]
const LOOSE_TIES: { x: number; turn: number }[] = [
  { x: 426, turn: 12 },
  { x: 434, turn: -20 },
]
const DEBRIS: { x: number; y: number; w: number; turn: number }[] = [
  { x: 452, y: 304, w: 11, turn: 40 },
  { x: 462, y: 286, w: 9, turn: -60 },
  { x: 464, y: 322, w: 11, turn: 75 },
  { x: 416, y: 322, w: 8, turn: 20 },
]
const GRAVEL: [number, number, number][] = [
  [470, 308, 2.2],
  [458, 296, 1.8],
  [450, 336, 1.8],
]
// Ширина знака надписи флага (моноширинный 11px) и поля полотнища.
const CHAR = 7
const PAD = 26

function Track({ d, turn }: { d: string; turn?: { a: number; cx: number; cy: number } }) {
  return (
    <g transform={turn ? `rotate(${turn.a} ${turn.cx} ${turn.cy})` : undefined}>
      <path className={s.lostTies} d={d} />
      <path className={s.lostRail} d={d} />
      <path className={s.lostGauge} d={d} />
    </g>
  )
}

// Станция-домик: карточка с крышей. `w` — ширина стены, центр по `cx`.
function House({ cx, cy, w, name }: { cx: number; cy: number; w: number; name?: string }) {
  const x = cx - w / 2
  return (
    <g className={s.lostPlatform}>
      <path className={s.lostRoof} d={`M${x - 8} ${cy - 22} L${cx} ${cy - 50} L${x + w + 8} ${cy - 22} Z`} />
      <rect x={x} y={cy - 22} width={w} height={44} rx={3} />
      {name && <text x={cx} y={cy + 6} textAnchor="middle">{name}</text>}
    </g>
  )
}

// Флаг на древке: полотнище с ласточкиным хвостом уходит от древка влево или вправо, надпись на полотнище.
function Flag({ x, top, text, tone, side = "left" }: { x: number; top: number; text: string; tone: "red" | "go"; side?: "left" | "right" }) {
  const w = Math.round(text.length * CHAR + PAD)
  const k = side === "left" ? -1 : 1
  const tip = x + k * w
  return (
    <g className={tone === "red" ? s.lostFlagRed : s.lostFlagGo}>
      <path d={`M${x} ${top} H${tip} L${tip - k * 10} ${top + 13} L${tip} ${top + 26} H${x} Z`} />
      <text x={x + (k * w) / 2 - k * 4} y={top + 17} textAnchor="middle">{text}</text>
    </g>
  )
}

function Pole({ x, from, to }: { x: number; from: number; to: number }) {
  return <path className={s.lostPole} d={`M${x} ${from} V${to}`} />
}

// Крабик в духе знака Claude Code: квадратное тело, два глаза, клешни по бокам, четыре ножки.
function Crab({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <g className={s.lostCrab}>
        <rect x={x - 22} y={y - 30} width={44} height={24} />
        <rect x={x - 32} y={y - 24} width={10} height={10} />
        <rect x={x + 22} y={y - 24} width={10} height={10} />
        <rect x={x - 18} y={y - 6} width={5} height={8} />
        <rect x={x - 8} y={y - 6} width={5} height={8} />
        <rect x={x + 3} y={y - 6} width={5} height={8} />
        <rect x={x + 13} y={y - 6} width={5} height={8} />
      </g>
      <g className={s.lostEye}>
        <rect x={x - 11} y={y - 24} width={5} height={8} />
        <rect x={x + 6} y={y - 24} width={5} height={8} />
      </g>
    </g>
  )
}

// Голубой человечек ChatGPT: тот же квадратный род, что крабик, но выше и на двух ножках; руки опущены.
function Buddy({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <g className={s.lostBuddy}>
        <rect x={x - 18} y={y - 40} width={36} height={32} rx={3} />
        <rect x={x - 27} y={y - 32} width={9} height={16} />
        <rect x={x + 18} y={y - 32} width={9} height={16} />
        <rect x={x - 11} y={y - 8} width={7} height={10} />
        <rect x={x + 4} y={y - 8} width={7} height={10} />
      </g>
      <g className={s.lostEye}>
        <rect x={x - 9} y={y - 32} width={5} height={8} />
        <rect x={x + 4} y={y - 32} width={5} height={8} />
      </g>
    </g>
  )
}

// Android: полукруглая голова с двумя антеннами и глазами, туловище со скруглённым низом, руки и ноги-капсулы.
function Robot({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <g className={s.lostRobot}>
        <path d={`M${x - 16} ${y - 44} A16 16 0 0 1 ${x + 16} ${y - 44} Z`} />
        <path d={`M${x - 9} ${y - 58} L${x - 13} ${y - 65} M${x + 9} ${y - 58} L${x + 13} ${y - 65}`} className={s.lostRobotLine} />
        <path d={`M${x - 16} ${y - 41} H${x + 16} V${y - 16} Q${x + 16} ${y - 12} ${x + 12} ${y - 12} H${x - 12} Q${x - 16} ${y - 12} ${x - 16} ${y - 16} Z`} />
        <rect x={x - 25} y={y - 40} width={7} height={20} rx={3.5} />
        <rect x={x + 18} y={y - 40} width={7} height={20} rx={3.5} />
        <rect x={x - 10} y={y - 13} width={7} height={11} rx={3.5} />
        <rect x={x + 3} y={y - 13} width={7} height={11} rx={3.5} />
      </g>
      <g className={s.lostEye}>
        <circle cx={x - 7} cy={y - 50} r={2.2} />
        <circle cx={x + 7} cy={y - 50} r={2.2} />
      </g>
    </g>
  )
}

export function LostRoute({ stations, deadEnd, free, flags, label }: { stations: string[]; deadEnd: string; free?: string; flags?: string[]; label: string }) {
  const [gFlag, cFlag, kFlag] = flags ?? []
  return (
    <svg className={s.lost} viewBox="0 0 600 600" role="img" aria-label={label}>
      {TRACKS.slice(0, stations.length).map((d) => <Track key={d} d={d} />)}
      {stations.slice(0, STATION_Y.length).map((name, i) => <House key={name} cx={99} cy={STATION_Y[i]} w={150} name={name} />)}
      <Track d={MERGED} />
      {BROKEN.map((b) => <Track key={b.d} d={b.d} turn={{ a: b.turn, cx: b.cx, cy: b.cy }} />)}
      <g className={s.lostLooseTies}>
        {LOOSE_TIES.map((t) => <rect key={t.x} x={t.x} y={290} width={5} height={24} transform={`rotate(${t.turn} ${t.x + 2.5} 302)`} />)}
      </g>
      <g className={s.lostBrokenRail}>
        {RAILS.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
      </g>
      <g className={s.lostDebris}>
        {DEBRIS.map((t) => (
          <rect key={`${t.x}-${t.y}`} x={t.x} y={t.y} width={t.w} height={5} transform={`rotate(${t.turn} ${t.x + t.w / 2} ${t.y + 2.5})`} />
        ))}
        {GRAVEL.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
      </g>
      <g className={s.lostStop}>
        <rect x={482} y={278} width={8} height={44} />
        <rect x={508} y={278} width={8} height={44} />
        <rect x={476} y={286} width={46} height={12} />
        <text x={499} y={352} textAnchor="middle">{deadEnd}</text>
      </g>
      {free && (
        <g>
          <House cx={552} cy={300} w={76} />
          <Pole x={552} from={250} to={172} />
          <Flag x={552} top={172} text={free} tone="go" />
        </g>
      )}
      {/* Агенты станций стоят на прямом участке своего пути; флаги — там, где нет путей. */}
      {gFlag && (
        <g>
          <Robot x={210} y={124} />
          <Pole x={237} from={98} to={34} />
          <Flag x={237} top={34} text={gFlag} tone="red" side="right" />
        </g>
      )}
      {cFlag && (
        <g>
          <Buddy x={210} y={294} />
          <Pole x={237} from={262} to={196} />
          <Flag x={237} top={196} text={cFlag} tone="red" />
        </g>
      )}
      {kFlag && (
        <g>
          <Crab x={212} y={464} />
          <Pole x={239} from={444} to={366} />
          <Flag x={239} top={366} text={kFlag} tone="red" />
        </g>
      )}
    </svg>
  )
}
