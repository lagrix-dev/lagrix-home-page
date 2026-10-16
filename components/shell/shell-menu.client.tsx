"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import type { ShellChild, ShellGroup } from "./shell-types"
import { shellHref } from "./shell-href"
import { useShellMe } from "./shell-me.client"

// ВЕРХНЕЕ МЕНЮ ОБОЛОЧКИ — полоса групп (от 780px) и мобильное меню (уже 780px). Перенесено из сайта
// (`components/menu/top/*`, `components/menu/shared/*`) без изменения вида; адреса — через `shellHref`, чтобы
// у служб абсолютные ссылки на сайт не получали второй язык.

export function isPublicGroup(roles: string): boolean {
  return !roles || roles === "public" || roles === "public+guest"
}

/** Группа, закрытая ролью, прячется, пока не известно, кто вошёл: без вспышки «гостевого» меню. */
export function useVisibleGroups(groups: ShellGroup[], meUrl: string): ShellGroup[] {
  const me = useShellMe(meUrl)
  return groups.filter((g) => {
    if (isPublicGroup(g.roles)) return true
    if (me === undefined) return false
    const mine = me?.roles ?? []
    return g.roles.split("+").some((r) => mine.includes(r))
  })
}

// 507 — МЕГА-МЕНЮ (владелец 2026-10-16: «Посмотри на вкладки контент выпадающем меню представляет из себя название и описание.
// Название одна строчка описание две. Так и надо»; «заголовки с описанием и структуры их распределения в один два или три колонки,
// также если вкладок очень много так как у документов так ещё и внутренние прокрутки»). Вид — shadcn Navigation Menu.
// 🔒 Содержимое списка смонтировано всегда (`forceMount`) и скрыто, пока закрыто: ссылки на страницы стоят в HTML, и поисковик
// их видит. ✗ До этого группа рисовалась кнопкой без адреса, а пункты появлялись только после нажатия — для поиска их не было.

/** Колонки по числу карточек: до 4 — одна, до 8 — две, больше — три; ширина ограничена экраном. */
function columnsOf(count: number): string {
  if (count <= 4) return "w-[min(22rem,calc(100vw-2rem))] grid-cols-1"
  if (count <= 8) return "w-[min(36rem,calc(100vw-2rem))] grid-cols-2"
  return "w-[min(54rem,calc(100vw-2rem))] grid-cols-3"
}

function MegaCard({ href, title, description, strong }: { href: string; title: string; description?: string; strong?: boolean }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <span className={`block truncate text-sm leading-tight ${strong ? "font-semibold" : "font-medium"}`}>{title}</span>
          {description && <span className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</span>}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function MegaItem({ lang, group }: { lang: string; group: ShellGroup }) {
  const groupHref = shellHref(lang, group.href, `/${lang}/${group.slug}`)
  const childHref = (c: ShellChild) => (c.href ? shellHref(lang, c.href, "") : `${groupHref}/${c.slug}`)

  if (group.inert) {
    return (
      <NavigationMenuItem>
        <span aria-disabled="true" className={buttonVariants({ variant: "ghost", size: "sm", className: "cursor-default opacity-60 hover:bg-transparent" })}>
          {group.label}
        </span>
      </NavigationMenuItem>
    )
  }

  if (!group.childrenAsDropdown || group.children.length === 0) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href={groupHref}>{group.label}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  // Первая карточка — сам хаб (название и его описание), затем его страницы.
  const count = group.children.length + 1
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-8 px-3">{group.label}</NavigationMenuTrigger>
      {/* 507 (владелец: «Добавь горизонтальный скролл если эти новые кнопки не помещаются»): полоса кнопок прокручивается, а у
          прокручиваемого блока выпавший вниз список обрезался бы. Поэтому список — `fixed`: шапка с `backdrop-blur` держит его
          своим блоком, и он встаёт ровно под ней по центру её ширины, вне прокрутки полосы. */}
      <NavigationMenuContent forceMount className="data-[state=closed]:hidden md:fixed! md:inset-x-0! md:mx-auto! md:top-[calc(100%+0.25rem)]! md:mt-0! md:w-fit!">
        <ul className={`grid max-h-[70vh] gap-1 overflow-y-auto overscroll-contain p-1 ${columnsOf(count)}`}>
          <MegaCard href={groupHref} title={group.label} description={group.description} strong />
          {group.children.map((c) => (
            <MegaCard key={c.slug} href={childHref(c)} title={c.title} description={c.description} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export function DesktopNav({ lang, groups, meUrl }: { lang: string; groups: ShellGroup[]; meUrl: string }) {
  const visible = useVisibleGroups(groups, meUrl)
  if (visible.length === 0) return null
  return (
    <>
      <span className="hidden min-[780px]:block h-5 w-px bg-border" aria-hidden />
      {/* Кнопки не помещаются — полоса прокручивается по горизонтали, полоса прокрутки самая тонкая (`scrollbar-width: thin`). */}
      <NavigationMenu
        viewport={false}
        className="hidden min-[780px]:flex min-w-0 max-w-none flex-1 justify-start overflow-x-auto overflow-y-hidden pb-0.5 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]"
      >
        <NavigationMenuList className="w-max flex-none flex-nowrap justify-start gap-1">
          {visible.map((g) => (
            <MegaItem key={g.slug} lang={lang} group={g} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

export function MobileMenu({ lang, groups, label, meUrl }: { lang: string; groups: ShellGroup[]; label: string; meUrl: string }) {
  const [open, setOpen] = useState(false)
  const visible = useVisibleGroups(groups, meUrl)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (visible.length === 0) return null

  return (
    <div className="min-[780px]:hidden">
      <Button type="button" variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label={label} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </Button>

      {open && (
        <>
          {/* Подложка ПОД шапкой, `bg-black/50` — затемнение тёмное в обеих темах. */}
          <div aria-hidden onClick={() => setOpen(false)} className="absolute left-0 right-0 top-14 z-40 h-screen bg-black/50" />
          <nav className="absolute left-0 right-0 top-14 z-50 border-b border-border bg-background shadow-lg">
            <div className="flex flex-col px-6 py-2">
              {visible.map((g) => {
                const groupHref = shellHref(lang, g.href, `/${lang}/${g.slug}`)
                return (
                  <div key={g.slug} className="flex flex-col">
                    {g.inert ? (
                      <span aria-disabled="true" className="py-2.5 text-sm font-semibold text-muted-foreground cursor-default">{g.label}</span>
                    ) : (
                      <Link href={groupHref} onClick={() => setOpen(false)} className="py-2.5 text-sm font-semibold text-foreground hover:text-foreground transition-colors">
                        {g.label}
                      </Link>
                    )}
                    {g.childrenAsDropdown && g.children.map((c) => (
                      <Link
                        key={c.slug}
                        href={c.href ? shellHref(lang, c.href, "") : `${groupHref}/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="py-2 pl-4 text-sm font-medium text-foreground hover:text-foreground transition-colors whitespace-normal break-words leading-snug"
                      >
                        {c.title}
                        {c.description && <span className="mt-0.5 line-clamp-2 text-xs font-normal text-muted-foreground">{c.description}</span>}
                      </Link>
                    ))}
                  </div>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
