"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import { Button } from "@/components/ui/button"
import s from "./landing-agent.module.css"

// СЦЕНА «A2A АНТИСПАМ» (владелец 2026-10-15, шаг 498, навык impeccable, путь «Launcher unavailable»): «комната а2а антиспам … в этот раз
// можно предположить что это не комната открытое пространство … грузовичок который в целом оформлен в стиле паровоза … а2а доставка
// оплаченных заказов. Конверты и посылки пролетают над копилкой в виде хрюши и из каждой из них выпадает денежка … хрюша расположен в
// нижней части центральной части экрана независимо от ширины экрана … дорожную указатель на одной ножке … в противоположной стороне от
// автомобиля … со стрелкой указывающим в сторону автомобиля … сверху а2а антиспам, в нижней части … только после оплаты 0.01$ … слева от
// Хрюша за летящими письмами стоит опора … старый телефон типа таксофон … значок вопросик при наведении трубка … начинает вибрировать а
// при нажатии … справа всплывает информационное окно … не более одного абзаца с отсылкой в документацию».
//
// Мир — тот же вокзал (DIRECTION.md): роли табло, плаката, сигнала и мела; одно авторское движение — полёт писем и посылок над копилкой.
// Сцена — слои HTML в контейнере с единицами cqw/cqh: хрюша привязана к центру низа при любой ширине, указатель — к левому краю,
// грузовик — к правому. Без JavaScript и при «уменьшить движение» сцена стоит в одном кадре (письмо над копилкой, монетка в падении,
// посылка над кузовом). Окно справки — встроенный popover браузера: открывается и без JavaScript, закрывается Escape и щелчком мимо.

export type AntispamWords = {
  title: string
  text?: string
  scene: string
  signTop: string
  signBottom: string
  truckTitle: string
  truckSub: string
  phoneLabel: string
  infoTitle: string
  info: string
  more: string
  close: string
}

const FLIGHTS = [0, 1, 2, 3] as const

function Envelope() {
  return (
    <svg viewBox="0 0 60 42" aria-hidden="true" className={s.asItemSvg}>
      <rect className={s.asEnvelope} x={2} y={2} width={56} height={38} rx={3} />
      <path className={s.asEnvelopeFold} d="M3 4 L30 24 L57 4" />
      <rect className={s.asStamp} x={44} y={7} width={9} height={11} rx={1} />
    </svg>
  )
}

function Parcel() {
  return (
    <svg viewBox="0 0 60 48" aria-hidden="true" className={s.asItemSvg}>
      <rect className={s.asParcel} x={2} y={6} width={56} height={40} rx={3} />
      <path className={s.asParcelLid} d="M2 16 H58" />
      <path className={s.asParcelTape} d="M30 6 V46" />
      <rect className={s.asStamp} x={40} y={22} width={12} height={9} rx={1} />
    </svg>
  )
}

export function AntispamRoad({ w, docHref }: { w: AntispamWords; docHref: string }) {
  const [run, setRun] = useState(false)
  const road = useRef<HTMLDivElement>(null)
  const info = useId()

  // Полёт идёт, пока сцена на экране, и замирает, когда её прокрутили.
  useEffect(() => {
    const el = road.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div data-block="asrod" ref={road} className={s.asRoad} data-run={run ? "" : undefined}>
      <p data-block="z63kq" className={s.asSr}>{w.scene}</p>

      {/* Дорога: полотно цвета табло с обочиной и меловой разметкой. */}
      <div data-block="ialyb" className={s.asRoadBand} aria-hidden="true" />

      {/* Дорожный указатель на одной ноге — у левого края, стрелкой к грузовику. */}
      <div data-block="assgn" className={s.asSign}>
        <span className={s.asSignPole} aria-hidden="true" />
        <div data-block="n3iag" className={s.asSignPlate}>
          <span className={s.asSignTop}>{w.signTop}</span>
          <span className={s.asSignBottom}>{w.signBottom}</span>
        </div>
      </div>

      {/* Аварийный придорожный телефон на опоре — слева от копилки, позади летящих писем. Кнопка открывает окно справки. */}
      <Button variant="bare" size="bare" type="button" data-block="asphn" className={s.asPhone} popoverTarget={info} aria-label={w.phoneLabel}>
        <svg viewBox="0 0 70 210" aria-hidden="true" className={s.asPhoneSvg}>
          <rect className={s.asPhonePost} x={29} y={86} width={12} height={124} rx={3} />
          <path className={s.asPhoneRoof} d="M4 14 L35 2 L66 14 Z" />
          <rect className={s.asPhoneBox} x={8} y={14} width={54} height={72} rx={5} />
          <circle className={s.asPhoneFace} cx={38} cy={44} r={17} />
          <text className={s.asPhoneMark} x={38} y={53} textAnchor="middle">?</text>
          <path className={s.asPhoneCord} d="M14 66 q-6 6 0 10 q6 4 0 10 q-6 4 0 10" />
          <g className={s.asHandset}>
            <path className={s.asHandsetBody} d="M10 24 q-8 0 -8 9 v22 q0 9 8 9 h3 v-8 h-3 q-2 0 -2 -3 v-18 q0 -3 2 -3 h3 v-8 Z" />
          </g>
        </svg>
      </Button>

      {/* Копилка-хрюша — всегда в центре низа. Щель сверху. */}
      <div data-block="aspig" className={s.asPig} aria-hidden="true">
        <svg viewBox="0 0 200 150" className={s.asPigSvg}>
          <path className={s.asPigTail} d="M22 72 q-16 -6 -12 -20 q4 -10 12 -4" />
          <rect className={s.asPigLeg} x={46} y={112} width={22} height={30} rx={6} />
          <rect className={s.asPigLeg} x={124} y={112} width={22} height={30} rx={6} />
          <ellipse className={s.asPigBody} cx={98} cy={80} rx={80} ry={54} />
          <path className={s.asPigEar} d="M132 36 L144 8 L158 40 Z" />
          <ellipse className={s.asPigSnout} cx={176} cy={86} rx={18} ry={22} />
          <circle className={s.asPigNostril} cx={171} cy={80} r={3.5} />
          <circle className={s.asPigNostril} cx={181} cy={80} r={3.5} />
          <circle className={s.asPigEye} cx={146} cy={64} r={6} />
          <rect className={s.asPigSlot} x={76} y={24} width={44} height={8} rx={4} />
        </svg>
      </div>

      {/* Грузовик в стиле паровоза — у правого края; кузов открыт к копилке, надпись на борту кузова. */}
      <div data-block="astrk" className={s.asTruck}>
        <svg viewBox="0 0 340 200" aria-hidden="true" className={s.asTruckSvg}>
          <path className={s.asSteam} d="M282 22 q-8 -14 6 -18 q10 -10 22 0 q14 -2 12 12 q8 10 -6 14 q-6 10 -20 4 q-14 4 -14 -12 Z" />
          <rect className={s.asTruckBox} x={8} y={70} width={162} height={80} rx={4} />
          <path className={s.asTruckBoxRim} d="M8 74 H170" />
          <rect className={s.asTruckCab} x={170} y={40} width={58} height={110} rx={6} />
          <rect className={s.asTruckWindow} x={182} y={54} width={34} height={30} rx={4} />
          <rect className={s.asTruckBoiler} x={226} y={84} width={92} height={66} rx={10} />
          <path className={s.asTruckBand} d="M252 84 V150 M282 84 V150" />
          <path className={s.asTruckChimney} d="M282 84 V44 H276 L272 30 H310 L306 44 H300 V84 Z" />
          <circle className={s.asTruckFront} cx={318} cy={117} r={22} />
          <circle className={s.asTruckLamp} cx={318} cy={117} r={8} />
          <path className={s.asTruckCatcher} d="M300 150 L338 150 L330 168 L300 168 Z" />
          <rect className={s.asTruckFrame} x={8} y={150} width={300} height={10} rx={3} />
          {[66, 196, 272].map((x) => (
            <g key={x} className={s.asWheel} transform={`translate(${x} 166)`}>
              <circle className={s.asWheelRim} r={28} />
              <path className={s.asWheelSpokes} d="M0 -22 V22 M-22 0 H22 M-15.5 -15.5 L15.5 15.5 M-15.5 15.5 L15.5 -15.5" />
              <circle className={s.asWheelHub} r={6} />
            </g>
          ))}
          <path className={s.asTruckRod} d="M66 180 H272" />
        </svg>
        <div data-block="jnbdc" className={s.asTruckText}>
          <span className={s.asTruckTitle}>{w.truckTitle}</span>
          <span className={s.asTruckSub}>{w.truckSub}</span>
        </div>
      </div>

      {/* Письма и посылки: от стрелки указателя над копилкой — из каждого выпадает монетка — и в кузов. */}
      {FLIGHTS.map((i) => (
        <div data-block="ajuwt" key={i} className={s.asFly} data-i={i} style={{ "--i": i } as CSSProperties} aria-hidden="true">
          {i % 2 === 0 ? <Envelope /> : <Parcel />}
        </div>
      ))}
      {FLIGHTS.map((i) => (
        <span key={`c${i}`} className={s.asCoin} data-i={i} style={{ "--i": i } as CSSProperties} aria-hidden="true" />
      ))}

      {/* Окно справки — справа, один абзац и ссылка в документацию. */}
      <div data-block="qggje" id={info} popover="auto" className={s.asInfo} role="dialog" aria-labelledby={`${info}-t`}>
        <p data-block="akrnt" id={`${info}-t`} className={s.asInfoTitle}>{w.infoTitle}</p>
        <p data-block="zr27r" className={s.asInfoText}>{w.info}</p>
        <div data-block="c44gv" className={s.asInfoActions}>
          <a className={s.asInfoMore} href={docHref}>{w.more}</a>
          <Button variant="bare" size="bare" type="button" className={s.asInfoClose} popoverTarget={info} popoverTargetAction="hide">{w.close}</Button>
        </div>
      </div>
    </div>
  )
}
