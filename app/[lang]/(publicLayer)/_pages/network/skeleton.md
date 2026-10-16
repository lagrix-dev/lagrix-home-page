# Skeleton /network — hub network

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-16 (step 507-6) by the federal agent, from the protocol (README «Nodes and super-nodes», «Money and stamps», glossary;
documents 19, 05 §5.6, 06 §6.2, 09, 17, 04) and research of the same day. Form: `references/tz-template.md`; every event is a chain of
small steps (skill §5б).

## 1. Passport
- slug: network · hub: itself · menu order: 120 (`meta.json`)
- source on the home page: «Nodes and super-nodes»; «Zero-day infrastructure»
- protocol documents: 19, 05, 06, 18

## 2. Hot question
- main query en: «decentralized AI agent network without a central server» · ru: «сеть ИИ-агентов без центрального сервера»
- intent: learn
- evidence (each with a date and an address):
  - one cloud region failed for most of a day: «the event started at 11:48 PM PDT on October 19 and ended at 2:20 PM PDT on October 20» —
    https://aws.amazon.com/message/101925/ — 2025-10
  - A2A has no standard registry: «does not prescribe a standard API for curated registries» —
    https://a2a-protocol.org/latest/topics/agent-discovery/ — read 2026-10-16
  - A2A 1.0 and «more than 150 organizations supporting the standard» —
    https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year — 2026-04-09
- what the top ten answer and what they DO NOT: articles on «decentralized agent networks» describe peer-to-peer messaging or token-run
  marketplaces. None explains, in plain steps, who keeps search, who holds the money and what happens to a person's agent when any single
  company, the network's authors included, disappears.
- why now: agents are being opened to each other at scale (A2A 1.0), while the big outages of 2025 showed how much hangs on one provider.

## 3. Mission
Discovery — agents find each other through many independent super-nodes; no single company decides or can switch it off.

## 4. Reader
Someone who wants their agent to work with others but does not want to depend on one platform. Pain: «if the platform goes down or bans
me, my business stops»; «who runs this network?». Leaves with: what a node is, what a super-node is, who holds the money, what it costs,
and where the five child pages go deeper.

## 5. Titles and meta
- title en: «An AI agent network without a central server» · ru: «Сеть ИИ-агентов без центрального сервера»
- subtitle en: «Lagrix runs on people's own computers and on independent super-nodes; payment is held by a public contract, not by a company.»
  ru: «Lagrix работает на компьютерах самих людей и на независимых супер-узлах; оплату держит публичный контракт, а не компания.»
- description en: «Lagrix has no central server: nodes run on people's computers, independent super-nodes keep search, and escrow contracts hold payments.»
  ru: «У Lagrix нет центрального сервера: узлы работают на компьютерах людей, поиск держат независимые супер-узлы, а оплату — контракты эскроу.»
- cover alt en: «Home nodes linked through several super-nodes, with no centre» · ru: «Домашние узлы, связанные через несколько супер-узлов, без центра»
- menu item en: name «Network» · description «Nodes on people's computers, independent super-nodes, payments in public contracts: no central server.»
  ru: name «Сеть» · description «Узлы на компьютерах людей, независимые супер-узлы, оплата в публичных контрактах: центрального сервера нет.»
- lead en: «Lagrix is an AI agent network with no central server. Agents live on nodes, which are people's own computers. Search is kept by
  super-nodes, servers of independent operators who earned their places by paid work. Payments wait in public escrow contracts. If any one
  of them disappears, including the authors of Lagrix, the rest keep working by the same open rules.»
  ru: «Lagrix — сеть ИИ-агентов без центрального сервера. Агенты живут на узлах — собственных компьютерах людей. Поиск держат супер-узлы —
  серверы независимых операторов, заработавших место оплаченной работой. Оплата ждёт в публичных контрактах эскроу. Если кто-то из них
  исчезнет, включая авторов Lagrix, остальные продолжат работать по тем же открытым правилам.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Anna's «Bella» salon and its booking agent; Leo's
translation agent. en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «What a central server costs you» · ru «Чего стоит центральный сервер»
- H3 `problem-outage` «One failure stops everyone» · «Один сбой останавливает всех» — chain: 1) Anna's booking agent lives on a
  platform; 2) the platform runs in one cloud region; 3) in October 2025 one region of a large cloud failed from late evening to the
  next afternoon (F1, external link); 4) every agent there stopped answering at the same time, Anna's too.
- H3 `problem-gate` «One owner decides who is seen» · «Один владелец решает, кого видно» — chain: 1) the platform also keeps the list
  of agents; 2) it decides whom to show and on what terms; 3) A2A, the open protocol agents speak, leaves the shared list to others (F2,
  external link) → so each list belongs to someone.

### H2 `how-it-works` — en «How Lagrix works without a centre» · ru «Как Lagrix работает без центра»
- paragraph: Web4 definition verbatim.
- H3 `how-nodes` «Nodes: your own computer» · «Узлы: ваш собственный компьютер» — chain: 1) Anna's agent runs on her own computer or a
  rented server: that is a node (F3); 2) the node has a wallet, a free digital key that is its name and account (F3); 3) it announces
  what its agents can do (F3); 4) switched off, it simply gets no orders; nothing breaks (F4) → [running a node on your own computer](/<lang>/nodes).
- H3 `how-super` «Super-nodes: search without an owner» · «Супер-узлы: поиск без владельца» — chain: 1) Anna's agent looks for a
  translator; 2) the question goes to any super-node; every one builds results by the same open rule (F5); 3) there are always at least
  ten places, and each is earned by paid work and a random draw, never bought (F6) → [how super-node places are earned](/<lang>/super-node);
  4) one super-node goes offline → the others answer (F7).

### H2 `money` — en «Who holds the money» · ru «Кто держит деньги»
- H3 `money-escrow` «A contract, not a company» · «Контракт, а не компания» — chain: 1) Anna's agent pays Leo $100 in USDC, a digital
  dollar (F8); 2) the money waits in an escrow contract on a public network until Anna accepts (F8); 3) nobody can take it meanwhile — not
  the parties, not the network, not the authors (F8); 4) on acceptance the contract pays Leo and keeps the fee (F9).
- H3 `money-prices` «Four small prices» · «Четыре небольшие цены» — chain: 1) a search: $0.01 per result list (F10) → [the price of one
  search](/<lang>/search-fee); 2) a delivered message: $0.001 (F10); 3) the fee: at most 5% of the network part of a completed deal, 5% now:
  $5 on Leo's $100 (F11) → [where the deal fee goes](/<lang>/deal-fee); 4) the stamp — a fraction of a cent for each write to the
  blockchain, paid by whoever acts (F12); 5) being visible costs nothing (F13) → [how to get USDC for agent payments](/<lang>/on-ramp).

### H2 `independence` — en «What keeps it independent» · ru «Что держит её независимой»
- H3 `indep-nobody` «If anyone disappears» · «Если кто-то исчезнет» — chain: 1) Lagrix is a protocol, not a program: any program by any
  author can be a node (F14); 2) if any starter, company or author disappeared, the authors of Lagrix included, nodes written by others
  keep working (F14); 3) the rules live in contracts nobody can change after deployment (F15).
- H3 `indep-open` «Open to any agent» · «Открыта любому агенту» — chain: 1) an agent of any framework meets Lagrix the same way, and no
  project, Fractera included, has an advantage (F16); 2) A2A carries the work (F16); 3) the full list of what a node needs → [document 19](/<lang>/docs/19-node-requirements).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | DynamoDB disruption in the Northern Virginia region: «started at 11:48 PM PDT on October 19 and ended at 2:20 PM PDT on October 20» (2025) | AWS post-event summary — on the page «one region of a large cloud», named in the link |
| F2 | A2A «does not prescribe a standard API for curated registries» | a2a-protocol.org agent discovery |
| F3 | a node: a person's home computer or VPS with elements and agents; a wallet (free key = name and account); announcements; five things | doc 19 §19.1–19.2; README |
| F4 | no constant uptime required: a switched-off node simply receives no orders | doc 19 §19.3 |
| F5 | every super-node builds results by the same rules of 17.2 | doc 17 §17.2, §17.7 |
| F6 | at least ten places; earned by paid work near the median and random choice; not bought | doc 05 §5.6; README |
| F7 | downtime is not a violation; an unavailable super-node only loses income | doc 06 §6.2 |
| F8 | USDC, a digital dollar; escrow holds the network part until acceptance; nobody can take it, not the author of the protocol | README glossary «USDC», «Escrow»; doc 04 |
| F9 | on acceptance the provider gets the payment minus the fee | doc 04 §4.1 |
| F10 | $0.01 per result list; $0.001 per message a super-node delivers | doc 17 §17.8 |
| F11 | fee at most 5% of the network part, 5% until modelling, only on completed deals | doc 09 §9.2 |
| F12 | gas («stamp») a fraction of a cent, paid by whoever acts, in ether or through a third-party paymaster | README glossary «Gas»; doc 08 §8.5 |
| F13 | an empty wallet costs nothing and is visible | doc 19 §19.3 |
| F14 | a node can be any program by any author; no starter, company or author is required; if any disappeared, others keep working | doc 19 intro, §19.4 |
| F15 | rules live in immutable contracts; no administrator key | doc 05 intro; doc 18 |
| F16 | any framework meets Lagrix the same way; no advantage for Fractera; A2A carries work | README «Nodes and super-nodes» |

Numbers: «$0.01», «$0,01», «$0.001», «$0,001», «5%», «5 %», «$100», «$5»

## 8. Questions to the owner
none.

## 9. Links
- out across the site: /<lang>/nodes — «running a node on your own computer» / «узел на своём компьютере»; /<lang>/super-node — «how
  super-node places are earned» / «как зарабатывают место супер-узла»; /<lang>/search-fee — «the price of one search» / «цена одного
  поиска»; /<lang>/deal-fee — «where the deal fee goes» / «куда идёт комиссия сделки»; /<lang>/on-ramp — «how to get USDC for agent
  payments» / «как получить USDC для оплаты агентов»
- to documents: /<lang>/docs/19-node-requirements — «document 19» / «документ 19»
- incoming (planned): /discovery, /a2a, /nodes, /super-node, /search-fee, /deal-fee, /on-ramp
- external primary sources: https://aws.amazon.com/message/101925/ (F1); https://a2a-protocol.org/latest/topics/agent-discovery/ (F2)

## 10. FAQ
1. en «Who owns the Lagrix network?» · ru «Кому принадлежит сеть Lagrix?» — nobody alone: nodes belong to their people, super-node places are earned, rules live in contracts — F3, F6, F15
2. en «What happens if a super-node goes down?» · ru «Что будет, если супер-узел отключится?» — the others answer; it only loses income — F7
3. en «Do I need a server to join?» · ru «Нужен ли сервер, чтобы участвовать?» — no; a home computer is enough — F3
4. en «Who holds my money during a deal?» · ru «Кто держит мои деньги во время сделки?» — a public escrow contract; nobody can take it — F8
5. en «Would the network stop if Lagrix's authors disappeared?» · ru «Остановится ли сеть, если авторы Lagrix исчезнут?» — no — F14

## 11. Words
Glossary: node, super-node, operator, wallet, escrow, USDC, fee, stamp (gas), voucher, A2A. Traps: no «token(s)»; no income promise for
super-node operators; never name AWS on the page outside the link; «decentralized» only as «no central server», never «blockchain
network of our own» (contracts run on Arbitrum and Base).

## 12. Unique value
- One deal walked through the network piece by piece: node → super-node → escrow → fee, with who owns each piece.
- The «if anyone disappears» test answered for each piece, the authors included.
