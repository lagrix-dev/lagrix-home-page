"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import s from "./landing-agent.module.css"
import { Button } from "@/components/ui/button"

// СЦЕНА «А ПОЧЕМУ ВСЁ-ТАКИ LAGRIX?» — островок (шаги 470-2 и 470-3, владелец 2026-10-13).
// 470-3: «вывеска … должна превратиться в кнопку в которой с частотой раз в 1 секунду текст инвертирует. Железной дороги на старте
// нет поезда нет если нажимают эту кнопку пространство под этой кнопкой расширяется на высоту необходимую для пространства где
// появляется железная дорога … она выдвигается слева направо с анимацией в течение 700 милисекунд и задержкой в 1 секунду начинается
// та анимация … Далее поезда движутся непрерывно если … не нажал кнопку то поезд не появляется».
// 470-2: «… пауза в 2 секунды и выезжают следующей паровозик»; 470-4: «поезд должен ехать в обратную сторону» — поезд (серверная
// разметка `WhyTrain`) въезжает из-за правого края, едет влево 80 px/с (как `SPEED` пешеходов), уходит за левый край, 2 с пусто —
// снова справа. Слова состава читаются слева направо.
// Колёса крутятся со скоростью хода; время идёт только пока сцена на экране.
// Кнопка одноразовая (как замок «нулевого дня»). Ответ текстом не виден никогда — только для чтения с экрана (470-4); слова везут
// вагоны. Без JavaScript табличка не мигает и рельсов нет. «Меньше движения» — без мигания и анимаций: рельсы сразу, поезд стоит. Это анимация в браузере посетителя, а не поведение узла.

const SPEED = 80
const GAP_MS = 2000
// 470-4 (владелец: «пусть секция будет иметь изначально ширину всегда») — место под путь есть сразу, раскрытия нет.
const RAILS_MS = 700 // рельсы выдвигаются слева направо (CSS `.whyTrack::before`)
const WAIT_MS = 1000 // пауза перед первым поездом

export function WhyStage({ question, answer, children }: { question: string; answer: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setReady(true), [])

  useEffect(() => {
    const root = track.current
    const train = root?.querySelector<HTMLElement>(`.${s.whyTrain}`)
    if (!open || !root || !train) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { root.setAttribute("data-still", ""); return }

    let sceneW = root.clientWidth
    let trainW = train.offsetWidth
    let x = sceneW
    let gap = 0
    let last = 0
    let frame = 0
    let visible = false
    let io: IntersectionObserver | undefined
    let ro: ResizeObserver | undefined

    // Колесо проходит за оборот свою длину окружности: период = 2πr / скорость. Радиусы — из рисунка, в em шрифта поезда.
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
        if (gap <= 0) { x = sceneW; root.setAttribute("data-moving", "") }
      } else {
        x -= (SPEED * dt) / 1000
        if (x + trainW < 0) { gap = GAP_MS; root.removeAttribute("data-moving") }
      }
      place()
      frame = requestAnimationFrame(tick)
    }
    const start = () => { if (visible) return; visible = true; last = 0; if (gap <= 0) root.setAttribute("data-moving", ""); frame = requestAnimationFrame(tick) }
    const stop = () => { if (!visible) return; visible = false; cancelAnimationFrame(frame); root.removeAttribute("data-moving") }

    // Путь раскрылся, рельсы выдвинулись, секунда тишины — первый поезд.
    const go = window.setTimeout(() => {
      measure()
      x = sceneW
      place()
      root.setAttribute("data-live", "")
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 })
      io.observe(root)
      ro = new ResizeObserver(measure)
      ro.observe(root)
    }, RAILS_MS + WAIT_MS)
    return () => { clearTimeout(go); io?.disconnect(); ro?.disconnect(); cancelAnimationFrame(frame) }
  }, [open])

  return (
    <div data-block="wy475" className={s.whyStage} data-ready={ready ? "" : undefined} data-open={open ? "" : undefined}>
      <div data-block="wy471" className={`${s.wrap} ${s.whyHead}`}>
        <div data-block="wy472" className={`${s.waitingSign} ${s.whySign}`}>
          <span className={s.gateRods} aria-hidden="true" />
          <h2 data-block="hwois" className={`${s.waitingTitle} ${s.whyTitle}`}>
            <Button
              variant="bare" size="bare" type="button" className={`${s.waitingPlate} ${s.whyPlate}`} aria-expanded={open} aria-controls="why-track"
              onClick={() => setOpen(true)}
            >
              {question}
            </Button>
          </h2>
        </div>
        <p data-block="f07ci" className={s.whyAnswer}>{answer}</p>
      </div>
      <div ref={track} id="why-track" data-block="wy474" className={s.whyTrack}>
        {children}
      </div>
    </div>
  )
}
