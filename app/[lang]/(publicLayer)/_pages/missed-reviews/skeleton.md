# Skeleton /missed-reviews — hub reputation

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-16 (step 507-5) by the federal agent, from the protocol (document 17 §17.4–§17.5 and the `onCompleted`/`review` sketch;
README glossary «Unreviewed»; changelog entry 43) and research of the same day. Form: `references/tz-template.md`; every event is a chain
of small steps (skill §5б).

## 1. Passport
- slug: missed-reviews · hub: reputation · menu order: 117 (`meta.json`)
- source on the home page: glossary «Unreviewed»; reputation card on the home page
- protocol documents: 17

## 2. Hot question
- main query en: «what happens if a buyer leaves no review» · ru: «что если покупатель не оставил отзыв»
- intent: learn
- evidence (each with a date and an address):
  - «underreporting bias (consumers with extreme, either positive or negative, ratings are more likely to write reviews»; the two
    self-selection biases «render the mean rating a biased estimator of product quality» — Hu, Pavlou, Zhang, «On Self-Selection Biases
    in Online Product Reviews», MIS Quarterly 41(2) —
    https://aisel.aisnet.org/misq/vol41/iss2/8 — 2017
  - agent review registries: feedback «rarely grounded in verifiable interactions», so most real interactions leave no trace —
    https://arxiv.org/abs/2606.26028 — 2026-06-24
  - the FTC final rule forbids presenting a review section as complete while suppressing negative reviews —
    https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials — 2024-08-14
- what the top ten answer and what they DO NOT: articles explain how to ask buyers for reviews and how to reply to bad ones. None shows
  the silence itself as a number: how many paid deals ended without a review, and for how much.
- why now: agents now close deals at machine speed, and a record that hides the deals left unrated misleads the next agent.

## 3. Mission
Honest reputation — the record shows not only what was said but also how much was left unsaid.

## 4. Reader
A buyer or seller who wonders why reviews are scarce and what the silence means. Pain: «most of my customers never review»; «does a
missing review hurt me?»; «is there a deadline?». Leaves with: when a deal enters «unreviewed», how it leaves, what the line shows to the
other side, what it does not affect.

## 5. Titles and meta
- title en: «What happens if a buyer leaves no review» · ru: «Что будет, если покупатель не оставил отзыв»
- subtitle en: «In Lagrix every paid deal waits for a review from both sides, and a deal left without one shows as «unreviewed», with its count and sum.»
  ru: «В Lagrix каждая оплаченная сделка ждёт отзыва от обеих сторон, а сделка без отзыва видна как «без отзыва» — числом и суммой.»
- description en: «A deal paid in Lagrix stays «unreviewed» until its side leaves a review, with no deadline. The other side sees the count and the sum.»
  ru: «Оплаченная сделка в Lagrix остаётся «без отзыва», пока сторона его не оставит, и срока нет. Другая сторона видит число и сумму.»
- cover alt en: «A receipt with an empty review slot: unreviewed 3 · $220» · ru: «Чек с пустым местом для отзыва: без отзыва 3 · $220»
- menu item en: name «Missed reviews» · description «Deals left without a review show as a count and a sum, and a late review clears them.»
  ru: name «Пропущенные отзывы» · description «Сделки без отзыва видны числом и суммой, а поздний отзыв их убирает.»
- lead en: «In Lagrix a buyer who leaves no review is not invisible. When a paid deal closes, it enters the «unreviewed» line of both sides,
  shown as a count and a sum, and stays there until that side gives a like or a dislike. There is no deadline, no money moves, and search
  is not affected.»
  ru: «В Lagrix покупатель, который не оставил отзыв, не невидим. Когда оплаченная сделка закрывается, она попадает в строку «без отзыва» у
  обеих сторон — числом и суммой — и остаётся там, пока сторона не поставит лайк или дизлайк. Срока нет, деньги не двигаются, и на выдачу
  это не влияет.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 paragraphs per H3, chains of small steps. Running example: Leo's translation agent worked for Anna's «Bella»
salon three times — $100, $100 and $20 — and never reviewed her; Anna reviewed him every time. Then Maria, a new customer (from /discovery),
looks at Leo's record. en ≥ 1240 words, ru ≥ 1000.

### H2 `problem` — en «Why silence distorts reputation» · ru «Почему молчание искажает репутацию»
- H3 `problem-silent` «Most buyers stay silent» · «Большинство покупателей молчат» — chain: 1) on most platforms only some buyers write a
  review; 2) research found that those with extreme experiences write more often than those with ordinary ones (F1, external link);
  3) so the average rating becomes a biased measure of quality (F1) → the silent majority changes the picture. (Verified 2026-10-16: the
  «everyone had to review → balanced» experiment is NOT in this abstract — not on the page.)
- H3 `problem-hidden` «Silence nobody can see» · «Молчание, которого никто не видит» — chain: 1) a typical record shows the reviews that
  exist and nothing about the deals without one; 2) a seller cannot tell whether a buyer forgot or chose to say nothing; 3) US law already
  treats hiding part of the reviews as deception (F3, external link); 4) in agent registries most real interactions leave no trace at all
  (F2).

### H2 `how-it-works` — en «How Lagrix counts missed reviews» · ru «Как Lagrix считает пропущенные отзывы»
- paragraph: Web4 definition verbatim.
- H3 `how-enter` «A closed deal waits for two reviews» · «Закрытая сделка ждёт двух отзывов» — chain: 1) Anna's agent pays $100 through
  escrow and accepts Leo's translation (F4) → [how escrow and the deal fee work](/<lang>/deal-fee); 2) the deal closes, and each side may
  give the other one review (F4); 3) at that same moment the deal enters the «unreviewed» line of both: Anna as a customer, Leo as a
  provider (F5); 4) Anna's agent likes Leo → the deal leaves Anna's line (F5); 5) Leo says nothing → the deal stays in Leo's line.
- H3 `how-leave` «No deadline, and only you can clear it» · «Срока нет, и убрать можете только вы» — chain: 1) a review has no deadline
  (F6); 2) if Leo reviews Anna a month later, the deal leaves his line at once (F6); 3) nobody else can change this line: only the element
  itself, by reviewing (F6); 4) a review once given cannot be changed (F6) → [how likes get their weight](/<lang>/likes-and-dislikes).

### H2 `what-it-shows` — en «What the line shows» · ru «Что показывает эта строка»
- H3 `shows-sum` «Count and sum» · «Число и сумма» — chain: 1) Leo worked for Anna three times: $100, $100 and $20; 2) he reviewed none;
  3) his line reads «unreviewed 3 · $220» (F7); 4) Anna reviewed every time, her line reads zero; 5) the line is shown next to all orders,
  so «3 out of 3» reads differently from «3 out of 300» (F8).
- H3 `shows-meaning` «What the next customer learns» · «Что узнаёт следующий заказчик» — chain: 1) Maria's agent looks at Leo's record
  before ordering (F9); 2) «3 · $220» unreviewed out of three orders says a deal with Leo will probably bring Maria no review (F9); 3) a
  review is weight, and likes as a customer are what limits a refund on cancellation (F10) → [what an order cancellation does](/<lang>/order-cancellation);
  4) Maria's agent decides for itself whether that matters (F11).

### H2 `does-not` — en «What a missed review does not do» · ru «Чего пропущенный отзыв не делает»
- H3 `not-search` «It does not move search or places» · «Не влияет на выдачу и места» — chain: 1) search follows paid work over the last
  12 months, with or without reviews (F12) → [how search results are built](/<lang>/discovery); 2) a super-node place is earned by paid
  work, which counts with or without a review (F9).
- H3 `not-penalty` «It is not a penalty» · «Это не штраф» — chain: 1) no fee and no deadline; unlike a cancellation, no likes are deducted (F6); 2) it is never added to or
  subtracted from other lines; there is no single score (F11) → [what the other side sees](/<lang>/reputation); 3) it is information
  for both sides: Leo sees how much of his work with others he left unrated (F9); full rules → [document 17](/<lang>/docs/17-discovery-ranking-feedback).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | under-reporting bias: consumers with extreme (positive or negative) experiences are more likely to write reviews; self-selection makes the mean rating a biased estimator of quality | Hu, Pavlou, Zhang, MIS Quarterly 41(2), 2017 — on the page «a study», no names |
| F2 | agent review registries: feedback rarely grounded in verifiable interactions | arXiv 2606.26028, 2026-06-24 |
| F3 | FTC rule: claiming a review section shows all or most reviews while suppressing negative ones is prohibited | FTC press release 2024-08-14 |
| F4 | each side of a deal paid through the network gives the other one review after the deal closes | doc 17 §17.5 |
| F5 | on completion the deal is added to «unreviewed» of the customer's element (customer role) and the provider's element (provider role); a review removes it from the reviewer's line | doc 17 §17.5 sketch (`onCompleted`, `review`) |
| F6 | a review has no deadline; once given it removes the deal from «unreviewed»; only the element itself can change this line; a review cannot be changed | doc 17 §17.5; entry 43 |
| F7 | «unreviewed» = number of deals where the element could have reviewed and did not, and the sum of their network parts | doc 17 §17.4; README glossary «Unreviewed» |
| F8 | the other indicators are read against «all orders» | entry 44 «Why»; README glossary «All orders» |
| F9 | «Why» of entry 43: the element sees how much it left unrated; a counterparty sees a deal will probably not bring a review and so no weight; a super-node place does not depend on it | entry 43 «Why» |
| F10 | a cancellation refund is at most the customer's like weight as a customer | doc 04 §4.3 |
| F11 | indicators never combined into one score; the counterparty decides | doc 17 §17.4 |
| F12 | ranking follows paid work over the last 12 months; reputation takes no part | doc 17 §17.2 |

Numbers: «$100», «$20», «$220», «$5», «12 months», «12 месяцев»

## 8. Questions to the owner
none.

## 9. Links
- out across the site:
  - /<lang>/reputation — «what the other side sees» / «что видит другая сторона» — H2 `does-not` (up to the hub)
  - /<lang>/likes-and-dislikes — «how likes get their weight» / «как лайки получают вес» — H2 `how-it-works`
  - /<lang>/order-cancellation — «what an order cancellation does» / «что делает отмена заказа» — H2 `what-it-shows`
  - /<lang>/deal-fee — «how escrow and the deal fee work» / «как работают эскроу и комиссия сделки» — H2 `how-it-works`
  - /<lang>/discovery — «how search results are built» / «как строится выдача» — H2 `does-not`
- to documents: /<lang>/docs/17-discovery-ranking-feedback — «document 17» / «документ 17» — H2 `does-not`
- incoming (planned): /reputation (hub, H2 `what-you-see`), /order-cancellation, /likes-and-dislikes
- external primary sources: https://aisel.aisnet.org/misq/vol41/iss2/8 (F1); FTC press release (F3)

## 10. FAQ
1. en «Is there a deadline for leaving a review?» · ru «Есть ли срок, чтобы оставить отзыв?» — no; a late review clears the deal at once — F6
2. en «Does a missing review hurt my place in search?» · ru «Вредит ли пропущенный отзыв моему месту в выдаче?» — no; search follows paid work — F12
3. en «Who can see my unreviewed deals?» · ru «Кто видит мои сделки без отзыва?» — the other side of any future deal, as a count and a sum — F7, F9
4. en «Can someone else clear my unreviewed line?» · ru «Может ли кто-то другой убрать мою строку «без отзыва»?» — no; only your own review — F6
5. en «Do both sides count missed reviews?» · ru «Считаются ли пропущенные отзывы у обеих сторон?» — yes, the customer and the provider each have the line — F5

## 11. Words
Glossary: unreviewed («без отзыва»), review, like, dislike, all orders, customer, provider, element. Traps: never «penalty», «rating»;
«tokens» banned; do not invent numbers about how many buyers review (no primary number taken).

## 12. Unique value
- Silence as a number: «unreviewed 3 · $220», next to all orders, visible to the next side.
- A rule with no deadline and no penalty: only the element itself can clear its own line.
