# 7. Smart Contract Testing and Audit: Foundry, Slither and Fuzzing

Lagrix smart contracts handle real money (USDC) and $LGX coins. A bug in a contract is dangerous: the contracts are immutable, with no
administrator or upgrade key (document 18), so a deployed contract cannot be fixed at all — a bug is closed only by a new version that
participants move to. Every contract therefore passes three layers of checks before deployment: Foundry tests, invariant fuzzing and
Slither static analysis.

| Contract | What it does | Document |
|---|---|---|
| A2AEscrow.sol | deals, receipts, Time-Lock, fee deduction, the `Receipt` event | 04 |
| FeeDistributor.sol | the fee pool of each period and its equal division among the super-nodes that passed the quality minimum | 09 |
| PeriodIssuance.sol | the warm-up threshold, issuance by period on the schedule, the reward split by receipts | 05 |
| SearchVouchers.sol | prepaid balances and batch redemption of search vouchers at the fixed price | 17 |
| LagrixToken.sol | the coin, the supply cap, the six-month rule, the period reward split | 05 |
| SuperNodeDeposits.sol | deposits, removal, penalties, false reports | 06 |
| FeedbackRegistry.sol | reviews of both sides bound to closed deals, weighted by the network part divided by 10, per element and role | 17 |

## 7.1 Unit and integration tests (Foundry)

Foundry tests are written in Solidity itself and run at the speed of compiled code. Key scenarios:

- `test_A2AEscrow_StateTransitions()` — LOCKED → COMMITTED → COMPLETED transitions and rejection of invalid calls (for example,
  `claimTimeout()` before the dispute window expires).
- `test_EIP712_SignatureReplay()` — a signature cannot be reused with another `taskId` or nonce.
- `test_FeeSplit_95_5()` — on closing, the fee is exactly the constant rate of the network part (5% until modelling sets it, never above 5%) and the provider gets the rest; a refund takes no fee.
- `test_FeePool_EqualShares()` — the fees of a period go into its pool and are divided equally among the super-nodes that passed the quality minimum; the parties of a deal and super-nodes that failed the minimum receive nothing; nothing carries over to the next period.
- `test_WarmUp_NoIssuanceBeforeThreshold()` — no reward is issued before the paid-volume threshold and the minimum number of super-nodes; warm-up receipts earn nothing afterwards.
- `test_SearchVoucher_ExactPrice()` — a voucher for any amount other than the fixed price is rejected, and a used nonce cannot be redeemed again.
- `test_Review_Weight()` — a review needs a completed deal, one per side, and weighs the network part divided by 10; a second review of the same deal by the same side is rejected.
- `test_SixMonthRule()` — a coin transfer earlier than 180 days after joining is rejected; after that it passes.
- `test_PeriodReward_Split()` — 50% to super-nodes and 30% to provider agents by receipt weight, 20% equally to super-nodes that passed the quality minimum, accurate to 1 wei.
- `test_NoAdminFunctions()` — no function changes a rate, a price, a threshold or the schedule after deployment.
- `test_Downtime_NoSlash()` — an unavailable node is not penalised and after 30 days is removed with its deposit returned.
- `test_Slashing_HalfToReporter_HalfRemoved()` — half of a penalty to the reporter, half removed from circulation.

```solidity
// Example: Time-Lock in A2AEscrow.t.sol
function test_CannotClaimTimeoutBeforeDisputePeriod() public {
    vm.prank(customer);
    escrow.lockFunds(taskId, provider, superNode, 100 * 10**6); // lock 100 USDC (6 decimals)

    vm.prank(provider);
    escrow.commitResult(taskId, resultHash);

    // try to collect after 2 minutes, before the 5-minute window expires
    vm.warp(block.timestamp + 2 minutes);

    vm.prank(provider);
    vm.expectRevert(A2AEscrow.DisputePeriodNotExpired.selector);
    escrow.claimTimeout(taskId);
}
```

## 7.2 Fuzzing and invariants

Unit tests check the scenarios the developer thought of. Fuzzing feeds millions of random inputs — edge values, zero addresses, huge
amounts — and checks invariants that must hold for any sequence of calls:

1. **Escrow solvency.** The escrow contract's USDC balance is never below the sum of all locked deals.
2. **Fee solvency.** FeeDistributor's USDC balance is never below the unclaimed part of the period pools.
3. **Supply cap.** No more than 1,000,000,000 LGX are ever created.
4. **No founder share.** No address receives new coins except through receipts and the quality minimum.
5. **Deposit accounting.** The sum of all super-nodes' deposits equals the total recorded in the staking contract.

```solidity
function invariant_EscrowSolvency() public view {
    assertGe(usdc.balanceOf(address(escrow)), escrow.totalLockedFunds(), "Escrow is insolvent");
}

function invariant_SupplyCap() public view {
    assertLe(token.totalMinted(), 1_000_000_000 * 10**18, "Supply cap exceeded");
}
```

## 7.3 Static analysis (Slither)

Slither translates the code into an intermediate representation and looks for common vulnerabilities:

- **Reentrancy:** protection — the checks → effects → interactions order and OpenZeppelin's `ReentrancyGuard`.
- **Authorization via `tx.origin`:** forbidden; Slither warns about any use of it.
- **Unchecked low-level calls:** token transfers only through `SafeERC20`.
- **Overflows:** built-in checks of Solidity 0.8+ and strict types (`uint96`, `uint40`) for packed fields.

## 7.4 The check pipeline

Every change to the main branch of the open repository goes through the same chain:

```
[ push / pull request ]
       │
       ├──> 1. forge fmt --check               (formatting)
       ├──> 2. slither . --fail-on high|medium  (static analysis)
       ├──> 3. forge test --gas-report          (tests and gas usage)
       └──> 4. forge test --fuzz-runs 10000     (invariant fuzzing)
```

If even one of 10,000 random calls breaks an invariant, the change is not accepted.
