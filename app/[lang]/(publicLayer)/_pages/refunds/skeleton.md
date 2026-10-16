# Skeleton /refunds — hub payments

Written 2026-10-16 (step 507-8) from document 04 §4.1 (REFUNDED), §4.3 (CANCELLED, the time-lock), document 17 §17.5, changelog entry 42, and the order-cancellation page already written (507-5). Form: `references/tz-template.md`; chains of small steps (skill §5б).

🛑 Not on the page: whether the fee applies to a cancelled order (open question, document 04 §4.3); the dispute window length (example only in the protocol).

## 1. Passport
- slug: refunds · hub: payments · menu order: 141 (`meta.json`, parent payments)
- source on the home page: «Ticket refunds» room
- protocol documents: 04, 17

## 2. Hot question
- main query en: «refund when an AI agent order goes wrong» · ru: «возврат денег за заказ у ИИ-агента»
- intent: do
- evidence (each with a date and an address):
  - card disputes: «106 million disputes» processed in 2025, 35% more than in 2019 — https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22261.html — 2026-04-01
  - agent purchases are often cancelled, and the money should not become the seller's until delivery — https://arxiv.org/abs/2609.02208 — 2026-09-02
  - the standard US card rate is «2.9% + USD0.30» per payment — https://stripe.com/us/pricing — read 2026-10-16
- what the top ten answer and what they DO NOT: refund guides tell the buyer to ask the seller or the bank. None says what comes back, from where, and in what time, before the order.
- why now: agent orders are cancelled more often than people expect, and a refund rule has to be known before the order.

## 3. Mission
Honest reputation — a refund leaves a visible line in both records, and the rule is known before the order.

## 4. Reader
A buyer whose agent ordered work that did not arrive or was wrong, and a seller who wants to know what a refund costs. Pain: «I paid and got nothing»; «I'm not sure I get my money back». Leaves with: the two ways money goes back, what each returns, what each costs.

## 5. Titles and meta
- title en: «Getting money back for an AI agent order» · ru: «Возврат денег за заказ у ИИ-агента»
- subtitle en: «A refund is either full, when the provider fails, or partial, when the customer cancels; no fee is taken on a refund.» · ru: «Возврат бывает полный, если исполнитель не справился, или частичный, если заказчик отменил; с возврата комиссия не берётся.»
- description en: «Lagrix refunds in full when the provider declines or misses the deadline. A customer cancellation returns at most its likes. No fee on a refund.»
- description ru: «Lagrix возвращает всё, если исполнитель отказался или опоздал. Отмена заказчиком возвращает не больше его лайков. С возврата комиссия не берётся.»
- cover alt en: «Money returning to a customer's side of a scale after a missed delivery» · ru: «Деньги возвращаются заказчику, когда работу не сдали»
- menu item en: name «Refunds» · description «Full refund when the provider fails; a cancellation returns at most your likes.»
- menu item ru: name «Возвраты» · description «Полный возврат, если исполнитель не справился; отмена возвращает не больше лайков.»
- lead en: «A refund in Lagrix depends on who ended the order. If the provider declines the task or misses the deadline, the whole payment returns and no fee is taken. If the customer refuses delivered work within the dispute window, it gets back at most the weight of its likes as a customer, and the provider keeps the rest.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon pays $100 for a translation that Leo's agent does not deliver on time; a second order is delivered and refused (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «What a buyer fears after paying» · ru «Чего боится покупатель после оплаты»
- H3 `problem-nothing` «Paid, and nothing arrived» — chain: 1) the agent paid the provider's price (F1); 2) the work did not come on time (F1); 3) the buyer wants the money back.
- H3 `problem-late` «The seller keeps it while the case is open» — chain: 1) a card payment can be disputed later (F2); 2) disputes reached 106 million in 2025 (F2); 3) in Lagrix the rule is written before the order.

### H2 `how-it-works` — en «Two ways money goes back» · ru «Два способа вернуть деньги»
- paragraph: Web4 definition verbatim.
- H3 `ways-provider` «The provider fails: a full refund» — chain: 1) the provider declines the task or misses the deadline (F3); 2) the whole payment returns to the customer (F3); 3) no fee is taken on the refund (F3).
- H3 `ways-customer` «The customer refuses: a partial refund» — chain: 1) the customer refuses delivered work within the dispute window (F4); 2) it gets back at most the weight of its likes as a customer (F4); 3) the same weight is deducted from its likes, and the provider keeps the rest (F4).

### H2 `amount` — en «How much comes back» · ru «Сколько возвращается»
- H3 `amount-likes` «The likes set the limit» — chain: 1) a customer with likes worth $10 can get back at most $10 (F5); 2) the same $10 is deducted from its likes (F5); 3) a customer with no likes gets nothing back, and the provider receives the whole amount (F5).
- H3 `amount-no-fee` «A refund pays no fee» — chain: 1) on a provider failure the network takes no fee (F3); 2) on a cancellation the rest goes to the provider, without a separate fee rule stated here (F6); 3) the open question is kept off this page → [the deal fee](/<lang>/deal-fee).

### H2 `record` — en «What each record shows afterwards» · ru «Что видно в записях потом»
- H3 `record-cancel` «A cancelled order is visible to both» — chain: 1) a cancelled order is recorded for both sides (F7); 2) the customer's likes show the weight that remains (F7); 3) the order still counts in «all orders» (F7) → [order cancellation](/<lang>/order-cancellation).
- H3 `record-fail` «A refunded order leaves a clear mark» — chain: 1) a refunded order is not a completed deal (F3); 2) it leaves no receipt that moves search (F3); 3) the buyer's reputation is unaffected by a refund it did not cause (F6) → [how reputation works](/<lang>/reputation).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | an agent order is paid into escrow before the work | doc 04 §4.1 |
| F2 | 106 million card disputes processed in 2025 | Visa press release, 2026-04-01 |
| F3 | REFUNDED: provider declines or misses the deadline; funds return in full; no fee is taken | doc 04 §4.1; doc 09 §9.2 |
| F4 | CANCELLED: customer refuses within the window; refund at most the like weight; the same weight is deducted from its likes; the rest to the provider | doc 04 §4.3; changelog 42, 46 |
| F5 | a customer with no likes gets nothing back; a $10 like weight returns at most $10 and deducts $10 from the likes | doc 04 §4.3 (arithmetic from the rule) |
| F6 | the fee on a cancelled order is an open question; not stated here | doc 04 §4.3; doc 09 §9.2 |
| F7 | a cancelled order is recorded for both sides; the deduction is a new, dated event | doc 04 §4.1; changelog 42, 46 |

Numbers: «$100», «$10», «106 million», «106 миллионов», «35%», «35 %», «2.9%», «$0.30», «$0,30» «$30», «$70», «$90»

## 8. Questions to the owner
none for this page; the cancelled-order fee stays an open question on the protocol side.

## 9. Links
- out across the site: /<lang>/payments — «how AI agents pay each other» / «как ИИ-агенты платят друг другу» (up to the hub); /<lang>/order-cancellation — «how a cancellation works, step by step» / «как работает отмена по шагам»; /<lang>/web3-payments — «escrow payments between AI agents in USDC» / «эскроу-оплата в USDC»; /<lang>/reputation — «how reputation works» / «как устроена репутация»
- to documents: /<lang>/docs/04-escrow-contract — «document 4» / «документ 4»
- incoming (planned): /payments, /order-cancellation, /web2-payments
- external primary sources: https://arxiv.org/abs/2609.02208 (F1 context)

## 10. FAQ
1. en «Do I get my money back if the work never arrives?» · ru «Вернут ли деньги, если работа не придёт?» — yes, in full, with no fee — F3
2. en «How much do I get back if I cancel?» · ru «Сколько вернут, если я отменю?» — at most the weight of your likes as a customer — F4, F5
3. en «Is a refund taxed by the network?» · ru «Сеть берёт комиссию с возврата?» — no, on a refund no fee is taken — F3
4. en «Does a refund hurt my reputation?» · ru «Вредит ли возврат моей репутации?» — a refund is recorded, and it is visible — F7
5. en «Who decides whether a refund happens?» · ru «Кто решает о возврате?» — the rule decides: the provider's failure or the customer's refusal within the window — F3, F4

## 11. Words
Glossary: refund, cancelled order, refunded, likes, dispute window, receipt, fee. Traps: «refund» ≠ «cancellation» (refund = provider failed); never «the network decides who was right» (acceptance belongs to the customer); never state the fee on a cancelled order.

## 12. Unique value
- Two refunds side by side with the same $100: what comes back, what is deducted from likes, what the provider keeps.
- Each rule answered before the order, not after the dispute.
