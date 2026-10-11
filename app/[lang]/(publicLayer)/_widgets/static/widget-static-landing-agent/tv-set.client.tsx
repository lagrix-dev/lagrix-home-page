"use client"

import { useEffect, useId, useRef, useState } from "react"
import s from "./landing-agent.module.css"
import { TvDrawing, type TvPhase } from "./tv-drawing"
import { TvVideo } from "./tv-video.client"
import type { AppDialogUi } from "@/components/dialog/app-dialog.i18n"
import { Button } from "@/components/ui/button"

// ЛАМПОВЫЙ ТЕЛЕВИЗОР ЗАЛА ОЖИДАНИЯ — ШИРОКИЙ ЭКРАН (владелец 2026-10-01): «когда телевизор включается … несколько секунд идут серые
// помехи … потом появляется цветная стандартная … таблица … держится 2 секунды … проявляется значок play». Весь телевизор — одна
// кнопка (`aria-pressed`). До оживления сервер отдаёт его выключенным. Помехи — `feTurbulence`, у которого раз в 70 мс меняется
// зерно, только пока идут помехи; при «уменьшить движение» зерно стоит. Рисунок — `tv-drawing.tsx` (общий с узким экраном).
// Видео (владелец 2026-10-11): на «play» нажатие открывает ролик из данных главной (`tv-video.client.tsx`); закрыли окно —
// телевизор выключается. Нет ролика в данных — «play» выключает телевизор, как прежде.

const NOISE_MS = 3000
const BARS_MS = 2000

export function TvSet({ on, off, label, video, watch, ui }: { on: string; off: string; label: string; video?: string; watch?: string; ui: AppDialogUi }) {
  const [phase, setPhase] = useState<TvPhase>("off")
  const [seed, setSeed] = useState(1)
  const [open, setOpen] = useState(false)
  const timers = useRef<number[]>([])
  const uid = useId().replace(/:/g, "")

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  useEffect(() => clear, [])

  useEffect(() => {
    if (phase !== "noise" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setInterval(() => setSeed((n) => (n % 97) + 1), 70)
    return () => window.clearInterval(t)
  }, [phase])

  function toggle() {
    clear()
    if (phase === "play" && video) return setOpen(true)
    if (phase !== "off") return setPhase("off")
    setPhase("noise")
    timers.current.push(window.setTimeout(() => setPhase("bars"), NOISE_MS))
    timers.current.push(window.setTimeout(() => setPhase("play"), NOISE_MS + BARS_MS))
  }

  function onOpenChange(next: boolean) {
    setOpen(next)
    if (!next) setPhase("off")
  }

  const isOn = phase !== "off"
  const caption = phase === "play" && video && watch ? watch : isOn ? off : on
  return (
    <>
      <Button variant="bare" size="bare" type="button" className={s.tv} aria-pressed={isOn} aria-label={`${label}: ${caption}`} onClick={toggle} data-phase={phase}>
        <TvDrawing uid={uid} phase={phase} seed={seed} />
        <span className={s.tvCaption}>{caption}</span>
      </Button>
      {video && <TvVideo open={open} onOpenChange={onOpenChange} video={video} title={label} ui={ui} />}
    </>
  )
}

// Узкий экран (владелец 2026-10-01: «пусть на нём всегда горит иконка YouTube с самого начала»): неподвижный телевизор с play;
// нажатие открывает тот же ролик.
export function TvMobile({ label, video, ui }: { label: string; video?: string; ui: AppDialogUi }) {
  const [open, setOpen] = useState(false)
  if (!video) return <div data-block="ahqeu" role="img" aria-label={label}><TvDrawing uid="tvm" phase="play" /></div>
  return (
    <>
      <Button variant="bare" size="bare" type="button" aria-label={label} onClick={() => setOpen(true)}>
        <TvDrawing uid="tvm" phase="play" />
      </Button>
      <TvVideo open={open} onOpenChange={setOpen} video={video} title={label} ui={ui} />
    </>
  )
}
