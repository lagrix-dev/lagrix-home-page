"use client"

import { useEffect, useRef, useState } from "react"
import s from "./landing-agent.module.css"
import { CrabShape } from "./crab"

// КРАБИКИ У ДВЕРЕЙ ВОКЗАЛА (узел, шаг 477). Владелец 2026-10-14: «при наведении фокуса на центральный вестибюль, а точнее на его
// двери, они анимированно открываются … слева и справа за стеклом вокзала появляются крабики Claude Code … шесть штук по три с
// каждой стороны … бегут со скоростью анимированных людей, которые ходят по нижней кромке экрана … за стеклом их не очень хорошо
// видно, но когда подбегают к открывшимся дверям, их видно полностью … забираются друг на дружку: три внизу, на них два, на них
// один, и через секунду после того, как собрались, у них появляются флажки … не перекрывали друг друга … разной высоты … на флажках
// написано «агент». Если же в этот момент люди убирают фокус от двери, крабики начинают разбегаться наружу».
// 🔒 Координаты — рисунка фасада (2880 × 900): слой лежит ровно поверх него, под растяжками и стеклом крыльев (поэтому в крыльях
// крабики за стеклом). Скорость — 80 px/с экрана, как у пассажиров (`walkers.client.tsx`), пересчитанная в единицы рисунка.
// Только широкий экран (на телефоне фасад обрезан и наведения нет). При «уменьшить движение» — сразу пирамида с флажками.

const SPEED = 80
const ROW = [798, 762, 726]
const SCALE = 1.2
// Сторона, откуда бежит, место в пирамиде, флажок (сторона и высота) — флажки по обе стороны пирамиды, у каждого своя высота;
// все ниже таблички «Вход в будущее» (замерено: на 660 верхние флажки уходили под неё).
// 477 (владелец): «крабики бегут слишком близко … между ними должно быть пространство» — старты через 140 единиц (крабик — 77),
// скорость одна, поэтому промежутки держатся всю дорогу. «В фокусе должны появляться только тогда, когда появятся в открытых
// дверях» — `edge` теперь край дверного проёма (1330 / 1550), а не край крыла: до него крабик за стеклом, приглушён.
const SPEC = [
  { start: 900, edge: 1330, tx: 1370, row: 0, flagSide: -1, flagY: 748 },
  { start: 760, edge: 1330, tx: 1405, row: 1, flagSide: -1, flagY: 712 },
  { start: 620, edge: 1330, tx: 1440, row: 2, flagSide: -1, flagY: 676 },
  { start: 1980, edge: 1550, tx: 1510, row: 0, flagSide: 1, flagY: 766 },
  { start: 2120, edge: 1550, tx: 1440, row: 0, flagSide: 1, flagY: 730 },
  { start: 2260, edge: 1550, tx: 1475, row: 1, flagSide: 1, flagY: 694 },
] as const
const FLAG_INNER = { "-1": 1322, "1": 1558 } as const
const FLAG_W = 92

type Crab = { x: number; y: number; o: number; dur: number; walk: boolean }
const hidden = (): Crab[] => SPEC.map((c) => ({ x: c.start, y: ROW[0], o: 0, dur: 0, walk: false }))

export function DoorCrabs({ flag }: { flag: string }) {
  const svg = useRef<SVGSVGElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const [crabs, setCrabs] = useState<Crab[]>(hidden)
  const [doors, setDoors] = useState(false)
  const [flags, setFlags] = useState(false)
  const active = useRef(false)
  // Последнее назначенное положение каждого крабика — от него считается путь наружу.
  const now = useRef(crabs)
  now.current = crabs

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (ms: number, fn: () => void) => { timers.current.push(setTimeout(fn, ms)) }
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  const setOne = (i: number, patch: Partial<Crab>) => setCrabs((cs) => cs.map((c, k) => (k === i ? { ...c, ...patch } : c)))
  // Единиц рисунка в секунду: 80 px экрана ÷ (высота рисунка на экране / 900).
  const ups = () => SPEED / Math.max(0.2, (svg.current?.getBoundingClientRect().height ?? 700) / 900)

  const assembled = (): Crab[] => SPEC.map((c) => ({ x: c.tx, y: ROW[c.row], o: 1, dur: 0, walk: false }))

  const enter = () => {
    if (active.current) return
    active.current = true
    clear()
    setDoors(true)
    setFlags(false)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCrabs(assembled())
      setFlags(true)
      return
    }
    const v = ups()
    setCrabs(hidden())
    // Появились в крыльях — за стеклом, приглушённо.
    later(260, () => setCrabs((cs) => cs.map((c) => ({ ...c, o: 0.5, dur: 0 }))))
    let floor = 0
    SPEC.forEach((sp, i) => {
      const t1 = 560
      const d1 = Math.abs(sp.edge - sp.start) / v
      const d2 = Math.abs(sp.tx - sp.edge) / v
      later(t1, () => setOne(i, { x: sp.edge, dur: d1, walk: true }))
      // Вышли в открытый дверной проём — видны целиком.
      later(t1 + d1 * 1000, () => setOne(i, { x: sp.tx, o: 1, dur: d2, walk: true }))
      later(t1 + (d1 + d2) * 1000, () => setOne(i, { walk: false, dur: 0 }))
      floor = Math.max(floor, t1 + (d1 + d2) * 1000)
    })
    // Пирамида: сначала средний ряд, потом верхний; через секунду — флажки.
    later(floor + 200, () => SPEC.forEach((sp, i) => sp.row === 1 && setOne(i, { y: ROW[1], dur: 0.5 })))
    later(floor + 800, () => SPEC.forEach((sp, i) => sp.row === 2 && setOne(i, { y: ROW[2], dur: 0.5 })))
    later(floor + 800 + 500 + 1000, () => setFlags(true))
  }

  const leave = () => {
    if (!active.current) return
    active.current = false
    clear()
    setFlags(false)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCrabs(hidden())
      setDoors(false)
      return
    }
    const v = ups()
    // Спрыгнули на пол — и бегут наружу: в проёме видны целиком, дальше — за стеклом зала и крыла, приглушённо; в конце пропадают.
    // ✗ Замерено 2026-10-14: гасить прозрачность сразу — крабики исчезали за полсекунды, вместо того чтобы разбегаться.
    setCrabs((cs) => cs.map((c) => ({ ...c, y: ROW[0], dur: 0.25, walk: false })))
    SPEC.forEach((sp, i) => {
      const from = now.current[i]?.x ?? sp.tx
      const out = sp.start < 1440 ? 300 : 2580
      const d1 = Math.abs(sp.edge - from) / v
      const d2 = Math.abs(out - sp.edge) / v
      later(280, () => setOne(i, { x: sp.edge, dur: d1, walk: true, o: 1 }))
      later(280 + d1 * 1000, () => setOne(i, { x: out, dur: d2, walk: true, o: 0.5 }))
      later(280 + (d1 + d2) * 1000, () => setOne(i, { o: 0, walk: false, dur: 0 }))
    })
    later(900, () => setDoors(false))
  }

  return (
    <>
      <svg ref={svg} className={`${s.facadeSvg} ${s.facadeCrabs}`} viewBox="0 0 2880 900" aria-hidden="true">
        {/* Створки дверей: стекло, разъезжаются в стены. */}
        <g className={s.doorLeaf} style={{ transform: `translateX(${doors ? -94 : 0}px)` }}>
          <rect x={1342} y={602} width={98} height={198} />
          <line x1={1391} y1={602} x2={1391} y2={800} />
        </g>
        <g className={s.doorLeaf} style={{ transform: `translateX(${doors ? 94 : 0}px)` }}>
          <rect x={1440} y={602} width={98} height={198} />
          <line x1={1489} y1={602} x2={1489} y2={800} />
        </g>
        {/* Флажки — позади крабиков: древко от клешни к флажку, флажок снаружи пирамиды, у каждого своя высота. */}
        {SPEC.map((sp, i) => {
          const c = crabs[i]
          const inner = FLAG_INNER[String(sp.flagSide) as "-1" | "1"]
          const x0 = sp.flagSide < 0 ? inner - FLAG_W : inner
          return (
            <g key={`f${i}`} className={s.crabFlag} data-on={flags ? "" : undefined}>
              <line x1={c.x + sp.flagSide * 30 * SCALE} y1={c.y - 22 * SCALE} x2={inner} y2={sp.flagY - 8} />
              <rect x={x0} y={sp.flagY} width={FLAG_W} height={26} />
              <text x={x0 + FLAG_W / 2} y={sp.flagY + 18} textAnchor="middle">{flag}</text>
            </g>
          )
        })}
        {crabs.map((c, i) => (
          <g
            key={i}
            className={s.doorCrab}
            data-walk={c.walk ? "" : undefined}
            style={{ transform: `translate(${c.x}px, ${c.y}px)`, opacity: c.o, transitionDuration: `${c.dur}s, 0.35s` }}
          >
            <g transform={`scale(${SCALE})`}>
              <CrabShape body={s.crabBody} eye={s.crabEye} leg={s.crabLeg} />
            </g>
          </g>
        ))}
      </svg>
      <div data-block="t2igg" className={s.doorZone} aria-hidden="true" onMouseEnter={enter} onMouseLeave={leave} onClick={() => { if (window.matchMedia("(hover: none)").matches) { if (active.current) leave(); else enter() } }} />
    </>
  )
}
