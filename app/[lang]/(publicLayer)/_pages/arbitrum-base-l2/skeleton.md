# Skeleton /arbitrum-base-l2 — hub technology

Written 2026-10-17 (step 507-9) by the federal agent, from the protocol (README glossary «Arbitrum», «Base», «OP Stack», «Sequencer»,
«USDC», the «Paymaster» footnote; document 08 §8.5) and research of the same day. Form: `references/tz-template.md`; every event is a chain
of small steps (skill §5б).

## 1. Passport
- slug: arbitrum-base-l2 · hub: technology · menu order: 154 (`meta.json`); menu item exists («Arbitrum and Base L2» / «Arbitrum и Base L2»)
- source on the home page: glossary «Arbitrum», «Base», «OP Stack», «Sequencer»
- protocol documents: 08 (and 04)

## 2. Hot question
- main query en: «Arbitrum vs Base for agent payments» · ru: «Arbitrum или Base для платежей агентов»
- intent: compare
- evidence (each with a date and an address):
  - OP Stack (the base of Base): a forced transaction «will only be included in the L2 chain once the sequencer resumes or the 12-hour sequencing window expires» — https://docs.optimism.io/stack/transactions/forced-transaction — read 2026-10-17
  - Arbitrum: «delayBlocks is a constant currently set to 7200 blocks (24 hours)»; the Sequencer Inbox has a `forceInclusion` method to bypass the sequencer — https://docs.arbitrum.io/how-arbitrum-works/sequencer — read 2026-10-17
  - Circle issues USDC natively on Arbitrum and Base; «Redeemable, one USDC for one US dollar» — https://www.usdc.com — read 2026-10-16
  - Google AP2 with an extension for agent crypto payments — https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol — 2025-09-16
  - stamps measured for Lagrix: median $0.0028 on Arbitrum One, $0.00065 on Base — protocol document 08 §8.5 — 2026-10-14
- what the top ten answer and what they DO NOT: comparisons list fees, speed and ecosystems. Few say what a single operator of each network
  can and cannot do to an agent's payment, in hours, from the networks' own documentation.
- why now: agent payments in stablecoins became mainstream in 2025, and builders pick a network first.

## 3. Mission
Honest reputation — a record nobody can rewrite needs a network that one operator cannot close to a participant.

## 4. Reader
A developer choosing where an agent's dollars will move. Pain: «which L2», «is it cheap», «can the operator block me». Leaves with: what a
second layer is, how Arbitrum and Base compare in price and in the operator's power, what is the same on both.

## 5. Titles and meta
- title en: «Arbitrum vs Base for AI agent payments» · ru: «Arbitrum или Base для платежей ИИ-агентов»
- subtitle en: «Lagrix contracts run on both networks: stamps of a fraction of a cent, dollars in USDC, and no operator able to shut a payment out for good.»
  ru: «Контракты Lagrix работают в обеих сетях: марки в долю цента, доллары в USDC и ни один оператор не может закрыть платежу дорогу навсегда.»
- description en: «Arbitrum and Base compared for AI agent payments in Lagrix: measured stamps, USDC on both, and forced inclusion within 12 or 24 hours.»
  ru: «Arbitrum и Base для платежей ИИ-агентов в Lagrix: замеры марок, USDC в обеих сетях и принудительное включение за 12 или 24 часа.»
- cover alt en: «Two second-layer networks on top of Ethereum: Arbitrum and Base» · ru: «Две сети второго уровня поверх Ethereum: Arbitrum и Base»
- menu: exists, unchanged
- lead en: «Arbitrum and Base are two second-layer networks on top of Ethereum, and the Lagrix contracts run on both. A stamp on either costs a
  fraction of a cent: measured, $0.0028 on Arbitrum and $0.00065 on Base. Each has one operator who can delay a payment but not shut it
  out: through Ethereum it gets in within 12 hours on Base and 24 on Arbitrum.»
  ru: «Arbitrum и Base — две сети второго уровня поверх Ethereum, и контракты Lagrix работают в обеих. Марка в любой стоит долю цента: по
  замеру $0,0028 на Arbitrum и $0,00065 на Base. У каждой один оператор, который может задержать платёж, но не закрыть ему дорогу: через
  Ethereum он попадает в сеть за 12 часов на Base и за 24 на Arbitrum.»

## 6. Body plan
One running example: **Leo**'s translation agent is paid by **Anna**'s salon, $100 through escrow. en 1240–1280 words, ru ≥ 1000. H2
headings name the subject (§5в); en without dashes.

### H2 `today` — en «How agents pick a network now» · ru «Как агенты выбирают сеть сейчас»
- H3 `today-many` «Many networks, one digital dollar» · «Много сетей, один цифровой доллар» — chain: 1) since 2025 agents pay in
  stablecoins (F2, external link); 2) USDC is a digital dollar; Circle issues it natively on Arbitrum and Base, and one USDC is redeemable
  for one US dollar (F1, external link); 3) Leo's agent must first decide where its dollars live. Budget 130.
- H3 `today-operator` «Cheap networks with one operator» · «Дешёвые сети с одним оператором» — chain: 1) a second-layer network is cheap
  partly because one operator, the sequencer, orders its transactions (F3); 2) Leo's worry: can that operator stop his payment? 3) the
  answer is in each network's own documentation, in hours (F9, F10). Budget 120.

### H2 `how-it-works` — en «How the second layer works in Lagrix» · ru «Как второй уровень работает в Lagrix»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `l2-what` «A cheaper layer on top of Ethereum» · «Дешёвый слой поверх Ethereum» — chain: 1) the Ethereum main network is kept by
  many independent validators and is expensive to write to (F4); 2) a second-layer network writes far more cheaply and settles its results
  against the main network (F4); 3) since the Dencun upgrade of March 2024 its data is much cheaper to store (F5) → [how Ethereum gas works
  for agents](/<lang>/ethereum-l1). Budget 130.
- H3 `l2-both` «The same contracts on both networks» · «Одни и те же контракты в обеих сетях» — chain: 1) the Lagrix contracts run on
  Arbitrum and on Base (F6); 2) on both, stamps are paid in ether, or in USDC through a third-party paymaster (F6, F11); 3) Anna's $100 lies
  in escrow and reaches Leo minus the $5 fee once the work is accepted (F12) → [how escrow payments in USDC work](/<lang>/web3-payments).
  Budget 130.

### H2 `compare` — en «Arbitrum and Base side by side» · ru «Arbitrum и Base рядом»
- H3 `compare-cost` «The price of a stamp» · «Цена марки» — chain: 1) measured 14 October 2026: a simple USDC transfer, median $0.0028 on
  Arbitrum One and $0.00065 on Base (F7); 2) Anna's deal needs at least two writes, locking and accepting; at simple-transfer prices that
  is about $0.0056 on Arbitrum and $0.0013 on Base, while escrow actions are heavier (F7); 3) both are tiny next to the $5 fee (F12).
  Budget 140.
- H3 `compare-base` «Base on the OP Stack» · «Base на OP Stack» — chain: 1) Base is built on the OP Stack, an open set of programs for
  second-layer networks (F8); 2) if the sequencer ignores a transaction, it can be sent through the Ethereum main network (F9); 3) it is
  included once the sequencer resumes or the 12-hour window expires (F9, external link). Budget 120.
- H3 `compare-arbitrum` «Arbitrum One» · «Arbitrum One» — chain: 1) Arbitrum One is the other second-layer network (F6); 2) its sequencer
  can also be bypassed: the Sequencer Inbox has a `forceInclusion` method (F10); 3) the delay window is 7200 blocks, which is 24 hours (F10,
  external link). Budget 120.

### H2 `same` — en «What stays the same on both networks» · ru «Что одинаково в обеих сетях»
- H3 `same-dollar` «The same dollar and the same stamp currency» · «Тот же доллар и та же валюта марки» — chain: 1) on both, deals are paid
  in USDC, issued natively by Circle (F1); 2) on both, stamps are paid in ether (F6); 3) Circle can block USDC on an address, while ether
  has no such function (F11). Budget 120.
- H3 `same-safety` «What an operator cannot do» · «Чего не может оператор» — chain: 1) a sequencer can delay Leo's payment (F3); 2) it
  cannot shut it out for good: 12 hours on Base, 24 on Arbitrum through the main network (F9, F10); 3) a slowed payment is an annoyance; a
  closed door would end the agent's work (F3) → [the whole stack of one deal](/<lang>/technology); full rules →
  [document 8](/<lang>/docs/08-account-abstraction-bundler). Budget 140.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | USDC: a digital dollar issued by Circle, natively on Arbitrum and Base; redeemable one USDC for one US dollar | usdc.com (read 2026-10-16); README «USDC» |
| F2 | Google AP2 and the A2A x402 extension for agent crypto payments | Google Cloud blog, 2025-09-16 |
| F3 | the sequencer orders transactions; it can delay one but not shut it out for good | README «Sequencer» |
| F4 | second-layer networks write more cheaply and settle against the Ethereum main network, kept by many independent validators | README «Arbitrum», «Paymaster» footnote |
| F5 | Dencun (EIP-4844) lowered layer 2 data costs | ethereum.org/en/history, 2024-03-13 |
| F6 | Lagrix contracts run on Arbitrum and Base; stamps paid in ether on both | README «Arbitrum», «Base» |
| F7 | measured 2026-10-14: simple USDC transfer median $0.0028 Arbitrum One, $0.00065 Base; escrow actions heavier | doc 08 §8.5 |
| F8 | Base is built on the OP Stack, an open set of programs for second-layer networks | README «Base», «OP Stack» |
| F9 | OP Stack forced transaction: included once the sequencer resumes or the 12-hour sequencing window expires | docs.optimism.io forced-transaction (read 2026-10-17) |
| F10 | Arbitrum: Sequencer Inbox `forceInclusion`; delayBlocks 7200 blocks (24 hours) | docs.arbitrum.io sequencer (read 2026-10-17); README «Sequencer» |
| F11 | Circle may block addresses; ether has no block function; a third-party paymaster can take USDC for stamps | README «USDC», «Paymaster» |
| F13 | while the money is in escrow nobody can take it — not the parties, not the network, not the author of the protocol | README «Escrow» |
| F12 | the fee: $100 → $5 (at most 5% of the network part); paid out on acceptance | doc 05 §5.3; doc 04 |

Numbers: «$100», «$5», «$0.0028», «$0,0028», «$0.00065», «$0,00065», «$0.0056», «$0,0056», «$0.0013», «$0,0013», «12 hours», «12 часов», «24 hours», «24 часа»

## 8. Questions to the owner
How a deal chooses one of the two networks is not described in the protocol — the page does not say who chooses or how; it says only
that the contracts run on both.

## 9. Links
- out across the site:
  - /technology — «the whole stack of one deal» / «весь стек одной сделки» — H2 `same` (up to the hub)
  - /ethereum-l1 — «how Ethereum gas works for agents» / «как устроен газ Ethereum для агентов» — H2 `how-it-works`
  - /web3-payments — «how escrow payments in USDC work» / «как устроены платежи через эскроу в USDC» — H2 `how-it-works`
- to documents: /<lang>/docs/08-account-abstraction-bundler — «document 8» / «документ 8» — H2 `same`
- incoming (planned): /technology (hub), /ethereum-l1
- external primary sources: usdc.com (F1); OP Stack docs (F9); Arbitrum docs (F10); Google AP2 (F2)

## 10. FAQ
1. en «Which is cheaper, Arbitrum or Base?» · ru «Что дешевле — Arbitrum или Base?» — measured, Base: $0.00065 against $0.0028; both fractions of a cent — F7
2. en «Is USDC native on both?» · ru «USDC в обеих сетях — родной?» — yes, Circle issues it natively on both — F1
3. en «Can the sequencer block my payment?» · ru «Может ли секвенсор заблокировать мой платёж?» — delay, not block: 12 hours on Base, 24 on Arbitrum through Ethereum — F9, F10
4. en «Do I need ether on these networks?» · ru «Нужен ли эфир в этих сетях?» — stamps are paid in ether, or in USDC through a third-party paymaster — F6, F11
5. en «Are Arbitrum and Base part of Ethereum?» · ru «Arbitrum и Base — это часть Ethereum?» — they are second-layer networks that settle against the Ethereum main network — F4
6. en «Can the operator take the money from escrow?» · ru «Может ли оператор забрать деньги из эскроу?» — no; nobody can take money in escrow — F13

## 11. Words
Glossary: second-layer network, sequencer, OP Stack, stamp, ether, USDC, escrow, paymaster. Traps: never «coin» for ether; «tokens»
banned; never claim how a deal picks a network (section 8); ru: «за 24 часа».

## 12. Unique value
- The operator's power in hours, from each network's own documentation: 12 on Base, 24 on Arbitrum.
- Measured stamps on official nodes and one deal counted on both: $0.0056 and $0.0013 against a $5 fee.
