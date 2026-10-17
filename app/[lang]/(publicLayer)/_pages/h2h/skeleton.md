# Skeleton /h2h — hub messenger

Written 2026-10-16 (step 507-7) from document 21 (H2H, «How a conversation travels», «Limits»), changelog entries 33 and 36, document 17 §17.11, document 02 §2.2–§2.4. Form: `references/tz-template.md`; chains of small steps (skill §5б); headings name the subject (§5в).

🛑 Status: document 21 is a draft; see the owner question on `/messenger` (§8). Same question applies here.

## 1. Passport
- slug: h2h · hub: messenger · menu order: 135 (`meta.json`)
- source on the home page: H2H card «Reach the people who would never answer»
- protocol documents: 21, 17, 02, 03

## 2. Hot question
- main query en: «reach anyone through their AI agent» · ru: «связаться с занятым человеком через ИИ-агента»
- intent: do
- evidence (each with a date and an address):
  - a cold message to a busy person is read last: the engineer in the document receives thousands of messages — protocol document 21 «Why» — https://github.com/lagrix-dev/lagrix — 2026-10-13
  - an open standard for private group and one-to-one messages: https://www.rfc-editor.org/rfc/rfc9420 — 2023
  - one person received about 40 unsolicited agent emails in one week — https://aiweekly.co/alerts/ilands-70000-ai-agents-flood-inboxes-with-cold-pitches — 2026-09-16
- what the top ten answer and what they DO NOT: pages about cold outreach teach templates. None lets a busy person judge a request by its merit before it reaches them.
- why now: agents now write to people unasked, so a request must arrive already judged.

## 3. Mission
Discovery — a person is found only if they want to be, and a request reaches them judged by their own agent.

## 4. Reader
Someone with something worth saying to a busy person, who wants a real answer. Pain: «my message is never read»; «I cannot reach the person I need». Leaves with: how a request travels, what the other agent checks, what the owner sees, what it costs.

## 5. Titles and meta
- title en: «Reach anyone through their AI agent» · ru: «Связаться с человеком через его ИИ-агента»
- subtitle en: «Your agent brings your request to their agent, and the conversation opens only when the other owner says yes.» · ru: «Ваш агент приносит запрос их агенту, а разговор открывается только тогда, когда владелец второй стороны скажет «да».»
- description en: «Reach a busy person through their agent. Your request arrives judged on its merit, and the conversation opens only on their yes.»
- description ru: «Свяжитесь с занятым человеком через его агента. Запрос приходит уже с оценкой, а разговор открывается только по его «да».»
- cover alt en: «A request carried from one agent to another, then a person's yes» · ru: «Запрос, переданный от агента к агенту, и «да» человека»
- menu item en: name «H2H» · description «Reach a busy person through their agent: judged first, then a yes.»
- menu item ru: name «H2H» · description «Связь с занятым человеком через его агента: сначала оценка, потом «да».»
- lead en: «A cold message to a busy person is often never read. In Lagrix your agent takes your request to their agent, which checks it and brings it to its owner with an assessment. The conversation opens only if the owner agrees.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: an inventor, Ivan, wants to show an engine design to an engineer, Elena (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «How cold messages reach busy people» · ru «Как холодное сообщение доходит до занятого человека»
- H3 `problem-thousands` «A cold message is read last» — chain: 1) Ivan wants to show his design to Elena; 2) Elena receives thousands of messages (F1); 3) a stranger's message is read last or never.
- H3 `problem-company` «The company keeps the route» — chain: 1) a company messenger routes every message and may keep it (F2); 2) so reaching Elena depends on that company (F2); 3) H2H has no such server (F3).

### H2 `how-it-works` — en «How an H2H request travels» · ru «Как запрос H2H проходит путь»
- paragraph: Web4 definition verbatim.
- H3 `how-finding` «Your agent finds hers» — chain: 1) Ivan's agent asks the network for Elena's agent (F4); 2) it finds only agents whose owners published an «accepting requests» announcement (F4); 3) the super-node gives an address, never the content (F4).
- H3 `how-judged` «Her agent checks it first» — chain: 1) Elena's agent reads the request and the attached drawings (F5); 2) it checks them against what Elena cares about (F5); 3) it brings the request with its assessment (F5); 4) Elena says yes or no (F5).

### H2 `what-she-sees` — en «What the owner sees» · ru «Что видит владелец»
- H3 `see-summary` «A short honest summary, not a cold message» — chain: 1) the request says who asks, why, and what is attached (F6); 2) the assessment says whether it fits Elena (F5); 3) Elena decides in seconds, not after reading thousands.
- H3 `see-private` «Then the conversation, encrypted» — chain: 1) on yes the two nodes connect directly or through a relay (F7); 2) MLS encrypts the conversation (F8); 3) the history stays on the two nodes (F9).

### H2 `cost` — en «What it costs» · ru «Сколько это стоит»
- H3 `cost-search` «Finding costs a cent» — chain: 1) the search for Elena's agent costs $0.01 per result list (F10); 2) a repeat contact costs nothing (F10).
- H3 `cost-delivery` «Delivery to an offline person» — chain: 1) a direct connection is free (F11); 2) a super-node holding the message for an offline recipient costs $0.001 per delivered message (F11).

- Step 512 (owner 2026-10-16: own first-contact rate above one cent, e.g. $1; for important people a prepayment — booking, consultation): H3 `cost-rate` «Her own rate» · «Её собственный тариф» — F512a, F512b.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | a busy engineer receives thousands of messages; a cold message would never be read | doc 21 «Why» |
| F2 | a company messenger runs on servers that route every message and can keep it | doc 21 «What it is not» |
| F3 | no central server; the dialogue lives only on the two nodes | doc 21 «What it is not» |
| F4 | finding by announcement only, with «accepting requests»; the super-node gives an address, never the content | doc 21 «How a conversation travels»; doc 17 §17.11 |
| F5 | the other agent reads, checks against the owner's interests and brings the request with its assessment; the owner decides | doc 21 «Why», «Who decides» |
| F6 | the request names who asks, why and what is attached; fields fixed at implementation | doc 21 «Open questions»; changelog 36 |
| F7 | direct connection first; NAT traversal; relay that sees only encrypted bytes | doc 21 step 2; doc 02 |
| F8 | MLS, RFC 9420 (IETF, 2023); the key changes with every message | doc 21 step 3; RFC 9420 |
| F9 | history stays on each participant's node | doc 21 step 5 |
| F10 | search costs $0.01 per result list; repeated contact with a known party costs nothing | doc 17 §17.8; changelog 36 |
| F11 | direct connection free; delivered message $0.001 | changelog 33 |

| F512a | on top of the network floor every agent may set its own first-contact rate, paid to it; a busy person raises it (design direction) | doc 23 §23.2, §23.3 |
| F512b | a contact negotiated as paid work is an ordinary A2A deal with escrow and a receipt; booking deposit $5 and consultation $50 ($47.50 / $2.50) as on the home page | doc 21 «Relation to settlement»; home page simulations (501) |

Numbers: «$0.01», «$0,01», «$0.001», «$0,001», «2023», «$1»

## 8. Questions to the owner
The same question as on `/messenger`: document 21 is a draft. Do these texts, which state the request rules in the present tense, go live as they are? (Before the deploy, not before the local refresh.)

## 9. Links
- out across the site: /<lang>/messenger — «a private messenger guarded by your agent» / «приватный мессенджер под охраной агента» (up to the hub); /<lang>/h2a — «personal AI agent limits and rules» / «лимиты личного агента»; /<lang>/messenger-antispam — «stop unwanted messages» / «защита от нежелательных сообщений»; /<lang>/search-fee — «the price of one search» / «цена одного поиска»; /<lang>/official-agents — «the Official mark, which shows that the agent is really hers» / «метка «Официальный», которая показывает, что агент действительно её» — H3 `how-finding` (added 2026-10-17, step 515-3)
- to documents: /<lang>/docs/21-h2a-h2h-people-through-agents — «document 21» / «документ 21»
- incoming (planned): /messenger, /h2a, /discovery
- external primary sources: https://www.rfc-editor.org/rfc/rfc9420 (F8)

## 10. FAQ
1. en «How do I reach a busy person?» · ru «Как связаться с занятым человеком?» — through their agent, with a request it can judge — F4, F5
2. en «Will my request be read?» · ru «Прочитают ли мой запрос?» — by their agent first, then by them, if the agent brings it — F5
3. en «Can I reach someone without their yes?» · ru «Можно ли связаться без его «да»?» — no — F5, F6
4. en «Is the conversation private?» · ru «Разговор приватный?» — yes; encrypted and kept on the two nodes — F8, F9
5. en «What does it cost?» · ru «Сколько это стоит?» — finding $0.01 per result list; a delivered message $0.001 — F10, F11

## 11. Words
Glossary: H2H, H2A, announcement, accepting requests, agent, node, relay, MLS. Traps: never «guaranteed reply»; never «tokens»; no real person in examples (fictional names only); no promise that the owner will say yes.

## 12. Unique value
- A request that arrives already judged, with the reason in one line for the person who decides.
- The first answer to «who can write to me» is the agent's, not the company's.
