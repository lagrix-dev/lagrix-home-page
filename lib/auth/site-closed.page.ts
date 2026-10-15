// СТРАНИЦА «САЙТ ВРЕМЕННО ЗАКРЫТ», КОТОРУЮ ОТДАЮТ ВОРОТА САЙТА В ПРОКСИ (шаг узла 488).
//
// Слово владельца 2026-10-15: «зарегистрированный пользователь получит роль пользователь и всё равно ничего не увидит».
// Отдаётся вошедшему без роли, которой открыт сайт (`config/site-access.json`). Ни одного внешнего файла и ни строчки
// содержимого сайта — тот же приём, что у `temporary-address.page.ts`.

import { siteClosedStrings } from "./site-closed.i18n"

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function siteClosedPage(lang: string): string {
  const s = siteClosedStrings(lang)
  return `<!doctype html>
<html lang="${esc(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(s.title)}</title>
<style>
  :root { color-scheme: light dark; --bg:#f6f6f7; --card:#fff; --ink:#18181b; --dim:#52525b; --line:#e4e4e7; --accent:#2563eb; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0b0b0c; --card:#141416; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#60a5fa; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100dvh; display:grid; place-items:center; padding:24px; background:var(--bg); color:var(--ink);
    font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
  .card { width:100%; max-width:30rem; background:var(--card); border:1px solid var(--line); border-radius:16px; padding:28px; }
  h1 { font-size:1.35rem; line-height:1.3; margin:0 0 12px; }
  p { margin:0 0 16px; color:var(--dim); }
  a { display:inline-block; padding:10px 16px; border-radius:10px; border:1px solid var(--line); color:var(--ink);
    text-decoration:none; font-weight:600; }
</style>
</head>
<body>
  <main class="card">
    <h1>${esc(s.title)}</h1>
    <p>${esc(s.body)}</p>
    <a href="/logout?lang=${esc(lang)}">${esc(s.switchAccount)}</a>
  </main>
</body>
</html>`
}
