// ЗВЁЗДЫ НЕБА ВОКЗАЛА — ОДИН РЯД НА ВЕСЬ ЛЕНДИНГ (узел, шаг 477). Владелец 2026-10-14: у нового первого экрана «в качестве
// background те же самые звёзды, которые есть на железнодорожном вокзале» и «звёзды от вокзала поднимаем» — небо первого экрана
// продолжает небо фасада. Постоянный рисунок (детерминированный ряд), а не данные: одинаков на сервере и в браузере.

export type Star = [x: number, y: number, r: number, o: number]

export function starField(count: number, width: number, height: number, seed = 7): Star[] {
  let s = seed
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647
  return Array.from({ length: count }, () => [Math.round(r() * width), Math.round(r() * height), +(1 + r() * 1.8).toFixed(1), +(0.35 + r() * 0.6).toFixed(2)])
}
