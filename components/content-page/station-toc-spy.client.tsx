"use client"

import { useEffect } from "react"

// ПОДСВЕТКА ТЕКУЩЕГО РАЗДЕЛА В ОГЛАВЛЕНИИ — вид `station` (шаг 514, выбор владельца 2026-10-17 «Читалка + вокзал»: оглавление
// справа «едет с прокруткой» и показывает, где читатель). Островок ничего не рисует: он ставит `aria-current="true"` ссылке
// оглавления, чей заголовок последним прошёл верх окна. Без таймеров и опроса — только наблюдатель пересечений, который браузер
// зовёт при прокрутке. Без JavaScript оглавление остаётся обычным списком ссылок.
export function StationTocSpy({ navLabel }: { navLabel: string }) {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(`nav[aria-label="${CSS.escape(navLabel)}"]`)
    if (!nav) return
    const links = new Map<string, HTMLAnchorElement>()
    nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => links.set(decodeURIComponent(a.hash.slice(1)), a))
    const heads = [...links.keys()].map((id) => document.getElementById(id)).filter((h): h is HTMLElement => !!h)
    if (heads.length === 0) return
    const visible = new Set<string>()
    const mark = () => {
      // Текущий — первый видимый заголовок; если ни одного не видно, — последний, ушедший за верх окна.
      let id = heads.find((h) => visible.has(h.id))?.id
      if (!id) id = [...heads].reverse().find((h) => h.getBoundingClientRect().top < 120)?.id
      links.forEach((a, key) => (key === id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")))
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)
        mark()
      },
      { rootMargin: "-72px 0px -55% 0px" },
    )
    heads.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [navLabel])
  return null
}
