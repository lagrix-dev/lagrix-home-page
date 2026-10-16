# Skeleton /mica — hub regulators

Written 2026-10-17 (step 507-10) by the federal agent, from protocol document 22 (§22.1, §22.6, §22.7, §22.9), document 08 §8.5, README
glossary («USDC», «Paymaster») and the primary sources verified in step 473. Read before writing: risk-map report, MiCA report §0, word
bans. 🛑 Never: lottery vocabulary; tokens, listing, coin, price; «complies». No Article 4 (it concerned a coin the network does not have).

## 1. Passport
- slug: mica · hub: regulators · menu order: 167 (`meta.json`); menu item exists
- source on the home page: section «Customs» — MiCA
- protocol documents: 22, 08

## 2. Hot question
- main query en: «MiCA and AI agent payments» · ru: «MiCA и платежи ИИ-агентов»
- intent: learn
- evidence (each with a date and an address):
  - MiCA Article 3: custody is «the safekeeping or controlling, on behalf of clients, of crypto-assets or of the means of access» — https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-3-definitions — read 2026-10-13
  - EBA Q&A 2024_7172: «crypto-asset services provided in a fully decentralised manner without any intermediary do not fall within the scope of MiCAR» — https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2024_7172 — read 2026-10-13
  - European Commission, targeted consultation on the MiCA review: options for signs of «not fully decentralised» — an identifiable intermediary, control through administrator keys, concentrated governance — https://finance.ec.europa.eu/document/download/62be7015-f066-4fac-b74e-71bacdbcc9f5_en?filename=2026-mica-review-targeted-consultation-document_en.pdf — 2026
- what the top ten answer and what they DO NOT: law-firm notes list MiCA services in general. None walks one agent payment step by step and
  says, at each step, who holds the money and whether anyone acts on behalf of a client.
- why now: the EU reviews MiCA in 2026, and agent payments in stablecoins grow.

## 3. Mission
Honest reputation — the record of a deal is kept by contracts nobody controls, and the page shows that step by step.

## 4. Reader
A builder or operator in the EU. Pain: «does running a node make me a crypto service provider», «who holds the money», «what about gas».
Leaves with: the MiCA terms that matter, how each step of a payment fits them, what the design shows about decentralisation, and that the
supervisor decides.

## 5. Titles and meta
- title en: «MiCA and AI agent payments: who holds the money» · ru: «MiCA и платежи ИИ-агентов: кто держит деньги»
- subtitle en: «Step by step through one payment in Lagrix: a contract holds the funds, nobody acts on a client's behalf, and the supervisor decides.»
  ru: «Шаг за шагом по одному платежу в Lagrix: средства держит контракт, никто не действует от имени клиента, а решает надзор.»
- description en: «How MiCA terms meet AI agent payments in Lagrix: escrow held by a contract, no custody by super-nodes, no gas sold to others. A design, not advice.»
  ru: «Как понятия MiCA встречаются с платежами ИИ-агентов в Lagrix: эскроу держит контракт, супер-узлы не хранят средства и не продают газ другим.»
- cover alt en: «One agent payment and the MiCA terms at each step» · ru: «Один платёж агента и понятия MiCA на каждом шаге»
- menu: exists, unchanged
- lead en: «MiCA regulates services such as holding or transferring crypto-assets on behalf of clients. In Lagrix a payment between agents is
  locked and released by an immutable contract, no super-node holds a client's funds or keys, and nobody sells gas to others. Whether the
  network is fully decentralised in MiCA's sense is for the supervisor to assess.»
  ru: «MiCA регулирует такие услуги, как хранение и перевод криптоактивов от имени клиентов. В Lagrix платёж между агентами блокирует и
  отдаёт неизменяемый контракт, ни один супер-узел не держит средства или ключи клиента, и никто не продаёт газ другим. Полностью ли сеть
  децентрализована в смысле MiCA, оценивает надзор.»

## 6. Body plan
One running example: **Leo** runs his node in the EU and his translation agent; **Anna**'s salon pays it $100. en 1240–1280 words,
ru ≥ 1000. H2 name the subject (§5в); en without dashes. A statement of design throughout.

### H2 `today` — en «What MiCA regulates» · ru «Что регулирует MiCA»
- H3 `today-terms` «Services on behalf of clients» · «Услуги от имени клиентов» — chain: 1) MiCA, Regulation (EU) 2023/1114, lists
  crypto-asset services (F1, external link); 2) custody: safekeeping or controlling crypto-assets, or the means of access, on behalf of
  clients (F1); 3) transfer services move them on behalf of clients; exchange services swap them (F1); 4) the key words are «on behalf of
  clients». Budget 130.
- H3 `today-decentral` «Fully decentralised services» · «Полностью децентрализованные услуги» — chain: 1) recital 22, as the EBA answered:
  services provided in a fully decentralised manner without any intermediary are outside MiCA (F2, external link); 2) the term is not
  defined; the supervisor assesses each case (F2); 3) the Commission's 2026 review consultation lists possible signs of «not fully
  decentralised»: an identifiable intermediary, administrator keys, concentrated governance — options, not rules (F3, external link).
  Budget 140.

### H2 `how-it-works` — en «How one payment fits these terms» · ru «Как один платёж ложится на эти понятия»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `fit-offer` «USDC from a third party» · «USDC от третьей стороны» — chain: 1) Anna pays in USDC, issued by Circle (F4); 2) Lagrix
  makes no offer of crypto-assets to the public; it accepts USDC as a means of payment (F4); 3) it does not issue, redeem or hold USDC
  for anyone (F4). Budget 120.
- H3 `fit-escrow` «A contract holds the payment» · «Платёж держит контракт» — chain: 1) Anna's agent locks $100 in the escrow contract
  (F5); 2) the contract releases it to Leo on Anna's signature, after the dispute window if she is silent, or partly back if she cancels
  (F5); 3) the fee goes to a pool held by the contract; each super-node claims its own share (F5); 4) no super-node holds Anna's funds or
  the keys to them (F5) → [how escrow payments work](/<lang>/web3-payments). Budget 150.

### H2 `gas` — en «Gas without a middleman» · ru «Газ без посредника»
- H3 `gas-self` «Everyone pays their own stamps» · «Каждый платит свои марки» — chain: 1) each write costs a stamp in ether (F6); 2) Anna
  pays the stamp for locking, Leo for delivering (F6); 3) neither nodes nor super-nodes sell stamps or carry others' transactions for a fee
  (F7); 4) the reason is named in the protocol: such a service could count as exchange or transfer on behalf of clients in MiCA's sense,
  Article 3(1)(16), (20), (26) (F7) → [how Ethereum gas works for agents](/<lang>/ethereum-l1). Budget 140.
- H3 `gas-paymaster` «A third-party paymaster is a choice» · «Сторонний paymaster — по выбору» — chain: 1) an agent with only dollars can
  use a third-party paymaster, for example Circle Paymaster (F8); 2) the network has no connection with such a service (F8); 3) own ether
  stays the fallback (F8). Budget 110.

### H2 `decentral` — en «The fully decentralised question» · ru «Вопрос полной децентрализации»
- H3 `dec-design` «What the design shows» · «Что показывает устройство» — chain: 1) the contracts have no administrator keys (F9); 2) no
  council, no vote (F9); 3) super-node operators are independent and rotate (F9); 4) the network does not depend on any company's domain
  or server (F9). Budget 120.
- H3 `dec-who` «Who decides» · «Кто решает» — chain: 1) under the EBA's answer, whether this is fully decentralised is for the supervisor
  to assess (F2, F9); 2) document 22 names the questions the design leaves to supervisors and courts, among them whether an escrow
  contract that holds funds is custody (F10) → [document 22](/<lang>/docs/22-questions-regulators-ask); 3) this page is a statement of
  design, not legal advice (F10) → [all regulator questions](/<lang>/regulators). Budget 130.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | MiCA Article 3: custody (safekeeping or controlling on behalf of clients, incl. means of access); transfer and exchange services | ESMA single rulebook (read 2026-10-13); doc 22 §22.1 |
| F2 | EBA Q&A 2024_7172: fully decentralised services without any intermediary outside MiCAR; assessed by the supervisor | EBA; doc 22 §22.6 |
| F3 | Commission MiCA review consultation 2026: options for signs of «not fully decentralised» (identifiable intermediary, administrator keys, concentrated governance) — consultation options, not rules | risk-map report §1 |
| F4 | no offer to the public; Lagrix accepts USDC issued by a third party; does not issue, redeem or hold it | doc 22 §22.6, §22.7 |
| F5 | escrow contract locks and releases (signature, dispute window, partial refund on cancel); fee pool held by the contract, claimed by each super-node; no super-node holds client funds or keys | doc 22 §22.6; doc 04 |
| F6 | each write costs a stamp in ether; whoever acts pays | README «Gas» |
| F7 | participants do not sell stamps or carry others' transactions for a fee: could count as exchange or transfer on behalf of clients, MiCA 3(1)(16), (20), (26) | doc 08 §8.5; doc 22 §22.7; entry 38 |
| F8 | third-party paymaster, e.g. Circle Paymaster; the network has no connection with it; own ether the fallback | doc 08 §8.5; README «Paymaster» |
| F9 | no administrator keys, no council, no vote, operators independent and rotate, no dependence on a company's domain or server | doc 22 §22.6 |
| F10 | document 22: statement of design, not legal advice; §22.9 names escrow-as-custody among open questions | doc 22 intro, §22.9 |

Numbers: «$100», «$5»

## 8. Questions to the owner
none — every statement is in document 22 and document 08; the status of USDC under MiCA is not stated (not checked by primary source).

## 9. Links
- out across the site:
  - /regulators — «all regulator questions» / «все вопросы регуляторов» — H2 `decentral` (up to the hub)
  - /web3-payments — «how escrow payments work» / «как работают платежи через эскроу» — H2 `how-it-works`
  - /ethereum-l1 — «how Ethereum gas works for agents» / «как устроен газ Ethereum для агентов» — H2 `gas`
- to documents: /<lang>/docs/22-questions-regulators-ask — «document 22» / «документ 22» — H2 `decentral`
- incoming (planned): /regulators (hub), /sec
- external primary sources: MiCA Article 3 (F1); EBA Q&A (F2); Commission consultation (F3)

## 10. FAQ
1. en «Does running a Lagrix node make me a crypto-asset service provider?» · ru «Делает ли узел Lagrix меня поставщиком криптоуслуг?» — the design: no super-node or node holds or transfers client funds; the supervisor assesses — F5, F7, F2
2. en «Who holds the money during a deal?» · ru «Кто держит деньги во время сделки?» — the escrow contract — F5
3. en «Does Lagrix offer crypto-assets to the public?» · ru «Предлагает ли Lagrix криптоактивы публике?» — no; it accepts USDC issued by a third party — F4
4. en «Can a super-node pay gas for my agent?» · ru «Может ли супер-узел платить газ за моего агента?» — no; participants do not sell stamps; a third-party paymaster or own ether — F7, F8
5. en «Is Lagrix fully decentralised under MiCA?» · ru «Полностью ли децентрализован Lagrix по MiCA?» — the design shows no keys, no council, rotating operators; the supervisor assesses — F9, F2
6. en «Does Lagrix hold USDC for anyone?» · ru «Хранит ли Lagrix USDC для кого-то?» — no; accepts it as a means of payment — F4
7. en «Is this legal advice?» · ru «Это юридическая консультация?» — no; a statement of design; the supervisor decides — F10

## 11. Words
Glossary: escrow, super-node, operator, USDC, stamp, paymaster. Banned: lottery vocabulary; tokens, listing, coin, price; «complies»,
«exempt», «licence-free»; «super-node settles deals» (the contract does).

## 12. Unique value
- One payment walked step by step against MiCA's words «on behalf of clients».
- The reason in the protocol itself why nobody sells gas, with the MiCA articles named.
