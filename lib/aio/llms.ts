import { publicSurfaces, mdUrlFor, type Surface } from './surfaces'
import { urlFor } from '@/lib/seo/alternates'
import { getAppConfig, metaForLang } from '@/config/app-config'
import { SUPPORTED_LANGUAGES, SINGLE_LANG_MODE } from '@/config/translations/translations.config'
import LLMS_EXTRA_JSON from './llms-extra.generated.json'
import { descriptionOf, docsFor, readme, titleOf } from '@/app/[lang]/(publicLayer)/docs/_libs/docs'

// 451-5: документы для llms-full.txt, собранные `scripts/build-llms-extra.mjs` из `assets/llms-extra/<язык>/`.
const LLMS_EXTRA = LLMS_EXTRA_JSON as Record<string, { file: string; text: string }[]>

// `llms.txt` и `llms-full.txt` — что именно мы публикуем и по какой форме (шаг 505).
//
// 🔒 ФОРМА ВЗЯТА ИЗ ПЕРВОИСТОЧНИКА — https://llmstxt.org (правило «факт о чужом
// продукте только из первоисточника»). Спецификация требует ровно такой порядок:
//   1. H1 — ЕДИНСТВЕННЫЙ обязательный элемент;
//   2. цитата (`>`) с кратким описанием, несущим всё нужное для понимания
//      остального;
//   3. необязательные абзацы БЕЗ заголовков;
//   4. необязательные разделы H2 со списками ссылок вида `[имя](адрес)` и
//      необязательным `: пояснением` после них.
// Раздел `Optional` — по соглашению спецификации: ссылки, которые агент вправе
// пропустить, когда контекст надо сократить. Туда уходит правовой блок.
//
// 🔒 `llms-full.txt` В СПЕЦИФИКАЦИИ ОТСУТСТВУЕТ. Это сложившаяся практика
// сообщества, а не часть предложения, и называть его стандартом нельзя. Мы его
// отдаём, потому что он полезен, и говорим о нём именно так.
//
// Назначение формата по спецификации — ВЫВОД модели (inference), а не обучение.
//
// 🔒 468-6 (владелец 2026-10-13): «в документе не нужна русская версия вообще её убери … искусственный интеллект читает на английском,
// документ должен содержать абсолютно ровно 100% всех документов». Полный текст — ОДИН и только английский: все английские страницы,
// README и каждый документ `docs/en` репозитория lagrix-dev/lagrix. `/<язык>/llms-full.txt` отдаёт тот же английский файл, а карта
// `llms.txt` любого языка ссылается на него и называет язык.
export const FULL_TEXT_LANGUAGE = 'en'

const SECTION_TITLES: Record<Surface['section'], { en: string; ru: string }> = {
  main: { en: 'Pages', ru: 'Страницы' },
  articles: { en: 'Articles', ru: 'Статьи' },
  legal: { en: 'Optional', ru: 'Optional' },
}

function sectionTitle(section: Surface['section'], lang: string): string {
  const t = SECTION_TITLES[section]
  // `Optional` — служебное имя раздела из спецификации, оно не переводится:
  // по нему агент узнаёт, что эти ссылки можно пропустить.
  if (section === 'legal') return t.en
  return lang === 'ru' ? t.ru : t.en
}

/** Карта сайта для модели: H1, цитата, разделы со ссылками. */
export function buildLlmsTxt(lang: string): string {
  const cfg = getAppConfig()
  const meta = metaForLang(lang)
  const surfaces = publicSurfaces(lang)
  // 🔒 ЗАГОЛОВОК КАРТЫ — ИМЯ САЙТА, А НЕ ЗАГОЛОВОК СТРАНИЦЫ. `metaForLang().title`
  // пропущен через шаблон (`%s | Сайт`), и на живом сайте H1 карты вышел как
  // «Fractera — … | Fractera»: имя дважды. Тот же класс ошибки уже был в манифесте.
  const out: string[] = [`# ${meta.siteName}`, '', `> ${meta.description}`, '']

  // Абзацы без заголовков — по спецификации здесь можно дать ориентиры, которые
  // не являются ссылками. Даём ровно два факта, которые агенту нужны раньше
  // остального: где полная версия и на каких языках существует сайт.
  const full = `${urlFor(FULL_TEXT_LANGUAGE, '').replace(/\/$/, '')}/llms-full.txt`
  out.push(`Full text in English of every page and every document of this site: ${full}`, '')
  if (!SINGLE_LANG_MODE) {
    const others = SUPPORTED_LANGUAGES.filter(l => l !== lang)
      .map(l => `${urlFor(l, '').replace(/\/$/, '')}/llms.txt`)
      .join(', ')
    if (others) out.push(`This site also exists in other languages: ${others}`, '')
  }

  for (const section of ['main', 'articles', 'legal'] as const) {
    const rows = surfaces.filter(s => s.section === section)
    if (!rows.length) continue
    out.push(`## ${sectionTitle(section, lang)}`, '')
    for (const s of rows) {
      // Ссылка ведёт на markdown-версию: спецификация просит давать машине
      // разметку, а не HTML со всей обвязкой сайта.
      out.push(`- [${s.title}](${mdUrlFor(lang, s.subPath)}): ${s.description}`)
    }
    out.push('')
  }

  // 458-6: документы ветки /docs (репозиторий lagrix-dev/lagrix) — их тексты уже в llms-full.txt (llms-extra), а в карте их не
  // было: агент, читающий карту, не узнавал, что у каждого документа есть своя страница и Markdown-копия.
  const docs = docsFor(lang)
  if (docs.length) {
    out.push(`## ${lang === 'ru' ? 'Документация' : 'Documentation'}`, '', `- [${titleOf(readme(lang))}](${mdUrlFor(lang, '/docs')}): ${descriptionOf(readme(lang))}`)
    for (const d of docs) out.push(`- [${titleOf(d.text)}](${mdUrlFor(lang, `/docs/${d.slug}`)}): ${descriptionOf(d.text)}`)
    out.push('')
  }

  if (cfg.mailSupport) out.push(`## Contact`, '', `- ${cfg.mailSupport}`, '')
  return out.join('\n').replace(/\n{3,}/g, '\n\n')
}

/** Полные тексты всех страниц и документов, одним документом и только на английском (468-6): язык маршрута не учитывается. */
export function buildLlmsFullTxt(_routeLang?: string): string {
  const lang = FULL_TEXT_LANGUAGE
  const meta = metaForLang(lang)
  const surfaces = publicSurfaces(lang)
  const out: string[] = [
    `# ${meta.siteName}`,
    '',
    `> ${meta.description}`,
    '',
    // Происхождение формата названо прямо: `llms-full.txt` — практика, а не
    // спецификация. Мы не имеем права выдавать одно за другое даже умолчанием.
    'This file is the community `llms-full.txt` convention: the full text, in English, of every page of this site and of every document of the Lagrix specification.',
    '',
  ]
  for (const s of surfaces) {
    out.push('---', '', `<!-- ${urlFor(lang, s.subPath)} -->`, '', s.body(), '')
  }
  const pages = out.join('\n').replace(/\n{3,}/g, '\n\n')
  // 451-5: документы из `assets/llms-extra/<язык>/` — ДОСЛОВНО, после страниц и вне схлопывания пустых строк (иначе текст
  // документа менялся бы). Нет документов на этом языке — берутся английские; нет и их — файл как прежде, только страницы.
  // 458-9: документы ветки /docs — те же, что на сайте сейчас (живое чтение GitHub, `liveDocs()` зовёт маршрут), а не копия
  // сборки: иначе llms-full.txt отставал бы от страниц до следующей пересборки. Копия сборки — только если документов нет.
  const live = docsFor(lang)
  const extra = live.length
    ? [{ file: '0-README.md', text: readme(lang) }, ...live.map((d) => ({ file: `${d.slug}.md`, text: d.text }))]
    : LLMS_EXTRA[lang]?.length ? LLMS_EXTRA[lang] : LLMS_EXTRA.en ?? []
  if (extra.length === 0) return pages
  return [pages.replace(/\n+$/, '\n'), ...extra.map((d) => `\n---\n\n<!-- document: ${d.file} -->\n\n${d.text}`)].join('')
}
