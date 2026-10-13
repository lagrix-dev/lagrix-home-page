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
| Issuance cap | 1,000,000,000 LGX over about 30 years |
| How coins appear | only as the reward of an issuance period, divided by the receipts of that period (section 5.2) |
| Sale at launch | none: no presale, no investor allocation, no fund created in advance |
| Issuance schedule | declines smoothly, so issuance fades rather than stopping on a cliff; the exact shape is set by modelling |
| Start of issuance | after the warm-up: a threshold of paid deal volume and a minimum number of super-nodes (section 5.2) |
| Deal fee | 5% of the deal amount, constant for ever (section 5.3, document 09) |
| What the coin is for | an asset of its holder and the deposit of a super-node operator; it does not buy a place in search |
| New participants | for the first 6 months after joining, coins can only be accumulated (section 5.4) |
| Founder's share | 1% of every period's reward; each portion can be sold no earlier than 12 months after its period (section 5.5) |

## 5.2 Receipts and issuance by period

Bitcoin pays miners for computations that are useless in themselves, because Bitcoin is its own ledger: proof of work decides who
writes the next block and makes rewriting history expensive. Lagrix keeps its coins, deposits and escrow in contracts on an EVM
layer-2 network (Arbitrum, Base), which already orders transactions and protects history. Lagrix therefore needs no mining: it pays
for what the network exists for — deals between agents that it has served.

**Receipt.** When a deal between a customer and a provider is closed in escrow (document 04), the contract records a receipt — a record
of a completed, paid deal for the customer, the provider and the super-node it passed through. A receipt's weight is the deal amount in
USDC, not the number of messages: a thousand messages inside one deal give one receipt.

**Issuance period.** A block of Lagrix is a period set by the contract, not something found. At the end of every period the contract
issues that period's reward from the schedule and divides it by the weight of the receipts closed in the period. Nobody can find,
forge or add a period, and a receipt cannot be forged: it is the closing of a paid deal.

**Splitting the reward.** First, 1% of the period's reward goes to the founder (section 5.5). The remaining 99% is split 50/30/20:

| Who | Share of the remainder | Share of the whole reward | How it is distributed |
|---|---|---|---|
| The founder | — | 1% | into the 12-month rolling lock |
| Super-nodes | 50% | 49.5% | in proportion to the weight of the receipts of the deals they served in this period |
| Providers | 30% | 29.7% | in proportion to the weight of their receipts in this period |
| Customers | 20% | 19.8% | in proportion to the weight of their receipts in this period |
| **Total** | 100% | **100%** | |

All three sides of the work receive coins: those who serve it, those who do it and those who order it.

**The warm-up start.** The network begins working on real deals with real money before any coin exists, like an engine that turns over
on the starter before it fires:

- the 5% fee is taken from the very first deal and accumulates in the contract for super-nodes (document 09);
- no reward is issued until the network has passed a threshold of paid deal volume in USDC and has a minimum number of super-nodes —
  both constants in code, their values set by modelling;
- the first period then opens by itself; nobody presses a button;
- receipts closed during the warm-up earn no coins afterwards.

Taking the fee from the first deal makes the threshold expensive to fake: pushing the network to its start with empty deals would cost
5% of every one of them, paid to other super-nodes. Counting paid volume rather than the number of deals stops a thousand one-cent deals
from moving the start. Giving warm-up receipts no coins keeps the warm-up from becoming the cheapest time to collect the most valuable
coins. Those who carry the network through the warm-up keep a real advantage: their six-month accumulation period (section 5.4) runs
during it.

## 5.3 The deal fee

The network takes a 5% fee on every deal, in USDC, constant in code for ever. It is divided equally among all super-nodes except the
one the deal passed through; if there is no other super-node yet, it accumulates for those who join later. The fee is how fake deals are
made to cost real money: a deal with oneself, made to collect receipts, costs 5% of its amount, and none of it returns to the one who
paid it. The full rules are in document 09.

## 5.4 The six-month rule

For the first six months after joining the network, every participant can only accumulate coins: they cannot be sold or transferred.
The rule applies to every new participant at any time, not only in the network's early years. Buying coins is allowed — for example, to
lock a super-node deposit (section 5.6).

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

## 5.5 The founder

The founder receives 1% of every period's reward for creating the architecture. The share is created together with the period and
grows only while the network actually works; not a single coin is created in advance.

Each portion can be sold no earlier than 12 months after its period. The lock is rolling: the founder never holds a large amount that
could be dumped on the market at once. The share has no administrator keys: it cannot be accelerated, increased or taken away.

```solidity
// Sketch: the founder's portion from period n becomes available 12 months after that period
struct FounderTranche { uint96 amount; uint40 issuedAt; }
function releasable(FounderTranche memory t) public view returns (uint96) {
    return block.timestamp >= t.issuedAt + 365 days ? t.amount : 0;
}
```

**No other advantage.** The founder has no advantage over any participant except this share. The code makes the rest impossible: there
is no pre-mine and no key that issues coins; no key that changes any rule; the start of issuance is triggered by volume, not by a
person; and pushing the start with fake deals costs 5% that goes to other super-nodes.

**Named addresses under stricter rules.** The founder names their addresses and any super-node they run publicly in advance. The
contracts treat these addresses more strictly than anyone else's: everything they receive is locked for 12 months, and they cannot use
the deposit-free entry of section 5.6. A contract sees addresses, not people, so no code can stop anyone acting under an unnamed key —
but under an unnamed key the founder is an ordinary participant who pays everything everyone pays.

## 5.6 How new super-nodes join

A super-node is a permanent server that keeps the discovery index, builds search results, helps agents connect and carries settlement
(documents 01, 02, 06, 17). Each operator joins by bringing the network growth, not only money:

- **Participants brought in.** A new operator brings participants into the network. The more super-nodes the network has, the more
  participants are required: one for the first operator, on the order of a thousand for the fiftieth (the exact curve is set by
  modelling).
- **Real participants.** A participant counts only if their agent is a live server with its own address and an agent card that answers
  random checks by other super-nodes (not the one that brought it) for a month. Thousands of agents behind one address count as
  suspicious.
- **Deposit.** The operator locks a deposit in coins. Its size is calculated from the ratio of participants to super-nodes, the network
  load and other variables (the exact formula is set by modelling). It is returned in parts as the brought participants become active —
  each closing three deals.
- **The first 100 operators join without a deposit.** At the start no coins exist, so a deposit cannot be paid. Instead, an operator's
  first rewards stay locked as their deposit until it reaches the required size, and penalties are taken from it (document 06). The
  privilege belongs to the operator, not to the place: a place they leave reopens on the terms of the day it reopens.
- **Dynamic threshold.** Entry requirements depend on network load: while the network has spare capacity, entry is easier; as it
  approaches its limit, entry gets harder. The threshold does not grow without bound.
- **Vacancies.** A super-node that stops meeting its obligations is removed (document 06). Its place opens on the terms on which its
  operator joined: if the second operator leaves after 15 years, the place goes to whoever locks the same deposit that operator locked
  and brings the same number of active participants — for example, only two. The deposit-free privilege of the first 100 is the one
  exception: it is never inherited.

## 5.7 What $LGX does not have

- No sale of coins at launch and no allocation for investors.
- No fund created in advance and no keys that let anyone create coins outside the issuance schedule.
- No mechanism whose only purpose is price.
- No place in search: ranking follows paid work, not coins (document 17).
- Lagrix makes no promise about the price of $LGX. It is an asset of its holder and the deposit of a super-node operator.

## 5.8 Why $LGX issuance is tied to the network's work

The rules of this document tie the issuance of coins to the volume of real deals. The link comes from the rules themselves, not from
promises.

**The link through the fee.** New coins go to receipts, and every receipt is a deal from which a 5% fee in USDC was deducted and paid to
other super-nodes (document 09). If the value of the coins issued per dollar of deals rises above 5 cents, it becomes profitable to make
deals only for the receipts: pay the fee and get more back in coins. Such receipts multiply, and each receipt earns fewer coins — until
the profit disappears. So the value of the new coins the network issues in a period tends toward the fee's share of the deal volume in
that period:

```
value_of_coins_issued_in_period ≈ fee_rate × deal_volume_in_period
```

**What this link does not do.**
- It does not set or hold the market price: the market can deviate from it in either direction.
- An upward deviation is corrected slowly: coins earned by new participants cannot be sold for the first six months.
- A downward deviation corrects nothing except that serving deals for coins becomes less profitable.
- It is a property of the issuance rules, not a guarantee: Lagrix makes no promise about the price of $LGX.

The exact equilibrium values are set by modelling the network.
