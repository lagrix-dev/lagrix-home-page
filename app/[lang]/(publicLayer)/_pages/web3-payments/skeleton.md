# Skeleton /web3-payments — hub payments

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-16 (step 507-8) from document 04 (the escrow state machine, EIP-712 receipts, the time-lock, §4.3–§4.7), document 09 §9.2, README «Deals and the fee», changelog entries 33, 37, 39, USDC check of 2026-10-16. Form: `references/tz-template.md`; chains of small steps (skill §5б).

🛑 Not on the page: the exact dispute window length (document 04 gives it as an example only); whether the fee applies to a cancelled order (open question); the gas price beyond the measured figure of document 08 §8.5 (not restated here).

## 1. Passport
- slug: web3-payments · hub: payments · menu order: 141 (`meta.json`)
- source on the home page: the deal and escrow cards
- protocol documents: 04, 09, 08

## 2. Hot question
- main query en: «escrow payments between AI agents in USDC» · ru: «эскроу-оплата между ИИ-агентами в USDC»
- intent: do
- evidence (each with a date and an address):
  - USDC is natively available on Arbitrum and Base, and is redeemable one for one with the US dollar — https://www.usdc.com/ — read 2026-10-16
  - a simple USDC transfer on Arbitrum cost a median $0.0028 on 14 October 2026 — https://arb1.arbitrum.io/rpc — 2026-10-14
  - a protocol that holds money in escrow by fixed rules, with no administrator key — protocol document 04 §4.1 — https://github.com/lagrix-dev/lagrix — 2026-10-13
- what the top ten answer and what they DO NOT: escrow guides describe a marketplace holding money for the platform. None shows the escrow contract's states in order, nor who can and cannot touch the money at each one.
- why now: agents now buy work from each other on stablecoin rails, and a rule for holding money has to be written before the first deal.

## 3. Mission
Honest reputation — the money waits in a contract, and the record of the deal is written only when the money has really moved.

## 4. Reader
An owner of an agent who sells or buys work and wants to know where the money sits while the work is done, and what happens if the work is late or wrong. Leaves with: the five states, who acts in each, what the fee is, what the receipt records.

## 5. Titles and meta
- title en: «Escrow payments between AI agents in USDC» · ru: «Эскроу-оплата между ИИ-агентами в USDC»
- subtitle en: «The customer locks USDC in a public contract; the provider is paid only when the work is accepted.» · ru: «Заказчик блокирует USDC в публичном контракте; исполнитель получает оплату только после приёмки работы.»
- description en: «Lagrix escrow holds USDC in a public contract until the customer accepts the work. Five states, a fee of at most 5%, and a receipt.»
- description ru: «Эскроу Lagrix держит USDC в публичном контракте, пока заказчик не примет работу. Пять состояний, комиссия не больше 5% и чек.»
- cover alt en: «A USDC coin locked in a glass case until a stamp of acceptance» · ru: «Монета USDC в стеклянной витрине до печати приёмки»
- menu item en: name «Escrow» · description «USDC locked in a public contract until the work is accepted.»
- menu item ru: name «Эскроу» · description «USDC в публичном контракте до приёмки работы.»
- lead en: «In Lagrix a customer locks USDC in an escrow contract and names the provider. Nobody can take the money while it waits. When the customer accepts the work, the provider is paid minus the fee. The receipt of the closed deal then counts for both sides.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon orders a $100 translation from Leo's agent; the network part is $80 (fictional names only). en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «What a payment must do» · ru «Что должна делать оплата»
- H3 `problem-trust` «Neither side should hold the other's money» — chain: 1) the customer pays before the work is seen (F1); 2) the provider works before the money is safe (F1); 3) a contract in the middle holds the money by rules both can read (F1).
- H3 `problem-chain` «The chain itself is public» — chain: 1) the contracts run on Arbitrum and Base, public networks with a sequencer (F2); 2) a simple transfer costs a fraction of a cent there (F3); 3) so holding money in escrow is cheap enough for small deals (F3).

### H2 `how-it-works` — en «How an escrow deal runs» · ru «Как идёт сделка в эскроу»
- paragraph: Web4 definition verbatim.
- H3 `run-lock` «Locked: the customer names the provider» — chain: 1) the customer locks the network part in USDC (F4); 2) it names the provider's address (F4); 3) nobody else can take the order (F4).
- H3 `run-commit` «Committed: the delivery is on the record» — chain: 1) the provider does the work and sends the result over the network (F5); 2) it records the submission in the contract, which starts the timer (F5); 3) the customer has a short window to accept or refuse (F5).

### H2 `money` — en «What closes the deal» · ru «Что закрывает сделку»
- H3 `close-accept` «Accepted: the provider is paid» — chain: 1) the customer's agent checks the work and signs an acceptance (F6); 2) the provider submits the signature, and the contract checks it (F6); 3) the deal moves to COMPLETED, and the provider is paid minus the fee (F7).
- H3 `close-silence` «Silence: the timer closes it» — chain: 1) if the customer sends no signature, the window passes (F5); 2) the provider closes the deal on the timer, with the same fee and receipt (F8); 3) silence cannot freeze the provider's money (F8).

### H2 `fee` — en «The fee and the receipt» · ru «Комиссия и чек»
- H3 `fee-cut` «At most 5% of the network part» — chain: 1) the fee is a constant in code, at most 5% (F7); 2) on an $80 network part, at most $4 (F7); 3) the fee goes to the period's pool (F7) → [the deal fee](/<lang>/deal-fee).
- H3 `fee-receipt` «The receipt names who did the work» — chain: 1) a receipt records the amount, the customer, the provider and the element that did the work (F9); 2) the reviews of both sides belong to that receipt (F9); 3) only money that moved through escrow leaves a receipt (F9).

### H2 `safety` — en «Who can and cannot touch the money» · ru «Кто может и не может тронуть деньги»
- H3 `safe-nobody` «Nobody, not even the authors» — chain: 1) while the money waits in escrow, the parties cannot take it (F1); 2) neither can the network or the authors of the protocol (F10); 3) the rules are in immutable contracts, with no administrator key (F10).
- H3 `safe-gas` «Gas is paid by whoever acts» — chain: 1) each write to the chain costs a stamp (F11); 2) whoever acts pays for its own write (F11); 3) network participants do not sell stamps to each other (F11) → [web2 payments](/<lang>/web2-payments) for the card path.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | escrow holds the network part until acceptance; nobody can take it while it waits | doc 04 §4.1; README glossary «Escrow» |
| F2 | Lagrix contracts are written for an EVM layer-2 network; the sequencer orders transactions | doc 04 intro; README glossary «Sequencer» |
| F3 | a simple USDC transfer median $0.0028 on Arbitrum, measured 2026-10-14; a fraction of a cent | doc 08 §8.5; arb1.arbitrum.io/rpc |
| F4 | LOCKED: the customer locks USDC and names the provider; nobody else can take over | doc 04 §4.1 |
| F5 | COMMITTED: the provider records the submission; the dispute window starts; the customer may refuse within it | doc 04 §4.1, §4.3 |
| F6 | acceptance is an EIP-712 signature by the customer, checked by the contract | doc 04 §4.2 |
| F7 | COMPLETED: the provider gets the payment minus the fee, at most 5% of the network part | doc 04 §4.4; doc 09 §9.2 |
| F8 | the provider may close the deal on the timer after the window; same fee and receipt | doc 04 §4.3 |
| F9 | the receipt records amount, customer, provider, super-node and element; only the network part counts | doc 04 §4.5–§4.6 |
| F10 | rules live in immutable contracts with no administrator key | doc 04 intro; doc 05 intro |
| F11 | stamps paid by whoever acts; participants do not sell stamps | doc 08 §8.5 |
| F-dev | when the provider works with an element it received over F2F, 20% of the deal's fee goes first to the developer of that element, the rest to the pool; the parties never receive the fee | changelog entry 51; doc 26 §26.3 | (2026-10-18: the fee paragraph names it)

Numbers: «$100», «$80», «$4», «5%», «5 %», «$0.0028», «$0,0028», «14 October 2026», «14 октября 2026» «$76», «$95», «$5», «$20»

## 8. Questions to the owner
none for the page; the dispute window length and the fee on a cancelled order are not stated.

## 9. Links
- out across the site: /<lang>/payments — «how AI agents pay each other» / «как ИИ-агенты платят друг другу» (up to the hub); /<lang>/refunds — «refund when an AI agent order goes wrong» / «возврат денег за заказ»; /<lang>/deal-fee — «the deal fee» / «комиссия сделки»; /<lang>/web2-payments — «AI agent payments by card outside blockchain» / «оплата картой вне блокчейна»
- to documents: /<lang>/docs/04-escrow-contract — «document 4» / «документ 4»
- incoming (planned): /payments, /refunds, /deal-fee
- external primary sources: https://www.usdc.com/ (F2 context); https://arb1.arbitrum.io/rpc (F3)

## 10. FAQ
1. en «Who holds the money while the work is done?» · ru «Кто держит деньги, пока работа идёт?» — the escrow contract — F1
2. en «Can the provider be paid before the work is accepted?» · ru «Можно ли получить оплату до приёмки?» — no; payment comes on acceptance or on the timer after the window — F5, F8
3. en «What does the network take?» · ru «Что берёт сеть?» — at most 5% of the network part — F7
4. en «Is there a receipt?» · ru «Есть ли чек?» — yes, for a closed deal, naming who did the work — F9
5. en «Who can change the rules?» · ru «Кто может изменить правила?» — nobody; they live in immutable contracts — F10

## 11. Words
Glossary: escrow, network part, receipt, fee, USDC, stamp, customer, provider, sequencer. Traps: never «tokens»; never «guaranteed» for a deal; never «the network judges quality» (it does not); keep the seconds and the windows as «a short window», not a number.

## 12. Unique value
- The five states of one order, in order, with who acts at each.
- Silence cannot freeze a provider's money: the timer closes the deal with the same fee.
