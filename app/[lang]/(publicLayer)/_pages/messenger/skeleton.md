# Skeleton /messenger — hub messenger

Written 2026-10-16 (step 507-7) from document 21 (H2A, H2H; status: draft), changelog entries 33, 36, 39, document 03, document 23 §23.2–§23.3, README glossary «Node», «Wallet». Form: `references/tz-template.md`; every event is a chain of small steps (skill §5б); headings name the subject (§5в).

🛑 Status: document 21 says «draft specification … nothing here is implemented yet». The page describes the network rules in the present tense, as the owner asked for other pages (skill §5а). Owner question in §8 — must be answered BEFORE the deploy, not before the local refresh.

## 1. Passport
- slug: messenger · hub: itself · menu order: 130 (`meta.json`)
- source on the home page: «Messenger»; the H2H and H2A cards
- protocol documents: 21, 03, 23, 17

## 2. Hot question
- main query en: «private messenger through AI agents» · ru: «мессенджер через ИИ-агентов»
- intent: learn
- evidence (each with a date and an address):
  - MLS, the open IETF standard for group and one-to-one encryption, is RFC 9420, published in 2023 — https://www.rfc-editor.org/rfc/rfc9420 — 2023
  - end-to-end encrypted RCS messaging began rolling out to iPhone and Android users on 11 May 2026 — https://blog.google/products-and-platforms/platforms/android/android-ios-end-to-end-encrypted-rcs-messaging — 2026-05-11
  - one person received about 40 unsolicited emails in one week from an agent platform with about 70,000 agents — https://aiweekly.co/alerts/ilands-70000-ai-agents-flood-inboxes-with-cold-pitches — 2026-09-16 (secondary press report)
- what the top ten answer and what they DO NOT: messenger reviews compare company apps by features. None says who may write to you, and none separates encryption from the question of who gets to ask.
- why now: encryption reaches the default messages on phones, and unsolicited agent messages reached a named person in the same month.

## 3. Mission
Honest reputation and discovery — people reach each other through their agents, and a stranger reaches a person only through an agent that the person let in.

## 4. Reader
A person who is tired of messages from strangers and wants to be reachable by people worth their time. Pain: «my inbox is full»; «busy people never answer»; «I don't trust the company that keeps my messages». Leaves with: the three kinds of connection, who decides, how the conversation is kept private, what it costs.

## 5. Titles and meta
- title en: «A private messenger guarded by your agent» · ru: «Приватный мессенджер под охраной вашего агента»
- subtitle en: «People reach each other only through their agents, and only when the other side agrees.» · ru: «Люди связываются только через своих агентов и только тогда, когда другая сторона согласна.»
- description en: «In Lagrix a person reaches another person only through their agents, and only when the other side's owner says yes. Encrypted end to end.»
- description ru: «В Lagrix человек пишет другому человеку только через своих агентов и только с согласия его владельца. Шифрование от конца до конца.»
- cover alt en: «Two people, each with an agent between them, talking after a yes» · ru: «Два человека, между ними агенты, разговор после «да»»
- menu item en: name «Messenger» · description «People reach each other through their agents, and only after a yes.»
- menu item ru: name «Мессенджер» · description «Люди связываются через своих агентов и только после «да».»
- lead en: «In Lagrix a conversation between two people starts between their agents, and it opens only when the other owner agrees. Every message stays encrypted end to end, and no company's server is needed to route it.»

## 6. Body plan
4 H2 × 2–3 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Maria, who wants a busy translator; both agents act for them. en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «How people write to each other today» · ru «Как люди пишут друг другу сейчас»
- H3 `problem-company` «Every message passes through someone's server» — chain: 1) a company messenger routes each message and can keep a copy (F1); 2) the user has no say in where it goes; 3) encryption alone does not decide who may write (F2).
- H3 `problem-spam` «Encryption grows, and so does unwanted mail» — chain: 1) RCS encryption rolls out on 11 May 2026 (F2); 2) one person got about 40 agent emails in a week (F3); 3) a locked envelope still reaches the door.

### H2 `how-it-works` — en «How the messenger works through agents» · ru «Как работает мессенджер через агентов»
- paragraph: Web4 definition verbatim.
- H3 `how-agents` «Two people, two agents in between» — chain: 1) three kinds of connection: person–agent, agent–agent, person–person (F4); 2) an agent never connects to the other owner directly (F4); 3) the nodes connect directly or through a relay that sees only encrypted bytes (F5).
- H3 `how-decides` «The other agent checks, the owner decides» — chain: 1) the other agent checks the request against its owner's interests (F6); 2) it brings the request with its assessment (F6); 3) a conversation opens only on the owner's yes (F6).
- H3 `how-private` «Encrypted, and kept on your node» — chain: 1) MLS, RFC 9420 (F7); 2) the key changes with every message (F7); 3) the node key is signed by its wallet (F8); 4) super-nodes hold no private keys (F8).

### H2 `control` — en «What you control, what the agent decides» · ru «Что решаете вы, а что агент»
- H3 `control-you` «What you decide yourself» — chain: 1) you set spending, forbidden actions and partners (F6); 2) you decide which requests reach you (F6); 3) the last word on each contact stays with you (F6).
- H3 `control-agent` «What the agent decides alone» — chain: 1) inside your limits it filters and checks requests (F6); 2) it never opens a conversation with a stranger on its own (F6); 3) it advises, you decide.

### H2 `start` — en «Starting with a messenger in Lagrix» · ru «Как начать пользоваться мессенджером в Lagrix»
- H3 `start-agent` «Start with your own agent» — chain: 1) create and teach the agent (F6); 2) set its limits (F6); 3) publish an «accepting requests» announcement only if you want to be found (F9).
- H3 `start-costs` «What it costs» — chain: 1) a direct connection is free (F10); 2) a delivered message costs $0.001 (F10); 3) finding costs $0.01 per result list (F11).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | a company messenger runs on company servers that route every message and can keep it | doc 21 «What it is not» |
| F2 | RCS end-to-end encryption rollout began 11 May 2026 | Google blog, 2026-05-11 |
| F3 | about 40 unsolicited emails from agents in one week to one person | press report, 2026-09-16 |
| F4 | three connections: H2A, A2A, H2H; an agent never connects to the other owner directly | doc 21 «Three connections» |
| F5 | direct connection first, NAT traversal, relay that sees only encrypted bytes | doc 21 «How a conversation travels»; doc 02 |
| F6 | the agent advises, the person decides; a contact appears only when its owner says yes; the agent never opens a conversation with a stranger alone | doc 21 «Who decides»; «Three connections» |
| F7 | MLS, RFC 9420 (IETF, 2023); the key changes with every message | doc 21 step 3; changelog 33; RFC 9420 |
| F8 | the node key is signed by its wallet; super-nodes hold no private keys | changelog 33 |
| F9 | the announcement names topics, languages and an optional region; no name or phone number | changelog 36; doc 17 §17.11 |
| F10 | direct connection free; a delivered message costs $0.001 | changelog 33; doc 21 step 4 |
| F11 | finding costs $0.01 per result list | changelog 36; doc 17 §17.8 |

Numbers: «$0.001», «$0,001», «$0.01», «$0,01», «11 May 2026», «11 мая 2026-го», «2023», «2026-09-16»

## 8. Questions to the owner
Document 21 is a draft and says that nothing is implemented. Do the texts of the messenger hub and its three pages, which state the network rules in the present tense, go live as they are? (Asked before the deploy; the local refresh is not publication.)

## 9. Links
- out across the site: /<lang>/h2h — «reach anyone through their AI agent» / «связаться через ИИ-агента»; /<lang>/h2a — «personal AI agent limits and rules» / «лимиты личного агента»; /<lang>/messenger-antispam — «stop unwanted messages» / «защита от нежелательных сообщений»; /<lang>/discovery — «how agents find each other» / «как агенты находят друг друга»
- to documents: /<lang>/docs/21-h2a-h2h-people-through-agents — «document 21» / «документ 21»
- incoming (planned): /h2h, /h2a, /messenger-antispam, /discovery
- external primary sources: https://www.rfc-editor.org/rfc/rfc9420 (F7)

## 10. FAQ
1. en «Can anyone write to me?» · ru «Может ли мне написать любой?» — only through an agent you let in — F4, F6
2. en «Is the messenger encrypted?» · ru «Шифруется ли переписка?» — yes, end to end with MLS — F7
3. en «Does a company store my messages?» · ru «Хранит ли компания мои сообщения?» — no company is in the middle — F1, F8
4. en «What does a message cost?» · ru «Сколько стоит сообщение?» — a direct message is free; a delivered one costs $0.001 — F10
5. en «Who decides who I talk to?» · ru «Кто решает, с кем я говорю?» — you do — F6

## 11. Words
Glossary: H2A, H2H, A2A, agent, node, wallet, MLS, announcement, super-node, relay. Traps: never «blockchain messenger»; never «tokens»; no claim that the messenger is available today; no name of a competing messenger.

## 12. Unique value
- The question «who may write to me» answered before «how is it encrypted», with the same agent in both answers.
- A person reaches a person only through a stranger's agent, in one picture.
