# Skeleton /super-node — hub network

> 🔒 Changelog entries 47–48 (2026-10-17): announcements go to the relays of the super-nodes that hold their kind of service (document 17, section 17.12); every super-node runs a relay recorded with its place, a newcomer catches up before its check, and the work of one super-node stays bounded as the network grows. The texts follow it.

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-16 (step 507-6) by the federal agent, from the protocol (document 05 §5.3, §5.4, §5.6; document 06; document 09 §9.3,
§9.5; document 14 §14.1–§14.2; document 17 §17.8; README «Nodes and super-nodes») and research of the same day. Form:
`references/tz-template.md`; every event is a chain of small steps (skill §5б).

🛑 Not on the page: any promise of income (document 09 §9.5: the amount «is not known in advance and is not guaranteed»); payment for
relayed traffic (open question, document 02 §2.4); the old wording of document 14 about a «reward for the deals it serves».

## 1. Passport
- slug: super-node · hub: network · menu order: 120 (`meta.json`)
- source on the home page: «To Super-node Junction»; «Boarding pass»
- protocol documents: 05, 06, 14, 15

## 2. Hot question
- main query en: «become a node operator in an AI agent network» · ru: «оператор супер-узла сети ИИ-агентов»
- intent: do
- evidence (each with a date and an address):
  - in proof-of-stake networks a place is bought with a deposit: «A single validator requires a minimum of 32 ETH», and «Downtime incurs
    penalties» — https://ethereum.org/en/staking/solo/ — read 2026-10-16
  - a single provider's outage stops everyone who depends on it — https://aws.amazon.com/message/101925/ — 2025-10
  - A2A 1.0 with «more than 150 organizations supporting the standard» — agents need shared infrastructure to find each other —
    https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year — 2026-04-09
- what the top ten answer and what they DO NOT: guides to «becoming a node operator» explain buying hardware and staking a deposit. None
  describes a place that cannot be bought at all: earned by real paid work, handed out by a draw anyone can check, and kept by service.
- why now: agent networks are being built now, and the question «who runs the search?» decides whether they stay open.

## 3. Mission
Discovery — search is kept by many independent operators chosen from those who do real work, so no single owner controls it.

## 4. Reader
A developer or small business whose agents already earn in the network, or someone curious who runs search. Pain: «can I buy a place?»;
«what happens if my server goes down?»; «how much will I earn?». Leaves with: what a super-node does, who can apply, the draw, the 48
hours, the check, what pays and what is never promised, how a super-node leaves.

## 5. Titles and meta
- title en: «How to become a super-node operator» · ru: «Как стать оператором супер-узла»
- subtitle en: «A super-node place in Lagrix is not bought: it goes to owners of provider agents with paid work near the network median, by a draw anyone can check.»
  ru: «Место супер-узла в Lagrix не покупается: его получают владельцы агентов-исполнителей с оплаченной работой около медианы сети — по жребию, который может проверить любой.»
- description en: «Super-nodes keep Lagrix search. A place is earned by paid work near the median and a public draw, never bought, and lost only for proven cheating.»
  ru: «Супер-узлы держат поиск Lagrix. Место зарабатывается оплаченной работой около медианы и открытым жребием, не покупается и теряется только за доказанный обман.»
- cover alt en: «A boarding pass to a super-node place: paid work near the median, a draw, 48 hours to start»
  ru: «Посадочный талон на место супер-узла: оплаченная работа около медианы, жребий, 48 часов на запуск»
- menu item en: name «Super-nodes» · description «Who keeps search: places earned by paid work and a public draw, never bought.»
  ru: name «Супер-узлы» · description «Кто держит поиск: места за оплаченную работу и открытый жребий, их нельзя купить.»
- lead en: «A super-node is an always-on server that keeps Lagrix search, builds result lists and helps agents connect. Its place cannot
  be bought. It goes to the owner of provider agents whose paid work in the last 12 months sits near the network's median, chosen by a
  draw anyone can check. The operator has 48 hours to start the server, and loses the place only for proven cheating.»
  ru: «Супер-узел — всегда включённый сервер, который держит поиск Lagrix, строит списки результатов и помогает агентам соединиться.
  Купить его место нельзя. Оно достаётся владельцу агентов-исполнителей, чья оплаченная работа за последние 12 месяцев близка к медиане
  сети, — по жребию, который может проверить любой. На запуск сервера у оператора 48 часов, а теряет место он только за доказанный обман.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Leo, whose translation agent did $420 of paid work in
the last 12 months, applies when a place opens; the network median is $400. en ≥ 1260, ru ≥ 1000. Web4 definition verbatim under H2
`how-it-works`.

### H2 `problem` — en «Who runs search in an agent network» · ru «Кто держит поиск в сети агентов»
- H3 `problem-owner` «One owner, one switch» · «Один владелец — один выключатель» — chain: 1) every search needs a server that is always
  on; 2) if one company runs it, it decides who is seen and its outage stops everyone (F1, external link); 3) so in Lagrix search is kept
  by many super-nodes, at least ten (F2).
- H3 `problem-bought` «Places that money buys» · «Места, которые покупают деньгами» — chain: 1) many networks let anyone with a large
  deposit run infrastructure: one network asks 32 ETH per validator and penalises downtime (F3, external link); 2) then the richest hold
  the most places; 3) Lagrix asks for the opposite: real paid work, and places cannot be bought (F2).

### H2 `how-it-works` — en «How a place is earned» · ru «Как зарабатывают место»
- paragraph: Web4 definition verbatim.
- H3 `earn-window` «The window around the median» · «Окно вокруг медианы» — chain: 1) a place opens; 2) the contract takes every node
  whose elements did paid work as providers in the last 12 months and finds the median: $400 (F4); 3) nodes from 0.75 to 1.25 of the
  median may apply: from $300 to $500 (F4); 4) Leo's $420 is inside; the biggest earners are outside, so whoever earns most does not
  also hold search (F4); 5) one application per node wallet; a node with a «proven violation» mark cannot apply (F5).
- H3 `earn-draw` «A draw anyone can check» · «Жребий, который может проверить любой» — chain: 1) with the application Leo publishes the
  fingerprint (hash) of a secret number (F6); 2) applications close; everyone reveals their secret (F6); 3) all secrets together set the
  random order, keeping networks and regions diverse; nobody knows the result before the last reveal (F6); 4) Leo comes first → he gets
  the invitation and 48 hours to start his server (F7); 5) agents of the network's nodes, taken in turn, check the server — not the
  existing super-nodes, who gain from fewer rivals (F7); 6) passed → Leo is in; not ready or failed → the next applicant is invited (F7).

### H2 `work` — en «What a super-node does, and what pays for it» · ru «Что делает супер-узел и что за это платят»
- H3 `work-tasks` «The work» · «Работа» — chain: 1) keeps the index of announcements and builds result lists by one open rule (F8); 2)
  keeps the index of receipts and reviews (F8); 3) helps agents behind home routers connect, and passes encrypted traffic when a direct
  link fails (F8) → [running a node on your own computer](/<lang>/nodes); 4) never holds the money: payment is settled by the escrow
  contract (F8); 5) a standard server: 8 vCPU, 16 GB of memory, a 500 GB NVMe disk, a 1 Gbps link and a static public address, and the
  bar grows with the network (F9).
- H3 `work-pay` «The pay, and what is never promised» · «Оплата — и чего никто не обещает» — chain: 1) the fees of each period are
  pooled and divided equally among super-nodes that passed the quality minimum (F10) → [where the deal fee goes](/<lang>/deal-fee); 2)
  searches pay $0.01 per list and delivered messages $0.001, redeemed in batches (F11) → [the price of one search](/<lang>/search-fee);
  3) the amount is not known in advance and nothing guarantees it (F10).

### H2 `leaving` — en «How a super-node leaves» · ru «Как супер-узел уходит»
- H3 `leaving-normal` «Rotation and downtime, without a mark» · «Ротация и простой — без отметки» — chain: 1) once every year divided by
  the number of super-nodes, the longest-serving one leaves, only after its successor is checked and included; each stays about a year
  (F12); 2) downtime is not a violation: the server only loses income (F13); 3) unavailable 30 days in a row → removed, no mark (F13);
  4) a capacity warning ignored → early leave, no mark (F13).
- H3 `leaving-mark` «Proven cheating, with a mark for good» · «Доказанный обман — с отметкой навсегда» — chain: 1) dropping packets,
  falsified result lists, forged tables (F14); 2) proven by signatures and checks anyone can repeat (F14); 3) a permanent «proven
  violation» mark on the node's wallet and all its elements; the place is lost and never given again (F14); 4) whoever proves it is
  rewarded from the fees; a false report loses its deposit (F15) → [document 5](/<lang>/docs/05-fees-and-reputation) and
  [an AI agent network without a central server](/<lang>/network).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | a cloud region outage from the evening of October 19 to the afternoon of October 20, 2025 | AWS post-event summary |
| F2 | always at least ten places; a place is not bought and not taken by number | doc 05 §5.6 |
| F3 | «A single validator requires a minimum of 32 ETH»; «Downtime incurs penalties» | ethereum.org/en/staking/solo — on the page «one network», named in the link |
| F4 | measure: sum of network parts of deals where the node's elements were providers, last 12 months; median M; window 0.75 M–1.25 M; the largest providers fall outside | doc 05 §5.6 |
| F5 | only owners of provider agents; one application per node wallet; a node with the mark cannot apply | doc 05 §5.6 |
| F6 | commit and reveal: hash of a secret with the application, reveal after close; all secrets decide the order; diversity of networks and regions; nobody knows the result until the last reveal | doc 05 §5.6 |
| F7 | the first in order gets an invitation and 48 hours; checked by agents of network nodes taken in turn, not by super-nodes; fail → next applicant | doc 05 §5.6 |
| F8 | super-node keeps the discovery index, builds results, keeps the index of receipts and reviews, helps connect, relays encrypted traffic; payment settled by the escrow contract | README «Nodes and super-nodes»; doc 06 intro |
| F9 | standard profile: 8 vCPU, 16 GB RAM, 500 GB NVMe, 1 Gbps, static public IPv4; requirements grow with the network | doc 14 §14.2; entry 45 |
| F10 | fees pooled per period, divided equally among super-nodes that passed the quality minimum; the amount «is not known in advance and is not guaranteed» | doc 09 §9.3, §9.5 |
| F11 | search $0.01 per list, delivery $0.001, vouchers redeemed in batches | doc 17 §17.8; README glossary «Voucher», «Batch» |
| F12 | rotation: once every 1 year / N the longest-serving leaves after the successor is included; about a year each | doc 05 §5.6 |
| F13 | downtime is not a violation; 30 days unavailable → removed without a mark; early leave after a capacity warning without a mark | doc 06 §6.2; entry 45 |
| F14 | violations: packet dropping, falsified results, forged tables/NodeID; proof by signatures; permanent mark on wallet and elements; place lost for good | doc 06 §6.3–§6.4 |
| F15 | the prover is rewarded in USDC from the fees; a false report loses the locked amount | doc 06 §6.4–§6.5 |

Numbers: «$400», «$300», «$500», «$420», «48 hours», «48 часов», «12 months», «12 месяцев», «30 days», «30 дней», «$0.01», «$0,01», «$0.001», «$0,001», «1.25», «0.75», «1,25», «0,75»

## 8. Questions to the owner
none.

## 9. Links
- out across the site: /<lang>/network — «an AI agent network without a central server» / «сеть ИИ-агентов без центрального сервера»
  (up to the hub); /<lang>/nodes — «running a node on your own computer» / «узел на своём компьютере»; /<lang>/deal-fee — «where the deal
  fee goes» / «куда идёт комиссия сделки»; /<lang>/search-fee — «the price of one search» / «цена одного поиска»
- to documents: /<lang>/docs/05-fees-and-reputation — «document 5» / «документ 5»
- incoming (planned): /network, /discovery, /nodes, /deal-fee
- external primary sources: https://ethereum.org/en/staking/solo/ (F3); https://aws.amazon.com/message/101925/ (F1)

## 10. FAQ
1. en «Can I buy a super-node place?» · ru «Можно ли купить место супер-узла?» — no; it is earned by paid work and a public draw — F2, F4, F6
2. en «Who can apply?» · ru «Кто может подать заявку?» — owners of provider agents with paid work near the median, one application per wallet, no mark — F4, F5
3. en «What happens if my server goes down?» · ru «Что будет, если мой сервер отключится?» — you lose income; after 30 days you are removed without a mark — F13
4. en «How much does a super-node earn?» · ru «Сколько зарабатывает супер-узел?» — an equal share of the period's fees and the search and delivery fees; the amount is not known in advance or guaranteed — F10, F11
5. en «How long does a super-node keep its place?» · ru «Как долго супер-узел держит место?» — about a year, by rotation, after a successor is included — F12

## 11. Words
Glossary: super-node, operator, provider agent, median, window, draw (commit and reveal), invitation, quality minimum, period, rotation,
proven violation. Traps: never «earn», «income», «reward» as a promise; «stake/deposit» only about other networks; «tokens» banned;
no «validator» for Lagrix; «random» is fine here (the draw), unlike the search turn.

## 12. Unique value
- The whole path to a place in numbers: median $400 → window $300–$500 → Leo's $420 → draw → 48 hours → check.
- A place that money cannot buy and that is lost only for proven cheating, set against deposit-based networks with a primary source.
