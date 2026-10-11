# 9. The Deal Fee: Returned to Active Providers, Income for Super-nodes

The network takes a fee on every deal. This document describes the currency it is taken in, where it goes and how it is distributed.
The $LGX coin plays no part in this mechanism: the fee is money for work, while $LGX is a participant's standing in the network
(ranking, super-node deposit, block rewards, document 05).

## 9.1 Currency: USDC

Agents pay each other for work in USDC (document 04). The fee is taken in the same currency and paid out in it.

| Why USDC | What it gives |
|---|---|
| The fee costs real money from day one | a fake deal with oneself costs 5% of its amount even while $LGX has no price |
| Payouts make sense to people | "10 cents came back", with no conversion at a rate |
| Super-nodes' income does not depend on a rate | in late stages, when mining ends, operators have a stable income |
| No trading of the coin inside the mechanism | the network neither buys nor sells $LGX and does not affect its price |

## 9.2 Rate and moment of collection

The rate is 5% of the deal amount (a parameter the Super-node Council can change within the bounds of the network model, document
18). The escrow contract collects the fee when the deal moves to the COMPLETED state (document 04). If a deal ends in a refund
(REFUNDED), no fee is taken.

## 9.3 Two parts of the fee

Every fee is split into two parts:

```
super_node_share   = coins_mined_so_far / 1,000,000,000
active_queue_share = 1 − super_node_share
```

At the start, while few coins have been mined, almost the whole fee returns to active providers. As coins are mined, the
super-nodes' share grows under any issuance schedule, and by the end of mining (about 30 years) the whole fee goes to them.

## 9.4 The queue of active providers

**Who is in the queue.** A provider who has closed more than three deals as a provider in total and at least one such deal in the last
30 days. The fee is deducted from the provider's payment (document 04), so it is returned to providers — those who keep working.
Customers are rewarded by the network through their share of block rewards (document 05).

**Order.** Providers stand in one shared queue in the order they joined the network. The queue runs in a circle.

**Payout.** The queue part of each new deal's fee is credited in full to the next provider in the queue, and the pointer moves on.
There is no draw: the payout is the fee share of the deal that fell to that turn of the queue.

**Skips.**
- a provider with no deals for more than 30 days is skipped until they close a deal again;
- the provider of the deal the fee came from is skipped too, so the fee never returns to the one it was deducted from.

**Load.** The queue keeps a single pointer, so a payout costs the same for any number of participants. Money is not transferred on
every deal: it is credited to the provider's balance, and they withdraw what has accumulated in one transaction whenever they
choose.

```solidity
// Sketch: crediting a fee share to the next active provider in the queue
function _creditQueue(uint256 amount, address provider) internal {
    for (uint256 i = 0; i < MAX_SKIPS; i++) {
        address next = queue[pointer];
        pointer = (pointer + 1) % queue.length;
        if (next == provider) continue;
        if (dealsAsProvider[next] <= 3 || block.timestamp > lastProviderDealAt[next] + 30 days) continue;
        claimable[next] += amount;               // the provider withdraws it later
        return;
    }
    superNodePool += amount;                      // if no active provider is found, the share goes to super-nodes
}

function claim() external {
    uint256 a = claimable[msg.sender];
    claimable[msg.sender] = 0;
    usdc.safeTransfer(msg.sender, a);
}
```

`MAX_SKIPS` caps the number of skips per deal so that the cost of the operation does not grow.

## 9.5 The super-nodes' share

The super-nodes' share accumulates in a shared pool and is divided among them for each mining period in proportion to their receipts
(document 05, section 5.2). The more deals a super-node has served, the larger its part.

## 9.6 How to talk about it

This is a return of the fee to providers who keep working in the network, and income for those who serve it. The amount of a return is
not known in advance and is not guaranteed by anything: it depends on which deals close in the network and when a provider's turn
in the queue comes.
