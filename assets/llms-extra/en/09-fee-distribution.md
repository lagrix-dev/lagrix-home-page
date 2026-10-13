# 9. The Deal Fee: Payment to the Witnesses of a Deal

The network takes a fee on every deal. This document describes the currency it is taken in, its rate, where it goes and why. The $LGX
coin plays no part in this mechanism: the fee is money for the work of the network, while $LGX is an asset of its holder and a
super-node's deposit (document 05).

## 9.1 Currency: USDC

Agents pay each other for work in USDC (document 04). The fee is taken in the same currency and paid out in it.

| Why USDC | What it gives |
|---|---|
| The fee costs real money from day one | a fake deal with oneself costs the fee on its amount even while $LGX does not yet exist |
| Payouts make sense to people | "10 cents came in", with no conversion at a rate |
| Super-nodes' income does not depend on a rate | when issuance has faded, operators keep a stable income |
| No trading of the coin inside the mechanism | the network neither buys nor sells $LGX and does not affect its price |

## 9.2 Rate and moment of collection

The rate is **a constant in immutable code, set by modelling and never above 5% of the deal amount**. Until the modelling is done, it
is 5%. Once deployed, nobody can change it; a different rate could arrive only with a new version of the contracts that participants
join voluntarily (document 18). The escrow contract collects the fee when the deal moves to the COMPLETED state (document 04). If a deal
ends in a refund (REFUNDED), no fee is taken.

The fee is taken from the very first deal, including during the warm-up before issuance starts (document 05, section 5.2).

## 9.3 Where the fee goes: witnesses

For every deal the contract chooses **witnesses** at random among the active super-nodes. A witness checks the deal's receipt and signs
it; the fee is divided among the witnesses who signed. The super-node that served the deal is never a witness to it, and neither is an
address of the founder or of persons related to them (document 05, section 5.5).

The warm-up changes nothing: from the first deal, the fee goes to that deal's witnesses. Nothing accumulates in the contract for later.

```solidity
// Sketch: witnesses are chosen for a deal; those who sign its receipt share the fee
function _openWitnessing(bytes32 dealId, address servingNode) internal {
    address[] memory w = _chooseWitnesses(dealId, servingNode, WITNESSES_PER_DEAL); // excludes servingNode and named founder addresses
    witnesses[dealId] = w;
}

function sign(bytes32 dealId, bytes calldata receiptSig) external {
    require(_isWitness(dealId, msg.sender), "LGX: not a witness of this deal");
    require(_verifyReceipt(dealId, receiptSig), "LGX: receipt does not match the deal");
    signed[dealId][msg.sender] = true;
}

function claimWitnessFee(bytes32 dealId) external {
    require(signed[dealId][msg.sender] && !claimed[dealId][msg.sender], "LGX: nothing to claim");
    claimed[dealId][msg.sender] = true;
    usdc.safeTransfer(msg.sender, fee[dealId] / signers[dealId]);
}
```

The sketch leaves three things open, named in the changelog (document 000): the source of randomness behind `_chooseWitnesses`, the
number of witnesses per deal, and what happens while the network has too few super-nodes to choose them from.

## 9.4 Why this way

A fee protects against fake deals only if it goes to those an attacker cannot cheaply become and cannot choose.

- **A witness is paid for work it does on that deal.** An equal share of every deal would pay every super-node from other people's work,
  whether or not it did anything for the deal — income from the efforts of others, which is exactly what regulators look for.
- **The payer does not choose the witnesses.** They are chosen at random, so a group that controls k of M super-nodes and routes fake deals
  through one of them gets its fee back only when the random choice happens to land on its own nodes — on average (k−1)/(M−1) of it, and every one
  of those nodes is a place assigned at random, not bought (document 05, section 5.6).
- **Excluding the serving node.** Without it, a super-node could witness its own deals and take its own fee back.
- **No pot during the warm-up.** A pot accumulated before the start would be paid out to whoever then holds super-nodes, so whoever
  pushed the network to its start could get the cost back.
- **One rate for everyone.** If each super-node set its own rate, each node could gain only by lowering it — down to zero, where fake
  deals cost nothing. The ceiling of 5% is fixed; modelling may lower the rate to what checking a receipt really costs.

## 9.5 How to talk about it

The fee is payment to the super-nodes that witness a deal: they check its receipt and sign it. The amount a super-node receives is not
known in advance and is not guaranteed by anything: it depends on which deals close in the network and on the random choice.
