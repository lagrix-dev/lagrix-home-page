import { Lock } from "lucide-react"
import s from "./landing-agent.module.css"

// «ИНФРАСТРУКТУРА НУЛЕВОГО ДНЯ» (шаг 453, владелец 2026-10-11): слева и справа зеркально — полицейский в фуражке, между ними
// бордюр другого цвета (столбик ограждения платформы), женщина-полицейский и немецкая овчарка — узнаваемая по наклонной спине:
// задние лапы ниже передних. В центре — текст за решёткой: читается, но заперт. Телефон: только левая группа на четверть
// ширины, высота — по офицерам, текст прокручивается. Рисует сервер; форма — `--board`, кокарды и бордюр — `--poster`.

const STRIPES = [44, 84, 124, 164, 204, 244, 284, 324]

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

      {/* Полицейский: фуражка с кокардой, китель, галстук, жетон, ремень. */}
      <g>
        <path className={s.zeroTrousers} d="M40 220 H96 L94 350 H72 L68 250 L64 350 H42 Z" />
        <ellipse className={s.zeroDark} cx={53} cy={354} rx={14} ry={6} />
        <ellipse className={s.zeroDark} cx={83} cy={354} rx={14} ry={6} />
        <path className={s.zeroUniform} d="M34 122 L26 210 Q26 218 33 218 L38 214 L42 130 Z" />
        <path className={s.zeroUniform} d="M102 122 L110 210 Q110 218 103 218 L98 214 L94 130 Z" />
        <circle className={s.zeroSkin} cx={31} cy={222} r={6} />
        <circle className={s.zeroSkin} cx={105} cy={222} r={6} />
        <path className={s.zeroUniform} d="M34 122 Q36 116 50 114 H86 Q100 116 102 122 L98 232 H38 Z" />
        <path className={s.zeroShirt} d="M56 114 L68 136 L80 114 Z" />
        <path className={s.zeroDark} d="M66 120 H70 L72 150 L68 156 L64 150 Z" />
        <path className={s.zeroGold} d="M82 134 H92 V143 Q87 150 82 143 Z" />
        <rect className={s.zeroDark} x={38} y={212} width={60} height={8} />
        <rect className={s.zeroGold} x={64} y={212} width={8} height={8} />
        <rect className={s.zeroSkin} x={61} y={106} width={14} height={12} />
        <ellipse className={s.zeroSkin} cx={50} cy={92} rx={4} ry={6} />
        <ellipse className={s.zeroSkin} cx={86} cy={92} rx={4} ry={6} />
        <ellipse className={s.zeroSkin} cx={68} cy={92} rx={17} ry={20} />
        <circle className={s.zeroDark} cx={62} cy={90} r={1.8} />
        <circle className={s.zeroDark} cx={74} cy={90} r={1.8} />
        <path className={s.zeroLine} d="M63 101 H73" />
        <path className={s.zeroUniform} d="M36 64 Q38 40 68 37 Q98 40 100 64 Z" />
        <rect className={s.zeroDark} x={43} y={61} width={50} height={9} />
        <path className={s.zeroDark} d="M42 70 H94 Q90 79 68 80 Q46 79 42 70 Z" />
        <circle className={s.zeroGold} cx={68} cy={51} r={5} />
      </g>

      {/* Бордюр между офицерами: столбик ограждения платформы — жёлтый с тёмными косыми полосами. */}
      <g>
        <rect className={s.zeroGold} x={124} y={30} width={12} height={326} />
        {STRIPES.map((y) => <path key={y} className={s.zeroDark} d={`M124 ${y} L136 ${y - 12} V${y + 4} L124 ${y + 16} Z`} />)}
        <rect className={s.zeroDark} x={120} y={24} width={20} height={8} />
      </g>

      {/* Женщина-полицейский: фуражка, волосы до подбородка, приталенный китель. */}
      <g>
        <path className={s.zeroTrousers} d="M158 233 H210 L208 350 H188 L184 262 L180 350 H160 Z" />
        <ellipse className={s.zeroDark} cx={169} cy={354} rx={12} ry={5.5} />
        <ellipse className={s.zeroDark} cx={199} cy={354} rx={12} ry={5.5} />
        <path className={s.zeroUniform} d="M152 134 L144 218 Q144 226 151 226 L156 222 L160 142 Z" />
        <path className={s.zeroUniform} d="M216 134 L224 218 Q224 226 217 226 L212 222 L208 142 Z" />
        <circle className={s.zeroSkinAlt} cx={149} cy={230} r={5.5} />
        <circle className={s.zeroSkinAlt} cx={219} cy={230} r={5.5} />
        <path className={s.zeroUniform} d="M152 134 Q154 128 168 126 H200 Q214 128 216 134 L210 196 Q212 212 214 236 H154 Q156 212 158 196 Z" />
        <path className={s.zeroShirt} d="M174 126 L184 144 L194 126 Z" />
        <path className={s.zeroDark} d="M182 132 H186 L187 150 L184 154 L181 150 Z" />
        <path className={s.zeroGold} d="M196 146 H205 V154 Q200.5 160 196 154 Z" />
        <rect className={s.zeroDark} x={156} y={226} width={56} height={7} />
        <rect className={s.zeroGold} x={180} y={226} width={8} height={7} />
        <path className={s.zeroHair} d="M163 86 Q160 116 170 126 H198 Q208 116 205 86 Z" />
        <rect className={s.zeroSkinAlt} x={178} y={118} width={12} height={10} />
        <ellipse className={s.zeroSkinAlt} cx={184} cy={106} rx={15} ry={18} />
        <circle className={s.zeroDark} cx={178} cy={104} r={1.7} />
        <circle className={s.zeroDark} cx={190} cy={104} r={1.7} />
        <ellipse className={s.zeroLips} cx={184} cy={115} rx={3.6} ry={1.7} />
        <path className={s.zeroUniform} d="M155 80 Q157 58 184 56 Q211 58 213 80 Z" />
        <rect className={s.zeroDark} x={160} y={77} width={48} height={8} />
        <path className={s.zeroDark} d="M158 85 H210 Q206 93 184 94 Q162 93 158 85 Z" />
        <circle className={s.zeroGold} cx={184} cy={68} r={4.5} />
      </g>

      {/* Немецкая овчарка в профиль: торчащие уши, длинная морда с маской, чепрак на спине, спина уходит вниз к крупу,
          задние лапы согнуты и стоят ниже передних, пушистый хвост опущен. */}
      <g>
        <path className={s.zeroDogDeep} d="M248 270 Q226 292 232 328 Q236 338 245 331 Q240 302 258 281 Z" />
        <path className={s.zeroDogDeep} d="M268 290 Q284 296 281 312 L271 336 L276 356 H265 L261 336 Q257 316 262 300 Z" />
        <path className={s.zeroDogDeep} d="M320 298 H328 L327 356 H318 Z" />
        <path className={s.zeroDog} d="M250 280 Q290 262 330 257 Q346 259 350 280 Q348 300 336 306 Q300 311 278 305 Q258 305 250 297 Z" />
        <path className={s.zeroDog} d="M255 283 Q272 289 270 306 L258 333 L263 356 H252 L248 333 Q243 316 248 296 Z" />
        <path className={s.zeroDog} d="M330 296 H339 L338 356 H329 Z" />
        <ellipse className={s.zeroDogBlack} cx={257} cy={357} rx={7} ry={3} />
        <ellipse className={s.zeroDogBlack} cx={334} cy={357} rx={7} ry={3} />
        <path className={s.zeroDogBlack} d="M262 278 Q292 262 326 259 Q328 278 313 289 Q290 293 266 291 Z" />
        <path className={s.zeroDog} d="M316 268 Q324 236 343 225 L356 231 Q359 252 350 284 Z" />
        <path className={s.zeroDogBlack} d="M341 222 L344 199 L353 218 Z" />
        <path className={s.zeroDogBlack} d="M350 218 L357 196 L361 216 Z" />
        <path className={s.zeroDog} d="M337 229 Q343 213 358 215 Q366 219 368 225 L380 235 Q382 242 376 244 L360 246 Q349 246 341 240 Z" />
        <path className={s.zeroDogBlack} d="M363 227 L380 235 Q382 242 376 244 L360 246 Z" />
        <circle className={s.zeroDogBlack} cx={378} cy={237} r={2.6} />
        <circle className={s.zeroDark} cx={354} cy={225} r={1.9} />
      </g>
    </svg>
  )
}

export function ZeroDay({ title, text, art }: { title: string; text: string[]; art: string }) {
  return (
    <section data-block="zd453" id="zero-day" className={s.zeroDay}>
      <div data-block="zd4w1" className={s.wrap}>
        <h2 data-block="zd4t1" className={s.zeroTitle}>{title}</h2>
        <div data-block="zd4g1" className={s.zeroGrid}>
          <div data-block="zd4a1" className={s.zeroArt}><Officers label={art} /></div>
          <div data-block="zd4c1" className={s.zeroCell}>
            <span className={s.zeroLock} aria-hidden="true"><Lock className="size-5" strokeWidth={2.4} /></span>
            <div data-block="zd4x1" className={s.zeroText}>
              {text.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>
          <div data-block="zd4a2" className={`${s.zeroArt} ${s.zeroArtRight}`}><Officers mirror /></div>
        </div>
      </div>
    </section>
  )
}
