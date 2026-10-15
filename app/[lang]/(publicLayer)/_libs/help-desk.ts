import "server-only"
import { buildLlmsFullTxt } from "@/lib/aio/llms"

// ЗНАНИЯ СПРАВОЧНОГО БЮРО (узел, шаг 349). Черновик ответов написан агентом узла и подтверждён владельцем 2026-09-30
// («Подтверждаю, Luna»). 🔒 ТОЛЬКО ПРОВЕРЕННЫЕ ФАКТЫ: цена Pro — claude.com/pricing; бесплатный тариф Cloudflare — шаг 344;
// языки для поисковиков — шаг 340; «если Fractera исчезнет, ничего не сломается» — закон узла. Вне этих фактов бюро говорит
// «не знаю» и ничего не придумывает. Новый факт — строкой сюда, после проверки по первоисточнику.
// 🪦 Список FACTS снят шагом 454-1 (2026-10-12): знания бюро — живой llms-full.txt (helpDeskKnowledge ниже).
//
// Модель и предел — решение владельца того же дня: «Недорогая модель … не более 40 сообщений в час с одного адреса, короткие
// ответы. При превышении бюро вежливо просит вернуться позже». Модель `gpt-6-luna` (developers.openai.com: 0,1 $ / 0,5 $ за 1M
// токенов, «most efficient model for focused, high-volume tasks»).

export const HELP_DESK_MODEL = "gpt-6-luna"
export const HELP_DESK_PER_HOUR = 40
// 350 (владелец: «самую дешёвую модель и ограничь запись в 20 секунд»): расшифровка голоса — `gpt-4o-mini-transcribe`
// (0,003 $ за минуту, самая дешёвая в прайсе OpenAI 2026-09-30); запись — не длиннее 20 с; файл больше 2 МБ не принимается
// (20 с речи в webm/opus — сотни килобайт).
export const HELP_DESK_VOICE_MODEL = "gpt-4o-mini-transcribe"
export const VOICE_MAX_SECONDS = 20
export const VOICE_MAX_BYTES = 2 * 1024 * 1024

// 454-1 (владелец 2026-10-12): «вместо этого файла подключи его тогда чтение llms-full.txt … не должен щас просто забрать хардкод
// напиши какую-нибудь функцию». Знания бюро — тот же текст, что отдаёт `/<язык>/llms-full.txt`: тот же построитель
// `buildLlmsFullTxt`, вызванный в момент вопроса. Страницы читаются на лету, документы Lagrix — из сборки
// (`lib/aio/llms-extra.generated.json`). Цена названа владельцу: ~40–70 тыс. токенов в запрос.
export function helpDeskKnowledge(lang: string): string {
  return buildLlmsFullTxt(lang)
}

export function helpDeskSystem(lang: string): string {
  const language = lang === "ru" ? "Russian" : "English"
  return [
    "You are the information desk of the Lagrix station: a friendly clerk who answers questions about Lagrix — open discovery and settlement for the economy of AI agents — and about running a node or a super-node.",
    "Fractera is mentioned only briefly: a solution for quickly launching home AI agents, built as one of the examples of a2a interaction.",
    // 471-4 (владелец 2026-10-13): «чем более обширный будет ответ но в пределах разумного например 150 слов … ответ имеющий заголовок
    // первого уровня который предполагает ответ на основной вопрос и ещё будет например три сопутствующих темы» — каждый развёрнутый
    // ответ экономит повторный вопрос, а значит и повторное чтение всего llms-full. Разметку `#`/`##` рисует окно бюро (`Rich`).
    `Always answer in ${language}, in plain words. Give one complete answer of about 150 words (never more than 200) in this shape:`,
    "a first line '# ' with a heading that answers the main question; one short paragraph that answers it; then two or three related topics the person is likely to ask about next, each as a line '## ' with its own heading followed by one or two sentences. The related topics must be different subjects that follow from the question, not the same answer told from another side. No other markdown: no bold, no tables, no lists unless the person asks for steps.",
    "Use ONLY the knowledge text below. If the question is not covered, say honestly that the desk does not know this yet. Never invent prices, dates, income, rewards or promises.",
    // 493-7 (журнал, запись 42): у сети нет своей монеты. Бюро говорит от имени проекта, поэтому о токенах, биржах, листинге и цене
    // не говорит никогда; на вопрос о токене отвечает, что его нет, а токен под именем Lagrix к проекту не относится.
    "Lagrix has no token and no coin of its own; its money is USDC. Never talk about buying, listing or the price of any token. If asked about a Lagrix or LGX token, say that Lagrix has no token and that any token offered under its name is not part of the project.",
    "Whenever it fits, lead the person to the repository https://github.com/lagrix-dev/lagrix.",
    "KNOWLEDGE (the site and the Lagrix documents):",
    helpDeskKnowledge(lang),
  ].join("\n")
}

// Предел: не более HELP_DESK_PER_HOUR сообщений за скользящий час с одного адреса. Память процесса — перезапуск сбрасывает
// счёт; это защита кошелька владельца от одного шумного посетителя, а не учёт.
const hits = new Map<string, number[]>()
export function allowRequest(address: string, now = Date.now()): boolean {
  const hour = 60 * 60 * 1000
  const recent = (hits.get(address) ?? []).filter((t) => now - t < hour)
  if (recent.length >= HELP_DESK_PER_HOUR) { hits.set(address, recent); return false }
  recent.push(now)
  hits.set(address, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < hour)) hits.delete(k)
  return true
}
