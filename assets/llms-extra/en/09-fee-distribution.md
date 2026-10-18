# 9. The Deal Fee: Payment to Super-nodes for the Network's Work

The network takes a fee on the part of every deal that is paid through it. This document describes the currency it is taken in, its
rate, where it goes and why. The fee is money for the work of the network (document 05).

## 9.1 Currency: USDC

Agents pay each other for work in USDC (document 04). The fee is taken in the same currency and paid out in it.

| Why USDC | What it gives |
|---|---|
| The fee costs real money from day one | a fake deal with oneself costs the fee on its amount from the very first deal |
| Payouts make sense to people | "10 cents came in", with no conversion at a rate |
| Super-nodes' income does not depend on a rate | operators are paid in the same dollars their servers cost |

## 9.2 What the fee is taken from

A deal may be paid in two parts (document 04, section 4.6). The part paid outside the network, in any ordinary way, is not seen by the
network, and no fee is taken from it. The fee is taken only from the **network part** — the amount locked in escrow.

The rate is **a constant in immutable code, set by modelling and never above 5% of the network part**. Until the modelling is done, it
is 5%. Once deployed, nobody can change it; a different rate could arrive only with a new version of the contracts that participants
join voluntarily (document 18). The escrow contract collects the fee when the deal moves to the COMPLETED state (document 04). If a deal
ends in a refund (REFUNDED), no fee is taken.

The fee is taken from the very first deal. How it applies to a cancelled order (document 04, section 4.3) is an open question of the
changelog (document 000).

## 9.3 Where the fee goes: the super-nodes that kept the network running

The fees of a period are added up in the contract. At the end of the period they are divided **in equal parts among the
super-nodes that passed the quality minimum in that period** (document 05, section 5.6). Nothing carries over to later periods, and the
parties of a deal never receive any of it. When the provider works with an element it received over F2F, 20% of the deal's fee goes to
the developer named in the element's card before the rest enters the pool (document 26). The reward to whoever proves a violation by a super-node (document 06, section 6.4) is also
paid from the fees; its size is set by modelling.

```solidity
// Sketch: the fees of a period are pooled and divided equally among the super-nodes that passed the quality minimum
mapping(uint256 => uint256) public pooled;                            // period => USDC collected
mapping(uint256 => mapping(address => bool)) public claimed;

uint256 public constant DEVELOPER_SHARE_BPS = 2000;                 // 20% of the fee (document 26)

function _collect(uint256 period, uint256 fee, address developer) internal {   // called by the escrow on COMPLETED
    uint256 share = developer == address(0) ? 0 : fee * DEVELOPER_SHARE_BPS / 10_000;
    if (share > 0) usdc.safeTransfer(developer, share);               // the developer of an element received over F2F
    pooled[period] += fee - share;
}

function claimFeeShare(uint256 period) external {
    require(period < currentPeriod(), "Fees: period not closed");
    require(quality.passed(period, msg.sender), "Fees: quality minimum not passed");
    require(!claimed[period][msg.sender], "Fees: already claimed");
    claimed[period][msg.sender] = true;
    usdc.safeTransfer(msg.sender, pooled[period] / quality.passedCount(period));
}
```

How "passed or failed" is measured is an open question of the changelog (document 000).

## 9.4 Why this way

The fee has two jobs at once.

- **It pays for the network's work.** Super-nodes do the work every deal relies on, all the time: they keep the discovery index, build
  search results, keep the index of receipts and reviews, help agents connect and relay encrypted traffic. The fee is their pay for the
  period in which they did this work and passed the quality minimum.
- **It makes a fake deal cost money.** A deal with oneself, made to collect receipts or reviews, pays the fee on its network part. A
  review weighs exactly the fee paid on its deal (document 17), so one unit of review weight costs a fake deal one dollar of fees.

Each alternative breaks one of these jobs:

| Alternative | Why it does not fit |
|---|---|
| Pay the fee to the super-node that served the deal | it would get its own fee back, and a deal with oneself would cost nothing |
| Pay each deal's fee to the super-node whose turn it is | the turn is predictable, so a party could time its deal to land the fee on its own super-node |
| Pay witnesses that check each deal | the escrow contract already checks the customer's signature; the network cannot check the service itself, so the witnesses' work would be a fiction |
| Divide the fee by deal volume | it would return to every payer exactly what it paid, and fake deals would be free |
| Pay the nodes of agents | nodes are cheap to multiply; whoever ran many of them would collect the fee back |
| Burn the fee | it protects against fake deals just as well, but people's money would be destroyed and the network's work would go unpaid |

Pooled by period and divided equally, the fee cannot be steered: a group that holds k of M super-nodes gets back only k/M of its own
fee, and every one of those places was assigned by random choice, not bought (document 05, section 5.6).

**The developer share and the nodes of agents.** The share is meant for code that another project installed over F2F, and it is a fifth
of the fee (document 26). The contracts cannot check where an element came from, so a node that names a wallet of its own as the
developer gets that fifth back on its deals — in effect the case this table rejects, limited to a fifth of the fee. It is a cost of the
rule that is stated, not hidden.

**One rate for everyone.** If each super-node set its own rate, each could gain only by lowering it — down to zero, where fake deals
cost nothing. The ceiling of 5% is fixed; modelling may lower the rate.

## 9.5 How to talk about it

The fee is payment to the super-nodes that kept the network running in the period: search, connections and the index of receipts and
reviews. The amount a super-node receives is not known in advance and is not guaranteed by anything: it depends on which deals close in
the network and on how many super-nodes passed the quality minimum.
