# widget-static-docs-reader

The page of the /docs branch (node step 457): the list of the repository's documents on the left, the document on the right,
drawn exactly like GitHub — `react-markdown` + `remark-gfm`, GitHub's own styles `github-markdown-css` (class `markdown-body`,
light and dark by the system setting), and a JSON-LD `TechArticle`.

- `index.tsx` — `DocPage`: layout, list, JSON-LD.
- `markdown-doc.tsx` — `MarkdownDoc` (links of the repository → links of this site through `next/link`, other repository files →
  GitHub) and `DocsNav`.
- Words: `../../../_libs/words.json`; documents: `../../../_libs/docs.ts` (copy written at build by `scripts/sync-lagrix-docs.mjs`).
- GitHub's styles are a named exception to «look only from the design tokens»: the owner asked for GitHub one to one.
