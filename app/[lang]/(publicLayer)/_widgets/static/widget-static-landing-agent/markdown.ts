import { landingWords } from "./words"

// ТЕКСТ ЛЕНДИНГА ДЛЯ МАШИН (узел, шаг 428). Сборщик markdown-копии страницы (`lib/aio/surfaces.ts` → `/<язык>/index.md`,
// `llms-full.txt`) зовёт эту функцию на блоке `widget-static-landing-agent`. Источник тот же, что рисует виджет, — `landingWords`
// (данные главной, поле `landing`): поправили слова — изменились обе формы страницы.
// Здесь только поле `landing`: заголовок, «что умеет» и «под капотом» — обычные блоки страницы, их пишет сборщик сам.
// 🔒 467-4: копия собирается ВРУЧНУЮ — новая секция или новое видимое поле в `landing` без строки здесь в `/<язык>/index.md` и
// `llms-full.txt` не попадает. Добавил секцию на страницу — добавь её и сюда той же правкой.
// 🔒 Только слова из данных — ни одной своей подписи: английская подпись на русской странице — чужой язык для машины (шаг 507).

export function markdown(lang: string): string {
  const w = landingWords(lang)
  if (!w) return ""
  const x = w.x
  const out: string[] = []
  const para = (...t: (string | undefined)[]) => {
    for (const s of t) if (s && s.trim()) out.push(s.trim(), "")
  }
  const list = (items: (string | undefined)[]) => {
    const rows = items.filter((s): s is string => !!s && !!s.trim())
    if (rows.length) out.push(...rows.map((s) => `- ${s.trim()}`), "")
  }
  const head = (level: 2 | 3, t?: string) => {
    if (t && t.trim()) out.push(`${"#".repeat(level)} ${t.trim()}`, "")
  }
  const qa = (q?: string, a?: string) => {
    if (q && a) out.push(`### ${q.trim()}`, "", a.trim(), "")
  }

  // 477 (владелец 2026-10-14): первый экран — бейдж (H1) и надпись «Инфраструктура нулевого дня»; заголовок страницы пишет сборщик
  // из блока героя. Звёздное небо — рисунок, слов в нём нет.
  const plate = (x as typeof x & { openSource?: string }).openSource
  if (plate) para(plate.replace(/\*([^*]+)\*/g, "**$1**"))
  // 510: нижняя строка первого экрана — «старт за 60 секунд» (прежде — заголовок секции zero-day).
  para(x.startNote?.text ?? x.zeroDay?.title)
  para(x.launchBanner)

  // 477: второй экран — вокзал будущего: вывеска входа и растяжки двух миссий на крыльях.
  if (x.facade) {
    const f = x.facade
    head(2, f.label)
    para(f.entrance)
    for (const m of f.missions) {
      head(3, `${m.name} · ${m.title}`)
      para(m.line, m.text)
      list(m.stops)
    }
  }

  // 467-4: строка табло «Отправление из» — видна на табло.
  if (x.board?.from && x.board.fromValue) list([`${x.board.from}: ${x.board.fromValue}`])

  head(2, x.claim)
  qa(x.claimHintLabel, x.claimHint)

  // 477: на табло висит старая жёлтая вывеска к чату (указатель гейтов).
  if (x.gate) {
    list(x.gate.routes)
    qa(x.gate.ask, x.gate.answer)
  }

  // 477: справочная служба — третий экран (под табло и висящей на нём жёлтой вывеской); копия следует порядку страницы.
  if (x.helpDesk) {
    const d = x.helpDesk
    // 471-3: ответы вывесок размечены «# …» / «## …» для окна бюро; в копии страницы они ниже «### вопрос», поэтому их заголовки
    // становятся жирными строками — структура документа (H2 секции, H3 вопроса) не ломается.
    const plain = (t?: string) => t?.replace(/^#{1,6}\s+(.+)$/gm, "**$1**")
    head(2, d.title)
    // 477: зелёные вывески-симуляции бюро — ссылки к чату-примеру.
    if (d.simulations) out.push(...[d.simulations.project, d.simulations.person].map((it) => `- [${it.label}](${it.href})`), "")
    para(d.greeting)
    d.questions.forEach((q, i) => qa(q, plain(d.answers[i])))
    qa(d.departure?.question, plain(d.departure?.answer))
    // 501-2: «Мы начинаем» — приветствие и три шага бюро одним ответом.
    if (d.start) qa(d.start.question, plain(d.start.answers.join("\n\n")))
    qa(d.transfer?.question, plain(d.transfer?.answer))
    if (d.github?.href) out.push(`[${d.github.label}](${d.github.href})`, "")
  }

  // Чат-пример (477: играет в окне бюро по зелёным вывескам-симуляциям): кто что сказал, по порядку.
  if (x.chat?.items?.length) {
    const labels = x.chat.contractLabels
    const talk = (label: string, items: NonNullable<typeof x.chat>["items"]) => {
      head(2, label)
      for (const m of items) {
        // 456: протокол реплики — как на значке чата (у гостя сайта — слова из данных, у остальных — код протокола).
        const badge = m.contract === "guest" ? labels.guest : m.contract
        if (m.text) out.push(`**${m.who}** (${badge}): ${m.text.trim()}`, "")
        if (m.steps?.length) list(m.steps)
        if (m.checks?.length) list(m.checks)
        // 498-5: плашка доставки под репликой («доставка $0,001 · платит Илья») — строкой под ней.
        if (m.note) out.push(`_${m.note}_`, "")
      }
    }
    talk(x.chat.label, x.chat.items)
    if (x.chat.endCta) out.push(`[${x.chat.endCta.label}](${x.chat.endCta.href})`, "")
    // 498-5: второй чат-пример бюро — «поиск важного человека».
    const pc = x.helpDesk?.personChat
    if (pc?.items?.length) talk(pc.label, pc.items)
  }

  if (x.waiting) {
    head(2, x.waiting.title)
    para(x.waiting.text)
    // 467-4: подпись сцены и видео телевизора — то, что посетитель видит и включает.
    list([x.waiting.scene])
    if (x.waiting.video) out.push(`[${x.waiting.watch || x.waiting.tv}](https://www.youtube.com/watch?v=${x.waiting.video})`, "")
  }

  if (x.telegraph) {
    head(2, x.telegraph.title)
    if (x.telegraph.text) para(x.telegraph.text)
    para(x.telegraph.h2h.ticker)
    para(x.telegraph.h2a.ticker)
    // 502: строка ведра «Спам» (498) в копию не попадала — закон 467-4.
    para(x.telegraph.spam?.ticker)
  }

  // 515-5: комната «VIP PERSON» — подпись, сцена, концепция окна и ссылка на страницу «Официальные агенты» (закон 467-4).
  if (x.vipRoom) {
    const v = x.vipRoom
    head(2, v.title)
    para(v.text)
    list([v.scene])
    head(3, v.dialogTitle)
    para(v.dialogText)
    list(v.points)
    out.push(`[${v.more.label}](${v.more.href.startsWith("/") ? `/${lang}${v.more.href}` : v.more.href})`, "")
  }

  // 502: сцена «A2A антиспам» (498) в копии отсутствовала — закон 467-4; окно справки — абзацем, ссылка на документ 23.
  if (x.antispam) {
    const a = x.antispam
    head(2, a.title)
    para(a.text)
    list([a.scene])
    head(3, a.infoTitle)
    para(a.info)
    out.push(`[${a.more}](/${lang}/docs/23-spam-and-the-price-of-a-first-contact)`, "")
  }

  // 502: комната «Возврат билетов» — обе философии возврата целиком.
  if (x.refunds) {
    const r = x.refunds
    head(2, r.title)
    para(r.text)
    list([r.scene])
    for (const side of [r.web3, r.web2]) {
      head(3, side.title)
      if (side.notice) para(`**${side.notice}**`)
      for (const b of side.blocks) para(`**${b.h}**`, b.p)
      out.push(`[${side.more.label}](${side.more.href.startsWith("/") ? `/${lang}${side.more.href}` : side.more.href})`, "")
    }
  }

  list(x.cards)
  if (x.canNote) para(x.canNote.replace("{link}", x.canNoteLink ?? ""))

  if (x.ticket) {
    head(2, x.ticket.kicker)
    // 454-7: маршрут билета — «откуда» из данных билета, «куда» — заголовок секции (станция назначения).
    if (x.ticket.route) list([`${x.ticket.route.fromLabel}: ${x.ticket.route.from}`, `${x.ticket.route.toLabel}: ${w.hood.title}`])
    list(x.ticket.fields.map((f) => `${f.label}: ${f.value}`))
    if (x.ticket.rules) {
      head(3, x.ticket.rules.title)
      list(x.ticket.rules.items)
    }
    para(x.ticket.keep)
    if (x.ticket.stamp) para(`${x.ticket.stamp.top} · ${x.ticket.stamp.bottom}`)
    if (x.ticket.reserve) out.push(`[${x.ticket.reserve.label}](${x.ticket.reserve.href})`, "")
  }

  list(x.chips)

  if (x.compare) {
    head(2, x.compare.title)
    if (x.compare.sub) para(x.compare.sub)
    for (const side of [x.compare.left, x.compare.right]) {
      head(3, side.who ? `${side.who} — ${side.label}` : side.label)
      para(side.text)
      list(side.items.map((i) => (i.tag ? `**${i.tag}** ${i.text}` : i.text)))
    }
    // 453-1: подписи картинки «пешего маршрута» — станции, флаги их агентов, тупик и станция за ним.
    const left = x.compare.left
    list(left.stations.map((st, i) => (left.flags?.[i] ? `${st} — ${left.flags[i]}` : st)))
    list([left.deadEnd, left.free])
  }

  // 453-3/6/8: «Инфраструктура нулевого дня» — заголовок, текст за решёткой, подпись рисунка до и после «Разблокировать».
  if (x.zeroDay) {
    head(2, x.zeroDay.title)
    para(...x.zeroDay.text)
    list([x.zeroDay.art, x.zeroDay.people])
  }

  // 467: «Таможня» — табличка, строка о регуляторах, фонарь, сцена и все пары «вопрос регулятора → ответ Lagrix» с табло.
  if (x.customs) {
    const c = x.customs
    head(2, c.title)
    para(c.text)
    list([c.lamp, c.scene])
    for (const it of c.items) qa(it.q, it.a)
    if (c.more) para(`${c.more.label}: ${c.more.href}`)
  }

  if (x.outcomes?.length) {
    head(2, x.outcomesLabel)
    list(x.outcomes.map((o) => `**${o.name}** — ${o.text}`))
  }

  // 477 (владелец 2026-10-14): финальная секция «Пересаживайся на инфраструктуру нулевого дня…» снята со страницы — и отсюда.
  // 477: жёлтая вывеска между «Конвейером» и ночной сценой; поезд «А почему всё-таки Lagrix?»; «Маршрут построен» — последним.
  para(x.farewell?.text)
  if (x.why) qa(x.why.question, x.why.answer)
  if (x.routeBuilt) {
    const r = x.routeBuilt
    head(3, r.title)
    list([`${r.from.label}: ${r.from.station}`, r.via ? `${r.via.label}: ${r.via.station}` : undefined, `${r.to.label}: ${r.to.station}`])
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}
