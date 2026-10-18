"use client"

import { useId } from "react"
import { Button } from "@/components/ui/button"
import s from "./landing-agent.module.css"

// СЦЕНА «СТРОИТЕЛЬНЫЙ ДЕПАРТАМЕНТ» (владелец 2026-10-18, шаг 521, навык impeccable, путь «Launcher unavailable»): «помещение оформленное
// в стиле Старых кабинетов инженера где в центре стоит большая чертёжный доска с чертежами видно что тот кто чертил на этой доске он
// чертил поезд. Помещение будет иметь скругленный потолки незначительно и в центре будет свисать традиционной для тех времён алюминиевая
// ажур на струне из которого рассекается свет на чертёжной доску … молоток, пассатижи пила … окна в этом помещении нет. При наведении на
// чертёжной доску или на инструмента они увеличиваются в размере и при нажатии слева появляется такой же информационная окно какое оно у
// нас появляется справа в антиспам секции».
//
// Мир — тот же вокзал (DIRECTION.md): роли табло, плаката, сигнала и мела; кабинет — тёмная комната, которую освещает только лампа.
// Одно авторское движение — увеличение предмета под рукой; окно справки выезжает слева. Сцена — слои в контейнере с единицами cqw/cqh.
// Без JavaScript окно открывается встроенным popover браузера; при «уменьшить движение» предметы и окно не двигаются.

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

/** Чертёж паровоза в профиль — тонкие линии чернил на листе, размерные линии цвета сигнала. */
function LocoDrawing() {
  return (
    <g className={s.bdLoco}>
      {/* рама, котёл, дымовая коробка, труба, сухопарник, будка */}
      <path d="M40 150 H330" />
      <rect x={70} y={98} width={180} height={44} rx={14} />
      <rect x={250} y={86} width={62} height={58} rx={4} />
      <path d="M262 86 V70 H302 V86 M258 70 H306" />
      <rect x={92} y={70} width={20} height={28} rx={3} />
      <path d="M86 70 H118" />
      <path d="M150 98 Q160 80 172 98" />
      <path d="M50 150 L36 168 H70" />
      <rect x={270} y={96} width={26} height={20} rx={2} />
      {/* колёса и спарник */}
      {[110, 160, 210].map((x) => (
        <g key={x}>
          <circle cx={x} cy={160} r={20} />
          <circle cx={x} cy={160} r={4} />
        </g>
      ))}
      <circle cx={68} cy={166} r={10} />
      <circle cx={290} cy={166} r={12} />
      <path d="M104 166 L216 166" />
    </g>
  )
}

function Dimensions() {
  return (
    <g className={s.bdDim}>
      <path d="M70 52 H312 M70 46 V58 M312 46 V58" />
      <path d="M78 52 l-8 -3 v6 Z M304 52 l8 -3 v6 Z" />
      <path d="M346 98 V150 M340 98 H352 M340 150 H352" />
      <text x={191} y={44} textAnchor="middle">12 400</text>
      <text x={358} y={128}>3 050</text>
    </g>
  )
}

function Hammer() {
  return (
    <svg viewBox="0 0 80 160" aria-hidden="true" className={s.bdToolSvg}>
      <rect className={s.bdHandle} x={34} y={34} width={12} height={120} rx={5} />
      <path className={s.bdSteel} d="M10 14 H58 Q70 14 72 24 L74 34 H10 Q4 34 4 24 Q4 14 10 14 Z" />
      <path className={s.bdSteelEdge} d="M58 14 Q72 6 78 18" />
      <path className={s.bdShine} d="M14 20 H52" />
    </svg>
  )
}

function Pliers() {
  return (
    <svg viewBox="0 0 80 160" aria-hidden="true" className={s.bdToolSvg}>
      <path className={s.bdGrip} d="M30 76 Q20 120 22 152 Q26 158 32 152 Q34 118 40 84 Z" />
      <path className={s.bdGrip} d="M50 76 Q60 120 58 152 Q54 158 48 152 Q46 118 40 84 Z" />
      <path className={s.bdSteel} d="M33 80 L36 18 Q40 8 44 18 L47 80 Z" />
      <path className={s.bdSteelEdge} d="M40 14 V64" />
      <circle className={s.bdPivot} cx={40} cy={74} r={7} />
    </svg>
  )
}

function Saw() {
  const teeth = Array.from({ length: 13 }, (_, i) => `L${18 + i * 4} ${i % 2 === 0 ? 150 : 156}`).join(" ")
  return (
    <svg viewBox="0 0 80 170" aria-hidden="true" className={s.bdToolSvg}>
      <path className={s.bdSteel} d={`M16 48 L64 48 L66 150 ${teeth} L16 150 Z`} />
      <path className={s.bdShine} d="M24 60 V138" />
      <path className={s.bdHandle} d="M10 6 H70 Q76 6 76 12 V44 Q76 52 68 52 H12 Q4 52 4 44 V12 Q4 6 10 6 Z" />
      <rect className={s.bdHandleHole} x={18} y={16} width={44} height={22} rx={10} />
    </svg>
  )
}

export function BuildersOffice({ w, docHref }: { w: BuildersWords; docHref: string }) {
  const info = useId()

  return (
    <div data-block="bdrom" className={s.bdRoom}>
      <p data-block="bdsrt" className={s.asSr}>{w.scene}</p>

      {/* Свод потолка, карниз и тёмный пол; окон нет. */}
      <span className={s.bdCornice} aria-hidden="true" />
      <span className={s.bdFloor} aria-hidden="true" />

      {/* Лампа на струне — ажурный алюминиевый колпак; конус света падает на доску. */}
      <div data-block="bdlmp" className={s.bdLamp} aria-hidden="true">
        <span className={s.bdWire} />
        <svg viewBox="0 0 120 70" className={s.bdShade}>
          <path className={s.bdShadeBody} d="M50 4 H70 V12 Q112 22 116 58 H4 Q8 22 50 12 Z" />
          {[[34, 34], [48, 30], [60, 29], [72, 30], [86, 34], [26, 46], [42, 43], [60, 42], [78, 43], [94, 46]].map(([x, y]) => (
            <circle key={`${x}-${y}`} className={s.bdShadeHole} cx={x} cy={y} r={3.2} />
          ))}
          <path className={s.bdShadeRim} d="M4 58 H116" />
          <ellipse className={s.bdBulb} cx={60} cy={62} rx={13} ry={8} />
        </svg>
      </div>
      <span className={s.bdLight} aria-hidden="true" />

      {/* Чертёжная доска на стойке — в свете лампы; чертёж паровоза. Нажатие открывает окно слева. */}
      <Button variant="bare" size="bare" type="button" data-block="bdbrd" className={s.bdBoard} popoverTarget={info} aria-label={w.boardLabel}>
        <svg viewBox="0 0 420 300" aria-hidden="true" className={s.bdBoardSvg}>
          <path className={s.bdStand} d="M120 232 L84 300 M300 232 L336 300 M98 272 H322" />
          <path className={s.bdBoardFrame} d="M28 18 H392 L408 236 H12 Z" />
          <path className={s.bdPaper} d="M44 30 H376 L390 222 H30 Z" />
          <g transform="translate(18 20)">
            <Dimensions />
            <LocoDrawing />
          </g>
          <rect className={s.bdStamp} x={258} y={186} width={118} height={30} />
          <text className={s.bdStampText} x={317} y={206} textAnchor="middle">{w.sheet}</text>
          <path className={s.bdRuler} d="M20 240 H400" />
          <path className={s.bdSquare} d="M62 40 V214 M62 40 H96" />
        </svg>
      </Button>

      {/* Инструменты на стойке у стены — с другой стороны от доски. */}
      <div data-block="bdtls" className={s.bdTools}>
        <span className={s.bdRack} aria-hidden="true" />
        <Button variant="bare" size="bare" type="button" data-block="bdham" className={s.bdTool} data-tool="hammer" popoverTarget={info} aria-label={w.hammer}>
          <Hammer />
        </Button>
        <Button variant="bare" size="bare" type="button" data-block="bdplr" className={s.bdTool} data-tool="pliers" popoverTarget={info} aria-label={w.pliers}>
          <Pliers />
        </Button>
        <Button variant="bare" size="bare" type="button" data-block="bdsaw" className={s.bdTool} data-tool="saw" popoverTarget={info} aria-label={w.saw}>
          <Saw />
        </Button>
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
