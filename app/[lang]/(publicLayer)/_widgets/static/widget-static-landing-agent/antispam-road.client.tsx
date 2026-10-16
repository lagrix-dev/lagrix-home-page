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
//
// 498-3 (владелец 2026-10-16): «надпись + ваш тариф … на указателе третьей строкой: Только после оплаты: $0.01-Lagrix + $вам ваш тариф»;
// «Телефонная трубку нужна поднять выше потока писем чтобы письма её не перекрывали»; «зигзагообразной линия которая изображает шнур не
// нужна, трубка должна быть больше на 30% и начинается от верхнего края и идти к нижнему быть более реалистичной».

export type AntispamWords = {
  title: string
  text?: string
  scene: string
  signTop: string
  /** 498-3: the sign reads in three lines — the name, the condition, the price (the network's floor + the recipient's own rate). */
  signMid: string
  signPrice: string
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

      {/* Дорожный указатель на одной ноге — у левого края, стрелкой к грузовику. Три строки: имя, условие, цена (пол сети + тариф адресата). */}
      <div data-block="assgn" className={s.asSign}>
        <span className={s.asSignPole} aria-hidden="true" />
        <div data-block="n3iag" className={s.asSignPlate}>
          <span className={s.asSignTop}>{w.signTop}</span>
          <span className={s.asSignMid}>{w.signMid}</span>
          <span className={s.asSignPrice}>{w.signPrice}</span>
        </div>
      </div>

      {/* Аварийный придорожный телефон на опоре — слева от копилки, поверх летящих писем (498-3). Кнопка открывает окно справки.
          Трубка — в профиль, висит вдоль левого бока будки от верхнего края до нижнего: наушник и микрофон чашками к будке, ручка
          выгнута наружу, блик вдоль ручки; шнура нет. */}
      <Button variant="bare" size="bare" type="button" data-block="asphn" className={s.asPhone} popoverTarget={info} aria-label={w.phoneLabel}>
        <svg viewBox="0 0 70 210" aria-hidden="true" className={s.asPhoneSvg}>
          <rect className={s.asPhonePost} x={29} y={86} width={12} height={124} rx={3} />
          <path className={s.asPhoneRoof} d="M4 14 L35 2 L66 14 Z" />
          <rect className={s.asPhoneBox} x={8} y={14} width={54} height={72} rx={5} />
          <circle className={s.asPhoneFace} cx={38} cy={44} r={17} />
          <text className={s.asPhoneMark} x={38} y={53} textAnchor="middle">?</text>
          <g className={s.asHandset}>
            <path
              className={s.asHandsetBody}
              d="M7 13 H13 Q16 13 16 16.5 V27 Q16 30.5 12.5 30.5 H10 Q8 30.5 8 33 Q6.5 50 8 67 Q8 69.5 10 69.5 H12.5 Q16 69.5 16 73 V83.5 Q16 87 13 87 H7 Q2 87 2 81 Q-0.5 50 2 19 Q2 13 7 13 Z"
            />
            <path className={s.asHandsetCup} d="M14.6 18 V25.5 M14.6 74.5 V82" />
            <path className={s.asHandsetShine} d="M4.6 23 Q3 50 4.6 77" />
          </g>
        </svg>
      </Button>

      {/* Копилка-хрюша адресата — всегда в центре низа. Щель сверху. Ценник «+ ваш тариф» (498-2) снят: тариф — третья строка указателя (498-3). */}
      <div data-block="aspig" className={s.asPig} aria-hidden="true">
        <svg viewBox="0 0 200 150" className={s.asPigSvg}>
          <path className={s.asPigTail} d="M22 72 q-16 -6 -12 -20 q4 -10 12 -4" />
          <rect className={s.asPigLeg} x={46} y={112} width={22} height={30} rx={6} />
          <rect className={s.asPigLeg} x={124} y={112} width={22} height={30} rx={6} />
          <path className={s.asPigEarBack} d="M110 40 L118 12 L136 38 Z" />
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
          <rect className={s.asTruckBox} x={8} y={70} width={162} height={80} rx={4} />
          <path className={s.asTruckBoxRim} d="M8 74 H170" />
          <path className={s.asTruckCab} d="M174 150 V62 Q174 48 188 48 H222 Q236 48 236 62 V150 Z" />
          <rect className={s.asTruckWindow} x={188} y={60} width={36} height={32} rx={5} />
          <rect className={s.asTruckBoiler} x={234} y={92} width={86} height={58} rx={16} />
          <path className={s.asTruckBand} d="M258 92 V150 M284 92 V150" />
          <circle className={s.asTruckLamp} cx={318} cy={112} r={8} />
          <rect className={s.asTruckFrame} x={8} y={146} width={316} height={10} rx={3} />
          <rect className={s.asTruckBumper} x={300} y={144} width={36} height={12} rx={4} />
          {[72, 272].map((x) => (
            <g key={x} className={s.asWheel} transform={`translate(${x} 168)`}>
              <circle className={s.asWheelTyre} r={26} />
              <circle className={s.asWheelRim} r={16} />
              <path className={s.asWheelSpokes} d="M0 -12 V12 M-12 0 H12 M-8.5 -8.5 L8.5 8.5 M-8.5 8.5 L8.5 -8.5" />
              <circle className={s.asWheelHub} r={4.5} />
            </g>
          ))}
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
