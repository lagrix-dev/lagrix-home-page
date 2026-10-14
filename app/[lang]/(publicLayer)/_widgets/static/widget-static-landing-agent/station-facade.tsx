import { DoorOpen } from "lucide-react"
import s from "./landing-agent.module.css"
import { FacadePan } from "./facade-pan.client"
import { ClockHands } from "./clock-hands.client"
import type { LandingExtra } from "./words"
import { starField } from "./stars"

// ВОКЗАЛ БУДУЩЕГО — ПЕРВЫЙ ЭКРАН ГЛАВНОЙ (узел, шаг 477). Владелец 2026-10-14: «здание вокзала, которое на 50 % уходит за габариты
// экрана … конечно же часы … космовокзал будущего … от центрального входа висит вывеска входа в будущее … два широких крыла …
// в стиле аэропорта, где большая стеклянная стена, на которой висят растяжки, которые символизируют наши цели».
// Вторая редакция (его правка того же дня): «вывеска висит внутри вокзала, при наведении она подсвечивается, поэтому она никак не
// может находиться за габаритами левого и правого крыла» — растяжка стоит внутри стекла крыла с одинаковым отступом со всех
// четырёх сторон, крылья длиннее, растяжка вдвое шире (две колонки); «убираем колонны … весы как иконку справедливости … всю
// центральную часть … в современный стиль», орбита с плывущим спутником остаётся.
// 🔒 Три слоя: рисунок здания (SVG) → растяжки и вывеска входа (HTML в координатах рисунка 2880 × 900: проценты и `cqh`) →
// стекло крыльев (второй SVG поверх растяжек: переплёты, блики, тонировка). Поэтому растяжка — за стеклом, а наведение на неё
// снимает тонировку и подсвечивает её. Слова — `landing.facade`; цвета — роли вокзала (README), ни одного своего значения цвета.

type Facade = NonNullable<LandingExtra["facade"]>

const W = 2880
// Звёзды — общий ряд неба вокзала (`stars.ts`): тот же, что у первого экрана.
const STARS = starField(84, W, 300)

// Крыло: стекло x 50…1090, верх 336…340, пол 800. Растяжка внутри — отступ 48 со всех сторон: x 98…1042, y 388…752.
const WING_GLASS = "50,336 1090,340 1090,800 50,800"
const WING_MULLIONS = Array.from({ length: 10 }, (_, i) => 50 + (i + 1) * 95)
// Центр: стеклянный свод, ось x = 1440, вершина 172.
const HALL = "M 1110 800 L 1110 360 C 1110 250, 1280 180, 1440 172 C 1600 180, 1770 250, 1770 360 L 1770 800 Z"
const HALL_FRAME = "M 1110 800 L 1110 360 C 1110 250, 1280 180, 1440 172 C 1600 180, 1770 250, 1770 360 L 1770 800"
const HALL_MULLIONS = Array.from({ length: 10 }, (_, i) => 1150 + i * 64)
const ORBIT_BACK = "M 1140 160 A 300 40 0 0 1 1740 160"
const ORBIT_FRONT = "M 1740 160 A 300 40 0 0 1 1140 160"
const ORBIT_FULL = "M 1140 160 A 300 40 0 1 1 1740 160 A 300 40 0 1 1 1140 160"

function WingBack() {
  return (
    <g>
      <polygon points={WING_GLASS} fill="url(#fct-glass)" />
      <line className={s.fFloorLine} x1="50" y1="640" x2="1090" y2="640" />
      {[80, 1060].map((x) => <path key={x} className={s.fTree} d={`M ${x} 800 L ${x} 600 M ${x} 600 L ${x - 30} 340 M ${x} 600 L ${x + 30} 340`} />)}
      <path className={s.fRoofEdge} d="M 26 332 L 1100 340 L 1100 348 L 30 340 Z" />
      <path className={s.fRoof} d="M 1100 300 C 800 290, 380 296, 30 314 L 26 332 L 1100 340 Z" />
      <line className={s.fCable} x1="158" y1="340" x2="158" y2="388" />
      <line className={s.fCable} x1="982" y1="340" x2="982" y2="388" />
    </g>
  )
}

// Стекло крыла поверх растяжки: переплёты, горизонтали, блики и тонировка ровно над растяжкой (её снимает наведение).
function WingGlass({ side }: { side: "left" | "right" }) {
  return (
    <g className={s.fGlassFront} data-side={side}>
      <rect className={s.fTint} x="98" y="388" width="944" height="364" />
      <polygon className={s.fReflect} points="180,336 300,336 160,800 40,800" />
      <polygon className={s.fReflect} points="640,338 710,338 590,800 520,800" />
      {[470, 600, 730].map((y) => <line key={y} className={s.fTransom} x1="50" y1={y} x2="1090" y2={y} />)}
      {WING_MULLIONS.map((x) => <line key={x} className={s.fMullion} x1={x} y1="337" x2={x} y2="800" />)}
    </g>
  )
}

export function StationFacade({ w }: { w: Facade }) {
  const [m1, m2] = w.missions
  if (!m1 || !m2) return null
  return (
    <section data-block="xgxh5" className={s.facade} aria-label={w.label}>
      <FacadePan labels={[m1.name, m2.name]} aria={[`${m1.name}: ${m1.title}`, `${m2.name}: ${m2.title}`]}>
        <div data-block="bdxpx" className={s.facadeTrack}>
          <div data-block="s836g" className={s.facadeArt}>
            <svg className={s.facadeSvg} viewBox={`0 0 ${W} 900`} role="img" aria-label={w.scene}>
              <defs>
                <linearGradient id="fct-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className={s.fSkyTop} />
                  <stop offset="1" className={s.fSkyBottom} />
                </linearGradient>
                <linearGradient id="fct-glass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className={s.fGlassTop} />
                  <stop offset="1" className={s.fGlassBottom} />
                </linearGradient>
                <linearGradient id="fct-hall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className={s.fGlassTop} />
                  <stop offset="1" className={s.fHallBottom} />
                </linearGradient>
                <radialGradient id="fct-door" cx="0.5" cy="0.8" r="0.8">
                  <stop offset="0" className={s.fDoorIn} />
                  <stop offset="1" className={s.fDoorOut} />
                </radialGradient>
                <clipPath id="fct-hall-clip"><path d={HALL} /></clipPath>
              </defs>

              <rect x="0" y="0" width={W} height="900" fill="url(#fct-sky)" />
              {STARS.map(([x, y, r, o]) => <circle key={`${x}-${y}`} className={s.fStar} cx={x} cy={y} r={r} opacity={o} />)}
              <circle className={s.fPlanet} cx="330" cy="150" r="86" />
              <ellipse className={s.fPlanetRing} cx="330" cy="150" rx="150" ry="26" transform="rotate(-16 330 150)" />
              <path className={s.fMoon} d="M 2620 92 A 46 46 0 1 0 2620 184 A 36 36 0 1 1 2620 92 Z" />

              <g transform="rotate(-6 1440 160)"><path className={s.fOrbitBack} d={ORBIT_BACK} /></g>

              {/* Площадь и свет из дверей. */}
              <rect className={s.fGround} x="0" y="800" width={W} height="100" />
              <line className={s.fEdge} x1="0" y1="801" x2={W} y2="801" />
              {[300, 800, 1150, 1730, 2080, 2580].map((x) => <line key={x} className={s.fPaving} x1="1440" y1="800" x2={x} y2="900" />)}
              <polygon className={s.fSpill} points="1360,800 1520,800 1620,900 1260,900" />

              {/* Крылья: левое и его зеркало. */}
              <WingBack />
              <g transform={`translate(${W} 0) scale(-1 1)`}><WingBack /></g>

              {/* Центр: стеклянный свод с рёбрами, козырёк с надписью, двери. */}
              <path d={HALL} fill="url(#fct-hall)" />
              <g clipPath="url(#fct-hall-clip)">
                {HALL_MULLIONS.map((x) => <line key={x} className={s.fMullion} x1={x} y1="160" x2={x} y2="800" />)}
                {[470, 640].map((y) => <line key={y} className={s.fTransom} x1="1100" y1={y} x2="1780" y2={y} />)}
                <polygon className={s.fReflect} points="1180,170 1260,170 1190,800 1110,800" />
              </g>
              <path className={s.fRib} d="M 1180 800 L 1180 372 C 1180 285, 1300 220, 1440 214 C 1580 220, 1700 285, 1700 372 L 1700 800" />
              <path className={s.fRibThin} d="M 1260 800 L 1260 392 C 1260 320, 1340 268, 1440 264 C 1540 268, 1620 320, 1620 392 L 1620 800" />
              <path className={s.fFrame} d={HALL_FRAME} />
              <line className={s.fCable} x1="1270" y1="556" x2="1232" y2="470" />
              <line className={s.fCable} x1="1610" y1="556" x2="1648" y2="470" />
              <path className={s.fRoof} d="M 1250 554 L 1630 554 L 1652 580 L 1228 580 Z" />
              <text className={s.fInscription} x="1440" y="573" textAnchor="middle">{w.inscription}</text>
              <rect x="1340" y="600" width="200" height="200" fill="url(#fct-door)" />
              <path className={s.fDoorFrame} d="M 1340 800 L 1340 600 L 1540 600 L 1540 800 M 1390 600 L 1390 800 M 1440 600 L 1440 800 M 1490 600 L 1490 800" />
              <rect className={s.fStoneShade} x="1230" y="792" width="420" height="8" />

              {/* Знак справедливости — весы светящейся линией в стекле свода. */}
              <path className={s.fJustice} d="M 1440 398 L 1440 500 M 1404 500 L 1476 500 M 1380 410 L 1500 410 M 1380 410 L 1362 450 M 1380 410 L 1398 450 M 1500 410 L 1482 450 M 1500 410 L 1518 450 M 1356 450 Q 1380 472 1404 450 M 1476 450 Q 1500 472 1524 450" />
              <circle className={s.fJusticePin} cx="1440" cy="400" r="7" />

              {/* Часы — настоящее время посетителя (островок зала ожидания). */}
              <circle className={s.fClockFace} cx="1440" cy="292" r="52" />
              <circle className={s.fClockRim} cx="1440" cy="292" r="52" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30 * Math.PI) / 180
                return <line key={i} className={s.fClockTick} x1={(1440 + Math.sin(a) * 37).toFixed(1)} y1={(292 - Math.cos(a) * 37).toFixed(1)} x2={(1440 + Math.sin(a) * 45).toFixed(1)} y2={(292 - Math.cos(a) * 45).toFixed(1)} />
              })}
              <ClockHands cx={1440} cy={292} r={52} />
              <circle className={s.fClockPin} cx="1440" cy="292" r="5" />

              {/* Купол на вершине свода, шпиль с маяком и орбита со спутником. */}
              <path className={s.fDome} d="M 1386 178 A 54 48 0 0 1 1494 178 Z" />
              <path className={s.fDomeGrid} d="M 1440 130 L 1440 178 M 1412 176 Q 1414 140 1440 130 M 1468 176 Q 1466 140 1440 130 M 1392 160 Q 1440 150 1488 160" />
              <line className={s.fSpire} x1="1440" y1="130" x2="1440" y2="98" />
              <circle className={s.fBeaconGlow} cx="1440" cy="96" r="16" />
              <circle className={s.fBeacon} cx="1440" cy="96" r="6" />
              <g transform="rotate(-6 1440 160)">
                <path className={s.fOrbitFront} d={ORBIT_FRONT} />
                <circle className={s.fSat} r="7">
                  <animateMotion dur="18s" repeatCount="indefinite" path={ORBIT_FULL} />
                </circle>
              </g>
            </svg>
            <div data-block="hbekx" className={s.facadeEntrance}>
              <span className={s.entranceRods} aria-hidden="true" />
              {/* 477 (владелец 2026-10-14): «при нажатии на кнопку входа в будущее происходит прокрутка вниз на страницу табло». */}
              <a data-block="igu49" href="#board" className={s.entrancePlate}>
                <span className={s.entranceMark} aria-hidden="true"><DoorOpen className="size-[0.9em]" strokeWidth={2.4} /></span>
                {w.entrance}
              </a>
            </div>
          </div>
          {w.missions.slice(0, 2).map((m, i) => (
            <article data-block="lzmfi" key={m.name} className={s.mission} data-side={i ? "right" : "left"}>
              <div data-block="msgz9" className={s.missionHead}>
                <p data-block="icpmf" className={s.missionKicker}>
                  <span className={s.missionNum}>{i + 1}</span>
                  {m.name}
                </p>
                <h2 data-block="y8ovf" className={s.missionTitle}>{m.title}</h2>
                <p data-block="dcgs4" className={s.missionLine}>{m.line}</p>
              </div>
              <div data-block="e4q3h" className={s.missionBody}>
                <p data-block="jo8lt" className={s.missionText}>{m.text}</p>
                <ul data-block="soj3s" className={s.missionStops}>
                  {m.stops.map((st) => <li data-block="fzq7k" key={st}>{st}</li>)}
                </ul>
              </div>
            </article>
          ))}
          {/* Стекло крыльев — поверх растяжек: они висят внутри вокзала. */}
          <svg className={s.facadeFront} viewBox={`0 0 ${W} 900`} aria-hidden="true">
            <WingGlass side="left" />
            <g transform={`translate(${W} 0) scale(-1 1)`}><WingGlass side="right" /></g>
          </svg>
        </div>
      </FacadePan>
    </section>
  )
}
