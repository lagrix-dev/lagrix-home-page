"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import s from "./landing-agent.module.css"

// КОМНАТА «ТЕЛЕГРАФ» (владелец 2026-10-14, навык impeccable, путь «Launcher unavailable»): «место где сидит связист вывеска
// телеграф … переключатель … как классический рычаг переключения направления движения и скорости на корабле … на стене … две таблички
// … болты … нажатие на табличку приводит к переключению рычага … человек чеканит текст и справа налево бежит бегущая строка …
// включаться в тот момент когда … попадает фокус в экран … пауза длиной в 1 секунду … по нижнему краю помещения … светящийся».
//
// Мир — тот же вокзал (DIRECTION.md): плоская сцена в ролях табло, как зал ожидания. Одно авторское движение — бегущая строка с ключом
// связиста; рычаг машинного телеграфа поворачивается к выбранной табличке. Без JavaScript строка стоит на месте и читается целиком;
// при «уменьшить движение» строка не бежит, а печатается на месте.

export type TelegraphMode = { plate: string; caption: string; ticker: string }
export type TelegraphWords = { scene: string; switchLabel: string; h2h: TelegraphMode; h2a: TelegraphMode }

type Key = "h2h" | "h2a"
const SPEED = 150 // пикселей в секунду — строка бежит быстрее поезда, но её удобно читать

export function TelegraphRoom({ w }: { w: TelegraphWords }) {
  const [mode, setMode] = useState<Key>("h2h")
  const [shown, setShown] = useState<Key>("h2h")
  const [visible, setVisible] = useState(false)
  const [run, setRun] = useState(false)
  const room = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLParagraphElement>(null)
  const timer = useRef<number | null>(null)

  // Фокус экрана: строка и ключ оживают, когда комната видна, и замирают, когда её прокрутили.
  useEffect(() => {
    const el = room.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => { if (visible && mode === shown && timer.current === null) setRun(true) }, [visible, mode, shown])

  // Длина пути строки — от правого края полосы до ухода последней буквы за левый; скорость постоянная.
  useLayoutEffect(() => {
    const b = band.current, l = line.current
    if (!b || !l) return
    const from = b.clientWidth, to = -l.scrollWidth
    l.style.setProperty("--from", `${from}px`)
    l.style.setProperty("--to", `${to}px`)
    l.style.setProperty("--dur", `${((from - to) / SPEED).toFixed(2)}s`)
  }, [shown, run])

  const pick = useCallback((next: Key) => {
    if (next === mode) return
    setMode(next)
    setRun(false)
    if (timer.current !== null) window.clearTimeout(timer.current)
    // Пауза в одну секунду: рычаг переложен, связист заново берётся за ключ.
    timer.current = window.setTimeout(() => {
      timer.current = null
      setShown(next)
      setRun(true)
    }, 1000)
  }, [mode])

  useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current) }, [])

  const plate = (k: Key, x: number) => (
    <g
      className={s.tgPlate}
      transform={`translate(${x} 22)`}
      role="button"
      tabIndex={0}
      aria-pressed={mode === k}
      aria-label={`${w.switchLabel}: ${w[k].plate} — ${w[k].caption}`}
      data-on={mode === k ? "" : undefined}
      onClick={() => pick(k)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(k) } }}
    >
      <rect className={s.tgPlateFace} width={150} height={92} rx={4} />
      <circle className={s.tgBolt} cx={12} cy={12} r={4.5} />
      <circle className={s.tgBolt} cx={138} cy={12} r={4.5} />
      <circle className={s.tgBolt} cx={12} cy={80} r={4.5} />
      <circle className={s.tgBolt} cx={138} cy={80} r={4.5} />
      <text className={s.tgPlateCode} x={75} y={50} textAnchor="middle">{w[k].plate}</text>
      <text className={s.tgPlateCaption} x={75} y={72} textAnchor="middle">{w[k].caption}</text>
    </g>
  )

  return (
    <div data-block="tgrom" ref={room} className={s.tgRoom} data-mode={mode} data-run={run && visible ? "" : undefined}>
      <svg viewBox="0 0 1000 420" className={s.roomSvg} role="img" aria-label={w.scene}>
        <rect className={s.roomFloor} x={0} y={330} width={1000} height={90} />
        <path className={s.roomSkirt} d="M0 330 H1000" />

        {/* Знак Telegram на стене — бумажный самолётик в круге, в рамке */}
        <rect className={s.tgFrame} x={96} y={58} width={120} height={120} rx={6} />
        <circle className={s.tgLogo} cx={156} cy={118} r={42} />
        <path className={s.tgPlane} d="M131 116 L181 96 L173 141 L158 128 L150 138 L149 124 L172 104 L145 121 Z" />

        {/* Стол связиста и телеграфный ключ */}
        <rect className={s.tgDesk} x={250} y={226} width={300} height={16} rx={3} />
        <path className={s.chairLeg} d="M270 242 V330 M530 242 V330" />
        <rect className={s.tgKeyBase} x={420} y={212} width={86} height={14} rx={3} />
        <g className={s.tgKeyArm}>
          <rect className={s.tgKeyBar} x={428} y={200} width={70} height={7} rx={3} />
          <circle className={s.tgKeyKnob} cx={432} cy={196} r={8} />
        </g>
        {/* Лента с отпечатанным текстом выходит из аппарата к краю стола */}
        <rect className={s.tgSounder} x={330} y={190} width={56} height={36} rx={4} />
        <path className={s.tgTape} d="M330 214 C300 220 286 236 262 240" />

        {/* Связист на стуле, вид сбоку: рука на ключе */}
        <rect className={s.chairBack} x={600} y={168} width={22} height={118} rx={10} />
        <rect className={s.chairSeat} x={540} y={270} width={84} height={18} rx={8} />
        <path className={s.chairLeg} d="M552 288 V330 M612 288 V330" />
        <rect className={s.tgTorso} x={556} y={168} width={50} height={104} rx={24} />
        <path className={s.tgLeg} d="M566 272 H488 V330" />
        <circle className={s.tgHead} cx={578} cy={142} r={26} />
        <path className={s.tgVisor} d="M552 134 H604 M556 134 Q560 112 584 114" />
        <g className={s.tgHand}>
          <path className={s.tgArm} d="M566 196 Q520 214 440 194" />
        </g>

        {/* Машинный телеграф, вид сбоку: тумба, циферблат, рычаг к выбранной табличке */}
        <rect className={s.tgPedestal} x={812} y={214} width={36} height={116} rx={6} />
        <rect className={s.tgFoot} x={792} y={318} width={76} height={14} rx={4} />
        <circle className={s.tgDial} cx={830} cy={200} r={42} />
        <path className={s.tgDialTicks} d="M830 164 V174 M800 182 L808 188 M860 182 L852 188" />
        <g className={s.tgLever}>
          <path className={s.tgLeverArm} d="M830 200 V132" />
          <rect className={s.tgLeverGrip} x={818} y={108} width={24} height={28} rx={10} />
        </g>
        <circle className={s.clockPin} cx={830} cy={200} r={7} />

        {plate("h2h", 660)}
        {plate("h2a", 850)}
      </svg>

      {/* Бегущая строка — нижний край комнаты, вплотную под сценой. Без JS — стоит и читается; ключ стучит, пока строка бежит. */}
      <div data-block="tgtkr" ref={band} className={s.tgBand}>
        <p data-block="tgln1" ref={line} key={`${shown}-${run}`} className={s.tgLine}>{w[shown].ticker}</p>
      </div>
    </div>
  )
}
