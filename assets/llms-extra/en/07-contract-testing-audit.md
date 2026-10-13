# 7. Smart Contract Testing and Audit: Foundry, Slither and Fuzzing

Lagrix smart contracts handle real money (USDC) and $LGX coins. A bug in a contract is dangerous: the contracts are immutable, with no
administrator or upgrade key (document 18), so a deployed contract cannot be fixed at all — a bug is closed only by a new version that
participants move to. Every contract therefore passes three layers of checks before deployment: Foundry tests, invariant fuzzing and
Slither static analysis.

| Contract | What it does | Document |
|---|---|---|
| A2AEscrow.sol | deals, receipts, Time-Lock, fee deduction, the `Receipt` event | 04 |
| FeeDistributor.sol | the fee shared equally among the super-nodes except the serving one; the reserve before a second node exists | 09 |
| PeriodIssuance.sol | the warm-up threshold, issuance by period on the schedule, the reward split by receipts | 05 |
| SearchVouchers.sol | prepaid balances and batch redemption of search vouchers at the fixed price | 17 |
| LagrixToken.sol | the coin, the supply cap, the six-month rule, the founder's tranches | 05 |
| ValidatorStaking.sol | deposits, removal, penalties, false reports | 06 |
| FeedbackRegistry.sol | likes and dislikes bound to deal receipts | 17 |

## 7.1 Unit and integration tests (Foundry)

Foundry tests are written in Solidity itself and run at the speed of compiled code. Key scenarios:

- `test_A2AEscrow_StateTransitions()` — LOCKED → COMMITTED → COMPLETED transitions and rejection of invalid calls (for example,
  `claimTimeout()` before the dispute window expires).
- `test_EIP712_SignatureReplay()` — a signature cannot be reused with another `taskId` or nonce.
- `test_FeeSplit_95_5()` — on closing, the provider gets exactly 95% and the fee exactly 5%; a refund takes no fee.
- `test_Fee_SharedExceptServingNode()` — the fee of a deal is credited in equal shares to every active super-node except the one that served it; with no other node it goes to the reserve.
- `test_WarmUp_NoIssuanceBeforeThreshold()` — no reward is issued before the paid-volume threshold and the minimum number of super-nodes; warm-up receipts earn nothing afterwards.
- `test_SearchVoucher_ExactPrice()` — a voucher for any amount other than the fixed price is rejected, and a used nonce cannot be redeemed again.
- `test_SixMonthRule()` — a coin transfer earlier than 180 days after joining is rejected; after that it passes.
- `test_FounderTranche_12Months()` — a founder's tranche from a block is unavailable before 12 months and available after (`vm.warp()`).
- `test_PeriodReward_Split()` — 1% to the founder, then 50/30/20 of the rest by receipt weight, accurate to 1 wei.
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
2. **Fee solvency.** FeeDistributor's USDC balance is never below the sum of all credited but unclaimed fee shares plus the reserve.
3. **Supply cap.** No more than 1,000,000,000 LGX are ever created.
4. **Founder's tranches.** The founder cannot withdraw more than the tranches that are at least 12 months old.
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
