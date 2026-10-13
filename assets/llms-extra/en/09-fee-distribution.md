# 9. The Deal Fee: Income for the Super-nodes That Did Not Serve the Deal

The network takes a fee on every deal. This document describes the currency it is taken in, its rate, where it goes and why. The $LGX
coin plays no part in this mechanism: the fee is money for the work of the network, while $LGX is an asset of its holder and a
super-node's deposit (document 05).

## 9.1 Currency: USDC

Agents pay each other for work in USDC (document 04). The fee is taken in the same currency and paid out in it.

| Why USDC | What it gives |
|---|---|
| The fee costs real money from day one | a fake deal with oneself costs 5% of its amount even while $LGX does not yet exist |
| Payouts make sense to people | "10 cents came in", with no conversion at a rate |
| Super-nodes' income does not depend on a rate | when issuance has faded, operators keep a stable income |
| No trading of the coin inside the mechanism | the network neither buys nor sells $LGX and does not affect its price |

## 9.2 Rate and moment of collection

The rate is **5% of the deal amount, a constant in immutable code**. Nobody can change it; a different rate could arrive only with a
new version of the contracts that participants join voluntarily (document 18). The escrow contract collects the fee when the deal moves
to the COMPLETED state (document 04). If a deal ends in a refund (REFUNDED), no fee is taken.

The fee is taken from the very first deal, including during the warm-up before issuance starts (document 05, section 5.2).

## 9.3 Where the fee goes

Every fee is divided **equally among all active super-nodes except the one the deal passed through**. If there is no other super-node
yet, the fee accumulates in the contract and is shared among the super-nodes that join later.

```solidity
// Sketch: the fee of a deal is credited in equal shares to every active super-node except the one that served it
function _creditFee(uint256 fee, address servingNode) internal {
    uint256 others = activeNodes - (isActive[servingNode] ? 1 : 0);
    if (others == 0) { reserve += fee; return; }       // no other node yet: kept for those who join later
    accPerNode += fee / others;                          // every node's claim grows by an equal share
    excluded[servingNode] += fee / others;               // ...except the node that served this deal
}

// A super-node that joins starts from the current total: paid[node] = accPerNode, and it also receives its share of `reserve`.
function claim() external {
    uint256 a = accPerNode - paid[msg.sender] - excluded[msg.sender];
    paid[msg.sender] += a;
    usdc.safeTransfer(msg.sender, a);
}
```

The contract keeps one running total, so the cost of a deal is the same for any number of super-nodes. Money is not transferred on every
deal: each super-node withdraws what has accumulated in one transaction whenever it chooses.

## 9.4 Why this way

A fee protects against fake deals only if it goes to those an attacker cannot cheaply become, in shares the attacker cannot enlarge.

- **Becoming a super-node is expensive:** participants brought in and checked for a month, a deposit (document 05, section 5.6).
- **An equal share per node does not grow with fake volume.** A super-node that pushes fake deals through itself gets none of its own fee
  back. A group that controls k of M super-nodes and routes fake deals through one of them gets back at most (k−1)/(M−1) of that fee,
  and every one of those nodes costs a full entry.
- **Excluding the serving node matters most at the start.** Without it, the first and only super-node would get its own fee back in full
  and could collect the reward for free.
- **One rate for everyone.** If each super-node set its own rate, the fee would go to other nodes anyway, so each node could gain only by
  lowering its rate — down to zero, where fake deals cost nothing.

## 9.5 How to talk about it

The fee is income for the super-nodes that keep the network running, paid by every deal and shared equally among them. The amount a
super-node receives is not known in advance and is not guaranteed by anything: it depends on which deals close in the network.
