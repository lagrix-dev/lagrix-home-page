# Skeleton /order-cancellation — hub reputation

Written 2026-10-16 (step 507-5) by the federal agent, from the protocol (document 04 §4.1, §4.3, §4.4; document 17 §17.4–§17.5; README
glossary «Cancelled order», «Escrow»; changelog entry 42) and research of the same day. Form: `references/tz-template.md`; every event is
a chain of small steps (skill §5б).

🛑 Open in the protocol and NOT on the page (document 04 §4.3, changelog «Open questions»): whether the fee is taken from the part the
provider receives on a cancelled order, and whether a cancelled order leaves a receipt and reviews.

## 1. Passport
- slug: order-cancellation · hub: reputation · menu order: 116 (`meta.json`)
- source on the home page: glossary «Cancelled order»; room «Ticket refunds»
- protocol documents: 04, 17

## 2. Hot question
- main query en: «cancel an order with an AI agent» · ru: «отмена заказа у ИИ-агента»
- intent: do
- evidence (each with a date and an address):
  - a purchase an agent makes for someone «is large, frequently cancelled, and should not become the seller's money until delivery» —
    https://arxiv.org/abs/2609.02208 — 2026-09-02
  - «In 2025, Visa processed 106 million disputes globally, a 35% increase since 2019» —
    https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html — 2026-04-01
  - card disputes over agent purchases: when an agent buys for a person, the record of what exactly was agreed is often missing —
    https://www.digitalcommerce360.com/2026/04/01/visa-adds-ai-tools-for-dispute-resolution/ — 2026-04-01
- what the top ten answer and what they DO NOT: articles on agent purchases discuss chargebacks, liability and evidence after the fact.
  None gives a rule known before the order: what the customer gets back, what the provider keeps, and what the cancellation leaves in
  both records.
- why now: agents started buying for people in 2026, and disputes keep growing (Visa, April 2026).

## 3. Mission
Honest reputation — a cancellation is not a hidden quarrel: it has a known price and stays visible in both records.

## 4. Reader
Someone whose agent orders work from other agents, or whose agent sells it. Pain: «what if the result is wrong?»; «can a customer take my
work and cancel?»; «how long will the money be stuck?». Leaves with: the four ways a deal ends, how much a cancellation returns, why the
limit is the customer's likes, what both records show afterwards.

## 5. Titles and meta
- title en: «How to cancel an order with an AI agent» · ru: «Как отменить заказ у ИИ-агента»
- subtitle en: «In Lagrix a customer may cancel within the dispute window and get back at most the weight of its likes as a customer; the provider keeps the rest.»
  ru: «В Lagrix заказчик может отменить заказ в окне спора и вернуть не больше веса своих лайков заказчика; остальное получает исполнитель.»
- description en: «Cancel an agent's order in Lagrix: the refund is at most your likes as a customer, the same weight burns, and both records show the cancelled order.»
  ru: «Отмена заказа у агента в Lagrix: вернуть можно не больше веса ваших лайков заказчика, столько же сгорает, а отмена видна в записях обеих сторон.»
- cover alt en: «Escrow splits a cancelled $100 order: $10 back to the customer, the rest to the provider»
  ru: «Эскроу делит отменённый заказ на $100: $10 заказчику, остальное исполнителю»
- menu item en: name «Order cancellation» · description «Cancel within the dispute window: the refund is limited by your likes, and both records show it.»
  ru: name «Отмена заказа» · description «Отмена в окне спора: возврат ограничен вашими лайками, и отмена видна в записях обеих сторон.»
- lead en: «In Lagrix a customer who refuses delivered work may cancel the order within the dispute window. It gets back at most the weight of
  its likes as a customer, the same weight of likes burns, and the provider receives the rest. If the provider declines or misses the
  deadline, the customer gets everything back and no fee is taken.»
  ru: «В Lagrix заказчик, который не принимает сданную работу, может отменить заказ в окне спора. Он вернёт не больше веса своих лайков
  заказчика, столько же лайков сгорит, а остальное получит исполнитель. Если исполнитель откажется или не успеет к сроку, заказчику
  вернётся всё, и комиссию не возьмут.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Anna's «Bella» salon ordered a price-list translation
from Leo's agent for $100 (same deal as /reputation). Earlier Anna paid two providers $100 each and got a like from both, so her likes as
a customer weigh $10 (as on /likes-and-dislikes). en ≥ 1240 words, ru ≥ 1000.

### H2 `problem` — en «Why cancelling an agent's order is hard today» · ru «Почему сегодня трудно отменить заказ у агента»
- H3 `problem-often` «Agent orders are often cancelled» · «Заказы агентов часто отменяют» — chain: 1) Anna's agent ordered the
  translation without Anna reading every word; 2) the result arrives with wrong prices; 3) a study of September 2026 calls such agent
  purchases «frequently cancelled» and says the money should not become the seller's until delivery (F1, external link).
- H3 `problem-dispute` «A dispute after the fact» · «Спор задним числом» — chain: 1) with a card, Anna would dispute the charge at her
  bank; 2) disputes keep growing: 106 million at one card network in 2025, 35% more than in 2019 (F2, external link); 3) with an agent in
  the middle, the record of what exactly was agreed is often missing (F3); 4) the rules of the outcome are not known to either side
  before the order.

### H2 `endings` — en «Four ways a Lagrix deal can end» · ru «Четыре исхода сделки в Lagrix»
- paragraph: Web4 definition verbatim.
- H3 `endings-normal` «Accepted, or no answer» · «Принят — или ответа нет» — chain: 1) Anna's agent locks $100 in escrow (F4) →
  [how escrow and the deal fee work](/<lang>/deal-fee); 2) Leo's agent delivers and records the delivery; a short dispute window opens
  (F5); 3a) Anna's agent accepts → the deal closes: the network keeps 5%, $5, Leo receives the rest, a receipt appears (F6); 3b) Anna's
  agent goes silent → after the window Leo closes the deal himself, with the same fee and the same receipt (F5).
- H3 `endings-refund` «Declined, or late» · «Отказ — или опоздание» — chain: 1) Leo's agent declines the task, for any reason, which the
  network does not judge; 2) or it does not deliver by the deadline; 3) in both cases the whole $100 returns to Anna and no fee is taken
  (F7). This is a refund, not a cancellation.

### H2 `cancel` — en «How a cancellation works, step by step» · ru «Как работает отмена, шаг за шагом»
- H3 `cancel-steps` «The refund is limited by your likes» · «Возврат ограничен вашими лайками» — chain: 1) Leo delivered; Anna's agent
  refuses the result within the dispute window and cancels (F8); 2) the contract reads Anna's likes as a customer: $10 (F8); 3) it returns
  $10 to Anna, never more than the order itself (F8); 4) the same $10 of likes burn (F8); 5) the rest of the payment goes to Leo (F8);
  6) a cancelled order is recorded for both of them (F9).
- H3 `cancel-why` «Why the limit is likes» · «Почему предел — лайки» — chain: 1) a customer with no likes gets nothing back, and the whole
  amount goes to the provider (F8); 2) otherwise anyone could order work, take the result and cancel for free; 3) each dollar of likes
  cost a dollar of fees, so the right to a $1 refund never costs less than $1 (F10) → [why likes cannot be farmed](/<lang>/likes-and-dislikes);
  4) the network never judges who was right: acceptance belongs to the customer (F11).

### H2 `record` — en «What a cancellation leaves in the record» · ru «Что отмена оставляет в записи»
- H3 `record-lines` «Cancelled and burned» · «Отменённые и сгоревшие» — chain: 1) Anna's record as a customer: cancelled orders
  «1 · $100», burned «1 · $10» (F9, F12); 2) Leo's record as a provider: cancelled orders «1 · $100» (F9); 3) the order still counts in
  «all orders» for both (F12); 4) nothing is erased: the burn is a new event (F13).
- H3 `record-read` «How the next side reads it» · «Как это читает следующая сторона» — chain: 1) the next provider sees Anna's cancelled
  and burned lines before taking her order; 2) three cancellations out of three hundred orders and three out of four are different
  stories (F14) → [what the other side sees](/<lang>/reputation); 3) the full state machine of escrow → [document 4](/<lang>/docs/04-escrow-contract).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | an agent purchase «is large, frequently cancelled, and should not become the seller's money until delivery» | arXiv 2609.02208, 2026-09-02 (abstract) |
| F2 | «In 2025, Visa processed 106 million disputes globally, a 35% increase since 2019» — on the page «one card network», named in the link | Visa press release 2026-04-01 |
| F3 | with agent purchases the record of what was agreed is often missing | Digital Commerce 360, 2026-04-01 (commentary; write as «often», no numbers) |
| F4 | the customer locks the network part in USDC in escrow | doc 04 §4.1 |
| F5 | the provider records delivery (COMMITTED) and a dispute window opens; after it the provider closes the deal without the customer's signature, with the same fee and receipt | doc 04 §4.3 |
| F6 | on acceptance: provider gets payment minus the fee (5%), the fee goes to the period's pool, a receipt is recorded | doc 04 §4.1, §4.4 |
| F7 | provider declines for any reason, which the network does not judge, or misses the deadline → full refund, no fee (REFUNDED) | doc 04 §4.1 |
| F8 | cancellation within the window: refund = min(customer's like weight as a customer, amount); the same weight burns; the rest to the provider; no likes → nothing back | doc 04 §4.3; README glossary «Cancelled order» |
| F9 | a «cancelled order» is recorded for both sides | doc 04 §4.1; entry 42 |
| F10 | the right to a refund bought with likes never costs less than the refund | doc 17 §17.5; entry 42 «Why» |
| F11 | the network never judges whether a service was delivered; acceptance belongs to the customer | doc 04 §4.2 |
| F12 | indicators: burned (refunds that consumed likes, weight burned), cancelled orders (count, sum of network parts), all orders includes cancelled | doc 17 §17.4 |
| F13 | burning is a new event; history is not rewritten | entry 42 |
| F14 | three cancelled out of three hundred and three out of four are different stories | entry 44 «Why» |

Numbers: «$100», «$5», «$10», «$90», «5%», «5 %», «35%», «35 %», «$1»

## 8. Questions to the owner
none for the page; the open protocol question is kept off the page (see the top of this file).

## 9. Links
- out across the site:
  - /<lang>/reputation — «what the other side sees» / «что видит другая сторона» — H2 `record` (up to the hub)
  - /<lang>/likes-and-dislikes — «why likes cannot be farmed» / «почему лайки нельзя накрутить» — H2 `cancel`
  - /<lang>/deal-fee — «how escrow and the deal fee work» / «как работают эскроу и комиссия сделки» — H2 `endings`
- to documents: /<lang>/docs/04-escrow-contract — «document 4» / «документ 4» — H2 `record`
- incoming (planned): /reputation (hub), /likes-and-dislikes, /refunds
- external primary sources: https://arxiv.org/abs/2609.02208 (F1); https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html (F2)

## 10. FAQ
1. en «Can I cancel an order after the work is delivered?» · ru «Можно ли отменить заказ после сдачи работы?» — yes, within the dispute window — F8
2. en «How much do I get back?» · ru «Сколько мне вернут?» — at most the weight of your likes as a customer, never more than the order — F8
3. en «What if the provider never delivers?» · ru «А если исполнитель так и не сдаст работу?» — you get everything back, and no fee is taken — F7
4. en «What if I just stay silent?» · ru «А если просто промолчать?» — after the window the provider closes the deal as accepted — F5
5. en «Will others see that I cancelled?» · ru «Увидят ли другие, что я отменил?» — yes, a cancelled order is recorded for both sides — F9

## 11. Words
Glossary: cancelled order, dispute window, refund, burned, escrow, like, customer, provider, all orders. Traps: «cancellation» ≠
«refund» (refund = provider declined or late); never «the network decides who is right»; do not state what happens to the fee, the receipt
or reviews on a cancelled order; «tokens» banned; ru «2026 года» → «2026-го».

## 12. Unique value
- The rule known before the order, in numbers: $100 order, $10 of likes → $10 back, $10 burns, the rest to the provider.
- Four endings side by side, so a reader sees which one is a refund and which one is a cancellation.
