import s from "./landing-agent.module.css"
import { ZeroDayStage } from "./zero-day-stage.client"

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

// Обычные люди (453-8, владелец 2026-10-11): «когда из экрана улетают офицеры то на их место … снаружи внутрь попасть обычные люди
// повар, слесарь, учитель». Тот же холст и та же земля, что у патруля, — люди встают ровно на его место.
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

      {/* Повар: высокий колпак, двубортный белый китель, красный шейный платок, усы, половник в руке. */}
      <g>
        <path className={s.zeroPants} d="M34 234 H90 L88 350 H66 L62 262 L58 350 H36 Z" />
        <ellipse className={s.zeroDark} cx={47} cy={354} rx={14} ry={6} />
        <ellipse className={s.zeroDark} cx={77} cy={354} rx={14} ry={6} />
        <path className={s.zeroWood} d="M99 218 L112 166" />
        <ellipse className={s.zeroMetal} cx={113} cy={160} rx={7} ry={4.5} />
        <path className={s.zeroChef} d="M28 124 L20 206 Q20 214 27 214 L32 210 L36 132 Z" />
        <path className={s.zeroChef} d="M96 124 L104 206 Q104 214 97 214 L92 210 L88 132 Z" />
        <circle className={s.zeroSkin} cx={25} cy={218} r={6} />
        <circle className={s.zeroSkin} cx={99} cy={218} r={6} />
        <path className={s.zeroChef} d="M28 124 Q30 116 44 114 H80 Q94 116 96 124 L93 236 H31 Z" />
        <path className={s.zeroChefLine} d="M62 118 L74 140 V232" />
        {[146, 170, 194].map((y) => (
          <g key={y} className={s.zeroButton}>
            <circle cx={54} cy={y} r={2.3} />
            <circle cx={70} cy={y} r={2.3} />
          </g>
        ))}
        <rect className={s.zeroSkin} x={55} y={108} width={14} height={10} />
        <path className={s.zeroScarf} d="M48 112 H76 L62 130 Z" />
        <ellipse className={s.zeroSkin} cx={46} cy={94} rx={4} ry={6} />
        <ellipse className={s.zeroSkin} cx={78} cy={94} rx={4} ry={6} />
        <ellipse className={s.zeroSkin} cx={62} cy={94} rx={16} ry={19} />
        <circle className={s.zeroDark} cx={56} cy={91} r={1.8} />
        <circle className={s.zeroDark} cx={68} cy={91} r={1.8} />
        <path className={s.zeroDark} d="M53 101 Q62 96 71 101 Q62 105 53 101 Z" />
        <path className={s.zeroChef} d="M44 72 Q32 46 48 40 Q52 22 64 30 Q78 20 82 40 Q96 44 82 72 Z" />
        <rect className={s.zeroChef} x={44} y={66} width={38} height={9} />
        <path className={s.zeroChefLine} d="M44 66 H82" />
      </g>

      {/* Слесарь: кепка, рабочая рубашка, комбинезон с лямками и карманом, гаечный ключ. */}
      <g>
        <path className={s.zeroOveralls} d="M162 228 H218 L216 350 H194 L190 262 L186 350 H164 Z" />
        <ellipse className={s.zeroDark} cx={175} cy={354} rx={14} ry={6} />
        <ellipse className={s.zeroDark} cx={205} cy={354} rx={14} ry={6} />
        <path className={s.zeroWorkShirt} d="M156 124 L148 206 Q148 214 155 214 L160 210 L164 132 Z" />
        <path className={s.zeroWorkShirt} d="M224 124 L232 206 Q232 214 225 214 L220 210 L216 132 Z" />
        <path className={s.zeroWrench} d="M227 220 L240 252" />
        <circle className={s.zeroMetal} cx={242} cy={257} r={7} />
        <rect className={s.zeroPaper} x={240} y={256} width={6} height={7} />
        <circle className={s.zeroSkin} cx={153} cy={218} r={6} />
        <circle className={s.zeroSkin} cx={227} cy={218} r={6} />
        <path className={s.zeroWorkShirt} d="M156 124 Q158 116 172 114 H208 Q222 116 224 124 L220 236 H160 Z" />
        <path className={s.zeroOveralls} d="M170 150 H210 V236 H170 Z" />
        <path className={s.zeroOveralls} d="M170 152 L175 116 H182 L177 152 Z" />
        <path className={s.zeroOveralls} d="M210 152 L205 116 H198 L203 152 Z" />
        <rect className={s.zeroOverallsDeep} x={182} y={166} width={16} height={13} />
        <circle className={s.zeroGold} cx={174} cy={156} r={2.6} />
        <circle className={s.zeroGold} cx={206} cy={156} r={2.6} />
        <rect className={s.zeroSkin} x={183} y={108} width={14} height={10} />
        <ellipse className={s.zeroSkin} cx={174} cy={92} rx={4} ry={6} />
        <ellipse className={s.zeroSkin} cx={206} cy={92} rx={4} ry={6} />
        <ellipse className={s.zeroSkin} cx={190} cy={92} rx={16} ry={19} />
        <circle className={s.zeroDark} cx={184} cy={90} r={1.8} />
        <circle className={s.zeroDark} cx={196} cy={90} r={1.8} />
        <path className={s.zeroLine} d="M185 101 Q190 104 195 101" />
        <path className={s.zeroOveralls} d="M173 80 Q172 60 190 59 Q208 60 207 80 Z" />
        <path className={s.zeroOverallsDeep} d="M172 78 H214 Q212 84 198 84 H172 Z" />
      </g>

      {/* Учительница: волосы в пучок, очки, кардиган поверх блузки, юбка, книга под рукой. */}
      <g>
        <rect className={s.zeroSkinAlt} x={305} y={298} width={8} height={52} />
        <rect className={s.zeroSkinAlt} x={323} y={298} width={8} height={52} />
        <ellipse className={s.zeroDark} cx={308} cy={354} rx={10} ry={5} />
        <ellipse className={s.zeroDark} cx={328} cy={354} rx={10} ry={5} />
        <path className={s.zeroSkirt} d="M296 222 H340 L348 304 H288 Z" />
        <path className={s.zeroCardigan} d="M290 128 L282 210 Q282 218 289 218 L294 214 L298 136 Z" />
        <path className={s.zeroCardigan} d="M346 128 L354 210 Q354 218 347 218 L342 214 L338 136 Z" />
        <circle className={s.zeroSkinAlt} cx={287} cy={222} r={5.5} />
        <circle className={s.zeroSkinAlt} cx={351} cy={222} r={5.5} />
        <path className={s.zeroCardigan} d="M290 128 Q292 120 306 118 H330 Q344 120 346 128 L342 228 H294 Z" />
        <path className={s.zeroChef} d="M306 118 L318 152 L330 118 Z" />
        <rect className={s.zeroBook} x={276} y={168} width={18} height={30} rx={2} />
        <path className={s.zeroChefLine} d="M291 170 V196" />
        <path className={s.zeroHair} d="M300 92 Q298 118 306 124 H330 Q338 118 336 92 Z" />
        <circle className={s.zeroHair} cx={318} cy={68} r={9} />
        <rect className={s.zeroSkinAlt} x={312} y={112} width={12} height={9} />
        <ellipse className={s.zeroSkinAlt} cx={318} cy={96} rx={15} ry={18} />
        <path className={s.zeroHair} d="M302 92 Q304 74 318 73 Q332 74 334 92 Q326 82 318 84 Q310 82 302 92 Z" />
        <circle className={s.zeroDark} cx={312} cy={95} r={1.4} />
        <circle className={s.zeroDark} cx={324} cy={95} r={1.4} />
        <path className={s.zeroGlasses} d="M307.5 95 a4.5 4.5 0 1 0 9 0 a4.5 4.5 0 1 0 -9 0 M319.5 95 a4.5 4.5 0 1 0 9 0 a4.5 4.5 0 1 0 -9 0 M316.5 95 H319.5" />
        <ellipse className={s.zeroLips} cx={318} cy={106} rx={3.2} ry={1.5} />
      </g>
    </svg>
  )
}

export function ZeroDay({ title, text, art, people, unlock }: { title: string; text: string[]; art: string; people: string; unlock: string }) {
  return (
    <section data-block="zd453" id="zero-day" className={s.zeroDay}>
      <div data-block="zd4w1" className={s.wrap}>
        {/* 453-9 (владелец 2026-10-12): слева от заголовка — красная мишень ~150 px: это главная цель приложения. */}
        <h2 data-block="zd4t1" className={s.zeroTitle}>
          <svg className={s.zeroTarget} viewBox="0 0 100 100" aria-hidden="true">
            <circle className={s.targetRed} cx={50} cy={50} r={48} />
            <circle className={s.targetWhite} cx={50} cy={50} r={37} />
            <circle className={s.targetRed} cx={50} cy={50} r={26} />
            <circle className={s.targetWhite} cx={50} cy={50} r={15} />
            <circle className={s.targetRed} cx={50} cy={50} r={6} />
          </svg>
          <span>{title}</span>
        </h2>
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
