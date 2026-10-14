import s from "./landing-agent.module.css"
import { ZeroDayStage } from "./zero-day-stage.client"

// «ИНФРАСТРУКТУРА НУЛЕВОГО ДНЯ» (шаг 453, владелец 2026-10-11): слева и справа зеркально — полицейский, между ними столбик
// ограждения платформы, женщина-полицейский и немецкая овчарка. В центре — текст за решёткой: читается, но заперт. Телефон: только
// левая группа на четверть ширины, высота — по офицерам, текст прокручивается.
// 477 (владелец 2026-10-14: «иллюстрации персонажей … как будто не соответствуют по стилю»): персонажи перерисованы ВОКЗАЛЬНЫМИ
// ПИКТОГРАММАМИ — так рисуют людей на указателях вокзалов и аэропортов, и так уже идут пассажиры у нижней кромки экрана. Силуэт
// цвета чернил (`--ink`) без лица; профессию говорит один знак: фуражка с жёлтой кокардой, причёска, колпак повара, кепка и ключ,
// пучок и жёлтая книга. Просвет между фуражкой и головой — цвет пола (`--floor`), как белые зазоры на пиктограммах.
// Овчарка снята владельцем 2026-10-14: «персонажи полицейских оставить, собаку убрать».

const STRIPES = [44, 84, 124, 164, 204, 244, 284, 324]

// Пиктограмма человека: голова, торс со скруглёнными плечами, руки и ноги — толстые линии со скруглёнными концами.
function Figure({ cx }: { cx: number }) {
  return (
    <g>
      <circle className={s.pictoInk} cx={cx} cy={84} r={21} />
      <path className={s.pictoInk} d={`M${cx - 31} 128 Q${cx - 31} 112 ${cx - 16} 112 H${cx + 16} Q${cx + 31} 112 ${cx + 31} 128 L${cx + 27} 238 H${cx - 27} Z`} />
      <path className={s.pictoArm} d={`M${cx - 34} 130 L${cx - 42} 222`} />
      <path className={s.pictoArm} d={`M${cx + 34} 130 L${cx + 42} 222`} />
      <path className={s.pictoLeg} d={`M${cx - 13} 238 L${cx - 15} 346`} />
      <path className={s.pictoLeg} d={`M${cx + 13} 238 L${cx + 15} 346`} />
    </g>
  )
}

// Фуражка: тулья и козырёк с просветом цвета пола, жёлтая кокарда.
function Cap({ cx }: { cx: number }) {
  return (
    <g>
      <path className={s.pictoCap} d={`M${cx - 25} 70 Q${cx - 23} 44 ${cx} 42 Q${cx + 23} 44 ${cx + 25} 70 Z`} />
      <rect className={s.pictoCap} x={cx - 30} y={66} width={60} height={9} rx={4} />
      <circle className={s.pictoAccent} cx={cx} cy={56} r={5} />
    </g>
  )
}

function Officers({ label, mirror }: { label?: string; mirror?: boolean }) {
  return (
    <svg
      className={`${s.zeroSvg} ${mirror ? s.zeroMirror : ""}`}
      viewBox="0 0 380 372"
      preserveAspectRatio="xMinYMax slice"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <ellipse className={s.zeroShadow} cx={200} cy={358} rx={182} ry={9} />

      {/* Полицейский: фуражка с кокардой и жёлтый жетон на груди. */}
      <g>
        <Figure cx={68} />
        <Cap cx={68} />
        <path className={s.pictoAccent} d="M78 140 H92 V151 Q85 159 78 151 Z" />
      </g>

      {/* Столбик ограждения платформы — жёлтый с тёмными косыми полосами: знак вокзала, остаётся как был. */}
      <g>
        <rect className={s.zeroGold} x={124} y={30} width={12} height={326} />
        {STRIPES.map((y) => <path key={y} className={s.zeroDark} d={`M124 ${y} L136 ${y - 12} V${y + 4} L124 ${y + 16} Z`} />)}
        <rect className={s.zeroDark} x={120} y={24} width={20} height={8} />
      </g>

      {/* Женщина-полицейский: та же фуражка, причёска до подбородка, жетон. */}
      <g>
        <path className={s.pictoInk} d="M160 90 Q158 118 168 124 H200 Q210 118 208 90 Z" />
        <Figure cx={184} />
        <Cap cx={184} />
        <path className={s.pictoAccent} d="M194 140 H208 V151 Q201 159 194 151 Z" />
      </g>
    </svg>
  )
}

// Обычные люди (453-8, владелец 2026-10-11): повар, слесарь, учитель — встают ровно на место патруля, на тот же холст и ту же землю.
function People({ label, mirror }: { label?: string; mirror?: boolean }) {
  return (
    <svg
      className={`${s.zeroSvg} ${mirror ? s.zeroMirror : ""}`}
      viewBox="0 0 380 372"
      preserveAspectRatio="xMinYMax slice"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <ellipse className={s.zeroShadow} cx={190} cy={358} rx={182} ry={9} />

      {/* Повар: белый колпак и половник. */}
      <g>
        <Figure cx={62} />
        <path className={s.pictoChalk} d="M44 70 Q30 46 46 40 Q50 22 62 30 Q76 20 80 40 Q96 46 82 70 Z" />
        <rect className={s.pictoChalk} x={44} y={64} width={38} height={10} rx={2} />
        <path className={s.pictoTool} d="M104 222 L116 168" />
        <ellipse className={s.pictoInk} cx={117} cy={162} rx={9} ry={6} />
      </g>

      {/* Слесарь: кепка с козырьком и гаечный ключ. */}
      <g>
        <Figure cx={190} />
        <path className={s.pictoCap} d="M168 74 Q168 52 190 50 Q212 52 212 74 Z" />
        <path className={s.pictoCap} d="M170 70 H226 Q224 79 210 79 H170 Z" />
        <path className={s.pictoTool} d="M232 222 L248 256" />
        <circle className={s.pictoInk} cx={251} cy={262} r={9} />
        <rect className={s.pictoGap} x={248} y={258} width={6} height={9} />
      </g>

      {/* Учительница: пучок и жёлтая книга под рукой. */}
      <g>
        <circle className={s.pictoInk} cx={318} cy={56} r={10} />
        <Figure cx={318} />
        <rect className={s.pictoAccentBook} x={262} y={160} width={22} height={34} rx={2} />
      </g>
    </svg>
  )
}

export function ZeroDay({ title, text, art, people, unlock }: { title: string; text: string[]; art: string; people: string; unlock: string }) {
  return (
    <section data-block="zd453" id="zero-day" className={s.zeroDay}>
      <div data-block="zd4w1" className={s.wrap}>
        {/* 467-1 (владелец 2026-10-12): «оформи … как вывеску которая висит на двух цепочках» — та же табличка цвета табло, что у
            «Зала ожидания»; мишень (453-9: главная цель приложения) осталась и стала эмблемой таблички: обод мелом, как значок станции. */}
        <div data-block="zd4sg" className={s.zeroSign}>
          <span className={s.gateRods} aria-hidden="true" />
          <h2 data-block="zd4t1" className={s.zeroPlate}>
            <svg className={s.zeroTarget} viewBox="0 0 100 100" aria-hidden="true">
              <circle className={s.targetWhite} cx={50} cy={50} r={50} />
              <circle className={s.targetRed} cx={50} cy={50} r={45} />
              <circle className={s.targetWhite} cx={50} cy={50} r={35} />
              <circle className={s.targetRed} cx={50} cy={50} r={25} />
              <circle className={s.targetWhite} cx={50} cy={50} r={15} />
              <circle className={s.targetRed} cx={50} cy={50} r={6} />
            </svg>
            <span>{title}</span>
          </h2>
        </div>
        {/* 453-6/8: сетку держит островок — замок «Разблокировать» отодвигает решётку, патрули улетают, люди въезжают на их место.
            Рисунки — с сервера. */}
        <ZeroDayStage
          left={<Officers label={art} />}
          right={<Officers mirror />}
          leftPeople={<People label={people} />}
          rightPeople={<People mirror />}
          text={text}
          unlock={unlock}
        />
      </div>
    </section>
  )
}
