# Skeleton /regulators — hub regulators

Written 2026-10-17 (step 507-10) by the federal agent, from protocol document 22 (all sections), README, changelog entries 1, 18, 25, 31,
32, 38–42, and the primary sources verified in step 473 (risk-map report §1). Before writing, read in full: the risk-map report, MiCA
report §0, document 22, the word bans (no lottery vocabulary: lottery, won by, drawn, raffle, лотерея, розыгрыш, жребий; no talk of tokens,
listing or price). Form: `references/tz-template.md`; chains of small steps (skill §5б).

🛑 Tone of document 22: «a statement of design, not legal advice». The page never says Lagrix «complies» with any law.

## 1. Passport
- slug: regulators · hub: itself · menu order: 160 (`meta.json`); menu group exists
- source on the home page: section «Customs»
- protocol documents: 22 (and 04, 05, 17, 18)

## 2. Hot question
- main query en: «decentralized AI agent network and regulators» · ru: «сеть ИИ-агентов и регуляторы»
- intent: learn
- evidence (each with a date and an address):
  - SEC and CFTC, Release 33-11412, keeps Howey as the test and describes a functional system that «does not have a central party that oversees participation or distributes rewards to users» — https://www.cftc.gov/LawRegulation/FederalRegister/finalrules/2026-05635.html — 2026-03-23
  - EBA Q&A 2024_7172: «crypto-asset services provided in a fully decentralised manner without any intermediary do not fall within the scope of MiCAR» — https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2024_7172 — read 2026-10-13
  - MiCA Article 3 definitions: custody is «the safekeeping or controlling, on behalf of clients, of crypto-assets or of the means of access» — https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-3-definitions — read 2026-10-13
  - SEC proposed «Regulation Crypto Assets» (a proposal) — https://www.federalregister.gov/documents/2026/08/21/2026-17183/regulation-crypto-assets — 2026-08-21
- what the top ten answer and what they DO NOT: law-firm notes explain the rules in general. None takes one open agent network and answers
  each regulator question with the rule in the code and the document where it lives.
- why now: the US interpretation took effect in March 2026, the EU is reviewing MiCA in 2026, and agent payments are growing.

## 3. Mission
Honest reputation — a network that keeps an honest record has to say plainly how it is built, question by question.

## 4. Reader
A builder, investor or lawyer looking at agent networks. Pain: «is this a security», «who holds the money», «who answers for content».
Leaves with: the questions regulators ask, Lagrix's answer to each, where each rule lives, and that the final word belongs to regulators
and courts.

## 5. Titles and meta
- title en: «AI agent networks and regulators: how Lagrix is built» · ru: «Сети ИИ-агентов и регуляторы: как устроен Lagrix»
- subtitle en: «The questions US and EU regulators ask of an open network, and the rule in Lagrix's design that answers each one.»
  ru: «Вопросы, которые регуляторы США и ЕС задают открытой сети, и правило в устройстве Lagrix, которое отвечает на каждый.»
- description en: «How Lagrix answers regulators: no sale, no administrator keys, payments held by a contract, content rules in three layers. A design, not legal advice.»
  ru: «Как Lagrix отвечает регуляторам: продажи нет, ключей администратора нет, платежи держит контракт, правила о содержании — в три слоя. Это описание устройства.»
- cover alt en: «Questions of regulators and the answers in Lagrix's design» · ru: «Вопросы регуляторов и ответы в устройстве Lagrix»
- menu: exists, unchanged
- lead en: «Regulators ask an open network a short list of questions: does anyone sell anything, who controls it, who holds the money, who
  answers for content. Lagrix is designed to answer each of them in code: there is no sale, no administrator key, the money is held by a
  contract, and content rules work in three layers. This is a statement of design, not legal advice.»
  ru: «Регуляторы задают открытой сети короткий список вопросов: продаёт ли кто-то что-нибудь, кто ею управляет, кто держит деньги, кто
  отвечает за содержание. Lagrix устроен так, чтобы отвечать на каждый в коде: продажи нет, ключа администратора нет, деньги держит
  контракт, правила о содержании работают в три слоя. Это описание устройства, а не юридическая консультация.»

## 6. Body plan
One running example: **Leo** (developer of a translation agent, provider) and **Anna** («Bella» salon, customer) — a $100 deal; Leo asks
what regulators would see. en 1240–1280 words, ru ≥ 1000. H2 name the subject (§5в); en without dashes. No lottery words.

### H2 `today` — en «What regulators ask of an open network» · ru «Что регуляторы спрашивают у открытой сети»
- H3 `today-us` «The United States» · «США» — chain: 1) in March 2026 the SEC and the CFTC published Release 33-11412 (F1, external link);
  2) it keeps the Howey test: an investment of money, in a common enterprise, with an expectation of profits from the efforts of others (F1);
  3) it describes a functional system without a central party that oversees participation or distributes rewards (F1). Budget 130.
- H3 `today-eu` «The European Union» · «Европейский союз» — chain: 1) MiCA defines services such as holding crypto-assets for clients
  (custody) and transferring them for clients (F2, external link); 2) the EBA answered that services provided in a fully decentralised
  manner without any intermediary fall outside MiCA (F3, external link); 3) whether a network is fully decentralised is for the supervisor
  to assess case by case (F3). Budget 130.

### H2 `how-it-works` — en «How Lagrix answers in its design» · ru «Как Lagrix отвечает своим устройством»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `answer-money` «Money: no sale, no asset for sale» · «Деньги: продажи нет, актива на продажу нет» — chain: 1) nobody sells anything to
  raise money: no sale, no presale, no fund (F4); 2) the network's money is USDC, issued by a third party (F4); 3) Anna pays $100 and gets
  a translation; her review is a record of the deal, not an asset, and cannot be sold (F5). Budget 130.
- H3 `answer-control` «Control: nothing left to manage» · «Управление: управлять нечем» — chain: 1) the contracts are immutable: no
  administrator key, no upgrade key (F6); 2) no council, no vote (F6); 3) super-node places are assigned by random choice and rotate; they
  cannot be bought (F7) → [how the SEC test applies](/<lang>/sec). Budget 140.

### H2 `answers` — en «Who holds the money and who answers for content» · ru «Кто держит деньги и кто отвечает за содержание»
- H3 `answers-escrow` «The escrow contract holds the payment» · «Платёж держит контракт эскроу» — chain: 1) Anna's $100 is locked in the
  escrow contract (F8); 2) the contract releases it on her signature, after the dispute window, or partly back if she cancels (F8); 3) no
  super-node holds a client's funds or keys; super-nodes keep the index, help agents connect and relay encrypted traffic (F8) →
  [how MiCA terms apply](/<lang>/mica). Budget 140.
- H3 `answers-content` «Content rules in three layers» · «Правила о содержании в три слоя» — chain: 1) tags prohibited by default by
  international treaties are fixed in the protocol (F9); 2) each super-node applies its operator's country's laws (F9); 3) open signed
  restriction lists, which an authority can publish too (F9); 4) an order goes to the super-node operator, who declares a country and a
  point of contact (F9); 5) traffic between agents is encrypted, and the network cannot read it (F10). Budget 150.

### H2 `limits` — en «What this page is and is not» · ru «Что эта страница есть и чем не является»
- H3 `limits-design` «A statement of design» · «Описание устройства» — chain: 1) document 22 is a statement of design, not legal advice
  (F11); 2) in the US the analysis «depends on the specific facts and circumstances, taken as a whole» (F1); 3) the decision belongs to
  regulators and courts (F11). Budget 110.
- H3 `limits-where` «Where each answer lives» · «Где живёт каждый ответ» — chain: 1) document 22 lists every question with its primary
  source and the document where the rule lives (F11) → [document 22](/<lang>/docs/22-questions-regulators-ask); 2) the founder takes no
  share and only public commitments (F12); 3) the protocol is under the MIT License, so the network runs by the same rules whoever wrote
  it (F12) → [how escrow payments work](/<lang>/web3-payments). Budget 130.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | Release 33-11412 (SEC + CFTC), Federal Register 23 March 2026: Howey test kept; functional system without a central party; «depends on the specific facts and circumstances, taken as a whole» | cftc.gov 2026-05635; doc 22 §22.1 |
| F2 | MiCA Article 3: custody, transfer services for clients | ESMA single rulebook; doc 22 §22.1, §22.6 |
| F3 | EBA Q&A 2024_7172: fully decentralised services without intermediary fall outside MiCAR; assessment by supervisor | EBA; doc 22 §22.6 |
| F4 | no sale, presale, allocation or fund; money is USDC issued by a third party | doc 22 §22.2 |
| F5 | reviews and reputation are records, not assets: cannot be transferred or sold | doc 22 §22.2; entries 28, 43 |
| F6 | immutable contracts, no administrator or upgrade key, no council, no vote; new rules only as a new version joined by choice | doc 22 §22.3; entry 1; doc 18 |
| F7 | super-node places assigned by random choice, rotate, cannot be bought | doc 22 §22.3, §22.5; doc 05 §5.6 |
| F8 | escrow contract locks and releases (signature, dispute window, partial refund on cancel); no super-node holds client funds or keys; super-nodes: index, connections, relay | doc 22 §22.6; doc 04 |
| F9 | three layers: prohibited tags (treaties) fixed in the protocol; regional by operator country; open signed lists an authority can publish; orders to the operator; country and point of contact declared | doc 22 §22.8; doc 17 §17.9; entry 32 |
| F10 | traffic between agents encrypted end to end; network cannot read, filter or censor it | doc 22 §22.8; doc 03 |
| F11 | document 22: statement of design, not legal advice; questions without an answer named in §22.9 | doc 22 intro, §22.9 |
| F13 | providers are paid by customers for their work; super-nodes: equal share of the period fees if they passed the quality minimum, plus search and delivery fees, fixed in code | doc 22 §22.2, §22.3 |
| F12 | founder: no share, same terms, public commitments; protocol MIT | doc 22 §22.4; entries 41, 42 |

Numbers: «$100», «$5»

## 8. Questions to the owner
none — every statement is in document 22; no compliance claim.

## 9. Links
- out across the site:
  - /sec — «how the SEC test applies» / «как применяется тест SEC» — H2 `how-it-works`
  - /mica — «how MiCA terms apply» / «как применяются понятия MiCA» — H2 `answers`
  - /web3-payments — «how escrow payments work» / «как работают платежи через эскроу» — H2 `limits`
- to documents: /<lang>/docs/22-questions-regulators-ask — «document 22» / «документ 22» — H2 `limits`
- incoming (planned): /mica, /sec (up to the hub)
- external primary sources: Release 33-11412 (F1); ESMA MiCA Article 3 (F2); EBA Q&A 2024_7172 (F3)

## 10. FAQ
1. en «Is Lagrix a security?» · ru «Lagrix — это ценная бумага?» — nothing is sold to raise money; how the Howey test applies is decided on the facts; design answers in document 22 — F1, F4
2. en «Who holds the money in a deal?» · ru «Кто держит деньги в сделке?» — the escrow contract; no super-node holds client funds — F8
3. en «Can anyone change the rules?» · ru «Может ли кто-то изменить правила?» — no administrator key; only a new version joined by choice — F6
4. en «Who answers for what agents do?» · ru «Кто отвечает за то, что делают агенты?» — the people and platforms that run them; the network cannot read their traffic — F10
5. en «Is this legal advice?» · ru «Это юридическая консультация?» — no; a statement of design — F11
6. en «How are super-nodes paid?» · ru «Как платят супер-узлам?» — in USDC, by a formula in code: equal share of period fees after the quality minimum, plus search and delivery fees — F13

## 11. Words
Glossary: escrow, super-node, operator, USDC, fee, review. Banned: lottery vocabulary (lottery, won by, drawn, raffle, лотерея, розыгрыш,
жребий) — use «assigned by random choice / назначается случайным выбором»; never «complies», «legal», «approved»; no talk of tokens,
listing, coin or price; «super-node settles deals» is false (the contract settles).

## 12. Unique value
- One open agent network, question by question, each answer pointing to the rule in code and the document where it lives.
- The honest boundary named in the network's own words: a statement of design; regulators and courts decide.
