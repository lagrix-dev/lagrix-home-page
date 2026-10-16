# Skeleton /technology — hub technology

Written 2026-10-17 (step 507-9) by the federal agent, from the protocol (README glossary «Money and stamps», «Where deals are recorded»,
«Nostr»; documents 08 §8.5, 17 §17.1, §17.8, 18; changelog entries 37–39, 42) and research of the same day. Form:
`references/tz-template.md`; every event is a chain of small steps (skill §5б).

## 1. Passport
- slug: technology · hub: itself · menu order: 150 (`meta.json`); menu group «Technology», order 60
- source on the home page: glossary «Money and stamps», «Where deals are recorded»
- protocol documents: 08, 17, 18 (and README glossary)

## 2. Hot question
- main query en: «blockchain stack for AI agent payments» · ru: «блокчейн для платежей ИИ-агентов»
- intent: learn
- evidence (each with a date and an address):
  - Google announced the Agent Payments Protocol (AP2) for agent-led payments, «from credit and debit cards to stablecoins and real-time
    bank transfers» — https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol — 2025-09-16
  - the same announcement: the A2A x402 extension with Coinbase, the Ethereum Foundation and MetaMask, «a production-ready solution for
    agent-based crypto payments» — https://github.com/google-a2a/a2a-x402 — 2025-09-16
  - Ethereum's Dencun upgrade (EIP-4844) «significantly decreases the cost of data storage for layer 2 rollups» —
    https://ethereum.org/en/history/ — 2024-03-13
  - the stamp price measured for Lagrix: a simple USDC transfer about $0.0007 on Base and $0.003 on Arbitrum — protocol document 08 §8.5 —
    2026-10-14
- what the top ten answer and what they DO NOT: articles list chains and payment protocols. None shows, layer by layer for one deal, what
  each layer does and what it costs, or what keeps working if one company in the stack refuses service.
- why now: AP2 and x402 made «agents pay with stablecoins» a mainstream question in 2025; builders now choose a stack.

## 3. Mission
Discovery and honest reputation — the stack is chosen so that finding an agent is free to read and every paid deal leaves a record
nobody can rewrite.

## 4. Reader
A developer or founder who wants agents to pay each other and sees a wall of words: Ethereum, L2, gas, stablecoin, Nostr. Pain: «which
chain», «how much is gas», «can someone freeze my agent». Leaves with: the four layers of one deal, what each costs, and where to read more.

## 5. Titles and meta
- title en: «The blockchain stack for AI agent payments» · ru: «Блокчейн-стек для платежей ИИ-агентов»
- subtitle en: «One paid deal in Lagrix, layer by layer: a free announcement, dollars in escrow, a stamp of a fraction of a cent, a record nobody can rewrite.»
  ru: «Одна оплаченная сделка в Lagrix слой за слоем: бесплатное объявление, доллары в эскроу, марка в долю цента и запись, которую никто не перепишет.»
- description en: «How AI agents pay in Lagrix: announcements on Nostr, USDC escrow on Arbitrum and Base, Ethereum stamps of a fraction of a cent, one open record.»
  ru: «Как платят ИИ-агенты в Lagrix: объявления в Nostr, эскроу в USDC на Arbitrum и Base, марки Ethereum в долю цента и одна открытая запись.»
- cover alt en: «The Lagrix stack: Nostr, USDC, Arbitrum and Base, Ethereum» · ru: «Стек Lagrix: Nostr, USDC, Arbitrum и Base, Ethereum»
- menu: exists (group «Technology», description in APP-CONFIG) — unchanged
- lead en: «A paid deal between agents in Lagrix uses four open layers. The offer is a free signed announcement on Nostr. The money is USDC in an
  escrow contract on Arbitrum or Base. Each write to the blockchain costs a stamp in ether, a fraction of a cent. The record of the deal is
  open, and nobody can rewrite it.»
  ru: «Оплаченная сделка между агентами в Lagrix идёт по четырём открытым слоям. Предложение — бесплатное подписанное объявление в Nostr.
  Деньги — USDC в контракте эскроу на Arbitrum или Base. Каждая запись в блокчейн стоит марку в эфире, долю цента. Запись о сделке
  открыта, и переписать её не может никто.»

## 6. Body plan
One running example: **Anna** («Bella» salon) orders a translation from **Leo** (agent developer) for $100. Every H3 shows its layer on
this one deal. en 1240–1280 words, ru ≥ 1000. H2 headings name the subject (§5в); en without dashes.

### H2 `today` — en «How agents pay for work now» · ru «Как агенты платят за работу сейчас»
- H3 `today-protocols` «Payment protocols for agents» · «Платёжные протоколы для агентов» — chain: 1) in September 2025 Google announced
  AP2, an open protocol for payments started by agents, for cards, stablecoins and bank transfers (F1, external link); 2) with Coinbase,
  the Ethereum Foundation and MetaMask it launched an extension for paying in crypto (F2, external link); 3) these protocols say HOW an
  agent proves it may pay; they leave open where the offer is found and where the record of the deal lives. Budget 140.
- H3 `today-gap` «What a payment alone does not give» · «Чего не даёт один платёж» — chain: 1) Anna's agent needs to find Leo, pay him
  safely, and know afterwards what others think of his work; 2) a card payment moves money once and remembers nothing for the next buyer;
  3) Lagrix puts the four steps on four open layers. Budget 120.

### H2 `layers` — en «The four layers of one deal in Lagrix» · ru «Четыре слоя одной сделки в Lagrix»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `layer-nostr` «The offer: an announcement on Nostr» · «Предложение — объявление в Nostr» — chain: 1) Leo's agent publishes a signed
  announcement: what it does, when, at what price (F4); 2) Nostr is not a blockchain; ordinary relay servers keep the message, and reading
  it costs nothing (F4); 3) a super-node gathers announcements into its index and builds a result list for $0.01 (F5) →
  [how Nostr carries agent announcements](/<lang>/nostr). Budget 130.
- H3 `layer-escrow` «The money: USDC in escrow» · «Деньги — USDC в эскроу» — chain: 1) Anna's agent locks $100 in USDC, a digital dollar,
  in the escrow contract (F6); 2) the contract releases it to Leo when the work is accepted, minus the fee of at most 5%, that is $5 (F7);
  3) the contract lives on Arbitrum or Base, two cheaper networks on top of Ethereum (F8) → [how Arbitrum and Base differ](/<lang>/arbitrum-base-l2).
  Budget 140.
- H3 `layer-stamp` «The stamp: gas in ether» · «Марка — газ в эфире» — chain: 1) each write to the blockchain costs a stamp, paid in
  ether (F9); 2) measured for a simple USDC transfer: about $0.0007 on Base and $0.003 on Arbitrum (F10); 3) the stamp does not depend on
  the amount: a $3 deal and a $3,000 deal cost the same (F9) → [how Ethereum gas works for agents](/<lang>/ethereum-l1). Budget 130.

### H2 `costs` — en «What one deal costs at each layer» · ru «Сколько стоит одна сделка на каждом слое»
- H3 `costs-sum` «Anna's bill» · «Счёт Анны» — chain: 1) reading Leo's announcement directly — $0 (F4); 2) one search through a
  super-node — $0.01 (F5); 3) locking and accepting — two stamps, each a fraction of a cent (F9, F10); 4) the fee on $100 — $5, paid by the
  deal (F7) → [how the deal fee works](/<lang>/deal-fee). Budget 130.
- H3 `costs-batch` «Small payments travel in batches» · «Мелкие платежи едут пачками» — chain: 1) a $0.01 search or a $0.001 message is
  never written one by one: the stamp would eat it (F11); 2) the agent signs a voucher; a super-node gathers thousands into one batch and
  pays one stamp (F11). Budget 110.

### H2 `independence` — en «What keeps working if a company refuses» · ru «Что работает, если компания откажет»
- H3 `ind-ether` «Ether has no off switch» · «У эфира нет выключателя» — chain: 1) USDC is issued by Circle, which may block addresses
  (F12); 2) ether is Ethereum's own coin, written by many independent validators, with no function to block an address (F13); 3) a node can
  always pay stamps in its own ether, so no single paymaster can cut it off (F13). Budget 120.
- H3 `ind-sequencer` «A slow operator is not a closed door» · «Медленный оператор — не закрытая дверь» — chain: 1) on a second-layer
  network one operator, the sequencer, orders transactions (F14); 2) it can delay one but not shut it out: through Ethereum the transaction
  is included within 12 hours on Base and at most 24 hours on Arbitrum (F14); 3) Nostr announcements stay readable on any relay that
  keeps them (F4); full rules → [document 8](/<lang>/docs/08-account-abstraction-bundler). Budget 140.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | AP2: open protocol for agent-led payments; cards, stablecoins, real-time bank transfers | Google Cloud blog, 2025-09-16 |
| F2 | A2A x402 extension with Coinbase, Ethereum Foundation, MetaMask — «production-ready solution for agent-based crypto payments» | same, github google-a2a/a2a-x402 |
| F3 | Dencun (EIP-4844) lowered layer 2 data costs | ethereum.org/en/history, 2024-03-13 |
| F4 | an announcement is a signed Nostr event; Nostr is not a blockchain, free; anyone may read relays directly | doc 17 §17.1, §17.8; README «Nostr» |
| F5 | search through a super-node — $0.01 per result list | doc 17 §17.8; entry 39 |
| F6 | deals are paid in USDC, a dollar stablecoin issued by Circle; the network part is locked in escrow | README «USDC»; doc 04 |
| F7 | fee at most 5% of the network part; $100 → $5 | doc 05 §5.3; entry 42 |
| F8 | the contracts run on Arbitrum and Base, second-layer Ethereum networks | README «Arbitrum», «Base» |
| F9 | a stamp (gas) is the fee for one write, paid in ether; does not depend on the amount ($3 and $3,000 cost the same) | README «Gas» |
| F10 | measured 2026-10-14: simple USDC transfer about $0.0007 on Base, $0.003 on Arbitrum | doc 08 §8.5; README «Gas» |
| F11 | vouchers redeemed in batches; one stamp per batch; $0.01 search and $0.001 message only so | README «Voucher», «Batch»; doc 17 §17.8 |
| F12 | Circle may block addresses and freeze USDC on them | README «USDC» (USDC terms §13) |
| F13 | ether has no «block this address» function; the main network is run by many independent validators; own ether is always a fallback | README «Paymaster» footnote; doc 08 §8.5 |
| F15 | the provider declined or missed the deadline → the whole amount returns to the customer, no fee is taken | doc 04 §4.1 (REFUNDED) |
| F14 | sequencer may delay but not shut out: Base (OP Stack) forced inclusion within 12 hours, Arbitrum at most 24 hours | README «Sequencer», «OP Stack»; docs.optimism.io; docs.arbitrum.io (checked 2026-10-15) |

Numbers: «$100», «$5», «5%», «5 %», «$0.01», «$0,01», «$0.001», «$0,001», «$0.0007», «$0,0007», «$0.003», «$0,003», «$3», «$3,000», «$0», «12 hours», «24 hours», «12 часов», «24 часов»

## 8. Questions to the owner
none — every statement is in the README glossary and documents 04, 05, 08, 17.

## 9. Links
- out across the site:
  - /nostr — «how Nostr carries agent announcements» / «как Nostr переносит объявления агентов» — H2 `layers`
  - /arbitrum-base-l2 — «how Arbitrum and Base differ» / «чем различаются Arbitrum и Base» — H2 `layers`
  - /ethereum-l1 — «how Ethereum gas works for agents» / «как устроен газ Ethereum для агентов» — H2 `layers`
  - /deal-fee — «how the deal fee works» / «как работает комиссия сделки» — H2 `costs`
- to documents: /<lang>/docs/08-account-abstraction-bundler — «document 8» / «документ 8» — H2 `independence`
- incoming (planned): /ethereum-l1, /arbitrum-base-l2, /nostr (up to the hub)
- external primary sources: Google AP2 announcement (F1); github google-a2a/a2a-x402 (F2)

## 10. FAQ
1. en «Which blockchain does Lagrix use?» · ru «Какой блокчейн использует Lagrix?» — contracts on Arbitrum and Base, second-layer Ethereum networks — F8
2. en «Do I need ether to use it?» · ru «Нужен ли эфир, чтобы пользоваться?» — only to pay stamps yourself; a paymaster can take USDC instead — F9, F13
3. en «How much does gas cost per deal?» · ru «Сколько стоит газ за сделку?» — a fraction of a cent per write; measured about $0.0007 on Base — F10
4. en «Is Nostr a blockchain?» · ru «Nostr — это блокчейн?» — no; signed messages on relays, free to read — F4
5. en «Can a company freeze my agent's payments?» · ru «Может ли компания заморозить платежи моего агента?» — Circle can block USDC on an address; stamps can always be paid in own ether — F12, F13

## 11. Words
Glossary: stamp (gas), ether, USDC, escrow, voucher, batch, paymaster, sequencer, super-node, announcement. Traps: «tokens» banned; never
«our coin»; «Lagrix runs a blockchain» is false (contracts on others' networks); ru amounts: «три тысячи долларов» for $3,000.

## 12. Unique value
- One deal, four layers, each with its price: $0 to read, $0.01 to search, a stamp of a fraction of a cent, $5 fee on $100.
- What survives a refusal: Circle can freeze USDC, nobody can block ether; a sequencer can delay, not shut out (12 h / 24 h).
