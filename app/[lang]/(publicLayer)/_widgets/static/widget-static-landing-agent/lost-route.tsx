import s from "./landing-agent.module.css"

// «ПЕШИЙ МАРШРУТ» (секция «Fractera vs LLM»). Владелец 2026-09-30: чаты хороши на коротком маршруте, но части проекта из разных
// мест не связать — пути идут параллельно, сливаются в один и в момент слияния заходят в тупик. Квадрат 600×600, как карта справа,
// чтобы экраны были одной высоты. Неподвижна намеренно: движение секции — у магистрали справа. Рисует сервер.
// Перерисовка владельца 2026-10-11: «три железных дороги расположены друг под другом … отправление идёт от станции: Google, ChatGPT,
// Claude … оформи его в виде небольшой карточки символизирующей домик … справа нарисовать ещё один домик железнодорожную станцию на
// которой стоит флаг: Free AI … по железной дороге от станции Claude нарисуй крабика который напоминает символику Claude code …
// флажок и на этом флажке написано Burn the tokens». Сноски продуктов Claude сняты тем же словом.

// Три станции слева, пути сходятся у x=350, y=232 — в той же точке, что и прежде.
const STATION_Y = [112, 232, 392]
const TRACKS = [
  "M174 112 H210 C290 112 260 232 350 232",
  "M174 232 H350",
  "M174 392 H240 C310 392 270 232 350 232",
]
const MERGED = "M350 232 H372"
// Разрушение после слияния сжато, чтобы справа уместилась станция «Free AI»: обломок, рельсы по одному, шпалы и щебень.
const BROKEN: { d: string; turn: number; cx: number; cy: number }[] = [{ d: "M376 233 H390", turn: 4, cx: 383, cy: 233 }]
const RAILS: [number, number, number, number][] = [
  [394, 228, 410, 225],
  [395, 238, 409, 244],
  [416, 227, 426, 212],
  [415, 249, 429, 260],
]
const LOOSE_TIES: { x: number; turn: number }[] = [
  { x: 396, turn: 12 },
  { x: 404, turn: -20 },
]
const DEBRIS: { x: number; y: number; w: number; turn: number }[] = [
  { x: 422, y: 236, w: 11, turn: 40 },
  { x: 432, y: 218, w: 9, turn: -60 },
  { x: 434, y: 254, w: 11, turn: 75 },
  { x: 386, y: 254, w: 8, turn: 20 },
]
const GRAVEL: [number, number, number][] = [
  [440, 240, 2.2],
  [428, 228, 1.8],
  [420, 268, 1.8],
]

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

// Флаг на древке: полотнище с вырезом-ласточкиным хвостом уходит от древка влево, надпись на полотнище.
function Flag({ x, top, text, tone }: { x: number; top: number; text: string; tone: "red" | "go" }) {
  const w = Math.round(text.length * 8.6 + 26)
  return (
    <g className={tone === "red" ? s.lostFlagRed : s.lostFlagGo}>
      <path d={`M${x} ${top} H${x - w} L${x - w + 10} ${top + 13} L${x - w} ${top + 26} H${x} Z`} />
      <text x={x - w / 2 + 5} y={top + 18} textAnchor="middle">{text}</text>
    </g>
  )
}

// Крабик в духе знака Claude Code: квадратное тело, два глаза, клешни по бокам, четыре ножки; стоит на пути и держит флажок.
function Crab({ x, y, flag }: { x: number; y: number; flag: string }) {
  return (
    <g>
      <path className={s.lostPole} d={`M${x + 27} ${y - 20} V${y - 100}`} />
      <Flag x={x + 27} top={y - 100} text={flag} tone="red" />
      <g className={s.lostCrab}>
        <rect x={x - 22} y={y - 30} width={44} height={24} />
        <rect x={x - 32} y={y - 24} width={10} height={10} />
        <rect x={x + 22} y={y - 24} width={10} height={10} />
        <rect x={x - 18} y={y - 6} width={5} height={8} />
        <rect x={x - 8} y={y - 6} width={5} height={8} />
        <rect x={x + 3} y={y - 6} width={5} height={8} />
        <rect x={x + 13} y={y - 6} width={5} height={8} />
      </g>
      <g className={s.lostCrabEye}>
        <rect x={x - 11} y={y - 24} width={5} height={8} />
        <rect x={x + 6} y={y - 24} width={5} height={8} />
      </g>
    </g>
  )
}

export function LostRoute({ stations, deadEnd, free, flag, label }: { stations: string[]; deadEnd: string; free?: string; flag?: string; label: string }) {
  return (
    <svg className={s.lost} viewBox="0 0 600 600" role="img" aria-label={label}>
      {TRACKS.slice(0, stations.length).map((d) => <Track key={d} d={d} />)}
      {stations.slice(0, STATION_Y.length).map((name, i) => <House key={name} cx={99} cy={STATION_Y[i]} w={150} name={name} />)}
      <Track d={MERGED} />
      {BROKEN.map((b) => <Track key={b.d} d={b.d} turn={{ a: b.turn, cx: b.cx, cy: b.cy }} />)}
      <g className={s.lostLooseTies}>
        {LOOSE_TIES.map((t) => <rect key={t.x} x={t.x} y={222} width={5} height={24} transform={`rotate(${t.turn} ${t.x + 2.5} 234)`} />)}
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
        <rect x={452} y={210} width={8} height={44} />
        <rect x={478} y={210} width={8} height={44} />
        <rect x={446} y={218} width={46} height={12} />
        <text x={469} y={284} textAnchor="middle">{deadEnd}</text>
      </g>
      {free && (
        <g>
          <House cx={550} cy={232} w={80} />
          <path className={s.lostPole} d="M550 182 V104" />
          <Flag x={550} top={104} text={free} tone="go" />
        </g>
      )}
      {flag && stations.length >= 3 && <Crab x={212} y={384} flag={flag} />}
    </svg>
  )
}
