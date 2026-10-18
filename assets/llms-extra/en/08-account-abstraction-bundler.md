# 8. Account Abstraction (ERC-4337): The UserOperation Structure and Bundler Infrastructure

Autonomous AI agents should not manage native blockchain wallets (EOA), having to calculate gas by hand, watch their ETH/MATIC balance and sign raw base transactions. Lagrix implements an Account Abstraction stack based on the ERC-4337 standard, which turns the node's wallet — the one wallet through which all the node's elements and agents pay (changelog entries 22 and 39) — into a programmable smart account (Smart Contract Wallet).

This fully isolates the agent's application logic from blockchain mechanics: the agent operates on a "request-payment" abstraction in USDC, and all the work with network fees is taken over by special aggregator nodes (Bundlers) and the Paymaster contract.

## 8.1 Anatomy of the UserOperation Structure

Instead of standard Ethereum transactions, AI agents form pseudo-transactions — UserOperation (UserOp) objects. The structure packs the agent's intent and is passed over the P2P network of Bundler nodes outside the blockchain's main mempool.

```solidity
struct UserOperation {
    address sender;             // Address of the node's smart account
    uint256 nonce;              // Unique sequential number (Anti-Replay)
    bytes initCode;             // Smart account creation code (if launched for the first time)
    bytes callData;             // Encoded function call (for example, lockFunds in A2AEscrow)
    uint256 callGasLimit;       // Gas limit for executing the application logic
    uint256 verificationGasLimit; // Gas limit for checking signatures and the Paymaster
    uint256 preVerificationGas; // Gas limit to compensate the Bundler's overhead
    uint256 maxFeePerGas;       // Maximum gas price (EIP-1559)
    uint256 maxPriorityFeePerGas;// Tip to the blockchain miner/validator
    bytes paymasterAndData;     // Paymaster contract address + sponsorship signature/conditions
    bytes signature;            // The AI agent's cryptographic signature (secp256k1 / BLS / Passkey)
}
```

Key fields for payments between agents:

initCode (Lazy Account Deployment): A node's smart account is created without transactions on the blockchain: it is generated off-chain deterministically through CREATE2. The first transaction automatically deploys the account contract thanks to the initCode field.

paymasterAndData: The main integration flag. Contains the address of the chosen third-party ERC-4337 paymaster and its signed price: the paymaster pays the transaction's stamp in its own ETH and charges the agent that price in USDC (changelog entries 37 and 38).

## 8.2 Bundler Infrastructure: Assembling and Packing Meta-Transactions

A Bundler is a specialized infrastructure node (a third-party one: Lagrix network participants do not carry others' transactions for a fee or sell stamps — changelog entry 38) that listens to a separate Alt-Mempool for UserOperations.

```
[Client Agent] ---> (UserOp in USDC) ---> [Alt-Mempool (P2P)]
                                                 │
                                                 ▼
                                        [ Bundler Node ]
                                                 │
                             (Packing into a bundle: [UserOp1, UserOp2, ...])
                                                 │
                                                 ▼
                                   [ EntryPoint.sol (On-Chain) ]
                                                 │
                                    ┌────────────┴────────────┐
                                    ▼                         ▼
                          [Paymaster]                 [A2AEscrow.sol]
                         (USDC charged for gas)     (Escrow capture)
```

Step-by-step Bundler algorithm:

Reception and filtering (Validation Phase): The Bundler receives a UserOp through the JSON-RPC method eth_sendUserOperation. It performs an off-chain simulation through the EntryPoint.sol contract, checking:
- The validity of the UserOp.signature.
- The paymaster's signature on the price, the agent's sufficient USDC balance or approval, and the paymaster's sufficient ETH deposit in the EntryPoint.
- The absence of forbidden opcodes (for example, TIMESTAMP, GASPRICE) that could break execution determinism.

Aggregation (Batching): The Bundler combines 10 to 100 valid UserOps from different AI agents into one standard Ethereum transaction.

Submission to the On-Chain EntryPoint: The Bundler calls the function handleOps(UserOperation[] ops, address beneficiary) on the singleton EntryPoint.sol contract.

Gas compensation: The Bundler pays the native L2 network gas (ETH) from its own wallet, and the EntryPoint reimburses it in ETH from the paymaster's deposit; the paymaster in turn charges the agent USDC — no more than the signed price.

## 8.3 The EntryPoint.sol Contract: The Execution Core

The ERC-4337 standard uses a single EntryPoint contract, proven over the years and deployed at the same addresses in all EVM networks. It acts as a trusted orchestrator.

Lifecycle of a handleOps() call inside EntryPoint:

Verification Loop:
- For each UserOp, the sender account is checked.
- If the account has not been created yet, initCode is executed.
- The validateUserOp() function on the node's smart account is called to check the ECDSA signature.
- validatePaymasterUserOp() is called on the chosen paymaster: it checks its own signature on the price and that the agent can pay it in USDC.

Execution Loop:
- EntryPoint executes the callData of each UserOp (for example, sending a call to A2AEscrow.sol).
- The exact amount of gas actually spent is measured.
- The EntryPoint charges gas from the paymaster's ETH deposit and calls its postOp, in which the paymaster charges the agent USDC — no more than the signed price.

## 8.4 Benefits for the Lagrix Ecosystem

Zero friction (Zero Gas Friction): A node only needs to put $10$ USDC on its smart account. Its agents will never need to hold native ETH for transactions.

Session Keys: The node's smart account makes it possible to limit permissions. Each agent can be given a temporary key allowed to spend no more than $1$ USDC per hour and to call exclusively the A2AEscrow.sol contract. If an agent is hacked, the hacker cannot withdraw all the funds from the account.

Atomic Multi-Operations: An agent can do approve(USDC) and lockFunds() in one UserOp, reducing the number of on-chain steps and saving 40% on gas.

## 8.5 Who pays gas (changelog entries 37 and 38)

Under ERC-4337 a paymaster's deposit in the EntryPoint is the network's ether («an amount of Ether (or any L2 native currency)»). The
network has no paymaster of its own, and Lagrix contracts require no particular one.

- **Everyone pays the stamps for their own actions themselves** — in the network's ether or through a third-party gas payment service in
  USDC, for example Circle Paymaster: an open contract, USDC only, no sign-up; on Arbitrum and Base a 10% surcharge on gas. The network
  has no connection with such a service.
- **Network participants do not sell stamps.** Neither nodes nor super-nodes run paymasters for others or carry others' transactions for
  a fee: such a service could count as an exchange of crypto-assets or their transfer on behalf of clients in the sense of MiCA (Article
  3(1)(16), (20), (26)).
- **A super-node pays stamps only for its own actions:** redeeming batches of vouchers, collecting its share of the fees, registering its place.
- **The fallback — one's own ether — is always open:** a third-party service's refusal does not cut a participant off from the network.

Micropayments — search, message delivery and first-contact rates — never go on-chain one by one: a node signs one voucher per payee that
carries the running total, and the payee redeems the latest one once per period (document 17, section 17.8; changelog entry 52), so the
stamp per operation is close to zero.

**Stamp price measured — 14 October 2026, 23:54 UTC.** A simple USDC transfer: Arbitrum One — median **$0.0028** (21 transfers, from
$0.0020 to $0.0032, gas 0.020 gwei); Base — median **$0.00065** (15 transfers, from $0.00055 to $0.0020, gas 0.006 gwei); ETH at $2,416.
Sources: the official public nodes [arb1.arbitrum.io/rpc](https://arb1.arbitrum.io/rpc) and [mainnet.base.org](https://mainnet.base.org),
the price from [Coinbase](https://api.coinbase.com/v2/prices/ETH-USD/spot). This is a one-minute snapshot: the price changes with network load
and the ether rate. Locking into escrow and accepting work are heavier than a simple transfer — a measurement of the deployed contracts
will show their price. Conclusion: a stamp is a fraction of a cent; a $0.001 message redeemed on its own would lose most of its price to the stamp, so a voucher
carries a running total and is redeemed once per period (changelog entry 52).
