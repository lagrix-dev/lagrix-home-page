import s from "./landing-agent.module.css"
import { starField } from "./stars"

// КАРТИНА ФИНАЛЬНОЙ СЕКЦИИ (узел, шаг 477). Владелец 2026-10-14 о прежней картинке (`/images/landing/agi-journey.jpg`): «изображение по
// всем смысловым характеристикам очень сильно правильное, но мы используем другой стиль». Смысл тот же — станция ИИ-агентов, сервисов
// и маршрутов в космосе, соединённых светящимися линиями: кольцевая станция с куполом, модули, маршруты, корабли, планета. Стиль —
// вокзала: плоский вид спереди вместо объёмной изометрии, вектор вместо живописи, цвета только из ролей (небо табло, мел, свет —
// жёлтый постер, маршруты — постер, «прибытие» и кольцо пересадок вместо неонового бирюзового и фиолетового). Те же звёзды, что на
// первом экране и над вокзалом. Корабли движутся по маршрутам (SVG), при «уменьшить движение» их нет.

const STARS = starField(110, 1280, 714, 23)

const MODULES: [number, number][] = [[120, 140], [300, 70], [200, 470], [420, 600], [1110, 600], [1170, 290]]
// Маршрут: от модуля к стыковочному узлу кольца; цвет — роль.
const ROUTES: { d: string; tone: "poster" | "go" | "ring" }[] = [
  { d: "M 196 172 C 360 190, 420 330, 552 352", tone: "poster" },
  { d: "M 376 102 C 520 120, 640 200, 784 268", tone: "go" },
  { d: "M 276 500 C 400 470, 470 400, 552 372", tone: "ring" },
  { d: "M 496 630 C 620 600, 700 500, 784 448", tone: "poster" },
  { d: "M 1110 630 C 1000 600, 900 520, 816 448", tone: "go" },
  { d: "M 1170 320 C 1110 330, 1080 352, 1048 356", tone: "poster" },
]
const SHIPS = [0, 3, 4]

export function ClosingArt({ label }: { label?: string }) {
  return (
    <svg className={s.cArt} viewBox="0 0 1280 714" preserveAspectRatio="xMaxYMid slice" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {STARS.map(([x, y, r, o]) => <circle key={`${x}-${y}`} className={s.fStar} cx={x} cy={y} r={r} opacity={o} />)}
      <circle className={s.fPlanet} cx={1180} cy={70} r={120} />
      <ellipse className={s.fPlanetRing} cx={1180} cy={70} rx={210} ry={34} transform="rotate(-16 1180 70)" />

      {/* Маршруты: широкая подложка и яркая линия. */}
      {ROUTES.map((r, i) => (
        <g key={i} className={s.cRoute} data-tone={r.tone}>
          <path className={s.cRouteGlow} d={r.d} />
          <path className={s.cRouteLine} d={r.d} />
        </g>
      ))}

      {/* Модули — агенты и сервисы: корпус, два окна, антенна. */}
      {MODULES.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line className={s.cAntenna} x1={x + 38} y1={y} x2={x + 38} y2={y - 22} />
          <circle className={s.fBeacon} cx={x + 38} cy={y - 24} r={4} />
          <rect className={s.cModule} x={x} y={y} width={76} height={64} rx={6} />
          <rect className={s.cWindow} x={x + 12} y={y + 16} width={20} height={14} rx={2} />
          <rect className={s.cWindow} x={x + 44} y={y + 16} width={20} height={14} rx={2} />
          <rect className={s.cStripe} x={x + 12} y={y + 42} width={52} height={6} rx={3} />
        </g>
      ))}

      {/* Кольцевая станция: кольцо, спицы, ступица с куполом, стыковочные узлы. */}
      <g>
        <ellipse className={s.cRingGlow} cx={800} cy={360} rx={230} ry={82} />
        <ellipse className={s.cRing} cx={800} cy={360} rx={230} ry={82} />
        <ellipse className={s.cRingInner} cx={800} cy={360} rx={196} ry={66} />
        <path className={s.cSpoke} d="M 570 360 H 1030 M 800 278 V 442" />
        <ellipse className={s.cHub} cx={800} cy={356} rx={58} ry={34} />
        <path className={s.fDome} d="M 770 340 A 30 26 0 0 1 830 340 Z" />
        {[[552, 346], [1018, 346], [786, 264], [786, 428]].map(([x, y]) => <rect key={`${x}-${y}`} className={s.cModule} x={x} y={y} width={30} height={28} rx={4} />)}
      </g>

      {/* Корабли идут по маршрутам к станции. */}
      {SHIPS.map((i) => (
        <path key={i} className={s.cShip} d="M -9 -6 L 11 0 L -9 6 Z">
          <animateMotion dur={`${9 + i}s`} repeatCount="indefinite" rotate="auto" path={ROUTES[i].d} />
        </path>
      ))}
    </svg>
  )
}
