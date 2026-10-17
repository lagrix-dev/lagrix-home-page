"use client"

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import s from "./landing-agent.module.css"

// КОМНАТА «VIP PERSON» (шаг 515-5, вторая редакция 515-7; навык impeccable, путь «Launcher unavailable»).
// 515-5, владелец: «зал из музея Лувр где на стенах висят картины … узнаваемые силуэты невероятно важных людей прошлого …
// фотоаппарат на трёх ножках с характерной вспышкой … магниевая вспышка в течение 2 секунд … заливает светом полностью всю комнату
// … держится полсекунды а затем плавно в течение 1 секунды вспышка растворяется».
// 515-7, владелец 2026-10-17: «убери … человека … слева от фотоаппарата разместить табличку … опустить с неё вниз верёвочку внизу
// которой висит такой же хвостик как обычно висит на шторах … одновременно можно дернуть за хвостик или нажать на эту табличку»;
// «не хотел чтобы текст появлялся в отдельном окне модальном … уходили бы все атрибуты помещения за исключением колонн и верхней
// вывески и появлялась бы … картина внутри которой был бы этот текст и больше уже до перезагрузки страницы первая сцена не
// возвращается»; и критика камеры и картин (impeccable critique, DEGRADED single-context) — полевая камера, свои профили портретов.
//
// Мир — тот же вокзал (DIRECTION.md): стена — табло, рамы — плакат (золото), холсты — мел, силуэты — чернила без лиц (вокзальные
// пиктограммы), знак эпохи — золото, колонны — мел, гардина — глубокий сигнал, табличка — плакат на четырёх болтах, как H2H/H2A
// «Телеграфа» и LAGRIX на рентгене «Таможни». Одно авторское движение — вспышка магния; рывок шнура — её спусковой крючок.
// Фазы — `data-phase` на комнате, движение — в CSS; таймеры только здесь. Сцена SVG прижата к полу и высоты не меняет; колонны —
// отдельные элементы у краёв зала; картина — HTML (настоящий текст), до вспышки он скрыт как текст для читалок и поиска.

export type VipWords = {
  title: string
  text?: string
  /** Подпись сцены для читалок экрана: что нарисовано. */
  scene: string
  /** Надпись таблички, которая делает снимок. */
  button: string
  /** Подсказка под надписью: кисть можно дёрнуть. На телефоне скрыта — там табличку нажимают. */
  pull?: string
  /** Заголовок картины с концепцией метки «Официальный». */
  conceptTitle: string
  conceptText: string
  /** Пункты концепции — из документа 24 протокола. */
  points: string[]
  /** Ссылка внизу картины; адрес с «/» получает язык страницы. */
  more: { label: string; href: string }
}

type Phase = "idle" | "burn" | "flash" | "fade" | "shown"

// Тайминг — слова владельца: магний горит 2 с, белое держится 0,5 с, растворяется 1 с. Рывок кисти от нажатия — 0,2 с.
const BURN = 2000
const HOLD = 500
const FADE = 1000
const TUG = 200

// Табличка и шнур (единицы рисунка 1200×560). Шнур — от проушины под табличкой до кисти.
const PL = { x: 352, y: 38, w: 200, h: 88 }
const CX = PL.x + PL.w / 2
const CORD_TOP = PL.y + PL.h + 6
const CORD_END = 318
const PULL_MAX = 64
const PULL_FIRE = 28

// Искры магния: смещение от лотка вспышки и задержка внутри цикла 0,8 с.
const FLASH = { x: 566, y: 182 }
const SPARKS: [number, number, number][] = [
  [-38, -44, 0], [-20, -62, 120], [6, -70, 260], [28, -58, 60], [44, -36, 340], [-50, -18, 200],
  [52, -12, 420], [-28, -30, 520], [16, -40, 600], [36, -76, 160], [-8, -54, 460], [58, -48, 300],
]

// ── Портреты: поле 100×120, лицом вправо. Чернила — силуэт; «разрез» — линии цвета холста внутри силуэта (складки, борода,
// полосы платка); золото — знак эпохи (кокарда, венок, серьга, урей и ожерелье). У каждого свой профиль, а не одна голова в
// разных шляпах — главный упрёк критики 515-7.
type Sign = "napoleon" | "caesar" | "shakespeare" | "lincoln" | "cleopatra"
type Look = { ink: string[]; cut?: string[]; collar?: string; gold?: ReactNode; goldCut?: string[] }

const band = (t: number) => [70 - 36 * t, 34 + 10 * t] as const
const LAUREL = [
  ...[0.04, 0.2, 0.36, 0.52, 0.68, 0.84, 1].map((t) => { const [x, y] = band(t); return [x, y - 4, 198] as const }),
  ...[0.12, 0.28, 0.44, 0.6, 0.76, 0.92].map((t) => { const [x, y] = band(t); return [x, y + 4, 162] as const }),
]

const LOOKS: Record<Sign, Look> = {
  napoleon: {
    ink: [
      "M40 84 C34 76 32 62 34 50 C36 40 44 34 54 33 L66 33 C70 36 71 40 71 44 L72 47 C74 50 76 53 77 56 L73 58 L73 61 L71 63 L72 65 L69 67 C71 70 71 74 68 77 C65 79 63 80 61 80 L61 84 L66 85 L66 94 C74 98 82 104 86 120 L14 120 C14 112 16 104 20 100 C24 96 32 92 40 90 Z",
      // эполет: подушка на плече и бахрома над рукой
      "M16 98 C18 90 30 88 40 92 L38 98 L35 106 L33 99 L30 107 L28 99 L25 107 L23 99 L20 106 L18 99 Z",
      // двууголка поперёк головы — полумесяц
      "M14 40 C20 14 62 2 97 36 C84 30 68 28 56 31 C42 28 26 31 14 40 Z",
    ],
    cut: ["M61 85 L64 94", "M66 94 C70 100 72 108 72 120"],
    gold: <circle cx={64} cy={20} r={4.5} />,
  },
  caesar: {
    ink: [
      "M40 84 C33 74 31 60 33 48 C35 34 46 26 58 26 C66 26 70 32 71 38 L72 44 C75 46 77 49 77 52 C78 55 79 58 78 59 L74 60 L74 63 L72 64.5 L73 66.5 L70 68 C71 71 71 74 68 76 C65 78 62 79 59 79 L59 86 C68 90 82 98 88 120 L12 120 C12 108 16 98 26 92 C32 88 36 86 40 84 Z",
    ],
    // тога: складки через грудь
    cut: ["M26 96 C40 100 54 110 62 120", "M34 92 C48 96 66 104 78 118", "M60 88 C62 94 60 100 56 104"],
    gold: (
      <>
        {/* золотой лавровый венок: лента и два ряда листьев, острия смотрят назад */}
        <path d="M71 35 C62 32 48 34 33 45 L34 47 C48 37 62 35 71 37 Z" />
        {LAUREL.map(([x, y, a]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={7.5} ry={2.8} transform={`rotate(${a} ${x} ${y})`} />)}
        {/* концы ленты на затылке */}
        <path d="M35 46 C32 54 33 60 28 68 L31 69 C35 61 35 54 37 47 Z" />
        <path d="M36 47 C37 56 39 62 36 72 L39 72 C41 62 39 55 38 47 Z" />
      </>
    ),
  },
  shakespeare: {
    ink: [
      // высокий открытый лоб, длинные волосы сзади, усы, клиновидная бородка, камзол
      "M36 92 C29 80 27 66 29 54 C31 40 40 28 54 24 C64 22 70 28 71 36 L72 44 C74 48 76 52 77 55 L73 57 L75 59 L72 60 L73 62 L71 63 C73 67 76 73 74 79 C70 77 66 75 62 75 L61 84 C70 86 82 96 88 120 L12 120 C12 108 18 98 28 94 Z",
    ],
    cut: ["M44 40 C42 50 44 60 50 66", "M36 52 C36 62 38 72 44 80"],
    // широкий белый отложной воротник — цвет холста с чернильной кромкой
    collar: "M30 90 C46 82 72 82 86 90 C82 99 62 102 48 99 C40 97 33 95 30 90 Z",
    gold: <circle cx={50} cy={62} r={2.6} />,
  },
  lincoln: {
    ink: [
      "M42 86 C36 76 34 64 35 52 C36 42 42 36 50 34 L70 34 C72 38 73 42 72 46 C75 50 78 55 79 58 L75 60 L75 63 L73 64.5 L74 66.5 L71 67.5 C74 72 76 80 70 86 C66 89 61 89 58 86 L58 90 C68 92 82 100 88 120 L14 120 C14 108 18 100 28 94 C34 90 38 88 42 86 Z",
      // цилиндр: тулья и поля
      "M39 2 L73 2 L71 30 L41 30 Z",
      "M29 30 C30 27 86 27 87 30 L87 34 C70 36 46 36 29 34 Z",
    ],
    // лента цилиндра, край бороды по челюсти (без усов), воротник рубашки и лацкан
    cut: ["M41 24 L71 24", "M50 60 C54 68 62 70 71 68", "M58 90 L63 96 L68 91", "M63 96 C66 104 68 112 70 120"],
  },
  cleopatra: {
    ink: [
      // полосатый платок до плеч, чёлка, прямой нос, длинная шея
      "M30 94 L28 56 C28 38 40 24 56 22 C64 22 70 28 71 34 L71 41 L72 45 C75 49 77 53 78 55 L73 57 L75 60 L72 62 L74 64 L70 66 C71 69 71 72 66 75 L60 76 L60 90 C70 94 82 100 88 120 L12 120 C12 108 18 100 30 94 Z",
    ],
    cut: ["M30 50 L54 46", "M29 60 L53 58", "M29 70 L53 70", "M30 80 L53 81", "M54 42 L54 92"],
    gold: (
      <>
        {/* диадема, урей — кобра надо лбом, широкое ожерелье */}
        <path d="M71 38 C62 36 46 37 32 42 L32 45 C46 40 62 39 71 41 Z" />
        <path d="M68 38 C65 32 68 26 73 26 C77 27 77 32 74 33 C72 33 71 35 72 38 Z" />
        <path d="M40 96 C50 108 72 110 84 100 L80 94 C70 102 54 102 46 92 Z" />
      </>
    ),
    goldCut: ["M44 98 C54 106 70 107 80 99"],
  },
}

function Portrait({ sign }: { sign: Sign }) {
  const l = LOOKS[sign]
  return (
    <>
      {l.ink.map((d) => <path key={d} className={s.vipInk} d={d} />)}
      {l.collar && <path className={s.vipCollar} d={l.collar} />}
      {l.cut?.map((d) => <path key={d} className={s.vipCut} d={d} />)}
      {l.gold && <g className={s.vipGold}>{l.gold}</g>}
      {l.goldCut?.map((d) => <path key={d} className={s.vipGoldCut} d={d} />)}
    </>
  )
}

/** Лампа-рожок над рамой: латунная трубка на коротком кронштейне и тёплый конус света на холст. */
function PictureLight({ cx, y, w }: { cx: number; y: number; w: number }) {
  return (
    <g>
      <path fill="url(#vip-cone)" d={`M${cx - 22} ${y - 12} L${cx + 22} ${y - 12} L${cx + w * 0.42} ${y + 70} L${cx - w * 0.42} ${y + 70} Z`} />
      <rect className={s.vipGiltDeep} x={cx - 2} y={y - 14} width={4} height={14} />
      <rect className={s.vipGilt} x={cx - 26} y={y - 22} width={52} height={9} rx={4.5} />
      <rect className={s.vipGiltDeep} x={cx - 22} y={y - 14} width={44} height={2} />
    </g>
  )
}

/** Рама-багет в три тона (блик, тело, тень), бусины, холст с виньеткой; у овальной — резной бант, у прямоугольной — розетки. */
function Frame({ x, y, w, h, oval, sign, light = true }: { x: number; y: number; w: number; h: number; oval?: boolean; sign: Sign; light?: boolean }) {
  const cx = x + w / 2
  const cy = y + h / 2
  const clip = `vip-clip-${sign}`
  if (oval) {
    const k = Math.min((w - 22) / 100, (h - 22) / 120)
    return (
      <g>
        <ellipse className={s.vipShadow} filter="url(#vip-soft)" cx={cx} cy={cy + 6} rx={w / 2} ry={h / 2} />
        <ellipse className={s.vipGilt} cx={cx} cy={cy} rx={w / 2} ry={h / 2} />
        <path className={s.vipBevelHi} d={`M${cx - w / 2 + 3} ${cy} A${w / 2 - 3} ${h / 2 - 3} 0 0 1 ${cx} ${y + 3}`} />
        <path className={s.vipBevelLo} d={`M${cx + w / 2 - 3} ${cy} A${w / 2 - 3} ${h / 2 - 3} 0 0 1 ${cx} ${y + h - 3}`} />
        <ellipse className={s.vipGiltDeep} cx={cx} cy={cy} rx={w / 2 - 8} ry={h / 2 - 8} />
        <ellipse className={s.vipBead} cx={cx} cy={cy} rx={w / 2 - 5} ry={h / 2 - 5} />
        <ellipse fill="url(#vip-canvas)" cx={cx} cy={cy} rx={w / 2 - 11} ry={h / 2 - 11} />
        <clipPath id={clip}><ellipse cx={cx} cy={cy} rx={w / 2 - 11} ry={h / 2 - 11} /></clipPath>
        <g clipPath={`url(#${clip})`}>
          <g transform={`translate(${cx - 50 * k} ${cy - 60 * k + 6}) scale(${k})`}><Portrait sign={sign} /></g>
        </g>
        <path className={s.vipGilt} d={`M${cx} ${y + 2} C${cx - 10} ${y - 14} ${cx - 24} ${y - 8} ${cx - 14} ${y + 2} C${cx - 10} ${y + 6} ${cx - 4} ${y + 4} ${cx} ${y + 2} Z M${cx} ${y + 2} C${cx + 10} ${y - 14} ${cx + 24} ${y - 8} ${cx + 14} ${y + 2} C${cx + 10} ${y + 6} ${cx + 4} ${y + 4} ${cx} ${y + 2} Z`} />
        <circle className={s.vipGiltDeep} cx={cx} cy={y + 1} r={3.6} />
        {light && <PictureLight cx={cx} y={y - 6} w={w} />}
      </g>
    )
  }
  const k = Math.min((w - 24) / 100, (h - 24) / 120) * 0.98
  return (
    <g>
      <rect className={s.vipShadow} filter="url(#vip-soft)" x={x} y={y + 6} width={w} height={h} />
      <rect className={s.vipGilt} x={x} y={y} width={w} height={h} rx={2} />
      <path className={s.vipGiltHi} d={`M${x} ${y} H${x + w} L${x + w - 4} ${y + 4} H${x + 4} V${y + h - 4} L${x} ${y + h} Z`} />
      <path className={s.vipGiltDeep} d={`M${x + w} ${y + h} H${x} L${x + 4} ${y + h - 4} H${x + w - 4} V${y + 4} L${x + w} ${y} Z`} />
      <rect className={s.vipGiltDeep} x={x + 9} y={y + 9} width={w - 18} height={h - 18} />
      <rect className={s.vipBead} x={x + 6} y={y + 6} width={w - 12} height={h - 12} />
      <rect fill="url(#vip-canvas)" x={x + 12} y={y + 12} width={w - 24} height={h - 24} />
      {[[x + 4.5, y + 4.5], [x + w - 4.5, y + 4.5], [x + 4.5, y + h - 4.5], [x + w - 4.5, y + h - 4.5]].map(([ax, ay]) => (
        <g key={`${ax}-${ay}`}>
          <circle className={s.vipGiltHi} cx={ax} cy={ay} r={5} />
          <circle className={s.vipGiltDeep} cx={ax} cy={ay} r={1.8} />
        </g>
      ))}
      <clipPath id={clip}><rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} /></clipPath>
      <g clipPath={`url(#${clip})`}>
        <g transform={`translate(${cx - 50 * k} ${y + h - 12 - 120 * k}) scale(${k})`}><Portrait sign={sign} /></g>
      </g>
      {light && <PictureLight cx={cx} y={y} w={w} />}
    </g>
  )
}

// Мехи-гармошка между стойками: верх и низ ломаной, складки — светлые линии на рёбрах.
const BELLOWS = (() => {
  const n = 18, x0 = 576, x1 = 664, t0 = 260, t1 = 280, b0 = 344, b1 = 328
  const top: string[] = [`M${x0} ${t0}`]
  const bottom: string[] = []
  const pleats: string[] = []
  for (let i = 1; i <= n; i++) {
    const f = i / n
    const x = x0 + (x1 - x0) * f
    const t = t0 + (t1 - t0) * f - (i % 2 ? 4 : 0)
    const b = b0 + (b1 - b0) * f + (i % 2 ? 4 : 0)
    top.push(`L${x} ${t}`)
    bottom.unshift(`L${x} ${b}`)
    if (i % 2 && i < n) pleats.push(`M${x} ${t} L${x} ${b}`)
  }
  return { body: `${top.join(" ")} L${x1} ${b1} ${bottom.join(" ")} L${x0} ${b0} Z`, pleats }
})()

/** Полевая камера на треноге в профиль, объектив к гардине; на задней стойке — штанга с лотком магния. */
function Camera() {
  return (
    <g>
      {/* тренога: задняя нога в тени, голова с латунным кольцом, передние ноги с бликом, латунные наконечники */}
      <path className={s.vipWoodLo} d="M624 372 L632 372 L640 532 L634 532 Z" />
      <path className={s.vipWood} d="M612 370 L622 372 L572 526 L564 524 Z" />
      <path className={s.vipWood} d="M634 372 L644 370 L702 522 L694 525 Z" />
      <path className={s.vipWoodHi} d="M612 370 L615 371 L567 525 L564 524 Z" />
      <path className={s.vipWoodHi} d="M641 371 L644 370 L702 522 L699 523 Z" />
      {[[568, 528, 18], [698, 526, -21], [637, 534, -3]].map(([x, y, a]) => (
        <rect key={x} className={s.vipBrass} x={x - 4} y={y - 6} width={8} height={10} rx={2} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <rect className={s.vipGiltDeep} x={600} y={364} width={56} height={10} rx={3} />
      <rect className={s.vipBrass} x={614} y={366} width={28} height={8} rx={2} />
      {/* станина с латунной направляющей */}
      <rect className={s.vipWood} x={546} y={350} width={172} height={12} rx={2} />
      <rect className={s.vipWoodHi} x={546} y={350} width={172} height={3} rx={1.5} />
      <rect className={s.vipBrass} x={552} y={357} width={160} height={2} />
      {/* светозащитный капюшон матового стекла и задняя стойка */}
      <path className={s.vipHood} d="M556 262 L538 270 L538 338 L556 344 Z" />
      <rect className={s.vipWood} x={556} y={250} width={20} height={102} rx={2} />
      <rect className={s.vipWoodHi} x={556} y={250} width={4} height={102} />
      <rect className={s.vipBrass} x={556} y={250} width={20} height={5} />
      <rect className={s.vipBrass} x={556} y={340} width={20} height={5} />
      {/* мехи */}
      <path className={s.vipLeather} d={BELLOWS.body} />
      {BELLOWS.pleats.map((d) => <path key={d} className={s.vipPleat} d={d} />)}
      {/* передняя стойка и объектив: латунный тубус, два кольца, бленда, стекло с бликом */}
      <rect className={s.vipWood} x={664} y={270} width={16} height={82} rx={2} />
      <rect className={s.vipWoodHi} x={664} y={270} width={3} height={82} />
      <circle className={s.vipBrass} cx={672} cy={278} r={3.5} />
      <circle className={s.vipBrass} cx={672} cy={342} r={3.5} />
      <rect className={s.vipBrass} x={680} y={290} width={36} height={30} rx={3} />
      <rect className={s.vipGiltDeep} x={689} y={290} width={4} height={30} />
      <rect className={s.vipGiltDeep} x={702} y={290} width={4} height={30} />
      <rect className={s.vipGiltDeep} x={716} y={286} width={12} height={38} rx={3} />
      <ellipse className={s.vipGlass} cx={729} cy={305} rx={3.5} ry={15} />
      <path className={s.vipGlint} d="M729 294 Q731 298 730 302" />
      {/* вспышка: латунная штанга от задней стойки, лоток с горкой магния */}
      <rect className={s.vipGiltDeep} x={563} y={196} width={5} height={56} />
      <circle className={s.vipBrass} cx={565.5} cy={197} r={5} />
      <path className={s.vipGiltDeep} d="M522 184 L610 184 L602 196 L530 196 Z" />
      <rect className={s.vipBrass} x={522} y={182} width={88} height={4} rx={2} />
      <path className={s.vipPowder} d="M532 183 C548 176 584 176 600 183 Z" />
    </g>
  )
}

/** Колонна у края зала: капитель и база держат пропорции, ствол с каннелюрами тянется на любую высоту. */
function Column({ side }: { side: "l" | "r" }) {
  return (
    <span className={`${s.vipCol} ${side === "l" ? s.vipColL : s.vipColR}`} aria-hidden="true">
      <svg className={s.vipColCap} viewBox="-2 0 96 27" focusable="false">
        <rect x={0} y={0} width={92} height={9} />
        <rect x={4} y={9} width={84} height={16} />
        <circle className={s.vipVolute} cx={8} cy={17} r={9} />
        <circle className={s.vipVolute} cx={84} cy={17} r={9} />
      </svg>
      <span className={s.vipColShaft} />
      <svg className={s.vipColBase} viewBox="0 0 92 22" focusable="false">
        <rect x={10} y={0} width={72} height={10} />
        <rect x={2} y={10} width={88} height={12} />
      </svg>
    </span>
  )
}

export function VipRoom({ w, lang }: { w: VipWords; lang: string }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const busy = useRef(false)
  const timers = useRef<number[]>([])
  const pull = useRef<SVGGElement>(null)
  const painting = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y0: number; k: number; d: number; id: number } | null>(null)
  const href = w.more.href.startsWith("/") ? `/${lang}${w.more.href}` : w.more.href
  const open = phase === "flash" || phase === "fade" || phase === "shown"

  const later = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)) }
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)) }, [])

  const reveal = () => {
    setPhase("shown")
    // Табличка исчезла вместе с залом — фокус переходит на картину, чтобы клавиатура и читалка не потерялись.
    window.requestAnimationFrame(() => painting.current?.focus({ preventScroll: true }))
  }

  /** Съёмка: рывок шнура (сам, если нажали табличку или кисть) → магний → белое → картина. Сцена не возвращается. */
  const shoot = (tug: boolean) => {
    if (busy.current) return
    busy.current = true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { reveal(); return }
    if (tug) {
      pull.current?.setAttribute("data-tug", "")
      later(600, () => pull.current?.removeAttribute("data-tug"))
    }
    later(tug ? TUG : 0, () => {
      setPhase("burn")
      later(BURN, () => setPhase("flash"))
      later(BURN + HOLD, () => setPhase("fade"))
      later(BURN + HOLD + FADE, reveal)
    })
  }

  const setPull = (d: number) => {
    pull.current?.style.setProperty("--pull", `${d}px`)
    pull.current?.style.setProperty("--stretch", String(1 + d / (CORD_END - CORD_TOP)))
  }
  const onDown = (e: PointerEvent<SVGGElement>) => {
    if (busy.current) return
    const k = e.currentTarget.ownerSVGElement?.getScreenCTM()?.d || 1
    drag.current = { y0: e.clientY, k, d: 0, id: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
    pull.current?.setAttribute("data-drag", "")
  }
  const onMove = (e: PointerEvent<SVGGElement>) => {
    const g = drag.current
    if (!g || g.id !== e.pointerId) return
    g.d = Math.max(0, Math.min(PULL_MAX, (e.clientY - g.y0) / g.k))
    setPull(g.d)
  }
  const onUp = (e: PointerEvent<SVGGElement>) => {
    const g = drag.current
    if (!g || g.id !== e.pointerId) return
    drag.current = null
    pull.current?.removeAttribute("data-drag")
    setPull(0)
    if (e.type === "pointercancel") return
    if (g.d >= PULL_FIRE) shoot(false)
    else if (g.d < 4) shoot(true)
  }
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); shoot(true) }
  }

  return (
    <div data-block="le9pi" className={s.vipRoom} data-phase={phase} data-open={open ? "" : undefined}>
      <p data-block="mk8gg" className={s.asSr}>{w.scene}</p>

      <div data-block="if65b" className={s.vipStage}>
        <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMax slice" className={s.vipSvg} focusable="false">
          <defs>
            <radialGradient id="vip-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" className={s.vipGlowCore} />
              <stop offset="45%" className={s.vipGlowMid} />
              <stop offset="100%" className={s.vipGlowEdge} />
            </radialGradient>
            <radialGradient id="vip-canvas" cx="50%" cy="42%" r="62%">
              <stop offset="55%" className={s.vipCanvasMid} />
              <stop offset="100%" className={s.vipCanvasEdge} />
            </radialGradient>
            <linearGradient id="vip-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={s.vipConeTop} />
              <stop offset="100%" className={s.vipConeEnd} />
            </linearGradient>
            <filter id="vip-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5" /></filter>
          </defs>

          {/* Помещение: стена, панель, плинтус, паркет — остаются, когда вспышка уносит предметы. */}
          <g aria-hidden="true">
            <rect className={s.vipWall} x={0} y={0} width={1200} height={430} />
            <rect className={s.vipWainscot} x={0} y={356} width={1200} height={74} />
            <rect className={s.vipMolding} x={0} y={352} width={1200} height={4} />
            <rect className={s.vipFloor} x={0} y={430} width={1200} height={130} />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <path key={i} className={s.vipParquet} d={`M${i * 160 - 120} 560 L${i * 160 + 10} 430`} />)}
            <rect className={s.vipSkirting} x={0} y={426} width={1200} height={6} />
          </g>

          <g className={s.vipObjects}>
            <g aria-hidden="true">
              {/* Развеска по одной линии центров по обе стороны таблички и камеры; Шекспир — нижним рядом слева. Левая группа на
                  телефоне скрыта: срез сцены оставлял от неё обрезанный край рамы. */}
              <g className={s.vipFarLeft}>
                <Frame x={132} y={102} w={104} h={136} oval sign="napoleon" />
                <Frame x={250} y={112} w={90} h={116} oval sign="caesar" />
                <Frame x={182} y={252} w={88} h={96} sign="shakespeare" light={false} />
              </g>
              <Frame x={628} y={94} w={96} h={152} sign="lincoln" />
              <Frame x={748} y={112} w={88} h={116} oval sign="cleopatra" />

              {/* Гардина — фон, на котором снимают: штанга, волны складок. */}
              <rect className={s.vipRod} x={846} y={54} width={238} height={8} rx={4} />
              <path className={s.vipCurtain} d="M852 62 L1080 62 L1080 430 C1066 446 1052 436 1038 446 C1024 456 1008 440 994 450 C980 460 964 444 950 452 C936 460 920 444 906 450 C892 456 876 444 862 448 L852 446 Z" />
              {[880, 922, 966, 1010, 1052].map((x) => <path key={x} className={s.vipFold} d={`M${x} 64 C${x + 10} 150 ${x - 10} 250 ${x + 6} 340 C${x + 12} 380 ${x - 4} 420 ${x + 4} 444`} />)}

              <Camera />
            </g>

            {/* Табличка — кнопка съёмки (как таблички H2H/H2A «Телеграфа»). */}
            <g className={s.vipPlate} role="button" tabIndex={open ? -1 : 0} aria-label={w.pull ? `${w.button}. ${w.pull}` : w.button}
              onClick={() => shoot(true)} onKeyDown={onKey}>
              <rect className={s.vipPlateFace} x={PL.x} y={PL.y} width={PL.w} height={PL.h} rx={4} />
              {[[PL.x + 12, PL.y + 12], [PL.x + PL.w - 12, PL.y + 12], [PL.x + 12, PL.y + PL.h - 12], [PL.x + PL.w - 12, PL.y + PL.h - 12]].map(([bx, by]) => (
                <circle key={`${bx}-${by}`} className={s.vipBolt} cx={bx} cy={by} r={4.5} />
              ))}
              <text className={s.vipPlateCode} x={CX} y={PL.y + (w.pull ? 46 : 56)} textAnchor="middle">{w.button.toLocaleUpperCase(lang)}</text>
              {w.pull && <text className={s.vipPlateHint} x={CX} y={PL.y + 70} textAnchor="middle">{w.pull}</text>}
            </g>

            {/* Шнур и кисть: тянут мышью или пальцем вниз; отпущенная ниже порога — снимок, кисть пружинит обратно. */}
            <g ref={pull} className={s.vipPull} aria-hidden="true"
              onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
              <circle className={s.vipEyelet} cx={CX} cy={CORD_TOP - 3} r={4} />
              <g className={s.vipCord}>
                <path className={s.vipRope} d={`M${CX} ${CORD_TOP} V${CORD_END}`} />
                <path className={s.vipRopeTwist} d={`M${CX} ${CORD_TOP} V${CORD_END}`} />
              </g>
              <g className={s.vipTassel}>
                <rect className={s.vipGrip} x={CX - 24} y={CORD_END - 30} width={48} height={100} />
                <ellipse className={s.vipGilt} cx={CX} cy={CORD_END + 10} rx={9} ry={10} />
                <path className={s.vipGiltDeep} d={`M${CX - 9} ${CORD_END + 12} C${CX - 6} ${CORD_END + 20} ${CX + 6} ${CORD_END + 20} ${CX + 9} ${CORD_END + 12} C${CX + 6} ${CORD_END + 16} ${CX - 6} ${CORD_END + 16} ${CX - 9} ${CORD_END + 12} Z`} />
                <rect className={s.vipGiltDeep} x={CX - 10} y={CORD_END + 18} width={20} height={6} rx={2} />
                <path className={s.vipGilt} d={`M${CX - 9} ${CORD_END + 24} L${CX + 9} ${CORD_END + 24} L${CX + 15} ${CORD_END + 62} C${CX + 6} ${CORD_END + 66} ${CX - 6} ${CORD_END + 66} ${CX - 15} ${CORD_END + 62} Z`} />
                {[-12, -8, -4, 0, 4, 8, 12].map((i) => <path key={i} className={s.vipFringe} d={`M${CX + i * 0.55} ${CORD_END + 28} L${CX + i} ${CORD_END + 62}`} />)}
              </g>
            </g>
          </g>

          {/* Магний горит: тёплый свет растёт, лоток вспыхивает, искры и дым — только в фазе burn. */}
          <g aria-hidden="true">
            <circle className={s.vipWarm} cx={FLASH.x} cy={FLASH.y} r={260} fill="url(#vip-glow)" />
            <ellipse className={s.vipPowderGlow} cx={FLASH.x} cy={FLASH.y - 2} rx={34} ry={12} fill="url(#vip-glow)" />
            <g className={s.vipSparks}>
              {SPARKS.map(([dx, dy, d]) => (
                <circle key={`${dx}-${dy}`} className={s.vipSpark} cx={FLASH.x} cy={FLASH.y - 2} r={dx % 2 ? 2.4 : 3}
                  style={{ "--dx": `${dx}px`, "--dy": `${dy}px`, "--d": `${d}ms` } as CSSProperties} />
              ))}
            </g>
            {[[FLASH.x - 14, 0], [FLASH.x + 2, 300], [FLASH.x + 16, 600]].map(([x, d]) => (
              <circle key={x} className={s.vipSmoke} cx={x} cy={FLASH.y - 6} r={12} style={{ "--d": `${d}ms` } as CSSProperties} />
            ))}
          </g>
        </svg>

        <Column side="l" />
        <Column side="r" />

        {/* Концепция метки — всегда в HTML (поиск, агенты, читалки экрана); после вспышки это картина на стене между колоннами. */}
        <div data-block="nsbst" ref={painting} tabIndex={-1} className={open ? s.vipPainting : s.asSr}>
          <span className={s.vipPicLamp} aria-hidden="true" />
          <div data-block="vp7fr" className={s.vipPicFrame}>
            <span className={`${s.vipPicCorner} ${s.vipPicTl}`} aria-hidden="true" />
            <span className={`${s.vipPicCorner} ${s.vipPicTr}`} aria-hidden="true" />
            <span className={`${s.vipPicCorner} ${s.vipPicBl}`} aria-hidden="true" />
            <span className={`${s.vipPicCorner} ${s.vipPicBr}`} aria-hidden="true" />
            <div data-block="vp7cn" className={s.vipPicCanvas}>
              <h3 data-block="ov6fn" className={s.vipPicTitle}>{w.conceptTitle}</h3>
              <p data-block="j7ozb" className={s.vipPicLead}>{w.conceptText}</p>
              <ol data-block="vvh0n" className={s.vipPicPoints}>{w.points.map((p) => <li data-block="v8dri" key={p}>{p}</li>)}</ol>
              <a className={s.vipPicMore} href={href}>{w.more.label}<ArrowRight className="size-4" strokeWidth={2.4} aria-hidden="true" /></a>
            </div>
          </div>
        </div>

        <div data-block="d6lkd" className={s.vipFlash} aria-hidden="true" />
        <noscript>
          <a className={s.vipNoscript} href={href}>{w.more.label}</a>
        </noscript>
      </div>
    </div>
  )
}
