"use client"

import { useEffect, useRef, type ReactNode } from "react"
import s from "./landing-agent.module.css"

// ПАРОВОЗИК ЕДЕТ — островок (шаг 470-2, владелец 2026-10-13): «слева направо выезжал бы паровозик … когда паровозик проезжает
// проходит пауза в 2 секунды и выезжают следующей паровозик». Поезд (серверная разметка `WhyTrain`) въезжает из-за левого края,
// едет 80 px/с (как `SPEED` пешеходов в `walkers.client.tsx`), уходит за правый край, 2 с пусто — и снова слева. Колёса крутятся
// со скоростью хода. Время идёт только пока сцена на экране. «Меньше движения» и без JavaScript — поезд стоит у правого края,
// ответ читается текстом под табличкой. Это анимация в браузере посетителя, а не поведение узла.

const SPEED = 80
const GAP_MS = 2000

export function WhyRide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    const train = root?.querySelector<HTMLElement>(`.${s.whyTrain}`)
    if (!root || !train) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let sceneW = root.clientWidth
    let trainW = train.offsetWidth
    let x = -trainW
    let gap = 0
    let last = 0
    let frame = 0
    let visible = false

    // Колесо проходит за оборот свою длину окружности: период = 2πr / скорость. Радиусы — из размеров рисунка в em шрифта поезда.
    const spin = () => {
      const em = parseFloat(getComputedStyle(train).fontSize) || 32
      const loco = (3.8 * em) / 180 // px на единицу рисунка паровоза (viewBox высотой 180)
      root.style.setProperty("--spin-big", `${((2 * Math.PI * 24 * loco) / SPEED).toFixed(3)}s`)
      root.style.setProperty("--spin-small", `${((2 * Math.PI * 16 * loco) / SPEED).toFixed(3)}s`)
      root.style.setProperty("--spin-wagon", `${((Math.PI * 0.42 * em) / SPEED).toFixed(3)}s`)
    }
    const measure = () => { sceneW = root.clientWidth; trainW = train.offsetWidth; spin() }

    const place = () => { train.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)` }
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      if (gap > 0) {
        gap -= dt
        if (gap <= 0) { x = -trainW; root.setAttribute("data-moving", "") }
      } else {
        x += (SPEED * dt) / 1000
        if (x > sceneW) { gap = GAP_MS; root.removeAttribute("data-moving") }
      }
      place()
      frame = requestAnimationFrame(tick)
    }
    const start = () => { if (visible) return; visible = true; last = 0; if (gap <= 0) root.setAttribute("data-moving", ""); frame = requestAnimationFrame(tick) }
    const stop = () => { if (!visible) return; visible = false; cancelAnimationFrame(frame); root.removeAttribute("data-moving") }

    measure()
    place()
    root.setAttribute("data-live", "")
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 })
    io.observe(root)
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(frame) }
  }, [])

  return (
    <div ref={ref} data-block="wy474" className={s.whyTrack}>
      {children}
    </div>
  )
}
