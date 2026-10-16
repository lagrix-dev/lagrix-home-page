# Skeleton /h2a — hub messenger

Written 2026-10-16 (step 507-7) from document 21 (H2A, «Three connections», «Who decides», «Limits of this design»), changelog entry 39 (node wallet), document 19 §19.2, document 23 §23.2 (the agent's first-contact rate). Form: `references/tz-template.md`; chains of small steps (skill §5б); headings name the subject (§5в).

🛑 Status: document 21 is a draft; the owner question on `/messenger` (§8) applies here too.

## 1. Passport
- slug: h2a · hub: messenger · menu order: 136 (`meta.json`)
- source on the home page: H2A card «You and your agent»
- protocol documents: 21, 19, 23

## 2. Hot question
- main query en: «personal AI agent limits and rules» · ru: «личный ИИ-агент: лимиты и правила»
- intent: do
- evidence (each with a date and an address):
  - one person received about 40 unsolicited emails from agents in one week — https://aiweekly.co/alerts/ilands-70000-ai-agents-flood-inboxes-with-cold-pitches — 2026-09-16
  - agents that act alone on a person's behalf need limits: the owner sets how much the agent may spend and what it must not do — protocol document 21 — https://github.com/lagrix-dev/lagrix — 2026-10-13
  - an open standard for private messages between people is RFC 9420 — https://www.rfc-editor.org/rfc/rfc9420 — 2023
- what the top ten answer and what they DO NOT: guides to personal AI assistants list features and prompts. None sets the limits of an agent that acts for a person in dollars, names the partners it must refuse, and keeps the final yes with the owner.
- why now: agents now act for people in open networks, so the limits have to be set before the first contact, not after.

## 3. Mission
Honest reputation — the owner sets the limits, the agent works inside them, and every deal leaves a record.

## 4. Reader
Someone who wants an agent that works for them, and who does not want it to spend money or talk to strangers without a say. Pain: «what if it spends everything?»; «what if it talks to someone I would never talk to?». Leaves with: what the agent decides alone, the limits they set, the rule that keeps the yes with them.

## 5. Titles and meta
- title en: «Your personal AI agent: limits and rules» · ru: «Ваш личный ИИ-агент: лимиты и правила»
- subtitle en: «You build the agent and set its limits: how much it may spend, what it must never do and with whom it must not work.» · ru: «Вы создаёте агента и задаёте его границы: сколько он может потратить, чего ему нельзя делать и с кем не работать.»
- description en: «Your personal AI agent works inside limits you set: spending, forbidden actions and partners. It never talks to a stranger alone.»
- description ru: «Ваш личный ИИ-агент работает в границах, которые задаёте вы: расходы, запрещённые действия и партнёры. С незнакомцем он один не говорит.»
- cover alt en: «A personal agent inside a fence of limits, with a person holding the gate» · ru: «Личный агент внутри ограды границ, у ворот — человек»
- menu item en: name «H2A» · description «Your own agent: the limits you set, and what it decides alone.»
- menu item ru: name «H2A» · description «Ваш агент: границы, которые задаёте вы, и то, что он решает сам.»
- lead en: «Your personal agent works for you inside limits you set. You decide how much it may spend, what it must never do and with whom it must not work. Everything else it does by itself, and it never opens a conversation with a stranger on its own.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon, her agent in the front room; limits set in dollars and partners (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «Who sets the limits of your personal agent» · ru «Кто задаёт границы вашего личного агента»
- H3 `problem-new` «A new agent starts with nothing» — chain: 1) you create the agent and teach it what you do (F1); 2) it knows nothing of your clients or prices at first (F1); 3) you give it the facts it needs (F1).
- H3 `problem-who` «Who may talk to whom» — chain: 1) a person talks only to their own agent (F2); 2) the agent talks to other agents, never to other people directly (F2); 3) so every first contact starts with an agent (F2).

### H2 `how-it-works` — en «How you set the agent's limits» · ru «Как задать агенту границы»
- paragraph: Web4 definition verbatim.
- H3 `how-money` «Limits: spending, forbidden actions, partners» — chain: 1) how much it may spend, in dollars (F3); 2) what it must never do (F3); 3) with whom it must not work (F3).
- H3 `how-strict` «How strict the agent is» — chain: 1) you decide which requests reach you at all (F4); 2) the agent declines the rest by itself (F4); 3) the agent advises, you decide (F4).

### H2 `control` — en «What your agent decides alone» · ru «Что агент решает сам»
- H3 `alone-inside` «Inside your limits» — chain: 1) it does the work alone (F2); 2) every deal it makes is a normal paid deal with escrow and a receipt (F5); 3) your agent's reputation grows from paid deals (F5).
- H3 `alone-stranger` «Strangers come only through a yes» — chain: 1) it never opens a conversation with a stranger on its own (F4); 2) a contact appears only when you say yes (F4); 3) each person can make the agent stricter (F4).

### H2 `start` — en «How to create your agent» · ru «Как создать своего агента»
- H3 `start-steps` «The first steps» — chain: 1) you create the agent on your node, with its wallet (F6); 2) you teach it what you offer and what you refuse (F1); 3) you set the limits (F3); 4) you publish its announcement only if you want to be found (F7).
- H3 `start-data` «Where its history lives» — chain: 1) the history stays on your node (F8); 2) no company keeps it (F8); 3) a node lost without a backup takes its history with it (F8).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | the owner creates the agent, teaches it and sets its limits; at first it knows nothing of the owner's contacts | doc 21 «Three connections» |
| F2 | a person talks only to their own agent; agents talk to agents; people never reach strangers except through a stranger's agent | doc 21 «Three connections» |
| F3 | the owner sets how much the agent may spend, what it must not do and with whom it must not work | doc 21 «Three connections» |
| F4 | which requests to bring, which to decline without asking; a contact appears only when its owner says yes; the agent advises, the person decides | doc 21 «Who decides» |
| F5 | an agent's deal is an ordinary A2A deal with escrow and a receipt; reputation follows paid deals | doc 21 «Relation to settlement»; doc 17 |
| F6 | every node has a wallet, free, the node's key and account | changelog 39; doc 19 §19.2 |
| F7 | the announcement names topics, languages and an optional region; no personal data | changelog 36 |
| F8 | history stays on each participant's node; a node lost without a backup loses its history | doc 21 «Limits of this design», step 5 |

Numbers: none (no figures on this page; the limits are set by the owner, not stated here).

## 8. Questions to the owner
The same question as on `/messenger`: document 21 is a draft. Do these texts, which state the agent rules in the present tense, go live as they are? (Before the deploy, not before the local refresh.)

## 9. Links
- out across the site: /<lang>/messenger — «a private messenger guarded by your agent» / «приватный мессенджер под охраной агента» (up to the hub); /<lang>/h2h — «reach anyone through their AI agent» / «связаться через ИИ-агента»; /<lang>/messenger-antispam — «stop unwanted messages» / «защита от нежелательных сообщений»; /<lang>/nodes — «run a node on your own computer» / «узел на своём компьютере»
- to documents: /<lang>/docs/21-h2a-h2h-people-through-agents — «document 21» / «документ 21»
- incoming (planned): /messenger, /h2h, /nodes
- external primary sources: none beyond the protocol for this page

## 10. FAQ
1. en «What can my agent spend?» · ru «Сколько может потратить мой агент?» — only what you set, in dollars — F3
2. en «Can my agent talk to a stranger alone?» · ru «Может ли агент говорить с незнакомцем сам?» — no; a contact appears only with your yes — F4
3. en «Who decides what my agent does?» · ru «Кто решает, что делает мой агент?» — you set the limits; it advises and decides only inside them — F3, F4
4. en «Does my history go to a company?» · ru «Уходит ли моя история к компании?» — no; it stays on your node — F8
5. en «Do I need a server to have an agent?» · ru «Нужен ли сервер, чтобы иметь агента?» — no; a home computer is enough — F6

## 11. Words
Glossary: H2A, agent, node, wallet, limits, escrow, receipt, announcement. Traps: never «autonomous» in the sense of «without you»; never «tokens»; no promise that the agent earns money; no real person in examples.

## 12. Unique value
- The limits of a personal agent written in the three terms that matter most: money, forbidden actions, partners.
- One rule that keeps the final yes with the person, in one sentence.
