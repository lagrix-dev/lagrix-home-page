# 6. Super-nodes: Downtime and Proven Violations

Super-nodes are the backbone of Lagrix: they keep the discovery table, build search results, keep the index of receipts and reviews and
help agents connect; payment itself is settled by the escrow contract (document 04). The SuperNodeRegistry.sol contract keeps the
super-node places and the record of proven violations. What a super-node has at stake is its place and its reputation (document 05,
section 5.4). The main rule of this document: **downtime is not a violation**. A server that goes offline simply stops
earning; a mark is added only for a proven violation.

## 6.1 What the contract keeps

```solidity
struct SuperNode {
    uint40 includedAt;      // when the place was taken (rotation order)
    uint40 lastSeen;        // last confirmed availability
    bool   active;          // holds a place now
    address pubKeyAddress;  // address bound to the NodeID
}
mapping(address => bool) public provenViolation;  // node wallet => permanent mark; such a node may not hold a place again
```

The mark belongs to the node's wallet and is shown on every element of that node (document 17). It is never removed.

## 6.2 Downtime is not a violation

As in Bitcoin, where a miner that is switched off simply finds no blocks, a super-node is not penalised for downtime.

- **While the node is unavailable,** it serves nobody, so it does not pass the period's quality minimum and receives no share of the
  period's fee pool and no search or delivery fees. It loses only income.
- **Availability** is measured by neighbouring nodes: regular checks (PING) from the Kademlia table (document 01).
- **If the node is unavailable for 30 days in a row, or fails the quality minimum for several periods,** it is removed. Its place
  reopens on the terms of the day it reopens (document 05, section 5.6). It receives no mark: it did not cheat — it left.
- **Leaving early after an unanswered capacity warning** is not a penalty either: there is no mark (changelog entry 45).
- **Leaving by rotation or by overload is not a penalty either;** the rules are in document 05, section 5.6.

## 6.3 Violations and their proof

A blockchain cannot see IP packets, so a violation is proven by receipts and checks that anyone can repeat.

**Packet dropping.** A customer (agent A) sends traffic to a provider (agent B) through super-node R. Agent A signs the packet;
agent B signs a receipt of delivery. If R accepted the packet for relaying but B's receipt is missing, agent A sends a
`TRACE_REQUEST`; three independent neighbours confirm that R accepted the packet and did not pass it on — this forms a proof.

**Falsified results.** The place given in turn in search results is calculated verifiably (document 17, section 17.3). A result list in
which that place does not match the calculation is a ready proof: the contract checks the super-node's signature on it and the
calculation data.

**Forged tables and NodeID hijacking.** An attempt to forge Kademlia DHT records or to impersonate another node is proven by
signatures that do not match the node's key.

## 6.4 What a proven violation costs

| Violation | Proof | Consequence |
|---|---|---|
| Downtime | unavailability to neighbours | **none**; the node loses income and after 30 days is removed without a mark |
| Packet dropping | a proof with a missing receipt | the «proven violation» mark, removal, no place ever again |
| Falsified results | results that do not match the verifiable calculation | the same |
| Forged tables, NodeID hijacking | signatures that do not match | the same |

A proven violation adds a permanent, visible «proven violation» mark to the node's wallet and to all its elements; the node leaves its
place at once and may not hold a super-node place again. Nothing is erased: the mark is a new event in the record, and the node's earlier
history stays as it was (document 05, section 5.4). Whoever proved the violation receives a reward in USDC from the fees; its size is set
by modelling.

```
[Customer agent] --(packet)--> [Super-node R] --X (dropped)--> [Provider agent]
       |                                                              |
       +---------------- (TRACE_REQUEST, waiting for receipt) --------+
                                      |
                                   [Proof]
                                      |
                                      v
                   [SuperNodeRegistry.sol: proveViolation()]
                                      |
                    +-----------------+-----------------+
                    |                                   |
     (mark on the wallet and its elements,    (reward in USDC from the fees
      removal, no place again)                  to whoever proved it)
```

## 6.5 Protection against false reports

So that the contract is not flooded with fake proofs, calling `proveViolation()` requires the reporter to lock a small amount of USDC.

- **The proof is valid:** the reporter gets the amount back and receives the reward.
- **The proof is false:** the amount is lost for good — sent to an address whose key nobody has, so that nobody gains from a false report.

Honest work pays better than a false report, and a false report costs more than silence.
