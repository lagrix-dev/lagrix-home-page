# 5. $LGX Tokenomics: Coins Are Born From the Network's Work

$LGX is the working tool of the Lagrix network. No coins are sold at launch: each one is created only when the network does useful
work — agents close deals and super-nodes serve them. This document describes how coins appear, who receives them, what can be done
with them, and which rules protect the network from those who come to trade rather than to work.

The numbers below are starting parameters. The exact issuance schedule, entry thresholds and shares are set by modelling the network.

## 5.1 Key properties

| Property | Value |
|---|---|
| Issuance cap | 1,000,000,000 LGX, mined over about 30 years |
| How coins appear | only as the reward for a found block (section 5.2) |
| Sale at launch | none: no presale, no investor allocation, no fund created in advance |
| Block reward | issuance spans about 30 years; the shape of the schedule — declining as in Bitcoin, constant, or tied to volume — is set by modelling |
| Deal fee | 5% of the deal amount (section 5.3) |
| New participants | for the first 6 months after joining, coins can only be accumulated (section 5.4) |
| Founder's share | 1% of every block; each portion can be sold no earlier than 12 months after its block (section 5.5) |

## 5.2 Receipts and block mining (Proof-of-Receipts)

Bitcoin pays miners for computations that are useless in themselves. Lagrix pays for what the network exists for: deals between
agents that it has served.

**Receipt.** When a deal between a customer and a provider is closed in escrow (document 04), the super-node it passed through
receives a receipt — a signed record of a completed, paid deal. A receipt's weight depends on the deal amount, not on the number of
messages: a thousand messages inside one deal give one receipt.

**Right to search for a block.** The more receipts a super-node holds for the current period, the more attempts it has at finding the
next block. The network keeps the block rate constant however many receipts there are: the number of attempts per receipt is adjusted
so that blocks appear at even intervals on average. Whether a declining reward schedule as in Bitcoin is needed on top of that, or
the network balances itself well enough through the fee (section 5.8), is a matter for modelling.

**Splitting the reward.** First, 1% of the block reward goes to the founder (section 5.5). The remaining 99% is split 50/30/20:

| Who | Share of the remainder | Share of the whole reward | How it is distributed |
|---|---|---|---|
| The founder | — | 1% | into the 12-month rolling lock |
| The super-node that found the block | 50% | 49.5% | in full |
| Providers | 30% | 29.7% | in proportion to the weight of their receipts in this block |
| Customers | 20% | 19.8% | in proportion to the weight of their receipts in this block |
| **Total** | 100% | **100%** | |

All three sides of the work receive coins: those who serve it, those who do it and those who order it. Coins held by an agent raise
its standing in search results (document 17).

## 5.3 The deal fee and its return to active participants

The network takes a 5% fee on every deal. The fee does two jobs.

**Protection against fake deals.** A deal with oneself, made to collect receipts and coins, costs 5% of its amount. The fee never
returns to whoever paid it — it goes to other participants — so receipts cannot be inflated without loss.

**Return to active providers.** The fee is deducted from the provider's payment (document 04), and in the early years it returns to
providers who keep working:

- a provider qualifies after closing more than three deals as a provider and at least one such deal in the last month;
- qualifying providers stand in one shared queue in the order they joined the network;
- each new fee goes in full to the next provider in the queue; the queue runs in a circle;
- there is no draw: the payout is the fee of the deal that fell to that turn of the queue.

The queue keeps a single pointer, so the load on the network is the same for any number of participants. Anyone who has not worked for
more than a month is skipped until they close a deal again.

**The fee moves to super-nodes over time.** While the block reward is large, it alone sustains the super-nodes, and the fee returns to
providers. As coins are mined, the share of the fee that goes to super-nodes grows — under any issuance schedule:

```
super_node_share   = coins_mined_so_far / 1,000,000,000
active_queue_share = 1 − super_node_share
```

By the end of mining (about 30 years) the whole fee goes to super-node operators — so the network keeps running when no new coins are
created. The super-nodes' share is divided among them in proportion to their receipts.

## 5.4 The six-month rule

For the first six months after joining the network, every participant can only accumulate coins: they count in search results, but
they cannot be sold or transferred. The rule applies to every new participant at any time, not only in the network's early years.
Buying coins is allowed — for example, to lock a super-node deposit (section 5.6).

```solidity
// Sketch of the rule: no transfer until six months have passed since the sender joined
function _update(address from, address to, uint256 amount) internal override {
    if (from != address(0)) {
        require(block.timestamp >= joinedAt[from] + 180 days, "LGX: six-month accumulation period");
    }
    super._update(from, to, amount);
}
```

Whoever comes to buy and quickly sell will sell nothing in six months. Whoever comes to work rises in search during that time.

## 5.5 The founder's share

The founder receives 1% of every mined block for creating the architecture. The share is created together with the block and grows
only while the network actually works; not a single coin is created in advance.

Each portion can be sold no earlier than 12 months after its block. The lock is rolling: the founder never holds a large amount that
could be dumped on the market at once. The share has no administrator keys: it cannot be accelerated, increased or taken away.

```solidity
// Sketch: the founder's portion from block n becomes available 12 months after that block
struct FounderTranche { uint96 amount; uint40 minedAt; }
function releasable(FounderTranche memory t) public view returns (uint96) {
    return block.timestamp >= t.minedAt + 365 days ? t.amount : 0;
}
```

## 5.6 How new super-nodes join

A super-node is a permanent server that keeps the discovery table, helps agents connect and carries settlement (documents 01, 02,
06). Each next operator joins by bringing the network growth, not only money:

- **Participants brought in.** A new operator brings participants into the network. The more super-nodes the network has, the more
  participants are required: one for the first operator, on the order of a thousand for the fiftieth (the exact curve is set by
  modelling).
- **Deposit.** The operator locks a deposit in coins. Its size is not fixed in advance: it is calculated from the ratio of participants to super-nodes, the network load and other variables (the exact formula is set by modelling). The deposit is returned in parts as the brought participants become active — each closing three deals.
- **Real participants.** A participant counts only if their agent is a live server with its own address and an agent card in a
  supported protocol (at the start, the A2A card at `/.well-known/agent-card.json`; protocols are chosen by the Super-node Council,
  document 18) that answers random checks by other super-nodes (not the one that brought it) for a month.
  Thousands of agents behind one address count as suspicious.
- **Dynamic threshold.** Entry requirements depend on network load: while the network has spare capacity, entry is easier; as it
  approaches its limit, entry gets harder. The threshold does not grow without bound.
- **Vacancies.** A super-node that stops meeting its obligations is removed (document 06). Its place opens on the terms on which it
  joined: if the second operator leaves after 15 years, the place goes to whoever locks the same deposit that operator locked and
  brings the same number of active participants — for example, only two.

## 5.7 What $LGX does not have

- No sale of coins at launch and no allocation for investors.
- No fund created in advance and no keys that let anyone create coins outside the mining rules.
- No mechanism whose only purpose is price.
- Lagrix makes no promise about the price of $LGX. It is the network's working tool: agents earn it by working and rise in search
  with it; operators lock it as their deposit.

## 5.8 Why $LGX issuance is tied to the network's work

The rules of this document tie the issuance of coins to the volume of real deals. The link comes from the rules themselves, not from
promises.

**The link through the fee.** New coins go to receipts, and every receipt is a deal from which a 5% fee in USDC was deducted
(document 09). If the value of the coins issued per dollar of deals rises above 5 cents, it becomes profitable to make deals only for
the receipts: pay the fee and get more back in coins. Such receipts multiply, and each receipt earns fewer coins — until the profit
disappears. So the value of the new coins the network issues in a period tends toward the fee's share of the deal volume in that
period:

```
value_of_coins_issued_in_period ≈ fee_rate × deal_volume_in_period
```

**The link through search results.** Coins in an account raise an agent in search (document 17). Whoever buys coins for visibility
acts like an advertiser: they spend on visibility as much as it brings them in orders. This demand, too, grows out of work, not out of
expectation.

**What this link does not do.**
- It does not set or hold the market price: the market can deviate from it in either direction.
- An upward deviation is corrected slowly: coins mined by new participants cannot be sold for the first six months.
- A downward deviation corrects nothing except that mining becomes less profitable.
- It is a property of the issuance rules, not a guarantee: Lagrix makes no promise about the price of $LGX.

The exact equilibrium values are set by modelling the network.
