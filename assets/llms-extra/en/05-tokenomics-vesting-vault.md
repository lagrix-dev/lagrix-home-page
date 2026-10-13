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
| Deal fee | a constant of at most 5% of the deal amount, set by modelling (5% until then), paid to witnesses (section 5.3, document 09) |
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

**Splitting the reward.**

| Who | Share of the reward | How it is distributed |
|---|---|---|
| The founder | 1% | into the 12-month rolling lock (section 5.5) |
| Super-nodes, by work | 49.5% | in proportion to the weight of the receipts of the deals they served in this period |
| Provider agents | 29.7% | in proportion to the weight of the receipts of their paid work in this period |
| Super-nodes, equally | 19.8% | in equal parts to the super-nodes that passed the quality minimum in this period (section 5.6) |
| **Total** | **100%** | |

Coins go to those who do the work and those who serve it. Customer agents receive no coins: a customer who received coins for paying for
a service would in effect be buying coins with that payment.

**The warm-up start.** The network begins working on real deals with real money before any coin exists, like an engine that turns over
on the starter before it fires:

- the fee is taken from the very first deal and paid to that deal's witnesses, as always (section 5.3); nothing accumulates in the
  contract;
- no reward is issued until the network has passed a threshold of paid deal volume in USDC and has a minimum number of super-nodes —
  both constants in code, their values set by modelling;
- the first period then opens by itself; nobody presses a button;
- receipts closed during the warm-up earn no coins afterwards.

Taking the fee from the first deal makes the threshold expensive to fake: pushing the network to its start with empty deals would cost
the fee on every one of them, paid to witnesses chosen at random. Counting paid volume rather than the number of deals stops a thousand one-cent deals
from moving the start. Giving warm-up receipts no coins keeps the warm-up from becoming the cheapest time to collect the most valuable
coins. Those who carry the network through the warm-up keep a real advantage: their six-month accumulation period (section 5.4) runs
during it.

## 5.3 The deal fee

The network takes a fee on every deal, in USDC. Its size is a constant in code, set by modelling and never above 5%; until the modelling
is done, it is 5%. The fee goes to **witnesses**: super-nodes chosen at random for each deal, which check its receipt and sign it. The
super-node that served the deal is not a witness to it. The fee is how fake deals are made to cost real money: a deal with oneself, made
to collect receipts, costs the fee on its amount, and the payer does not choose who receives it. The full rules are in document 09.

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
person; and pushing the start with fake deals costs the fee, which goes to witnesses chosen at random.

**No super-nodes.** The founder and persons related to them, Fractera, Inc. included, run no super-nodes and act as no witness. They
name their addresses publicly in advance, and the contracts refuse those addresses the role of super-node and of witness; everything
these addresses receive is locked for 12 months. Super-nodes receive the witness fee and most of the issuance, so a founder running them
would earn from the network on top of the 1%. A contract sees addresses, not people, so it can bind only the addresses that are named;
the public statement binds the person.

## 5.6 How new super-nodes join

A super-node is a permanent server that keeps the discovery index, builds search results, helps agents connect and checks and signs the receipts of deals; payment itself is settled by the escrow contract (document 04)
(documents 01, 02, 06, 17). Places open in three stages, and every place is assigned at random, not bought:

- **Places 1–100: without a deposit.** At the start no coins exist, so a deposit cannot be paid. Instead, an operator's first rewards
  stay locked as their deposit until it reaches the required size, and penalties are taken from it (document 06). The privilege belongs
  to the operator, not to the place.
- **Places 101–1,000: by invitation.** These places open regardless of the network's load. Invitations go only to owners of provider
  agents with paid work over the last year; one ticket per address. The deposit is small, the same for everyone, and paid in coins the
  applicant earned — it sells nothing to anyone.
- **After 1,000: by overload.** New places open only when the network is overloaded — when deals per super-node exceed a constant — two
  places at a time.
- **Measurement by random agents.** An applicant's server is measured by agents chosen at random, not by super-nodes: existing
  super-nodes gain from having fewer competitors, so they must not be the ones who judge newcomers.
- **Random selection with diversity.** Places are assigned at random among applicants whose servers passed, with diversity of networks and regions, so
  that one applicant with many servers cannot take many places. Ranking applicants by power or by the number of operations is not used:
  it would start a race for hardware and reward load generated by oneself.
- **Rotation.** Once every 1 year / N, where N is the number of super-nodes, one super-node chosen at random leaves. There is no
  penalty: its deposit is returned. Its place is assigned by the same random selection, on the terms of the day it reopens. On average a super-node stays
  about a year, so the door stays open to those who do paid work now.
- **The quality minimum.** Every period, random agents check each super-node against a minimum: passed or failed. Those who passed
  share 19.8% of the period's reward equally (section 5.2); a super-node that fails for several periods leaves.
- **Vacancies.** A place freed by rotation, by failing the minimum or by removal for fraud (document 06) reopens on the terms of the day
  it reopens, never on the terms of the operator who left.

The numbers — the deposit, the overload constant, how many failed periods lead to leaving — are set by modelling. The source of
randomness for the selection of places and rotation, and how "passed or failed" is measured, are open questions (document 000).

## 5.7 What $LGX does not have

- No sale of coins at launch and no allocation for investors.
- No fund created in advance and no keys that let anyone create coins outside the issuance schedule.
- No mechanism whose only purpose is price.
- No place in search: ranking follows paid work, not coins (document 17).
- Lagrix makes no promise about the price of $LGX. It is an asset of its holder and the deposit of a super-node operator.

## 5.8 Why $LGX issuance is tied to the network's work

The rules of this document tie the issuance of coins to the volume of real deals. The link comes from the rules themselves, not from
promises.

**The link through the fee.** New coins go to receipts, and every receipt is a deal from which a fee in USDC was deducted and paid to
witnesses (document 09). If the value of the coins issued per dollar of deals rises above the fee rate, it becomes profitable to make
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
