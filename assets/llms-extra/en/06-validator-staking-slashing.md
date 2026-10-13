# 6. Super-node Deposits: Downtime and Fraud

Super-nodes are the backbone of Lagrix: they keep the discovery table, build search results, help agents connect and check and sign
the receipts of deals; payment itself is settled by the escrow contract (document 04). The ValidatorStaking.sol contract ties a server's behaviour in the network to its operator's deposit. The main rule of
this document: **downtime is not fraud**. A server that goes offline simply stops earning; coins are taken only for proven fraud.

## 6.1 The deposit

The deposit is set by the place the operator receives (document 05, section 5.6). Operators of places 1–100 join without a deposit:
their first rewards stay locked as the deposit until it reaches the required size, and penalties are taken from what has accumulated.
Later operators lock a small deposit, the same for everyone, in coins they earned.
On withdrawal the deposit stays locked for 14 days: if fraud committed before the withdrawal comes to light in that time, the penalty
can still be collected.

```solidity
struct Validator {
    uint96 stakeBalance;    // locked deposit in LGX
    uint40 lastSeen;        // last confirmed availability
    uint40 unbondingFrom;   // start of the 14-day withdrawal (0 if none)
    uint16 slashCount;      // number of proven violations
    bool   blacklisted;     // permanently excluded for forgery
    address pubKeyAddress;  // address bound to the NodeID
}
```

## 6.2 Downtime is not fraud

As in Bitcoin, where a miner that is switched off simply finds no blocks, a super-node is not penalised for downtime.

- **While the node is unavailable,** it serves no deals, so it earns no receipts and no share of the period's reward; it is not chosen
  as a witness, so it receives no fee; and it does not pass the period's quality minimum. It loses only income.
- **Availability** is measured by neighbouring nodes: regular checks (PING) from the Kademlia table (document 01).
- **If the node is unavailable for 30 days in a row, or fails the quality minimum for several periods,** it is removed. Its place
  reopens on the terms of the day it reopens (document 05, section 5.6), and the deposit is returned to the operator after the 14-day
  withdrawal. It did not cheat — it left.
- **Rotation is not a penalty either.** Once every 1 year / N a super-node chosen at random leaves; its deposit is returned in the same
  way (document 05, section 5.6).

## 6.3 Fraud and its proof

A blockchain cannot see IP packets, so fraud is proven by receipts and checks that anyone can repeat.

**Packet dropping.** A customer (agent A) sends traffic to a provider (agent B) through super-node R. Agent A signs the packet;
agent B signs a receipt of delivery. If R accepted the packet for relaying but B's receipt is missing, agent A sends a
`TRACE_REQUEST`; three independent neighbours confirm that R accepted the packet and did not pass it on — this forms a Fraud Proof.

**Falsified results.** The random places in search results are calculated verifiably (document 17, section 17.3). A result list in
which a random place does not match the calculation is a ready proof: the contract checks the super-node's signature on it and the
calculation data.

**Forged tables and NodeID hijacking.** An attempt to forge Kademlia DHT records or to impersonate another node is proven by
signatures that do not match the node's key.

## 6.4 Penalties

| Violation | Proof | Penalty |
|---|---|---|
| Downtime | unavailability to neighbours | **none**; the node loses income and after 30 days is removed with its deposit returned |
| Packet dropping | Fraud Proof with a missing receipt | 10% of the deposit |
| Falsified results | results that do not match the verifiable calculation | 25% of the deposit |
| Forged tables, NodeID hijacking | signatures that do not match | 100% of the deposit and permanent exclusion |

**Where the taken coins go.** Half goes to whoever proved the violation: a reward for keeping the network honest. The other half is
removed from circulation for good — as in Bitcoin, where an unclaimed reward is simply lost. No new coins are issued to replace it, so
the final number of coins ends up below 1,000,000,000 by exactly that amount.

```
[Customer agent] --(packet)--> [Super-node R] --X (dropped)--> [Provider agent]
       |                                                              |
       +---------------- (TRACE_REQUEST, waiting for receipt) --------+
                                      |
                              [Fraud Proof]
                                      |
                                      v
                       [ValidatorStaking.sol: slashValidator()]
                                      |
                    +-----------------+-----------------+
                    |                                   |
          (50% to whoever proved it)        (50% removed from circulation)
```

## 6.5 Protection against false reports

So that the contract is not flooded with fake proofs, calling `slashValidator()` requires the reporter to lock a small deposit.

- **The proof is valid:** the reporter gets the deposit back and receives half of the penalty.
- **The proof is false:** the reporter's deposit is removed from circulation.

Honest work pays better than risking the deposit, and a false report costs more than silence.
