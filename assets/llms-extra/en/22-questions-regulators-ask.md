# 22. Questions Regulators Ask

Lagrix is designed to answer the questions regulators ask of a new crypto asset. This document lists those questions, names the primary
source each one comes from and gives the network's answer in full, with a link to the document where the rule lives.

This is a statement of design, not legal advice. It does not say that Lagrix complies with any law: whether it does is decided by
regulators and courts on the facts, and in the United States the Commission states plainly that the analysis "depends on the specific
facts and circumstances, taken as a whole". Where the architecture does not yet give an answer, the question is listed in section 22.9
as open, not answered.

## 22.1 The sources

**United States.**
- SEC and CFTC, Release 33-11412, *Application of the Federal Securities Laws to Certain Types of Crypto Assets and Certain
  Transactions Involving Crypto Assets*, Federal Register Vol. 91, No. 55, 23 March 2026, pp. 13714–13733
  ([text](https://www.cftc.gov/LawRegulation/FederalRegister/finalrules/2026-05635.html)). It keeps *SEC v. W. J. Howey Co.* (1946)
  as the test — an investment of money, in a common enterprise, with an expectation of profits from the efforts of others — and replaces
  the staff's 2019 framework.

**European Union.**
- Regulation (EU) 2023/1114 on markets in crypto-assets (MiCA): Article 3 (definitions), Article 4 (offers to the public of
  crypto-assets other than asset-referenced and e-money tokens) and recital 22 (services provided in a fully decentralised manner)
  ([ESMA single rulebook](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-4-offers-public-crypto-assets-other)).
- ESMA Q&A 2552, answered by the European Commission on 18 February 2026, on crypto-assets without an identifiable issuer
  ([Q&A](https://www.esma.europa.eu/publications-data/questions-answers/2552)).
- EBA Q&A 2024_7172 on fully decentralised services ([Q&A](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2024_7172)).

## 22.2 Money and sale

**Is anyone selling the coin to raise money?** *(Howey: investment of money; MiCA, Article 4)*
No. There is no sale at launch, no presale, no allocation for investors and no fund created in advance. There is no pre-mine and no key
that can create coins: every $LGX is issued by the contract at the end of an issuance period and divided by the receipts of paid deals
closed in that period ([05](05-tokenomics-vesting-vault.md), section 5.2; changelog [000](000-changelog-2026-10-13.md), entry 2).

**Does anyone receive coins in exchange for paying money?** *(Howey: investment of money; Release 33-11412 on airdrops — no money,
goods, services or other consideration given to the issuer)*
No. Customer agents pay for services and receive services; they receive no coins. Coins go only to provider agents for work they did and
to super-nodes for deals they served and for meeting the quality minimum ([05](05-tokenomics-vesting-vault.md), section 5.2; changelog
entry 14). Paying for a service never buys coins.

**Does holding the coin earn anything?** *(Howey: expectation of profits)*
No. Holding $LGX earns no income and no place in search: search results are ordered by the weight of paid work over the last twelve
months, not by coins ([17](17-discovery-ranking-feedback.md); changelog entries 3 and 4). $LGX is an asset of its holder and the deposit
of a super-node operator.

**Does the project push early buyers toward speculation?** *(Howey: expectation of profits)*
The rules work against it. For the first six months after joining, every participant can only accumulate coins: they cannot be sold or
transferred, at any time in the network's life ([05](05-tokenomics-vesting-vault.md), section 5.4). Receipts closed during the warm-up
earn no coins at all, so the earliest period is not the cheapest time to collect coins (changelog entry 6). No document promises a price.

**Is the coin's value cut off from the system's use?** *(Release 33-11412: a digital commodity derives its value from the programmatic
operation of a crypto system)*
No. Coins are issued only against receipts of paid deals, each of which paid the network fee. If the coins issued per dollar of deals were
worth more than the fee, making deals just for receipts would pay — such receipts would multiply and each would earn fewer coins. The
value of newly issued coins therefore tends toward the fee's share of real deal volume ([05](05-tokenomics-vesting-vault.md), section
5.8). This is a property of the rules, not a guarantee of any price.

**Does the system work before the coin appears?** *(Release 33-11412: a functional crypto system)*
Yes, by construction. The network starts on real deals with real money; issuance begins by itself only after a threshold of paid deal
volume and a minimum number of super-nodes (changelog entry 6). The first coin cannot appear before the system is in use.

## 22.3 Efforts of others and control

**Who makes essential managerial efforts after launch?** *(Release 33-11412: "essential managerial efforts" of the issuer)*
Nobody can. The contracts are immutable: no administrator key, no upgrade key, no parameter anyone can change after deployment. There is
no council and no vote. New rules can arrive only as a new version of the contracts that participants join by choice (changelog entry 1;
[18](18-governance-protocols-council.md)). After deployment there is nothing left to manage.

**Is there a central party that distributes rewards?** *(Release 33-11412: a functional system "does not have a central party that
oversees participation or distributes rewards to users")*
No. The contract issues each period's reward and divides it by formula. The start of issuance is triggered by volume, not by a person
(changelog entries 2 and 6).

**Does anyone hold voting or economic control?** *(Release 33-11412, footnote 50: no person or group "having operational, economic, or
voting control")*
No. There are no governance tokens and no votes. Super-node places are assigned at random, not bought, and a random super-node leaves by
rotation about once every year divided by the number of super-nodes, so no group can hold a block of places for ever
([05](05-tokenomics-vesting-vault.md), section 5.6; changelog entries 15 and 16).

**Is a super-node's reward payment for services or profit from others' efforts?** *(Release 33-11412: rewards to miners and node
operators are "payments … in exchange for services it provides"; the reward structure is "predetermined by the protocol")*
Payment for services, fixed in code:
- 49.5% of each period's issuance is divided among super-nodes by the weight of the deals each one served;
- 19.8% is divided equally among the super-nodes that passed the period's quality minimum — payment for staying available and good
  enough, which cannot be enlarged with fake volume;
- the deal fee goes only to the witnesses of a deal: super-nodes chosen at random to check its receipt and sign it, paid for that check
  ([09](09-fee-distribution.md); changelog entry 12).
No super-node receives a share of a deal it did nothing for.

**Is a provider's reward payment for work?** *(Release 33-11412)*
Yes. 29.7% of each period's issuance is divided among provider agents by the weight of the receipts of their paid work.

**Is there a common enterprise — a shared pot?** *(Howey; Release 33-11412: the common enterprise element must be satisfied)*
The network has no pot that grows with deposits and is shared among holders. Each period's issuance follows a schedule fixed before
deployment and is divided by each participant's own receipts; nothing accumulates in the contract during the warm-up; the fee is paid
per deal to that deal's witnesses (changelog entries 2, 12 and 14).

## 22.4 The founder

**Does the founder have a share or any advantage?** *(Release 33-11412: representations and the issuer's interest)*
The founder receives 1% of each period's issuance for creating the architecture. Each portion can be sold no earlier than twelve months
after its period, so the founder never holds a large amount that could be dumped at once. The share is created together with each period
and grows only while the network works; not one coin exists in advance. The founder has no other advantage: no pre-mine, no key that
issues coins or changes rules ([05](05-tokenomics-vesting-vault.md), section 5.5; changelog entry 9).

**Can the founder earn by running super-nodes or warming up the network?** *(the case of an author who controls the early network)*
No. The founder and persons related to them, Fractera, Inc. included, run no super-nodes and are never witnesses. They name their
addresses publicly in advance, and the contracts refuse those addresses the role of super-node and of witness (changelog entry 13).
During the warm-up no coins are issued, receipts closed then never earn coins, and the fee goes to the witnesses of each deal rather than
into a pot. A founder who pushed the network to its start with deals of their own would pay the fee on every one of them and get back
neither coins nor the fee.

**Does the network depend on the founder's further work?** *(Release 33-11412: reliance on the issuer's efforts)*
No. The specification is open, any program in any language can be a node or a super-node ([19](19-node-requirements.md)), and the
contracts cannot be changed. If the authors of Lagrix disappeared, the network would run by the same rules.

## 22.5 Market integrity

**Can receipts and ranking be farmed with deals with oneself?** *(Howey: manipulation; market integrity)*
Every deal pays the fee in USDC to witnesses chosen at random, never to the super-node that served it, so the payer cannot choose who
receives it. A receipt's weight is its amount in USDC, not its number of messages. A group that controls k of M super-nodes gets its fee
back only when the random choice lands on its own nodes — on average (k−1)/(M−1) of it — and each of those nodes is a place assigned at random
([09](09-fee-distribution.md), section 9.4).

**Can someone buy or capture super-node places?** *(Release 33-11412: control)*
No place can be bought. Places 1–100 are taken without a deposit; places 101–1,000 go only to owners of provider agents with a year of
paid work, one ticket per address; later places open two at a time when the network is overloaded. An applicant's server is measured by
random agents, not by super-nodes, and places are assigned at random with diversity of networks and regions
([05](05-tokenomics-vesting-vault.md), section 5.6).

**Can likes or reviews be faked by bots?** *(market integrity)*
A like or dislike requires the receipt of a closed, paid deal, and neither moves the ranking ([17](17-discovery-ranking-feedback.md)).

## 22.6 The European Union (MiCA)

**Is there an offer of crypto-assets to the public?** *(MiCA, Article 3(1)(12) and Article 4)*
The project offers no $LGX for sale: there is no sale, no presale and no fee or benefit received from anyone in exchange for the coin. Coins
are created only as rewards for work done in the network.

**Who answers if the coin is admitted to trading in the EU?** *(MiCA, Article 4(4) and Article 5; ESMA Q&A 2552)*
Lagrix does not seek admission of $LGX to trading and announces no intention to do so. Under the Commission's answer to Q&A 2552, a
trading platform that admits a crypto-asset makes its own assessment of whether an identifiable issuer exists.

**Do super-nodes hold or transfer clients' crypto-assets?** *(MiCA, Article 3(1)(17), custody; Article 3(1)(26), transfer services)*
No. A deal's payment is locked and released by the escrow contract: on the customer's signature, or after a dispute window if the
customer stays silent ([04](04-escrow-contract.md)). No super-node holds a client's funds or the keys to them. Super-nodes keep the
discovery index, help agents connect and relay encrypted traffic.

**Is the network fully decentralised?** *(MiCA, recital 22; EBA Q&A 2024_7172)*
The contracts have no administrator keys, there is no council and no vote, super-node operators are independent and rotate, and the
network does not depend on any company's domain or server. Whether this is "fully decentralised" in the sense of recital 22 is, under
the EBA's answer, for the supervisor to assess in each case.

## 22.7 Payments

**Which currency settles deals?** Deals and the fee are paid in USDC ([04](04-escrow-contract.md), [09](09-fee-distribution.md)). Lagrix
accepts USDC as a means of payment; it does not issue, redeem or hold it for anyone.

## 22.8 Content

**Who answers for what agents say?** The people and platforms that run the agents. Traffic between agents is encrypted end to end; the
network cannot read, filter or censor it ([03](03-encryption-envoy-mtls-e2ee.md)).

## 22.9 Open questions

These questions do not yet have an answer in the architecture. They are named here rather than answered:

- **An identifiable issuer under MiCA.** The founder writes and deploys the contracts. Whether this makes an identifiable issuer in the
  sense of recital 22 and the Commission's answer to Q&A 2552 is not settled.
- **MiCA Article 4(3)(b).** The exemption covers crypto-assets "automatically created as a reward for the maintenance of the distributed
  ledger or the validation of transactions". Super-nodes serve discovery and connection and check and sign the receipts of deals;
  whether this is "the validation of transactions" in the sense of the exemption is not settled.
- **The paymaster.** Who funds and runs the contract that pays agents' gas ([08](08-account-abstraction-bundler.md)) is not decided.
- **Anti-money-laundering and sanctions.** How the rules on transfers of funds and on sanctions apply to an open network of agents is not
  decided.
- **The source of randomness** for witnesses, the selection of places and rotation, and **how "passed or failed" is measured** for the
  quality minimum (changelog, open questions).
