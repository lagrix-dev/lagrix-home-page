// DOCUMENTS FROM THE LAGRIX REPOSITORY (node step 457-1, owner 2026-10-12): «источником будет [lagrix-dev/lagrix] там я буду
// обновлять документы возможно добавлять новые страницы надо чтобы здесь проекте они полностью соответствовали … после пересборки».
//
// Runs in prebuild. Reads the source from data — `app/[lang]/(publicLayer)/docs/_libs/source.json` (repository, branch, which
// paths) — asks GitHub for the repository tree once (one API call, no key) and downloads every Markdown file from
// raw.githubusercontent.com. Writes two copies of the same text:
//   1. `docs/_libs/docs.generated.json` — what the /docs branch renders (a module: the running server never reads the disk);
//   2. `assets/llms-extra/<lang>/` — what llms-full.txt carries (scripts/build-llms-extra.mjs, runs after this one).
// No network, or GitHub refuses → the last copy stays, the build goes on and says so (===DOCS_SYNC_OFFLINE===).
// A document deleted in the repository disappears from both copies on the next successful sync.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BRANCH = path.join(ROOT, 'app', '[lang]', '(publicLayer)', 'docs', '_libs')
const SOURCE = path.join(BRANCH, 'source.json')
const OUT = path.join(BRANCH, 'docs.generated.json')
const EXTRA = path.join(ROOT, 'assets', 'llms-extra')

const offline = (why) => {
  console.log(`===DOCS_SYNC_OFFLINE=== ${why} — the last copy stays (${fs.existsSync(OUT) ? 'present' : 'none yet'})`)
  process.exit(0)
}

const src = JSON.parse(fs.readFileSync(SOURCE, 'utf8'))
const api = `https://api.github.com/repos/${src.repo}/git/trees/${encodeURIComponent(src.branch)}?recursive=1`
const treeRes = await fetch(api, { headers: { accept: 'application/vnd.github+json', 'user-agent': 'fractera-docs-sync' }, signal: AbortSignal.timeout(20_000) }).catch(() => null)
if (!treeRes || !treeRes.ok) offline(`tree ${treeRes ? treeRes.status : 'no answer'}`)
const tree = await treeRes.json()
if (tree.truncated) offline('tree truncated')

// What to take: the README of the repository (shown at /<lang>/docs) and every .md of docs/<lang>/ (one page each).
const blobs = tree.tree.filter((t) => t.type === 'blob').map((t) => t.path)
// README of each language (458-1): { en: 'README.md', ru: 'README.ru.md' }; an old single string still works.
const readmes = typeof src.readme === 'string' ? { en: src.readme } : src.readme
const wanted = blobs.filter((p) => Object.values(readmes).includes(p) || src.languages.some((l) => p.startsWith(`${src.docsDir}/${l}/`) && p.endsWith('.md')))
const raw = (p) => `https://raw.githubusercontent.com/${src.repo}/${src.branch}/${p.split('/').map(encodeURIComponent).join('/')}`
const files = {}
for (const p of wanted) {
  const r = await fetch(raw(p), { signal: AbortSignal.timeout(20_000) }).catch(() => null)
  if (!r || !r.ok) offline(`${p} ${r ? r.status : 'no answer'}`)
  files[p] = await r.text()
}

// Titles from the first «# » line — the page title and the list entry; the slug is the file name without .md.
const titleOf = (md) => (md.match(/^#\s+(.+)$/m)?.[1] ?? '').trim()
const out = { source: { repo: src.repo, branch: src.branch, syncedAt: new Date().toISOString() }, readme: {}, languages: {} }
const baseReadme = files[readmes.en] ?? ''
for (const lang of src.languages) {
  const own = readmes[lang] && files[readmes[lang]]
  if (!own) console.log(`===DOCS_SYNC_README_FALLBACK=== ${lang}: no own README in the repository — the English one is shown`)
  out.readme[lang] = own || baseReadme
}
for (const lang of src.languages) {
  const prefix = `${src.docsDir}/${lang}/`
  out.languages[lang] = Object.keys(files)
    .filter((p) => p.startsWith(prefix))
    .sort()
    .map((p) => ({ slug: path.basename(p, '.md'), file: p, title: titleOf(files[p]), text: files[p] }))
}
const next = JSON.stringify(out, null, 1) + '\n'
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
// syncedAt changes every run; compare without it so an unchanged repository does not rewrite the file.
const strip = (s) => s.replace(/"syncedAt": "[^"]*"/, '')
if (strip(prev) !== strip(next)) fs.writeFileSync(OUT, next)

// The same text for llms-full.txt: assets/llms-extra/<lang>/ = README (as 0-README.md) + that language's documents, exactly.
for (const lang of src.languages) {
  const dir = path.join(EXTRA, lang)
  fs.mkdirSync(dir, { recursive: true })
  const keep = new Set(['0-README.md', ...out.languages[lang].map((d) => `${d.slug}.md`)])
  for (const f of fs.readdirSync(dir)) if (!keep.has(f)) fs.rmSync(path.join(dir, f))
  const write = (f, t) => { const p = path.join(dir, f); if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== t) fs.writeFileSync(p, t) }
  write('0-README.md', out.readme[lang])
  for (const d of out.languages[lang]) write(`${d.slug}.md`, d.text)
}
const count = Object.values(out.languages).reduce((n, l) => n + l.length, 0)
console.log(`===DOCS_SYNC_OK=== ${src.repo}@${src.branch}: README + ${count} document(s) in ${src.languages.length} language(s)`)
