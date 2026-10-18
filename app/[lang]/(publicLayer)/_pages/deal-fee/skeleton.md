# Skeleton /deal-fee — hub network

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-16 (step 507-6) from document 09 (§9.1–§9.5), document 05 §5.3, document 04 §4.1, §4.4, §4.6, README «Deals and the fee»
and glossary «Fee». Form: `references/tz-template.md`; every event is a chain of small steps (skill §5б).

🛑 Not on the page: the rate after modelling (5% is the ceiling and today's value; modelling may lower it); any amount a super-node will receive (document 09 §9.5: not known, not guaranteed).

## 1. Passport
- slug: deal-fee · hub: network · menu order: 122 (`meta.json`)
- source on the home page: «Fare: the fee comes only from a deal»
- protocol documents: 09, 05, 04

## 2. Hot question
- main query en: «AI agent marketplace transaction fee» · ru: «комиссия за сделку между ИИ-агентами»
- intent: learn
- evidence (each with a date and an address):
  - an app store keeps a fixed share of each sale: its small business programme «features a reduced commission rate of 15% on paid apps» —
    https://developer.apple.com/app-store/small-business-program/ — read 2026-10-16
  - card payments in the US: the standard rate is «2.9% + USD0.30» per successful transaction — https://stripe.com/us/pricing — read 2026-10-16
  - an open protocol fixes its fee in immutable code: «the rate is a constant in immutable code» — document 09 §9.2 — https://github.com/lagrix-dev/lagrix — 2026-10-13
- what the top ten answer and what they DO NOT: fee pages list a percentage the marketplace keeps. None says who receives the fee,
  whether a fake deal pays it, and why the rate cannot be changed by anyone.
- why now: agent-to-agent deals are many and small, so a percentage fee on each one decides whether small deals make sense.

## 3. Mission
Honest reputation — the fee is the price of a fake: a deal with oneself pays it, and a review weighs exactly what was paid.

## 4. Reader
A seller of agent work or a buyer who asks what the network takes and where it goes. Pain: «a marketplace keeps a third»; «who gets the
fee?»; «can the rate change later?». Leaves with: the fee is at most 5% of the network part only, it goes to super-nodes, the parties
never receive it, a refund pays no fee, and why the rate is in code.

## 5. Titles and meta
- title en: «The deal fee in Lagrix: at most 5%» · ru: «Комиссия сделки в Lagrix: не больше 5%»
- subtitle en: «The network keeps at most 5% of the part of a deal paid through it, and divides it among super-nodes; a refund pays no fee.»
  ru: «Сеть берёт не больше 5% от части сделки, оплаченной через неё, и делит между супер-узлами; возврат комиссии не платит.»
- description en: «Lagrix takes at most 5% of the network part of a deal, in USDC, for super-nodes, a fifth of it for F2F element developers. The parties never receive it.»
  ru: «Lagrix берёт не больше 5% от сетевой части сделки в USDC для супер-узлов, а пятую часть — для разработчиков элементов F2F. Стороны её не получают.»
- cover alt en: «A $100 deal with a $5 fee split among super-nodes» · ru: «Сделка на $100 с комиссией $5, которую делят супер-узлы»
- menu item en: name «Deal fee» · description «At most 5% of the part paid through the network, shared by super-nodes; a refund pays none.»
  ru: name «Комиссия сделки» · description «Не больше 5% от части, оплаченной через сеть, — супер-узлам; при возврате не берётся.»
- lead en (updated 2026-10-18, entry 51): «The Lagrix network takes a fee of at most 5% on the part of each deal paid through it, in USDC.
  It goes to the super-nodes that kept the network running, and a fifth to the developer of an element received over F2F. Parties never
  receive it, and a refunded deal pays none. The rate is fixed in immutable code.»
  ru: «Сеть Lagrix берёт комиссию не больше 5% с части каждой сделки, оплаченной через неё, в USDC. Комиссия уходит супер-узлам, которые
  держали сеть в этом периоде, а пятая часть — разработчику элемента, полученного по F2F. Стороны сделки её не получают, а возвращённая
  сделка комиссии не платит. Ставка записана в неизменяемый код и после развёртывания не меняется.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon buys a $100 translation through the network; Leo receives $95;
$5 goes to the super-nodes; a fake deal of Leo with his own second element pays the same $5 per $100. en 1240–1280, ru ≥ 1000.
Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «Why a marketplace fee is a guess» · ru «Почему комиссия маркетплейса — догадка»
- H3 `problem-keeps` «Someone keeps a third» · «Кто-то держит треть» — chain: 1) an app store keeps a share of each sale, set by the store
  (F1, external link); 2) the seller never sees the rule that changes it; 3) a reduced share depends on size and on the store's own programme.
- H3 `problem-fake` «A fake deal that pays nothing» · «Фальшивая сделка, которая ничего не стоит» — chain: 1) a rival makes deals with
  itself to collect reviews; 2) if a deal costs nothing, the reviews cost nothing (F2); 3) so the fee is the price of a fake, not a tax.

### H2 `how-it-works` — en «How the deal fee works» · ru «Как работает комиссия сделки»
- paragraph: Web4 definition verbatim.
- H3 `fee-part` «Only the part paid through the network» · «Только часть, оплаченная через сеть» — chain: 1) Anna pays $100: $80 through
  escrow and $20 in cash outside the network (F3); 2) the network sees only the $80 locked in escrow (F3); 3) the fee is taken from $80
  only: at most $4 (F4); 4) the $20 outside leaves no receipt and no fee (F3).
- H3 `fee-five` «At most 5%, and 5% today» · «Не больше 5 %, а сегодня 5 %» — chain: 1) the rate is a constant in immutable code (F4);
  2) it is set by modelling and never above 5% (F4); 3) until the modelling is done it is 5% (F4); 4) so Leo's whole $100 network deal
  gives $5 of fee (F4).

### H2 `where` — en «Where the fee goes» · ru «Куда идёт комиссия»
- H3 `where-pool` «One pool, shared equally» · «Один котёл, делится поровну» — (2026-10-18: first, when the provider works with an element
  received over F2F, 20% goes to its developer — F-dev, link /<lang>/docs/26-developer-share) chain: 1) the fees of a period are added up (F5); 2) at the
  end they are divided equally among super-nodes that passed the quality minimum (F5); 3) nothing carries over to later periods (F5);
  4) the parties of the deal never receive any of it (F5).
- H3 `where-why` «Why this way» · «Почему так» — chain: 1) the fee pays super-nodes for the work every deal relies on (F6); 2) a review
  weighs exactly the fee paid on its deal, so one dollar of weight costs one dollar of fees (F7); 3) a single rate for everyone: if each
  super-node set its own, each could lower it to zero (F8) → [what a super-node does](/<lang>/super-node).

### H2 `refund` — en «A refund pays no fee» · ru «Возврат комиссию не платит»
- H3 `refund-declined` «Declined or late: nothing taken» · «Отказ или опоздание: ничего не берётся» — chain: 1) Leo's agent declines the job or
  misses the deadline (F9); 2) the whole $100 goes back to Anna (F9); 3) the contract takes no fee on a refund (F9) → [how a cancellation works](/<lang>/order-cancellation).
- H3 `refund-open` «What is not yet decided» · «Что ещё не решено» — chain: 1) the rate and the exact share depend on modelling (F4, F5);
  2) a cancelled order pays the same fee on the provider's part, which is also the weight of each side's review, and writes no receipt (F10); 3) the full rules are in
  [document 9 of the protocol](/<lang>/docs/09-fee-distribution).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | an app store keeps a share of each sale, set by the store | Apple small business programme — on the page «one app store», named in the link |
| F2 | a review weighs the fee paid on its deal; a deal that pays nothing makes reviews free | doc 09 §9.4 |
| F3 | the fee is taken only from the network part, the amount locked in escrow; the part paid outside leaves no trace | doc 09 §9.2; doc 04 §4.6 |
| F4 | fee at most 5% of the network part; a constant in immutable code; 5% until modelling | doc 09 §9.2; doc 05 §5.3 |
| F5 | the fees of a period are pooled and divided equally among super-nodes that passed the quality minimum; nothing carries over; parties never receive it | doc 09 §9.3 |
| F6 | super-nodes do the work every deal relies on: discovery index, results, index of receipts and reviews, connections | doc 09 §9.4 |
| F7 | one unit of review weight costs one dollar of fees | doc 09 §9.4; doc 17 §17.5 |
| F8 | one rate for everyone; a rate set by each super-node would fall to zero | doc 09 §9.4 |
| F9 | on REFUNDED the funds return in full and no fee is taken | doc 04 §4.1; doc 09 §9.2 |
| F10 | a cancelled order pays the fee on the part the provider keeps; that fee weighs each side's review; no receipt | doc 09 §9.2; entry 55 |
| F-split | one reading of entry 51 at the deal level (owner 2026-10-18: «Оставить запись 51»): at a 5% fee, an element received over F2F gives 1% of the deal to its developer and 4% to the pool; the provider's own element gives all 5% to the pool | doc 05 §5.3, §5.7; doc 26; step 534 |
| F-dev | when the provider works with an element it received over F2F, 20% of the deal's fee goes first to the developer of that element, the rest to the pool; the parties never receive the fee | changelog entry 51; doc 26 §26.3 |

Numbers: «5%», «5 %», «$100», «$80», «$20», «$5», «$4», «15%», «2.9%», «USD0.30», «$0.30», «$0,30», «12 months», «12 месяцев», «20%», «20 %», «1%», «1 %», «4%», «4 %» (F-split, step 534) (document 17 §17.2: the last 12 months of paid work)

## 8. Questions to the owner
none for the page (the cancelled-order rule is decided by entry 55 and stated as F10).

## 9. Links
- out across the site: /<lang>/network — «an AI agent network without a central server» / «сеть ИИ-агентов без центрального сервера» (up to the hub);
  /<lang>/super-node — «what a super-node does» / «что делает супер-узел»; /<lang>/order-cancellation — «how a cancellation works» / «как работает отмена»;
  /<lang>/likes-and-dislikes — «why likes cannot be farmed» / «почему лайки нельзя накрутить»
- to documents: /<lang>/docs/09-fee-distribution — «document 9» / «документ 9»; /<lang>/docs/26-developer-share — «how the developer share
  works» / «как устроена доля разработчика» — H3 `where-pool`
- incoming (planned): /network, /search-fee, /super-node, /reputation
- external primary sources: https://developer.apple.com/app-store/small-business-program/ (F1); https://stripe.com/us/pricing (context)

## 10. FAQ
1. en «What does the network take from a deal?» · ru «Сколько сеть берёт с сделки?» — at most 5% of the part paid through it; 5% today — F3, F4
2. en «Who receives the fee?» · ru «Кто получает комиссию?» — the super-nodes that passed the period's quality minimum, equally; a fifth first
   to the developer of an element received over F2F; never the parties — F5, F-dev
3. en «Do I pay a fee if I am refunded?» · ru «Платят ли комиссию при возврате?» — no — F9
4. en «Can the rate be raised later?» · ru «Можно ли повысить ставку потом?» — no; it is in immutable code, and a change would need a new version that participants join voluntarily — F4
5. en «Is the fee charged on the part I pay in cash?» · ru «Берётся ли комиссия с части, которую я плачу наличными?» — no; that part is not in the network — F3

## 11. Words
Glossary: fee, network part, escrow, receipt, super-node, quality minimum, period, refund. Traps: never «commission» for the search fee;
«tokens» banned; never promise a super-node's income (F5 says it is not known in advance); state the cancelled-order rule only as F10 says it.

## 12. Unique value
- The fee walked through one $100 deal split into its network and outside parts, with who receives each cent.
- Why the rate is in code: a fake deal costs $1 of fees for $1 of review weight, shown in a single example.
