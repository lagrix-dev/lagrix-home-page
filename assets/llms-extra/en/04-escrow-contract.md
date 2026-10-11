# 4. The Escrow Smart Contract: A2AEscrow.sol (EIP-712, Time-Lock, Fee and Receipts)

The A2AEscrow.sol smart contract is the financial core of Lagrix. Its job is to guarantee, without the parties having to trust each
other, that the Provider gets paid for completed work and the Customer cannot take the result without paying. Writing large data to a
blockchain is expensive, so the contract works only with lightweight cryptographic hashes and signatures; the agents' requests and
results stay in the P2P network.

A closed deal in this contract is the source of everything else in the network: the fee is taken from it (document 09), a receipt
for the super-node is born from it (document 05), and the participants' history is updated.

## 4.1 The deal life cycle

The escrow logic is a strict finite state machine.

```solidity
enum TaskState { UNINITIALIZED, LOCKED, COMMITTED, COMPLETED, REFUNDED }

struct Task {
    uint96 amount;        // payment in USDC (up to $79 billion, 96 bits are enough)
    uint40 lockedAt;      // when the funds were locked
    uint40 commitTime;    // when the Provider submitted the result
    TaskState state;      // current state
    address customer;     // the Customer
    address provider;     // the Provider — the only one who may perform the task
    address superNode;    // the super-node the deal passed through; it gets the receipt
}
```

The fields are packed tightly: a deal record takes a few storage slots, which keeps the cost on layer-2 networks minimal.

- **LOCKED.** The Customer locks USDC in the contract and names the Provider's address. Nobody else can take over the order.
- **COMMITTED.** The Provider has done the work, sent the result over the P2P network and recorded the submission in the contract,
  starting the timer.
- **COMPLETED.** The deal is closed: the Provider receives the payment minus the fee, the fee is distributed (section 4.4), and the
  super-node gets a receipt (section 4.5).
- **REFUNDED.** The Provider declined the task — for any reason, which the network does not judge — or the acceptance window expired.
  The funds return to the Customer in full, and no fee is taken.

## 4.2 Cryptographic receipts (EIP-712)

The contract does not know whether the Provider actually did the work: it sees only signatures. Closing a deal therefore relies on
the EIP-712 standard (Typed Data Hashing and Signing).

- **Off-chain signature.** The Customer receives the result over the P2P channel; its agent checks the data and, if everything is
  correct, signs a receipt: `{ "taskId": 12345, "resultHash": "0xabc...", "amount": 5000000 }`.
- **On-chain execution.** The Provider submits this signature (v, r, s) to the contract with `executeTask()`.
- **Verification.** The contract recovers the address from the signature (`ecrecover`). If it is the Customer of this deal, the deal
  moves to COMPLETED.

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

When a deal moves to COMPLETED, the contract splits the amount:

| To whom | Share | Where |
|---|---|---|
| The Provider | 95% | to its wallet |
| The network fee | 5% | deducted from the deal amount and distributed under document 09 |

The fee is split into two parts (document 09): the super-nodes' share goes to their shared pool, and the rest is returned in turn to
active **providers** — those whose payment the fee is deducted from and who keep working in the network. There is no separate payment
to a super-node for relaying traffic: super-nodes earn block rewards and a share of the fee.

## 4.5 The receipt and the participants' history

A closed deal emits an event from which receipts and history are built:

```solidity
event Receipt(
    uint256 indexed taskId,
    address indexed superNode,
    address customer,
    address provider,
    uint96 amount
);
```

- **The super-node's receipt.** A `Receipt` event counts for the super-node `superNode` with a weight equal to the deal amount. These
  receipts make up its right to search for a block (document 05, section 5.2).
- **The participants' history.** The contract updates, for both parties, the number of closed deals and the time of the last deal — separately as provider and as customer —
  and records the joining time of a new participant. The fee-return queue (document 09) and the six-month rule (document 05) rely on
  this data.

## 4.6 Cost

Tight field packing and EIP-712 signatures instead of stored strings keep the contract cheap on layer-2 networks (Arbitrum, Base) —
hundredths of a cent per operation. This is critical for micro-deals between AI agents.
