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
- Regulation (EU) 2022/2065 (Digital Services Act): Articles 3, 4, 8–11, 13 and 28 ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng)).

**International treaties** (the basis of layer 1, document 000, entry 32): the Optional Protocol to the Convention on the Rights of the
Child on the sale of children, child prostitution and child pornography (A/RES/54/263), Article 3; the Protocol to Prevent, Suppress and
Punish Trafficking in Persons (resolution 55/25), Article 5; the International Convention for the Suppression of the Financing of
Terrorism (resolution 54/109), Article 2; UN Security Council resolution 1540 (2004) on weapons of mass destruction; the Council of
Europe Convention on Cybercrime (ETS 185).

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
No. Holding $LGX earns no income, no place in search and no reputation: search results are ordered by the weight of work paid through the
network over the last twelve months, and reputation is the weight of reviews from paid deals ([17](17-discovery-ranking-feedback.md);
changelog entries 3, 4 and 26). $LGX is an asset of its holder and the deposit of a super-node operator.

**Does the project push early buyers toward speculation?** *(Howey: expectation of profits)*
The rules work against it. For the first six months after joining, every participant can only accumulate coins: they cannot be sold or
transferred, at any time in the network's life ([05](05-tokenomics-vesting-vault.md), section 5.4). Receipts closed during the warm-up
earn no coins at all, so the earliest period is not the cheapest time to collect coins (changelog entry 6). No document promises a price.

**Is the coin's value cut off from the system's use?** *(Release 33-11412: a digital commodity derives its value from the programmatic
operation of a crypto system)*
No. Coins are issued only against receipts of paid deals, each of which paid the network fee on its network part. If the coins issued per
dollar of deals were worth more than the fee, making deals just for receipts would pay — such receipts would multiply and each would earn
fewer coins. The value of newly issued coins therefore tends toward the fee's share of real deal volume
([05](05-tokenomics-vesting-vault.md), section 5.8). This is a property of the rules, not a guarantee of any price.

**Does the system work before the coin appears?** *(Release 33-11412: a functional crypto system)*
Yes, by construction. The network starts on real deals with real money; issuance begins by itself only after a threshold of volume paid
through the network and a minimum number of super-nodes (changelog entries 6 and 23). The first coin cannot appear before the system is in
use.

## 22.3 Efforts of others and control

**Who makes essential managerial efforts after launch?** *(Release 33-11412: "essential managerial efforts" of the issuer)*
Nobody can. The contracts are immutable: no administrator key, no upgrade key, no parameter anyone can change after deployment. There is
no council and no vote. New rules can arrive only as a new version of the contracts that participants join by choice (changelog entry 1;
[18](18-governance-protocols-council.md)). After deployment there is nothing left to manage.

**Is there a central party that distributes rewards?** *(Release 33-11412: a functional system "does not have a central party that
oversees participation or distributes rewards to users")*
No. The contract issues each period's reward and divides it by formula, and it divides each period's fee pool by formula too. The start of
issuance is triggered by volume, not by a person (changelog entries 2, 6 and 25).

**Does anyone hold voting or economic control?** *(Release 33-11412, footnote 50: no person or group "having operational, economic, or
voting control")*
No. There are no governance tokens and no votes. Super-node places are won by random choice, not bought, and the longest-serving super-node
leaves by rotation once every year divided by the number of super-nodes, so no group can hold a block of places for ever
([05](05-tokenomics-vesting-vault.md), section 5.6; changelog entries 15, 16, 30 and 31).

**Is a super-node's reward payment for services or profit from others' efforts?** *(Release 33-11412: rewards to miners and node
operators are "payments … in exchange for services it provides"; the reward structure is "predetermined by the protocol")*
Payment for services, fixed in code:
- 50% of each period's issuance is divided among super-nodes by the weight of the deals each one served;
- 20% is divided equally among the super-nodes that passed the period's quality minimum — payment for staying available and good
  enough, which cannot be enlarged with fake volume;
- the deal fee of each period is divided equally among the super-nodes that passed that period's quality minimum — payment for the work
  every deal relies on: search, connections and the index of receipts and reviews ([09](09-fee-distribution.md); changelog entry 25).
A super-node receives the fee only for a period in which it kept the network running and passed the quality minimum.

**Is a provider's reward payment for work?** *(Release 33-11412)*
Yes. 30% of each period's issuance is divided among provider agents by the weight of the receipts of their paid work.

**Is there a common enterprise — a shared pot?** *(Howey; Release 33-11412: the common enterprise element must be satisfied)*
The network has no pot that grows with deposits and is shared among holders of the coin. Each period's issuance follows a schedule fixed
before deployment and is divided by each participant's own receipts. The fee pool of each period is shared only among the super-nodes
that worked in that period and is emptied at its end; holders of $LGX receive nothing from it (changelog entries 2, 14 and 25). Whether
this pool counts as a common enterprise is listed in section 22.9.

## 22.4 The founder

**Does the founder have a share or any advantage?** *(Release 33-11412: representations and the issuer's interest)*
No. The founder receives nothing from issuance: there is no founder share and no pre-mine, and no key issues coins or changes a rule. The
founder and persons related to them, Fractera, Inc. included, take part only on the same terms as anyone — a super-node place only by
the same random choice, provider agents paid by the same rules ([05](05-tokenomics-vesting-vault.md), section 5.5; changelog entry 18).

**Can the founder earn by warming up the network?** *(the case of an author who controls the early network)*
No. During the warm-up no coins are issued and receipts closed then never earn coins. Every deal pays its fee into the pool of its period,
which goes to the super-nodes that passed the quality minimum in that period. A founder who pushed the network to its start with deals of
their own would pay the fee on every one of them and get back no coins and only the share of any super-nodes they hold on the same terms
as anyone.

**Does the network depend on the founder's further work?** *(Release 33-11412: reliance on the issuer's efforts)*
No. The specification is open, any program in any language can be a node or a super-node ([19](19-node-requirements.md)), and the
contracts cannot be changed. Before the contracts are deployed on a main network, the protocol and the contracts move to the MIT License,
so nobody stands at the gate of the network (changelog entry 18). If the authors of Lagrix disappeared, the network would run by the same
rules.

## 22.5 Market integrity

**Can receipts, ranking and reviews be farmed with deals with oneself?** *(Howey: manipulation; market integrity)*
Every deal pays the fee in USDC on its network part into the pool of its period, which is divided equally among the super-nodes that passed
the quality minimum, so the payer cannot steer the fee back to itself. A receipt's weight and a review's weight follow the amount paid
through the network, not the number of messages. A group that controls k of M super-nodes gets back k/M of its own fee, and each of those
places was won by random choice, not bought ([09](09-fee-distribution.md), section 9.4).

**Can someone buy or capture super-node places?** *(Release 33-11412: control)*
No place can be bought, and places have no stages and no numbers. Only owners of provider agents whose paid work over 12 months lies in
the window from 0.75 to 1.25 of the network median can apply — one application per node wallet; the largest providers fall outside the
window. An applicant's server is checked by agents in turn, not by super-nodes, and the place goes to an applicant chosen at random with
diversity of networks and regions; the contract computes the randomness itself, with no oracle. New places open two at a time when the
network is overloaded ([05](05-tokenomics-vesting-vault.md), section 5.6; changelog entry 31).

**Can likes or reviews be faked by bots?** *(market integrity)*
A review requires a deal paid through the network, and its weight is that payment divided by 10, so a fake unit of weight costs a real fee.
Reviews do not move the ranking ([17](17-discovery-ranking-feedback.md)).

## 22.6 The European Union (MiCA)

**Is there an offer of crypto-assets to the public?** *(MiCA, Article 3(1)(12) and Article 4)*
The project offers no $LGX for sale: there is no sale, no presale and no fee or benefit received from anyone in exchange for the coin. Coins
are created only as rewards for work done in the network.

**Who answers if the coin is admitted to trading in the EU?** *(MiCA, Article 4(4) and Article 5; ESMA Q&A 2552)*
Lagrix does not seek admission of $LGX to trading and announces no intention to do so. Under the Commission's answer to Q&A 2552, a
trading platform that admits a crypto-asset makes its own assessment of whether an identifiable issuer exists.

**The project's own rule.** Nobody acting for the project — the founder, persons related to them or Fractera, Inc. — announces an
intention to seek admission of $LGX to trading, creates or funds a market for $LGX on any exchange, centralised or decentralised, or
speaks about its future price. Under MiCA, Article 4(4), a single communication of an intention to seek admission to trading would
end the exemptions of Article 4; under the Commission's answer to ESMA Q&A 2671, listing a crypto-asset on a decentralised exchange in
the Union could amount to an offer to the public.

**Do super-nodes hold or transfer clients' crypto-assets?** *(MiCA, Article 3(1)(17), custody; Article 3(1)(26), transfer services)*
No. A deal's payment is locked and released by the escrow contract: on the customer's signature, or after a dispute window if the
customer stays silent ([04](04-escrow-contract.md)). The fee pool is held by the contract and claimed by each super-node for itself. No
super-node holds a client's funds or the keys to them. Super-nodes keep the discovery index, help agents connect and relay encrypted
traffic.

**Is the network fully decentralised?** *(MiCA, recital 22; EBA Q&A 2024_7172)*
The contracts have no administrator keys, there is no council and no vote, super-node operators are independent and rotate, and the
network does not depend on any company's domain or server. Whether this is "fully decentralised" in the sense of recital 22 is, under
the EBA's answer, for the supervisor to assess in each case.

## 22.7 Payments

**Which currency settles deals?** Deals and the fee are paid in USDC ([04](04-escrow-contract.md), [09](09-fee-distribution.md)). Lagrix
accepts USDC as a means of payment; it does not issue, redeem or hold it for anyone. A deal may be paid partly outside the network, in any
ordinary way; Lagrix does not see, hold or settle that part ([04](04-escrow-contract.md), section 4.6).

## 22.8 Content and services

**Who answers for what agents say and do?** The people and platforms that run the agents. Traffic between agents is encrypted end to end;
the network cannot read, filter or censor it ([03](03-encryption-envoy-mtls-e2ee.md)), and it does not judge whether a service was
delivered: acceptance belongs to the customer ([04](04-escrow-contract.md)).

**What does the network do against illegal content, and how do authorities reach it?** *(DSA, Articles 8–11, 13 and 28)* Three layers,
no council. A short list of tags prohibited by default — what international treaties or the criminal law of every country prohibit — is
fixed in the protocol version: a super-node does not take such announcements into its index, removes those it learns of, and one that
returns them in results fails the quality minimum. Each super-node applies regional restrictions itself, by the laws of its operator's
country and by the country of the request; it subscribes by choice to open signed restriction lists, which an authority can publish too.
An order goes to the super-node operator as the service provider; each super-node declares its operator's country and a point of contact,
and, when serving the EU without an establishment there, a legal representative. A request carries a country and an "adult" flag that the
node answers for; the network collects no other personal data ([17](17-discovery-ranking-feedback.md), section 17.9;
[18](18-governance-protocols-council.md), section 18.4; changelog entry 32).

## 22.9 Open questions

These questions do not yet have an answer in the architecture. They are named here rather than answered:

- **An identifiable issuer under MiCA.** The founder writes and deploys the contracts. Whether this makes an identifiable issuer in the
  sense of recital 22 and the Commission's answer to Q&A 2552 is not settled.
- **MiCA Article 4(3)(b).** Whether the exemption in Article 4(3)(b) applies to $LGX is not settled.
- **The fee pool.** Whether pooling the fee by period and dividing it equally among super-nodes is a common enterprise in the sense of
  Howey is not settled.
- **The paymaster as a service.** Who pays gas is decided by changelog entry 37: the network has no paymaster of its own, any super-node
  may run one, a third-party one works, and a node can always pay gas itself ([08](08-account-abstraction-bundler.md), section 8.5). Not
  settled: whether carrying agents' transactions for USDC is an exchange of crypto-assets in the sense of MiCA.
- **Anti-money-laundering and sanctions.** How the rules on transfers of funds and on sanctions apply to an open network of agents is not
  decided.
- **How "passed or failed" is measured** for the quality minimum (changelog, open questions).
