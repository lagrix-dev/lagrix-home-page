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
//
// CLOSED REPOSITORY (node step 489, owner 2026-10-15: «переводи синхронизацию на токен, закрываю репозитории»; «у нас есть место
// где мы добавляем ключ GitHub»). The token is the element's OWN GitHub token — the one the person saves on the element's
// GitHub page of the core (`/<lang>/<element>/build/github`, field «token»): the core keeps it in `<SERVICE_DATA_DIR>/github/.env`
// (`GITHUB_TOKEN=`, outside git; SERVICE_DATA_DIR comes from the environment or `.env.local`, written by the installer).
// For lagrix it is a fine-grained token of lagrix-dev with Contents: Read-only on lagrix. With it every call goes to api.github.com with
// `Authorization: Bearer`, and files come from `GET /repos/{repo}/contents/{path}` with `application/vnd.github.raw+json`
// (docs.github.com: «Returns the raw file contents»; raw.githubusercontent.com does not serve a private repository without a key).
// No token → the old keyless path. The token is never printed.
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
const envLine = (file, key) => {
  try {
    const line = fs.readFileSync(file, 'utf8').split(/\r?\n/).find((l) => l.startsWith(`${key}=`))
    return line?.slice(key.length + 1).trim() || null
  } catch { return null }
}
const readToken = () => {
  const dataDir = process.env.SERVICE_DATA_DIR?.trim() || envLine(path.join(ROOT, '.env.local'), 'SERVICE_DATA_DIR')
  return dataDir ? envLine(path.join(dataDir, 'github', '.env'), 'GITHUB_TOKEN') : null
}
const token = readToken()
const auth = token ? { authorization: `Bearer ${token}`, 'x-github-api-version': '2022-11-28' } : {}
console.log(`===DOCS_SYNC_AUTH=== ${token ? 'read token (…' + token.slice(-4) + ')' : 'no token — keyless'}`)
const api = `https://api.github.com/repos/${src.repo}/git/trees/${encodeURIComponent(src.branch)}?recursive=1`
const treeRes = await fetch(api, { headers: { accept: 'application/vnd.github+json', 'user-agent': 'fractera-docs-sync', ...auth }, signal: AbortSignal.timeout(20_000) }).catch(() => null)
if (!treeRes || !treeRes.ok) offline(`tree ${treeRes ? treeRes.status : 'no answer'}`)
const tree = await treeRes.json()
if (tree.truncated) offline('tree truncated')

// What to take: the README of the repository (shown at /<lang>/docs) and every .md of docs/<lang>/ (one page each).
const blobs = tree.tree.filter((t) => t.type === 'blob').map((t) => t.path)
// README of each language (458-1): { en: 'README.md', ru: 'README.ru.md' }; an old single string still works.
const readmes = typeof src.readme === 'string' ? { en: src.readme } : src.readme
const wanted = blobs.filter((p) => Object.values(readmes).includes(p) || src.languages.some((l) => p.startsWith(`${src.docsDir}/${l}/`) && p.endsWith('.md')))
const enc = (p) => p.split('/').map(encodeURIComponent).join('/')
const raw = (p) => token
  ? `https://api.github.com/repos/${src.repo}/contents/${enc(p)}?ref=${encodeURIComponent(src.branch)}`
  : `https://raw.githubusercontent.com/${src.repo}/${src.branch}/${enc(p)}`
const rawHeaders = token ? { accept: 'application/vnd.github.raw+json', 'user-agent': 'fractera-docs-sync', ...auth } : {}
const files = {}
for (const p of wanted) {
  const r = await fetch(raw(p), { headers: rawHeaders, signal: AbortSignal.timeout(20_000) }).catch(() => null)
  if (!r || !r.ok) offline(`${p} ${r ? r.status : 'no answer'}`)
  files[p] = await r.text()
}

// Titles from the first «# » line — the page title and the list entry; the slug is the file name without .md.
const titleOf = (md) => (md.match(/^#\s+(.+)$/m)?.[1] ?? '').trim()
// 458-4: date of the last commit of the branch — the documents' «modified» date (JSON-LD TechArticle). One more API call;
// no answer → the previous copy's date stays (or today's, on a first sync).
const prevCopy = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : null
const commitRes = await fetch(`https://api.github.com/repos/${src.repo}/commits/${encodeURIComponent(src.branch)}`, { headers: { accept: 'application/vnd.github+json', 'user-agent': 'fractera-docs-sync', ...auth }, signal: AbortSignal.timeout(20_000) }).catch(() => null)
const commit = commitRes && commitRes.ok ? await commitRes.json() : null
const updatedAt = commit?.commit?.committer?.date ?? prevCopy?.source?.updatedAt ?? new Date().toISOString()
const out = { source: { repo: src.repo, branch: src.branch, updatedAt, syncedAt: new Date().toISOString() }, readme: {}, languages: {} }
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
