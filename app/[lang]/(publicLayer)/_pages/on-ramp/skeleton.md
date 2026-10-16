# Skeleton /on-ramp — hub network

Written 2026-10-16 (step 507-6) from document 19 §19.3 (an empty wallet costs nothing), document 17 §17.8 (search $0.01), document 04 §4.6
(a deal may be paid in two parts), README glossary «USDC», «Wallet» and changelog entry 39, and the USDC check of 2026-10-16 (usdc.com:
USDC is natively available on Arbitrum and Base). Form: `references/tz-template.md`; chains of small steps (skill §5б).

🛑 Not on the page: any named provider of USDC (Lagrix works with none; the page says so); the contract addresses of USDC (look them up in
the issuer's own documentation, not here); the price or limits of any card service.

## 1. Passport
- slug: on-ramp · hub: network · menu order: 123 (`meta.json`)
- source on the home page: the salon simulation — «Topped it up with 160 USDC»
- protocol documents: 19, 08

## 2. Hot question
- main query en: «how to get USDC for AI agent payments» · ru: «как получить USDC для оплаты агентов»
- intent: do
- evidence (each with a date and an address):
  - USDC is natively available on Arbitrum and Base, and is redeemable one for one with the US dollar — https://www.usdc.com/ — read 2026-10-16
  - a simple USDC transfer costs a fraction of a cent on these networks: median $0.0028 on Arbitrum and $0.00065 on Base, measured 2026-10-14 — https://arb1.arbitrum.io/rpc and https://mainnet.base.org (document 08 §8.5)
  - an empty wallet costs nothing and is visible — document 19 §19.3 — https://github.com/lagrix-dev/lagrix — 2026-10-13
- what the top ten answer and what they DO NOT: guides to «buying crypto» are about exchanges and their fees. None says what an agent
  needs to pay for work, in how small a sum, and that the same dollar can stay in the wallet until the agent really needs it.
- why now: agents pay each other in 2026, and the first step — getting a dollar onto the agent's wallet — is what stops people.

## 3. Mission
Discovery — an agent can start with almost nothing: an empty wallet is visible, and a few dollars cover a long list of searches.

## 4. Reader
An owner who wants their agent to search and pay, and does not know how to get the first digital dollars. Pain: «I have no crypto
wallet»; «what do I buy and where?»; «will the provider ask for my documents?». Leaves with: the two steps (get USDC, send it to the
node's address), what a little USDC buys, the honest note that a licensed provider verifies identity, and that Lagrix sells nothing.

## 5. Titles and meta
- title en: «How to get USDC for your agent's payments» · ru: «Как получить USDC для оплаты агентов»
- subtitle en: «Buy a little USDC from a licensed provider where you live and send it to your node's wallet; Lagrix sells nothing.»
  ru: «Купите немного USDC у лицензированного провайдера там, где живёте, и отправьте на кошелёк своего узла; Lagrix ничего не продаёт.»
- description en: «Your agent needs a little USDC to search and pay. Buy it from a licensed provider where you live and send it to your node's wallet.»
  ru: «Агенту нужно немного USDC, чтобы искать и платить. Купите его у лицензированного провайдера там, где живёте, и отправьте на кошелёк узла.»
- cover alt en: «A digital dollar moving from a provider into a node's wallet» · ru: «Цифровой доллар переходит от провайдера в кошелёк узла»
- menu item en: name «On-ramp» · description «How to get your first USDC for agent payments: a licensed provider, then your node's wallet.»
  ru: name «Первые USDC» · description «Как получить первые USDC для оплаты агентов: лицензированный провайдер, затем кошелёк узла.»
- lead en: «Deals and searches in Lagrix are paid in USDC, a digital dollar. Before your node can pay, its wallet needs a little USDC. You buy it from a licensed provider where you live and send it to the node's wallet address. Lagrix sells nothing and works with no provider on your behalf.»
  ru: «Сделки и поиски в Lagrix оплачиваются в USDC — цифровом долларе. Прежде чем узел сможет платить, на его кошельке нужно немного USDC. Его покупают у лицензированного провайдера там, где вы живёте, и отправляют на адрес кошелька узла. Lagrix ничего не продаёт и с провайдерами от вашего имени не работает.»

## 6. Body plan
4 H2 × 2 H3, no H4, chains of small steps. Running example: Anna's salon. Her agent needs $1 for a hundred searches and a $100 deal; the
first top-up is $20 to start. en 1240–1280, ru ≥ 1000. Web4 definition verbatim under H2 `how-it-works`.

### H2 `problem` — en «Why the first dollar stops most people» · ru «Почему первый доллар останавливает большинство»
- H3 `problem-crypto` «Crypto looks like a second job» · «Крипта выглядит как вторая работа» — chain: 1) Anna has never owned a digital
  currency; 2) the guides talk about exchanges, networks and fees all at once; 3) so the first step never happens.
- H3 `problem-small` «The sum is smaller than the fear» · «Сумма меньше, чем страх» — chain: 1) a search costs $0.01 (F1); 2) ten searches
  cost ten cents, a $100 deal is paid once; 3) the first top-up of $20 covers a long list of searches (F1) → [the price of one search](/<lang>/search-fee).

### H2 `how-it-works` — en «Two steps, then the agent pays» · ru «Два шага, и агент платит»
- paragraph: Web4 definition verbatim.
- H3 `steps-get` «Get USDC from a licensed provider» · «Получите USDC у лицензированного провайдера» — chain: 1) search for «buy USDC with a
  card» with the name of your country; 2) choose a licensed provider that works where you live; 3) compare its fees and minimum purchase;
  4) the provider asks you to verify your identity — that is its rule, not Lagrix's (F2).
- H3 `steps-send` «Send it to the node's wallet» · «Отправьте на кошелёк узла» — chain: 1) your node has a wallet address from the start (F3);
  2) you send USDC to that address; 3) the network reads the balance from the contract; 4) from then on the node searches and pays on its
  own (F3). Lagrix never asks for your bank details.

### H2 `what-buys` — en «What a little USDC buys» · ru «Что покупают немного USDC»
- H3 `buys-search` «Searches» · «Поиски» — chain: 1) a search costs $0.01 per result list (F1); 2) $1 covers a hundred lists (F1); 3) the same
  partner found once is never searched again (F4) → [how the search fee works](/<lang>/search-fee).
- H3 `buys-deal` «Deals» · «Сделки» — chain: 1) Anna's agent locks a $100 deal in escrow from her balance (F5); 2) on acceptance the provider
  is paid minus the fee (F5); 3) every deal paid through the network counts for the agents' reputation (F5) → [the deal fee](/<lang>/deal-fee).

### H2 `start-empty` — en «You can start with nothing» · ru «Можно начать с нуля»
- H3 `empty-visible` «An empty wallet is still visible» · «Пустой кошелёк всё равно виден» — chain: 1) an empty wallet costs nothing (F6);
  2) the node's agents are visible in the network (F6); 3) any part of a deal can be paid in an ordinary way outside the network (F7).
- H3 `empty-note` «What Lagrix does and does not do» · «Что Lagrix делает, а что нет» — chain: 1) Lagrix sells nothing (F8); 2) it works
  with no provider on your behalf (F8); 3) the provider's identity checks are the provider's rule (F2) → [what any node needs](/<lang>/docs/19-node-requirements).

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | search $0.01 per result list; $1 is a hundred lists | doc 17 §17.8 (arithmetic) |
| F2 | a licensed provider verifies identity; that is its rule, not Lagrix's; Lagrix works with no provider on the user's behalf | README glossary «USDC» |
| F3 | the node has a wallet from the start; USDC sent to its address funds the node | doc 19 §19.2; README glossary «Wallet» |
| F4 | repeated work with a known partner costs nothing | doc 17 §17.8 |
| F5 | deals are paid in USDC; the network part is locked in escrow; a closed deal leaves a receipt | doc 04 §4.1; doc 05 §5.2 |
| F6 | an empty wallet costs nothing, and the node's agents are visible; search and deals start with USDC | doc 19 §19.3 |
| F7 | a deal may be paid in two parts; the part outside the network is paid in any ordinary way | doc 04 §4.6 |
| F8 | Lagrix sells nothing and works with no provider on the user's behalf | README glossary «USDC» |

Numbers: «$0.01», «$0,01», «$1», «$20», «$100», «$10»

## 8. Questions to the owner
none.

## 9. Links
- out across the site: /<lang>/network — «an AI agent network without a central server» / «сеть ИИ-агентов без центрального сервера» (up to the hub);
  /<lang>/nodes — «running a node on your own computer» / «узел на своём компьютере»; /<lang>/search-fee — «the price of one search» / «цена одного поиска»;
  /<lang>/deal-fee — «the deal fee» / «комиссия сделки»
- to documents: /<lang>/docs/19-node-requirements — «document 19» / «документ 19»
- incoming (planned): /network, /nodes, /search-fee, /deal-fee
- external primary sources: https://www.usdc.com/ (F5 context)

## 10. FAQ
1. en «Do I need crypto to start?» · ru «Нужна ли крипта, чтобы начать?» — you need a little USDC to search and pay; an empty wallet is free and visible — F6
2. en «Where do I buy USDC?» · ru «Где купить USDC?» — from a licensed provider where you live; search for «buy USDC with a card» and your country — F2
3. en «Will Lagrix ask for my bank details?» · ru «Lagrix спросит мои банковские данные?» — no; Lagrix sells nothing and works with no provider — F8
4. en «How far does $1 go?» · ru «Насколько хватит $1?» — a hundred searches at $0.01 each — F1
5. en «Can I pay part of a deal in cash?» · ru «Можно ли заплатить часть сделки наличными?» — yes; the outside part leaves no record in the network — F7

## 11. Words
Glossary: USDC, wallet, node, on-ramp, provider, search, deal, escrow. Traps: «crypto» only in the sense of a digital dollar; never «token»
or «coin» for USDC; never promise an exchange rate; do not name a provider.

## 12. Unique value
- Two steps, and the amount in dollars at each step: $20 to start, $0.01 per search.
- The honest split of who does what: the provider verifies, the network only reads the balance.
