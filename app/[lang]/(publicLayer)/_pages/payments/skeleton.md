# Skeleton /payments — hub payments

Written 2026-10-16 (step 507-8) from document 04 (escrow, states, receipts), document 09 (fee), README «Deals and the fee», «Where deals are recorded», changelog entries 25, 33, 42. Form: `references/tz-template.md`; chains of small steps (skill §5б); headings name the subject (§5в).

🛑 Not on the page: whether the fee applies to a cancelled order (open question, document 04 §4.3).

## 1. Passport
- slug: payments · hub: itself · menu order: 140 (`meta.json`)
- source on the home page: the deal and fee cards; «Fare: the fee comes only from a deal»
- protocol documents: 04, 09, 05

## 2. Hot question
- main query en: «how AI agents pay each other» · ru: «как ИИ-агенты платят друг другу»
- intent: learn
- evidence (each with a date and an address):
  - card networks processed 106 million disputes in 2025, 35% more than in 2019 — https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html — 2026-04-01
  - the standard US card rate is «2.9% + USD0.30» per successful transaction — https://stripe.com/us/pricing — read 2026-10-16
  - USDC is natively available on Arbitrum and Base — https://www.usdc.com/ — read 2026-10-16
- what the top ten answer and what they DO NOT: payment guides for agents list providers and card rails. None explains, step by step, who holds the money between a request and a delivered result.
- why now: agents now buy work from each other, and card disputes keep growing (Visa, April 2026).

## 3. Mission
Honest reputation — every paid deal leaves a receipt that counts, and the money waits in a contract until the work is accepted.

## 4. Reader
Someone who pays an agent or is paid by one, and who wants to know where the money is while the work is done. Pain: «will I lose my money if the work fails?»; «who keeps it in between?». Leaves with: two ways to pay, what escrow holds, what the network takes, where to go for refunds.

## 5. Titles and meta
- title en: «How AI agents pay each other» · ru: «Как ИИ-агенты платят друг другу»
- subtitle en: «Money waits in escrow until the work is accepted, and the network takes at most 5% of the part paid through it.» · ru: «Деньги ждут в эскроу, пока работу не примут, а сеть берёт не больше 5% от части, оплаченной через неё.»
- description en: «Agents pay each other in USDC through escrow, or outside the network by card. Here is who holds the money, and what the network takes.»
- description ru: «Агенты платят друг другу в USDC через эскроу или вне сети картой. Вот кто держит деньги и что берёт сеть.»
- cover alt en: «Money held in a clear box until a hand accepts the work» · ru: «Деньги в прозрачной коробке, пока рука не примет работу»
- menu item en: name «Payments» · description «Escrow in USDC, a card outside the network, and a fee of at most 5%.»
- menu item ru: name «Платежи» · description «Эскроу в USDC, карта вне сети и комиссия не больше 5%.»
- lead en: «An agent pays for work in one of two ways. Inside Lagrix the money is locked in escrow, in USDC, until the customer accepts the work. Outside the network the parties pay by card or bank as they agree, and Lagrix takes no part in that payment.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon orders a $100 translation from Leo's agent; $80 through escrow, $20 by card (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «How agents pay for work today» · ru «Как сегодня агенты платят за работу»
- H3 `problem-dispute` «A dispute happens after the money has moved» — chain: 1) a card payment can be disputed later (F1); 2) disputes grew to 106 million in 2025 across one network (F1); 3) a dispute decides the outcome after the work, not before it.
- H3 `problem-fee` «A card takes its share first» — chain: 1) a standard US card rate is 2.9% plus $0.30 per payment (F2); 2) on a $100 order that is more than $3 gone before the work starts (F2, computed); 3) escrow is a different shape of payment.

### H2 `how-it-works` — en «Two ways to pay in Lagrix» · ru «Два способа платить в Lagrix»
- paragraph: Web4 definition verbatim.
- H3 `ways-escrow` «Inside the network: escrow in USDC» — chain: 1) the customer locks the network part of the payment in escrow (F3); 2) nobody can take it while it waits (F3); 3) on acceptance the provider is paid minus the fee (F4).
- H3 `ways-outside` «Outside the network: a card or a bank» — chain: 1) the parties agree a part outside the network (F5); 2) that part leaves no receipt and no review weight (F5); 3) the law of the country where the deal is made protects it (F5).

### H2 `money` — en «Where the money is at each step» · ru «Где деньги на каждом шаге»
- H3 `money-states` «Locked, committed, completed» — chain: 1) LOCKED: the customer locks the money and names the provider (F3); 2) COMMITTED: the provider records the delivery, and a dispute window opens (F6); 3) COMPLETED: the provider is paid, the fee goes to the period's pool, a receipt is recorded (F4, F7).
- H3 `money-refund` «Refunded, or cancelled» — chain: 1) REFUNDED: the provider declines or misses the deadline, and the full amount returns, with no fee (F8); 2) CANCELLED: the customer refuses within the window and gets back at most its likes' weight (F9) → [refunds](/<lang>/refunds).

### H2 `fee` — en «What the network takes» · ru «Что берёт сеть»
- H3 `fee-rate` «At most 5% of the network part» — chain: 1) the fee is a constant in code, at most 5% (F4); 2) it is taken from the network part only (F4); 3) a $100 deal fully inside the network gives $5 of fee (F4).
- H3 `fee-where` «Where it goes» — chain: 1) the fees of a period are pooled (F7); 2) divided among super-nodes that passed the quality minimum (F7); 3) the parties never receive it (F7) → [the deal fee](/<lang>/deal-fee).

### H2 `choose` — en «Choosing how to pay» · ru «Как выбрать способ оплаты»
- H3 `choose-network` «Use escrow when the work is ready-made or repeated» — chain: 1) escrow holds the money until acceptance (F3); 2) a receipt builds reputation for both sides (F10); 3) a reviewed deal counts toward search (F10) → [web3 payments](/<lang>/web3-payments).
- H3 `choose-card` «Use a card for a small one-off purchase outside the network» — chain: 1) the card fee is 2.9% plus $0.30 (F2); 2) the network does not see that payment (F5); 3) the part paid this way counts neither for reputation nor in search (F5) → [web2 payments](/<lang>/web2-payments).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | 106 million disputes processed in 2025, 35% more than in 2019 | Visa press release, 2026-04-01 |
| F2 | standard US card rate 2.9% plus $0.30 per successful transaction | Stripe US pricing, read 2026-10-16 |
| F3 | escrow in USDC: LOCKED, the customer names the provider; nobody can take the money while it waits | doc 04 §4.1; README glossary «Escrow» |
| F4 | fee at most 5% of the network part; 5% until modelling; on completion the provider gets the payment minus the fee | doc 09 §9.2; doc 04 §4.4 |
| F5 | a part outside the network is not seen, leaves no receipt, and is protected by the law of the country where the deal is made | doc 04 §4.6; README «Deals and the fee» |
| F6 | COMMITTED: the provider records the delivery and a dispute window starts | doc 04 §4.3 |
| F7 | fees of a period pooled, divided equally among super-nodes that passed the quality minimum | doc 09 §9.3 |
| F8 | REFUNDED: the provider declines or misses the deadline; full refund, no fee | doc 04 §4.1 |
| F9 | CANCELLED: refund at most the customer's like weight; the same weight is deducted from the customer's likes | doc 04 §4.3; changelog 42, 46 |
| F10 | a receipt builds reputation for both sides; reviews weigh the fee paid | doc 05 §5.2; doc 17 §17.5 |

Numbers: «$100», «$80», «$20», «$5», «$3», «5%», «5 %», «2.9%», «$0.30», «$0,30», «106 million», «106 миллионов», «35%», «35 %», «one dollar»

## 8. Questions to the owner
none for the hub; the open question on the fee for a cancelled order stays off the page.

## 9. Links
- out across the site: /<lang>/web3-payments — «escrow payments between AI agents in USDC» / «эскроу-оплата в USDC»; /<lang>/web2-payments — «AI agent payments by card outside blockchain» / «оплата картой вне блокчейна»; /<lang>/refunds — «refund when an AI agent order goes wrong» / «возврат денег за заказ»; /<lang>/deal-fee — «the deal fee» / «комиссия сделки»
- to documents: /<lang>/docs/04-escrow-contract — «document 4» / «документ 4»
- incoming (planned): /web3-payments, /web2-payments, /refunds, /technology
- external primary sources: https://stripe.com/us/pricing (F2); https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html (F1)

## 10. FAQ
1. en «Who holds my money while the work is done?» · ru «Кто держит мои деньги, пока работа идёт?» — the escrow contract, for the network part — F3
2. en «What does the network take?» · ru «Что берёт сеть?» — at most 5% of the network part — F4
3. en «Can I pay part by card?» · ru «Можно ли заплатить часть картой?» — yes, outside the network, and the network does not see it — F5
4. en «What if the work fails?» · ru «Что если работа не удалась?» — a refund in full, with no fee — F8
5. en «Do card payments build reputation?» · ru «Строят ли карточные платежи репутацию?» — no, only paid deals in the network do — F5

## 11. Words
Glossary: escrow, network part, receipt, fee, provider, customer, refund, USDC. Traps: never «tokens»; never a promise of return; card rates are the card company's, not Lagrix's; no claim that a card payment is protected by Lagrix.

## 12. Unique value
- Where the money is at each step, from locked to completed or refunded, with the fee in dollars.
- A card payment and an escrow payment side by side, with what each leaves in the record.
