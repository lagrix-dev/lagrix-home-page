# Skeleton /likes-and-dislikes — hub reputation

Written 2026-10-16 (step 507-5) by the federal agent, from the protocol (documents 17 §17.4–§17.5, 05 §5.3, 04 §4.3, changelog entries
42–43, README glossary «Review») and research of the same day. Form: `references/tz-template.md`; every event is a chain of small steps
(skill §5б).

## 1. Passport
- slug: likes-and-dislikes · hub: reputation · menu order: 115 (`meta.json`)
- source on the home page: glossary «Review», «Reputation»; home cards of the reputation indicators
- protocol documents: 17, 05, 04

## 2. Hot question
- main query en: «fake reviews AI agents weighted by payment» · ru: «отзывы, которые нельзя накрутить»
- intent: learn
- evidence (each with a date and an address):
  - the FTC final rule bans buying or selling fake reviews and paying for reviews of a given sentiment, AI-written ones included —
    https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials — 2024-08-14
  - ERC-8004 study: «reputation can be manipulated at minimal cost»; feedback «rarely grounded in verifiable interactions» —
    https://arxiv.org/abs/2606.26028 — 2026-06-24
  - the ERC-8004 draft lets any address except the agent's owner give feedback, with payments outside the protocol —
    https://eips.ethereum.org/EIPS/eip-8004 — created 2025-08-13, read 2026-10-16
- what the top ten answer and what they DO NOT: guides on fake reviews offer detection after the fact (filters, Sybil scores, bans). None
  makes a review impossible without a paid deal and prices its weight at the fee paid, so the cost of a fake is known in advance.
- why now: open registries of agent reviews filled with coordinated reviewers within months (study of June 2026).

## 3. Mission
Honest reputation — the page shows why a like in Lagrix is trustworthy: it is bought only by real paid work, at full price.

## 4. Reader
A seller of agent work or of a whole element who fears fake praise for rivals and fake attacks on themselves. Pain: «competitors buy
reviews»; «one angry stranger can sink me». Leaves with: who may review, what a like weighs, what farming costs in dollars, why a dislike
needs a payment first, how likes as a customer turn into a right to a refund.

## 5. Titles and meta
- title en: «Reviews AI agents cannot farm: likes weighted by payment» · ru: «Отзывы, которые нельзя накрутить: лайки с весом оплаты»
- subtitle en: «In Lagrix a like or a dislike exists only for a paid deal and weighs the fee paid on it, so every fake has a price in dollars.»
  ru: «В Lagrix лайк или дизлайк бывает только за оплаченную сделку и весит уплаченную по ней комиссию, поэтому у любой подделки есть цена в долларах.»
- description en: «Each side of a paid deal gives one like or dislike that weighs the fee paid. Faking $1 of weight costs $1, and tiny deals show at a glance.»
  ru: «Каждая сторона оплаченной сделки ставит один лайк или дизлайк весом уплаченной комиссии. $1 поддельного веса стоит $1, а мелкие сделки видны сразу.»
- cover alt en: «A like weighing $5 attached to a $100 receipt» · ru: «Лайк весом $5, прикреплённый к чеку на $100»
- menu item en: name «Likes and dislikes» · description «One review per side of a paid deal, weighted by the fee: farming costs exactly what it gives.»
  ru: name «Лайки и дизлайки» · description «По одному отзыву с каждой стороны оплаченной сделки, вес — комиссия: накрутка стоит ровно столько, сколько даёт.»
- lead en: «In Lagrix a like or a dislike can be given only for a deal paid through the network, one by each side, and it weighs the fee paid
  on that deal: a $100 deal gives a review weighing $5. Faking a dollar of weight therefore costs a dollar, and every count is shown with
  its sum, so tiny fake deals stand out at once.»
  ru: «В Lagrix лайк или дизлайк можно поставить только за сделку, оплаченную через сеть, по одному с каждой стороны, и весит он уплаченную
  по сделке комиссию: сделка на $100 даёт отзыв весом $5. Значит, доллар поддельного веса стоит доллар, а каждое число показано вместе с
  суммой, и мелкие поддельные сделки видны сразу.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Sam (fictional developer of a booking element, see
/f2f) sells his element; a rival seller tries to farm likes for himself and to hurt Sam with a dislike. en ≥ 1200 words, ru ≥ 1000.

### H2 `problem` — en «Why review counts lie» · ru «Почему счётчики отзывов врут»
- H3 `problem-bought` «Praise that anyone can order» · «Похвала, которую может заказать любой» — chain: 1) Sam's rival has fifty
  five-star reviews and Sam has seven; 2) in an open registry any address may review, with no deal (F2); 3) a June 2026 study found agent
  reputation «manipulated at minimal cost» (F1, external link); 4) US law bans buying fake reviews (F3, external link), but a buyer's agent
  cannot see which ones were bought.
- H3 `problem-attack` «Criticism that anyone can throw» · «Критика, которую может бросить любой» — chain: 1) the same openness works
  against Sam: a stranger who never paid him can leave a bad review (F2); 2) one angry address, or a hundred, can sink seven honest
  reviews; 3) the cure is the same rule for praise and for criticism: a review must come from a paid deal.

### H2 `how-weight` — en «How a review gets its weight» · ru «Как отзыв получает вес»
- H3 `weight-deal` «One paid deal, two reviews» · «Одна оплаченная сделка — два отзыва» — chain: 1) Anna's salon buys Sam's element for
  $100 through the network (F4) → [how the deal fee works](/<lang>/deal-fee); 2) the fee is 5%: $5 (F5); 3) the deal closes and leaves
  a receipt (F6); 4) Anna's agent gives Sam one like or one dislike, Sam gives Anna one too (F7); 5) each weighs $5 (F7); 6) a review cannot
  be changed and has no deadline (F7).
- H3 `weight-sum` «A count with its sum» · «Число вместе с суммой» — chain: 1) Sam sells a second time, a $20 deal → fee $1 → a like of
  $1 (F7); 2) his likes now read «2 · $6» (F8); 3) likes and dislikes are shown separately, never subtracted (F9); 4) the buyer's agent
  reads them itself → [what the other side sees](/<lang>/reputation).

### H2 `farming` — en «What farming would cost» · ru «Во что обошлась бы накрутка»
- H3 `farming-self` «Buying likes from yourself» · «Купить лайки у самого себя» — chain: 1) the rival wants $50 of like weight;
  2) the only way is real deals through the network, with his own second element as the customer; 3) $50 of weight needs $1,000 of deals
  (F10); 4) he pays $50 of fees to the super-nodes (F10); 5) he gets exactly $50 of weight → weight never comes cheaper than it weighs.
- H3 `farming-tiny` «Tiny deals give themselves away» · «Мелкие сделки выдают себя сами» — chain: 1) to save money the rival makes a
  thousand tiny deals; 2) his likes read «1000 · $0.50» (F8); 3) a buyer's agent sees a thousand likes weighing fifty cents next to Sam's
  «2 · $6» and draws its own conclusion; 4) the network itself does not judge (F9).

### H2 `dislikes` — en «Dislikes, refunds and negative ratings» · ru «Дизлайки, возвраты и негативные оценки» (step 511, entry 46)
- H3 `dislikes-cost` «A dislike costs a payment first» · «Дизлайк сначала стоит оплаты» — chain: 1) the rival wants to hurt Sam;
  2) first he must buy Sam's work through the network (F11); 3) Sam is paid for it; 4) the dislike weighs the fee of that deal; 5) the next
  buyer sees one dislike among Sam's likes, each with its sum (F8).
- H3 `dislikes-refund` «Likes you earn as a customer» · «Лайки, которые вы зарабатываете как заказчик» — chain: 1) Anna's salon also
  collects likes as a customer, from providers it paid (F12); 2) she paid two providers $100 each, both liked her → her likes weigh $10;
  3) if she cancels an order she did not accept, she gets back at most $10, and those $10 are deducted from her likes as a new, dated
  event (F12); 4) the right to a $1 refund costs at least $1 of fees (F13) →
  [what an order cancellation does to both sides](/<lang>/order-cancellation); full rules → [document 17](/<lang>/docs/17-discovery-ranking-feedback).
- H3 `dislikes-given` «How an element rates its partners» · «Как элемент оценивает партнёров» — chain (F14): 1) one more line shows how
  an element treats its partners: negative ratings; 2) before taking Anna's next order, Sam's agent opens her record as a customer;
  3) ten orders of $100, fee $5 each → the orders she could review weigh $50; 4) one dislike on one of them, $5 → «10% · 1 · $5»;
  5) another customer, same ten orders, six dislikes weighing $30 → «60% · 6 · $30»; 6) Sam sees how likely each is to dislike his work
  and decides whether to take the order; deals left silent show in «unreviewed».

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | ERC-8004 study: reputation «manipulated at minimal cost», feedback rarely grounded in verifiable interactions | arXiv 2606.26028, 2026-06-24 |
| F2 | ERC-8004 draft: any address except the agent owner may give feedback; payments outside the protocol | eips.ethereum.org/EIPS/eip-8004 |
| F3 | FTC final rule bans buying/selling fake reviews and paying for a given sentiment, AI-generated included; 2024-08-14 | FTC press release |
| F4 | the network part is locked in escrow until acceptance | doc 04 §4.1 |
| F5 | fee at most 5%, 5% until modelling | doc 05 §5.3 |
| F6 | a closed deal leaves a receipt | doc 05 §5.2 |
| F7 | one review per side, like or dislike, only for a deal paid through the network; weight = fee paid ($100 → $5); cannot be changed; no deadline | doc 17 §17.5; README glossary «Review» |
| F8 | every indicator is «count · sum»; a thousand likes weighing 50 cents reveal farming | entry 43; doc 17 §17.4 |
| F9 | indicators never added or subtracted; the counterparty decides; the network does not judge | doc 17 §17.4; doc 04 §4.2 |
| F10 | faking one unit of weight costs one dollar of fees; weight is never cheaper than it weighs | doc 17 §17.5; doc 05 §5.3 |
| F11 | to leave a dislike one must first pay that person through the network | doc 17 §17.5 |
| F12 | cancellation: refund at most the customer's like weight as a customer, the same weight is deducted from its likes as a new, dated event | doc 04 §4.3; doc 17 §17.5; entry 46 |
| F13 | the right to a refund bought with likes never costs less than the refund | doc 17 §17.5; entry 42 «Why» |
| F14 | negative ratings: the weight of the dislikes an element gave in a role ÷ the weight of its orders in that role it could review, as a percent, with count · weight next to it; deals left silent stay in «unreviewed» | entry 46; doc 17 §17.4 |

Numbers: «$100», «$5», «5%», «5 %», «$10», «$20», «$1», «$6», «$50», «$1,000», «$0.50», «$0,50», «10%», «10 %», «60%», «60 %», «$30»

## 8. Questions to the owner
none.

## 9. Links
- out across the site:
  - /<lang>/reputation — «what the other side sees» / «что видит другая сторона» — H2 `how-weight` (up to the hub)
  - /<lang>/deal-fee — «how the deal fee works» / «как работает комиссия сделки» — H2 `how-weight`
  - /<lang>/order-cancellation — «what an order cancellation does to both sides» / «что отмена заказа меняет для обеих сторон» — H2 `dislikes`
- to documents: /<lang>/docs/17-discovery-ranking-feedback — «document 17» / «документ 17» — H2 `dislikes`
- incoming (planned): /reputation (hub), /f2f, /order-cancellation
- external primary sources: https://arxiv.org/abs/2606.26028 (F1); FTC press release (F3)

## 10. FAQ
1. en «Can I leave a review without buying?» · ru «Можно ли оставить отзыв без покупки?» — no; only for a deal paid through the network — F7
2. en «How much does a like weigh?» · ru «Сколько весит лайк?» — the fee paid on its deal: $5 on a $100 deal — F7
3. en «Can I change my review later?» · ru «Можно ли потом изменить отзыв?» — no; it has no deadline, but once given it stays — F7
4. en «Can a competitor flood me with dislikes?» · ru «Может ли конкурент завалить меня дизлайками?» — only by paying you for real work each time — F11
5. en «What are likes as a customer for?» · ru «Зачем заказчику лайки?» — they are the limit of what he can get back if he cancels an order — F12
6. en «Can I see how an element rates others?» · ru «Видно ли, как элемент оценивает других?» — yes: negative ratings, the share of its orders by weight that ended with its own dislike — F14

## 11. Words
Glossary: review, like, dislike, weight, fee, receipt, negative ratings, cancelled order («burned» is gone — entry 46). Traps: never «rating» for reputation as a whole («negative ratings» is the name of one indicator); «tokens» banned; ru
amounts with spaces are read badly by the probe — write «тысячу долларов» for $1,000 in Russian.

## 12. Unique value
- The price of a fake in plain numbers: $50 of weight = $1,000 of deals = $50 of fees; a farmed thousand reads «1000 · $0.50».
- The same rule against fake praise and fake criticism: no paid deal, no review.
