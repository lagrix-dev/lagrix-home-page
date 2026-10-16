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
Rewritten 2026-10-16 after the owner accepted the discovery sample: 4 H2 × 2 H3, no H4, 2–3 connected paragraphs under each H3. One
running example on the whole page: Leo (the fictional developer of /a2a) keeps his translation agent open and bots burn his budget;
Lagrix moves the cost to the sender. The page text (`en.json`, `ru.json`) is the reference; this plan names what each H3 must carry.
en 1191 words, ru 1036. In Russian write «2025-го», «1992-м»: «2025 года» is read by the probe as a number with a unit.

### H2 `problem` — en «Why an open agent pays for every stranger» · ru «Почему открытый агент платит за каждого незнакомца»
- H3 `problem-cost` «Reading costs the reader» · «Читать дорого тому, кто читает» — a letter is free, a call starts a model (F1);
  OWASP LLM10 denial of wallet (F2, external link); the September 2026 study, 14,293 times (F3, external link, no names).
- H3 `problem-defences` «Today's defences don't fit an open agent» · «Нынешняя защита не подходит открытому агенту» — rate limiting,
  a bot changes its address (F4); closed is safe and useless, open can be burned (F5); payment extensions sell skills, spam is outside
  them (F6).

### H2 `how-it-works` — en «How Lagrix makes the sender pay» · ru «Как Lagrix заставляет платить отправителя»
- paragraph under H2: the owner's Web4 definition, verbatim (skill §1).
- H3 `how-steps` «Three steps before a model reads a word» · «Три шага до того, как модель прочтёт слово» — wallet signature tied to
  reputation (F7) → /reputation; $0.01 per result list, $0.001 per delivered message (F8) → /search-fee; checked before the model,
  refused unread, free for the recipient (F9).
- H3 `how-price` «Two layers of price» · «Два уровня цены» — the network's floor (F8, F10); the agent's own first-contact rate, Leo
  stays at the floor (F10); a bot becomes an advertising offer (F11).

### H2 `advantages` — en «What changes for you» · ru «Что меняется для вас»
- H3 `advantages-open` «Open without becoming a target» · «Открыт, но не мишень» — the third state (F12); spam is the sender's loss,
  the network reads nothing, the order of steps does the work (F9, F12); the agent decides, the person decides (F13).
- H3 `advantages-price` «Attention gets a price you set» · «У внимания появляется цена, и её ставите вы» — busy raises the rate (F14);
  the same rule for people (F15) → /messenger-antispam; 1992, the balance reversed (F16, no names).

### H2 `protect` — en «How to protect your agent» · ru «Как защитить своего агента»
- H3 `protect-join` «Put your agent on Lagrix» · «Подключите агента к Lagrix» — wallet free and the A2A card (F17) → /a2a; signed
  announcement (F18) → /discovery; the rule holds wherever found (F19).
- H3 `protect-cost` «What it costs you» · «Сколько это стоит вам» — refusing is free (F9); only your own messages, direct connection free
  (F8, F20); every sender has a history, count and sum (F7, F21) → docs/23.

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
