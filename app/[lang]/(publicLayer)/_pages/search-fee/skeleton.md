# Skeleton /search-fee — hub network

Written 2026-10-16 (step 507-6) from document 17 §17.8 (the search fee, vouchers, batches, the price is the same everywhere), README
glossary «Voucher», «Batch», «Stamp», document 08 §8.5 (stamp price measured 14 October 2026). Form: `references/tz-template.md`; every
event is a chain of small steps (skill §5б).

## 1. Passport
- slug: search-fee · hub: network · menu order: 121 (`meta.json`)
- source on the home page: «Fare: one search result list costs $0.01»
- protocol documents: 17, 08, 05

## 2. Hot question
- main query en: «how much does AI agent search cost» · ru: «сколько стоит поиск ИИ-агента»
- intent: learn
- evidence (each with a date and an address):
  - a search index is worth copying only if it is cheap to copy: at Lagrix's price a million searches cost $10,000 — document 17 §17.8, changelog entry 39 — https://github.com/lagrix-dev/lagrix — 2026-10-13
  - a simple USDC transfer on Arbitrum or Base costs a fraction of a cent: median $0.0028 on Arbitrum and $0.00065 on Base, measured
    2026-10-14 — https://arb1.arbitrum.io/rpc and https://mainnet.base.org (document 08 §8.5)
  - USDC is native on Arbitrum and Base — https://www.usdc.com/ — read 2026-10-16
- what the top ten answer and what they DO NOT: pages on AI search APIs list per-call prices of large providers. None says what one
  result list costs in a network where the searcher pays the super-node that builds it, at the same price for everyone everywhere.
- why now: agents now search each other at machine speed, so the price of one search decides whether a search is worth making.

## 3. Mission
Discovery — finding an agent costs a cent, so the search is paid for by the one who searches, and the index cannot be copied cheaply.

## 4. Reader
Someone whose agent must search before every order, and who wants to know what each search costs and why it is that price. Pain: «a
search fee per call will eat my budget»; «why is there a fee at all?». Leaves with: $0.01 per result list, when a search is free, how
vouchers and batches make the price possible, what the fee buys.

## 5. Titles and meta
- title en: «What one AI agent search costs» · ru: «Сколько стоит один поиск ИИ-агента»
- subtitle en: «One result list costs $0.01 in USDC, the same everywhere; repeated work with the same partner costs nothing.»
  ru: «Один список результатов стоит $0,01 в USDC — одинаково везде; повторная работа с тем же партнёром ничего не стоит.»
- description en: «One AI agent search costs $0.01 in USDC, the same everywhere. A partner found once is never searched for again.»
  ru: «Один поиск ИИ-агента стоит $0,01 в USDC — одинаково везде. Найденного однажды партнёра повторно не ищут.»
- cover alt en: «A one-cent voucher for one result list» · ru: «Ваучер на один цент за один список результатов»
- menu item en: name «Search fee» · description «One result list costs $0.01 in USDC, the same everywhere; no receipt is created by a search.»
  ru: name «Цена поиска» · description «Один список результатов — $0,01 в USDC, одинаково везде; поиск не создаёт чека.»
- lead en: «A search through the Lagrix network costs $0.01 per result list, paid in USDC, and the price is the same for everyone in every
  country. The fee pays the super-node that builds the list. A search creates no receipt, and a partner already known is never searched
  for again.»
  ru: «Поиск через сеть Lagrix стоит $0,01 за список результатов, оплачивается в USDC, и цена одинакова для всех в любой стране. Комиссия
  платит супер-узлу, который строит список. Поиск не создаёт чека, а уже известного партнёра повторно не ищут.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's booking agent needs a translator for her salon's price list; Leo's
agent is found by a search. en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «Why search is not free» · ru «Почему поиск не бесплатный»
- H3 `problem-cost` «Building a list is work» · «Список — это работа» — chain: 1) a super-node gathers announcements, filters them and
  orders them (F1); 2) it computes the turn for the fourth place (F1); 3) that work costs real servers every time (F1).
- H3 `problem-scrape` «A free index gets copied» · «Бесплатный каталог копируют» — chain: 1) if search were free, anyone could copy the
  whole index with a million searches (F2); 2) at $0.01 the same copy costs $10,000 (F2); 3) the price protects the index from being scraped.

### H2 `how-it-works` — en «How one search is paid» · ru «Как оплачивается один поиск»
- paragraph: Web4 definition verbatim.
- H3 `pay-voucher` «A voucher, not a transaction» · «Ваучер, а не транзакция» — chain: 1) Anna's agent signs a voucher for exactly $0.01 from
  its prepaid balance (F3); 2) the voucher never goes on-chain by itself and needs no stamp (F4); 3) the super-node gathers vouchers and
  redeems them in one batch with one stamp (F4); 4) no search waits for a transaction (F3).
- H3 `pay-same` «One price everywhere» · «Одна цена везде» — chain: 1) the price is a constant in code (F5); 2) the same in every country
  and for every searcher (F5); 3) there is no cheaper «without a wallet» price: every node has a wallet (F6).

### H2 `what-buys` — en «What the fee buys, and what it does not» · ru «За что платится, а за что нет»
- H3 `buys-list` «The list, not the person» · «Список, а не человека» — chain: 1) the fee pays for building a result list (F7); 2) it never
  pays for access to a person: contacts are public (F7); 3) a search creates no receipt (F8) → [what the other side sees](/<lang>/reputation).
- H3 `buys-repeat` «Known partners cost nothing twice» · «Знакомых партнёров дважды не ищут» — chain: 1) Maria's agent searches once and
  finds Leo (F9); 2) the next time it writes to Leo directly, with no search (F9); 3) repeated work costs nothing (F9) → [how search results are built](/<lang>/discovery).

### H2 `stamp` — en «The stamp under the fee» · ru «Марка под комиссией»
- H3 `stamp-cost` «A stamp is a fraction of a cent» · «Марка — доля цента» — chain: 1) each write to the blockchain costs a stamp (F10);
  2) on 14 October 2026 a simple USDC transfer cost a median $0.0028 on Arbitrum and $0.00065 on Base (F10); 3) so a $0.01 search can
  carry its stamp only in a batch (F10) → [the four small prices](/<lang>/network).
- H3 `stamp-none` «Nobody sells stamps» · «Марки никто не продаёт» — chain: 1) network participants do not sell stamps to each other (F11);
  2) each pays its own write, in ether or through a third-party paymaster (F11); 3) the price itself is set by the network, not by a
  super-node (F11) → [what a super-node pays for](/<lang>/super-node).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | a super-node gathers announcements, filters, orders and computes the turn for every fourth place; the searcher pays for this service | doc 17 §17.8 |
| F2 | $0.01 per result list; a million searches cost $10,000 | doc 17 §17.8 |
| F3 | the searcher signs a voucher for exactly $0.01 from a prepaid USDC balance; no search waits for a transaction | doc 17 §17.8 |
| F4 | a voucher never goes on-chain on its own and needs no stamp; a super-node redeems vouchers in batches | README glossary «Voucher», «Batch»; doc 17 §17.8 |
| F5 | the price is a constant in code, the same for everyone everywhere | doc 17 §17.8 |
| F6 | no «without a wallet» price: every node has a wallet | doc 17 §17.8; entry 39 |
| F7 | the fee pays for building a result list, never for access to a person: contacts are public | doc 17 §17.8 |
| F8 | a search fee creates no receipt | doc 17 §17.8 |
| F9 | parties who know each other do not search again; repeated work costs nothing | doc 17 §17.8 |
| F10 | simple USDC transfer median $0.0028 on Arbitrum (21 transfers) and $0.00065 on Base (15), measured 2026-10-14 | doc 08 §8.5 |
| F11 | participants do not sell stamps; everyone pays their own stamps in ether or through a third-party service; a super-node pays stamps only for its own actions | doc 08 §8.5 |

Numbers: «$0.01», «$0,01», «$10,000», «$10 000», «$0.0028», «$0,0028», «$0.00065», «$0,00065», «14 October 2026», «14 октября 2026»

## 8. Questions to the owner
none.

## 9. Links
- out across the site: /<lang>/network — «an AI agent network without a central server» / «сеть ИИ-агентов без центрального сервера» (up to the hub);
  /<lang>/discovery — «how search results are built» / «как строится выдача»; /<lang>/reputation — «what the other side sees» / «что видит другая сторона»;
  /<lang>/super-node — «what a super-node pays for» / «за что платит супер-узел»
- to documents: /<lang>/docs/17-discovery-ranking-feedback — «document 17» / «документ 17»
- incoming (planned): /network, /nodes, /deal-fee
- external primary sources: https://arb1.arbitrum.io/rpc (F10); https://mainnet.base.org (F10)

## 10. FAQ
1. en «How much does one search cost?» · ru «Сколько стоит один поиск?» — $0.01 per result list, in USDC, the same everywhere — F2, F5
2. en «Do I pay a stamp for each search?» · ru «Платят ли марку за каждый поиск?» — no; vouchers are redeemed in batches — F4
3. en «Does a search leave a record?» · ru «Остаётся ли после поиска запись?» — no receipt is created — F8
4. en «Do I pay again to reach a partner I already found?» · ru «Платить ли снова, чтобы связаться с найденным партнёром?» — no; repeated work costs nothing — F9
5. en «Why charge at all?» · ru «Зачем вообще брать плату?» — the list costs real servers to build, and the fee protects the index from copying — F1, F2

## 11. Words
Glossary: result list, search, voucher, batch, stamp (gas), USDC, super-node, receipt. Traps: a search is never «a transaction» to the
searcher; «fee» here is the search fee, not the deal fee (≤ 5%); no «tokens»; no promise of savings.

## 12. Unique value
- The price of a fake copy of the index in dollars: $10,000 for a million searches.
- A stamp measured on a particular day, with the networks named, next to the one-cent price.
