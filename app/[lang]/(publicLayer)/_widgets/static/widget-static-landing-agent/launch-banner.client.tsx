"use client"

import { useEffect, useState } from "react"
import { CalendarClock } from "lucide-react"
import s from "./landing-agent.module.css"

// БАННЕР «ЗАПУСК — КОНЕЦ 2026» (шаг 453, владелец 2026-10-11): мягкая полупрозрачная полоса во всю ширину, как полоса-подсказка
// на throughsongs.com (элемент root, `starter-banner.client.tsx`): выезжает из-под шапки, когда страницу прокрутили больше чем на
// 300 px, и уходит при возврате к началу. Островок — потому что слушатель прокрутки на странице увёл бы её в динамику.
// Разметка приходит с сервера всегда и прячется классом — иначе полоса появлялась бы рывком после гидратации.
// Отступ сверху — высота шапки (`h-14` в `components/shell/project-header.tsx`).
const SHOW_AFTER_PX = 300

export function LaunchBanner({ text }: { text: string }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div data-block="lb453" role="status" aria-hidden={!shown} className={s.launch} data-shown={shown ? "" : undefined}>
      <CalendarClock className="size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}
