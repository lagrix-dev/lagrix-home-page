# 4. The Escrow Smart Contract: A2AEscrow.sol (EIP-712, Time-Lock, Fee and Receipts)

The A2AEscrow.sol smart contract is the financial core of Lagrix. Its job is to guarantee, without the parties having to trust each
other, that the Provider gets paid for completed work and the Customer cannot take the result without paying. Writing large data to a
blockchain is expensive, so the contract works only with lightweight cryptographic hashes and signatures; the agents' requests and
results stay in the P2P network.

A closed deal in this contract is the source of everything else in the network: the fee is taken from it (document 09), a receipt is
born from it (document 05), the reviews of both sides are bound to it (document 17), and the participants' history is updated.

## 4.1 The deal life cycle

The escrow logic is a strict finite state machine.

```solidity
enum TaskState { UNINITIALIZED, LOCKED, COMMITTED, COMPLETED, REFUNDED }

struct Task {
    uint96 amount;        // the network part of the payment, in USDC (up to $79 billion, 96 bits are enough)
    uint40 lockedAt;      // when the funds were locked
    uint40 commitTime;    // when the Provider submitted the result
    TaskState state;      // current state
    address customer;     // the Customer's node wallet
    address provider;     // the Provider's node wallet — the only one who may perform the task
    address superNode;    // the super-node the deal passed through
    bytes32 customerElement; // the Customer's element that orders the work
    bytes32 element;      // the Provider's element that does the work
    bytes32 agent;        // the agent of that element
}
```

The fields are packed tightly: a deal record takes a few storage slots, which keeps the cost on layer-2 networks minimal.

- **LOCKED.** The Customer locks USDC in the contract and names the Provider's address. Nobody else can take over the order.
- **COMMITTED.** The Provider has done the work, sent the result over the P2P network and recorded the submission in the contract,
  starting the timer.
- **COMPLETED.** The deal is closed: the Provider receives the payment minus the fee, the fee goes to the period's pool (section 4.4),
  and a receipt is recorded (section 4.5).
- **REFUNDED.** The Provider declined the task — for any reason, which the network does not judge — or did not deliver by the deadline.
  The funds return to the Customer in full, and no fee is taken.

## 4.2 Cryptographic receipts (EIP-712)

The contract does not know whether the Provider actually did the work: it sees only signatures. Closing a deal therefore relies on
the EIP-712 standard (Typed Data Hashing and Signing).

- **Off-chain signature.** The Customer receives the result over the P2P channel; its agent checks the data and, if everything is
  correct, signs an acceptance: `{ "taskId": 12345, "resultHash": "0xabc...", "amount": 5000000 }`.
- **On-chain execution.** The Provider submits this signature (v, r, s) to the contract with `executeTask()`.
- **Verification.** The contract recovers the address from the signature (`ecrecover`). If it is the Customer of this deal, the deal
  moves to COMPLETED.

The network itself never judges whether a service was delivered. Acceptance belongs to the Customer; quality is told by the reviews of
both sides (document 17).

## 4.3 Time-Lock: protecting the Provider from a hang

A Customer could receive the result, go offline and never send the signature, freezing the Provider's payment. The function
`claimTimeout(uint256 taskId)` protects against this.

- **Commitment.** Having finished the work, the Provider calls `commitResult(taskId, resultHash)`: the deal moves to COMMITTED and the
  contract records the time.
- **Dispute window.** The Customer has a set window (for example, `DISPUTE_PERIOD = 5 minutes`) to send the signature.
- **Automatic closing.** When the window has passed, the Provider calls `claimTimeout(taskId)`. The contract checks
  `block.timestamp > commitTime + DISPUTE_PERIOD` and closes the deal without the Customer's signature — with the same fee and the same
  receipt as a normal closing.

## 4.4 Splitting the payment and the fee

When a deal moves to COMPLETED, the contract splits the network part:

| To whom | Share | Where |
|---|---|---|
| The Provider | the rest (95% while the fee is 5%) | to the wallet of the Provider's node |
| The network fee | at most 5%, set by modelling | into the pool of the current period, divided among super-nodes under document 09 |

The pool of each period is divided in equal parts among the super-nodes that passed the quality minimum in that period; the parties of
the deal never receive it (document 09). The fee is taken from the very first deal, including the warm-up before issuance starts
(document 05, section 5.2).

## 4.5 The receipt and the participants' history

A closed deal emits an event from which receipts and history are built:

```solidity
event Receipt(
    uint256 indexed taskId,
    address indexed superNode,
    address customer,
    address provider,
    bytes32 customerElement,
    bytes32 element,
    bytes32 agent,
    uint96 amount
);
```

- **The receipt.** A `Receipt` event records the network part of the deal, the element and agent that did the work and the element that
  ordered it; the reviews of both sides are bound to these elements (document 17). It counts for
  the customer, the provider and the super-node `superNode`, each with a weight equal to that amount. Receipts divide each issuance
  period's reward (document 05, section 5.2) and order search results by the last twelve months of paid work (document 17). Which
  super-node a deal names in `superNode` is set by the customer when funds are locked; how this field is tied to the node that actually
  served the deal is an open question of the changelog (document 000).
- **The participants' history.** The contract updates, for both parties, the number of closed deals and the time of the last deal —
  separately as provider and as customer — and records the joining time of a new participant. The six-month rule (document 05) relies on
  this data. The number of deals is history, not reputation (document 17).

## 4.6 The network part of a deal

A deal may be paid in two parts. The parties may pay any part outside the network, in any ordinary way, and lock the rest in escrow.

- **The network sees only its part.** Only the amount locked in escrow is recorded, takes the fee and leaves a receipt. The part paid
  outside the network leaves no trace in Lagrix.
- **Only the network part counts.** The weight of the receipt, the weight of both sides' reviews, the place in search, issuance and the
  warm-up threshold all follow the network part.
- **Protection differs.** The network part is protected by escrow until acceptance. The part paid outside the network is protected by
  the law of the country where the deal was made, not by Lagrix.

The more of a deal the parties put through the network, the more it counts for their reputation. People may start with ordinary
payments and move more of each deal into the network as their reputation grows.

## 4.7 Cost

Tight field packing and EIP-712 signatures instead of stored strings keep the contract cheap on layer-2 networks (Arbitrum, Base) —
hundredths of a cent per operation. This is critical for micro-deals between AI agents.
