import "@fontsource/barlow-condensed/500.css"
import "@fontsource/barlow-condensed/600.css"
import "@fontsource/barlow-condensed/700.css"
import "@fontsource/barlow/400.css"
import "@fontsource/barlow/500.css"
import "@fontsource/barlow/600.css"
import "@fontsource-variable/jetbrains-mono"
import { ArrowDown, ArrowRight, ArrowUp, Check, Footprints, Github, MessagesSquare, Ticket, TrainFront } from "lucide-react"
import { landingWords, type LandingExtra } from "./words"
import s from "./landing-agent.module.css"
import { SplitFlap } from "./split-flap.client"
import { TransitMap } from "./transit-map.client"
import { LostRoute } from "./lost-route"
import { ZeroDay } from "./zero-day"
import { Customs } from "./customs"
import { LaunchBanner } from "./launch-banner.client"
import { Walkers } from "./walkers.client"
import { VersusTabs } from "./versus-tabs.client"
import { PortalStation } from "./portal-station.client"
import { HelpDesk } from "./help-desk.client"
import { WaitingRoom } from "./waiting-room"
import { WhyNight } from "./why-night"
import { StationFacade } from "./station-facade"
import { FirstScreen } from "./first-screen"
import { appDialogUi } from "@/components/dialog/app-dialog.i18n"
import { voiceStrings } from "@/lib/i18n/voice-field.i18n"
import { Button } from "@/components/ui/button"

// Штрихкод корешка билета: постоянный рисунок (ширины полос и промежутков), а не код чего-либо.
const BARS: [number, number][] = (() => {
  const w = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 1, 2, 2, 1, 3, 2, 1, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 1, 3]
  const out: [number, number][] = []
  let x = 0
  for (let i = 0; i < w.length && x < 160; i += 2) { out.push([x, w[i] * 1.6]); x += (w[i] + (w[i + 1] ?? 1)) * 1.6 }
  return out
})()

// Чат агентов (333-12) — тот же островок, свой вид: классы этого виджета вместо классов главной. 477: играет в окне справочного
// бюро по зелёным вывескам-симуляциям (прежний первый экран с чатом снят владельцем).
const chatClasses = {
  chat: s.chat, chatHead: s.chatHead, chatDot: s.chatDot, chatLog: s.chatLog, chatContent: s.chatContent,
  chatMsg: s.chatMsg, msgMeta: s.msgMeta, msgMetaRight: s.msgMetaRight, msgWho: s.msgWho, msgAvatar: s.msgAvatar,
  contract: s.contract, msgText: s.msgText, msgTextRight: s.msgTextRight, aeBlock: s.aeBlock, typing: s.typing,
  typingRight: s.typingRight, system: s.system, systemStamp: s.systemStamp, systemBadge: s.systemBadge, endCta: s.endCta,
}

// «ДИЗАЙН АГЕНТА» — ЛЕНДИНГ ГЛАВНОЙ, ПЕРЕРИСОВАННЫЙ АГЕНТОМ ЭЛЕМЕНТА ПО НАВЫКУ impeccable НА ЭТАЛОННОМ МАКЕТЕ
// (`components/landing-impeccable/`, правило «The reference maquette comes first» в `impeccable-on-design.md`). Мир тот же —
// швейцарское табло отправлений, та же композиция и тот же контраст; цвета — отношения к `--primary` (README.md). Табло
// висит на стене и не двигается; движутся только флапы: каждое слово табло — барабаны split-flap (островок
// `split-flap.client.tsx`, набор флапов — `drum.ts`), главное окно перебирает три назначения, и строка назначения зажигает
// свою платформу (`data-shown` на табло). Слова — данные главной через `landingWords`; для чтения экраном и поиска слово
// стоит рядом обычным текстом, барабаны скрыты.

export function LandingAgent({ lang }: { lang: string }) {
  const w = landingWords(lang)
  if (!w) return null
  const { hero, can, hood, x } = w
  const b = x.board
  // 469 (владелец 2026-10-13): четвёртое направление «Мессенджер» — табло держит до четырёх строк (подсветка пути в CSS — до 4).
  const outcomes = x.outcomes.slice(0, 4)
  const openSource = (x as LandingExtra & { openSource?: string }).openSource

  return (
    <div data-block="cjguc" className={s.page}>
      {x.launchBanner && <LaunchBanner text={x.launchBanner} />}
      {/* 477 (владелец 2026-10-14): новый первый экран — бейдж в центре, заголовок во всю ширину, надпись «Инфраструктура нулевого
          дня» на звёздном небе вокзала; «вторым экраном становится вокзал и всё, что ниже». Прежний первый экран (вывеска станции с
          чатом) снят: чат играет в справочном бюро. */}
      <FirstScreen title={hero.title} titleMark={x.titleMark} plate={openSource} sub={x.zeroDay ? { text: x.zeroDay.title, href: "#zero-day" } : undefined} />
      {x.facade && <StationFacade w={x.facade} />}

      <section data-block="hbbfq" id="board" className={`${s.hall} ${s.boardHall}`}>
        <div data-block="rkprp" className={s.wrap}>
            <div data-block="qvj57" className={s.board} data-board data-shown="0">
              <div data-block="n0hnr" className={s.boardTop}>
                <span className={s.boardLabel}>{b.from}</span>
                <span className={s.origin}>
                  <span className={s.srOnly}>{b.fromValue}</span>
                  <SplitFlap words={[b.fromValue]} className={s.flapWord} />
                </span>
              </div>
              <div data-block="jm9w0" className={s.display} aria-hidden="true">
                <span className={s.displayLabel}>{b.destination}</span>
                <SplitFlap words={outcomes.map((o) => o.name)} className={s.displayField} announce />
              </div>
              <div data-block="nmzw1" className={s.boardHead} aria-hidden="true">
                <span>{b.destination}</span>
                <span className={s.colPlatform}>{b.platform}</span>
                <span className={s.colDeparts}>{b.departs}</span>
              </div>
              <ol data-block="d6ywe" className={s.rows}>
                {outcomes.map((o, i) => (
                  <li data-block="mpdyz" key={o.name} className={s.row}>
                    <div data-block="n5go1" className={s.dest}>
                      <span className={s.srOnly}>{o.name}</span>
                      <SplitFlap words={[o.name]} className={s.flapWord} />
                      <span className={s.via}>{o.text}</span>
                    </div>
                    <span className={s.platform} aria-label={`${b.platform} ${i + 1}`}>{i + 1}</span>
                    <span className={s.departs}>
                      <span className={s.lamp} aria-hidden="true" />
                      {b.when}
                    </span>
                  </li>
                ))}
              </ol>
              <div data-block="mdkza" className={s.ticker}>
                <span>{x.claim}</span>
                <span className={s.hintWrap}>
                  <Button variant="bare" size="bare" type="button" className={s.hintBtn} aria-label={x.claimHintLabel} aria-describedby="agent-claim-hint">?</Button>
                  <span role="tooltip" id="agent-claim-hint" className={s.hint}>{x.claimHint}</span>
                </span>
                {/* 477 (владелец 2026-10-14): «кнопку заглянуть внутрь переносим в табло: слева остаётся надпись … справа рисуем кнопку». */}
                {hero.cta && (
                  <a href={hero.cta.href} className={`${s.go} ${s.tickerGo}`}>
                    {hero.cta.href.startsWith("https://github.com/") && <Github className="size-5" strokeWidth={2.2} aria-hidden="true" />}
                    {hero.cta.label}
                    <ArrowRight className="size-5" strokeWidth={2} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

          {/* Старая жёлтая вывеска к чату (владелец 2026-09-30: табло прохода к гейтам в аэропорту). 477 (владелец 2026-10-14):
              «старая жёлтая вывеска висит на табло буквально касаясь его цепочкой» — сразу под табло, стрелка вниз (чат ниже бюро). */}
          {x.gate && x.chat && (
            <a data-block="g8x2k" href="#help-desk" className={`${s.gate} ${s.gateOnBoard}`} title={x.gate.label}>
              <span className={s.gateRods} aria-hidden="true" />
              <span className={s.gateBar}>
                <span className={s.gateRoutes}>
                  <span className={s.gateIcon} aria-hidden="true"><MessagesSquare className="size-5" strokeWidth={2.4} /></span>
                  {x.gate.routes.map((r) => <span key={r} className={s.gateRoute}>{r}</span>)}
                  {/* Владелец 2026-09-30: как на указателе в аэропорту — время пути. */}
                  {x.gate.longWay && <span className={s.gateWalk}><Footprints className="size-4" aria-hidden="true" />{x.gate.longWay}</span>}
                </span>
                <span className={s.gateExit}>
                  <span className={s.gateWords}>
                    <span className={s.gateAsk}>{x.gate.ask}</span>
                    <span className={s.gateAnswer}>{x.gate.answer}</span>
                    <span className={s.gateAnswerMobile}>{x.gate.answerMobile}</span>
                  </span>
                  {x.gate.exitTime && <span className={s.gateTime}><Footprints className="size-4" aria-hidden="true" />{x.gate.exitTime}</span>}
                  {/* Владелец 2026-09-30: стрелка — справа от текста, в конце таблички. */}
                  <span className={s.gateArrow} aria-hidden="true">
                    <ArrowUp className={s.gateUp} strokeWidth={3} />
                    <ArrowDown className={s.gateDown} strokeWidth={3} />
                  </span>
                </span>
              </span>
            </a>
          )}
        </div>
      </section>

      {/* 477 (владелец 2026-10-14): справочная служба — третий экран, под табло и висящей на нём жёлтой вывеской. Прежде (469) —
          сразу под вывеской станции, над залом табло. */}
      {x.helpDesk && (
        <section data-block="xbxoz" id="help-desk" className={s.desk}>
          <div data-block="ql52w" className={s.wrap}>
            <HelpDesk w={x.helpDesk} lang={lang} sim={x.chat ? { label: x.chat.label, items: x.chat.items, contractLabels: x.chat.contractLabels, back: x.chat.endCta?.label } : undefined} chatClasses={chatClasses} voiceWords={(({ micDenied, micNoDevice, frame, failed, nothing, noKey }) => ({ micDenied, micNoDevice, frame, failed, nothing, noKey }))(voiceStrings(lang))} />
          </div>
        </section>
      )}

      {/* Зал ожидания (владелец 2026-10-01): под табло, над «Оркестрацией AI-агентов…». Слова — `landing.waiting`. */}
      {x.waiting && (
        <section data-block="r5g32" className={s.waiting}>
          <div data-block="v3rdu" className={s.wrap}>
            {/* Владелец 2026-10-01: «текст зал ожидания оформи в виде таблички висящей на цепочке» — цепочки как у жёлтой вывески. */}
            <div data-block="w8sgn" className={s.waitingSign}>
              <span className={s.gateRods} aria-hidden="true" />
              <div data-block="w8plt" className={s.waitingPlate}>
                <h2 data-block="tcd2c" className={s.waitingTitle}>{x.waiting.title}</h2>
                <p data-block="j17ba" className={s.waitingText}>{x.waiting.text}</p>
              </div>
            </div>
            <WaitingRoom on={x.waiting.on} off={x.waiting.off} tv={x.waiting.tv} scene={x.waiting.scene} video={x.waiting.video} watch={x.waiting.watch} ui={appDialogUi(lang)} />
          </div>
        </section>
      )}

      <section data-block="n4m2k" className={s.poster}>
        <div data-block="b2qaq" className={s.wrap}>
          <h2 data-block="va2hr" className={s.posterTitle}>{can.title}</h2>
          <p data-block="zil1z" className={s.posterSub}>{b.connections}</p>
          <ol data-block="rd7fv" className={s.timetable}>
            {can.texts.map((t, i) => (
              <li data-block="xuoap" key={i} className={s.tRow}>
                <h3 data-block="uqv08"><span className={s.tName}>{x.cards[i]}</span></h3>
                <span className={s.tText}>{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-block="hedd3" className={s.hall}>
        <div data-block="c1jfw" className={s.wrap}>
          <div data-block="xud3c" className={s.ticket}>
            <div data-block="jc5dc" className={s.ticketMain}>
              {/* Билет (владелец 2026-09-30): шапка билета через всю основную часть — часть анатомии билета, а не надпись над заголовком. */}
              {x.ticket && (
                <p data-block="weu9w" className={s.ticketBand}>
                  <span className={s.ticketKicker}><Ticket className="size-4" strokeWidth={2.4} aria-hidden="true" />{x.ticket.kicker}</span>
                  <span className={s.ticketSerial}>{x.ticket.serial}</span>
                </p>
              )}
              {/* 454-7 (владелец 2026-10-12): «билет на станцию Супер-узловая … для оператора … Багаж … Правила поездки» — анатомия
                  настоящего билета, информация подаётся косвенно, как на всём сайте: маршрут «откуда → куда», поля, правила мелким
                  шрифтом. Станция назначения — заголовок секции (H2). */}
              {x.ticket?.route ? (
                <div data-block="tr454" className={s.ticketRoute}>
                  <div data-block="dvsv0" className={s.routeEnd}>
                    <span className={s.routeLabel}>{x.ticket.route.fromLabel}</span>
                    <span className={s.routeFrom}>{x.ticket.route.from}</span>
                  </div>
                  <span className={s.routeTrack} aria-hidden="true"><TrainFront className="size-6" strokeWidth={2.2} /></span>
                  <div data-block="m8cn3" className={s.routeEnd}>
                    <span className={s.routeLabel}>{x.ticket.route.toLabel}</span>
                    <h2 data-block="lm51s" className={s.ticketTitle}>{hood.title}</h2>
                  </div>
                </div>
              ) : (
                <h2 data-block="lm51s" className={s.ticketTitle}>{hood.title}</h2>
              )}
              {hood.texts.map((t, i) => <p data-block="zw1b0" key={i} className={s.ticketText}>{t}</p>)}
              {x.ticket && (
                <dl className={s.ticketFields}>
                  {x.ticket.fields.map((fd) => (
                    <div data-block="imdak" key={fd.label}>
                      <dt>{fd.label}</dt>
                      <dd>{fd.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {x.ticket?.rules && (
                <div data-block="rl454" className={s.ticketRules}>
                  <p data-block="wblxt" className={s.rulesTitle}>{x.ticket.rules.title}</p>
                  {/* 454-8 (владелец 2026-10-12): одно правило — строкой без номера; несколько — нумерованным списком. */}
                  {x.ticket.rules.items.length === 1 ? (
                    <p data-block="ro454" className={s.rulesOne}>{x.ticket.rules.items[0]}</p>
                  ) : (
                    <ol data-block="z99vx" className={s.rulesList}>
                      {x.ticket.rules.items.map((r) => <li data-block="ri454" key={r}>{r}</li>)}
                    </ol>
                  )}
                </div>
              )}
            </div>
            <div data-block="o8d2u" className={s.ticketStub}>
              <p data-block="znlj8" className={s.stubHead}>{b.included}</p>
              <ul data-block="va0ro" className={s.stubList}>
                {x.chips.map((c) => <li data-block="tzbzi" key={c}>{c}</li>)}
              </ul>
              {/* Корешок (владелец 2026-09-30): «сохраняется до конца поездки» и штрихкод — рисунок, не данные. */}
              {/* Печать на корешке (владелец 2026-09-30): «open source, стоимость к оплате ноль». */}
              {x.ticket?.stamp && (
                <p data-block="fzs05" className={s.stamp}>
                  <span>{x.ticket.stamp.top}</span>
                  <span className={s.stampSum}>{x.ticket.stamp.bottom}</span>
                </p>
              )}
              {x.ticket && (
                <div data-block="gra3c" className={s.stubKeep}>
                  <svg className={s.barcode} viewBox="0 0 160 36" preserveAspectRatio="none" aria-hidden="true">
                    {BARS.map(([bx, bw]) => <rect key={bx} x={bx} y={0} width={bw} height={36} />)}
                  </svg>
                  <span>{x.ticket.keep}</span>
                </div>
              )}
            </div>
          </div>
          {/* 454-7 (владелец 2026-10-12): «Кнопка ни в коем случае не должна находиться внутри билета, вынеси её наружу». */}
          {x.ticket?.reserve && (
            <div data-block="ta454" className={s.actions}>
              <a href={x.ticket.reserve.href} className={s.go}>
                <Github className="size-5" strokeWidth={2.2} aria-hidden="true" />
                {x.ticket.reserve.label}
                <ArrowRight className="size-5" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* «Fractera vs LLM» (владелец 2026-09-30, выбор «Карта магистрали»): предпоследняя секция — два экрана на стене вокзала.
          Слева неподвижный «пеший маршрут», справа схема магистрали — островок, прорисовывается при въезде в экран. */}
      {x.compare && (
        <section data-block="l6kqq" className={s.versus}>
          <div data-block="x066g" className={s.wrap}>
            <h2 data-block="co2y3" className={s.versusTitle}>{x.compare.title}</h2>
            <p data-block="oysml" className={s.versusSub}>{x.compare.sub}</p>
            {/* Телефон: переключатель вместо двух карточек подряд (владелец 2026-09-30). */}
            <VersusTabs labels={[x.compare.left.who, x.compare.right.who]}>
            {/* Владелец 2026-09-30: бейджи одной ширины — по самому длинному ярлыку обеих карточек (моноширинный: ширина в ch точна). */}
            <div data-block="cu99c" className={s.versusGrid} style={{ ["--tagn" as string]: Math.max(...[...x.compare.left.items, ...x.compare.right.items].map((it) => it.tag.length)) }}>
              {([["off", x.compare.left], ["on", x.compare.right]] as const).map(([tone, side]) => (
                <article data-block="si7i8" key={tone} className={s.screen} data-tone={tone}>
                  <div data-block="od4wq" className={s.screenHead}>
                    <span className={s.screenWho}>
                      {tone === "off" ? <Footprints className="size-5" aria-hidden="true" /> : <TrainFront className="size-5" aria-hidden="true" />}
                      {side.who}
                    </span>
                    <h3 data-block="mwwfh" className={s.screenLabel}>
                      <span className={s.lamp} aria-hidden="true" />
                      {side.label}
                    </h3>
                  </div>
                  <div data-block="ryu19" className={s.screenArt}>
                    {tone === "off"
                      ? <LostRoute stations={x.compare!.left.stations} deadEnd={x.compare!.left.deadEnd} free={x.compare!.left.free} flags={x.compare!.left.flags} label={x.compare!.left.label} />
                      : <TransitMap hub={x.compare!.right.hub} here={x.compare!.right.here} stations={x.compare!.right.stations} ring={x.compare!.right.ring} label={x.compare!.mapLabel} />}
                  </div>
                  <p data-block="txccg" className={s.screenText}>{side.text}</p>
                  <ul data-block="ufewp" className={s.screenList}>
                    {side.items.map((it) => (
                      <li data-block="i0dvi" key={it.tag}>
                        <span className={s.status}>{it.tag}</span>
                        <span>{it.text}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            </VersusTabs>
          </div>
        </section>
      )}

      {/* 453 (владелец 2026-10-11): «Инфраструктура нулевого дня» — после «Fractera vs LLM», над справочным бюро; сюда ведёт
          ссылка подзаголовка первого экрана (#zero-day). */}
      {x.zeroDay && <ZeroDay title={x.zeroDay.title} text={x.zeroDay.text} art={x.zeroDay.art} people={x.zeroDay.people} unlock={x.zeroDay.unlock} />}

      {/* 467 (владелец 2026-10-12): «Ниже чем раздел инфраструктура нулевого дня мы будем рисовать комнату которая будет называться
          таможню». Слова — `landing.customs`. */}
      {x.customs && <Customs w={x.customs} />}

      {/* 477 (владелец 2026-10-14): секция «Пересаживайся на инфраструктуру нулевого дня…» (бывший «Конвейер») снята целиком. */}
      {/* 477 (владелец 2026-10-14): «соединить с экраном Конвейер … но разделить их жёлтой вывеской в том же стиле … надпись “Счастливого
          пути в будущее”» — вывеска висит на цепочках от нижнего края «Конвейера» над ночной сценой с поездом. */}
      {x.farewell && (
        <section data-block="iwna2" className={s.farewell}>
          <div data-block="yaha4" className={s.wrap}>
            <div data-block="ik01i" className={s.farewellSign}>
              <span className={s.gateRods} aria-hidden="true" />
              <p data-block="mngh2" className={s.farewellBar}>
                <span className={s.farewellLead}>
                  <span className={s.gateIcon} aria-hidden="true"><TrainFront className="size-5" strokeWidth={2.4} /></span>
                  <span className={s.farewellText}>{x.farewell.text}</span>
                </span>
                <span className={s.gateArrow} aria-hidden="true"><ArrowDown strokeWidth={3} /></span>
              </p>
            </div>
          </div>
        </section>
      )}
      {/* 470 (владелец 2026-10-13): «А почему всё-таки Lagrix?» — ночная сцена: силуэты города, табличка-вопрос, паровозик со словами
          ответа. 477 (владелец 2026-10-14): поднята на секцию выше — сразу под «Конвейером» и жёлтой вывеской. */}
      {x.why && <WhyNight w={x.why} />}
      {/* «Маршрут построен» (владелец 2026-09-30): линия метро от станции отправления к станции назначения; между ними — пересадка.
          477 (владелец 2026-10-14): «теперь становится самой последней, ниже неё только футер». */}
      {x.routeBuilt && (
        <section data-block="hpza2" className={s.built}>
          <div data-block="fhxaj" className={s.wrap}>
            <h2 data-block="gmpb7" className={s.builtTitle}>
              <span className={s.builtLamp} aria-hidden="true"><Check className="size-4" strokeWidth={3} /></span>
              {x.routeBuilt.title}
            </h2>
            <ol data-block="k2j60" className={s.builtLine}>
              {[x.routeBuilt.from, x.routeBuilt.via, x.routeBuilt.to].filter((st) => st !== undefined).map((st, i, all) => (
                <li
                  data-block="q2iyo" key={st.label} className={s.builtStop}
                  data-pos={i === 0 ? "start" : i === all.length - 1 ? "end" : "mid"}
                >
                  {/* 342: на станции пересадки — пульс и портал с кнопкой «Жми» (островок); без слов кнопки — прежняя точка. */}
                  {st === x.routeBuilt?.via && x.routeBuilt.via.go && hero.cta ? (
                    <span className={s.builtDot}>
                      <PortalStation href={hero.cta.href} label={x.routeBuilt.via.go.label} aria={x.routeBuilt.via.go.aria} />
                    </span>
                  ) : (
                    <span className={s.builtDot} aria-hidden="true" />
                  )}
                  <span className={s.builtLabel}>{st.label}</span>
                  <span className={s.builtStation}>{st.station}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {/* Пассажиры у нижней кромки окна (владелец 2026-09-30) — только в браузере, после 10 с покоя. */}
      <Walkers />
    </div>
  )
}
