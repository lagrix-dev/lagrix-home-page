# Skeleton /web2-payments — hub payments

Written 2026-10-16 (step 507-8) from README «Deals and the fee» (the part paid outside the network), document 04 §4.6, document 05 §5.2 (receipts), document 17 §17.5 (reviews), the Stripe and Visa checks of 2026-10-16. Form: `references/tz-template.md`; chains of small steps (skill §5б).

🛑 Not on the page: any claim that Lagrix processes card payments (it does not); any card provider's name as a recommendation; the rate of any provider beyond the published standard rate.

## 1. Passport
- slug: web2-payments · hub: payments · menu order: 142 (`meta.json`)
- source on the home page: the simulation of a salon paying in parts
- protocol documents: 04, 05, 17

## 2. Hot question
- main query en: «AI agent payments by card outside blockchain» · ru: «оплата ИИ-агентов картой без блокчейна»
- intent: do
- evidence (each with a date and an address):
  - the standard US card rate is «2.9% + USD0.30» per successful transaction — https://stripe.com/us/pricing — read 2026-10-16
  - card networks processed 106 million disputes in 2025 — https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html — 2026-04-01
  - the part of a deal outside the network leaves no receipt — protocol document 04 §4.6 — https://github.com/lagrix-dev/lagrix — 2026-10-13
- what the top ten answer and what they DO NOT: guides to agent payments by card list providers and integrations. None says, clearly, which part of a deal the network sees and which it never does.
- why now: many buyers want to pay by card while agents do the work, so the line between the two parts has to be drawn honestly.

## 3. Mission
Honest reputation — a payment outside the network is outside the record: it is the parties' business, and it counts for nothing in reputation or search.

## 4. Reader
Someone whose customer pays by card or bank, or who wants to pay a provider that way for a small one-off job. Pain: «can I use my card?»; «will this count for my reputation?». Leaves with: which part the network sees, what the card fee is, what the law protects.

## 5. Titles and meta
- title en: «Paying an AI agent by card, outside the network» · ru: «Оплата ИИ-агента картой, вне сети»
- subtitle en: «The parties may pay part of a deal by card or bank, as they agree. The network does not see that part, and it counts for nothing in reputation.» · ru: «Стороны могут заплатить часть сделки картой или переводом по договорённости. Сеть эту часть не видит, и в репутацию она не идёт.»
- description en: «Pay part of an agent deal by card or bank, outside Lagrix. The network does not see that part: it leaves no receipt and no review weight.»
- description ru: «Заплатите часть сделки с агентом картой или переводом вне Lagrix. Сеть эту часть не видит: чека и веса отзыва она не оставляет.»
- cover alt en: «A card and a receipt slip kept apart from the network's record» · ru: «Карта и чек, отделённые от записи сети»
- menu item en: name «Card payments» · description «Pay part of a deal by card, outside the network: the network does not see it.»
- menu item ru: name «Оплата картой» · description «Часть сделки картой вне сети: сеть её не видит.»
- lead en: «A deal can be paid in two parts. The part paid through the network is locked in escrow and leaves a receipt. The part paid by card or bank, outside the network, is the parties' own matter: Lagrix takes no part in it and does not see it.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon pays Leo's agent $100 for a translation: $80 through escrow, $20 by card (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «How agents get paid by card today» · ru «Как агенты сегодня получают оплату картой»
- H3 `problem-habit` «Most buyers still think in cards» — chain: 1) the customer has a card and expects to pay with it; 2) a card is the familiar way, and the card fee is set by the card company (F1); 3) so a buyer may ask for a card even for an agent's work.
- H3 `problem-dispute` «A card dispute happens after the payment» — chain: 1) a card payment can be disputed later (F2); 2) the disputes totalled 106 million in 2025 (F2); 3) the outcome comes after the work, through the card system.

### H2 `how-it-works` — en «Which part the network sees» · ru «Какую часть видит сеть»
- paragraph: Web4 definition verbatim.
- H3 `part-network` «The part through the network» — chain: 1) the network part is locked in escrow in USDC (F3); 2) only that part leaves a receipt (F3); 3) only that part counts toward reputation and search (F3).
- H3 `part-outside` «The part outside the network» — chain: 1) the parties agree how much is paid by card or bank (F4); 2) the network does not see it (F4); 3) it is protected by the law of the country where the deal is made, not by Lagrix (F4).

### H2 `cost` — en «What a card costs» · ru «Сколько стоит карта»
- H3 `cost-card` «The card company's rate» — chain: 1) the standard US card rate is 2.9% plus $0.30 per successful payment (F1); 2) on a $20 part that is $0.88, paid to the card company (F1, computed); 3) Lagrix does not set or take that rate.
- H3 `cost-network` «The network's part» — chain: 1) the network takes at most 5% of its own part (F5); 2) the card rate and the network fee are separate, and they add up only if both parts are used (F5); 3) the deal fee page explains the network side → [the deal fee](/<lang>/deal-fee).

### H2 `record` — en «What is left in the record» · ru «Что остаётся в записи»
- H3 `record-none` «Nothing is written for the card part» — chain: 1) no receipt is written for the card part (F3); 2) no review weight comes from it (F6); 3) it does not move a provider in search (F6).
- H3 `record-both` «The network part still counts» — chain: 1) the network part leaves a receipt that names the element that did the work (F3); 2) both sides may review each other on it (F6); 3) the receipt counts for a year in search (F6) → [how search results are built](/<lang>/discovery).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | standard US card rate 2.9% plus $0.30 per successful transaction; the card company sets it | Stripe US pricing, read 2026-10-16 |
| F2 | 106 million card disputes processed in 2025, 35% more than in 2019 | Visa press release, 2026-04-01 |
| F3 | only the network part is locked in escrow; only it leaves a receipt; only it counts | doc 04 §4.6; doc 05 §5.2 |
| F4 | a part paid outside the network is not seen by the network and is protected by the law of the country where the deal is made | README «Deals and the fee»; doc 04 §4.6 |
| F5 | network fee at most 5% of the network part | doc 09 §9.2 |
| F6 | reviews belong to a deal paid through the network; a receipt orders search for the last year of paid work | doc 17 §17.5; §17.2 |

Numbers: «2.9%», «$0.30», «$0,30», «$20», «$80», «$100», «$0.88», «$0,88», «5%», «5 %», «106 million», «106 миллионов», «35%», «35 %», «12 months», «12 месяцев» «$0.58», «$0,58», «$4»

## 8. Questions to the owner
none.

## 9. Links
- out across the site: /<lang>/payments — «how AI agents pay each other» / «как ИИ-агенты платят друг другу» (up to the hub); /<lang>/web3-payments — «escrow payments between AI agents in USDC» / «эскроу-оплата в USDC»; /<lang>/deal-fee — «the deal fee» / «комиссия сделки»; /<lang>/discovery — «how search results are built» / «как строится выдача»
- to documents: /<lang>/docs/04-escrow-contract — «document 4» / «документ 4»
- incoming (planned): /payments, /web3-payments, /refunds
- external primary sources: https://stripe.com/us/pricing (F1); https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html (F2)

## 10. FAQ
1. en «Can I pay an agent by card?» · ru «Можно ли заплатить агенту картой?» — yes, for a part of the deal, outside the network — F4
2. en «Does a card payment build my reputation?» · ru «Строит ли оплата картой репутацию?» — no — F3, F6
3. en «Who protects a card payment?» · ru «Кто защищает оплату картой?» — the law of the country where the deal is made, and the card system — F4
4. en «Does Lagrix see my card?» · ru «Lagrix видит мою карту?» — no — F4
5. en «What does the card cost?» · ru «Сколько стоит карта?» — 2.9% plus $0.30 at the standard US rate — F1

## 11. Words
Glossary: network part, outside the network, receipt, escrow, card, bank transfer. Traps: never say Lagrix «accepts cards»; never name a card provider as a recommendation; never promise protection by Lagrix for the card part; «web2» is a name of the page, not a claim about the internet.

## 12. Unique value
- The two parts of one deal, drawn side by side, with what the network sees in each.
- The card fee and the network fee in dollars on the same $100 deal.
