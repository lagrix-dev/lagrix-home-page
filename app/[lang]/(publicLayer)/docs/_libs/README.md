# docs/_libs

Data and functions of the /docs branch (node step 457).

- `source.json` — where the documents come from: repository, branch, README path, docs folder, languages. The only place to change it.
- `docs.generated.json` — written by `scripts/sync-lagrix-docs.mjs` at every build: the README and every `docs/<lang>/*.md` of
  the repository, byte for byte. Never edit it by hand — edit the repository and rebuild.
- `docs.ts` — reading the copy: documents of a language (English when missing), one document, titles, the search description,
  links of the repository turned into links of this site.
- `words.json` — the labels of the documents list, per language.
- `seo.ts` — metadata of both pages: title (the document H1), description (its first paragraph), canonical and hreflang
  (`buildAlternates`, with the Markdown twin), Open Graph, Twitter.
