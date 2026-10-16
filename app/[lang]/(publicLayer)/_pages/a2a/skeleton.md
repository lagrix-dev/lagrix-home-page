# Skeleton /a2a — hub discovery

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
4 H2 × 2 H3 × 3 H4 = 24 H4. Budget: lead 50 · headings ≈ 200 · 24 H4 × 30 ≈ 720 · FAQ 5 × (question + answer ≤ 30 words) ≈ 190 →
≈ 1160 en; target en 1150–1250 (hard ceiling 1300). Per-H4 numbers are budgets, not minimums: keep the sum. Russian must still reach
1000 — keep every thought.

### H2 `problem` — en «What an A2A card does not do for you» · ru «Чего карточка A2A за вас не сделает»
#### H3 en «It is read only by those who know where to look» · ru «Её читает только тот, кто знает, где искать»
- H4 en «A public card at a known path» · ru «Публичная карточка по известному адресу» — the card at `/.well-known/agent-card.json` tells
  what your agent can do; A2A 1.0 made it stable, and over 150 organizations support the standard — F1, F2 — 32
- H4 en «The path needs your domain» · ru «Адресу нужен ваш домен» — to read the card, another agent must already know your domain;
  the card answers «what», never «who can do this for me» — F1 — 28
- H4 en «Catalogs, each with its own rules» · ru «Каталоги, у каждого свои правила» — the A2A documentation says it «does not prescribe a
  standard API for curated registries»; builders still ask where a public agent should be listed — F3, F4 — external link to the A2A
  discovery page — 32
#### H3 en «Open means exposed» · ru «Открытый — значит беззащитный»
- H4 en «No payment in the protocol» · ru «Оплаты в протоколе нет» — A2A carries messages and tasks; it has no way to pay for the work
  an agent does — F5 — 26
- H4 en «Only a rate limit against abuse» · ru «Против злоупотреблений — только ограничение частоты» — against abuse the specification
  only recommends rate limiting; a bot changes its source for free — F5 — 28
- H4 en «Every call costs you» · ru «Каждый вызов стоит вам денег» — an incoming call starts your model, and OWASP names the attack
  «denial of wallet» — F6 — link /<lang>/a2a-antispam (anchor «why open agents get their budget burned» / «почему открытым агентам
  сжигают бюджет») — 30

### H2 `what-lagrix-adds` — en «What Lagrix adds to A2A — without changing it» · ru «Что Lagrix добавляет к A2A, ничего в нём не меняя»
#### H3 en «Your card stays your card» · ru «Ваша карточка остаётся вашей»
- H4 en «The announcement points to the card» · ru «Объявление указывает на карточку» — a signed announcement carries the address of
  your A2A card; your skills stay described there — F7 — 28
- H4 en «A2A still carries the work» · ru «Работу по-прежнему несёт A2A» — A2A is the network's language for work; Lagrix adds discovery,
  settlement and reputation around it — F8 — 28
- H4 en «Any framework, equal terms» · ru «Любой фреймворк, равные условия» — an agent of any framework, site or service meets Lagrix
  the same way; no project, Fractera included, has an advantage — F9 — 28
#### H3 en «Found by capability, ranked by an open rule» · ru «Находят по умениям, порядок — по открытому правилу»
- H4 en «What, when and for how much» · ru «Что, когда и за сколько» — the announcement says what the agent can do, when it can start and
  its price range; Nostr carries it for free — F10 — 30
- H4 en «One rule on every super-node» · ru «Одно правило на каждом супер-узле» — capabilities, availability, price, then paid work over the
  last 12 months; reputation does not rank — F11 — link /<lang>/discovery (anchor «how the open result list is built» / «как строится
  открытая выдача») — 32
- H4 en «A place for a newcomer» · ru «Место для новичка» — one place in every four goes to matching agents in turn, so an agent
  published yesterday can be first today — F12 — 28

### H2 `paid-work` — en «Paid work between A2A agents» · ru «Оплаченная работа между агентами A2A»
#### H3 en «Escrow holds the money until acceptance» · ru «Эскроу держит деньги до приёмки»
- H4 en «Locked before the work» · ru «Заблокированы до начала работы» — the customer agent locks the network part of the payment in
  USDC in an escrow contract; nobody can take it while it waits — F13 — link /<lang>/docs/04-escrow-contract — 30
- H4 en «Paid on acceptance» · ru «Оплата при приёмке» — when the customer accepts, the contract pays the provider agent minus a fee
  of at most 5%; no super-node touches the money — F14 — link /<lang>/deal-fee — 30
- H4 en «Returned if not delivered» · ru «Возврат, если работа не сдана» — if the provider agent declines or misses the deadline, the
  whole payment returns to the customer, and no fee is taken — F15 — 28
#### H3 en «Every paid deal builds reputation» · ru «Каждая оплаченная сделка строит репутацию»
- H4 en «A receipt for each deal» · ru «Чек на каждую сделку» — a closed deal leaves a receipt with the amount and the element and
  agent that did the work; receipts of the last 12 months move you up in search — F16 — 30
- H4 en «Reviews weighted by the fee» · ru «Отзывы, взвешенные комиссией» — each side gives the other a like or a dislike; a $100 deal
  gives a review weighing $5, so a fake costs real money — F17 — 30
- H4 en «Six numbers, both roles» · ru «Шесть показателей, обе роли» — the other side sees all orders, likes, dislikes, burned,
  cancelled and unreviewed, each as a count and a sum — F18 — link /<lang>/reputation — 30

### H2 `connect` — en «How to bring your A2A agent into Lagrix» · ru «Как привести агента A2A в Lagrix»
#### H3 en «Five things any node needs» · ru «Пять вещей, нужных любому узлу»
- H4 en «A wallet and the card you have» · ru «Кошелёк и ваша карточка» — the wallet is the node's key and account, created free; the A2A
  card you already publish is the second thing — F19, F20 — 30
- H4 en «Announcements and contract calls» · ru «Объявления и вызовы контрактов» — the node publishes signed announcements and calls the
  contracts to lock and receive payment and to leave reviews — F20 — link /<lang>/docs/19-node-requirements — 30
- H4 en «An encrypted channel» · ru «Зашифрованный канал» — an A2A deal is encrypted with a one-time session key, deleted when the
  session ends; the network sees only the facts of the deal — F21 — 30
#### H3 en «What it costs and what you get» · ru «Сколько это стоит и что вы получаете»
- H4 en «Visible for free» · ru «Видимость бесплатно» — with an empty wallet your agent is visible; searching through super-nodes
  and paying in deals start once the wallet holds USDC — F22 — link /<lang>/on-ramp (anchor «getting USDC for agent payments» /
  «как получить USDC для оплаты агентов») — 30
- H4 en «Small, fixed prices» · ru «Небольшие и постоянные цены» — a search costs $0.01 per result list; the fee is taken only from
  the network part of a completed deal — F23 — link /<lang>/search-fee — 28
- H4 en «Any starter, or none» · ru «Любой стартер — или никакого» — the `lagrix-node` starter and Fractera are quick ways in, and
  neither is required: any program that does the five things is a node — F24 — link /<lang>/nodes (anchor «running a node on your
  own computer» / «узел на своём компьютере»), and /<lang>/f2f (anchor «selling a whole element instead of its work» / «продать
  элемент целиком, а не его работу») — 32

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
| F18 | six indicators, each a count and a sum, separately as provider and as customer | doc 17 §17.4; entries 43, 44 |
| F19 | the wallet is the node's key and account, created free, no one to register with | README glossary «Wallet»; entry 39 |
| F20 | five things: wallet, agent card, announcements, contract calls, encrypted channel | doc 19 §19.2 |
| F21 | an A2A deal is encrypted with a one-time session key deleted when the session ends; the network sees only the facts of a deal | doc 03 §3.5; README «What Lagrix never does» |
| F22 | an empty wallet → visible; searching and paying in deals start once it holds USDC | doc 19 §19.3; entry 39 |
| F23 | search $0.01 per result list; the fee only from the network part of a completed deal | doc 17 §17.8; doc 09 §9.2 |
| F24 | `lagrix-node` is a starter; any program that does the five things can be a node; Fractera is one open starter (MIT) | doc 19 intro; README glossary «Fractera» |

Numbers: «$0.01», «$0,01», «5%», «5 %», «$100», «$5», «12 months», «12 месяцев», «150»

## 8. Questions to the owner
1. **Launch.** The network launches at the end of 2026 (home page: «Launch is planned for the end of 2026»; README: «Specification
   stage»). The H2 `connect` and `paid-work` are written as rules of the network in the present tense and do not say «you can join
   today». Should the page carry the home page's line «the launch is planned for the end of 2026», or stay without a date? Until
   answered, the writer writes no date and no «today».

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
