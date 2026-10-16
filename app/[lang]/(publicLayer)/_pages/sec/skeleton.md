# Skeleton /sec — hub regulators

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-17 (step 507-10) by the federal agent, from protocol document 22 (§22.1–§22.5, §22.9), changelog entries 1, 18, 25, 31,
39–42, and Release 33-11412 as quoted in the risk-map report §1 (verified in step 473). Read before writing: risk-map report, MiCA report
§0, word bans. 🛑 Never: lottery vocabulary (places are «assigned by random choice»); tokens, listing, coin, price; «complies», «not a
security»; no call to early benefit («become an operator», «best terms at the start»).

## 1. Passport
- slug: sec · hub: regulators · menu order: 168 (`meta.json`); menu item exists
- source on the home page: section «Customs» — SEC
- protocol documents: 22

## 2. Hot question
- main query en: «SEC Howey test for a decentralized network» · ru: «тест Howey SEC для децентрализованной сети»
- intent: learn
- evidence (each with a date and an address):
  - SEC and CFTC, Release 33-11412: Howey kept; «the common enterprise element must be satisfied»; a functional system «does not have a central party that oversees participation or distributes rewards to users» — https://www.cftc.gov/LawRegulation/FederalRegister/finalrules/2026-05635.html — 2026-03-23
  - the same release (SEC text): node operators engage in «an administrative or ministerial activity», rewards are payments «in exchange for services it provides», with a structure «predetermined by the protocol» — https://www.sec.gov/files/rules/interp/2026/33-11412.pdf — 2026-03-23
  - SEC proposed «Regulation Crypto Assets» (a proposal, adoption not checked) — https://www.federalregister.gov/documents/2026/08/21/2026-17183/regulation-crypto-assets — 2026-08-21
- what the top ten answer and what they DO NOT: law-firm notes summarise the release. None applies each part of the test to one open agent
  network, with the rule in code and the document where it lives.
- why now: the release took effect on 23 March 2026 and replaced the 2019 staff framework.

## 3. Mission
Honest reputation — a network whose record cannot be bought must also be built so that nobody profits from controlling it.

## 4. Reader
A builder or investor asking whether an agent network is a security. Pain: «does a fee pool make a common enterprise», «are node rewards
profits from others' efforts», «what about the founder». Leaves with: each part of the test, Lagrix's design answer, how operators are
paid, the founder's commitments, and that the analysis depends on the facts.

## 5. Titles and meta
- title en: «The SEC Howey test and a decentralized agent network» · ru: «Тест Howey SEC и децентрализованная сеть агентов»
- subtitle en: «Each part of the Howey test, read against how Lagrix is built: no sale, nothing to manage after launch, operators paid for their work.»
  ru: «Каждая часть теста Howey рядом с устройством Lagrix: продажи нет, после запуска управлять нечем, операторам платят за работу.»
- description en: «How the Howey test meets Lagrix: nothing sold to raise money, immutable contracts, operators paid by a formula for their work. A design, not advice.»
  ru: «Как тест Howey встречается с Lagrix: ничего не продаётся ради денег, контракты неизменяемы, операторам платят по формуле за их работу.»
- cover alt en: «The four parts of the Howey test next to Lagrix's design» · ru: «Четыре части теста Howey рядом с устройством Lagrix»
- menu: exists, unchanged
- lead en: «The SEC applies the Howey test: an investment of money, in a common enterprise, with an expectation of profits from the efforts of
  others. Lagrix is designed so that nothing is sold to raise money, nothing is left to manage after launch, and operators are paid by a
  fixed formula for their own work. How the test applies is decided on the facts; this is a statement of design.»
  ru: «SEC применяет тест Howey: вложение денег в общее предприятие с ожиданием прибыли от усилий других. Lagrix устроен так, что ничего не
  продаётся ради сбора денег, после запуска управлять нечем, а операторам платят по закреплённой формуле за их собственную работу. Как
  применяется тест, решают по фактам; это описание устройства.»

## 6. Body plan
One running example: **Leo** (provider, translation agent) and **Anna** («Bella» salon) — a $100 deal, fee $5; an unnamed super-node
operator shows how operators are paid. en 1240–1280 words, ru ≥ 1000. H2 name the subject (§5в); en without dashes.

### H2 `today` — en «What the Howey test asks» · ru «Что спрашивает тест Howey»
- H3 `today-test` «Four parts of one test» · «Четыре части одного теста» — chain: 1) in March 2026 the SEC and CFTC published Release
  33-11412 (F1, external link); 2) it keeps Howey (1946): investment of money, common enterprise, expectation of profits, efforts of others
  (F1); 3) the common enterprise element must be satisfied (F1); 4) no safe harbour: it «depends on the specific facts and circumstances,
  taken as a whole»; it replaced the 2019 staff framework (F1). Budget 140.
- H3 `today-efforts` «Promises and managerial efforts» · «Обещания и управленческие усилия» — chain: 1) an investment contract arises
  when an issuer induces a purchase with promises of essential managerial efforts; explicit promises with milestones and a timeline weigh
  more (F2); 2) node operators who run software by protocol rules engage in administrative or ministerial activity; their rewards are
  payments for services with a structure predetermined by the protocol (F3, external link). Budget 140.

### H2 `parts` — en «How Lagrix answers each part» · ru «Как Lagrix отвечает на каждую часть»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `part-money` «An investment of money» · «Вложение денег» — chain: 1) nobody sells anything to raise money: no sale, presale,
  allocation for investors or fund (F4); 2) Anna pays $100 and receives a translation (F4); 3) her review is a record, not an asset; it
  cannot be transferred or sold (F4). Budget 120.
- H3 `part-profits` «An expectation of profits» · «Ожидание прибыли» — chain: 1) Leo is paid by Anna for his work through escrow, minus
  the $5 fee (F5); 2) super-nodes are paid fees for the work they do (F6); 3) no document promises any income (F5). Budget 110.
- H3 `part-efforts` «The efforts of others» · «Усилия других» — chain: 1) the contracts are immutable: no administrator key, no upgrade
  key, no parameter anyone can change (F7); 2) no council, no vote (F7); 3) the protocol is MIT; any program can be a node; if the authors
  disappeared, the network would run by the same rules (F8) → [all regulator questions](/<lang>/regulators). Budget 140.

### H2 `operators` — en «How super-node operators are paid» · ru «Как платят операторам супер-узлов»
- H3 `op-fee` «Payment for services, fixed in code» · «Плата за услуги, закреплённая в коде» — chain: 1) Anna's $5 fee goes into the
  period's pool (F6); 2) at the end of the period the contract divides the pool equally among super-nodes that passed the quality minimum
  (F6); 3) the super-node that built a search list gets $0.01, the one that delivered a message $0.001 (F6); 4) a super-node gets the fee
  only for a period in which it kept the network running (F6) → [how the deal fee works](/<lang>/deal-fee). Budget 150.
- H3 `op-places` «Places that cannot be bought» · «Места, которые нельзя купить» — chain: 1) only owners of provider agents whose paid
  work over 12 months is near the network median may apply, one application per wallet (F9); 2) the contract puts applicants in a random
  order; places are assigned by random choice and rotate (F9); 3) a node with a proven violation can never hold a place (F9). Budget 130.

### H2 `founder` — en «The founder's place in the design» · ru «Место основателя в устройстве»
- H3 `founder-share` «No share and public commitments» · «Никакой доли и публичные обязательства» — chain: 1) the founder receives no
  share of anything; no key changes a rule (F10); 2) the founder takes part on the same terms as anyone (F10); 3) public commitments: one
  named node, no deals between the founder's own elements, no share of fees until ten super-nodes pass the quality minimum (F10).
  Budget 130.
- H3 `founder-facts` «Where the analysis ends» · «Где кончается анализ» — chain: 1) the fee pool is shared only among super-nodes that
  worked in the period and is emptied at its end (F11); 2) whether this pool counts as a common enterprise is named in document 22 among the
  questions left to regulators and courts (F11) → [document 22](/<lang>/docs/22-questions-regulators-ask); 3) this page is a statement of
  design; the answer depends on the facts (F1) → [how MiCA terms apply](/<lang>/mica). Budget 130.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | Release 33-11412 (SEC + CFTC), effective 23 March 2026: Howey kept; common enterprise must be satisfied; «depends on the specific facts and circumstances, taken as a whole»; supersedes the 2019 staff framework | cftc.gov 2026-05635; doc 22 §22.1; risk-map §1 |
| F2 | investment contract when an issuer induces purchase with representations of essential managerial efforts; explicit promises with milestones and timeline weigh more | Release 33-11412 §IV.A; risk-map §1 |
| F3 | node operators: administrative or ministerial activity; rewards = payments in exchange for services; structure predetermined by the protocol | Release 33-11412 (fn 101); risk-map §1; doc 22 §22.3 |
| F4 | no sale, presale, allocation or fund; customer pays for a service and receives it; reviews are records, not assets | doc 22 §22.2 |
| F5 | providers paid by customers for work; the network takes its fee; no document promises income | doc 22 §22.2, §22.3 |
| F6 | fee pool divided equally among super-nodes that passed the quality minimum; search fee to the builder ($0.01), delivery fee ($0.001); only for a period of work | doc 22 §22.3; doc 09; doc 17 §17.8 |
| F7 | immutable contracts, no administrator or upgrade key, no council, no vote | doc 22 §22.3; entry 1 |
| F8 | MIT; any program can be a node; if the authors disappeared, same rules | doc 22 §22.4 |
| F9 | places: applicants with paid work over 12 months near the median (0.75–1.25), one application per wallet, random order, rotation, proven violation bars | doc 22 §22.3, §22.5; doc 05 §5.6 |
| F10 | founder: no share, same terms; public commitments (one named node, no deals between own elements, no fee share until ten super-nodes pass) | doc 22 §22.4; entries 41, 42 |
| F11 | fee pool shared among super-nodes of the period, emptied at its end; whether a common enterprise is open (§22.9) | doc 22 §22.3, §22.9 |

Numbers: «$100», «$5», «$0.01», «$0,01», «$0.001», «$0,001», «12 months», «12 месяцев»

## 8. Questions to the owner
none — every statement is in document 22; no claim that anything «is not a security».

## 9. Links
- out across the site:
  - /regulators — «all regulator questions» / «все вопросы регуляторов» — H2 `parts` (up to the hub)
  - /deal-fee — «how the deal fee works» / «как работает комиссия сделки» — H2 `operators`
  - /mica — «how MiCA terms apply» / «как применяются понятия MiCA» — H2 `founder`
- to documents: /<lang>/docs/22-questions-regulators-ask — «document 22» / «документ 22» — H2 `founder`
- incoming (planned): /regulators (hub)
- external primary sources: Release 33-11412 (cftc.gov, F1); SEC PDF (F3)

## 10. FAQ
1. en «Does Lagrix sell anything to raise money?» · ru «Продаёт ли Lagrix что-нибудь ради сбора денег?» — no sale, presale or fund — F4
2. en «Are super-node payments profits from others' efforts?» · ru «Выплаты супер-узлам — прибыль от усилий других?» — the design pays for work by a fixed formula; the facts decide — F6, F3
3. en «Who manages Lagrix after launch?» · ru «Кто управляет Lagrix после запуска?» — nobody can: immutable contracts, no keys — F7
4. en «Does the founder profit?» · ru «Получает ли основатель выгоду?» — no share; same terms; public commitments — F10
5. en «Is the fee pool a common enterprise?» · ru «Котёл комиссий — это общее предприятие?» — named in document 22 among questions for regulators and courts — F11
6. en «Is this legal advice?» · ru «Это юридическая консультация?» — no; a statement of design; the regulator decides — F1

## 11. Words
Glossary: super-node, operator, fee, quality minimum, escrow, review. Banned: lottery vocabulary («assigned by random choice»); tokens,
listing, coin, price; «not a security», «complies», «safe»; no call to early benefit.

## 12. Unique value
- Each part of the Howey test set against a rule in code and the document where it lives.
- Operators' pay shown on one $5 fee, in the release's own words: payment for services, structure fixed by the protocol.
