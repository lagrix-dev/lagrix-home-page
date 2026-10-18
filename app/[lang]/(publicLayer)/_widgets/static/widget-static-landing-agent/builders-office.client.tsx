"use client"

import { useId, type CSSProperties, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import s from "./landing-agent.module.css"

// СЦЕНА «СТРОИТЕЛЬНЫЙ ДЕПАРТАМЕНТ» (навык impeccable, путь «Launcher unavailable»).
// 521 (владелец 2026-10-18): «помещение оформленное в стиле Старых кабинетов инженера где в центре стоит большая чертёжный доска с
// чертежами видно что тот кто чертил на этой доске он чертил поезд … скругленный потолки незначительно … алюминиевая ажур на струне …
// молоток, пассатижи пила … При наведении … при нажатии слева появляется такой же информационная окно».
// 523 (владелец 2026-10-18): «сделай размер чертежей в ширину больше на 30% … специальной линейки … позволяет перемещаться линиям
// строго параллельно по холсту … три карандаша разного цвета на этом холсте … под инструментами дорисую верстак и пусть слева будут
// находиться тиски, сзади нарисуй окно сквозь которое просвечивается вдалеке здание железнодорожного вокзала … должно вызывать
// восторженный эффект». Решение 521 «окна нет» снято этим словом.
//
// Мир — тот же вокзал (DIRECTION.md): все цвета — роли табло и их смеси (`--bd-*` в `.bdRoom`), ни одного своего значения. За окном —
// вокзал будущего с первого экрана (стеклянный свод, жёлтые часы, орбита). Два авторских движения, оба под рукой и только CSS: рейсшина
// по наведению на доску съезжает по тросам строго параллельно и прочерчивает ось котла; инструмент поднимается со своего нарисованного
// контура. Без JavaScript окно справки открывает встроенный popover; при «уменьшить движение» ничто не двигается.
// Сцена — три рисунка со своими единицами: доска 480 × 340, окно 160 × 252, мастерская 330 × 332. На компьютере они стоят в одной
// комнате 1000 × 470 (проценты), на телефоне — только чертёжная (окно, лампа, доска): мастерскую там не показываем (523-3).

export type BuildersWords = {
  title: string
  text?: string
  scene: string
  /** Подпись листа на доске (штамп чертежа). */
  sheet: string
  boardLabel: string
  hammer: string
  pliers: string
  saw: string
  infoTitle: string
  info: string
  more: string
  close: string
}

type Box = { x: number; y: number; w: number; h: number }

const SHOP_W = 330
const SHOP_H = 332
/** Места инструментов на щите (единицы мастерской); контур и кнопка стоят по одним и тем же числам. */
const TOOL = {
  hammer: { x: 31, y: 16, w: 54, h: 124 },
  driverA: { x: 93, y: 26, w: 16, h: 106 },
  pliers: { x: 117, y: 14, w: 48, h: 128 },
  driverB: { x: 173, y: 28, w: 16, h: 102 },
  saw: { x: 199, y: 10, w: 64, h: 136 },
  wrench: { x: 271, y: 22, w: 28, h: 112 },
} satisfies Record<string, Box>

const at = (b: Box): CSSProperties => ({
  left: `${(b.x / SHOP_W) * 100}%`,
  top: `${(b.y / SHOP_H) * 100}%`,
  width: `${(b.w / SHOP_W) * 100}%`,
})

/* ── Инструменты: каждый в своих единицах (0…w, 0…h). ─────────────────────────────────────────────────────────────────────── */

function HammerArt() {
  return (
    <>
      <path className={s.bdOak} d="M21.5 27 H32.5 L35 113 Q35 122 27 122 Q19 122 19 113 Z" />
      <path className={s.bdOakLoFill} d="M19.4 96 H34.6 L35 113 Q35 122 27 122 Q19 122 19 113 Z" />
      <path className={s.bdGrain} d="M25 36 Q26.8 64 25.6 92 M29.4 40 Q30.4 60 29.8 88" />
      <path className={s.bdSteel} d="M8 6 H37 Q46 6 50 12.5 Q53.5 19 52.5 30 Q49.5 22.5 43.5 20.5 L41.5 27 H9 Q2 27 2 16.5 Q2 6 8 6 Z" />
      <path className={s.bdSteelLo} d="M2.4 11 H7.6 V22 H2.4 Z" />
      <path className={s.bdIronFill} d="M21 6 H33 V27 H21 Z" />
      <path className={s.bdShine} d="M10 10.5 H19 M35 10.5 H40" />
    </>
  )
}

function PliersArt() {
  return (
    <>
      <path className={s.bdGrip} d="M19.5 66 Q12 94 9.5 121 Q9.5 127 15 126 Q18.5 125 18.5 120 Q20 94 26 70 Z" />
      <path className={s.bdGrip} d="M28.5 66 Q36 94 38.5 121 Q38.5 127 33 126 Q29.5 125 29.5 120 Q28 94 22 70 Z" />
      <path className={s.bdGripShine} d="M15.5 82 Q13 98 12.5 112 M32.5 82 Q35 98 35.5 112" />
      <path className={s.bdSteel} d="M17.5 64 L15.5 30 Q16.5 11 24 2.5 Q31.5 11 32.5 30 L30.5 64 Z" />
      <path className={s.bdSteelEdge} d="M24 5 V52 M19.8 38 L28.2 46" />
      <path className={s.bdTeeth} d="M21.4 14 H26.6 M20.8 19 H27.2 M20.4 24 H27.6" />
      <circle className={s.bdSteelLo} cx={24} cy={58} r={7} />
      <circle className={s.bdIronFill} cx={24} cy={58} r={2.6} />
    </>
  )
}

function SawArt() {
  const teeth = Array.from({ length: 15 }, (_, i) => `L${i % 2 === 0 ? 8.5 + i * 0.75 : 12.5 + i * 0.75} ${46 + i * 6}`).join(" ")
  return (
    <>
      <path className={s.bdSteel} d={`M12 42 H57 L54 134 L24 134 ${teeth} Z`} />
      <path className={s.bdShine} d="M48 52 L46.5 126" />
      <circle className={s.bdHoleDark} cx={40} cy={124} r={3.4} />
      <path className={s.bdOak} d="M10 4 H55 Q62 4 62 11 V40 Q62 48 54 48 H14 Q5 48 5 39 V12 Q5 4 10 4 Z" />
      <path className={s.bdOakHiStroke} d="M11 8 H54" />
      <path className={s.bdHoleDark} d="M19 15 H46 Q52 15 52 21 V27 Q52 33 46 33 H19 Q13 33 13 27 V21 Q13 15 19 15 Z" />
      {[[16, 43], [33, 43], [50, 43]].map(([x, y]) => (
        <circle key={x} className={s.bdBrassFill} cx={x} cy={y} r={2.4} />
      ))}
    </>
  )
}

function DriverArt({ tone }: { tone: "a" | "b" }) {
  return (
    <>
      <path className={s.bdSteel} d="M6.6 44 H9.4 V96 L10.6 102 H5.4 L6.6 96 Z" />
      <path className={s.bdSteelLo} d="M5.2 40 H10.8 V46 H5.2 Z" />
      <path className={tone === "a" ? s.bdHandleA : s.bdHandleB} d="M3 6 Q3 2 8 2 Q13 2 13 6 L13.6 36 Q13.6 41 8 41 Q2.4 41 2.4 36 Z" />
      <path className={s.bdGripShine} d="M5.6 8 V34 M10.2 8 V34" />
    </>
  )
}

function WrenchArt() {
  return (
    <>
      <path
        className={s.bdSteel}
        d="M5 4 Q2 12 6 20 L10.5 25 L10.5 88 Q4 92 4 100 Q4 110 14 110 Q24 110 24 100 Q24 92 17.5 88 L17.5 25 L22 20 Q26 12 23 4 L18.5 10 V16 H9.5 V10 Z"
      />
      <circle className={s.bdHoleDark} cx={14} cy={100} r={4.2} />
      <path className={s.bdShine} d="M12.4 30 V84" />
    </>
  )
}

/* ── Доска: чертёж паровоза, рейсшина на тросах, угольник, три карандаша. ─────────────────────────────────────────────────── */

function Pencil({ x, y, angle, len, tone }: { x: number; y: number; angle: number; len: number; tone: "red" | "yellow" | "blue" }) {
  const body = len - 24
  const tip = { red: s.bdPencilRed, yellow: s.bdPencilYellow, blue: s.bdPencilBlue }[tone]
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) translate(${-len / 2} -3.6)`} className={tip}>
      <path className={s.bdPencilBody} d={`M0 0 H${body} V7.2 H0 Z`} />
      <path className={s.bdPencilTop} d={`M0 0 H${body} V2.3 H0 Z`} />
      <path className={s.bdPencilLow} d={`M0 4.9 H${body} V7.2 H0 Z`} />
      <path className={s.bdPencilWood} d={`M${body} 0 L${body + 2.5} 1.2 L${body} 2.4 L${body + 2.5} 3.6 L${body} 4.8 L${body + 2.5} 6 L${body} 7.2 L${body + 17} 4.3 V2.9 Z`} />
      <path className={s.bdPencilLead} d={`M${body + 17} 2.9 L${len} 3.6 L${body + 17} 4.3 Z`} />
      <path className={s.bdPencilEnd} d="M0 0 H1.6 V7.2 H0 Z" />
    </g>
  )
}

function Locomotive() {
  const drivers = [160, 206, 252]
  return (
    <g className={s.bdLoco}>
      {/* вспомогательные линии чертёжника — тонкие, во всю ширину листа */}
      <path className={s.bdGuide} d="M58 62 H340 M58 68 H340 M58 150 H340" />
      <path d="M60 186 H346" className={s.bdRail} />
      {/* рама, путеочиститель, буфер */}
      <path d="M92 150 H330 V154 H92 Z" />
      <path d="M92 154 L78 184 H96" />
      <path d="M84 140 H94 V156 H84 Z M76 145 H84 V151 H76 Z" />
      {/* дымовая коробка, труба, котёл, купола, будка, бункер */}
      <path d="M96 92 H124 V150 H96 Z" />
      <path d="M102 92 V67 H116 V92 M98 62 H120 V67 H98 Z" />
      <path d="M124 96 H262 V150 H124" />
      <path d="M158 96 Q158 82 169 82 Q180 82 180 96 M198 96 Q198 87 206 87 Q214 87 214 96 M238 96 V85 H244 V96" />
      <path d="M262 72 H314 V150 H262 Z M258 68 H320 V73 H258 Z M274 84 H298 V108 H274 Z M314 112 H330 V150 H314" />
      <path className={s.bdThin} d="M150 96 V150 M196 96 V150 M240 96 V150 M126 110 H258 M90 84 H98 V92 H90 Z" />
      {/* цилиндр в разрезе — штриховка */}
      <path d="M98 146 H132 V168 H98 Z" />
      <path className={s.bdHatch} d="M100 166 L112 148 M106 166 L118 148 M112 166 L124 148 M118 166 L130 148 M124 166 L131 155" />
      {/* колёса: ведущие со спицами, бегунок, поддерживающее; дышла */}
      {drivers.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={165} r={21} />
          <circle className={s.bdThin} cx={cx} cy={165} r={17.5} />
          <path className={s.bdThin} d={Array.from({ length: 6 }, (_, i) => { const a = (i * Math.PI) / 6; const dx = Math.cos(a) * 17; const dy = Math.sin(a) * 17; return `M${(cx - dx).toFixed(1)} ${(165 - dy).toFixed(1)} L${(cx + dx).toFixed(1)} ${(165 + dy).toFixed(1)}` }).join(" ")} />
          <circle cx={cx} cy={165} r={4.5} className={s.bdHub} />
        </g>
      ))}
      <circle cx={114} cy={176} r={10} />
      <circle className={s.bdThin} cx={114} cy={176} r={3} />
      <circle cx={300} cy={174} r={12} />
      <circle className={s.bdThin} cx={300} cy={174} r={3.4} />
      <path d="M160 171 H252" className={s.bdRod} />
      <path d="M132 158 L206 171" className={s.bdRod} />
      {/* осевые линии колёс — штрихпунктир */}
      <path className={s.bdCenter} d={drivers.map((cx) => `M${cx} 138 V193`).join(" ") + " M114 160 V192 M300 156 V192"} />
    </g>
  )
}

function Dimensions() {
  return (
    <g className={s.bdDim}>
      <path d="M76 140 V44 M330 112 V44 M80 50 H326" />
      <path className={s.bdArrow} d="M76 50 l7 -2.6 v5.2 Z M330 50 l-7 -2.6 v5.2 Z" />
      <text x={203} y={46} textAnchor="middle">12 400</text>
      <path d="M98 62 H58 M76 186 H58 M64 66 V182" />
      <path className={s.bdArrow} d="M64 62 l-2.6 7 h5.2 Z M64 186 l-2.6 -7 h5.2 Z" />
      <text x={60} y={124} textAnchor="middle" transform="rotate(-90 60 124)">3 050</text>
    </g>
  )
}

function Board({ sheet, uid }: { sheet: string; uid: string }) {
  return (
    <svg viewBox="0 0 480 340" aria-hidden="true" className={s.bdBoardSvg}>
      <defs>
        <radialGradient id={`${uid}-pool`} cx="240" cy="104" r="250" gradientUnits="userSpaceOnUse" gradientTransform="translate(240 104) scale(1 0.62) translate(-240 -104)">
          <stop offset="0" className={s.bdPoolIn} />
          <stop offset="1" className={s.bdPoolOut} />
        </radialGradient>
      </defs>
      {/* стойка: две ноги, распорка, башмаки */}
      <ellipse className={s.bdFloorShadow} cx={240} cy={333} rx={196} ry={7} />
      <path className={s.bdLeg} d="M126 250 L90 330 M354 250 L390 330 M104 302 H376" />
      <path className={s.bdLegHi} d="M124 256 L94 322 M352 256 L382 322" />
      <path className={s.bdFoot} d="M78 330 H104 M376 330 H402" />
      <path className={s.bdLeg} d="M196 250 V266 M284 250 V266" />
      {/* щит доски: кромка, поле под листом, полка для карандашей */}
      <path className={s.bdOak} d="M34 14 H446 L458 250 H22 Z" />
      <path className={s.bdOakHiStroke} d="M36 17 H444" />
      <path className={s.bdOakLoFill} d="M42 22 H438 L448 242 H32 Z" />
      <path className={s.bdOak} d="M14 249 H466 V257 Q466 263 460 263 H20 Q14 263 14 257 Z" />
      <path className={s.bdOakHiStroke} d="M16 251 H464" />
      {/* тросы и ролики рейсшины */}
      <path className={s.bdCable} d="M40 26 L31 244 M440 26 L449 244 M40 26 H440 M31 244 H449" />
      {[[40, 26], [440, 26], [31, 244], [449, 244]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle className={s.bdBrassFill} cx={cx} cy={cy} r={5.4} />
          <circle className={s.bdIronFill} cx={cx} cy={cy} r={1.6} />
        </g>
      ))}
      {/* лист: рамка, штамп, чертёж, размеры */}
      <path className={s.bdPaper} d="M48 30 H432 L440 234 H40 Z" />
      <path className={s.bdPaperEdge} d="M56 38 H424 L431 226 H49 Z" />
      <g className={s.bdStampBox}>
        <path d="M300 204 H428 V226 H300 Z M326 204 V226 M300 215 H326" />
      </g>
      <text className={s.bdStampText} x={377} y={219} textAnchor="middle">{sheet}</text>
      <Dimensions />
      <Locomotive />
      {/* ось котла — её прочерчивает рейсшина, когда доска под рукой */}
      <path className={s.bdAxis} d="M70 123 H344" />
      {/* свет лампы на листе */}
      <path d="M48 30 H432 L440 234 H40 Z" fill={`url(#${uid}-pool)`} className={s.bdPool} />
      {/* малярный скотч по углам */}
      {[[54, 35, -36], [426, 35, 36], [46, 229, 36], [434, 229, -36]].map(([x, y, a]) => (
        <rect key={`${x}-${y}`} className={s.bdTape} x={x - 12} y={y - 4.5} width={24} height={9} rx={1} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      {/* три карандаша на правом поле листа */}
      <g className={s.bdPencils}>
        <Pencil x={372} y={128} angle={-63} len={112} tone="blue" />
        <Pencil x={390} y={122} angle={-56} len={118} tone="red" />
        <Pencil x={404} y={136} angle={-71} len={98} tone="yellow" />
      </g>
      {/* рейсшина с угольником: ходит по тросам строго параллельно */}
      <g className={s.bdRule}>
        <path className={s.bdAcrylic} d="M58 187 H118 L58 127 Z M70 175 L70 156 L89 175 Z" fillRule="evenodd" />
        <path className={s.bdAcrylicEdge} d="M58 187 V127 L118 187 M70 175 V156 L89 175 Z" />
        <rect className={s.bdAcrylic} x={24} y={187} width={432} height={8} />
        <rect className={s.bdRuleBase} x={24} y={195} width={432} height={4.5} />
        <path className={s.bdAcrylicEdge} d="M24 187.3 H456" />
        <path className={s.bdTicks} d={Array.from({ length: 51 }, (_, i) => `M${40 + i * 8} 187.6 v${i % 5 === 0 ? 4.4 : 2.2}`).join(" ")} />
        <rect className={s.bdIronFill} x={17} y={183} width={14} height={20} rx={2.5} />
        <rect className={s.bdIronFill} x={449} y={183} width={14} height={20} rx={2.5} />
        <circle className={s.bdSteelDot} cx={24} cy={193} r={2} />
        <circle className={s.bdSteelDot} cx={456} cy={193} r={2} />
      </g>
    </svg>
  )
}

/* ── Окно: вечер, вокзал будущего вдали. ──────────────────────────────────────────────────────────────────────────────────── */

const STARS: [number, number, number][] = [
  [24, 30, 0.7], [62, 22, 0.9], [96, 30, 0.6], [118, 20, 0.8], [134, 44, 0.6], [74, 52, 0.5], [108, 62, 0.8], [26, 84, 0.6],
  [138, 86, 0.7], [52, 98, 0.5], [90, 92, 0.6], [124, 108, 0.5], [20, 116, 0.5],
]

function WindowArt({ uid }: { uid: string }) {
  const opening = "M14 222 V80 A66 66 0 0 1 146 80 V222 Z"
  return (
    <svg viewBox="0 0 160 252" aria-hidden="true" className={s.bdWinSvg}>
      <defs>
        <clipPath id={`${uid}-win`}>
          <path d={opening} />
        </clipPath>
        <linearGradient id={`${uid}-sky`} x1="0" y1="14" x2="0" y2="172" gradientUnits="userSpaceOnUse">
          <stop offset="0" className={s.bdSkyTop} />
          <stop offset="0.5" className={s.bdSkyMid} />
          <stop offset="0.86" className={s.bdSkyLow} />
          <stop offset="1" className={s.bdSkyGlow} />
        </linearGradient>
        <radialGradient id={`${uid}-clock`} cx="80" cy="140" r="16" gradientUnits="userSpaceOnUse">
          <stop offset="0" className={s.bdGlowIn} />
          <stop offset="1" className={s.bdGlowOut} />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${uid}-win)`}>
        <rect x={0} y={0} width={160} height={180} fill={`url(#${uid}-sky)`} />
        {STARS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} className={s.bdStar} cx={x} cy={y} r={r} />
        ))}
        {/* планета с кольцом — тот же знак неба, что на первом экране */}
        <circle className={s.bdPlanet} cx={38} cy={54} r={7.5} />
        <ellipse className={s.bdPlanetRing} cx={38} cy={54} rx={14} ry={3.6} transform="rotate(-18 38 54)" />
        <g transform="translate(80 172) scale(1.35) translate(-80 -172)">
        {/* далёкий город и вокзал будущего: крылья со светом, стеклянный свод, часы, орбита */}
        <path className={s.bdCity} d="M14 172 V164 H22 V160 H30 V165 H40 V162 H46 V172 Z M114 172 V161 H122 V165 H130 V158 H138 V166 H146 V172 Z" />
        <path className={s.bdWing} d="M14 172 V155 H60 V172 Z M100 172 V155 H146 V172 Z" />
        <path className={s.bdWingGlass} d="M16 159 H58 V169 H16 Z M102 159 H144 V169 H102 Z" />
        <path className={s.bdMullion} d="M22 159 V169 M28 159 V169 M34 159 V169 M40 159 V169 M46 159 V169 M52 159 V169 M108 159 V169 M114 159 V169 M120 159 V169 M126 159 V169 M132 159 V169 M138 159 V169" />
        <path className={s.bdRoofLine} d="M14 155 H60 M100 155 H146" />
        <path className={s.bdDome} d="M58 172 V150 Q58 119.5 80 118 Q102 119.5 102 150 V172 Z" />
        <path className={s.bdDomeRib} d="M65 172 V140 M72 172 V126 M80 172 V118 M88 172 V126 M95 172 V140 M58 150 Q80 140 102 150 M59 136 Q80 128 101 136" />
        <path className={s.bdDomeEdge} d="M58 172 V150 Q58 119.5 80 118 Q102 119.5 102 150 V172" />
        <path className={s.bdDomeEdge} d="M76 118 Q76 112 80 112 Q84 112 84 118 M80 112 V106" />
        <circle className={s.bdBeacon} cx={80} cy={105.5} r={1.4} />
        <circle cx={80} cy={140} r={16} fill={`url(#${uid}-clock)`} />
        <circle className={s.bdClockFace} cx={80} cy={140} r={7.6} />
        <path className={s.bdClockHands} d="M80 140 V134.6 M80 140 L84 141.6" />
        <ellipse className={s.bdOrbit} cx={80} cy={133} rx={35} ry={6.4} transform="rotate(-9 80 133)" />
        <circle className={s.bdSat} cx={113.5} cy={127.8} r={1.5} />
        <path className={s.bdDoor} d="M75 164 H85 V172 H75 Z" />
        </g>
        {/* земля, пути к вокзалу, светофоры */}
        <rect className={s.bdGround} x={0} y={172} width={160} height={60} />
        <path className={s.bdTrack} d="M26 222 L76 172 M46 222 L78 172 M114 222 L82 172 M134 222 L84 172" />
        <path className={s.bdSleeper} d="M66 182 H71 M60 190 H68 M50 202 H63 M89 182 H94 M92 190 H100 M97 202 H110" />
        <path className={s.bdSignalPost} d="M122 172 V159 M36 172 V161" />
        <circle className={s.bdSignalGo} cx={122} cy={158} r={1.7} />
        <circle className={s.bdSignalStop} cx={36} cy={160} r={1.6} />
        {/* блики на стекле */}
        <path className={s.bdGlare} d="M92 222 L146 168 V184 L108 222 Z M14 132 L56 90 V100 L14 142 Z" />
      </g>
      {/* откос, переплёт, наличник, подоконник */}
      <path className={s.bdReveal} d="M14 222 V80 A66 66 0 0 1 146 80 V86 A60 60 0 0 0 20 86 V222 Z" />
      <path className={s.bdSash} d="M80 14 V222 M14 80 H146 M14 127 H146 M14 174 H146 M80 80 L33.3 33.3 M80 80 L126.7 33.3 M68 80 A12 12 0 0 1 92 80" />
      <path className={s.bdCasing} d={`M7 226 V80 A73 73 0 0 1 153 80 V226 Z ${opening}`} fillRule="evenodd" />
      <path className={s.bdCasingShade} d="M146 80 V222 H153 V80 A73 73 0 0 0 151.6 66 L144.8 68.6 A66 66 0 0 1 146 80 Z" />
      <path className={s.bdSill} d="M2 222 H158 V229 Q158 234 153 234 H7 Q2 234 2 229 Z" />
      <path className={s.bdSillShade} d="M8 234 H152 L146 241 H14 Z" />
    </svg>
  )
}

/* ── Мастерская: щит с инструментами, верстак, тиски, модель паровоза. ─────────────────────────────────────────────────── */

function Ghost({ box, children }: { box: Box; children: ReactNode }) {
  return <g className={s.bdGhost} transform={`translate(${box.x} ${box.y})`}>{children}</g>
}

function Hook({ x, y }: { x: number; y: number }) {
  return <path className={s.bdHook} d={`M${x - 3} ${y} H${x + 2} Q${x + 4.5} ${y} ${x + 4.5} ${y - 3.5}`} />
}

function ShopArt({ uid }: { uid: string }) {
  return (
    <svg viewBox={`0 0 ${SHOP_W} ${SHOP_H}`} aria-hidden="true" className={s.bdShopSvg}>
      <defs>
        <pattern id={`${uid}-holes`} width={11} height={11} patternUnits="userSpaceOnUse" x={2} y={2}>
          <circle className={s.bdPegHole} cx={5.5} cy={5.5} r={1.45} />
        </pattern>
      </defs>
      {/* перфорированный щит */}
      <rect className={s.bdWoodFill} x={8} y={2} width={314} height={148} rx={4} />
      <rect className={s.bdPeg} x={13} y={7} width={304} height={138} rx={2} />
      <rect x={13} y={7} width={304} height={138} rx={2} fill={`url(#${uid}-holes)`} />
      {[[17, 11], [313, 11], [17, 141], [313, 141]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} className={s.bdSteelDot} cx={cx} cy={cy} r={1.9} />
      ))}
      {/* нарисованные контуры — под каждым инструментом */}
      <Ghost box={TOOL.hammer}><HammerArt /></Ghost>
      <Ghost box={TOOL.driverA}><DriverArt tone="a" /></Ghost>
      <Ghost box={TOOL.pliers}><PliersArt /></Ghost>
      <Ghost box={TOOL.driverB}><DriverArt tone="b" /></Ghost>
      <Ghost box={TOOL.saw}><SawArt /></Ghost>
      <Ghost box={TOOL.wrench}><WrenchArt /></Ghost>
      {/* крючки */}
      <Hook x={TOOL.hammer.x + 27} y={TOOL.hammer.y + 4} />
      <Hook x={TOOL.driverA.x + 8} y={TOOL.driverA.y + 1} />
      <Hook x={TOOL.pliers.x + 24} y={TOOL.pliers.y + 2} />
      <Hook x={TOOL.driverB.x + 8} y={TOOL.driverB.y + 1} />
      <Hook x={TOOL.saw.x + 33} y={TOOL.saw.y + 9} />
      <Hook x={TOOL.wrench.x + 14} y={TOOL.wrench.y + 4} />
      {/* отвёртки и ключ висят на своих местах (не кнопки) */}
      <g transform={`translate(${TOOL.driverA.x} ${TOOL.driverA.y})`} className={s.bdHung}><DriverArt tone="a" /></g>
      <g transform={`translate(${TOOL.driverB.x} ${TOOL.driverB.y})`} className={s.bdHung}><DriverArt tone="b" /></g>
      <g transform={`translate(${TOOL.wrench.x} ${TOOL.wrench.y})`} className={s.bdHung}><WrenchArt /></g>

      <g transform="translate(0 32)">
      {/* верстак: столешница, фартук с ящиком, ноги, нижняя полка, ящик для инструментов */}
      <ellipse className={s.bdFloorShadow} cx={165} cy={297} rx={168} ry={5} />
      <path className={s.bdWoodLoFill} d="M40 188 H50 V286 H40 Z M280 188 H290 V286 H280 Z" />
      <path className={s.bdWoodLoFill} d="M18 254 H312 V263 H18 Z" />
      <path className={s.bdWoodHiStroke} d="M18 254.6 H312" />
      <g className={s.bdToolbox}>
        <path className={s.bdBoxBody} d="M218 232 H288 V254 H218 Z" />
        <path className={s.bdBoxLid} d="M216 226 H290 V234 H216 Z" />
        <path className={s.bdBoxHandle} d="M240 226 V220 H266 V226" />
        <path className={s.bdSteelDotFill} d="M250 236 H256 V242 H250 Z" />
      </g>
      <path className={s.bdOak} d="M16 188 H32 V296 H16 Z M298 188 H314 V296 H298 Z" />
      <path className={s.bdOakLoFill} d="M28 188 H32 V296 H28 Z M310 188 H314 V296 H310 Z" />
      <path className={s.bdWoodFill} d="M8 188 H322 V204 H8 Z" />
      <path className={s.bdOak} d="M128 191 H206 V202 H128 Z" />
      <circle className={s.bdBrassFill} cx={167} cy={196.5} r={2.6} />
      <path className={s.bdOakHi} d="M0 165 H330 V172 H0 Z" />
      <path className={s.bdOak} d="M0 172 H330 V189 H0 Z" />
      <path className={s.bdGrainOnOak} d="M30 178 Q90 175 150 179 T270 177 M60 184 Q120 182 190 185 T320 183" />
      <path className={s.bdOakLoFill} d="M0 165 H5 V189 H0 Z" />

      {/* модель паровоза с чертежа на кусочке пути */}
      <g className={s.bdModel}>
        <path className={s.bdModelRail} d="M140 164.5 H262" />
        <path className={s.bdModelSleeper} d={Array.from({ length: 13 }, (_, i) => `M${144 + i * 9.4} 165 h5`).join(" ")} />
        <path className={s.bdModelDark} d="M160 148 H246 V153 H160 Z M158 152 L150 164 H163 Z" />
        <path className={s.bdModelBody} d="M168 132 H222 V148 H168 Z" />
        <path className={s.bdModelShine} d="M170 135.2 H220" />
        <path className={s.bdModelGold} d="M184 132 V148 M200 132 V148 M214 132 V148" />
        <path className={s.bdModelDark} d="M161 129 H172 V148 H161 Z M165.5 119 H171.5 V129 H165.5 Z" />
        <path className={s.bdModelGoldFill} d="M163.6 117 H173.4 V120.6 H163.6 Z M192 132 Q192 125.5 197 125.5 Q202 125.5 202 132 Z" />
        <path className={s.bdModelCab} d="M222 124 H244 V152 H222 Z" />
        <path className={s.bdModelDark} d="M219.5 121 H246.5 V125 H219.5 Z" />
        <path className={s.bdModelWindow} d="M227 129 H239 V139 H227 Z" />
        <circle className={s.bdModelLamp} cx={162.5} cy={127} r={2.1} />
        {[184, 199.5, 215].map((cx) => (
          <g key={cx}>
            <circle className={s.bdModelWheel} cx={cx} cy={157} r={6.6} />
            <circle className={s.bdModelHub} cx={cx} cy={157} r={1.7} />
          </g>
        ))}
        <circle className={s.bdModelWheel} cx={168} cy={159.4} r={4.4} />
        <circle className={s.bdModelWheel} cx={234} cy={158.6} r={5.2} />
        <path className={s.bdModelRod} d="M184 159.5 H215" />
      </g>

      {/* стружка у тисков */}
      <path className={s.bdShaving} d="M92 165 q3 -6 7 -2 q2 3 -2 4 M104 166 q2 -5 6 -3 q3 2 0 4 q-3 1 -3 -2 M116 165.5 q4 -4 7 -1" />

      {/* тиски слева: основание, подвижная и неподвижная губки, винт с воротком, брусок в губках */}
      <g className={s.bdVise}>
        <path className={s.bdOakHi} d="M41.5 104 H51.5 V148 H41.5 Z" />
        <path className={s.bdGrainOnOak} d="M44 108 Q45.5 124 44.4 144 M48.6 110 Q49.6 126 48.8 142" />
        <path className={s.bdIronFill} d="M28 158 H78 Q80 158 80 160 V166 H26 V160 Q26 158 28 158 Z" />
        <path className={s.bdIronFill} d="M18 144 H78 V158 H18 Z" />
        <path className={s.bdIronFill} d="M51.5 124 H76 V158 H51.5 Z M60 118 H80 V124 H60 Z" />
        <path className={s.bdIronFill} d="M20 128 H41.5 V158 H20 Z" />
        <path className={s.bdJaw} d="M38.5 128 H41.5 V141 H38.5 Z M51.5 124 H54.5 V141 H51.5 Z" />
        <path className={s.bdIronEdge} d="M20.6 128.8 H41 M52 124.8 H75.4 M60.6 118.8 H79.4 M18.6 144.8 H38" />
        <path className={s.bdSteelFill} d="M3 147 H20 V153 H3 Z" />
        <path className={s.bdThread} d="M6 147 l2 6 M9.5 147 l2 6 M13 147 l2 6 M16.5 147 l2 6" />
        <path className={s.bdTbar} d="M5 126 V172" />
        <circle className={s.bdSteelFill} cx={5} cy={124} r={3.2} />
        <circle className={s.bdSteelFill} cx={5} cy={174} r={3.2} />
      </g>
      </g>
    </svg>
  )
}

function Floor() {
  // Доски пола сходятся к окну (точка схода над полом), стыки реже к зрителю.
  const lines = Array.from({ length: 22 }, (_, i) => {
    const xb = -620 + i * 112
    const xt = 545 + (xb - 545) * 0.6455
    return `M${xt.toFixed(1)} 0 L${xb} 78`
  }).join(" ")
  return (
    <svg viewBox="0 0 1000 78" preserveAspectRatio="none" aria-hidden="true" className={s.bdFloorSvg}>
      <rect className={s.bdFloorBase} x={0} y={0} width={1000} height={78} />
      <path className={s.bdFloorLine} d={`${lines} M0 9 H1000 M0 21 H1000 M0 37 H1000 M0 58 H1000`} />
    </svg>
  )
}

export function BuildersOffice({ w, docHref }: { w: BuildersWords; docHref: string }) {
  const info = useId()
  const uid = `bd${useId().replace(/[^a-zA-Z0-9]/g, "")}`

  return (
    <div data-block="bdrom" className={s.bdRoom}>
      <p data-block="bdsrt" className={s.asSr}>{w.scene}</p>

      {/* Чертёжная: свод, стена с панелями, окно с вокзалом, лампа, доска. */}
      <div data-block="bdhal" className={s.bdHall}>
        <span className={s.bdCornice} aria-hidden="true" />
        <span className={s.bdWainscot} aria-hidden="true" />
        <span className={s.bdFloor} aria-hidden="true"><Floor /></span>
        <span className={s.bdWinLight} aria-hidden="true" />
        <div data-block="bdwin" className={s.bdWin} aria-hidden="true">
          <WindowArt uid={uid} />
        </div>
        <span className={s.bdLight} aria-hidden="true" />
        <div data-block="bdlmp" className={s.bdLamp} aria-hidden="true">
          <span className={s.bdWire} />
          <svg viewBox="0 0 120 76" className={s.bdShade}>
            <path className={s.bdShadeCap} d="M52 1 H68 V13 H52 Z" />
            <path className={s.bdShadeBody} d="M10 58 C12 31 33 15 60 15 C87 15 108 31 110 58 Z" />
            <path className={s.bdShadeShine} d="M19 52 C21 35 35 23 54 20" />
            {[[44, 28], [52, 26.5], [60, 26], [68, 26.5], [76, 28], [33, 38], [42, 36], [51, 35], [60, 34.7], [69, 35], [78, 36], [87, 38], [25, 49], [34, 47], [43, 46], [52, 45.4], [60, 45.2], [68, 45.4], [77, 46], [86, 47], [95, 49]].map(([x, y]) => (
              <circle key={`${x}-${y}`} className={s.bdShadeHole} cx={x} cy={y} r={y < 30 ? 1.7 : y < 40 ? 2 : 2.3} />
            ))}
            <path className={s.bdShadeLace} d={Array.from({ length: 12 }, (_, i) => `M${11 + i * 8.2} 58 a4.1 4.1 0 0 0 8.2 0`).join(" ")} />
            <path className={s.bdShadeRim} d="M8 58 H112" />
            <ellipse className={s.bdBulb} cx={60} cy={63} rx={12} ry={7} />
          </svg>
        </div>
        <Button variant="bare" size="bare" type="button" data-block="bdbrd" className={s.bdBoard} popoverTarget={info} aria-label={w.boardLabel}>
          <Board sheet={w.sheet} uid={uid} />
        </Button>
      </div>

      {/* Мастерская: щит с инструментами, под ним верстак, тиски слева. */}
      <div data-block="bdshp" className={s.bdShop}>
        <div data-block="bdbch" className={s.bdShopArt}>
          <ShopArt uid={uid} />
          <Button variant="bare" size="bare" type="button" data-block="bdham" className={s.bdTool} style={at(TOOL.hammer)} popoverTarget={info} aria-label={w.hammer}>
            <svg viewBox={`0 0 ${TOOL.hammer.w} ${TOOL.hammer.h}`} aria-hidden="true" className={s.bdToolSvg}><HammerArt /></svg>
          </Button>
          <Button variant="bare" size="bare" type="button" data-block="bdplr" className={s.bdTool} style={at(TOOL.pliers)} popoverTarget={info} aria-label={w.pliers}>
            <svg viewBox={`0 0 ${TOOL.pliers.w} ${TOOL.pliers.h}`} aria-hidden="true" className={s.bdToolSvg}><PliersArt /></svg>
          </Button>
          <Button variant="bare" size="bare" type="button" data-block="bdsaw" className={s.bdTool} style={at(TOOL.saw)} popoverTarget={info} aria-label={w.saw}>
            <svg viewBox={`0 0 ${TOOL.saw.w} ${TOOL.saw.h}`} aria-hidden="true" className={s.bdToolSvg}><SawArt /></svg>
          </Button>
        </div>
      </div>

      {/* Окно справки — слева (зеркало окна антиспама), один абзац и ссылка в документацию. */}
      <div data-block="bdinf" id={info} popover="auto" className={s.bdInfo} role="dialog" aria-labelledby={`${info}-t`}>
        <p data-block="bdift" id={`${info}-t`} className={s.asInfoTitle}>{w.infoTitle}</p>
        <p data-block="bdifp" className={s.asInfoText}>{w.info}</p>
        <div data-block="bdifa" className={s.asInfoActions}>
          <a className={s.asInfoMore} href={docHref}>{w.more}</a>
          <Button variant="bare" size="bare" type="button" className={s.asInfoClose} popoverTarget={info} popoverTargetAction="hide">{w.close}</Button>
        </div>
      </div>
    </div>
  )
}
