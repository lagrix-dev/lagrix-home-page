# 22. Questions Regulators Ask

Lagrix is designed to answer the questions regulators ask of an open network that holds payments in escrow and helps people and agents
find each other. Its money is USDC, issued by a third party. This document lists the questions, names the primary source each one comes from and gives
the network's answer in full, with a link to the document where the rule lives.

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
- Regulation (EU) 2023/1114 on markets in crypto-assets (MiCA): Article 3 (definitions) and recital 22 (services provided in a fully
  decentralised manner) ([ESMA single rulebook](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-3-definitions)).
- EBA Q&A 2024_7172 on fully decentralised services ([Q&A](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2024_7172)).
- Regulation (EU) 2022/2065 (Digital Services Act): Articles 3, 4, 8–11, 13 and 28 ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng)).

**International treaties** (the basis of layer 1, document 000, entry 32): the Optional Protocol to the Convention on the Rights of the
Child on the sale of children, child prostitution and child pornography (A/RES/54/263), Article 3; the Protocol to Prevent, Suppress and
Punish Trafficking in Persons (resolution 55/25), Article 5; the International Convention for the Suppression of the Financing of
Terrorism (resolution 54/109), Article 2; UN Security Council resolution 1540 (2004) on weapons of mass destruction; the Council of
Europe Convention on Cybercrime (ETS 185).

## 22.2 Money and sale

**Does anyone sell anything to raise money?** *(Howey: investment of money)*
No. There is no sale, no presale, no allocation for investors and no fund created in advance. The network's money is USDC, which Lagrix
neither issues nor redeems ([05](05-fees-and-reputation.md)).

**Does anyone receive an asset in exchange for paying money?** *(Howey: investment of money)*
No. A customer pays for a service and receives the service. Reviews and reputation are records of paid deals, not assets: they cannot be
transferred or sold, and an element's history does not move with it (changelog entries 28 and 43).

**Does taking part promise a profit?** *(Howey: expectation of profits)*
No. Providers are paid by their customers for their work, and super-nodes are paid fees for the
work they do (section 22.3). No document promises any income.

## 22.3 Efforts of others and control

**Who makes essential managerial efforts after launch?** *(Release 33-11412: "essential managerial efforts" of the issuer)*
Nobody can. The contracts are immutable: no administrator key, no upgrade key, no parameter anyone can change after deployment. There is
no council, and no vote changes a rule: the only vote decides whether one agent may carry the Official mark
([24](24-official-agents.md)). New rules can arrive only as a new version of the contracts that participants join by choice (changelog entry 1;
[18](18-governance-protocols-council.md)). After deployment there is nothing left to manage.

**Is there a central party that distributes payments?** *(Release 33-11412: a functional system "does not have a central party that
oversees participation or distributes rewards to users")*
No. The escrow contract releases each deal's payment on the customer's signature or after the dispute window, and the contract divides
each period's fee pool by formula among the super-nodes that passed the quality minimum ([04](04-escrow-contract.md),
[09](09-fee-distribution.md); changelog entries 24 and 25).

**Does anyone hold voting or economic control?** *(Release 33-11412, footnote 50: no person or group "having operational, economic, or
voting control")*
No. The only vote in the network is taken by a panel of nine super-nodes chosen at random for one application, and it decides one thing —
whether an agent may carry the Official mark; it changes no rule, fee or payment ([24](24-official-agents.md); changelog entry 49).
Super-node places are assigned by random choice, not bought, and places rotate, so no
group can hold a block of places for ever ([05](05-fees-and-reputation.md), section 5.6; changelog entries 31 and 40).

**Is a super-node's income payment for services or profit from others' efforts?** *(Release 33-11412: payments to node operators "in
exchange for services it provides", with a structure "predetermined by the protocol")*
Payment for services, fixed in code:
- the deal fee of each period is divided equally among the super-nodes that passed that period's quality minimum — payment for the work
  every deal relies on: search, connections and the index of receipts and reviews ([09](09-fee-distribution.md); changelog entry 25);
- the search fee is paid to the super-node that built the result list, and the delivery fee to the super-node that delivered the message
  ([17](17-discovery-ranking-feedback.md), section 17.8; changelog entries 33 and 39);
- the fee for an application for the Official mark is divided equally among the panel members who voted — payment for reviewing that
  application ([24](24-official-agents.md)).
A super-node receives the fee only for a period in which it kept the network running and passed the quality minimum.

**Is a provider's income payment for work?** Yes. The customer pays the provider for the service through escrow; the network takes its
fee and nothing else ([04](04-escrow-contract.md), section 4.4).

**Is the developer share payment for work?** Yes. It is paid to the developer of an element that another project installed over F2F,
from the fee of the deals made with that element, for the code the developer wrote; it adds nothing to what the parties pay, and the
founder's named node takes none ([26](26-developer-share.md); changelog entry 51).

**Is there a common enterprise — a shared pot?** *(Howey; Release 33-11412: the common enterprise element must be satisfied)*
The network has no pot that grows with deposits and is shared among investors. The fee pool of each period is shared only among the
super-nodes that worked in that period and is emptied at its end (changelog entry 25). Whether this pool counts as a common enterprise is
listed in section 22.9.

## 22.4 The founder

**Does the founder have a share or any advantage?** *(Release 33-11412: representations and the issuer's interest)*
No. The founder receives no share of anything, and no key changes a rule. The founder and persons related to them, Fractera, Inc.
included, take part only on the same terms as anyone — a super-node place only by the same random choice, provider agents paid by the same
rules ([05](05-fees-and-reputation.md), section 5.5; changelog entries 18 and 42).

**Can the founder earn while the network is small?** *(the case of an author who controls the early network)*
No more than the rules allow anyone, and at launch less. The founder takes on public commitments of their own: one publicly named node, no
deals between the founder's own elements, and, until ten super-nodes pass the quality minimum in a period, no share of the fees — it stays
in the pool of the other super-nodes (changelog entries 41 and 42) — and no developer share from the founder's named node (changelog
entry 51).

**Does the network depend on the founder's further work?** *(Release 33-11412: reliance on the issuer's efforts)*
No. The specification is open, any program in any language can be a node or a super-node ([19](19-node-requirements.md)), and the
contracts cannot be changed. The protocol is under the MIT License, so nobody stands at the gate of the network (changelog entry 42). If
the authors of Lagrix disappeared, the network would run by the same rules.

## 22.5 Market integrity

**Can rankings and reviews be farmed with deals with oneself?** *(market integrity)*
Every deal pays the fee in USDC on its network part into the pool of its period, which is divided equally among the super-nodes that passed
the quality minimum, so the payer cannot steer the fee back to itself. A review weighs exactly the fee paid on its deal, so a unit of
review weight costs a dollar of fees, and the right to a refund bought with likes never costs less than the refund itself
([17](17-discovery-ranking-feedback.md), section 17.5; changelog entry 42). The one exception is a developer dealing with itself through
its own element on a second node: it gets its 20% developer share back, so its weight costs it 80 cents on the dollar
([26](26-developer-share.md)). A group that controls k of M super-nodes gets back k/M of its own
fee, and each of those places was assigned by random choice, not bought ([09](09-fee-distribution.md), section 9.4).

**Can someone buy or capture super-node places?** *(Release 33-11412: control)*
No place can be bought, and places have no stages and no numbers. Only owners of provider agents whose paid work over 12 months lies in
the window from 0.75 to 1.25 of the network median can apply — one application per node wallet; the largest providers fall outside the
window. The contract puts applicants in a random order with diversity of networks and regions, computing the randomness itself with no oracle;
the first receives an invitation, and its server is checked by agents in turn, not by super-nodes. A node with a «proven violation» mark
can never hold a place ([05](05-fees-and-reputation.md), sections 5.4 and 5.6; changelog entries 31, 40 and 42).

**Can likes or reviews be faked by bots?** *(market integrity)*
A review requires a deal paid through the network, and its weight is the fee paid on it, so a fake unit of weight costs a real dollar.
Every indicator is shown as a count together with its sum, so many tiny deals are visible as such. Reviews do not move the ranking
([17](17-discovery-ranking-feedback.md); changelog entry 43). A review page can be attached only by the author of a review, once, and adds no weight
([25](25-review-pages.md); changelog entry 50).

## 22.6 The European Union (MiCA)

**Is there an offer of crypto-assets to the public?** *(MiCA, Article 3(1)(12))*
Lagrix makes no offer to the public: it accepts USDC, issued by a third party, as a means of payment.

**Do super-nodes hold or transfer clients' crypto-assets?** *(MiCA, Article 3(1)(17), custody; Article 3(1)(26), transfer services)*
No. A deal's payment is locked and released by the escrow contract: on the customer's signature, after the dispute window if the customer
stays silent, or partly back to the customer if the customer cancels ([04](04-escrow-contract.md)). The fee pool is held by the contract
and claimed by each super-node for itself. No super-node holds a client's funds or the keys to them. Super-nodes keep the discovery index,
help agents connect and relay encrypted traffic.

**Is the network fully decentralised?** *(MiCA, recital 22; EBA Q&A 2024_7172)*
The contracts have no administrator keys, there is no council and no vote on rules, super-node operators are independent and rotate, and the
network does not depend on any company's domain or server. Whether this is "fully decentralised" in the sense of recital 22 is, under
the EBA's answer, for the supervisor to assess in each case.

## 22.7 Payments

**Which currency settles deals?** Deals, the fee, search and message delivery are paid in USDC ([04](04-escrow-contract.md),
[09](09-fee-distribution.md), [17](17-discovery-ranking-feedback.md)). Lagrix accepts USDC as a means of payment; it does not issue, redeem
or hold it for anyone. A deal may be paid partly outside the network, in any ordinary way; Lagrix does not see, hold or settle that part
([04](04-escrow-contract.md), section 4.6).

**Do network participants sell gas?** *(MiCA, Article 3(1)(16), (20), (26))* No. Everyone pays the stamps for their own actions
themselves — in the network's ether or through a third-party gas payment service; neither nodes nor super-nodes run paymasters for others
or carry others' transactions for a fee ([08](08-account-abstraction-bundler.md), section 8.5; changelog entry 38).

## 22.8 Content and services

**Who answers for what agents say and do?** The people and platforms that run the agents. Traffic between agents is encrypted end to end;
the network cannot read, filter or censor it ([03](03-encryption-envoy-mtls-e2ee.md)), and it does not judge whether a service was
delivered: acceptance belongs to the customer ([04](04-escrow-contract.md)).

**Who answers for what a review page says?** Its author, and the service that hosts the page. The network records only the address that
the author of a review attached to it; a super-node does not read pages and is not required to watch them, applies the law of its
operator's country and the orders addressed to it, and does not show an address it has learned leads to content of the kinds prohibited
by default. The address stays in the record ([25](25-review-pages.md); changelog entry 50).

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

- **Escrow as custody or transfer.** The escrow contract holds the network part of a deal until acceptance. Whether an immutable contract
  that holds funds in this way is custody or a transfer service in the sense of MiCA, Article 3(1)(17) and (26), or money transmission
  under national law, is not settled.
- **The fee pool.** Whether pooling the fee by period and dividing it equally among super-nodes is a common enterprise in the sense of
  Howey is not settled.
- **Anti-money-laundering and sanctions.** How the rules on transfers of funds and on sanctions apply to an open network of agents is not
  decided.
- **How "passed or failed" is measured** for the quality minimum, and how the network's overload and the checks under load are measured
  (changelog, open questions).
