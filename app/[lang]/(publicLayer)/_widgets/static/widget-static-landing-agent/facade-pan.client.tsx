"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import s from "./landing-agent.module.css"

// ВОКЗАЛ БУДУЩЕГО ШИРЕ ЭКРАНА (узел, шаг 477; владелец 2026-10-14): «по бокам экрана есть две кнопки … нажимаем вправо и всё
// здание вокзала плавно анимированно смещается в правое крыло». Кнопки — «Миссия 1» и «Миссия 2» (его слово): жёлтые ярлычки,
// прижатые к краям экрана; при наведении крупная кнопка выдвигается — левая слева направо, правая справа налево; в покое прячется,
// чтобы не закрывать вокзал. Кнопка той миссии, что уже в фокусе, недоступна.
// 🔒 Без JavaScript здание — обычная горизонтальная прокрутка (кнопок нет). Сдвиг — плавный проезд камеры (1,1 с); при
// «уменьшить движение» — сразу на место. Таймеров и опроса нет: состояние кнопок считается по прокрутке и размеру окна.
export function FacadePan({ labels, aria, children }: { labels: [string, string]; aria: [string, string]; children: ReactNode }) {
  const view = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const [edge, setEdge] = useState<{ start: boolean; end: boolean; none: boolean } | null>(null)

  const measure = useCallback(() => {
    const el = view.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, none: max <= 2 })
  }, [])

  useEffect(() => {
    const el = view.current
    if (!el) return
    measure()
    el.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      el.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [measure])

  const go = (to: "start" | "end") => {
    const el = view.current
    if (!el) return
    const target = to === "start" ? 0 : el.scrollWidth - el.clientWidth
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollLeft = target
      return
    }
    const from = el.scrollLeft
    const dist = target - from
    const t0 = performance.now()
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100)
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2
      el.scrollLeft = from + dist * e
      frame.current = k < 1 ? requestAnimationFrame(step) : null
    }
    frame.current = requestAnimationFrame(step)
  }

  return (
    <div data-block="zkewq" className={s.facadeStage}>
      <div data-block="fmn8u" ref={view} className={s.facadeView}>{children}</div>
      {edge && !edge.none && (
        <>
          <Button variant="bare" size="bare" type="button" className={s.edgeBtn} data-side="left" disabled={edge.start} aria-label={aria[0]} onClick={() => go("start")}>
            <span className={s.edgeLabel}>
              <ArrowLeft className="size-8" strokeWidth={2.6} aria-hidden="true" />
              {labels[0]}
            </span>
            <span className={s.edgeTab} aria-hidden="true"><span className={s.edgeNum}>1</span></span>
          </Button>
          <Button variant="bare" size="bare" type="button" className={s.edgeBtn} data-side="right" disabled={edge.end} aria-label={aria[1]} onClick={() => go("end")}>
            <span className={s.edgeTab} aria-hidden="true"><span className={s.edgeNum}>2</span></span>
            <span className={s.edgeLabel}>
              {labels[1]}
              <ArrowRight className="size-8" strokeWidth={2.6} aria-hidden="true" />
            </span>
          </Button>
        </>
      )}
    </div>
  )
}
