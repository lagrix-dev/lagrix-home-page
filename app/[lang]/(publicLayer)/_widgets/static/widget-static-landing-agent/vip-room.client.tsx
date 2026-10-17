"use client"

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppDialog } from "@/components/dialog/app-dialog.client"
import type { AppDialogUi } from "@/components/dialog/app-dialog.i18n"
import s from "./landing-agent.module.css"

// КОМНАТА «VIP PERSON» (владелец 2026-10-17, шаг 515-5, навык impeccable, путь «Launcher unavailable»): «представить это в виде зала из
// музея Лувр где на стенах висят картины … узнаваемые силуэты невероятно важных людей прошлого … фотоаппарат на трёх ножках с
// характерной вспышкой … фотограф силуэт накрытый чёрной тканью … справа волнообразная гардина … нажимаешь кнопку стать Вип зажигается
// магниевая вспышка в течение 2 секунд она просто горит с искрами затем … заливает светом полностью всю комнату и исчезают все
// элементы … держится полсекунды а затем плавно в течение 1 секунды вспышка растворяется и в центре помещения появляется модальное окно».
//
// Мир — тот же вокзал (DIRECTION.md): стена — табло, рамы — плакат (золото), холсты — мел, силуэты — чернила без лиц (как
// вокзальные пиктограммы zero-day), колонны — мел, гардина — сигнал, кнопка — сигнал. Одно авторское движение — вспышка магния.
// Фазы — `data-phase` на комнате, движение — в CSS; таймеры только здесь. Без JavaScript кнопки нет — стоит ссылка на страницу
// «Официальные агенты» (noscript); концепция окна всегда есть в HTML (список asSr) и в markdown-копии. Под «уменьшить движение» —
// без магния и вспышки: окно открывается сразу.

export type VipWords = {
  title: string
  text?: string
  /** Подпись сцены для читалок экрана: что нарисовано. */
  scene: string
  button: string
  dialogTitle: string
  dialogText: string
  /** Пункты концепции метки «Официальный» — из документа 24 протокола. */
  points: string[]
  /** Ссылка внизу окна; адрес с «/» получает язык страницы. */
  more: { label: string; href: string }
}

type Phase = "idle" | "burn" | "flash" | "fade" | "open" | "back"

// Тайминг — слова владельца: магний горит 2 с, белое держится 0,5 с, растворяется 1 с; окно — на середине растворения.
const BURN = 2000
const HOLD = 500
const FADE = 1000
const BACK = 500

// Искры магния: смещение от чаши (единицы рисунка) и задержка внутри цикла 0,8 с.
const SPARKS: [number, number, number][] = [
  [-38, -44, 0], [-20, -62, 120], [6, -70, 260], [28, -58, 60], [44, -36, 340], [-50, -18, 200],
  [52, -12, 420], [-28, -30, 520], [16, -40, 600], [36, -76, 160], [-8, -54, 460], [58, -48, 300],
]

/** Силуэт в профиль (лицом вправо) в поле 100×120: голова, шея, плечи. Знак эпохи дорисовывается поверх. */
const BUST =
  "M38 112 C38 94 44 88 48 84 C40 80 34 68 34 54 C34 36 46 26 58 26 C66 26 70 34 70 42 L72 50 L76 58 L71 60 L72 66 L69 68 L70 73 C68 78 62 80 58 80 L60 88 C70 92 80 98 84 112 Z"

function Portrait({ sign }: { sign: "bicorne" | "laurel" | "stovepipe" | "ruff" | "nemes" }) {
  return (
    <g className={s.vipInk}>
      <path d={BUST} />
      {sign === "bicorne" && (
        <>
          {/* треуголка, надетая поперёк: из профиля — широкий полумесяц над головой */}
          <path d="M14 44 C24 12 86 8 98 36 C86 31 70 30 60 34 C50 30 30 32 14 44 Z" />
          <path d="M44 86 L66 84 L70 96 L44 98 Z" />
        </>
      )}
      {sign === "laurel" && (
        <>
          {/* лавровый венок: листья выступают над контуром головы */}
          {[[36, 46, -60], [38, 38, -40], [43, 31, -20], [50, 27, 0], [58, 25, 15], [65, 28, 35], [70, 34, 55]].map(([x, y, a]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={7} ry={3.2} transform={`rotate(${a} ${x} ${y})`} />
          ))}
          <path d="M34 52 L24 62 L30 64 Z" />
          {/* тога через плечо */}
          <path d="M36 112 C44 96 62 90 86 104 L88 112 Z" />
        </>
      )}
      {sign === "stovepipe" && (
        <>
          {/* высокий цилиндр и борода без усов по линии челюсти */}
          <path d="M28 30 L86 30 L86 34 L28 34 Z" />
          <path d="M40 -6 L74 -6 L72 31 L42 31 Z" />
          <path d="M40 70 C46 84 58 90 70 82 L72 70 C66 80 54 82 48 72 Z" />
        </>
      )}
      {sign === "ruff" && (
        <>
          {/* брыжи — широкий гофрированный воротник, волосы сзади, бородка клином */}
          <path d="M26 88 L32 82 L38 88 L44 82 L50 88 L56 82 L62 88 L68 82 L74 88 L80 82 L86 88 L80 96 L74 92 L68 98 L62 92 L56 98 L50 92 L44 98 L38 92 L32 98 L26 92 Z" />
          <path d="M34 54 C30 64 32 76 42 82 L46 70 Z" />
          <path d="M66 72 L74 84 L64 80 Z" />
        </>
      )}
      {sign === "nemes" && (
        <>
          {/* египетская причёска до плеч с диадемой и уреем надо лбом */}
          <path d="M30 40 C32 26 48 20 60 22 C66 23 70 28 70 34 L56 36 L52 86 L30 92 C26 74 26 54 30 40 Z" />
          <path d="M66 18 C74 14 78 22 72 26 C70 28 70 32 72 34 L68 36 C64 30 64 24 66 18 Z" />
        </>
      )}
    </g>
  )
}

/** Рама: золото плаката, холст мела; овальная или прямоугольная. Портрет вписан в холст. */
function Frame({ x, y, w, h, oval, sign }: { x: number; y: number; w: number; h: number; oval?: boolean; sign: Parameters<typeof Portrait>[0]["sign"] }) {
  const cx = x + w / 2
  const cy = y + h / 2
  const scale = Math.min((w - 34) / 100, (h - 34) / 120)
  const px = cx - 50 * scale
  const py = cy - 60 * scale + 4
  return (
    <g>
      <rect className={s.vipLampArm} x={cx - 2} y={y - 22} width={4} height={14} />
      <path className={s.vipLamp} d={`M${cx - 22} ${y - 10} L${cx + 22} ${y - 10} L${cx + 14} ${y - 2} L${cx - 14} ${y - 2} Z`} />
      {oval ? (
        <>
          <ellipse className={s.vipGilt} cx={cx} cy={cy} rx={w / 2} ry={h / 2} />
          <ellipse className={s.vipGiltDeep} cx={cx} cy={cy} rx={w / 2 - 7} ry={h / 2 - 7} />
          <ellipse className={s.vipCanvas} cx={cx} cy={cy} rx={w / 2 - 13} ry={h / 2 - 13} />
        </>
      ) : (
        <>
          <rect className={s.vipGilt} x={x} y={y} width={w} height={h} rx={3} />
          <rect className={s.vipGiltDeep} x={x + 7} y={y + 7} width={w - 14} height={h - 14} />
          <rect className={s.vipCanvas} x={x + 13} y={y + 13} width={w - 26} height={h - 26} />
        </>
      )}
      <g transform={`translate(${px} ${py}) scale(${scale})`}>
        <Portrait sign={sign} />
      </g>
    </g>
  )
}

function Column({ x }: { x: number }) {
  return (
    <g className={s.vipColumn}>
      <rect x={x - 6} y={62} width={92} height={9} />
      <rect x={x - 2} y={71} width={84} height={16} />
      <circle cx={x + 2} cy={79} r={9} />
      <circle cx={x + 78} cy={79} r={9} />
      <rect x={x + 12} y={87} width={56} height={326} />
      {[22, 34, 46, 58].map((d) => <rect key={d} className={s.vipFlute} x={x + d} y={95} width={3} height={310} />)}
      <rect x={x + 4} y={411} width={72} height={10} />
      <rect x={x - 4} y={421} width={88} height={12} />
    </g>
  )
}

export function VipRoom({ w, lang, ui }: { w: VipWords; lang: string; ui: AppDialogUi }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const timers = useRef<number[]>([])
  const href = w.more.href.startsWith("/") ? `/${lang}${w.more.href}` : w.more.href

  const later = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)) }
  const clear = () => { timers.current.forEach((t) => window.clearTimeout(t)); timers.current = [] }
  useEffect(() => clear, [])

  const start = (e: MouseEvent) => {
    e.preventDefault()
    if (phase !== "idle") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase("open"); return }
    setPhase("burn")
    later(BURN, () => setPhase("flash"))
    later(BURN + HOLD, () => setPhase("fade"))
    later(BURN + HOLD + FADE / 2, () => setPhase("open"))
  }
  const close = (open: boolean) => {
    if (open) return
    clear()
    setPhase("back")
    later(BACK, () => setPhase("idle"))
  }
  const dialogOpen = phase === "open"

  return (
    <div data-block="le9pi" className={s.vipRoom} data-phase={phase}>
      <p data-block="mk8gg" className={s.asSr}>{w.scene}</p>
      {/* Концепция окна — всегда в HTML: её читают поиск, агенты и читалки экрана, окно её только показывает. */}
      <div data-block="nsbst" className={s.asSr}>
        <p data-block="ov6fn">{w.dialogTitle}</p>
        <p data-block="j7ozb">{w.dialogText}</p>
        <ol data-block="vvh0n">{w.points.map((p) => <li data-block="v8dri" key={p}>{p}</li>)}</ol>
        <a href={href}>{w.more.label}</a>
      </div>

      <div data-block="if65b" className={s.vipStage}>
        <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className={s.vipSvg}>
          <defs>
            <radialGradient id="vip-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" className={s.vipGlowCore} />
              <stop offset="45%" className={s.vipGlowMid} />
              <stop offset="100%" className={s.vipGlowEdge} />
            </radialGradient>
          </defs>

          {/* Помещение: стена, панель, плинтус, паркет — остаются на месте, когда вспышка «стирает» предметы. */}
          <rect className={s.vipWall} x={0} y={0} width={1200} height={430} />
          <rect className={s.vipWainscot} x={0} y={356} width={1200} height={74} />
          <rect className={s.vipMolding} x={0} y={352} width={1200} height={4} />
          <rect className={s.vipFloor} x={0} y={430} width={1200} height={130} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <path key={i} className={s.vipParquet} d={`M${i * 160 - 120} 560 L${i * 160 + 10} 430`} />)}
          <rect className={s.vipSkirting} x={0} y={426} width={1200} height={6} />

          <g className={s.vipObjects}>
            <Column x={28} />
            <Column x={1092} />

            {/* Картины: силуэты людей далёкого прошлого, каждого узнают по одному знаку. */}
            <Frame x={140} y={96} w={118} h={150} oval sign="bicorne" />
            <Frame x={286} y={78} w={104} h={130} oval sign="laurel" />
            <Frame x={604} y={84} w={112} h={170} sign="stovepipe" />
            <Frame x={276} y={236} w={96} h={112} sign="ruff" />
            <Frame x={736} y={110} w={96} h={124} oval sign="nemes" />

            {/* Гардина — фон, на котором снимали людей: штанга, волны складок, подхват. */}
            <rect className={s.vipRod} x={846} y={54} width={238} height={8} rx={4} />
            <path className={s.vipCurtain} d="M852 62 L1080 62 L1080 430 C1066 446 1052 436 1038 446 C1024 456 1008 440 994 450 C980 460 964 444 950 452 C936 460 920 444 906 450 C892 456 876 444 862 448 L852 446 Z" />
            {[880, 922, 966, 1010, 1052].map((x) => <path key={x} className={s.vipFold} d={`M${x} 64 C${x + 10} 150 ${x - 10} 250 ${x + 6} 340 C${x + 12} 380 ${x - 4} 420 ${x + 4} 444`} />)}
            <path className={s.vipTie} d="M852 250 C880 262 896 286 902 316 L894 318 C886 292 872 272 852 262 Z" />

            {/* Фотоаппарат на треноге — чуть левее середины, объектив смотрит на гардину. */}
            <path className={s.vipWood} d="M506 362 L452 502 L460 504 L510 370 Z M510 364 L520 506 L528 506 L518 364 Z M514 362 L566 498 L574 496 L522 360 Z" />
            <rect className={s.vipWood} x={466} y={296} width={36} height={68} rx={2} />
            <path className={s.vipBellows} d="M502 302 L548 312 L548 352 L502 360 Z" />
            {[512, 522, 532, 542].map((x) => <path key={x} className={s.vipPleat} d={`M${x} ${304 + (x - 502) * 0.22} L${x} ${358 - (x - 502) * 0.15}`} />)}
            <rect className={s.vipWood} x={548} y={306} width={14} height={50} rx={2} />
            <rect className={s.vipBrass} x={562} y={318} width={30} height={26} rx={4} />
            <circle className={s.vipLens} cx={592} cy={331} r={9} />

            {/* Фотограф под чёрной тканью: силуэт чернилами, лица нет, видна обувь; поднятая рука держит вспышку. */}
            <g className={s.vipInk}>
              <path d="M470 300 C452 290 432 290 420 300 C404 312 398 340 400 372 L398 432 L448 432 L452 392 C462 384 470 360 470 340 Z" />
              <path d="M404 430 L404 486 L418 486 L420 432 Z M430 432 L434 486 L448 486 L446 430 Z" />
              <path d="M396 484 C396 478 402 476 420 478 L422 492 L394 492 Z M428 484 C428 478 434 476 452 478 L454 492 L426 492 Z" />
              <path d="M404 316 L392 292 L396 252 L406 252 L404 290 L414 312 Z" />
            </g>
            <rect className={s.vipStick} x={397} y={208} width={6} height={50} />
            <path className={s.vipTray} d="M368 204 L432 204 L426 214 L374 214 Z" />
            <path className={s.vipPowder} d="M376 204 C388 198 412 198 424 204 Z" />
          </g>

          {/* Магний горит: тёплый свет растёт, чаша вспыхивает, искры и дым — только в фазе burn. */}
          <circle className={s.vipWarm} cx={400} cy={204} r={260} fill="url(#vip-glow)" />
          <ellipse className={s.vipPowderGlow} cx={400} cy={200} rx={30} ry={12} fill="url(#vip-glow)" />
          <g className={s.vipSparks}>
            {SPARKS.map(([dx, dy, d]) => (
              <circle key={`${dx}-${dy}`} className={s.vipSpark} cx={400} cy={200} r={dx % 2 ? 2.4 : 3}
                style={{ "--dx": `${dx}px`, "--dy": `${dy}px`, "--d": `${d}ms` } as CSSProperties} />
            ))}
          </g>
          {[[388, 0], [404, 300], [418, 600]].map(([x, d]) => (
            <circle key={x} className={s.vipSmoke} cx={x} cy={196} r={12} style={{ "--d": `${d}ms` } as CSSProperties} />
          ))}
        </svg>

        <div data-block="d6lkd" className={s.vipFlash} aria-hidden="true" />

        <Button type="button" variant="bare" size="bare" className={s.vipButton} onClick={start} aria-haspopup="dialog">
          <Camera className="size-5" strokeWidth={2.2} aria-hidden="true" />
          {w.button}
        </Button>
        <noscript>
          <a className={s.vipNoscript} href={href}>{w.more.label}</a>
        </noscript>
      </div>

      <AppDialog open={dialogOpen} onOpenChange={close} title={w.dialogTitle} description={w.dialogText} ui={ui} size="md">
        <ol data-block="e7w7p" className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground marker:text-muted-foreground">
          {w.points.map((p) => <li data-block="zn8cf" key={p}>{p}</li>)}
        </ol>
        <a className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4" href={href}>{w.more.label}</a>
      </AppDialog>
    </div>
  )
}
