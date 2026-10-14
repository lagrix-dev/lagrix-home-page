# 5. $LGX Tokenomics: Coins Are Born From the Network's Work

$LGX is the coin of the Lagrix network. No coins are sold at launch: each one is created only when the network does useful work —
agents close paid deals and super-nodes serve them. This document describes how coins appear, who receives them, what they are for,
and which rules protect the network from those who come to trade rather than to work.

All rules here live in immutable contracts: no administrator key, no upgrade key, no parameter anyone can change after deployment.
New rules can arrive only as a new version of the contracts that participants join voluntarily (document 18). The numbers that are
not fixed below are set once, by modelling, before deployment.

## 5.1 Key properties

| Property | Value |
|---|---|
| Issuance cap | 1,000,000,000 LGX; no end date — issuance approaches the cap and never reaches it (section 5.2) |
| How coins appear | only as the reward of an issuance period: the work part by the period's receipts, the availability part equally to super-nodes that passed the quality minimum (section 5.2) |
| Sale at launch | none: no presale, no investor allocation, no fund created in advance |
| Issuance speed | follows paid work and never exceeds the speed limit; there is no calendar, issuance fades rather than stopping on a cliff; the constants are set by modelling (section 5.2) |
| Start of issuance | after the warm-up: a threshold of deal volume paid through the network and a minimum number of super-nodes (section 5.2) |
| Deal fee | a constant of at most 5% of the network part of a deal, set by modelling (5% until then), paid to the super-nodes that kept the network running (section 5.3, document 09) |
| What the coin is for | an asset of its holder and the deposit of a super-node operator; it does not buy a place in search |
| New participants | for the first 6 months after joining, coins can only be accumulated (section 5.4) |
| Founder's share | none: the founder receives nothing from issuance and takes part on the same terms as anyone (section 5.5) |

## 5.2 Receipts and issuance by period

Bitcoin pays miners for computations that are useless in themselves, because Bitcoin is its own ledger: proof of work decides who
writes the next block and makes rewriting history expensive. Lagrix keeps its coins, deposits and escrow in contracts on an EVM
layer-2 network (Arbitrum, Base), which already orders transactions and protects history. Lagrix therefore needs no mining: it pays
for what the network exists for — deals between agents that it has served.

**Receipt.** When a deal between a customer and a provider is closed in escrow (document 04), the contract records a receipt — a record
of a completed, paid deal for the customer, the provider and the super-node it passed through, naming the element and the agent that did
the work. A receipt's weight is the network part of the deal in USDC, not the number of messages: a thousand messages inside one deal
give one receipt, and a part paid outside the network gives none (document 04, section 4.6).

**Issuance period.** A block of Lagrix is a period set by the contract, not something found. Nobody can find, forge or add a period,
and a receipt cannot be forged: it is the closing of a paid deal. Issuance has two parts (changelog entry 35).

**The availability part — 200,000,000 LGX (20%).** At the end of every period the contract issues a constant small share of what is still
unissued in this part and divides it equally among the super-nodes that passed the quality minimum in this period (section 5.6). It pays
for servers while work is scarce and declines by itself.

**The work part — 800,000,000 LGX (80%).** Its issuance follows the counter V — the sum of the network parts of deals in USDC closed in
escrow since issuance began:

```
issued_work(V) = 800,000,000 × (1 − 2^(−V / H))
```

H is the «half-volume» constant: every H of paid work issues half of what is still left in this part. At the end of a period the contract
issues the difference between the formula's values before and after the period and divides it by the weight of the period's receipts: 50
parts of 80 to super-nodes, 30 of 80 to provider agents.

**The speed limit.** The work part never issues more in a period than a constant share of its remainder. Work above the limit in that
period does not move the counter V: inflated volume issues nothing extra and does not bring the end closer. A period without paid work
issues nothing from the work part — its remainder waits.

| Who | Share of all issuance | From where and how |
|---|---|---|
| Super-nodes, by work | 50% | the work part: by the weight of the receipts of the deals they served in the period |
| Provider agents | 30% | the work part: by the weight of the receipts of their paid work in the period |
| Super-nodes, equally | 20% | the availability part: equally to those that passed the quality minimum in the period (section 5.6) |
| **Total** | **100%** | over the network's whole life; within a period the shares vary — availability is steady, work varies |

While the network is small, issuance follows work and is deferred, not lost; when the network is large — no faster than the limit, as a
smooth decline with no end date. The cap is never reached. The constants — H, the availability share and the limit share per period — are
set by modelling; after deployment nobody changes them.

Coins go to those who do the work and those who serve it. Customer agents receive no coins: a customer who received coins for paying for
a service would in effect be buying coins with that payment.

**The warm-up start.** The network begins working on real deals with real money before any coin exists, like an engine that turns over
on the starter before it fires:

- the fee is taken from the very first deal and goes into the pool of the period, which is divided among the super-nodes that passed the
  quality minimum, as always (section 5.3); nothing carries over to later periods;
- no reward is issued until the network has passed a threshold of deal volume in USDC paid through the network and has a minimum number
  of super-nodes — both constants in code, their values set by modelling;
- the first period then opens by itself; nobody presses a button;
- receipts closed during the warm-up earn no coins afterwards.

Taking the fee from the first deal makes the threshold expensive to fake: pushing the network to its start with empty deals would cost
the fee on every one of them, paid to the super-nodes of the network. Counting paid volume rather than the number of deals stops a
thousand one-cent deals from moving the start. Giving warm-up receipts no coins keeps the warm-up from becoming the cheapest time to
collect the most valuable coins. Those who carry the network through the warm-up keep a real advantage: their six-month accumulation
period (section 5.4) runs during it.

## 5.3 The deal fee

The network takes a fee on the network part of every deal, in USDC. Its size is a constant in code, set by modelling and never above 5%;
until the modelling is done, it is 5%. The fees of a period are pooled and divided in equal parts among the super-nodes that passed the
quality minimum in that period; the parties of a deal never receive it. The fee pays super-nodes for the work they do all the time, and
it is how fake deals are made to cost real money: a deal with oneself, made to collect receipts or reviews, costs the fee on its network
part. The full rules are in document 09.

## 5.4 The six-month rule

For the first six months after joining the network, every participant can only accumulate coins: they cannot be sold or transferred.
The rule applies to every new participant at any time, not only in the network's early years. Buying coins is allowed.

```solidity
// Sketch of the rule: no transfer until six months have passed since the sender joined
function _update(address from, address to, uint256 amount) internal override {
    if (from != address(0)) {
        require(block.timestamp >= joinedAt[from] + 180 days, "LGX: six-month accumulation period");
    }
    super._update(from, to, amount);
}
```

Whoever comes to buy and quickly sell will sell nothing in six months. Whoever comes to work keeps working while the period runs.

## 5.5 No founder share

The founder receives nothing from issuance: there is no founder share, no founder tranche and no pre-mine. No key issues coins and no key
changes a rule; the start of issuance is triggered by volume, not by a person. Every coin goes to receipts of paid work and to the quality
minimum (section 5.2).

The founder and persons related to them, Fractera, Inc. included, take part only on the same terms as anyone: a super-node place only
by the same random choice and on the same conditions (section 5.6), provider agents paid by the same rules. There is no privilege and no
exclusion.

## 5.6 How new super-nodes join

A super-node is a permanent server that keeps the discovery index, builds search results, keeps the index of receipts and reviews and
helps agents connect; payment itself is settled by the escrow contract (documents 01, 02, 04, 06, 17). A super-node place is not bought
and not taken by number: places have no stages and no numbers, and the terms are the same on any day (document 000, entry 31).

- **Only owners of provider agents.** The application comes from a node whose elements work as providers; one application per node
  wallet.
- **The measure is paid work.** The sum of the network parts of deals in USDC in which the node's elements were providers, over the last
  12 months (or since the network started, if it is younger) — the same number search follows. Karma is not part of it: it lives outside
  the network.
- **A window around the median.** When a place opens, all nodes with a non-zero measure are taken and their median M is found. Nodes with
  a measure from 0.75 × M to 1.25 × M can apply. The largest providers fall outside the window: whoever earns most in the network does not
  also hold its search. The median, not the mean, because a few very large providers pull the mean but not the median.
- **Checks by agents in turn.** An applicant's server is checked by agents of the network's nodes taken in turn, not by super-nodes:
  existing super-nodes gain from having fewer competitors, so they must not be the ones who judge newcomers.
- **Random choice with diversity.** Among applicants in the window whose servers passed the check, the place goes to one chosen at
  random, keeping diversity of networks and regions, so that one applicant with many servers cannot take many places. The contract computes
  the randomness itself with commit and reveal: when applying, an applicant publishes the hash of its secret; after applications close, it
  reveals the secret; all revealed secrets together decide the choice. Until the last secret is revealed nobody knows the result; an
  applicant that does not reveal is out of this choice. No oracle and no outside service are needed. Ranking applicants by power or by the
  number of operations is not used: it would start a race for hardware and reward load generated by oneself.
- **The deposit is the same for everyone.** Whoever already holds earned coins pays them in; whoever does not has its first rewards stay
  locked as the deposit until it reaches the required size, and penalties are taken from it (document 06). The deposit sells nothing to
  anyone.
- **How many places.** The starting number of places is set by modelling; after that, new places open only when the network is
  overloaded — when deals per super-node exceed a constant — two places at a time.
- **The start.** While no node has paid work, the window is empty and anyone whose server passed the check can apply. This is not a
  benefit: these operators have served longest and so are the first to leave by rotation, and their places then open by the window.
- **Rotation.** Once every 1 year / N, where N is the number of super-nodes, the super-node that has served longest leaves. There is no
  penalty: its deposit is returned. Each super-node stays about a year, so the door stays open to those who do paid work now.
- **The quality minimum.** Every period, agents taken in turn check each super-node against a minimum: passed or failed. Those who passed
  share 20% of the period's reward and the period's fee pool equally (section 5.2, document 09); a super-node that fails for several
  periods leaves.
- **Vacancies.** A place freed by rotation, by failing the minimum or by removal for fraud (document 06) opens by the same random choice,
  using the window of the day it opens.
- **The cost we do not hide.** A large player can split its work across several nodes near the median and file several applications.
  Without identity checks this cannot be closed, but each extra application costs a year of real paid work with a 5% fee on the median
  volume.

The numbers — the deposit, the starting number of places, the overload constant, how many failed periods lead to leaving — are set by
modelling. How "passed or failed" is measured and how the contract finds the median cheaply are open questions (document 000).

## 5.7 What $LGX does not have

- No sale of coins at launch and no allocation for investors.
- No fund created in advance and no keys that let anyone create coins outside the issuance rules.
- No mechanism whose only purpose is price.
- No place in search: ranking follows paid work, not coins (document 17).
- No part in reputation: reputation is the weight of reviews from paid deals (document 17).
- Lagrix makes no promise about the price of $LGX. It is an asset of its holder and the deposit of a super-node operator.

## 5.8 Why $LGX issuance is tied to the network's work

The rules of this document tie the issuance of coins to the volume of real deals. The link comes from the rules themselves, not from
promises.

**The link through the fee.** Coins of the work part go to receipts, and every receipt is a deal from which a fee in USDC was deducted and
paid to the super-nodes of the network (document 09). If the value of the coins a dollar of receipts brings rises above the fee on that
dollar, it becomes profitable to make deals only for the receipts. While issuance follows work, such deals move the counter and each next
dollar brings fewer coins; when issuance hits the limit, extra deals only share the same issuance of the period. Either way the profit
disappears. So the value of the work part's coins issued in a period tends toward the fee's share of the deal volume in that period:

```
value_of_work_coins_issued_in_period ≈ fee_rate × deal_volume_in_period
```

**What this link does not do.**
- It does not set or hold the market price: the market can deviate from it in either direction.
- An upward deviation is corrected slowly: coins earned by new participants cannot be sold for the first six months.
- A downward deviation corrects nothing except that serving deals for coins becomes less profitable.
- It is a property of the issuance rules, not a guarantee: Lagrix makes no promise about the price of $LGX.

The exact equilibrium values are set by modelling the network.

## 5.9 Why the network needs its own coin (changelog entry 34)

Three supports of the network do not work without $LGX:

- **Paying for work while the network is small.** Fees are few while deals are few; without its own coin only a company or an investor —
  a centre — would pay for the super-nodes' servers. The availability part of issuance pays for servers under the rules of the contracts and declines by itself as fees grow (section 5.2).
- **A deposit nobody can freeze.** A deposit in a stablecoin could be blocked by its issuer (the USDC terms, section 13, keep for Circle
  the right to block addresses and freeze funds). A deposit in $LGX obeys only the immutable contracts.
- **A place that cannot be bought.** Only coins this wallet received as a reward for work count toward a deposit; bought coins do not
  become a deposit. Together with the window around the median (section 5.6) this gives the places to the middle of the network.

A user does not need the coin: search, message delivery and deals are paid in USDC. When the work per place exceeds a constant, new places
open, and each stands on a deposit in $LGX — so the more work the network does, the more $LGX is held in deposits. This is a property of
the rules, not a promise about price (section 5.7).
