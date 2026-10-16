import s from "./landing-agent.module.css"

// ЭКСПРЕСС НА ТАБЛО (владелец 2026-10-16, шаг 506): «вторая вкладка называется направление исправь её на направление экспресса (задача
// показать что мы поедем быстро) … нарисуй анимирована экспресс … справа очертания экспресса такого как ходит в Китай или Японии которые
// постепенно к левой части размывается в линии и заканчивается несколькими точками имитирующей потоки ветра».
// Нос скоростного поезда — справа, корпус к левому краю тает (градиент прозрачности) и переходит в линии скорости, линии — в точки-ветер.
// Движутся только линии и точки (бегут влево), поезд стоит; при «уменьшить движение» — один кадр. Рисунок, слов нет — для чтения экраном
// скрыт, подпись дисплея рядом.

const LINES = [
  { y: 17, x: 120, w: 190 },
  { y: 25, x: 70, w: 230 },
  { y: 33, x: 40, w: 250 },
  { y: 41, x: 90, w: 210 },
  { y: 49, x: 150, w: 150 },
]
const DOTS = [
  [10, 22], [24, 36], [6, 46], [34, 28], [20, 52],
]

export function Express() {
  return (
    <svg viewBox="0 0 520 64" preserveAspectRatio="xMinYMid meet" className={s.express} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lgxExpressBody" x1="250" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="lgxExpressLine" x1="40" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {DOTS.map(([x, y], i) => <circle key={i} className={s.expressDot} cx={x} cy={y} r={2.2} style={{ animationDelay: `${i * -0.23}s` }} />)}
      {LINES.map((l, i) => (
        <path key={i} className={s.expressLine} d={`M${l.x} ${l.y} H${l.x + l.w}`} stroke="url(#lgxExpressLine)" style={{ animationDelay: `${i * -0.11}s` }} />
      ))}
      {/* Корпус и нос: длинный обтекатель вниз к острию, как у скоростных поездов Японии и Китая. */}
      <path className={s.expressBody} d="M250 13 H418 Q462 13 492 30 Q514 42 498 49 H250 Z" fill="url(#lgxExpressBody)" />
      <rect className={s.expressWindows} x={300} y={20} width={140} height={8} rx={3} />
      <path className={s.expressCab} d="M452 20 Q476 23 491 33 H457 Z" />
      <path className={s.expressStripe} d="M286 40 H500 Q505 43 498 45 H286 Z" />
    </svg>
  )
}
