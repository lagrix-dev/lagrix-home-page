"use client"

import { useState, type ReactNode } from "react"
import { Lock, LockOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import s from "./landing-agent.module.css"

// РАЗБЛОКИРОВКА «ИНФРАСТРУКТУРЫ НУЛЕВОГО ДНЯ» (453-6, владелец 2026-10-11): «при наведении на замок … разблокировать: нажать
// разблокировать отодвигает решетку вбок при этом … одна группа персонажей уезжают влево другая … вправо текст становится доступным
// для прочтения». Островок держит одно состояние — открыто ли, и ставит `data-open` на сетку; всё движение — в CSS. Открытие
// одностороннее (обратно не запирается — этого не просили). Без JavaScript разметка та же: текст читается сквозь решётку.

// 453-8: в каждой колонке два слоя — патруль и обычные люди (повар, слесарь, учитель). Патруль улетает наружу, люди въезжают
// с края экрана на его место. До открытия слой людей скрыт от чтения экраном.
export function ZeroDayStage({ left, right, leftPeople, rightPeople, text, unlock }: {
  left: ReactNode; right: ReactNode; leftPeople: ReactNode; rightPeople: ReactNode; text: string[]; unlock: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div data-block="zd4g1" className={s.zeroGrid} data-open={open ? "" : undefined}>
      <div data-block="zd4a1" className={`${s.zeroArt} ${s.zeroArtLeft}`}>
        <div data-block="b8938" className={s.zeroGuards} aria-hidden={open || undefined}>{left}</div>
        <div data-block="rcdio" className={s.zeroPeople} aria-hidden={!open}>{leftPeople}</div>
      </div>
      <div data-block="zd4c1" className={s.zeroCell}>
        <span className={s.zeroBarsClip} aria-hidden="true"><span className={s.zeroBars} /></span>
        <Button
          variant="bare"
          size="bare"
          type="button"
          className={s.zeroLock}
          onClick={() => setOpen(true)}
          disabled={open}
          aria-label={unlock}
        >
          {open ? <LockOpen className="size-5 shrink-0" strokeWidth={2.4} aria-hidden="true" /> : <Lock className="size-5 shrink-0" strokeWidth={2.4} aria-hidden="true" />}
          <span className={s.zeroLockLabel}>{unlock}</span>
        </Button>
        <div data-block="zd4x1" className={s.zeroText}>
          {text.map((t) => <p data-block="baiqi" key={t}>{t}</p>)}
        </div>
      </div>
      <div data-block="zd4a2" className={`${s.zeroArt} ${s.zeroArtRight}`}>
        <div data-block="x8ji8" className={s.zeroGuards}>{right}</div>
        <div data-block="nxlhc" className={s.zeroPeople} aria-hidden="true">{rightPeople}</div>
      </div>
    </div>
  )
}
