"use client"

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import s from "./landing-agent.module.css"

// КОМНАТА «ТЕЛЕГРАФ» (владелец 2026-10-14, навык impeccable, путь «Launcher unavailable»): «место где сидит связист вывеска
// телеграф … переключатель … как классический рычаг переключения направления движения и скорости на корабле … на стене … две таблички
// … болты … нажатие на табличку приводит к переключению рычага … человек чеканит текст и справа налево бежит бегущая строка …
// включаться в тот момент когда … попадает фокус в экран … пауза длиной в 1 секунду … по нижнему краю помещения … светящийся».
//
// Мир — тот же вокзал (DIRECTION.md): плоская сцена в ролях табло, как зал ожидания. Одно авторское движение — бегущая строка с ключом
// связиста; рычаг машинного телеграфа поворачивается к выбранной табличке. Без JavaScript строка стоит на месте и читается целиком;
// при «уменьшить движение» строка не бежит, а печатается на месте.
//
// 498 (владелец 2026-10-15): «в комнате телеграф на пол можно поставить большой мусорное ведро на котором написать табличку спам но
// реализовать это как кнопку например чтобы оно моргала и тогда если пользователь нажмёт эту кнопку то появится третье бегущая строка
// рассказывающая как мы защищаем от спама в мессенджере». Ведро стоит на полу между стулом и машинным телеграфом; табличка мигает,
// пока строка о спаме не выбрана; рычаг при этом встаёт в нейтраль.

export type TelegraphMode = { plate: string; caption: string; ticker: string }
export type TelegraphWords = { scene: string; switchLabel: string; h2h: TelegraphMode; h2a: TelegraphMode; spam?: { plate: string; label: string; ticker: string } }

type Key = "h2h" | "h2a" | "spam"
const SPEED = 150 // пикселей в секунду — строка бежит быстрее поезда, но её удобно читать

export function TelegraphRoom({ w }: { w: TelegraphWords }) {
  const [mode, setMode] = useState<Key>("h2h")
  const [shown, setShown] = useState<Key>("h2h")
  const [visible, setVisible] = useState(false)
  const [run, setRun] = useState(false)
  const room = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLParagraphElement>(null)
  const timer = useRef<number | null>(null)
  const arch = useId()

  // Фокус экрана: строка и ключ оживают, когда комната видна, и замирают, когда её прокрутили.
  useEffect(() => {
    const el = room.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => { if (visible && mode === shown && timer.current === null) setRun(true) }, [visible, mode, shown])

  // Длина пути строки — от правого края полосы до ухода последней буквы за левый; скорость постоянная.
  useLayoutEffect(() => {
    const b = band.current, l = line.current
    if (!b || !l) return
    const from = b.clientWidth, to = -l.scrollWidth
    l.style.setProperty("--from", `${from}px`)
    l.style.setProperty("--to", `${to}px`)
    l.style.setProperty("--dur", `${((from - to) / SPEED).toFixed(2)}s`)
  }, [shown, run])

  const pick = useCallback((next: Key) => {
    if (next === mode) return
    setMode(next)
    setRun(false)
    if (timer.current !== null) window.clearTimeout(timer.current)
    // Пауза в одну секунду: рычаг переложен, связист заново берётся за ключ.
    timer.current = window.setTimeout(() => {
      timer.current = null
      setShown(next)
      setRun(true)
    }, 1000)
  }, [mode])

  useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current) }, [])

  const plate = (k: "h2h" | "h2a", x: number) => (
    <g
      className={s.tgPlate}
      transform={`translate(${x} 22)`}
      role="button"
      tabIndex={0}
      aria-pressed={mode === k}
      aria-label={`${w.switchLabel}: ${w[k].plate} — ${w[k].caption}`}
      data-on={mode === k ? "" : undefined}
      onClick={() => pick(k)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(k) } }}
    >
      <rect className={s.tgPlateFace} width={150} height={92} rx={4} />
      <circle className={s.tgBolt} cx={12} cy={12} r={4.5} />
      <circle className={s.tgBolt} cx={138} cy={12} r={4.5} />
      <circle className={s.tgBolt} cx={12} cy={80} r={4.5} />
      <circle className={s.tgBolt} cx={138} cy={80} r={4.5} />
      <text className={s.tgPlateCode} x={75} y={50} textAnchor="middle">{w[k].plate}</text>
      <text className={s.tgPlateCaption} x={75} y={72} textAnchor="middle">{w[k].caption}</text>
    </g>
  )

  return (
    <div data-block="tgrom" ref={room} className={s.tgRoom} data-mode={mode} data-run={run && visible ? "" : undefined}>
      <svg viewBox="0 0 1000 352" className={s.tgSvg} role="img" aria-label={w.scene}>
        <rect className={s.roomFloor} x={0} y={330} width={1000} height={22} />
        <path className={s.roomSkirt} d="M0 330 H1000" />

        {/* Окно-арка приёма телеграмм (владелец 2026-10-14: знак Telegram снят — товарный знак; «окошко в виде арки … примерно на 30%
            больше а за этим окошком … люди как будто они подошли отправить телеграмму»). За стеклом — пиктограммы посетителей. */}
        <defs>
          <clipPath id={arch}>
            <path d="M80 252 V128 A78 78 0 0 1 236 128 V252 Z" />
          </clipPath>
        </defs>
        <path className={s.roomGlass} d="M80 252 V128 A78 78 0 0 1 236 128 V252 Z" />
        <g clipPath={`url(#${arch})`} className={s.tgCrowd}>
          <circle cx={118} cy={170} r={17} />
          <path d="M92 252 V214 Q92 196 108 196 H128 Q144 196 144 214 V252 Z" />
          <circle cx={198} cy={162} r={18} />
          <path d="M170 252 V208 Q170 188 188 188 H208 Q226 188 226 208 V252 Z" />
          <circle cx={158} cy={150} r={19} />
          <path d="M128 252 V198 Q128 176 148 176 H168 Q188 176 188 198 V252 Z" />
          {/* Бланк телеграммы в руке — жёлтый, как жетоны и книги пиктограмм вокзала */}
          <path className={s.tgCrowdArm} d="M176 222 L194 232" />
          <rect className={s.pictoAccent} x={188} y={218} width={22} height={28} rx={2} transform="rotate(-8 199 232)" />
        </g>
        <path className={s.roomFrame} d="M80 252 V128 A78 78 0 0 1 236 128 V252 Z M158 50 V252 M80 170 H236" />
        <path className={s.roomSill} d="M66 258 H250" />

        {/* Стол связиста и телеграфный ключ */}
        <rect className={s.tgDesk} x={250} y={226} width={300} height={16} rx={3} />
        <path className={s.chairLeg} d="M270 242 V330 M530 242 V330" />
        <rect className={s.tgKeyBase} x={466} y={212} width={86} height={14} rx={3} />
        <g className={s.tgKeyArm}>
          <rect className={s.tgKeyBar} x={474} y={200} width={70} height={7} rx={3} />
          <circle className={s.tgKeyKnob} cx={478} cy={196} r={8} />
        </g>
        {/* Аппарат и лента с отпечатанным текстом к краю стола */}
        <rect className={s.tgSounder} x={330} y={190} width={56} height={36} rx={4} />
        <path className={s.tgTape} d="M330 214 C300 220 286 236 262 240" />

        {/* Стул */}
        <rect className={s.chairBack} x={604} y={164} width={22} height={122} rx={10} />
        <rect className={s.chairSeat} x={544} y={270} width={84} height={18} rx={8} />
        <path className={s.chairLeg} d="M556 288 V330 M616 288 V330" />

        {/* Связист — вокзальная пиктограмма в профиль (как офицеры зала «нулевого дня»): весь силуэт цвета чернил, фуражка служебного
            человека с жёлтой кокардой и просветом цвета пола, видна обувь; рука на ключе. */}
        <g className={s.tgOperator}>
          <path className={s.pictoInk} d="M558 182 Q558 164 576 164 H590 Q606 164 606 182 L604 270 H560 Z" />
          <path className={s.pictoLeg} d="M572 266 H510 V312" />
          <path className={s.pictoInk} d="M494 310 H516 Q524 310 524 318 V330 H478 Q478 318 494 314 Z" />
          <circle className={s.pictoInk} cx={582} cy={140} r={21} />
          <path className={s.pictoCap} d="M562 128 Q563 104 586 102 Q606 104 607 128 Z" />
          <rect className={s.pictoCap} x={558} y={122} width={52} height={9} rx={4} />
          <path className={s.pictoCap} d="M560 126 H538 Q540 134 556 133 Z" />
          <circle className={s.pictoAccent} cx={566} cy={113} r={4.5} />
        </g>
        <g className={s.tgHand}>
          <path className={s.pictoArm} d="M578 178 L548 214 L486 200" />
        </g>

        {/* Машинный телеграф, вид сбоку: тумба, циферблат, рычаг к выбранной табличке */}
        <rect className={s.tgPedestal} x={812} y={214} width={36} height={116} rx={6} />
        <rect className={s.tgFoot} x={792} y={318} width={76} height={14} rx={4} />
        <circle className={s.tgDial} cx={830} cy={200} r={42} />
        <path className={s.tgDialTicks} d="M830 164 V174 M800 182 L808 188 M860 182 L852 188" />
        <g className={s.tgLever}>
          <path className={s.tgLeverArm} d="M830 200 V132" />
          <rect className={s.tgLeverGrip} x={818} y={108} width={24} height={28} rx={10} />
        </g>
        <circle className={s.clockPin} cx={830} cy={200} r={7} />

        {plate("h2h", 660)}
        {plate("h2a", 850)}

        {/* Ведро «Спам» на полу — кнопка третьей строки. Корпус шире кверху, рёбра, крышка с ручкой; табличка на болтах мигает. */}
        {w.spam && (
          <g
            className={s.tgBin}
            role="button"
            tabIndex={0}
            aria-pressed={mode === "spam"}
            aria-label={w.spam.label}
            data-on={mode === "spam" ? "" : undefined}
            onClick={() => pick("spam")}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick("spam") } }}
          >
            <path className={s.tgBinBody} d="M652 232 H772 L762 330 H662 Z" />
            <path className={s.tgBinRib} d="M682 246 L686 318 M712 246 V318 M742 246 L738 318" />
            <rect className={s.tgBinLid} x={644} y={220} width={136} height={14} rx={5} />
            <path className={s.tgBinHandle} d="M696 220 V208 H728 V220" />
            <g className={s.tgBinPlate}>
              <rect className={s.tgBinPlateFace} x={664} y={256} width={96} height={40} rx={3} />
              <circle className={s.tgBolt} cx={671} cy={263} r={3} />
              <circle className={s.tgBolt} cx={753} cy={263} r={3} />
              <circle className={s.tgBolt} cx={671} cy={289} r={3} />
              <circle className={s.tgBolt} cx={753} cy={289} r={3} />
              <text className={s.tgBinCode} x={712} y={285} textAnchor="middle">{w.spam.plate}</text>
            </g>
          </g>
        )}
      </svg>

      {/* Бегущая строка — нижний край комнаты, вплотную под сценой. Без JS — стоит и читается; ключ стучит, пока строка бежит. */}
      <div data-block="tgtkr" ref={band} className={s.tgBand}>
        <p data-block="tgln1" ref={line} key={`${shown}-${run}`} className={s.tgLine}>{(w[shown] ?? w.h2h).ticker}</p>
      </div>
    </div>
  )
}
