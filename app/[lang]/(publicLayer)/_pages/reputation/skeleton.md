# Skeleton /reputation — hub reputation

Written 2026-10-16 (step 507-5) by the federal agent, from the protocol (README «How reputation works» and glossary, documents 17 §17.4,
§17.5, §17.10, 05 §5.2–§5.4, 04, changelog entries 42–44) and research of the same day. A writer at minimum reasoning writes `en.json`
and `ru.json` from this file only. Form: `/code/.claude/skills/lagrix-answer-pages/references/tz-template.md`; every event is a chain of
small steps (skill §5б, owner 2026-10-16).

## 1. Passport
- slug: reputation · hub: itself · menu order: 110 (`meta.json`)
- source on the home page: mission «Honest reputation»; README «How reputation works»; glossary «Review», «Reputation»
- protocol documents: 17, 05, 04

## 2. Hot question
- main query en: «AI agent reputation that cannot be faked» · ru: «репутация ИИ-агента, которую нельзя подделать»
- intent: learn
- evidence (each with a date and an address):
  - an empirical study of the ERC-8004 agent registries (Ethereum, BSC, Base): Sybil behaviour among «73.5%, 59.2%, and 90.6%» of
    reviewers; «feedback records are rarely grounded in verifiable interactions»; «reputation can be manipulated at minimal cost» —
    https://arxiv.org/abs/2606.26028 — 2026-06-24
  - the ERC-8004 draft itself: «Sybil attacks are possible, inflating the reputation of fake agents»; «Payments are orthogonal to this
    protocol» — https://eips.ethereum.org/EIPS/eip-8004 — created 2025-08-13, read 2026-10-16
  - the FTC final rule banning fake reviews, including AI-generated ones, effective 2024-10-21 —
    https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials — 2024-08-14
- what the top ten answer and what they DO NOT: articles about agent reputation explain registries, scores and Sybil filters. None ties
  every review to money actually paid for a real deal, so that faking weight costs as much as the weight itself. That is our gap.
- why now: the June 2026 study measured that open agent-review registries are mostly filled by coordinated reviewers.

## 3. Mission
Honest reputation — the page explains the network's second goal: a record built only from paid deals, which nobody can buy or rewrite.

## 4. Reader
Someone about to let an AI agent work with strangers' agents, or to sell an agent's work. Pain: «how do I know whom my agent is dealing
with?»; «star ratings are bought»; «one bad client can ruin me». Leaves with: what a review is in Lagrix, why it costs money to fake, the
six numbers the other side sees, why reputation does not move search, where the three child pages go deeper.

## 5. Titles and meta
- title en: «AI agent reputation that cannot be faked» · ru: «Репутация ИИ-агента, которую нельзя подделать»
- subtitle en: «Every review in Lagrix belongs to a paid deal and weighs the fee paid on it, so faking it costs as much as it is worth.»
  ru: «Каждый отзыв в Lagrix привязан к оплаченной сделке и весит уплаченную по ней комиссию, поэтому подделка стоит столько же, сколько весит.»
- description en: «In Lagrix an agent's reputation is built only from paid deals: every like weighs the fee paid, and the other side sees six honest numbers.»
  ru: «Репутация агента в Lagrix складывается только из оплаченных сделок: каждый лайк весит уплаченную комиссию, а другая сторона видит шесть честных чисел.»
- cover alt en: «A deal receipt with a like weighing $5: reputation built from paid work» · ru: «Чек сделки и лайк весом $5: репутация из оплаченной работы»
- menu item en: name «Reputation» · description «Reviews only from paid deals, weighted by the fee: six numbers nobody can buy or rewrite.»
  ru: name «Репутация» · description «Отзывы только из оплаченных сделок, с весом комиссии: шесть чисел, которые нельзя купить или переписать.»
- lead en: «An AI agent's reputation can be trusted only if faking it costs real money. In Lagrix a like or a dislike exists only for a deal
  paid through the network and weighs the fee paid on it: a $100 deal gives a review weighing $5. The other side sees six numbers, each
  as a count and a sum, and decides for itself.»
  ru: «Репутации ИИ-агента можно верить, только если подделка стоит настоящих денег. В Lagrix лайк или дизлайк бывает только за сделку,
  оплаченную через сеть, и весит уплаченную по ней комиссию: сделка на $100 даёт отзыв весом $5. Другая сторона видит шесть чисел, каждое —
  количеством и суммой, и решает сама.»

## 6. Body plan
4 H2 × 2 H3, no H4, 2–3 connected paragraphs per H3, each H3 a chain of small steps (skill §5б). Running example: Anna's «Bella» salon
(the site's heroine) chooses which translation agent to hire for her price list: Leo's or another one with many stars. en 1180–1280
words, ru ≥ 1000. Web4 definition verbatim as the first paragraph of H2 `how-it-works`.

### H2 `problem` — en «Why agent ratings are easy to fake» · ru «Почему рейтинги агентов легко подделать»
- H3 `problem-free` «A review that costs nothing proves nothing» · «Отзыв, который ничего не стоит, ничего не доказывает» — chain:
  1) Anna's agent sees two translators, one with hundreds of five-star reviews; 2) in an open registry anyone can write a review, no
  deal needed (F2); 3) so one person with many addresses writes the hundreds (F1) → a star count says how busy someone was at writing
  reviews, not at working.
- H3 `problem-measured` «What a 2026 study found» · «Что показало исследование 2026 года» — chain: 1) researchers checked public agent
  review registries on three networks (F1, external link); 2) on one of them, nine reviewers out of ten showed coordinated behaviour (F1:
  90.6%); 3) reviews were rarely tied to a real interaction (F1); 4) fake reviews are banned by US law, and the rule names AI-written ones
  too (F3, external link) — yet a law punishes after the fact, and Anna needs to decide now.

### H2 `how-it-works` — en «How reputation works in Lagrix» · ru «Как устроена репутация в Lagrix»
- paragraph: Web4 definition verbatim.
- H3 `how-deal` «A review is born from a paid deal» · «Отзыв рождается из оплаченной сделки» — chain: 1) Anna's agent pays $100 for
  the translation into escrow (F4) → [how escrow and the deal fee work](/<lang>/deal-fee); 2) Leo's agent delivers, Anna's agent accepts;
  3) the network keeps a fee of 5% → $5 (F5); 4) the closed deal leaves a receipt (F6); 5) only now each side may give the other one
  review: Anna to Leo, Leo to Anna (F7); 6) the review weighs the fee: $5 (F7). No deal → no review; a review cannot be changed later (F7).
- H3 `how-weight` «Why faking costs as much as it weighs» · «Почему подделка стоит столько же, сколько весит» — chain: 1) a rival wants
  $5 of fake likes; 2) the only way is a real deal of $100 with himself through the network; 3) he pays $5 of fee to the super-nodes;
  4) he gets exactly $5 of weight (F8) → weight is never cheaper than it weighs; 5) a dislike to harm Leo costs even more: first he must
  pay Leo through the network (F8). Link → [why likes in Lagrix cannot be farmed](/<lang>/likes-and-dislikes).

### H2 `what-you-see` — en «What the other side sees» · ru «Что видит другая сторона»
- H3 `see-six` «Six numbers, each with its sum» · «Шесть чисел, и у каждого сумма» — chain: 1) Anna's agent opens Leo's record as a
  provider (F9); 2) all orders: how many and for how much; 3) likes and dislikes: how many and what they weigh; 4) negative ratings: the share of Leo's
  orders, by weight, that he ended with his own dislike (F9; a refund has no line — it is deducted from the customer's likes); 5) cancelled orders; 6) unreviewed: deals where Leo left no review (F9); 7) every count comes with its sum, so a thousand likes
  weighing a few cents in total show farming at once (F10). Links → [what an order cancellation does to both sides](/<lang>/order-cancellation),
  [what a missed review tells the other side](/<lang>/missed-reviews).
- H3 `see-roles` «Two roles, one mark» · «Две роли и одна отметка» — chain: 1) the same element has a record as a provider and as a customer:
  Anna's salon is a customer when it orders a translation (F9); 2) Leo also sees Anna's record before he takes the job; 3) if a node ever
  cheated as a super-node, all its elements show a «proven violation» mark with its date and proof (F11).

### H2 `rules` — en «Three rules that keep reputation honest» · ru «Три правила, которые держат репутацию честной»
- H3 `rules-no-score` «No single score, no effect on search» · «Нет общего балла и нет влияния на выдачу» — chain: 1) the network never
  adds the six numbers into one score (F12); 2) Anna's agent weighs them as it sees fit; 3) reputation plays no part in the order of search
  results: the order follows paid work (F13) → [how search results are built](/<lang>/discovery).
- H3 `rules-history` «Nothing is rewritten, and history does not travel» · «Ничего не переписывается, и история не переезжает» — chain:
  1) a refund deducted from likes or a mark is a new event; nothing is erased (F14); 2) an element moved to another node or sold starts with a clean
  history (F15); 3) a person who runs several nodes may show their reputations together, with proof they are theirs; the network does not
  compute it (F16). Full rules → [document 17](/<lang>/docs/17-discovery-ranking-feedback).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | ERC-8004 study: Sybil behaviour among 73.5% / 59.2% / 90.6% of reviewers (Ethereum / BSC / Base); feedback rarely grounded in verifiable interactions; reputation manipulated at minimal cost | arXiv 2606.26028, 2026-06-24 (abstract) |
| F2 | in the ERC-8004 draft any address except the agent's owner may give feedback; payments are outside the protocol; «Sybil attacks are possible» | eips.ethereum.org/EIPS/eip-8004 |
| F3 | the FTC final rule bans fake reviews, including AI-generated ones; announced 2024-08-14, effective 2024-10-21 | FTC press release 2024-08-14 |
| F4 | the customer locks the network part in USDC in escrow until acceptance | doc 04 §4.1; README glossary «Escrow» |
| F5 | fee at most 5% of the network part, 5% until modelling | doc 05 §5.3 |
| F6 | a closed deal leaves a receipt | doc 05 §5.2; doc 04 §4.5 |
| F7 | each side gives one review, like or dislike, only for a deal paid through the network; weight = fee paid; $100 → $5; cannot be changed; no deadline | doc 17 §17.5; README glossary «Review» |
| F8 | faking one unit of weight costs one dollar of fees; to leave a dislike one must first pay that person through the network | doc 17 §17.5; doc 05 §5.3 |
| F9 | six indicators per role (provider, customer): all orders, likes, dislikes, negative ratings (a percent with count · weight of the dislikes given), cancelled, unreviewed | doc 17 §17.4; entries 43, 44, 46 |
| F10 | a count never without its sum; a thousand likes weighing 50 cents in total reveal farming | entry 43 «Why»; doc 17 §17.4 |
| F11 | proven violation mark on all elements of the node, both roles, with date and proof | doc 17 §17.4; entry 44 |
| F12 | indicators never added or subtracted, no single score; the counterparty decides | doc 17 §17.4 |
| F13 | reputation takes no part in ranking; ranking follows paid work of the last 12 months | doc 17 §17.2 |
| F14 | refunds deducted from likes and marks are new events; history is not rewritten | entries 42, 46; doc 05 §5.4 |
| F15 | an element moved or handed to another owner starts with a clean history | doc 17 §17.10 |
| F16 | karma: a person shows reputations of their own nodes together with proof; the network does not compute it | doc 17 §17.10 |

Numbers: «$100», «$5», «5%», «5 %», «90.6%», «90,6 %», «12 months», «12 месяцев»

## 8. Questions to the owner
none — every statement is in the protocol or a primary source.

## 9. Links
- out across the site:
  - /<lang>/likes-and-dislikes — «why likes in Lagrix cannot be farmed» / «почему лайки в Lagrix нельзя накрутить» — H2 `how-it-works`
  - /<lang>/order-cancellation — «what an order cancellation does to both sides» / «что отмена заказа меняет для обеих сторон» — H2 `what-you-see`
  - /<lang>/missed-reviews — «what a missed review tells the other side» / «что пропущенный отзыв говорит другой стороне» — H2 `what-you-see`
  - /<lang>/deal-fee — «how escrow and the deal fee work» / «как работают эскроу и комиссия сделки» — H2 `how-it-works`
  - /<lang>/discovery — «how search results are built» / «как строится выдача» — H2 `rules`
- to documents: /<lang>/docs/17-discovery-ranking-feedback — «document 17» / «документ 17» — H2 `rules`
- incoming (planned): /discovery, /a2a, /f2f (already link here), the three child pages
- external primary sources: https://arxiv.org/abs/2606.26028 (F1); https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (F3)

## 10. FAQ
1. en «Can I buy a better reputation for my agent?» · ru «Можно ли купить агенту репутацию получше?» — no; weight comes only from paid deals, and each unit costs a dollar of fees — F7, F8
2. en «Who can leave a review?» · ru «Кто может оставить отзыв?» — only the two sides of a deal paid through the network, one each — F7
3. en «Does reputation move my agent up in search?» · ru «Поднимает ли репутация агента в выдаче?» — no; search follows paid work of the last 12 months — F13
4. en «Can a review be deleted or changed?» · ru «Можно ли удалить или изменить отзыв?» — no; new events are added, nothing is rewritten — F7, F14
5. en «Does reputation come with an agent I buy?» · ru «Переходит ли репутация вместе с купленным агентом?» — no; it starts with a clean history — F15

## 11. Words
Glossary: review, like, dislike, weight, fee, receipt, escrow, reputation, all orders, negative ratings, cancelled order, unreviewed, proven
violation, element, karma. Traps: «rating»/«score» only for what others do — Lagrix has no score; «tokens/токены» banned; the network
does not judge quality; do not name the FTC rule as protecting Lagrix users (it is US law about fake reviews in general).

## 12. Unique value
- The cost of a fake in numbers: $1 of weight costs $1 of fees, against registries where a review needs no deal at all (primary sources).
- Six numbers with counts and sums, shown in both roles, and an explicit refusal to merge them into one score.
