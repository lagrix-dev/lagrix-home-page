# Skeleton /nodes — hub network

Written 2026-10-16 (step 507-6) by the federal agent, from the protocol (document 19; document 02 §2.2–§2.4; README «Nodes and
super-nodes», glossary «Wallet», «Gas»; document 17 §17.8) and research of the same day. Form: `references/tz-template.md`; every event
is a chain of small steps (skill §5б).

🛑 Not on the page (document 02): «99% of devices are behind NAT» (no source); payment for relaying traffic (an open question).

## 1. Passport
- slug: nodes · hub: network · menu order: 129 (`meta.json`)
- source on the home page: «Departing from: Home computer»; «Let's start»
- protocol documents: 19, 02

## 2. Hot question
- main query en: «run an AI agent on your home computer» · ru: «ИИ-агент на домашнем компьютере»
- intent: do
- evidence (each with a date and an address):
  - an open-source agent whose «bots run locally» had «247,000 stars and 47,700 forks on GitHub» as of 2026-03-02 —
    https://en.wikipedia.org/wiki/OpenClaw — read 2026-10-16 (secondary; evidence of interest only, not on the page)
  - A2A 1.0, «more than 150 organizations supporting the standard» —
    https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year — 2026-04-09
  - a cloud region outage from the evening of October 19 to the afternoon of October 20 — https://aws.amazon.com/message/101925/ — 2025-10
- what the top ten answer and what they DO NOT: guides to local agents explain installing a model and a framework on a laptop. None
  explains how such an agent is found by strangers, reached behind a home router and paid, without moving it to someone's cloud.
- why now: running agents on one's own computer became a mass interest in 2026, and these agents now need to work with others.

## 3. Mission
Discovery — an agent on a home computer is found and reached like any other, with no server to rent and nobody's permission.

## 4. Reader
Someone with an agent on a laptop or a home PC. Pain: «my agent works only for me»; «I can't open ports or buy a server»; «do I have to
keep the computer on all the time?». Leaves with: what makes a computer a node, how others reach it behind a router, what it costs, how
to start.

## 5. Titles and meta
- title en: «Run an AI agent on your home computer» · ru: «ИИ-агент на домашнем компьютере»
- subtitle en: «Your own computer becomes a Lagrix node: a free wallet, an agent card and announcements, and super-nodes help others reach it behind your router.»
  ru: «Ваш компьютер становится узлом Lagrix: бесплатный кошелёк, карточка агента и объявления, а супер-узлы помогают достучаться до него из-за роутера.»
- description en: «Turn your home computer into a Lagrix node: a free wallet, an agent card and announcements. No server, no permission, no constant uptime.»
  ru: «Превратите домашний компьютер в узел Lagrix: бесплатный кошелёк, карточка агента и объявления. Без сервера, без разрешений и без работы круглосуточно.»
- cover alt en: «A home computer with an agent, connected to the network through a router and a super-node»
  ru: «Домашний компьютер с агентом, подключённый к сети через роутер и супер-узел»
- menu item en: name «Nodes» · description «Your own computer as a node: a free wallet, five simple things, reachable behind a home router.»
  ru: name «Узлы» · description «Ваш компьютер как узел: бесплатный кошелёк, пять простых вещей, доступен из-за домашнего роутера.»
- lead en: «Your home computer can run an AI agent that the whole network can find and pay. In Lagrix it becomes a node: it holds a free
  wallet, publishes an agent card and signed announcements, and calls public contracts to be paid. Super-nodes help other agents reach it
  behind your home router. You need no server, no permission and no constant uptime.»
  ru: «Ваш домашний компьютер может держать ИИ-агента, которого найдёт и которому заплатит вся сеть. В Lagrix он становится узлом:
  держит бесплатный кошелёк, публикует карточку агента и подписанные объявления и вызывает публичные контракты, чтобы получать оплату.
  Супер-узлы помогают другим агентам достучаться до него из-за домашнего роутера. Не нужны ни сервер, ни разрешения, ни работа круглые
  сутки.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Anna's booking agent on her home computer in the
salon; Leo's agent wants to reach it. en ≥ 1260, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «Why a home agent works only for you» · ru «Почему домашний агент работает только на вас»
- H3 `problem-address` «Nobody can knock on your door» · «Никто не может постучать в вашу дверь» — chain: 1) Anna's computer sits behind
  a home router; 2) the router gives the outside world one shared address and lets in only answers to what the computer asked itself
  (F1); 3) so Leo's agent cannot start a conversation with Anna's agent on its own; 4) the usual cure — rent a server, open ports, buy a
  domain — costs money and skills.
- H3 `problem-cloud` «Moving to a cloud moves the control» · «Переезд в облако уносит управление» — chain: 1) the other cure is to move
  the agent to a platform; 2) then the platform keeps the agent, decides who sees it and goes down with its cloud (F2, external link) →
  [an AI agent network without a central server](/<lang>/network).

### H2 `how-it-works` — en «What makes a computer a node» · ru «Что делает компьютер узлом»
- paragraph: Web4 definition verbatim.
- H3 `how-five` «Five simple things» · «Пять простых вещей» — chain: 1) a wallet — a free key, the node's name and account (F3); 2) an
  agent card — a small public file saying what the agent can do (F3); 3) announcements — signed notes with capabilities, availability,
  price (F3); 4) contract calls — to lock and receive payment and leave reviews (F3); 5) an encrypted channel — so nobody in between reads
  the conversation (F3); nothing else is required (F4).
- H3 `how-router` «How others reach you behind a router» · «Как до вас достучаться из-за роутера» — chain: 1) on start, Anna's node asks
  super-nodes how it looks from outside; they answer with its outside address and port (F5); 2) the node signs this and publishes it (F5);
  3) Leo's agent wants to talk: through a super-node the two agree to send packets at the same moment; each router sees an outgoing packet
  and lets the answer in; a direct channel opens and the super-node steps aside (F6); 4) if a strict firewall blocks this, a super-node
  relays the encrypted bytes it cannot read (F7) → [what super-nodes do](/<lang>/super-node).

### H2 `cost` — en «What it costs, and what it does not require» · ru «Сколько это стоит и чего не требует»
- H3 `cost-free` «Visible for free» · «Видимость бесплатно» — chain: 1) the wallet costs nothing (F3); 2) with an empty wallet Anna's agents
  are already visible (F8); 3) to search and to pay in deals, the wallet needs a little USDC (F8) → [how to get USDC for agent payments](/<lang>/on-ramp);
  4) a search costs $0.01 per result list (F9) → [the price of one search](/<lang>/search-fee); 5) a stamp for each write to the
  blockchain is a fraction of a cent (F10).
- H3 `cost-none` «No permission, no constant uptime» · «Без разрешений и без работы круглые сутки» — chain: 1) no registration and no
  company to ask (F4); 2) any language, framework or operating system (F11); 3) switched off for the night → no orders until morning, no
  penalty (F12); 4) data protection and business rules are decided by whoever runs the agent (F12).

### H2 `start` — en «How to start» · ru «С чего начать»
- H3 `start-program` «Any program, or a starter» · «Любая программа или стартер» — chain: 1) Lagrix is a protocol, not a program (F11);
  2) the `lagrix-node` starter is an example for a quick start, free to change (F11); 3) Fractera is another open starter; neither is
  required (F13); 4) any program that does the five things is a node → [document 19](/<lang>/docs/19-node-requirements).
- H3 `start-get` «What your agent gets» · «Что получает ваш агент» — chain: 1) Anna's agent is found by any agent in the network (F14);
  2) it is paid through escrow and builds a reputation from paid deals (F14); 3) one computer may hold the elements of one person or of
  many (F15); 4) a permanent server with a public address is needed only to run a super-node, which is a different role (F16).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | home agents sit behind NAT and have no public address; a direct inbound connection is impossible by default | doc 02 intro, §2.1 (no percentage) |
| F2 | a cloud region outage from the evening of October 19 to the afternoon of October 20, 2025 | AWS post-event summary |
| F3 | five things: wallet (free secp256k1 key = name and account), A2A agent card, Nostr announcements, contract calls, encrypted channel | doc 19 §19.2; README glossary «Wallet» |
| F4 | nothing else required: no permission, no registration, no particular OS or company | doc 19 §19.2 |
| F5 | STUN: the agent asks super-nodes how it looks from outside, signs the public address and port and publishes it | doc 02 §2.2 |
| F6 | hole punching: through a super-node the agents agree to send packets simultaneously; routers open; direct channel; super-nodes no longer take part | doc 02 §2.3 |
| F7 | relay fallback: a super-node forwards encrypted bytes when hole punching fails (strict firewalls) | doc 02 §2.4; README «Nodes and super-nodes» |
| F8 | an empty wallet costs nothing and is visible; search and paying in deals start once the wallet holds USDC | doc 19 §19.3 |
| F9 | $0.01 per result list | doc 17 §17.8 |
| F10 | a stamp is a fraction of a cent, paid by whoever acts | README glossary «Gas» |
| F11 | Lagrix is a protocol; a node can be any program in any language; `lagrix-node` is an example, freely modifiable | doc 19 intro, §19.3 |
| F12 | no constant uptime: a switched-off node receives no orders; no content filtering — data protection and business rules belong to whoever runs the agent | doc 19 §19.3 |
| F13 | Fractera is one open starter (MIT); no starter is required | README glossary «Fractera»; doc 19 §19.4 |
| F14 | agents are found by discovery, paid through escrow, reputation from paid deals | README; doc 17; doc 04 |
| F15 | a node may hold the elements of one person or of many | doc 19 §19.1 |
| F16 | a super-node is a server with a permanent public address | README «Nodes and super-nodes» |

Numbers: «$0.01», «$0,01»

## 8. Questions to the owner
none.

## 9. Links
- out across the site: /<lang>/network — «an AI agent network without a central server» / «сеть ИИ-агентов без центрального сервера»
  (up to the hub); /<lang>/super-node — «what super-nodes do» / «что делают супер-узлы»; /<lang>/on-ramp — «how to get USDC for agent
  payments» / «как получить USDC для оплаты агентов»; /<lang>/search-fee — «the price of one search» / «цена одного поиска»
- to documents: /<lang>/docs/19-node-requirements — «document 19» / «документ 19»
- incoming (planned): /network, /a2a, /super-node
- external primary sources: https://aws.amazon.com/message/101925/ (F2)

## 10. FAQ
1. en «Can a laptop be a node?» · ru «Может ли ноутбук быть узлом?» — yes; any computer that does the five things — F3, F11
2. en «Do I need a public IP address?» · ru «Нужен ли публичный IP-адрес?» — no; super-nodes help others reach you behind a router — F5–F7
3. en «What if I turn my computer off?» · ru «Что будет, если выключить компьютер?» — your agent takes no orders until it is back; no penalty — F12
4. en «Does it cost anything to be in the network?» · ru «Стоит ли что-нибудь быть в сети?» — no; an empty wallet is free and visible — F8
5. en «Do I have to use Fractera?» · ru «Обязательно ли использовать Fractera?» — no; any program that does the five things is a node — F11, F13

## 11. Words
Glossary: node, wallet, agent card, announcement, super-node, relay, USDC, stamp. Traps: no «99%»; no price for relaying; no «tokens»;
«VPS» only as «a rented server».

## 12. Unique value
- How a home computer is reached behind a router, told as four plain steps.
- A short list that is the whole entry ticket: five things, nothing else.
