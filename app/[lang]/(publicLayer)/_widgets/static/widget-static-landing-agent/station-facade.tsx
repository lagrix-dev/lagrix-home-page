import { DoorOpen } from "lucide-react"
import s from "./landing-agent.module.css"
import { FacadePan } from "./facade-pan.client"
import { ClockHands } from "./clock-hands.client"
import type { LandingExtra } from "./words"

// ВОКЗАЛ БУДУЩЕГО — ПЕРВЫЙ ЭКРАН ГЛАВНОЙ (узел, шаг 477). Владелец 2026-10-14: «здание вокзала которое на 50 % уходит за габариты
// экрана … классическое здание вокзала, напоминающее что-то древнеримское, связанное с правом … конечно же часы … космовокзал
// будущего … от центрального входа висит вывеска входа в будущее … два широких крыла … в стиле аэропорта, где большая стеклянная
// стена, на которой висят растяжки, которые символизируют наши цели». Центр — портик с колоннами, фронтон с весами правосудия и
// надписью BONA FIDES («добросовестность» римского права), часы с настоящим временем (тот же островок, что в зале ожидания),
// стеклянный купол с орбитой; крылья — стеклянные залы аэропорта, на них растяжки «Миссия 1» и «Миссия 2».
// 🔒 Слова — `landing.facade` данных главной; картинка — SVG, цвета — роли вокзала (README), ни одного своего значения цвета.
// Растяжки и вывеска входа — HTML поверх рисунка в координатах здания (проценты от рисунка 2400 × 900), поэтому читаются,
// переводятся и попадают в машинную копию.

type Facade = NonNullable<LandingExtra["facade"]>

// Звёзды — постоянный рисунок (детерминированный ряд), а не данные.
const STARS: [number, number, number, number][] = (() => {
  let seed = 7
  const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  return Array.from({ length: 72 }, () => [Math.round(r() * 2400), Math.round(r() * 300), +(1 + r() * 1.8).toFixed(1), +(0.35 + r() * 0.6).toFixed(2)])
})()

// Колонны портика: восемь, с широким пролётом посередине — за ним вход.
const COLUMNS = [905, 985, 1065, 1145, 1255, 1335, 1415, 1495]
const MULLIONS = Array.from({ length: 11 }, (_, i) => 60 + i * 76)
const GLASS = "M 60 334 C 330 322, 640 340, 838 376 L 838 800 L 60 800 Z"
const ORBIT_BACK = "M 940 92 A 260 34 0 0 1 1460 92"
const ORBIT_FRONT = "M 1460 92 A 260 34 0 0 1 940 92"
const ORBIT_FULL = "M 940 92 A 260 34 0 1 1 1460 92 A 260 34 0 1 1 940 92"

function Wing() {
  return (
    <g>
      <g clipPath="url(#fct-glass-clip)">
        <rect x="40" y="300" width="820" height="520" fill="url(#fct-glass)" />
        <polygon className={s.fReflect} points="120,300 230,300 80,800 -30,800" />
        <polygon className={s.fReflect} points="520,300 584,300 470,800 406,800" />
        {MULLIONS.map((x) => <line key={x} className={s.fMullion} x1={x} y1="300" x2={x} y2="800" />)}
        {[450, 570, 690].map((y) => <line key={y} className={s.fTransom} x1="40" y1={y} x2="860" y2={y} />)}
      </g>
      {[150, 450, 750].map((x) => <path key={x} className={s.fTree} d={`M ${x} 800 L ${x} 560 M ${x} 560 L ${x - 46} 334 M ${x} 560 L ${x + 46} 345`} />)}
      <path className={s.fRoofEdge} d="M 14 330 C 330 318, 640 336, 840 372 L 840 382 C 640 346, 330 328, 14 340 Z" />
      <path className={s.fRoof} d="M 840 352 C 640 318, 330 300, 20 312 L 14 330 C 330 318, 640 336, 840 372 Z" />
      <line className={s.fCable} x1="170" y1="326" x2="170" y2="372" />
      <line className={s.fCable} x1="730" y1="357" x2="730" y2="372" />
    </g>
  )
}

export function StationFacade({ w }: { w: Facade }) {
  const [m1, m2] = w.missions
  if (!m1 || !m2) return null
  return (
    <section data-block="wpwqy" className={s.facade} aria-label={w.label}>
      <FacadePan labels={[m1.name, m2.name]} aria={[`${m1.name}: ${m1.title}`, `${m2.name}: ${m2.title}`]}>
        <div data-block="ezfbv" className={s.facadeTrack}>
          <div data-block="xvbso" className={s.facadeArt}>
            <svg className={s.facadeSvg} viewBox="0 0 2400 900" role="img" aria-label={w.scene}>
              <defs>
                <linearGradient id="fct-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className={s.fSkyTop} />
                  <stop offset="1" className={s.fSkyBottom} />
                </linearGradient>
                <linearGradient id="fct-glass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className={s.fGlassTop} />
                  <stop offset="1" className={s.fGlassBottom} />
                </linearGradient>
                <radialGradient id="fct-door" cx="0.5" cy="0.75" r="0.75">
                  <stop offset="0" className={s.fDoorIn} />
                  <stop offset="1" className={s.fDoorOut} />
                </radialGradient>
                <clipPath id="fct-glass-clip"><path d={GLASS} /></clipPath>
              </defs>

              <rect x="0" y="0" width="2400" height="900" fill="url(#fct-sky)" />
              {STARS.map(([x, y, r, o]) => <circle key={`${x}-${y}`} className={s.fStar} cx={x} cy={y} r={r} opacity={o} />)}
              <g>
                <circle className={s.fPlanet} cx="250" cy="150" r="86" />
                <ellipse className={s.fPlanetRing} cx="250" cy="150" rx="150" ry="26" transform="rotate(-16 250 150)" />
              </g>
              <path className={s.fMoon} d="M 2190 92 A 46 46 0 1 0 2190 184 A 36 36 0 1 1 2190 92 Z" />

              <g transform="rotate(-6 1200 92)"><path className={s.fOrbitBack} d={ORBIT_BACK} /></g>

              {/* Башня часов, купол космовокзала и шпиль с маяком. */}
              <rect className={s.fStone} x="1128" y="116" width="144" height="200" />
              <rect className={s.fStoneShade} x="1240" y="116" width="32" height="200" />
              <rect className={s.fStone} x="1116" y="104" width="168" height="14" />
              <path className={s.fDome} d="M 1136 104 A 64 58 0 0 1 1264 104 Z" />
              <path className={s.fDomeGrid} d="M 1200 46 L 1200 104 M 1170 102 Q 1172 60 1200 46 M 1230 102 Q 1228 60 1200 46 M 1144 82 Q 1200 72 1256 82" />
              <line className={s.fSpire} x1="1200" y1="46" x2="1200" y2="14" />
              <circle className={s.fBeaconGlow} cx="1200" cy="12" r="16" />
              <circle className={s.fBeacon} cx="1200" cy="12" r="6" />

              {/* Земля, площадь и свет из двери. */}
              <rect className={s.fGround} x="0" y="800" width="2400" height="100" />
              <line className={s.fEdge} x1="0" y1="801" x2="2400" y2="801" />
              {[300, 700, 1000, 1400, 1700, 2100].map((x) => <line key={x} className={s.fPaving} x1="1200" y1="800" x2={x} y2="900" />)}
              <polygon className={s.fSpill} points="1150,800 1250,800 1350,900 1050,900" />

              {/* Крылья: левое и его зеркало. */}
              <Wing />
              <g transform="translate(2400 0) scale(-1 1)"><Wing /></g>

              {/* Портик: пилоны, стена за колоннами, вход, колонны, ступени, антаблемент с надписью, фронтон с весами. */}
              <rect className={s.fStone} x="840" y="358" width="34" height="442" />
              <rect className={s.fStone} x="1526" y="358" width="34" height="442" />
              <rect className={s.fStoneDeep} x="874" y="430" width="652" height="342" />
              <path d="M 1140 772 L 1140 610 A 60 60 0 0 1 1260 610 L 1260 772 Z" fill="url(#fct-door)" />
              <path className={s.fDoorFrame} d="M 1140 772 L 1140 610 A 60 60 0 0 1 1260 610 L 1260 772" />
              {COLUMNS.map((cx) => (
                <g key={cx}>
                  <rect className={s.fStone} x={cx - 26} y="756" width="52" height="16" />
                  <rect className={s.fStone} x={cx - 19} y="452" width="38" height="304" />
                  <rect className={s.fStoneShade} x={cx + 6} y="452" width="13" height="304" />
                  <path className={s.fFlute} d={`M ${cx - 9} 458 L ${cx - 9} 750 M ${cx} 458 L ${cx} 750`} />
                  <rect className={s.fStone} x={cx - 27} y="438" width="54" height="14" />
                  <rect className={s.fStone} x={cx - 30} y="430" width="60" height="8" />
                </g>
              ))}
              <rect className={s.fStoneShade} x="850" y="772" width="700" height="10" />
              <rect className={s.fStone} x="835" y="782" width="730" height="9" />
              <rect className={s.fStoneShade} x="820" y="791" width="760" height="9" />
              <rect className={s.fStone} x="860" y="402" width="680" height="30" />
              <rect className={s.fStoneShade} x="860" y="372" width="680" height="30" />
              <text className={s.fInscription} x="1200" y="395" textAnchor="middle">{w.inscription}</text>
              <rect className={s.fStone} x="845" y="358" width="710" height="14" />
              <polygon className={s.fStone} points="840,358 1560,358 1200,230" />
              <polygon className={s.fStoneShade} points="884,352 1516,352 1200,246" />
              <path className={s.fEmblem} d="M 1200 268 L 1200 336 M 1176 340 L 1224 340 M 1150 282 L 1250 282 M 1150 282 L 1136 312 M 1150 282 L 1164 312 M 1250 282 L 1236 312 M 1250 282 L 1264 312 M 1130 312 Q 1150 330 1170 312 M 1230 312 Q 1250 330 1270 312" />
              <circle className={s.fEmblemPin} cx="1200" cy="268" r="5" />

              {/* Часы — настоящее время посетителя (островок зала ожидания). */}
              <circle className={s.fClockFace} cx="1200" cy="200" r="56" />
              <circle className={s.fClockRim} cx="1200" cy="200" r="56" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30 * Math.PI) / 180
                return <line key={i} className={s.fClockTick} x1={(1200 + Math.sin(a) * 40).toFixed(1)} y1={(200 - Math.cos(a) * 40).toFixed(1)} x2={(1200 + Math.sin(a) * 48).toFixed(1)} y2={(200 - Math.cos(a) * 48).toFixed(1)} />
              })}
              <ClockHands cx={1200} cy={200} r={56} />
              <circle className={s.fClockPin} cx="1200" cy="200" r="5" />

              <g transform="rotate(-6 1200 92)">
                <path className={s.fOrbitFront} d={ORBIT_FRONT} />
                <circle className={s.fSat} r="7">
                  <animateMotion dur="18s" repeatCount="indefinite" path={ORBIT_FULL} />
                </circle>
              </g>
            </svg>
            <div data-block="kcio5" className={s.facadeEntrance}>
              <span className={s.entranceRods} aria-hidden="true" />
              <p data-block="rttun" className={s.entrancePlate}>
                <span className={s.entranceMark} aria-hidden="true"><DoorOpen className="size-[0.9em]" strokeWidth={2.4} /></span>
                {w.entrance}
              </p>
            </div>
          </div>
          {w.missions.slice(0, 2).map((m, i) => (
            <article data-block="ytlw9" key={m.name} className={s.mission} data-side={i ? "right" : "left"}>
              <p data-block="sizba" className={s.missionKicker}>
                <span className={s.missionNum}>{i + 1}</span>
                {m.name}
              </p>
              <h2 data-block="ayab4" className={s.missionTitle}>{m.title}</h2>
              <p data-block="o9i62" className={s.missionLine}>{m.line}</p>
              <p data-block="yjfhd" className={s.missionText}>{m.text}</p>
              <ul data-block="v20ap" className={s.missionStops}>
                {m.stops.map((st) => <li data-block="zmrjc" key={st}>{st}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </FacadePan>
    </section>
  )
}
