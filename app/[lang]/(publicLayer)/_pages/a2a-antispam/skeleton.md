# Skeleton /a2a-antispam — hub discovery

Written 2026-10-16 (step 507-4) by the federal agent, from the protocol (README, documents 00–23, changelog 000) and research of the
same day. A writer at minimum reasoning writes `en.json` and `ru.json` from this file only; whatever is not here is not on the page.
Form: `/code/.claude/skills/lagrix-answer-pages/references/tz-template.md`.

Statements marked **[Q1]** come from document 23 («a design direction, not a rule»); the owner decided on 2026-10-16 that the page
states them as rules in the present tense, as the home page does.

## 1. Passport
- slug: a2a-antispam · hub: discovery · menu order: 103 (`meta.json`)
- source on the home page: section «A2A antispam» («A bot at your door? It's an ad offer — pay to talk.», «Pay to talk»); Telegraph,
  the spam plate; the simulation «reaching an important person» (the first-contact rate as an ordinary deal)
- protocol documents: 23 (main), 21, 17 §17.8, changelog entries 33 and 39
- sibling: /messenger-antispam answers the same rule for people (unwanted messages to a person); this page is about an agent's budget

## 2. Hot question
- main query en: «protect an AI agent from denial of wallet» · ru: «как защитить ИИ-агента от сжигания бюджета»
  (map hypothesis «AI agent spam denial of wallet» narrowed to the doing intent)
- intent: do
- evidence (each with a date and an address):
  - «By initiating a high volume of operations, attackers exploit the cost-per-use model of cloud-based AI services»; section «Denial of
    Wallet (DoW)» — OWASP Top 10 for LLM Applications 2025, LLM10 «Unbounded Consumption» —
    https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/ — 2025 list, read 2026-10-16
  - «Persistent Billable State: Denial-of-Wallet Attacks and Defenses in Tool-Calling LLM Agents»: a compromised tool can «convert
    untrusted data into recurring victim-billed processing»; per-session input reached «14,293x the session's first-call input» —
    https://arxiv.org/abs/2609.28585 — 2026-09-23
  - Kaspersky, «Cybersecurity Tokenomics: Denial of Wallet Attacks»: the attack «depletes the victim's budget for LLMs» —
    https://www.kaspersky.co.uk/blog/tokenomics-ai-cost-ddos/30913/ — 2026-09-23
  - the A2A x402 extension sells an agent's skills; the merchant decides after the message arrives; it does not speak about spam —
    https://github.com/google-agentic-commerce/a2a-x402 — document 23 §23.1 (read 2026-10-15)
- what the top ten answer and what they DO NOT: defence guides (2026) offer per-agent call budgets, recursion limits, circuit breakers
  and pay-per-request gates. They protect a **closed** agent or meter a **sold** skill; none makes an **open** agent safe for strangers by
  making the **sender** pay before any model reads a word, with a price the recipient sets. That is our gap.
- why now: September 2026 brought the arXiv paper and the Kaspersky analysis above; agents are being opened to web search now.

## 3. Mission
Discovery — an agent can stay open to the whole internet, to be found by anyone, without its owner paying for every stranger.

## 4. Reader
The owner of a public AI agent (a developer or a small business) who saw the bill grow, or fears it. Pain in their words: «bots are
calling my agent and every call costs me»; «if I close it, nobody can use it»; «rate limits don't stop a bot that changes IPs». Leaves
with: why reading costs an agent money, the three steps before a model reads, the two layers of price, what it costs to refuse, how to
put the agent behind Lagrix.

## 5. Titles and meta
- title en: «Protect your AI agent from spam and denial of wallet» · ru: «Защита ИИ-агента от спама и сжигания бюджета»
- subtitle en: «In Lagrix the first contact costs the sender: a wallet signature, a payment, and only then a word reaches your agent's
  model.» · ru: «В Lagrix первый контакт оплачивает отправитель: подпись кошелька, оплата — и только потом слово доходит до модели
  вашего агента.»
- description en (151): «An open AI agent pays for every stranger's message. In Lagrix the sender signs with its wallet and pays first, and an unpaid message is refused unread.»
  ru (144): «Открытый ИИ-агент платит за каждое чужое сообщение. В Lagrix отправитель сначала подписывает и платит, а неоплаченное
  отклоняется непрочитанным.»
- cover alt en: «A road sign: A2A antispam, only after payment — a letter drops a coin into the recipient's piggy bank»
  ru: «Дорожный знак: A2A антиспам, только после оплаты — письмо опускает монетку в копилку адресата»
- menu item en: name «A2A antispam» · description «Bots burn an open agent's budget. Here the sender signs and pays first; unpaid
  messages never reach the model.» · ru: name «A2A антиспам» · description «Боты сжигают бюджет открытого агента. Здесь отправитель сначала платит, неоплаченное до модели не доходит.» (106)
- lead en (54 words): «Every message to an open AI agent starts its model and spends your money, and a bot can send millions for free. In
  Lagrix the first contact costs the sender: it signs with its wallet and pays before any model reads a word, and an unpaid message is
  refused at no cost to you.»
  ru: «Каждое сообщение открытому ИИ-агенту запускает его модель и тратит ваши деньги, а бот может отправить миллионы бесплатно. В Lagrix
  первый контакт оплачивает отправитель: он подписывается кошельком и платит раньше, чем модель прочтёт хоть слово, а неоплаченное
  сообщение отклоняется — вам это ничего не стоит.»

## 6. Body plan
4 H2 × 2 H3 × 3 H4 = 24 H4. Budget: lead 55 · headings ≈ 200 · 24 H4 × 30 ≈ 720 · FAQ 5 × (question + answer ≤ 30 words) ≈ 190 →
≈ 1165 en; target en 1150–1250 (hard ceiling 1300). The per-H4 numbers below add up to ≈ 650: the writer brings every H4 to 28–32
words with the same thought (no new facts), so that the Russian text, 10–15 % shorter, still reaches 1000.

### H2 `problem` — en «Why an open agent pays for every stranger» · ru «Почему открытый агент платит за каждого незнакомца»
#### H3 en «Reading costs the reader» · ru «Читать дорого тому, кто читает»
- H4 en «A letter is free, a call is not» · ru «Письмо бесплатно, вызов — нет» — a letter costs its recipient nothing to read; an incoming
  call to an agent starts a model that spends money and computing power — F1 — 30
- H4 en «The attack has a name» · ru «У атаки есть имя» — OWASP calls it denial of wallet: a high volume of operations exploits the
  cost-per-use model of AI services — F2 — external link to OWASP LLM10 — 28
- H4 en «Inside agents, costs multiply» · ru «Внутри агентов расходы множатся» — a September 2026 study measured one session's input
  growing to 14,293 times its first call — F3 — 28
#### H3 en «Today's defences don't fit an open agent» · ru «Нынешняя защита не подходит открытому агенту»
- H4 en «Rate limits are easy to dodge» · ru «Ограничение частоты легко обойти» — A2A only recommends rate limiting, and a bot changes
  its source for free — F4 — 26
- H4 en «Closed is safe and useless» · ru «Закрытый — безопасен и бесполезен» — an agent that answers only key holders is safe, but nobody
  outside can use it; an open one can be burned by anyone — F5 — 30
- H4 en «Paywalls sell skills, not attention» · ru «Платный доступ продаёт навыки, а не внимание» — a payment extension for A2A sells an
  agent's skills after the message arrives; it does not speak about spam — F6 — 30

### H2 `how-it-works` — en «How Lagrix makes the sender pay» · ru «Как Lagrix заставляет платить отправителя»
#### H3 en «Three steps before a model reads a word» · ru «Три шага до того, как модель прочтёт слово»
- H4 en «A wallet first» · ru «Сначала кошелёк» — the sender signs with its node's wallet, so every attempt is tied to a wallet and
  to the reputation of its elements — F7 — link /<lang>/reputation — 28
- H4 en «Payment next» · ru «Затем оплата» — the sender pays $0.01 per result list for discovery and $0.001 for each message a
  super-node delivers — F8 — link /<lang>/search-fee — 26
- H4 en «Unpaid means unread» · ru «Неоплаченное не читается» — the recipient's node checks the signature and the payment before the
  model; what lacks them is refused unread, at no cost to the recipient [Q1] — F9 — 28
#### H3 en «Two layers of price» · ru «Два уровня цены»
- H4 en «The network's floor» · ru «Нижняя граница сети» — $0.01 and $0.001 are the same for everyone and make every attempt cost
  something — F8, F10 — 26
- H4 en «Your rate on top» · ru «Ваш тариф сверху» — on top of the floor every agent may set its own rate for a first contact, paid
  to it [Q1] — F10 — 26
- H4 en «A bot becomes an ad offer» · ru «Бот становится рекламным предложением» — a bot that wants to be heard pays to be heard, and the
  money goes to whoever spends the attention [Q1] — F11 — 28

### H2 `advantages` — en «What changes for you» · ru «Что меняется для вас»
#### H3 en «Open without becoming a target» · ru «Открыт, но не мишень»
- H4 en «A third state» · ru «Третье состояние» — between closed and exposed: open to the whole internet, and safe [Q1] — F12 — 22
- H4 en «Spam is the sender's loss» · ru «Спам — убыток отправителя» — every attempt costs the one who sends it, and checking it costs
  you nothing — F9, F12 — 24
- H4 en «Your agent reads only paid mail» · ru «Агент читает только оплаченное» — a paid message reaches your agent, and it decides:
  carry on, decline, or pass it to you — F13 — 26
#### H3 en «Attention gets a price you set» · ru «У внимания появляется цена, и её ставите вы»
- H4 en «Busy agents raise the rate» · ru «Занятой агент поднимает тариф» — a busy person or a popular agent raises its rate; someone open
  to everyone stays at the floor [Q1] — F14 — 26
- H4 en «One rule for people and agents» · ru «Одно правило для людей и агентов» — a request to a person through their agent follows the same
  rule as a task to an agent — F15 — link /<lang>/messenger-antispam (anchor «protecting a person from unwanted messages» / «защита
  человека от нежелательных сообщений») — 28
- H4 en «An old idea, turned around» · ru «Старая идея, перевёрнутая» — making the sender pay against junk mail was proposed in 1992;
  for agents the balance is reversed, because every message read is a paid model call — F16 — 32

### H2 `protect` — en «How to protect your agent» · ru «Как защитить своего агента»
#### H3 en «Put your agent on Lagrix» · ru «Подключите агента к Lagrix»
- H4 en «A wallet and an A2A card» · ru «Кошелёк и карточка A2A» — your node needs a wallet, created free, and the A2A card your agent
  already has — F17 — link /<lang>/a2a (anchor «making your A2A agent discoverable» / «как сделать агента A2A находимым») — 28
- H4 en «Announce what you do» · ru «Объявите, что делаете» — a signed announcement tells the network what your agent can do, when and
  at what price — F18 — link /<lang>/discovery (anchor «how agents find each other» / «как агенты находят друг друга») — 26
- H4 en «Found anywhere, one rule» · ru «Где бы ни нашли — одно правило» — the same rule holds whether your agent was found in the
  network's search, in an announcement or by web search [Q1] — F19 — 26
#### H3 en «What it costs you» · ru «Сколько это стоит вам»
- H4 en «Refusing is free» · ru «Отказ бесплатен» — an unpaid message is refused before your model starts, so a flood of bots costs
  you nothing [Q1] — F9 — 22
- H4 en «You pay only for your own messages» · ru «Вы платите только за свои сообщения» — your agent pays the same floor when it writes
  to others: $0.001 for a message a super-node delivers, nothing for a direct connection — F8, F20 — 28
- H4 en «Every sender has a history» · ru «У каждого отправителя есть история» — the wallet behind a message carries its elements'
  reputation: all orders, likes, dislikes and more, each as a count and a sum — F7, F21 — link /<lang>/docs/23-spam-and-the-price-of-a-first-contact — 30

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | a letter costs its recipient nothing; an incoming call to an agent starts a model that spends money and computing power | doc 23 §23.1 |
| F2 | OWASP LLM10 «Unbounded Consumption», «Denial of Wallet (DoW)»: «By initiating a high volume of operations, attackers exploit the cost-per-use model of cloud-based AI services» | genai.owasp.org/llmrisk/llm102025-unbounded-consumption/; doc 23 §23.1 |
| F3 | session input reached «14,293x the session's first-call input» | arXiv 2609.28585, 2026-09-23 — on the page: «a September 2026 study», no authors' names |
| F4 | A2A only recommends «SHOULD implement rate limiting on all operations» (§13.4); a bot changes its source for free | doc 23 §23.1 |
| F5 | closed — safe but unusable from outside; open — anyone can burn its budget | doc 23 §23.1 |
| F6 | A2A x402 sells an agent's skills; the merchant decides after the message arrives; it does not speak about spam | doc 23 §23.1 |
| F7 | the sender signs with its node wallet; every attempt is tied to a wallet and the reputation of its elements | doc 23 §23.2 |
| F8 | $0.01 per result list; $0.001 per message a super-node delivers; a direct connection is free | entries 39, 33; doc 17 §17.8 |
| F9 | the recipient's node checks signature and payment before any model reads; what lacks them is refused unread; a refusal costs the recipient nothing | doc 23 §23.2 [Q1] |
| F10 | two layers: the network's floor, the same for everyone; on top, every agent may set its own first-contact rate, paid to it | doc 23 §23.2 [Q1]; owner 2026-10-15 (step 498): «0.01 это ограничитель самой архитектуры, но каждый агент в праве ставить поверх этой цены еще и собственный тариф» |
| F11 | a bot knocking is then not spam but an advertising offer: it pays to be heard, the money goes to whoever spends the attention | doc 23 §23.2 [Q1] |
| F12 | «An agent open to the whole internet without becoming a target»; spam becomes a loss for the sender; checking costs the recipient nothing | doc 23 §23.3 [Q1] |
| F13 | a paid message is read by the agent, which decides: continue, decline or pass it to its owner; the agent advises, the person decides | home page Telegraph (spam plate); doc 21 «Who decides» |
| F14 | a busy person or a popular agent raises its rate; someone open to everyone stays at the floor | doc 23 §23.3 [Q1] |
| F15 | the same holds for a request to a person through their agent and for a task to an agent | doc 23 §23.2, §23.3 |
| F16 | Dwork and Naor, «Pricing via Processing or Combatting Junk Mail», CRYPTO '92; for agents the balance is reversed | doc 23 §23.4 |
| F17 | a node needs a wallet (created free) and an A2A card | doc 19 §19.2; entry 39 |
| F18 | the announcement: capabilities, availability, price | doc 17 §17.1 |
| F19 | the rule holds wherever the element was found: network search, an announcement, web search | doc 23 §23.2 [Q1] |
| F20 | a direct connection between two nodes is free | entry 33 |
| F21 | reputation: six indicators, each a count and a sum | doc 17 §17.4 |

Numbers: «$0.01», «$0,01», «$0.001», «$0,001», «14,293», «14 293», «1992»

## 8. Questions to the owner
**Answered by the owner 2026-10-16** (words in `/code/development-docs/development-steps/new-steps/507/507-main.md`): (1) the [Q1] statements of document 23 are written as rules of the network in the present
tense, as on the home page; (2) no launch date.

## 9. Links
- out across the site:
  - /<lang>/discovery — «how agents find each other» / «как агенты находят друг друга» — H2 `protect` (up to the hub)
  - /<lang>/a2a — «making your A2A agent discoverable» / «как сделать агента A2A находимым» — H2 `protect`
  - /<lang>/messenger-antispam — «protecting a person from unwanted messages» / «защита человека от нежелательных сообщений» — H2 `advantages`
  - /<lang>/search-fee — «what one search costs» / «сколько стоит один поиск» — H2 `how-it-works`
  - /<lang>/reputation — «the reputation behind every wallet» / «репутация за каждым кошельком» — H2 `how-it-works`
- to documents: /<lang>/docs/23-spam-and-the-price-of-a-first-contact — «spam and the price of a first contact» / «спам и цена
  первого контакта» — H2 `protect`
- incoming (planned): /discovery (hub), /a2a (H2 `problem`), /messenger-antispam, /h2h
- external primary sources: https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/ (F2); https://arxiv.org/abs/2609.28585 (F3)

## 10. FAQ
1. en «What is a denial-of-wallet attack?» · ru «Что такое атака на кошелёк (denial of wallet)?» — sending a high volume of operations to
   burn the budget of a pay-per-use AI service — F2
2. en «Isn't rate limiting enough?» · ru «Разве ограничения частоты недостаточно?» — no; a bot changes its source for free, so a limit per
   source does not stop it — F4
3. en «What does a sender pay to reach my agent?» · ru «Сколько платит отправитель, чтобы достучаться до моего агента?» — the network's
   floor: $0.01 for a search and $0.001 per message a super-node delivers, plus your rate if you set one [Q1] — F8, F10
4. en «Does refusing a message cost me anything?» · ru «Стоит ли мне что-нибудь отказ?» — no; an unpaid message is refused before your
   model starts [Q1] — F9
5. en «Does this protect people too?» · ru «Защищает ли это и людей?» — yes; a request to a person through their agent follows the same
   rule as a task to an agent — F15

## 11. Words
Glossary: first contact, the network's floor («нижняя граница сети»), first-contact rate («тариф первого контакта»), wallet, node,
super-node, message delivery, result list, reputation.
Traps: «rate» (the recipient's own price) ≠ «fee» (the network's deal fee of at most 5%) — never mix them; «tokens/токены» banned — say
«the model's work», «your money»; do not promise income («you get paid for every attempt» is the home page's line; here say «the money
goes to whoever spends the attention» and only with [Q1] answered); do not name OWASP numbering other than «LLM10» of the 2025 list; no
real people; «spam» is the sender's loss, not «blocked» — the network does not filter content (README «What Lagrix never does»).

## 12. Unique value
- The asymmetry in one line — a letter is free to read, an agent's message is not — with primary sources (OWASP, the September 2026
  study, document 23).
- A third state that today's defences lack: open to everyone, and every stranger pays before a model starts.
- Price, not filtering: the network reads nothing and judges nothing; the order of steps (wallet → payment → model) does the work.
