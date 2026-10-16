# Skeleton /negative-ratings — hub reputation

Written 2026-10-17 (step 507-11) by the federal agent, from the protocol (changelog entry 46; document 17 §17.4–§17.5 and the
`FeedbackRegistry` sketch; entries 42–44) and research of the same day. Form: `references/tz-template.md`; every event is a chain of small
steps (skill §5б). Owner, 2026-10-17: «на вкладке репутации так и не появилось страницы с новой меткой начни с описания этого».

## 1. Passport
- slug: negative-ratings · hub: reputation · menu order: 118 (`meta.json`); menu item order 40 in the «Reputation» group
- source on the home page: reputation card (six numbers); the indicator itself is new (entry 46, 2026-10-16)
- protocol documents: 17 (and changelog 000, entry 46)

## 2. Hot question
- main query en: «how to tell if a client leaves bad reviews» · ru: «как понять, что клиент ставит плохие отзывы»
- intent: learn
- evidence (each with a date and an address):
  - eBay: a member's feedback profile shows received feedback; the feedback a member has left stays visible to others unless the member
    makes it private («the feedback you've left and received will be hidden from other members») —
    https://www.ebay.com/help/Account/Settings/Feedback_profiles?id=4204 — read 2026-10-17
  - eBay buyer rules: «you can't threaten to leave a seller negative feedback if that seller won't do something that wasn't promised in
    the original listing» — https://www.ebay.com/help/policies/rules-policies-buyers/rules-policies-buyers?id=4206 — read 2026-10-17
  - Google fraud and scams advisory: scammers review-bomb a business, then «directly contact the business owner, often through third-party
    messaging apps, to demand payment», threatening that «the negative reviews will remain» —
    https://blog.google/technology/safety-security/fraud-and-scams-advisory-november-2025/ — 2025-11-06
  - agent review registries: feedback «rarely grounded in verifiable interactions» — https://arxiv.org/abs/2606.26028 — 2026-06-24
- what the top ten answer and what they DO NOT: guides tell sellers how to answer a bad review and how to report extortion after it
  happened. None gives a number, before the deal, for how often this client gives bad reviews, and none makes that number expensive to fake.
- why now: Google published its warning about review extortion on 6 November 2025; agents now choose counterparties at machine speed and
  need the number in the record, not in a list someone must read by hand.

## 3. Mission
Honest reputation — the record shows not only how others rated an element, but how the element rates its partners.

## 4. Reader
A seller, freelancer or agent developer who has met a client who complains about everything. Pain: «this client gives everyone one
star»; «he threatens a bad review unless I give a discount»; «I learn who he is only after the job». Leaves with: what negative ratings
are, how the percent is counted, why it cannot be cheaply cleaned, what both sides see before a deal, what the line does not do.

## 5. Titles and meta
- title en: «How to tell if a client leaves bad reviews» · ru: «Как понять, что клиент ставит плохие отзывы»
- subtitle en: «In Lagrix every element shows negative ratings: the share of its orders, by weight, that it ended with its own dislike.»
  ru: «В Lagrix у каждого элемента видны негативные оценки — доля его заказов, по весу, которые он закончил своим дизлайком.»
- description en: «Before an order in Lagrix, see the client's negative ratings: the share of its orders, by weight, it ended with a dislike, with the count next to it.»
  ru: «До заказа в Lagrix видны негативные оценки клиента: доля его заказов по весу, которые он закончил дизлайком, а рядом их число и вес.»
- cover alt en: «Negative ratings in Lagrix: a percent with its count and weight» · ru: «Негативные оценки в Lagrix: процент, число и вес»
- menu item en: «Negative ratings» — «How an element rates its partners: the share of its orders, by weight, that ended with its dislike.»
  ru: «Негативные оценки» — «Как элемент оценивает партнёров: доля его заказов по весу, которые закончились его дизлайком.»
- lead en: «In Lagrix every element shows negative ratings in each role: the weight of the dislikes it gave, divided by the weight of all its
  orders it could review, as a percent. The count and the weight of those dislikes stand next to it. So before a deal you see how likely the
  other side is to dislike your work.»
  ru: «В Lagrix у каждого элемента в каждой роли видны негативные оценки: вес дизлайков, которые он поставил, делённый на вес всех его
  заказов, которые он мог оценить, в процентах. Рядом стоят число и вес этих дизлайков. Поэтому ещё до сделки видно, насколько вероятно,
  что другая сторона поставит дизлайк вашей работе.»

## 6. Body plan
One running example: **Sam** (sells a booking element, skill §5а) chooses between two customers — **Anna** («Bella» salon) and **Theo**
(new fictional hero: runs a small hostel). Anna ends one order in ten with a dislike, Theo six in ten; Theo then tries to hide it.
en 1240–1280 words, ru ≥ 1000. H2 headings name the subject (§5в); en without dashes (humanizer §8).

### H2 `today` — en «How clients and sellers vet each other now» · ru «Как клиенты и продавцы проверяют друг друга сейчас»
- H3 `today-left` «Reviews a person left for others» · «Отзывы, которые человек оставил другим» — chain: 1) on eBay a member's profile
  shows the feedback they received (F1); 2) the feedback they left for others stays visible too, unless they hide it (F1, external link);
  3) to learn whether a buyer is picky, a seller reads that list by hand, line by line; 4) nobody turns it into one number to compare two
  clients before a deal. Budget 130.
- H3 `today-threat` «A bad review used as a threat» · «Плохой отзыв как угроза» — chain: 1) eBay's rules forbid a buyer to threaten
  negative feedback to get what the listing never promised (F2, external link); 2) Google's November 2025 advisory describes scammers who
  flood a business with bad reviews and then demand payment, warning that the reviews will remain (F3, external link); 3) both threats
  work because a bad review costs its writer little and the target cannot see in advance who writes them; 4) in agent review registries
  most feedback is not even tied to a real interaction (F15). Budget 150.

### H2 `how-it-works` — en «How negative ratings work in Lagrix» · ru «Как устроены негативные оценки в Lagrix»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `how-base` «The base is every order you could review» · «Основа — все заказы, которые можно было оценить» — chain: 1) each side of a
  deal paid through the network gives the other one review, a like or a dislike, weighing the fee paid (F4) → [how a like and a dislike get
  their weight](/<lang>/likes-and-dislikes); 2) when the deal closes, its fee joins the element's reviewable weight in that role (F5);
  3) Anna's salon ordered ten times at $100, fee $5 each → her reviewable weight as a customer is $50 (F5). Budget 130.
- H3 `how-percent` «The percent comes from dislikes given» · «Процент складывается из поставленных дизлайков» — chain: 1) Anna gave one
  dislike, on a $100 deal → $5 (F6); 2) $5 ÷ $50 = 10% → her line reads «10% · 1 · $5» (F6); 3) Theo also ordered ten times at $100 and
  gave six dislikes → $30 ÷ $50 = 60% → «60% · 6 · $30» (F6); 4) the count and the weight stand next to the percent, so 100% of one deal
  never looks like 100% of a hundred (F7). Budget 150.

### H2 `weight` — en «How weight keeps the percent honest» · ru «Как вес держит процент честным»
- H3 `weight-dilute` «Tiny deals change almost nothing» · «Крошечные сделки почти ничего не меняют» — chain: 1) Theo wants to hide his
  60%; 2) he runs 1,000 deals of one cent with a second element of his own and dislikes none of them (F8); 3) counted by deals, his
  dislikes would fall from 6 of 10 to 6 of 1,010, about 0.6%; 4) counted by weight, each one-cent deal adds five hundredths of a cent of
  fee, $0.50 in all → $30 ÷ $50.50 = 59.4% (F5, F8). Budget 140.
- H3 `weight-price` «What a clean percent would cost» · «Сколько стоил бы чистый процент» — chain: 1) to show 10%, Theo's reviewable
  weight must reach $300, because $30 ÷ $300 = 10%; 2) that is $250 more of fees; 3) at 5%, that is $5,000 of deals through escrow (F9);
  4) the fee goes to the super-nodes, the servers that run the network's search, so a clean percent costs as much as the truth it hides
  (F9) → [how the deal fee works](/<lang>/deal-fee). Budget 130.

### H2 `use` — en «What both sides see before a deal» · ru «Что обе стороны видят до сделки»
- H3 `use-provider` «Sam checks a customer» · «Сэм проверяет заказчика» — chain: 1) before taking an order, Sam's agent opens the
  customer's record (F10); 2) Anna reads «10% · 1 · $5», Theo «60% · 6 · $30»; 3) Sam sees that six of every ten of Theo's orders, by
  weight, ended with Theo's dislike, and decides for himself whether to take the order (F10); 4) a threat of a dislike loses its force when
  everyone can see how often this customer gives one; a refund on cancellation is capped by the customer's likes anyway (F16) →
  [what an order cancellation does](/<lang>/order-cancellation). Budget 150.
- H3 `use-customer` «Anna checks a provider» · «Анна проверяет исполнителя» — chain: 1) the line exists in both roles (F6); 2) Sam made
  25 sales of $100 and gave one customer a dislike → $5 ÷ $125 = 4% → «4% · 1 · $5»; 3) Anna's agent sees that Sam rarely dislikes his
  customers; 4) deals he left silent show separately in «unreviewed» (F11) → [what a missed review tells the other side](/<lang>/missed-reviews).
  Budget 130.
- H3 `use-limits` «What the line does not do» · «Чего эта строка не делает» — chain: 1) it takes no part in search ranking (F12);
  2) it is never combined with likes and dislikes into one score; the counterparty decides (F12) → [what the other side sees](/<lang>/reputation);
  3) the price is stated: an honest critic of poor work shows a higher percent, and some prefer silence to a dislike, which then shows in
  «unreviewed» (F13); 4) only a node with a wallet takes part in reputation (F14); full rules → [document 17](/<lang>/docs/17-discovery-ranking-feedback).
  Budget 140.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | eBay: the profile shows received feedback; the feedback a member left is hidden from others only if the member makes feedback private | ebay.com/help … Feedback_profiles?id=4204, read 2026-10-17 |
| F2 | eBay: «you can't threaten to leave a seller negative feedback if that seller won't do something that wasn't promised in the original listing» | ebay.com/help … rules-policies-buyers?id=4206, read 2026-10-17 |
| F3 | Google, 2025-11-06: scammers review-bomb a business, contact the owner «to demand payment», threaten that «the negative reviews will remain» | blog.google fraud-and-scams-advisory-november-2025 |
| F4 | one review per side of a paid deal; weight = fee paid; $100 → $5 | doc 17 §17.5; entry 42 |
| F5 | on completion the deal's fee joins `reviewable` of both sides (customer and provider role); fee 5% of the network part | doc 17 §17.5 sketch; entry 46; doc 05 §5.3 |
| F6 | negative ratings = weight of dislikes the element gave in a role ÷ its reviewable weight in that role, as a percent; in both roles | entry 46; doc 17 §17.4 |
| F7 | a count is never shown without its sum; 100% of one deal must not look like 100% of a hundred | entries 43, 46 |
| F8 | weight, not count: tiny deals with oneself would dilute a count almost for free, diluting weight costs real fees | entry 46 «Why» |
| F9 | the fee goes to super-nodes; faking one unit of weight costs one dollar of fees | doc 17 §17.5; doc 05 §5.3 |
| F10 | the counterparty reads the indicators and decides | doc 17 §17.4 |
| F11 | deals left without a review stay in «unreviewed», shown separately | entries 43, 46 |
| F12 | reputation takes no part in ranking; indicators never combined into one score; negative ratings are not such a score | doc 17 §17.4; entry 46 |
| F13 | cost stated: an honest critic shows a higher percent; some may prefer silence, which shows in «unreviewed» | entry 46 «Why» |
| F14 | only a node with a wallet takes part in reputation | doc 17 §17.4 |
| F15 | agent review registries: feedback rarely grounded in verifiable interactions | arXiv 2606.26028, 2026-06-24 |
| F16 | a cancellation refund is at most the customer's like weight as a customer | doc 04 §4.3; entry 46 |

Numbers: «$100», «$5», «$50», «10%», «10 %», «$30», «60%», «60 %», «0.6%», «0,6 %», «$0.50», «$0,50», «$50.50», «$50,50», «59.4%», «59,4 %», «$300», «$250», «$5,000», «5%», «5 %», «$125», «4%», «4 %»

## 8. Questions to the owner
none — everything stated is in entry 46 and document 17; «a threat loses its force» is an explanation of what the counterparty sees,
not a rule of the network.

## 9. Links
- out across the site:
  - /<lang>/reputation — «what the other side sees» / «что видит другая сторона» — H2 `use` (up to the hub)
  - /<lang>/likes-and-dislikes — «how a like and a dislike get their weight» / «как лайк и дизлайк получают вес» — H2 `how-it-works`
  - /<lang>/deal-fee — «how the deal fee works» / «как работает комиссия сделки» — H2 `weight`
  - /<lang>/order-cancellation — «what an order cancellation does» / «что делает отмена заказа» — H2 `use`
  - /<lang>/missed-reviews — «what a missed review tells the other side» / «что пропущенный отзыв говорит другой стороне» — H2 `use`
- to documents: /<lang>/docs/17-discovery-ranking-feedback — «document 17» / «документ 17» — H2 `use`
- incoming (planned): /reputation (hub, «how an element rates its partners»), /likes-and-dislikes (H3 `dislikes-given`),
  /missed-reviews (H3 `not-penalty`: silence shows in «unreviewed», a dislike in negative ratings)
- external primary sources: eBay feedback profiles (F1); eBay buyer rules (F2); Google advisory 2025-11-06 (F3); arXiv 2606.26028 (F15)

## 10. FAQ
1. en «Can I see how a client reviews others before taking the order?» · ru «Можно ли до заказа увидеть, как клиент оценивает других?» — yes: negative ratings in its customer role — F6
2. en «How is the percent counted?» · ru «Как считается процент?» — weight of the dislikes it gave ÷ weight of its orders it could review — F5, F6
3. en «Why weight and not the number of deals?» · ru «Почему по весу, а не по числу сделок?» — tiny deals dilute a count almost free; weight costs fees — F8, F9
4. en «Does a high percent lower my place in search?» · ru «Понижает ли высокий процент моё место в выдаче?» — no — F12
5. en «What if I simply leave no review?» · ru «А если просто не оставлять отзыв?» — the deal stays in «unreviewed», shown separately — F11
6. en «Do providers have negative ratings too?» · ru «Есть ли негативные оценки у исполнителей?» — yes, in both roles — F6

## 11. Words
Glossary: negative ratings («негативные оценки»), review, like, dislike, weight, fee, unreviewed, element, customer, provider. Traps:
never «rating» for reputation as a whole; never «burned»; «tokens» banned; ru: write «пять тысяч долларов» for $5,000 and «тысяча» for
1,000; years as «2025-го».

## 12. Unique value
- A number, before the deal, for how a client treats its partners: «60% · 6 · $30» next to «10% · 1 · $5».
- The cost of cleaning it, counted: by deals 0.6% almost free, by weight 59.4%; a clean 10% needs $250 of fees, $5,000 of deals.
- Both roles: the same line for customers and for providers.
