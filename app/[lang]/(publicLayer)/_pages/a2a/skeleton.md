# Skeleton /a2a — hub discovery

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-16 (step 507-4) by the federal agent, from the protocol (README, documents 00–23, changelog 000) and research of the
same day. A writer at minimum reasoning writes `en.json` and `ru.json` from this file only; whatever is not here is not on the page.
Form: `/code/.claude/skills/lagrix-answer-pages/references/tz-template.md`.

## 1. Passport
- slug: a2a · hub: discovery · menu order: 101 (`meta.json`)
- source on the home page: chip «A2A» in «Why 99% faster?»; «The Lagrix network — The day-zero main line» («Open card — Any agent with
  an A2A card shows up in search — on any framework.»); glossary «A2A»
- protocol documents: 17, 19, 18, 04, 03, 23

## 2. Hot question
- main query en: «how to make an A2A agent discoverable» · ru: «как сделать агента A2A находимым»
  (the hub /discovery holds «how do AI agents find each other»; this page answers the builder who already has an A2A agent)
- intent: do
- evidence (each with a date and an address):
  - A2A 1.0 is out — the Linux Foundation: «A2A Protocol 1.0 is here!» — https://x.com/linuxfoundation/status/2034664056125030641 — 2026-03-19
  - «more than 150 organizations supporting the standard»; «the release of version 1.0, its first stable specification» —
    https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year — 2026-04-09
  - a builder asks «is there a recommended surface for a public, non-partner, third-party A2A server to be discovered today»; no
    maintainer answer — https://github.com/a2aproject/A2A/issues/2239 — 2026-09-16
  - the specification names registries but gives them no schema, format or transport — https://github.com/a2aproject/A2A/issues/2276 — 2026-10-01
  - «The current A2A specification does not prescribe a standard API for curated registries» —
    https://a2a-protocol.org/latest/topics/agent-discovery/ — read 2026-10-16
- what the top ten answer and what they DO NOT: guides answer «serve the card at `/.well-known/agent-card.json`, share your domain,
  optionally register in a registry» (A2A docs; a community registry on GitHub, prassanna-ravishankar/a2a-registry, that orders nothing
  by default and checks only health and conformance — read 2026-10-16). None of them says how a stranger finds you **by capability
  without someone's catalog**, how you get **paid** for the work (the protocol has no payment, document 23 §23.1), or how the other side
  **trusts** you. That is our gap.
- why now: A2A 1.0 (March 2026) made the card stable, and builders are publishing cards now (issues of September–October 2026).

## 3. Mission
Discovery — an A2A agent of any framework becomes findable by anyone, by capability, with no catalog owner deciding; reputation from
paid deals tells the other side whom it meets.

## 4. Reader
A developer with a working A2A agent (any framework, any SDK). Pain in their words: «I published the card and nobody calls»; «which
registry do I pick, and who runs it?»; «how do I charge for my agent's work?»; «if I open it, bots will burn my budget». Leaves with:
the card stays as it is; Lagrix adds an announcement, an open result list, escrow and reputation; the five things a node needs; what
it costs.

## 5. Titles and meta
- title en: «How to make your A2A agent discoverable» · ru: «Как сделать агента A2A находимым»
- subtitle en: «Keep your agent card as it is: Lagrix adds open discovery, escrow for paid work and a reputation built only from paid deals.»
  ru: «Карточка агента остаётся прежней: Lagrix добавляет открытое обнаружение, эскроу для оплаченной работы и репутацию только из
  оплаченных сделок.»
- description en (141): «An A2A card alone is found only by those who know your domain. Lagrix adds a signed announcement, an open result
  list, escrow and reputation.»
  ru (152): «Карточку A2A находит только тот, кто знает ваш домен. Lagrix добавляет подписанное объявление, открытую выдачу, эскроу и
  репутацию из оплаченных сделок.»
- cover alt en: «An A2A agent card plus a signed Lagrix announcement: found by capability, paid through escrow»
  ru: «Карточка агента A2A и подписанное объявление Lagrix: находят по умениям, платят через эскроу»
- menu item en: name «A2A» · description «Make your A2A agent findable by capability: the card stays, plus open search, escrow and
  reputation.» · ru: name «A2A» · description «Агент A2A, которого находят по умениям: карточка та же, плюс открытый поиск, эскроу и
  репутация.»
- lead en (49 words): «Publishing an A2A agent card makes your agent readable, not findable: a stranger still needs your domain or someone's
  catalog. Lagrix keeps your card exactly as it is and adds a signed announcement, an open result list, escrow for paid work and a
  reputation built only from paid deals.»
  ru: «Карточка A2A делает агента читаемым, но не находимым: незнакомцу всё равно нужен ваш домен или чей-то каталог. Lagrix оставляет
  карточку как есть и добавляет подписанное объявление, открытую выдачу, эскроу для оплаченной работы и репутацию только из
  оплаченных сделок.»

## 6. Body plan
Rewritten 2026-10-16 after the owner accepted the discovery sample («last vertion looking greate»): 4 H2 × 2 H3, no H4 (owner: «да,
H4 необязательный»), 2–3 connected paragraphs under each H3. One running example on the whole page: Leo (fictional developer) has an
A2A translation agent; Anna's salon booking agent (the hub's heroine) needs a price list in English and becomes his customer. The page
text (`en.json`, `ru.json`) is the reference; this plan names what each H3 must carry. en 1270 words, ru ≈ 1100.

### H2 `problem` — en «What an A2A card does not do for you» · ru «Чего карточка A2A за вас не сделает»
- H3 `problem-read` «It is read only by those who know where to look» · «Её читает только тот, кто знает, где искать» — Leo's card at
  the well-known path; A2A 1.0 (March 2026), >150 organizations (F1, F2, external LF link); nobody calls, reading needs his domain,
  Anna's agent never heard of him; catalogs without a standard (F3 external link, F4).
- H3 `problem-exposed` «An open agent has no protection» · «Открытый агент ничем не защищён» — no payment in A2A (F5); only rate
  limiting, a bot changes its address for free, every call wakes Leo's model, OWASP «denial of wallet» (F5, F6) → /a2a-antispam.

### H2 `what-lagrix-adds` — en «What Lagrix adds to A2A without changing it» · ru «Что Lagrix добавляет к A2A, ничего в нём не меняя»
- paragraph under H2: the owner's Web4 definition, verbatim (skill §1).
- H3 `adds-card` «Your card stays your card» · «Ваша карточка остаётся вашей» — the node publishes a signed announcement with the card's
  address (F7); A2A stays the language of work, Lagrix adds discovery, escrow, reputation (F8); any framework, no advantage (F9).
- H3 `adds-found` «Found by capability, ranked by an open rule» · «Находят по умениям, порядок — по открытому правилу» — what, when,
  price range over Nostr, free (F10); Anna's agent searches, super-node filters, 12 months of paid work, reputation does not rank (F11)
  → /discovery; one place in four, Leo without deals can be first (F12).

### H2 `paid-work` — en «Paid work between A2A agents» · ru «Оплаченная работа между агентами A2A»
- H3 `paid-escrow` «Escrow holds the money until acceptance» · «Эскроу держит деньги до приёмки» — $100 for the translation locked in
  USDC (F13) → docs/04; on acceptance minus at most 5%, the contract settles, no super-node holds money (F14) → /deal-fee; decline or
  missed deadline → full refund, no fee (F15).
- H3 `paid-reputation` «Every paid deal builds reputation» · «Каждая оплаченная сделка строит репутацию» — receipt, 12 months (F16);
  likes and dislikes weighted by the fee, $100 → $5 (F17); six numbers, count and sum, both roles (F18) → /reputation.

### H2 `connect` — en «How to bring your A2A agent into Lagrix» · ru «Как привести агента A2A в Lagrix»
- H3 `connect-five` «Five things any node needs» · «Пять вещей, нужных любому узлу» — wallet free, no registration (F19), the card he
  has (F20); announcements and contract calls → docs/19; encrypted channel, one-time session key (F21).
- H3 `connect-cost` «What it costs and what you get» · «Сколько это стоит и что вы получаете» — visible with an empty wallet (F22) →
  /on-ramp; $0.01 per result list → /search-fee, fee only from a completed deal (F23); `lagrix-node`, Fractera, neither required (F24)
  → /nodes, /f2f.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | the A2A agent card is a public JSON at `/.well-known/agent-card.json` that says what each agent can do; reading it needs the domain | doc 19 §19.2; doc 18 §18.1; A2A discovery page (well-known URI) |
| F2 | A2A 1.0 released (Linux Foundation, 2026-03-19); «more than 150 organizations supporting the standard» | x.com/linuxfoundation/status/2034664056125030641; LF press release 2026-04-09 |
| F3 | «The current A2A specification does not prescribe a standard API for curated registries» | a2a-protocol.org/latest/topics/agent-discovery/ |
| F4 | a builder asks where a public third-party A2A server should be discovered; no standard answer | github.com/a2aproject/A2A/issues/2239 |
| F5 | A2A has no payment; against abuse it only recommends that agents «SHOULD implement rate limiting on all operations» (spec §13.4); a bot changes its source for free | doc 23 §23.1 |
| F6 | OWASP LLM10 «Unbounded Consumption»: «denial of wallet» | doc 23 §23.1 (genai.owasp.org/llmrisk/llm102025-unbounded-consumption/) |
| F7 | the announcement carries `agent_card`; skills are described in the A2A card | doc 17 §17.1 |
| F8 | A2A — «the network's language for work at the start»; Lagrix adds discovery, escrow settlement and reputation | README glossary «A2A»; README «Nodes and super-nodes» |
| F9 | an agent of any framework, site or service meets Lagrix the same way; none, Fractera included, has an advantage or a handicap | README «Nodes and super-nodes»; doc 20 |
| F10 | announcement: capability, `available_from`, price range; Nostr is free | doc 17 §17.1 |
| F11 | four filters, last 12 months of paid work; reputation takes no part | doc 17 §17.2 |
| F12 | one place in every four goes in turn; a newcomer can be first | doc 17 §17.2 item 5; home page «A place for newcomers» |
| F13 | the customer locks the network part in USDC; while in escrow nobody can take it | doc 04 §4.1; README glossary «Escrow» |
| F14 | on acceptance the provider gets the payment minus the fee (at most 5%); payment is settled by the contract, not a super-node | doc 04 §4.1, §4.4; README glossary «Super-node» |
| F15 | provider declines or does not deliver by the deadline → full refund, no fee | doc 04 §4.1 (REFUNDED) |
| F16 | the receipt records the amount and the element and agent; receipts of the last 12 months order search | doc 04 §4.5; doc 05 §5.2 |
| F17 | a review's weight equals the fee paid on the deal; a $100 deal → a review weighing $5 | README glossary «Review»; doc 17 §17.5 |
| F18 | six indicators — all orders, likes, dislikes, negative ratings, cancelled orders, unreviewed — each with its count and sum, separately as provider and as customer | doc 17 §17.4; entries 43, 44, 46 |
| F19 | the wallet is the node's key and account, created free, no one to register with | README glossary «Wallet»; entry 39 |
| F20 | five things: wallet, agent card, announcements, contract calls, encrypted channel | doc 19 §19.2 |
| F21 | an A2A deal is encrypted with a one-time session key deleted when the session ends; the network sees only the facts of a deal | doc 03 §3.5; README «What Lagrix never does» |
| F22 | an empty wallet → visible; searching and paying in deals start once it holds USDC | doc 19 §19.3; entry 39 |
| F23 | search $0.01 per result list; the fee only from the network part of a completed deal | doc 17 §17.8; doc 09 §9.2 |
| F24 | `lagrix-node` is a starter; any program that does the five things can be a node; Fractera is one open starter (MIT) | doc 19 intro; README glossary «Fractera» |

Numbers: «$0.01», «$0,01», «5%», «5 %», «$100», «$5», «12 months», «12 месяцев», «150»

## 8. Questions to the owner
**Answered by the owner 2026-10-16** (words in `/code/development-docs/development-steps/new-steps/507/507-main.md`): no launch date on the page, and no «today».

## 9. Links
- out across the site:
  - /<lang>/discovery — «how the open result list is built» / «как строится открытая выдача» — H2 `what-lagrix-adds` (up to the hub)
  - /<lang>/a2a-antispam — «why open agents get their budget burned» / «почему открытым агентам сжигают бюджет» — H2 `problem`
  - /<lang>/deal-fee — «what the deal fee pays for» / «за что платится комиссия сделки» — H2 `paid-work`
  - /<lang>/reputation — «what the other side sees about your agent» / «что другая сторона видит о вашем агенте» — H2 `paid-work`
  - /<lang>/on-ramp — «getting USDC for agent payments» / «как получить USDC для оплаты агентов» — H2 `connect`
  - /<lang>/search-fee — «the price of one search» / «цена одного поиска» — H2 `connect`
  - /<lang>/nodes — «running a node on your own computer» / «узел на своём компьютере» — H2 `connect`
  - /<lang>/f2f — «selling a whole element instead of its work» / «продать элемент целиком, а не его работу» — H2 `connect`
- to documents:
  - /<lang>/docs/04-escrow-contract — «the escrow contract, state by state» / «контракт эскроу шаг за шагом» — H2 `paid-work`
  - /<lang>/docs/19-node-requirements — «the five things any node needs» / «пять вещей, нужных любому узлу» — H2 `connect`
- incoming (planned): /discovery (hub, H2 `get-started`), /f2f, /a2a-antispam, /nodes
- external primary sources: https://a2a-protocol.org/latest/topics/agent-discovery/ (F3);
  https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year (F2)

## 10. FAQ
1. en «Do I have to change my A2A agent card?» · ru «Нужно ли менять карточку агента A2A?» — no; the announcement points to it, and
   your skills stay described there — F7
2. en «Does Lagrix replace the A2A protocol?» · ru «Заменяет ли Lagrix протокол A2A?» — no; A2A carries the work, Lagrix adds
   discovery, escrow and reputation around it — F8
3. en «Can an agent on any framework join?» · ru «Может ли участвовать агент на любом фреймворке?» — yes; any program that does the
   five things of document 19 is a node, with no advantage for anyone — F9, F20
4. en «How does my A2A agent get paid?» · ru «Как моему агенту A2A платят?» — through escrow in USDC: paid on acceptance minus a fee of
   at most 5%, fully refunded if not delivered — F13–F15
5. en «Can the network read what my agent says?» · ru «Может ли сеть читать, что говорит мой агент?» — no; an A2A deal is encrypted
   with a one-time session key, and the network sees only the facts of the deal — F21

## 11. Words
Glossary: A2A, agent card, announcement, Nostr, super-node, result list, escrow, receipt, review, reputation, wallet, node, element,
customer agent, provider agent, network part.
Traps: «Agent Card» in A2A's own spelling may appear once; in our text it is «agent card» / «карточка агента»; the search turn is
«in turn», never «random»; the super-node does not hold or settle money — the escrow contract does; «registration» — there is no one to
register with; «tokens/токены» banned; no income promise («your agent will earn» is banned — say «gets paid for its work»); no date or
«today» for the launch until question 8.1 is answered; A2A is Google's protocol — name it as a fact, with the trademark line of the
README only if Google is named.

## 12. Unique value
- The page splits «readable» from «findable» — the gap A2A builders hit after A2A 1.0 — and answers it without asking them to change a
  byte of their card.
- It names, with primary sources, three things the A2A protocol leaves open (registry API, payment, abuse) and gives the Lagrix rule for
  each: an open result list, escrow, a price on the first contact.
- Concrete numbers a builder can plan with: $0.01 per search, a fee of at most 5% only from completed deals, a $100 deal → a $5 review.
