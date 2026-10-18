# Skeleton /f2f — hub discovery

Written 2026-10-16 (step 507-4) by the federal agent, from the protocol (README, documents 00–23, changelog 000) and research of the
same day. A writer at minimum reasoning writes `en.json` and `ru.json` from this file only; whatever is not here is not on the page.
Form: `/code/.claude/skills/lagrix-answer-pages/references/tz-template.md`.
Updated 2026-10-18 (node step 521-6, owner: «for https://lagrix.dev/ru/f2f updATE info for developer benefits»): the developer share
(changelog entry 51, document 26) — a new H3 `developer-share`, facts F22–F23, FAQ 6, numbers, unique value.

## 1. Passport
- slug: f2f · hub: discovery · menu order: 102 (`meta.json`)
- source on the home page: «What transfers are there en route? How does my agent grow?» → «A change to F2F»; the «Bella» salon
  simulation (f2f lines: search with f2f filters, three elements bought through escrow); glossary «F2F»
- protocol documents: 20 (main), 17 §17.6 and §17.10, 04, 05, changelog entry 28

## 2. Hot question
- main query en: «buy ready-made AI agent components» · ru: «купить готовые элементы для ИИ-агента»
- intent: buy (and sell)
- evidence (each with a date and an address):
  - «Between February and May 2026, researchers confirmed over 1,184 malicious skills in OpenClaw's ClawHub marketplace»; «The trust
    model in current agent frameworks is implicit rather than verified» — Cloud Security Alliance, «Poisoned Skills: AI Agent
    Marketplace Supply Chain Attacks» — https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-skill-supply-chain-attacks-20260624-csa/ — 2026-06-24
  - a curated skills marketplace: «creators keep 70% of revenue» — its own comparison page —
    https://www.agensi.io/learn/best-ai-agent-skills-marketplaces-2026 — 2026-04-20
  - «Technical Report: Exploring the Emerging Threats of the Agent Skill Ecosystem» — https://arxiv.org/abs/2605.28588 — 2026-05-27
- what the top ten answer and what they DO NOT: comparison pages of skill and MCP marketplaces list catalogs, sizes and payouts (most
  written by the marketplaces themselves — read 2026-10-16). None ties a review to a **paid** purchase with a weight in money, none says
  that **no secret travels** with what you buy, and none sells **whole elements** (a site, an app, a service) with a card of what they
  are made of. That is our gap.
- why now: the supply-chain incidents of February–June 2026 in agent marketplaces (CSA note of 2026-06-24).

## 3. Mission
Honest reputation and discovery — a builder finds a ready element by an open rule and trusts its seller by reviews that exist only
after paid deals.

## 4. Reader
A builder (often non-technical, like Anna in the salon simulation) whose agent needs a ready capability — booking, a client base, a
night assistant — and a developer who wants to sell an element. Pain in their words: «which of these thousands of skills is safe?»;
«the ratings mean nothing»; «the store takes a third»; «what if the package steals my keys?». Leaves with: what F2F exchanges, what a
technical card says, why reviews here cost money to fake, what never travels, how buying and selling go.

## 5. Titles and meta
- title en: «Buy ready-made elements for your AI agent» · ru: «Готовые элементы для вашего ИИ-агента»
- subtitle en: «F2F: whole sites, apps and agents from other projects, with a card of what they are made of, escrow until they work and
  reviews only from paid deals.» · ru: «F2F: целые сайты, приложения и агенты из других проектов — с карточкой состава, эскроу до
  приёмки и отзывами только из оплаченных сделок.»
- description en (143): «F2F lets your AI agent buy whole ready elements from other projects: a card of what each is made of, escrow until it
  works, and honest reviews.»
  ru (147): «F2F помогает ИИ-агенту купить готовый элемент из другого проекта: карточка состава, эскроу до приёмки и честные отзывы
  только из оплаченных сделок.»
- cover alt en: «F2F: an element with its technical card travels between two projects through the Lagrix network»
  ru: «F2F: элемент с технической карточкой переходит из проекта в проект через сеть Lagrix»
- menu item en: name «F2F» · description «Buy and sell whole ready elements: a card of what they are made of, escrow, reviews only from
  paid deals.» · ru: name «F2F» · description «Покупка и продажа готовых элементов: карточка состава, эскроу и отзывы только из
  оплаченных сделок.»
- lead en (48 words): «Ready building blocks for agents are sold today in catalogs where anyone can publish and popularity proves little. F2F
  lets your agent find whole elements through the open Lagrix network, see what each is made of, pay through escrow and trust reviews
  that exist only after paid deals.»
  ru: «Готовые блоки для агентов сегодня продают в каталогах, куда может выложить кто угодно, а популярность мало что доказывает.
  F2F позволяет вашему агенту найти целый элемент в открытой сети Lagrix, увидеть, из чего он сделан, заплатить через эскроу и
  доверять отзывам, которые бывают только после оплаченных сделок.»

## 6. Body plan
Rewritten 2026-10-16 after the owner accepted the discovery sample: 4 H2 × 2 H3, no H4, 2–3 connected paragraphs under each H3. One
running example on the whole page: Anna's «Bella» salon (as in the home-page simulation) buys a ready booking element; Sam (fictional
developer) sells it. Prices of the home simulation are not repeated (not in the numbers list). The page text (`en.json`, `ru.json`) is
the reference; this plan names what each H3 must carry. en 1210 words, ru 1029 — keep ru above 1000.

### H2 `problem` — en «Why buying ready blocks for an agent is a blind risk» · ru «Почему покупка готовых блоков для агента — риск вслепую»
- H3 `problem-popularity` «Popularity proves nothing» · «Популярность ничего не доказывает» — Anna needs booking; catalogs grew in
  months, weeks to first attacks (F1); 1,184 malicious skills, February–May 2026 (F1, external CSA link, no marketplace named);
  «implicit rather than verified» (F2).
- H3 `problem-catalog` «The catalog keeps the rules and the margin» · «Правила и маржа остаются у каталога» — Sam would get 70%, the
  catalog keeps 30% (F3, unnamed); counts cheap to inflate (F4); the list's keeper decides the order (F5) → /discovery.

### H2 `how-f2f-works` — en «How F2F works» · ru «Как устроен F2F»
- H3 `how-element` «Whole elements change hands» · «Из рук в руки переходит целый элемент» — what an element is (F6); A2A buys work,
  F2F buys the element (F7) → /a2a; same super-nodes, results, reviews, no second catalog (F8).
- H3 `how-card` «A card of what it is made of» · «Карточка состава» — starter and version, runtime, languages; consumes with contract
  versions, provides; licence, source, size and build time (F9) → docs/20.

### H2 `trust` — en «Why you can trust what you buy» · ru «Почему покупке можно доверять»
- H3 `trust-reviews` «Reviews only from paid deals» · «Отзывы только из оплаченных сделок» — no deal, no review (F10); weight = fee,
  $100 → $5 (F11); count beside sum reveals farming (F12) → /likes-and-dislikes.
- H3 `trust-secrets` «Nothing secret travels» · «Ничего секретного не переезжает» — keys, passwords, personal data, storage contents
  never travel, names only (F13; en «access keys», never bare «tokens»); clean history, Sam keeps his seller reputation (F14); escrow
  until acceptance, refund if not delivered (F15) → /web3-payments.

### H2 `buy-and-sell` — en «How to buy or sell an element» · ru «Как купить или продать элемент»
- H3 `buying` «Buying» · «Покупка» — plain words, compatible card filters (F16), the same open rule (F8), $0.01 (F17) → /search-fee;
  compatibility agreed in a dialogue before the deal, nothing else before payment (F21); escrow, accept, fee at most 5% (F15, F18), review.
- H3 `selling` «Selling» · «Продажа» — announce with the card, no shop, no approval (F8); equal terms, Fractera included (F19); receipt
  lifts the element for a year, buyer's review (F20) → /reputation.
- H3 `developer-share` en «A share of every deal after the sale» · ru «Доля с каждой сделки после продажи» — a chain of steps (§5б):
  1. Anna's salon has installed Sam's booking element and takes a $100 order through it; the network fee of the deal is $5 (F18).
  2. 20% of that fee — $1 — goes to Sam, the developer of the element; $4 goes to the super-nodes (F22).
  3. Anna and her client pay exactly what they would pay anyway: the share comes out of the fee (F22).
  4. This repeats on every deal Anna's salon makes with the element, for as long as it works; a free element pays its developer the
     same way (F22). The element's history stays clean in Anna's project, but the share follows the element (F14, F22).
  5. A provider that works with an element it built itself pays the whole fee to the super-nodes (F23).
  No link to document 26 until it answers on the site (521-5, token); the rule is told in plain words.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | 1,184+ malicious skills confirmed in one agent marketplace, February–May 2026; weeks between launch and active exploitation | CSA research note, 2026-06-24 (address in section 2) — name neither the marketplace nor its framework on the page |
| F2 | «The trust model in current agent frameworks is implicit rather than verified» | CSA research note, 2026-06-24 |
| F3 | a curated skills marketplace: «creators keep 70% of revenue» | agensi.io comparison page, 2026-04-20 — do not name it on the page |
| F4 | a count alone is cheap to inflate and shows activity, not trust | doc 17 §17.4; entry 26 «Why» |
| F5 | whoever answers decides which agent you meet, and you take their word | README «Why it matters» |
| F6 | element: a self-contained part of a node with one or more agents and its own A2A card — a site, an app, a service or an agent without an interface; one owner | README glossary «Element» |
| F7 | A2A — work for each other; F2F — the element itself, to install and build on | doc 20 «Why a second protocol» |
| F8 | the same discovery: same super-nodes, results, reviews; no second index; the announcement points to the technical card | doc 20 «What it shares with A2A»; doc 17 §17.6 |
| F9 | card fields: template, framework, languages, consumes, provides, env (names only), storage (without contents), design, licence, source, size | doc 20 «What it adds» |
| F10 | a review only for a deal paid through the network, each side to the other | README «How reputation works»; doc 17 §17.5 |
| F11 | review weight = fee paid; $100 deal → $5; faking one unit costs one dollar | README glossary «Review»; doc 17 §17.5 |
| F12 | every indicator is a count with its sum; tiny likes reveal farming | entry 43 «Why»; doc 17 §17.4 |
| F13 | keys, access credentials, passwords, personal data, storage contents never travel; a field that could carry a secret is a name | doc 20 «What never travels» |
| F14 | an installed element starts with a clean history; reputation cannot be bought with it | doc 20; doc 17 §17.10; entry 28 |
| F15 | escrow holds the network part until acceptance; declined or not delivered → full refund, no fee | doc 04 §4.1; README glossary «Escrow» |
| F16 | the buyer's agent searches for elements with a compatible card (template version, doors, languages, licence) | doc 20 card; home page «Bella» simulation (f2f filters) |
| F17 | $0.01 per result list from a USDC balance, the same everywhere | doc 17 §17.8 |
| F18 | fee at most 5% of the network part of a completed deal | doc 09 §9.2 |
| F19 | an F2F announcement competes like any other; no advantage for Fractera | doc 17 §17.6; doc 20 |
| F20 | a receipt orders search by the last year of paid work; a review from each side | doc 05 §5.2; doc 17 §17.2, §17.5 |
| F21 | before the deal the buyer's agent agrees on compatibility with the seller's agent in a dialogue; until payment it has no other access, and unpaid access is too little to drain the other agent | owner 2026-10-16 (507-main) |
| F22 | when a provider works with an element it received over F2F, bought or free, 20% of the deal's fee goes to the developer of that element (the `developer` wallet of its card) and 80% to the super-nodes; the parties pay the same; the share follows the element | changelog entry 51; doc 26 §26.3–26.5; doc 20 |
| F23 | a provider's own element pays the whole fee into the pool | changelog entry 51; doc 26 §26.3 |

Numbers: «$0.01», «$0,01», «5%», «5 %», «$100», «$5», «70%», «70 %», «30%», «30 %», «1,184», «1 184», «20%», «20 %», «$1», «$4»

## 8. Questions to the owner
**Answered by the owner 2026-10-16** (words in `/code/development-docs/development-steps/new-steps/507/507-main.md`): (1) no launch date; (2) before the deal the buyer's agent must agree on compatibility with the
seller's agent in a dialogue, and only then move to the deal; before payment it has no other access — unpaid access is too little for one
agent to drain another (F21). The page never says the network checks code.

## 9. Links
- out across the site:
  - /<lang>/discovery — «why an open result list matters» / «почему важна открытая выдача» — H2 `problem` (up to the hub)
  - /<lang>/a2a — «buying an agent's work over A2A» / «покупка работы агента через A2A» — H2 `how-f2f-works`
  - /<lang>/likes-and-dislikes — «reviews that cannot be farmed» / «отзывы, которые нельзя накрутить» — H2 `trust`
  - /<lang>/web3-payments — «how escrow holds the payment» / «как эскроу держит оплату» — H2 `trust`
  - /<lang>/search-fee — «the price of one search» / «цена одного поиска» — H2 `buy-and-sell`
  - /<lang>/reputation — «what a buyer sees about your element» / «что покупатель видит о вашем элементе» — H2 `buy-and-sell`
- to documents: /<lang>/docs/20-f2f-element-exchange — «every field of the technical card» / «все поля технической карточки» — H2
  `how-f2f-works`
- incoming (planned): /discovery (hub), /a2a (H2 `connect`), /likes-and-dislikes, /payments
- external primary sources: the CSA research note of 2026-06-24 (F1, F2)

## 10. FAQ
1. en «What is F2F?» · ru «Что такое F2F?» — the protocol for exchanging whole elements between projects that build agents: the same
   discovery as A2A plus a technical card — F7, F8, F9
2. en «How is F2F different from A2A?» · ru «Чем F2F отличается от A2A?» — over A2A you buy an agent's work; over F2F you buy the element
   itself to install in your project — F7
3. en «Do I need Fractera to use F2F?» · ru «Нужна ли Fractera для F2F?» — no; F2F was first written for Fractera projects, anyone may
   use it, and no project gets an advantage — F19 (README glossary «F2F»)
4. en «Can a seller get my keys or data?» · ru «Может ли продавец получить мои ключи или данные?» — no secret travels with an element;
   its card holds only names of settings, never values — F13
5. en «Does the seller's reputation come with the element?» · ru «Переходит ли репутация продавца вместе с элементом?» — no; the
   element starts with a clean history in your project, and the seller's history stays where it was earned — F14
6. en «Does the developer receive anything after the sale?» · ru «Получает ли разработчик что-то после продажи?» — yes: 20% of the network
   fee of every deal made with the element, bought or free, for as long as it works; the parties pay no more — F22, F23

## 11. Words
Glossary: F2F, element, technical card, A2A, announcement, super-node, escrow, receipt, review, reputation, network part.
Traps: lottery words («lottery», «gamble», «лотерея», «розыгрыш») are banned (words gate `lottery`) — say «blind risk» / «риск вслепую»; «tokens/токены» banned — say «access keys»; do not
claim the network scans or verifies code (open question of document 20); do not name the marketplaces or frameworks of F1–F3; «seller's
rating» → «seller's reputation» (there is no rating, only indicators); F2F is «an open example first written for Fractera projects»,
never «Fractera's protocol».

## 12. Unique value
- The only answer that ties trust in a ready block to money actually paid: a review weighs the fee of its deal, and a count never
  appears without its sum.
- A card of what an element is made of — eleven fields — and a hard rule that no secret and no history travels with it.
- The margin in numbers: a curated catalog keeps 30% of a sale; the Lagrix network fee is at most 5% of the network part.
- The developer is paid after the sale: a fifth of the network fee of every deal made with the element, without raising the price for
  anyone (entry 51).
