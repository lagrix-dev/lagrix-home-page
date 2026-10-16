"use client"

import { useEffect, useId, useRef, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { H3, H4 } from "@/components/ui/typography"
import s from "./landing-agent.module.css"

// КОМНАТА «ВОЗВРАТ БИЛЕТОВ» (владелец 2026-10-16, шаг 502, навык impeccable, путь «Launcher unavailable»): «экран широкого компьютера
// разделён на две части (а на узком экране используется интерфейс такой же как у анимированный иллюстрации закрытые экосистемы – сеть
// Lagrix) … в окошке комнаты web3 слева видно солнышко а в окошке комнаты web2 месяц … через экрана проходит весы такие как которые
// изображают закон и права. По умолчанию весы стоят в центре если нажать на левую часть весов они опускаются поднимая вверх правую часть
// весов. А одновременно с этим слева направо в разделе web3 анимирован выезжать инструкция она закрывает центральную часть левой секции и
// перекрывает видимость весов внутри вместе с областью прокрутки написано философия возврата … аналогичным образом для противоположной».
//
// Мир — тот же вокзал (DIRECTION.md): стены — мел и табло, рамы окон — табло, солнце — плакат, месяц — мел; одно авторское движение —
// весы и выезжающая инструкция. Широкий экран: чаши — кнопки, инструкция выезжает со своей стороны. До 900 px — переключатель сравнения
// (`versusSwitch`): весы наклонены к выбранной стороне, её текст — под комнатой. Обе инструкции всегда в HTML — их видит поиск.

export type RefundSide = {
  /** Подпись половины комнаты и вкладки на телефоне. */
  room: string
  title: string
  /** Красная карточка над текстом (Web2: «это не часть архитектуры Lagrix»). */
  notice?: string
  blocks: { h: string; p: string }[]
  /** Ссылка внизу инструкции; адрес с «/» получает язык страницы. */
  more: { label: string; href: string }
}
export type RefundWords = { title: string; text?: string; scene: string; sign: string; close: string; web3: RefundSide; web2: RefundSide }
type Side = "web3" | "web2"
const SIDES: Side[] = ["web3", "web2"]

function Sun() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={s.rfSky}>
      <g className={s.rfSunRays}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x={48} y={8} width={4} height={13} rx={2} transform={`rotate(${a} 50 50)`} />)}
      </g>
      <circle className={s.rfSun} cx={50} cy={50} r={20} />
    </svg>
  )
}

function Moon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={s.rfSky}>
      <path className={s.rfMoon} d="M58 22 A30 30 0 1 0 78 70 A24 24 0 1 1 58 22 Z" />
      {[[22, 26], [30, 70], [80, 30], [14, 50]].map(([x, y]) => <circle key={`${x}-${y}`} className={s.rfStar} cx={x} cy={y} r={2} />)}
    </svg>
  )
}

export function RefundRoom({ w, lang }: { w: RefundWords; lang: string }) {
  const [open, setOpen] = useState<Side | null>(null)
  const id = useId()
  const panels = useRef<Partial<Record<Side, HTMLElement | null>>>({})
  const href = (h: string) => (h.startsWith("/") ? `/${lang}${h}` : h)

  // Escape закрывает инструкцию; открытая чашей — получает фокус (клавиатура и чтение экрана попадают в текст).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])
  const press = (side: Side) => {
    const next = open === side ? null : side
    setOpen(next)
    if (next && window.matchMedia("(min-width: 900px)").matches) requestAnimationFrame(() => panels.current[next]?.focus({ preventScroll: true }))
  }

  return (
    <div data-block="rfrom" className={s.rfRoom} data-open={open ?? undefined}>
      <p data-block="rfscn" className={s.asSr}>{w.scene}</p>

      {/* До 900 px — переключатель, как у сравнения «Закрытые экосистемы — Сеть Lagrix»; по умолчанию Web3. */}
      <div data-block="rfsw1" className={`${s.versusSwitch} ${s.rfSwitch}`} role="tablist" aria-label={`${w.web3.room} / ${w.web2.room}`}>
        {SIDES.map((side) => (
          <Button variant="bare" size="bare" key={side} type="button" role="tab" aria-selected={(open ?? "web3") === side} aria-controls={`${id}-${side}`}
            className={s.versusOption} data-side={side} onClick={() => setOpen(side)}>
            <span className={s.lamp} aria-hidden="true" />
            {w[side].room}
          </Button>
        ))}
        <span className={s.versusThumb} aria-hidden="true" />
      </div>

      <div data-block="rfstg" className={s.rfStage}>
        {SIDES.map((side) => (
          <div data-block="rfhlf" key={side} className={s.rfHalf} data-side={side} aria-hidden="true">
            <div data-block="rfwin" className={s.rfWindow} data-side={side}>{side === "web3" ? <Sun /> : <Moon />}</div>
            <span className={s.rfRoomLabel} data-side={side}>{w[side].room}</span>
          </div>
        ))}
        <div data-block="rfflr" className={s.rfFloor} aria-hidden="true" />

        {/* Вывеска комнаты — висит над весами. */}
        <div data-block="rfsgn" className={s.rfSign} aria-hidden="true"><span className={s.rfSignPlate}>{w.sign}</span></div>

        {/* Весы закона: коромысло вращается вокруг оси, чаши висят отвесно (поворот обратный). Чаши — кнопки поверх рисунка. */}
        <div data-block="rfscl" className={s.rfScales}>
          <svg viewBox="0 0 400 300" aria-hidden="true" className={s.rfScalesSvg}>
            <path className={s.rfBase} d="M140 292 H260 L244 272 H156 Z" />
            <rect className={s.rfPillar} x={193} y={72} width={14} height={202} rx={3} />
            <g className={s.rfBeam}>
              <rect className={s.rfBeamBar} x={58} y={64} width={284} height={12} rx={6} />
              {([[70, "web3"], [330, "web2"]] as const).map(([x, side]) => (
                <g key={side} className={s.rfHang} data-side={side} style={{ transformOrigin: `${x}px 70px` }}>
                  <path className={s.rfChain} d={`M${x} 70 L${x - 32} 168 M${x} 70 L${x + 32} 168`} />
                  <path className={s.rfPanShape} d={`M${x - 46} 168 H${x + 46} Q${x + 40} 206 ${x} 208 Q${x - 40} 206 ${x - 46} 168 Z`} />
                  <text className={s.rfPanText} x={x} y={192} textAnchor="middle">{side === "web3" ? "Web3" : "Web2"}</text>
                </g>
              ))}
              <circle className={s.rfHub} cx={200} cy={70} r={13} />
            </g>
            <circle className={s.rfFinial} cx={200} cy={46} r={9} />
          </svg>
          {SIDES.map((side) => (
            <Button variant="bare" size="bare" key={side} type="button" className={s.rfPan} data-side={side} aria-expanded={open === side}
              aria-controls={`${id}-${side}`} aria-label={w[side].title} title={w[side].title} onClick={() => press(side)} />
          ))}
        </div>
      </div>

      {/* Инструкции: на широком экране выезжают со своей стороны и закрывают середину и весы; до 900 px — текст выбранной вкладки. */}
      {SIDES.map((side) => (
        <section data-block="rfpnl" key={side} id={`${id}-${side}`} ref={(el) => { panels.current[side] = el }} tabIndex={-1}
          className={s.rfPanel} data-side={side} aria-labelledby={`${id}-${side}-t`}>
          <div data-block="rfphd" className={s.rfPanelHead}>
            <H3 variant="ui" data-block="rfptl" id={`${id}-${side}-t`} className={s.rfPanelTitle}>{w[side].title}</H3>
            <Button variant="bare" size="bare" type="button" className={s.rfClose} onClick={() => setOpen(null)} aria-label={w.close} title={w.close}>
              <X className="size-5" strokeWidth={2.4} aria-hidden="true" />
            </Button>
          </div>
          <div data-block="rfpbd" className={s.rfPanelBody}>
            {w[side].notice && <p data-block="rfntc" className={s.rfNotice}>{w[side].notice}</p>}
            {w[side].blocks.map((b) => (
              <div data-block="rfblk" key={b.h} className={s.rfBlock}>
                <H4 variant="ui" data-block="rfbh4" className={s.rfBlockTitle}>{b.h}</H4>
                <p data-block="rfbp1" className={s.rfBlockText}>{b.p}</p>
              </div>
            ))}
            <a className={s.rfMore} href={href(w[side].more.href)}>{w[side].more.label}</a>
          </div>
        </section>
      ))}
    </div>
  )
}
