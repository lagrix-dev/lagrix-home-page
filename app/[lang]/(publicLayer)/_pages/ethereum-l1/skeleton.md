# Skeleton /ethereum-l1 — hub technology

Written 2026-10-17 (step 507-9) by the federal agent, from the protocol (README glossary «Ether», «Gas («stamp»)», «Voucher», «Batch»,
«Paymaster» and its footnote; document 08 §8.5; document 17 §17.8; changelog entries 37–39) and research of the same day. Form:
`references/tz-template.md`; every event is a chain of small steps (skill §5б).

## 1. Passport
- slug: ethereum-l1 · hub: technology · menu order: 153 (`meta.json`); menu item exists («Ethereum L1» / «Эфир L1»)
- source on the home page: glossary «Ether (ETH)», «Gas («stamp»)»
- protocol documents: 08 (and 17 §17.8)

## 2. Hot question
- main query en: «Ethereum gas for AI agents» · ru: «газ Ethereum для ИИ-агентов»
- intent: learn
- evidence (each with a date and an address):
  - Google's AP2 and the A2A x402 extension put agent payments in crypto on the map — «a production-ready solution for agent-based crypto
    payments» — https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol — 2025-09-16
  - Ethereum's Dencun upgrade «significantly decreases the cost of data storage for layer 2 rollups» — https://ethereum.org/en/history/ — 2024-03-13
  - the stamp measured for Lagrix on the official public nodes: Arbitrum One median $0.0028, Base median $0.00065 for a simple USDC
    transfer — https://arb1.arbitrum.io/rpc and https://mainnet.base.org via protocol document 08 §8.5 — 2026-10-14
- what the top ten answer and what they DO NOT: guides explain gas and gwei. None answers, for an agent that earns only dollars, which
  actions need a stamp, who pays it, and what happens if the service paying stamps for it refuses.
- why now: once agents pay on-chain (2025), every agent meets the stamp question on its first payment.

## 3. Mission
Honest reputation — every paid deal and review is a write to the blockchain, and the stamp is what such a record costs.

## 4. Reader
A developer whose agent earns USDC and has never held ether. Pain: «do I need to buy ETH», «how much is gas», «what if the gas service
refuses me». Leaves with: which actions cost a stamp, who pays, the two ways to pay, measured prices.

## 5. Titles and meta
- title en: «Ethereum gas for AI agents: who pays the stamp» · ru: «Газ Ethereum для ИИ-агентов: кто платит марку»
- subtitle en: «In Lagrix each write to the blockchain costs a stamp of a fraction of a cent, and an agent pays it in ether or in dollars through a paymaster.»
  ru: «В Lagrix каждая запись в блокчейн стоит марку в долю цента, и агент платит её эфиром или долларами через paymaster.»
- description en: «Gas for AI agents in Lagrix: which actions need a stamp, who pays it, own ether or a USDC paymaster, and measured prices of a fraction of a cent.»
  ru: «Газ для ИИ-агентов в Lagrix: каким действиям нужна марка, кто её платит, свой эфир или paymaster в USDC и замеры цены в долю цента.»
- cover alt en: «A stamp on a letter: gas for one write to the blockchain» · ru: «Марка на письме: газ за одну запись в блокчейн»
- menu: exists, unchanged
- lead en: «Every write to the blockchain costs a stamp, called gas, paid in ether. In Lagrix the stamp is a fraction of a cent and does not depend on
  the amount. Rare actions, such as paying into escrow, are paid by whoever acts. Frequent ones, such as searches, travel in batches with
  one stamp for thousands.»
  ru: «Каждая запись в блокчейн стоит марку — газ, — которая оплачивается эфиром. В Lagrix марка стоит долю цента и не зависит от суммы.
  Редкие действия, например оплату в эскроу, оплачивает тот, кто действует. Частые, например поиск, едут пачками — одна марка на тысячи.»

## 6. Body plan
One running example: **Leo** (developer of a translation agent) earns USDC and has never held ether; **Anna**'s salon is his customer.
en 1240–1280 words, ru ≥ 1000. H2 headings name the subject (§5в); en without dashes.

### H2 `today` — en «How agents meet gas now» · ru «Как агенты сталкиваются с газом сейчас»
- H3 `today-gas` «Gas in plain words» · «Газ простыми словами» — chain: 1) a blockchain is a shared record, and each new line in it is a
  write (F1); 2) each write costs a stamp, called gas, paid in ether, the Ethereum network's own currency (F1); 3) the price is set by the
  network, not by the amount: a $3 deal and a $3,000 deal cost the same stamp (F1). Budget 130.
- H3 `today-dollars` «Agents that hold only dollars» · «Агенты, у которых есть только доллары» — chain: 1) in 2025 Google's AP2 and its
  crypto extension made agent payments in stablecoins mainstream (F2, external link); 2) Leo's agent is paid in USDC and has no ether;
  3) its first on-chain action asks for a stamp it cannot pay; 4) Lagrix answers who pays which stamp and how. Budget 130.

### H2 `who-pays` — en «Who pays the stamp in Lagrix» · ru «Кто платит марку в Lagrix»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `pay-rare` «Rare actions: you pay your own» · «Редкие действия: каждый платит свою» — chain: 1) rare actions are separate writes:
  topping up the search balance, paying into escrow, delivering work, accepting it, leaving a review (F3); 2) whoever acts pays the stamp:
  Anna's agent locks the money and pays that stamp, Leo's agent delivers and pays his (F3); 3) nobody pays stamps for others, and network
  participants do not sell stamps (F7). Budget 140.
- H3 `pay-frequent` «Frequent actions: one stamp for a batch» · «Частые действия: одна марка на пачку» — chain: 1) a search costs $0.01 and
  a delivered message $0.001 (F4); 2) one by one, a stamp would eat them (F4); 3) the agent signs a voucher instead, a promise to pay from its
  balance in the contract (F4); 4) a super-node gathers thousands of vouchers and pays one stamp for the batch; the user pays no stamp for
  them at all (F4) → [how the search fee works](/<lang>/search-fee). Budget 140.

### H2 `ways` — en «Two ways to pay a stamp» · ru «Два способа заплатить марку»
- H3 `ways-own` «Your own ether» · «Свой эфир» — chain: 1) Leo's node keeps a little ether and pays its stamps itself (F5); 2) there is no
  intermediary; 3) ether has no «block this address» function, and the main network is run by many independent validators (F6); 4) so
  this way is always open. Budget 130.
- H3 `ways-paymaster` «A paymaster in dollars» · «Paymaster в долларах» — chain: 1) a paymaster is a third-party contract under the
  ERC-4337 standard that pays the stamp in its own ether and charges the agent in USDC (F5); 2) for example Circle Paymaster: USDC only, no
  sign-up, a 10% surcharge on gas on Arbitrum and Base (F8); 3) on a $0.003 stamp that is $0.0033 (F8, F9); 4) the node chooses and can
  switch at any time; if the paymaster refuses, own ether stays (F5, F6). Budget 140.

### H2 `price` — en «What a stamp costs» · ru «Сколько стоит марка»
- H3 `price-measured` «Measured on two networks» · «Замер в двух сетях» — chain: 1) measured on 14 October 2026 on the official public
  nodes: a simple USDC transfer cost a median of $0.0028 on Arbitrum One and $0.00065 on Base (F9); 2) it is a one-minute snapshot: the
  price moves with load and the ether rate (F9); 3) locking into escrow and accepting work are heavier than a simple transfer (F9) →
  [how Arbitrum and Base differ](/<lang>/arbitrum-base-l2). Budget 130.
- H3 `price-layers` «The main network and the second layer» · «Основная сеть и второй уровень» — chain: 1) the Ethereum main network is
  where many independent validators keep the shared record (F6); 2) second-layer networks write far more cheaply and settle their results
  against it (F10); 3) the Dencun upgrade of March 2024 made storing their data much cheaper (F11, external link); 4) so the Lagrix
  contracts run on the second layer and the stamp stays at a fraction of a cent (F10) → [the whole stack of one deal](/<lang>/technology);
  full rules → [document 8](/<lang>/docs/08-account-abstraction-bundler). Budget 150.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | gas («stamp») = the network's fee for one write, paid in ether; set by the network; does not depend on the amount ($3 and $3,000 the same) | README «Gas», «Ether» |
| F2 | AP2 and the A2A x402 extension for agent crypto payments | Google Cloud blog, 2025-09-16 |
| F3 | rare actions (top up search balance, pay into escrow, deliver, accept, review) are separate writes; whoever acts pays the stamp | README «Gas» |
| F4 | search $0.01, delivery $0.001 via vouchers; super-node redeems thousands in one batch with one stamp; the user pays no stamp for them | README «Voucher», «Batch», «Gas»; doc 17 §17.8 |
| F5 | two ways: own ether, or a third-party ERC-4337 paymaster that pays in its ether and charges USDC; the node chooses and may switch | README «Paymaster»; doc 08 §8.5 |
| F6 | ether has no block-address function; main network run by many independent validators; own ether is the fallback nobody can block | README «Paymaster» footnote |
| F7 | network participants do not sell stamps; nodes and super-nodes run no paymasters for others | doc 08 §8.5; entry 38 |
| F8 | Circle Paymaster: USDC only, no sign-up, 10% surcharge on gas on Arbitrum and Base | doc 08 §8.5 |
| F9 | measured 2026-10-14: simple USDC transfer, median $0.0028 Arbitrum One, $0.00065 Base; one-minute snapshot; escrow actions heavier | doc 08 §8.5 |
| F10 | Arbitrum and Base are second-layer networks: cheaper writes, results settled against the main network; Lagrix contracts run there | README «Arbitrum», «Base» |
| F12 | the deal fee: $100 → $5 (5% of the network part) | doc 05 §5.3; entry 42 |
| F11 | Dencun (EIP-4844) significantly lowered layer 2 data costs | ethereum.org/en/history, 2024-03-13 |

Numbers: «$3», «$3,000», «$0.01», «$0,01», «$0.001», «$0,001», «10%», «10 %», «$0.003», «$0,003», «$0.0033», «$0,0033», «$0.0028», «$0,0028», «$0.00065», «$0,00065», «$100», «$5»

## 8. Questions to the owner
none — every statement is in the README glossary and documents 08, 17.

## 9. Links
- out across the site:
  - /technology — «the whole stack of one deal» / «весь стек одной сделки» — H2 `price` (up to the hub)
  - /arbitrum-base-l2 — «how Arbitrum and Base differ» / «чем различаются Arbitrum и Base» — H2 `price`
  - /search-fee — «how the search fee works» / «как устроена плата за поиск» — H2 `who-pays`
- to documents: /<lang>/docs/08-account-abstraction-bundler — «document 8» / «документ 8» — H2 `price`
- incoming (planned): /technology (hub), /arbitrum-base-l2
- external primary sources: Google AP2 announcement (F2); ethereum.org history (F11)

## 10. FAQ
1. en «Does an AI agent need ether?» · ru «Нужен ли ИИ-агенту эфир?» — only to pay stamps itself; a paymaster can take USDC — F5
2. en «Who pays gas for a search?» · ru «Кто платит газ за поиск?» — the super-node, one stamp per batch; the user pays none — F4
3. en «Can gas be paid in USDC?» · ru «Можно ли платить газ в USDC?» — yes, through a third-party paymaster, for example with a 10% surcharge — F5, F8
4. en «Does gas depend on the deal amount?» · ru «Зависит ли газ от суммы сделки?» — no; $3 and $3,000 cost the same stamp — F1
5. en «What if the paymaster refuses?» · ru «Что если paymaster откажет?» — pay with your own ether; nobody can block it — F6
6. en «How much ether should my agent keep?» · ru «Сколько эфира держать агенту?» — a little: at about $0.003 per stamp, one dollar covers more than three hundred writes — F9

## 11. Words
Glossary: stamp (gas), ether, paymaster, voucher, batch, super-node, USDC, second-layer network. Traps: never «coin» for ether (write
«the Ethereum network's currency»), «tokens» banned, no gwei on the page; ru: «три тысячи долларов» for $3,000.

## 12. Unique value
- Which action costs a stamp and who pays it, on one agent's day.
- The paymaster's price counted: $0.003 → $0.0033, and the fallback nobody can block.
- Measured stamps on the official nodes: $0.0028 and $0.00065.
