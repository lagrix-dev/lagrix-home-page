"use client"

import { useEffect, useRef, useState } from "react"
import s from "./landing-agent.module.css"

// ЗАЛ ТАМОЖНИ — островок (шаг 467-3, владелец 2026-10-12): «чемоданы едут медленно с такой же скоростью с какой у нас ходят …
// анимированные персонажи … каждый раз когда чемодан заезжает в этот ящик … включается большой дисплей, конвейерная лента
// останавливается … первый контейнер … загорается красным … через 2 секунды … появляется текст как именно мы обходим это
// ограничение … зелёная пульсирующая лампочка, а красный цвет верхнего контейнера становится значительно приглушённым … через
// 5 секунд он выключается и движение транспортной ленты снова происходит».
// Сервер отдаёт неподвижную сцену (чемоданы по местам, на табло первая пара «ответом») — её видно без JavaScript. Оживлённый зал:
// лента 80 px/с (как `SPEED` в `walkers.client.tsx`), чемодан доехал до центра ящика → стоп, «вопрос» 2 с → «ответ» 5 с → табло
// гаснет, лента едет, следующая пара. Время идёт только пока зал на экране. Телефон (лента скрыта стилем) и «меньше движения» —
// ленты нет, табло само листает пары тем же ритмом. Это анимация в браузере посетителя, а не поведение узла.

type Words = { question: string; answer: string; scene: string; items: { q: string; a: string }[] }
type Phase = "off" | "question" | "answer"
type Tone = "poster" | "signal" | "board" | "chalk"

const SPEED = 80
const QUESTION_MS = 2000
const ANSWER_MS = 5000
const OFF_MS = 700 // только без ленты: пауза погасшего табло между парами
const SPACING_REM = 15

// Неподвижная расстановка (сервер): смещение от центра зала в rem. Слева — ждут досмотра, справа — прошли.
const BAGS: { x: number; tone: Tone; w: number }[] = [
  { x: -52, tone: "board", w: 6.2 },
  { x: -41, tone: "signal", w: 5 },
  { x: -31, tone: "poster", w: 6.6 },
  { x: 25, tone: "chalk", w: 5.4 },
  { x: 35, tone: "signal", w: 6 },
  { x: 46, tone: "poster", w: 5.2 },
]
const TONES: Tone[] = ["board", "signal", "poster", "chalk", "signal", "poster", "board", "chalk"]
const WIDTHS = [6.2, 5, 6.6, 5.4, 6, 5.2, 5.8, 6.4]

function Suitcase({ tone, className, style, ref }: { tone: string; className?: string; style?: React.CSSProperties; ref?: React.Ref<SVGSVGElement> }) {
  return (
    <svg ref={ref} className={className} style={style} data-tone={tone} viewBox="0 0 100 86" aria-hidden="true">
      <path className={s.bagHandle} d="M36 18 V9 Q36 4 41 4 H59 Q64 4 64 9 V18" />
      <rect className={s.bagBody} x={4} y={16} width={92} height={60} rx={9} />
      <path className={s.bagStrap} d="M28 16 V76 M72 16 V76" />
      <path className={s.bagSeam} d="M4 44 H96" />
      <rect className={s.bagFoot} x={14} y={76} width={10} height={8} rx={2} />
      <rect className={s.bagFoot} x={76} y={76} width={10} height={8} rx={2} />
    </svg>
  )
}

// Табло: два контейнера столбиком. "answer" — вопрос приглушён, ответ горит; "question" — горит вопрос; "off" — погашено.
function XrayDisplay({ w, index, phase }: { w: Words; index: number; phase: Phase }) {
  const it = w.items[index] ?? w.items[0]
  return (
    <div data-block="csdsp" className={s.xrDisplay} data-phase={phase} aria-hidden="true">
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

export function CustomsHall({ w }: { w: Words }) {
  const hall = useRef<HTMLDivElement>(null)
  const bagsBox = useRef<HTMLDivElement>(null)
  const bagEls = useRef<(SVGSVGElement | null)[]>([])
  const [live, setLive] = useState(false) // false — серверная расстановка; true — островок ведёт чемоданы сам
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<Phase>("answer")
  const [index, setIndex] = useState(0)

  // Сколько чемоданов нужно, чтобы цепочка шла без разрыва по всей ширине зала.
  useEffect(() => {
    const el = hall.current
    if (!el) return
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      setCount(Math.ceil(el.clientWidth / (SPACING_REM * rem)) + 2)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = hall.current
    if (!el || !count) return
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const spacing = SPACING_REM * rem
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    const beltShown = () => !!bagsBox.current && getComputedStyle(bagsBox.current).display !== "none"

    // Цепочка: центр каждого чемодана; первый — чуть левее центра зала, чтобы досмотр начался скоро.
    const width = () => el.clientWidth
    let xs = Array.from({ length: count }, (_, i) => width() / 2 - spacing * 0.6 - i * spacing)
    let mode: "move" | Phase = "move"
    let left = 0 // сколько мс осталось у текущей фазы табло
    let item = 0
    let visible = false
    let raf = 0
    let last = 0

    const place = () => {
      xs.forEach((x, i) => {
        const b = bagEls.current[i]
        if (b) b.style.transform = `translateX(${x - b.clientWidth / 2}px)`
      })
    }
    const show = (p: Phase, ms: number) => {
      mode = p === "off" ? "move" : p
      left = ms
      setPhase(p)
      setIndex(item)
    }

    setLive(true)
    show("off", 0)
    requestAnimationFrame(place)

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const belt = beltShown() && !still
      if (mode === "move") {
        if (!belt) {
          // Без ленты (телефон, «меньше движения»): табло листает пары само — погасло, вопрос, ответ.
          left -= dt * 1000
          if (left <= 0) show("question", QUESTION_MS)
        } else {
          const c = width() / 2
          const loop = xs.length * spacing
          let stop = -1
          xs = xs.map((x, i) => {
            const nx = x + SPEED * dt
            if (x < c && nx >= c) stop = i
            return nx > width() + spacing ? nx - loop : nx
          })
          if (stop >= 0) {
            xs[stop] = c
            show("question", QUESTION_MS)
          }
          place()
        }
      } else {
        left -= dt * 1000
        if (left <= 0) {
          if (mode === "question") show("answer", ANSWER_MS)
          else {
            item = (item + 1) % w.items.length
            show("off", belt ? 0 : OFF_MS)
          }
        }
      }
      if (visible) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      } else if (!visible) cancelAnimationFrame(raf)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [count, w.items.length])

  const bags: { x?: number; tone: Tone; w: number }[] = live
    ? Array.from({ length: count }, (_, i) => ({ tone: TONES[i % TONES.length], w: WIDTHS[i % WIDTHS.length] }))
    : BAGS

  return (
    <div data-block="cshal" ref={hall} className={s.customsHall} data-live={live ? "" : undefined}>
      {/* Табло листается анимацией — для чтения с экрана все пары лежат здесь списком. */}
      <dl className={s.srOnly}>
        <dt>{w.scene}</dt>
        {w.items.map((it) => (
          <dd key={it.q}>{it.q} {it.a}</dd>
        ))}
      </dl>
      <div data-block="qke3r" className={s.hallFloor} aria-hidden="true" />
      <div data-block="x8dqh" className={s.beltLegs} aria-hidden="true" />
      <div data-block="qqbf1" className={s.belt} aria-hidden="true" />
      <div data-block="csbag" ref={bagsBox} className={s.bags} aria-hidden="true">
        {bags.map((b, i) => (
          <Suitcase
            key={`${live ? "l" : "s"}${i}`}
            ref={(el) => { bagEls.current[i] = el }}
            tone={b.tone}
            className={s.bag}
            style={{ "--w": `${b.w}rem`, ...(b.x === undefined ? {} : { "--x": `${b.x}rem` }) } as unknown as React.CSSProperties}
          />
        ))}
      </div>
      <div data-block="csbox" className={s.xray}>
        <span className={`${s.xrHood} ${s.xrHoodL}`} aria-hidden="true" />
        <span className={`${s.xrHood} ${s.xrHoodR}`} aria-hidden="true" />
        <XrayDisplay w={w} index={index} phase={phase} />
        <div data-block="i4zhg" className={s.xrTunnel} aria-hidden="true" />
      </div>
    </div>
  )
}
