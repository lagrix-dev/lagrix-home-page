"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ArrowDown, ArrowLeftRight, ChevronRight, Github, Info, Mic, Play, SendHorizontal, TrainFront } from "lucide-react"
import s from "./landing-agent.module.css"
import { useVoiceRecorder, type VoiceStrings } from "@/_tools/tool-voice-input/client/use-voice-recorder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgentChat, type AgentChatClass } from "./agent-chat.client"

// 350: запись не длиннее 20 секунд (слово владельца); та же граница стоит в двери `/<lang>/api/help-desk/voice` (размер файла).
const VOICE_SECONDS = 20

// СПРАВОЧНОЕ БЮРО ВОКЗАЛА (узел, шаги 348–349; слово владельца 2026-09-30: «оформлена вроде имитации киоска снаружи которого могло
// бы быть написано справочная бюро … открыто 24 часа … в центре у нас будет работать чат … мы будем использовать библиотеку
// готового чата от Vesel … кнопки быстрых ответов … на широкой версии по бокам киоска … как вывески … чуть-чуть в разном стиле …
// чуть-чуть наклонённые … внизу область ввода текста с микрофоном … на телефоне стандартный чат с быстрыми кнопками»).
// Дизайн — навык impeccable, мир страницы (вокзал, табло). Чат — `useChat` (Vercel AI SDK) → дверь `/<lang>/api/help-desk`.
//
// 🔒 «ОТПРАВЛЕНИЕ» — ГЛАВНАЯ ВЫВЕСКА (слово владельца: «ты забыл самую главную кнопку на обоих цепочках табличек … последнюю
// кнопку нарисуй: отправление. Она запустила сценарий описывающей последовательность запуска примерно как был в чате с анной»):
// последняя в обеих цепочках, красная; спрашивает бюро о запуске по шагам — ответ по фактам `(publicLayer)/_libs/help-desk.ts`.
// 🔒 ВЫВЕСКИ И БЫСТРЫЕ КНОПКИ ОТВЕЧАЮТ ГОТОВЫМ ТЕКСТОМ, НАБРАННОЕ — МОДЕЛЬЮ (слово владельца 2026-09-30: «ответы в чат можно
// пробрасывать любой момент а вот уже сообщения у нас будет лимитированы»): вопрос и ответ вывески кладутся в ленту на странице —
// мгновенно, без двери, без предела и даже при выключенном компьютере; набранное уходит в `/<lang>/api/help-desk` (40 в час с адреса).
// Предел превышен (429) — бюро просит вернуться позже; дверь молчит — «бюро сейчас закрыто». Микрофон (шаг 350): нажал — запись, нажал ещё раз или прошло 20 с — расшифровка самой дешёвой
// моделью в поле ввода; отправляет её человек.

export type HelpDeskWords = {
  title: string
  hours: string
  greeting: string
  who: string
  you: string
  placeholder: string
  send: string
  mic: string
  questions: string[]
  /** Готовые ответы вывесок — по порядку `questions` (факты `(publicLayer)/_libs/help-desk.ts`, утверждены владельцем). */
  answers: string[]
  departure: { label: string; question: string; answer: string }
  /** Владелец: «одну кнопку отправления слева а другую кнопку назовём пересадки в пути … измени красный цвет … на другой». */
  transfer: { label: string; question: string; answer: string }
  /** 501-2 (владелец 2026-10-16): «Мы начинаем» — дорожный указатель с ласточкиным хвостом, последний слева. Бюро пишет приветствие,
   *  три шага «как сделать и что должно получиться» и приглашение спросить здесь же — дальше разговор с бюро обычный. */
  start?: { label: string; question: string; answers: string[] }
  /** 477 (владелец 2026-10-14): две зелёные вывески-симуляции — слева «Симуляция одного проекта» над «Стоимостью поездки», справа
   *  «Симуляция поиска важного человека»; обе пока ведут к тому же чату с Анной и парикмахерской («пока эту кнопку будет возвращать
   *  тот же самый чат»). */
  simulations?: { project: { label: string; href: string }; person: { label: string; href: string } }
  /** Владелец: «кнопка GitHub справа от микрофона» — открывает репозиторий проекта в новой вкладке. */
  github: { label: string; href: string }
  thinking: string
  /** 496-5: подпись кнопки «вниз до конца» ленты. */
  down?: string
  limit: string
  closed: string
}

const textOf = (m: { parts?: { type: string; text?: string }[] }) =>
  (m.parts ?? []).filter((p) => p.type === "text").map((p) => p.text ?? "").join("")

// Ссылки в ответе бюро: итог процедуры — репозиторий на GitHub и его Fork (слово владельца), поэтому адреса github.com и
// claude.com кликабельны; прочие адреса остаются текстом.
const LINK_HOSTS = ["github.com", "claude.com"]
function Linked({ text }: { text: string }) {
  return <>{text.split(/(https:\/\/[^\s,)]+)/g).map((p, i) => {
    if (!p.startsWith("https://")) return p
    const url = p.replace(/[.;:»]+$/, "")
    let host = ""
    try { host = new URL(url).hostname.replace(/^www\./, "") } catch { /* не адрес */ }
    return LINK_HOSTS.includes(host)
      ? <span key={i}><a href={url} target="_blank" rel="noopener noreferrer">{url.replace("https://", "")}</a>{p.slice(url.length)}</span>
      : p
  })}</>
}

// 471-3 (владелец 2026-10-13): ответ — «заголовок первого уровня, который … отвечает на основной вопрос, и ещё … три сопутствующих
// темы». Ответ вывески и ответ модели приходят текстом с разметкой: строка «# …» — заголовок-ответ, «## …» — смежная тема, остальное —
// абзацы (пустая строка их делит, строки списка остаются строками). Своих подписей нет — только текст ответа.
function Rich({ text }: { text: string }) {
  const out: { kind: "h1" | "h2" | "p"; text: string }[] = []
  let para: string[] = []
  const flush = () => { if (para.length) out.push({ kind: "p", text: para.join("\n") }); para = [] }
  for (const line of text.replace(/\*\*/g, "").split("\n")) {
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) { flush(); out.push({ kind: h[1].length === 1 ? "h1" : "h2", text: h[2].trim() }) }
    else if (!line.trim()) flush()
    else para.push(line)
  }
  flush()
  return <>{out.map((b, i) => (
    <span key={i} className={b.kind === "h1" ? s.kioskH1 : b.kind === "h2" ? s.kioskH2 : s.kioskPara}>
      {b.kind === "p" ? <Linked text={b.text} /> : b.text}
    </span>
  ))}</>
}

// 477 (владелец 2026-10-14): «нажатие на кнопку симуляция одного проекта или симуляция важного человека должно запускать чат внутри
// справочного бюро». Симуляция — тот же чат агентов (Анна и салон), что стоял на прежнем первом экране: окно бюро показывает его
// с начала при каждом нажатии; вопрос с вывески или набранное сообщение возвращают окно к разговору с бюро.
// 498-5 (владелец 2026-10-16): у каждой зелёной вывески свой разговор — «одного проекта» и «поиска важного человека».
type SimChat = Pick<Parameters<typeof AgentChat>[0], "label" | "items" | "contractLabels" | "meter"> & { back?: string }
type SimKey = "project" | "person"

export function HelpDesk({ w, lang, voiceWords, sims, chatClasses }: { w: HelpDeskWords; lang: string; voiceWords: VoiceStrings; sims?: Partial<Record<SimKey, SimChat>>; chatClasses?: Partial<Record<AgentChatClass, string>> }) {
  const [simRun, setSimRun] = useState<{ key: SimKey; n: number } | null>(null)
  const startSim = (key: SimKey) => setSimRun((r) => ({ key, n: (r?.n ?? 0) + 1 }))
  const sim = simRun ? sims?.[simRun.key] : undefined
  const [text, setText] = useState("")
  const input = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)
  // 496-5 (владелец 2026-10-15): лента держит свою высоту и прокручивается внутри; пока конец ленты не виден — кнопка «вниз до конца».
  const [down, setDown] = useState(false)
  const measure = () => { const b = log.current; if (b) setDown(b.scrollHeight - b.scrollTop - b.clientHeight > 24) }
  const transport = useMemo(() => new DefaultChatTransport({ api: `/${lang}/api/help-desk`, body: { lang } }), [lang])
  const { messages, sendMessage, setMessages, status, error, clearError } = useChat({ transport })
  const busy = status === "submitted" || status === "streaming"
  const voiceExtra = useMemo(() => ({ lang }), [lang])
  const voice = useVoiceRecorder({ targetRef: input, value: text, onChange: setText, lang, apiUrl: `/${lang}/api/help-desk/voice`, maxSeconds: VOICE_SECONDS, extra: voiceExtra, strings: voiceWords })
  // Расшифровка встаёт в поле сразу: само поле и есть проверка перед «Отправить».
  useEffect(() => { if (voice.draft) voice.accept() }, [voice.draft]) // eslint-disable-line react-hooks/exhaustive-deps

  // Новый ответ встаёт в окне с начала — с вопроса, на который он отвечает (471-3: ответы длинные, их читают сверху); пока ответа нет —
  // к низу ленты, как прежде.
  const shown = useRef("")
  useEffect(() => {
    const box = log.current
    if (!box) return
    const last = messages[messages.length - 1]
    if (last?.role === "assistant") {
      if (last.id === shown.current) return
      shown.current = last.id
      // 501-2: несколько готовых ответов подряд («Мы начинаем») встают с реплики посетителя, а не с последнего ответа.
      let k = messages.length - 2
      while (k >= 0 && messages[k].role !== "user") k--
      const el = box.querySelector<HTMLElement>(`[data-mid="${k >= 0 ? messages[k].id : last.id}"]`)
      if (el) box.scrollTo({ top: box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - 8, behavior: "smooth" })
      return
    }
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" })
  }, [messages, status, error])
  // Новая карточка, которая не сдвинула ленту, не даёт события прокрутки — кнопку «вниз» пересчитываем и так.
  useEffect(() => { measure() }, [messages, status, error]) // eslint-disable-line react-hooks/exhaustive-deps

  // Набранный вопрос — модели (дверь, предел).
  const ask = (q: string) => {
    const t = q.trim()
    if (!t || busy) return
    setSimRun(null)
    if (error) clearError()
    void sendMessage({ text: t })
  }
  // Вывеска — готовый ответ прямо в ленту.
  const quick = (q: string, answer: string) => {
    if (busy) return
    setSimRun(null)
    if (error) clearError()
    const n = Date.now().toString(36)
    setMessages((prev) => [
      ...prev,
      { id: `q-${n}`, role: "user", parts: [{ type: "text", text: q }] },
      { id: `a-${n}`, role: "assistant", parts: [{ type: "text", text: answer }] },
    ])
  }
  // 501-2: «Мы начинаем» — реплика посетителя и несколько ответов бюро подряд; дальше человек спрашивает в том же окне.
  const begin = (q: string, answers: string[]) => {
    if (busy) return
    setSimRun(null)
    if (error) clearError()
    const n = Date.now().toString(36)
    setMessages((prev) => [
      ...prev,
      { id: `q-${n}`, role: "user", parts: [{ type: "text", text: q }] },
      ...answers.map((text, i) => ({ id: `a-${n}-${i}`, role: "assistant" as const, parts: [{ type: "text" as const, text }] })),
    ])
  }
  const submit = () => {
    const t = text.trim()
    if (!t) { input.current?.focus(); return }
    setText("")
    ask(t)
  }
  const failure = error ? (/429|rate-limit/i.test(error.message) ? w.limit : w.closed) : null

  const half = Math.ceil(w.questions.length / 2)
  const sign = (q: string, i: number) => (
    <li data-block="hd3s1" key={q} className={s.deskSign} data-look={i % 3}>
      <span className={s.deskSignRods} aria-hidden="true" />
      <Button variant="bare" size="bare" type="button" className={s.deskSignPlate} onClick={() => quick(q, w.answers[i] ?? "")} disabled={busy}>{q}</Button>
    </li>
  )
  // Главные вывески низа цепочек: слева «Отправление» (красный сигнал), справа «Пересадки в пути» (оранжевый — цвет кольца пересадок).
  const main = (block: string, look: "go" | "transfer", item: { label: string; question: string; answer: string }) => (
    <li data-block={block} className={s.deskSign} data-look={look}>
      <span className={s.deskSignRods} aria-hidden="true" />
      <Button variant="bare" size="bare" type="button" className={s.deskSignPlate} onClick={() => quick(item.question, item.answer)} disabled={busy}>
        {look === "go" ? <TrainFront className="size-5" strokeWidth={2.4} aria-hidden="true" /> : <ArrowLeftRight className="size-5" strokeWidth={2.4} aria-hidden="true" />}
        {item.label}
      </Button>
    </li>
  )

  // 477: зелёная вывеска-симуляция — ссылка к чату-примеру (та же цепочка, цвет «прибытие» `--go`), первая в своей колонке.
  const simSign = (block: string, key: SimKey, item?: { label: string; href: string }) => item && (
    <li data-block={block} className={s.deskSign} data-look="sim">
      <span className={s.deskSignRods} aria-hidden="true" />
      {sims?.[key] ? (
        <Button variant="bare" size="bare" type="button" className={s.deskSignPlate} onClick={() => startSim(key)}>
          <Play className="size-5" strokeWidth={2.4} aria-hidden="true" />
          {item.label}
        </Button>
      ) : (
        <a href={item.href} className={s.deskSignPlate}>
          <Play className="size-5" strokeWidth={2.4} aria-hidden="true" />
          {item.label}
        </a>
      )}
    </li>
  )

  return (
    <div data-block="hd3g1" className={s.deskGrid}>
      <ul data-block="hd3l1" className={s.deskSigns} data-side="left">
        {simSign("hd3s7", "project", w.simulations?.project)}
        {w.questions.slice(0, half).map((q, i) => sign(q, i))}
        {main("hd3d1", "go", w.departure)}
        {w.start && (
          <li data-block="hd3s0" className={s.deskSign} data-look="start">
            <span className={s.deskSignRods} aria-hidden="true" />
            <Button variant="bare" size="bare" type="button" className={s.deskSignPlate} onClick={() => begin(w.start!.question, w.start!.answers)} disabled={busy}>
              {w.start.label}
              <ChevronRight className="size-5" strokeWidth={2.6} aria-hidden="true" />
            </Button>
          </li>
        )}
      </ul>

      <div data-block="hd3k1" className={s.kiosk}>
        <div data-block="hd3r1" className={s.kioskRoof}>
          <h2 data-block="hd3t1" className={s.kioskPlate}>
            <span className={s.kioskPlateMark} aria-hidden="true"><Info className="size-5" strokeWidth={2.6} /></span>
            {w.title}
          </h2>
          <p data-block="hd3h1" className={s.kioskHours}><span className={s.kioskLamp} aria-hidden="true" />{w.hours}</p>
        </div>

        <div data-block="hd3b1" className={s.kioskBody}>
          {simRun !== null && sim ? (
            <div data-block="hd3s9" className={s.kioskSimWindow}>
              <AgentChat key={`${simRun.key}-${simRun.n}`} label={sim.label} items={sim.items} contractLabels={sim.contractLabels} meter={sim.meter} classes={chatClasses} />
            </div>
          ) : (
            <div data-block="hd3w1" ref={log} className={s.kioskWindow} aria-live="polite" onScroll={measure}>
              <p data-block="hd3m1" className={s.kioskMsg}>
                <span className={s.kioskWho}>{w.who}</span>
                {w.greeting}
              </p>
              {messages.map((m) => (
                <p data-block="hd3m2" key={m.id} data-mid={m.id} className={s.kioskMsg} data-me={m.role === "user" ? "" : undefined}>
                  <span className={s.kioskWho}>{m.role === "user" ? w.you : w.who}</span>
                  {m.role === "user" ? <Linked text={textOf(m)} /> : <Rich text={textOf(m)} />}
                </p>
              ))}
              {status === "submitted" && (
                <p data-block="hd3m3" className={s.kioskMsg} data-wait="">
                  <span className={s.kioskWho}>{w.who}</span>
                  {w.thinking}
                </p>
              )}
              {failure && (
                <p data-block="hd3m4" className={s.kioskMsg} data-fail="">
                  <span className={s.kioskWho}>{w.who}</span>
                  {failure}
                </p>
              )}
              {down && (
                <Button data-block="hd3w2" variant="bare" size="bare" type="button" className={s.kioskDown} aria-label={w.down} title={w.down}
                  onClick={() => log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" })}>
                  <ArrowDown aria-hidden className="size-4" />
                </Button>
              )}
            </div>
          )}
          {simRun !== null && sim?.back && (
            <Button variant="bare" size="bare" type="button" className={s.kioskBack} onClick={() => setSimRun(null)}>{sim.back}</Button>
          )}

          <ul data-block="hd3c1" className={s.kioskChips}>
            {w.simulations && (["project", "person"] as const).map((key) => ({ key, it: w.simulations![key] })).map(({ key, it }) => (
              <li data-block="hd3c5" key={it.label}>{sims?.[key]
                ? <Button variant="bare" size="bare" type="button" className={s.kioskChip} data-sim="" onClick={() => startSim(key)}>{it.label}</Button>
                : <a href={it.href} className={s.kioskChip} data-sim="">{it.label}</a>}</li>
            ))}
            <li data-block="hd3c3"><Button variant="bare" size="bare" type="button" className={s.kioskChip} data-go="" onClick={() => quick(w.departure.question, w.departure.answer)} disabled={busy}>{w.departure.label}</Button></li>
            {w.start && <li data-block="hd3c6"><Button variant="bare" size="bare" type="button" className={s.kioskChip} data-start="" onClick={() => begin(w.start!.question, w.start!.answers)} disabled={busy}>{`${w.start.label} ›`}</Button></li>}
            <li data-block="hd3c4"><Button variant="bare" size="bare" type="button" className={s.kioskChip} data-transfer="" onClick={() => quick(w.transfer.question, w.transfer.answer)} disabled={busy}>{w.transfer.label}</Button></li>
            {w.questions.map((q, i) => (
              <li data-block="hd3c2" key={q}><Button variant="bare" size="bare" type="button" className={s.kioskChip} onClick={() => quick(q, w.answers[i] ?? "")} disabled={busy}>{q}</Button></li>
            ))}
          </ul>

          <form data-block="hd3f1" className={s.kioskCounter} onSubmit={(e) => { e.preventDefault(); submit() }}>
            <Input
              ref={input}
              className={s.kioskInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={w.placeholder}
              aria-label={w.placeholder}
              maxLength={1000}
            />
            <Button variant="bare" size="bare"
              type="button"
              className={s.kioskMic}
              aria-label={w.mic}
              title={w.mic}
              aria-pressed={voice.recording}
              data-rec={voice.recording ? "" : undefined}
              data-busy={voice.busy ? "" : undefined}
              disabled={!voice.supported || voice.busy}
              onClick={() => (voice.recording ? voice.stop() : voice.start())}
            >
              {voice.recording ? <span className={s.kioskMicTime}>{voice.elapsed.slice(3)}</span> : <Mic className="size-5" strokeWidth={2.2} aria-hidden="true" />}
            </Button>
            <a href={w.github.href} target="_blank" rel="noopener noreferrer" className={s.kioskMic} aria-label={w.github.label} title={w.github.label}>
              <Github className="size-5" strokeWidth={2.2} aria-hidden="true" />
            </a>
            <Button variant="bare" size="bare" type="submit" className={s.kioskSend} disabled={busy} aria-label={w.send}>
              <span className={s.kioskSendText}>{w.send}</span>
              <SendHorizontal className="size-5" strokeWidth={2.2} aria-hidden="true" />
            </Button>
          </form>
          {voice.note && <p data-block="hd3v1" className={s.kioskVoiceNote} role="status">{voice.note}</p>}
        </div>
      </div>

      <ul data-block="hd3l2" className={s.deskSigns} data-side="right">
        {simSign("hd3s8", "person", w.simulations?.person)}
        {w.questions.slice(half).map((q, i) => sign(q, i + half))}
        {main("hd3d2", "transfer", w.transfer)}
      </ul>
    </div>
  )
}
