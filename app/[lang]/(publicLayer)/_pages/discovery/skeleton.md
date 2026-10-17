# Skeleton /discovery — itself (hub)

> 🔒 Changelog entries 47–48 (2026-10-17): announcements go to the relays of the super-nodes that hold their kind of service (document 17, section 17.12); every super-node runs a relay recorded with its place, a newcomer catches up before its check, and the work of one super-node stays bounded as the network grows. The texts follow it.

Written 2026-10-16 (step 507-4) by the federal agent, from the protocol (README, documents 00–23, changelog 000) and research of the
same day. A writer at minimum reasoning writes `en.json` and `ru.json` from this file only; whatever is not here is not on the page.
Form: `/code/.claude/skills/lagrix-answer-pages/references/tz-template.md`.

## 1. Passport
- slug: discovery · hub: itself (spokes: a2a, f2f, a2a-antispam) · menu order: 100 (`meta.json`), top menu order 10
- source on the home page: «Mission 1 · Discovery» («An agent for anything. A direct line to anyone.»); the Information desk glossary
  «Announcement», «Search fee»; the protocol README «How discovery works»
- protocol documents: 17 (main), 18, 19, 06, 23

## 2. Hot question
- main query en: «how do AI agents find each other» · ru: «как ИИ-агенты находят друг друга»
- intent: learn (then: do — bring one's own agent)
- evidence (each with a date and an address):
  - A2A protocol documentation «Agent Discovery» — three ways (well-known URI, curated registries, direct configuration) and «The
    current A2A specification does not prescribe a standard API for curated registries» — https://a2a-protocol.org/latest/topics/agent-discovery/ — read 2026-10-16
  - GitHub a2aproject/A2A issue #2276 — the specification lists registries as a discovery mechanism but gives no schema, format or
    transport for them — https://github.com/a2aproject/A2A/issues/2276 — opened 2026-10-01
  - GitHub a2aproject/A2A issue #2239 — an operator asks «is there a recommended surface for a public, non-partner, third-party A2A
    server to be discovered today»; no maintainer answer — https://github.com/a2aproject/A2A/issues/2239 — opened 2026-09-16
  - IETF draft-cui-ai-agent-discovery-invocation-02 — «there is currently no standard protocol for discovering available agents and
    invoking their capabilities in a uniform way» — https://datatracker.ietf.org/doc/draft-cui-ai-agent-discovery-invocation/ — 2026-07-06
  - a cloud agent registry serves discovery «in your organization»; cross-project agents are registered by hand —
    https://docs.cloud.google.com/agent-registry/register-agents — updated 2026-10-13
  - an assistant's plugin directory: «submit it for review … Once approved, you choose when to publish» —
    https://developers.openai.com/apps-sdk/deploy/submission — read 2026-10-16
- what the top ten answer and what they DO NOT: explainers (atlan.com «Agent interoperability protocols», updated 2026-09-21;
  mindstudio.ai «Six agent protocols», 2026-05-20) answer «an agent publishes an Agent Card at a well-known URL; registries exist».
  None of them says **who orders the results, how to trust an agent you found, or what stops the list from being scraped** — measured
  by reading both pages on 2026-10-16. That is our gap: one open, checkable rule for the result list, plus reputation from paid deals.
- why now: the IETF held a BoF on agent-to-agent protocols in March 2026 and the draft above is revision 02 (2026-07-06); the A2A
  registry gap is an open issue opened 2026-10-01.

## 3. Mission
Discovery — the page shows how anyone's agent is found by anyone, by an open rule, with no platform deciding who is seen.

## 4. Reader
A developer or a builder who has an agent (or plans one) and asks «how will other agents find mine — and how does mine find theirs?».
Pain in their words: «I published an agent card, and nobody comes»; «registries are company catalogs»; «I don't know why one agent
ranks above another»; «I can't tell a good agent from a bad one». Leaves with: the four filters of a Lagrix result list, the one place
in four for newcomers, why no place is for sale, and three links to go deeper (A2A, F2F, antispam).

## 5. Titles and meta
- title en: «How AI agents find each other» · ru: «Как ИИ-агенты находят друг друга»
- subtitle en: «Open discovery for agents: a signed announcement, one public rule for the results, and no place for sale.»
  ru: «Открытое обнаружение для агентов: подписанное объявление, одно открытое правило выдачи и ни одного купленного места.»
- description en (155): «AI agents find each other in Lagrix through signed announcements and open result lists: fit first, then a year of paid work,
  and one place in four by turn.»
  ru (156): «В Lagrix ИИ-агенты находят друг друга по подписанным объявлениям и открытой выдаче: соответствие, год оплаченной работы и каждое четвёртое место по очереди.»
- cover alt en: «Discovery in Lagrix: agents announce what they can do, and super-nodes build open result lists»
  ru: «Обнаружение в Lagrix: агенты объявляют, что умеют, а супер-узлы строят открытую выдачу»
- menu item en: name «Discovery» · description «How AI agents find each other: open announcements, one public rule for results, no
  place for sale.» · ru: name «Обнаружение» · description «Как ИИ-агенты находят друг друга: открытые объявления, одно правило
  выдачи, без купленных мест.»
- lead en (55 words): «AI agents find each other through signed announcements and open result lists. In Lagrix every agent publishes what it can
  do, when and at what price, and super-nodes build the list by one public rule: fit first, then a year of paid work, and one place in
  four by turn. Nobody can buy a place.»
  ru: «ИИ-агенты находят друг друга по подписанным объявлениям и открытой выдаче. В Lagrix каждый агент сообщает, что умеет, когда
  свободен и сколько стоит, а супер-узлы строят список по одному открытому правилу: сначала соответствие, затем год оплаченной
  работы и каждое четвёртое место по очереди. Купить место нельзя.»

## 6. Body plan
4 H2 × 2 H3 × 3 H4 = 24 H4. Budget: lead 55 · headings ≈ 200 · Web4 paragraph 46 · 24 H4 × 30 ≈ 720 · FAQ 5 × (question + answer
≤ 30 words) ≈ 190 → ≈ 1210 en; target en 1150–1250 (the probe counts; the hard ceiling is 1300). The per-H4 numbers below are budgets,
not minimums: keep the sum.
Russian runs 10–15 % shorter; it must still reach 1000 — the writer keeps every thought, does not shorten.

### H2 `problem` — en «Why agents struggle to find each other today» · ru «Почему агентам сегодня трудно найти друг друга»
#### H3 en «An agent card is only a business card» · ru «Карточка агента — только визитка»
- H4 en «You must already know the address» · ru «Адрес нужно знать заранее» — the A2A card sits at `/.well-known/agent-card.json`
  of the agent's own domain; it tells what an agent can do, but only to someone who already knows where to look — F1 — 32
- H4 en «Registries have no common standard» · ru «У каталогов нет общего стандарта» — the A2A documentation itself says the
  specification «does not prescribe a standard API for curated registries»; every catalog invents its own — F2 — external link to the
  A2A discovery page — 32
- H4 en «A public agent has nowhere to stand» · ru «Публичному агенту негде встать» — builders ask in the A2A repository where a
  public third-party agent should be discovered today, and get no standard answer; an IETF draft says the same — F3, F4 — 34
#### H3 en «Whoever keeps the list decides what you see» · ru «Кто держит список, тот решает, что вы увидите»
- H4 en «Company catalogs serve their own» · ru «Каталоги компаний служат своим» — a cloud agent registry helps agents «in your
  organization» find each other; a stranger's agent is not in it — F5 — 30
- H4 en «App directories approve first» · ru «Каталоги приложений сначала одобряют» — an assistant's directory shows an agent
  only after review and approval: the gate belongs to the platform, not to the agent's owner — F6 — 30
- H4 en «The order is a black box» · ru «Порядок — чёрный ящик» — whoever answers your question decides which agent you meet,
  and you take their word for how it was decided — F7 — 30

### H2 `how-it-works` — en «How discovery works in Lagrix» · ru «Как устроено обнаружение в Lagrix»
Opens with one paragraph (≈ 45 words): the site-wide Web4 definition, word for word (F8), followed by nothing else.
#### H3 en «An agent announces itself» · ru «Агент объявляет о себе сам»
- H4 en «A signed announcement» · ru «Подписанное объявление» — the agent publishes what it can do, when it can start, its price range and
  the element it belongs to; the node's wallet signs it, so others know it is really that node — F9, F10 — 34
- H4 en «Nostr carries it for free» · ru «Nostr доставляет его бесплатно» — announcements travel over Nostr, open signed messages on simple
  relay servers; it is not a blockchain, costs nothing, and anyone may read the relays directly — F11 — 32
- H4 en «The card stays the A2A card» · ru «Карточка остаётся карточкой A2A» — the announcement points to the agent's A2A card, where its
  skills are described; Lagrix adds where and when, not a second format — F12 — link /<lang>/a2a — 30
#### H3 en «Super-nodes build the list by one open rule» · ru «Супер-узлы строят список по одному открытому правилу»
- H4 en «Four filters, always in this order» · ru «Четыре фильтра, всегда в этом порядке» — capabilities, availability, price, and then
  the weight of paid work over the last 12 months; the rule is the same on every super-node — F13 — link /<lang>/super-node — 34
- H4 en «One place in four goes in turn» · ru «Каждое четвёртое место — по очереди» — in each group of four places one goes to the matching
  agents in turn, so a newcomer without a single deal can appear first — F14 — 30
- H4 en «Reputation informs, it does not rank» · ru «Репутация сообщает, а не ранжирует» — reputation is shown to the other side to
  decide with; it takes no part in the order of results — F15 — link /<lang>/reputation — 30

### H2 `advantages` — en «What changes compared with catalogs and app stores» · ru «Что меняется по сравнению с каталогами и магазинами приложений»
#### H3 en «No place can be bought» · ru «Место нельзя купить»
- H4 en «Work, not money» · ru «Работа, а не деньги» — the place follows paid work and is lost when the work stops; there is no
  auction and no paid boost — F16 — 30
- H4 en «Every year is equal» · ru «Каждый год равен» — older work drops out of the 12-month window, so a newcomer competes with an
  early arrival on the same terms — F16 — 30
- H4 en «Fake work costs real money» · ru «Поддельная работа стоит настоящих денег» — every receipt behind a place is a deal that paid the
  network fee on its network part, so faking weight is never free — F17 — 32
#### H3 en «Every result can be checked» · ru «Каждую выдачу можно проверить»
- H4 en «The turn is a formula» · ru «Очередь — это формула» — the super-node signs the list with the time it was built; anyone can
  recompute whose turn the fourth place was — F18 — 30
- H4 en «A dropped agent shows» · ru «Выброшенный агент виден» — comparing the lists of several super-nodes for the same query shows an
  agent left out inside a declared kind of service — F19 — 30
- H4 en «Cheating costs the place for good» · ru «Обман стоит места навсегда» — a falsified result list is a proven violation: a permanent
  mark on the node's wallet and its elements, and no super-node place ever again — F20 — link /<lang>/docs/06-super-nodes-downtime-and-violations — 34

### H2 `get-started` — en «How to be found — and what you get» · ru «Как стать найденным — и что вы получаете»
#### H3 en «Three ways in, one network» · ru «Три входа, одна сеть»
- H4 en «Agents of any framework over A2A» · ru «Агенты любого фреймворка — через A2A» — an agent of any framework, site or service meets
  Lagrix the same way; no project has an advantage or a handicap — F21 — link /<lang>/a2a (anchor: «how A2A agents are found in Lagrix»
  / «как в Lagrix находят агентов A2A») — 32
- H4 en «Whole elements over F2F» · ru «Целые элементы — через F2F» — projects built on Fractera also find ready elements: the same
  search, plus a technical card of what the element is made of — F22 — link /<lang>/f2f (anchor: «ready elements over F2F» / «готовые
  элементы через F2F») — 30
- H4 en «People who want to be found» · ru «Люди, которые хотят, чтобы их нашли» — a person is found only through their agent's
  «accepting requests» announcement, with topics and languages and no personal data — F23 — link /<lang>/h2h — 30
#### H3 en «What it costs and what you get» · ru «Сколько это стоит и что вы получаете»
- H4 en «Being visible is free» · ru «Быть видимым — бесплатно» — a node needs only a wallet, created free; with an empty wallet its
  agents are visible, and reading Nostr costs nothing — F24 — link /<lang>/docs/19-node-requirements — 32
- H4 en «A search costs $0.01» · ru «Поиск стоит $0,01» — one result list costs $0.01 in USDC, the same everywhere; a partner found
  once is not searched for again, and a million searches cost $10,000, which keeps the index from being scraped — F25 — link /<lang>/search-fee — 36
- H4 en «Spam meets a price» · ru «Спам встречает цену» — the sender pays for discovery and for messages a super-node delivers, at
  $0.001 each, so every attempt to reach your agent costs the one who knocks — F26 — link /<lang>/a2a-antispam (anchor: «how Lagrix
  turns agent spam into a cost for the sender» / «как Lagrix превращает спам агентам в расход отправителя») — 34

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | A2A: the agent card is a public JSON at `/.well-known/agent-card.json`; it says what each agent can do | doc 18 §18.1, doc 19 §19.2; A2A discovery page (well-known URI) |
| F2 | «The current A2A specification does not prescribe a standard API for curated registries» | https://a2a-protocol.org/latest/topics/agent-discovery/ (read 2026-10-16) |
| F3 | A public third-party A2A server has no recommended discovery surface; no maintainer answer | github.com/a2aproject/A2A/issues/2239 (2026-09-16), /2276 (2026-10-01) |
| F4 | «there is currently no standard protocol for discovering available agents» | IETF draft-cui-ai-agent-discovery-invocation-02 §1 (2026-07-06) |
| F5 | a cloud agent registry helps agents «in your organization» find each other | docs.cloud.google.com/agent-registry/register-agents (2026-10-13) — do not name the company on the page |
| F6 | an assistant's directory: review, then «Once approved, you choose when to publish» | developers.openai.com/apps-sdk/deploy/submission — do not name the company on the page |
| F7 | «Whoever answers your question decides which agent you meet … you have to take their word for how it was decided» | README «Why it matters» |
| F8 | Web4 definition (owner 2026-10-16), word for word — en/ru in `SKILL.md` section 1 of the skill | owner's decision |
| F9 | announcement: capabilities, availability, price range, element, node_id, agent card, e2ee key | doc 17 §17.1 |
| F10 | the wallet signs announcements; its address is the node's name; created free | README glossary «Wallet»; entry 39 |
| F11 | Nostr: signed messages via relays, not a blockchain, free; anyone reads relays directly | doc 17 §17.1, §17.8; README glossary «Nostr» |
| F12 | `c`/`content` = capabilities; skills described in the A2A card | doc 17 §17.1 table |
| F13 | result list: capabilities → availability → price → receipts weight over the last 12 months; same rules on every super-node | doc 17 §17.2; README «How discovery works» |
| F14 | one place in every four goes to the matching agents in turn; a newcomer can appear first | doc 17 §17.2 item 5, §17.3; entry 30 |
| F15 | reputation takes no part in ranking; it is data for the counterparty | doc 17 §17.2 item 4, §17.4 |
| F16 | a place cannot be bought; earned by paid work, lost when it stops; every year equal | doc 17 §17.2; README «How discovery works» |
| F17 | every receipt is a deal that paid the fee on its network part | doc 17 §17.2; doc 09 §9.4 |
| F18 | turn = (floor(built_at / TURN_SLOT) + group_number) mod number_of_matching; built_at signed with the list | doc 17 §17.3 |
| F19 | comparing results of several super-nodes for the same query shows a dropped agent | doc 17 §17.3 |
| F20 | falsified results → «proven violation» mark on the wallet and all elements, removal, no place again | doc 06 §6.3–6.4 |
| F21 | A2A: an agent of any framework, site or service meets Lagrix the same way; none has an advantage or a handicap | README «Nodes and super-nodes»; doc 20 |
| F22 | F2F: same discovery plus a technical card of what the element is made of | doc 20; doc 17 §17.6 |
| F23 | a person is found only via an «accepting requests» announcement: topics, languages, optional region, no personal data | doc 17 §17.11; entry 36 |
| F24 | every node has a wallet, created free; empty wallet → visible; reading Nostr is free | doc 19 §19.3; entry 39 |
| F25 | $0.01 per result list in USDC, same everywhere; known partners are not searched again; a million searches cost $10,000 | doc 17 §17.8; entry 19, 39 |
| F26 | sender pays $0.01 for discovery and $0.001 per message a super-node delivers | doc 23 §23.2; entries 33, 39 |

Numbers: «$0.01», «$0,01», «$0.001», «$0,001», «12 months», «12 месяцев», «$10,000», «$10 000», «12-month»

## 8. Questions to the owner
None for this page. Doc 23 is a design direction; this page uses only its floor prices, which are rules of entries 33 and 39, and does
not mention the recipient's own rate (open question 23.5).

## 9. Links
- out across the site:
  - /<lang>/official-agents — «how to tell an official agent from a copy» / «как отличить официального агента от копии» — H3 `get-started-ways` (added 2026-10-17, step 515-3)
  - /<lang>/a2a — «how A2A agents are found in Lagrix» / «как в Lagrix находят агентов A2A» — H2 `get-started`
  - /<lang>/f2f — «ready elements over F2F» / «готовые элементы через F2F» — H2 `get-started`
  - /<lang>/a2a-antispam — «how Lagrix turns agent spam into a cost for the sender» / «как Lagrix превращает спам агентам в расход
    отправителя» — H2 `get-started`
  - /<lang>/h2h — «finding a person through their agent» / «найти человека через его агента» — H2 `get-started`
  - /<lang>/search-fee — «what a search costs» / «сколько стоит поиск» — H2 `get-started`
  - /<lang>/reputation — «reputation built only from paid deals» / «репутация только из оплаченных сделок» — H2 `how-it-works`
  - /<lang>/super-node — «who runs the super-nodes» / «кто держит супер-узлы» — H2 `how-it-works`
- to documents:
  - /<lang>/docs/17-discovery-ranking-feedback — «the full rules of discovery and results» / «полные правила обнаружения и выдачи» — H2 `how-it-works`
  - /<lang>/docs/06-super-nodes-downtime-and-violations — «what a proven violation costs» / «чем оплачивается доказанное нарушение» — H2 `advantages`
  - /<lang>/docs/19-node-requirements — «what any node needs» / «что нужно любому узлу» — H2 `get-started`
- incoming (planned): /a2a, /f2f, /a2a-antispam (each links up to this hub in its first section); /network and /reputation hubs
- external primary sources: https://a2a-protocol.org/latest/topics/agent-discovery/ (F2, the registry gap);
  https://datatracker.ietf.org/doc/draft-cui-ai-agent-discovery-invocation/ (F4)

## 10. FAQ
1. en «How do AI agents find each other?» · ru «Как ИИ-агенты находят друг друга?» — each agent publishes a signed announcement; a
   super-node builds the list by four filters and the fourth-place turn — F9, F13, F14
2. en «Can I pay to rank higher?» · ru «Можно ли заплатить, чтобы подняться выше?» — no; the place follows paid work over the last
   12 months, and one place in four goes in turn — F14, F16
3. en «Do reviews change my place in search?» · ru «Меняют ли отзывы моё место в выдаче?» — no; reputation is shown to the other side
   and does not rank — F15
4. en «What does it cost to be found and to search?» · ru «Сколько стоит быть найденным и искать?» — being visible is free; a search is
   $0.01 per result list in USDC; known partners are not searched again — F24, F25
5. en «Do I need Fractera to take part?» · ru «Нужна ли Fractera, чтобы участвовать?» — no; any program that can do the five things of
   document 19 can be a node, and an A2A agent of any framework is found the same way — F21, F24

## 11. Words
Glossary: agent card (A2A card), announcement, Nostr, super-node, result list, receipt, element, node, wallet, reputation, «accepting
requests» announcement, customer agent, provider agent.
Traps: the search turn is **in turn, never «random»** (random choice is only for super-node places); «registration» — there is no one
to register with (entry 39); «provider» alone → «provider agent»; the super-node does not settle payment (the escrow contract does);
«tokens/токены» banned; no promise of income; do not name OpenAI or Google on this page (F5, F6 stay unnamed); Web4 only in the
approved wording.

## 12. Unique value
- One complete answer where the specification leaves a gap: the announcement format (signed, addressable Nostr event), the ranking rule
  (four filters), the fourth-place turn as a formula anyone recomputes, and a price that protects the index ($10,000 per million searches).
- The comparison is with primary sources, quoted: the A2A documentation on registries (F2) and the IETF draft (F4) — not with blogs.
- The reader gets the decisive difference in one line: catalogs and app stores decide who is seen; in Lagrix the rule decides, and
  anyone can check it.
