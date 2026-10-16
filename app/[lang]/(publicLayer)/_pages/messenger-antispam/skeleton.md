# Skeleton /messenger-antispam — hub messenger

Written 2026-10-16 (step 507-7) from document 23 §23.1–§23.4 (the paid first contact; two layers of price; the sender's loss), document 21 («Who decides», «Advantages»), changelog entries 33, 36, 39. Form: `references/tz-template.md`; chains of small steps (skill §5б); headings name the subject (§5в).

🔒 Sibling, not a copy: `/a2a-antispam` answers the same rule for an agent's budget (denial of wallet); this page answers it for a person's inbox. Word overlap is allowed here only in the rule itself.

🛑 Status: document 21 is a draft; the owner question on `/messenger` (§8) applies here too. Document 23 §23.2–§23.3 items marked [Q1] are design directions that the owner decided to state as rules in the present tense (2026-10-16).

## 1. Passport
- slug: messenger-antispam · hub: messenger · menu order: 137 (`meta.json`)
- source on the home page: section «A2A antispam» and the Telegraph spam plate
- protocol documents: 23, 21, 17, 03
- sibling: /a2a-antispam — the same rule for agents' budgets

## 2. Hot question
- main query en: «stop unwanted messages paid first contact» · ru: «защита от нежелательных сообщений: платный первый контакт»
- intent: do
- evidence (each with a date and an address):
  - one person received about 40 unsolicited agent emails in one week — https://aiweekly.co/alerts/ilands-70000-ai-agents-flood-inboxes-with-cold-pitches — 2026-09-16
  - a message from an agent starts a model that the owner pays for; the rule is in protocol document 23 §23.1 — https://github.com/lagrix-dev/lagrix — 2026-10-15
  - an open standard for private messages between people is RFC 9420 — https://www.rfc-editor.org/rfc/rfc9420 — 2023
- what the top ten answer and what they DO NOT: guides to inbox filters sort mail by content and sender. None makes the sender pay before the message is read, with a price the recipient may set on top of the network's floor.
- why now: unsolicited agent messages reached a named person in September 2026.

## 3. Mission
Honest reputation and discovery — the price of a first contact is the sender's, and a refused message costs the person nothing.

## 4. Reader
A person whose inbox fills with messages from agents. Pain: «I cannot read everything»; «filters miss what matters»; «refusing costs me time». Leaves with: who pays for a first contact, what the person's agent decides, what refusing costs, how to set a rate.

## 5. Titles and meta
- title en: «Stop unwanted messages: the paid first contact» · ru: «Защита от нежелательных сообщений: платный первый контакт»
- subtitle en: «The sender signs and pays first; an unpaid message never reaches your agent's reading.» · ru: «Отправитель подписывает и платит первым; неоплаченное сообщение до чтения вашим агентом не доходит.»
- description en: «In Lagrix an unwanted message costs the sender before anyone reads it. Refusing costs you nothing, and you can set your own price.»
- description ru: «В Lagrix ненужное сообщение стоит отправителю до того, как его кто-то прочтёт. Отказ вам ничего не стоит, а цену можно задать свою.»
- cover alt en: «A coin dropped by the sender into the recipient's box, before the letter opens» · ru: «Монетка от отправителя в ящике адресата, до того как письмо открыто»
- menu item en: name «Antispam» · description «The sender pays first; a refused message costs you nothing.»
- menu item ru: name «Антиспам» · description «Отправитель платит первым; отказ от сообщения вам ничего не стоит.»
- lead en: «Every message to a person starts someone's attention and costs someone's time. In Lagrix the sender signs and pays first. A message without that payment is refused before anyone reads it, and the person pays nothing for the refusal.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Ivan writes to Elena through the paid first contact; Elena's agent decides (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «Where unwanted messages come from» · ru «Откуда берутся нежелательные сообщения»
- H3 `problem-attention` «Every message takes someone's attention» — chain: 1) reading a message takes time (F1); 2) one agent platform sent one person about 40 emails in a week (F2); 3) so the inbox fills faster than a person can read.
- H3 `problem-cost` «Who pays for the reading» — chain: 1) in an agent network a message starts a model (F3); 2) the owner pays for that model's work (F3); 3) so an unpaid flood costs the owner money (F3).

### H2 `how-it-works` — en «How a paid first contact works» · ru «Как работает платный первый контакт»
- paragraph: Web4 definition verbatim.
- H3 `how-sign` «The sender signs and pays» — chain: 1) the sender's agent signs the message with its node's wallet (F4); 2) it pays $0.01 per result list to find your agent (F5); 3) and $0.001 for each message a super-node delivers (F5).
- H3 `how-agent` «Your agent decides» — chain: 1) the paid first contact reaches your agent (F6); 2) your agent reads it and passes it on with an assessment (F6); 3) if you say no, it is declined (F6).

### H2 `advantages` — en «What changes for the person» · ru «Что меняется для человека»
- H3 `adv-price` «A busy person sets a price» — chain: 1) on top of the network floor every agent may set its own first-contact rate (F7); 2) a busy person raises it, someone open to everyone stays at the floor (F7); 3) the money goes to the person who spends attention (F7).
- H3 `adv-refuse` «Refusing costs nothing» — chain: 1) an unpaid message is refused before your agent reads it (F8); 2) you pay nothing to refuse (F8); 3) a request to a person follows the same rule as a task to an agent (F9).

### H2 `protect` — en «Setting up your filter» · ru «Настройка фильтра»
- H3 `protect-floor` «The network floor and your rate» — chain: 1) the floor applies to everyone automatically (F5); 2) you set your own rate, if you want (F7); 3) you choose whom to bring to you and whom to decline (F6).
- H3 `protect-refused` «When a message is refused» — chain: 1) a refused message never reaches your model (F8); 2) the sender has paid the fees it chose to pay (F5); 3) spam becomes the sender's loss (F10).

- Step 512 (owner 2026-10-16: own first-contact rate above one cent, e.g. $1; for important people a prepayment — booking, consultation): H3 `adv-prepay` «A price that works as a prepayment» · «Цена как предоплата» — F512a, F512b.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | reading a message takes the recipient's time | general; no figure stated |
| F2 | about 40 unsolicited agent emails in a week to one person | press report, 2026-09-16 |
| F3 | a message from an agent starts a model whose cost the owner pays; an incoming call costs the owner money | doc 23 §23.1 |
| F4 | the sender signs with its node wallet; every attempt is tied to a wallet | doc 23 §23.2 |
| F5 | $0.01 per result list to find; $0.001 per message a super-node delivers | doc 17 §17.8; changelog 33 |
| F6 | the agent reads and passes on with its assessment; the person decides | doc 21 «Who decides» |
| F7 | two layers: the network floor for everyone, and an agent's own rate on top; a busy person raises it; the money goes to whoever spends attention [Q1] | doc 23 §23.2–§23.3 |
| F8 | the recipient's node checks the signature and payment before any model reads; refusal costs the recipient nothing [Q1] | doc 23 §23.2 |
| F9 | the same rule for a request to a person through their agent and for a task to an agent | doc 23 §23.2–§23.3 |
| F10 | spam is a loss for the sender; checking costs the recipient nothing [Q1] | doc 23 §23.3 |

| F512a | on top of the network floor every agent may set its own first-contact rate, paid to it; a busy person raises it (design direction) | doc 23 §23.2, §23.3 |
| F512b | a contact negotiated as paid work is an ordinary A2A deal with escrow and a receipt; booking deposit $5 and consultation $50 ($47.50 / $2.50) as on the home page | doc 21 «Relation to settlement»; home page simulations (501) |

Numbers: «$0.01», «$0,01», «$0.001», «$0,001», «40», «2026-09-16», «$1», «$5», «$50», «$47.50», «$47,50», «$2.50», «$2,50»

## 8. Questions to the owner
The same question as on `/messenger`: document 21 is a draft. The [Q1] statements of document 23 are written as rules in the present tense (decided 2026-10-16). Do these texts go live as they are? (Before the deploy, not before the local refresh.)

## 9. Links
- out across the site: /<lang>/messenger — «a private messenger guarded by your agent» / «приватный мессенджер под охраной агента» (up to the hub); /<lang>/h2h — «reach anyone through their AI agent» / «связаться через ИИ-агента»; /<lang>/h2a — «personal AI agent limits and rules» / «лимиты личного агента»; /<lang>/a2a-antispam — «protect an agent's budget» / «защита бюджета агента»; /<lang>/search-fee — «the price of one search» / «цена одного поиска»
- to documents: /<lang>/docs/23-spam-and-the-price-of-a-first-contact — «document 23» / «документ 23»
- incoming (planned): /messenger, /h2h, /a2a-antispam
- external primary sources: https://aiweekly.co/alerts/ilands-70000-ai-agents-flood-inboxes-with-cold-pitches (F2, secondary)

## 10. FAQ
1. en «What does a first contact cost the sender?» · ru «Сколько стоит первый контакт для отправителя?» — the network floor, plus your rate if you set one — F5, F7
2. en «Does refusing cost me?» · ru «Стоит ли мне что-то отказ?» — no — F8
3. en «Who reads a message first?» · ru «Кто читает сообщение первым?» — your agent, after the sender has paid — F4, F6
4. en «Does this protect people as well?» · ru «Защищает ли это людей?» — yes; a request to a person follows the same rule — F9
5. en «Can I set my own price?» · ru «Можно ли назначить свою цену?» — yes, on top of the floor — F7

## 11. Words
Glossary: first contact, network floor, first-contact rate, wallet, node, super-node, delivery. Traps: «rate» (the recipient's own price) ≠ «fee» (the network's deal fee of at most 5%); never «blocked» for content (the network does not filter content); no real person in examples; no promise of income.

## 12. Unique value
- The price of a first contact, paid before reading, is the only filter that works the same for every stranger.
- Refusing costs the person nothing, and the sender's loss is visible in one line.
