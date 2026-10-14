// КРАБИК CLAUDE CODE — ОДИН РИСУНОК НА ВЕСЬ ЛЕНДИНГ (узел, шаг 477). Владелец 2026-10-14: «мы уже рисовали такого крабика на
// вкладке карточка закрытой экосистемы, но и там и тут этого крабика нужно перерисовать в оранжевый цвет». Блочный знак: тело,
// клешни по бокам, четыре ножки, два глаза; начало координат — середина низа (ножки стоят на y = 0), ширина 64, высота 30.
// Цвет тела — роль `--claude` (оранжевый, отношение к `--primary`), глаза — `--ink`; классы даёт тот, кто рисует.

export function CrabShape({ body, eye, leg }: { body: string; eye: string; leg?: string }) {
  return (
    <g>
      <g className={body}>
        <rect x={-22} y={-30} width={44} height={24} />
        <rect x={-32} y={-24} width={10} height={10} />
        <rect x={22} y={-24} width={10} height={10} />
      </g>
      <g className={leg ?? body}>
        <rect x={-18} y={-6} width={5} height={8} />
        <rect x={-8} y={-6} width={5} height={8} />
        <rect x={3} y={-6} width={5} height={8} />
        <rect x={13} y={-6} width={5} height={8} />
      </g>
      <g className={eye}>
        <rect x={-11} y={-24} width={5} height={8} />
        <rect x={6} y={-24} width={5} height={8} />
      </g>
    </g>
  )
}
