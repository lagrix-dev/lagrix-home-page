# docs/_libs

Data and functions of the /docs branch (node steps 457, 458).

- `source.json` — where the documents come from: repository, branch, the README of each language (`README.md`, `README.ru.md`),
  docs folder, languages. The only place to change it.
- `docs.generated.json` — written by `scripts/sync-lagrix-docs.mjs` at every build: the README of each language, every
  `docs/<lang>/*.md` of the repository byte for byte, and the date of the branch's last commit. Never edit it by hand — edit the
  repository and rebuild.
- `docs.ts` — reading the copy: documents of a language (English when missing), one document, the README of a language, titles,
  the search description, links of the repository turned into links of this site, which languages are open to search.
- `to-blocks.ts` — Markdown → the element's `text-*` blocks (headings, paragraphs, lists, quotes, code, tables); the first `#`
  heading becomes the page H1.
- `post.tsx` — the pages as blog posts: `createContentPost` with format `document` (JSON-LD `TechArticle`), breadcrumbs, date of
  the last commit, reading time, the page snippet as cover and og:image (`<page>/snippet.png`), search languages by the files
  present in the repository.
- `words.json` — the labels of the branch (crumb, title suffix, list title, «min read»), per language.
