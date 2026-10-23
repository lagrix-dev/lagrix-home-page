# 7. Smart Contract Testing and Audit: Foundry, Slither and Fuzzing

Lagrix smart contracts handle real money (USDC). A bug in a contract is dangerous: the contracts are immutable, with no
administrator or upgrade key (document 18), so a deployed contract cannot be fixed at all — a bug is closed only by a new version that
participants move to. Every contract therefore passes three layers of checks before deployment: Foundry tests, invariant fuzzing and
Slither static analysis.

| Contract | What it does | Document |
|---|---|---|
| A2AEscrow.sol | deals, receipts, Time-Lock with the delivery deadline and dispute window of each deal, cancellation, fee deduction, the `Receipt` event | 04, 27 |
| FeeDistributor.sol | the fee pool of each period and its equal division among the super-nodes that passed the quality minimum | 09 |
| SearchVouchers.sol | prepaid balances with a withdrawal delay; one voucher per payee carrying a running total for searches, delivered messages and first-contact rates, redeemed once per period | 17, 23 |
| SuperNodeRegistry.sol | places, removal, «proven violation» marks, false reports | 05, 06 |
| FeedbackRegistry.sol | reviews of both sides bound to completed deals and to cancelled orders with a fee, weighted by the fee paid on the deal, per element and role; every indicator a count and a sum, unreviewed deals, negative ratings (dislikes given against the reviewable weight), likes deducted by cancellations; the address of a review page, attached once by the review's author | 17, 25 |
| OfficialMarks.sol | the Official marks: applications with the $100 fee, panels of nine chosen at random with commit and reveal, votes, challenges and the founder's mark written at deployment | 24 |

## 7.1 Unit and integration tests (Foundry)

Foundry tests are written in Solidity itself and run at the speed of compiled code. Key scenarios:

- `test_A2AEscrow_StateTransitions()` — LOCKED → COMMITTED → COMPLETED transitions and rejection of invalid calls (for example,
  `claimTimeout()` before the dispute window expires).
- `test_Deadlines_Limits()` — a lock whose delivery deadline is not in the future or lies more than 90 days ahead, or whose dispute
  window is longer than 14 days, is rejected.
- `test_Deadline_LateDeliveryRejected()` — `commitResult()` after `deliverBy` is rejected.
- `test_ClaimRefund_AfterDeadline()` — `claimRefund()` returns the whole amount and moves the deal to REFUNDED only after `deliverBy`
  and only with no delivery; it takes no fee and writes no receipt; before the deadline or after a delivery it is rejected.
- `test_DeclineTask()` — the provider declines before delivery and the whole amount returns with no fee; after delivery a decline is
  rejected.
- `test_DisputeWindow_PerDeal()` — two deals with different dispute windows close each on its own timer.
- `test_EIP712_SignatureReplay()` — a signature cannot be reused with another `taskId` or nonce.
- `test_FeeSplit_95_5()` — on closing, the fee is exactly the constant rate of the network part (5% until modelling sets it, never above 5%) and the provider gets the rest; a refund takes no fee.
- `test_DeveloperShare()` — with a `developer` named for a deal on an element received over F2F, 20% of the fee goes to that wallet and 80% to the pool of the period; with no `developer`, the whole fee goes to the pool; a refund pays neither.
- `test_FeePool_EqualShares()` — the fees of a period go into its pool and are divided equally among the super-nodes that passed the quality minimum; the parties of a deal and super-nodes that failed the minimum receive nothing; nothing carries over to the next period.
- `test_Voucher_RunningTotal()` — a voucher pays only the difference between its total and the total already redeemed for that payer and payee; a voucher whose total did not grow pays nothing; a voucher not signed by the payer is rejected; a withdrawal waits the delay, and a voucher signed before it is still paid.
- `test_Review_Weight()` — a review needs a completed deal or a cancelled order with a fee, one per side, and weighs the fee paid on it; a second review of the same deal by the same side is rejected.
- `test_Reputation_CountAndSum()` — every indicator updates its count and its sum together; a review, a like or a dislike, removes the deal from «unreviewed».
- `test_Reputation_AllOrders()` — every paid order adds to «all orders» of both sides, completed or cancelled; a proven-violation mark on the node's wallet shows on every element of the node.
- `test_Reputation_NegativeRatings()` — a dislike adds its weight to the reviewer's «dislikes given»; every completed deal and every cancelled order with a fee adds its fee to the reviewable weight of both sides; negative ratings, read as dislikes given ÷ reviewable weight, stay between 0% and 100%.
- `test_ReviewPage_Once()` — only the side that gave a review attaches a page to it, once; a second page on the same review and a page on a deal the sender has not reviewed are rejected; the like or dislike, its weight and every indicator stay unchanged; an address longer than the limit is rejected.
- `test_Cancel_RefundByLikes()` — a cancellation within the dispute window refunds `min(likeWeight, amount)`, deducts the same weight from the customer's likes as a new event, sends the rest to the provider less the fee on it, records a cancelled order for both and writes no receipt; a customer without likes gets nothing back; a refund of the whole amount takes no fee and opens no review.
- `test_NoAdminFunctions()` — no function changes a rate, a price or a threshold after deployment.
- `test_Downtime_NoMark()` — an unavailable node is not penalised and after 30 days is removed without a mark.
- `test_ProvenViolation_MarkAndReward()` — a valid proof adds a permanent mark to the node's wallet, removes it from its place, blocks any new place and pays the reporter's reward in USDC; a false proof loses the reporter's locked amount.

```solidity
// Example: Time-Lock in A2AEscrow.t.sol — the dispute window belongs to the deal (changelog, entry 53)
function test_CannotClaimTimeoutBeforeDisputeWindow() public {
    vm.prank(customer);
    // lock 100 USDC (6 decimals) for a deferred deal: deliver within a day, a dispute window of 24 hours
    escrow.lockFunds(taskId, provider, superNode, 100 * 10**6, uint40(block.timestamp + 1 days), 24 hours);

    vm.prank(provider);
    escrow.commitResult(taskId, resultHash, address(0)); // no developer: the provider's own element (document 26)

    // try to collect 2 hours after delivery, before the deal's 24-hour window expires
    vm.warp(block.timestamp + 2 hours);

    vm.prank(provider);
    vm.expectRevert(A2AEscrow.DisputeWindowNotExpired.selector);
    escrow.claimTimeout(taskId);
}
```

## 7.2 Fuzzing and invariants

Unit tests check the scenarios the developer thought of. Fuzzing feeds millions of random inputs — edge values, zero addresses, huge
amounts — and checks invariants that must hold for any sequence of calls:

1. **Escrow solvency.** The escrow contract's USDC balance is never below the sum of all locked deals.
2. **Fee solvency.** FeeDistributor's USDC balance is never below the unclaimed part of the period pools.
3. **No founder share.** No address receives fees except super-nodes that passed the quality minimum, the developers named on deals
   (document 26) and the rewards for proven violations.
4. **Marks are permanent.** Once set, a «proven violation» mark is never cleared, and a marked wallet never holds a place.
5. **Likes never go below zero.** A refund never exceeds the weight of likes that remains.
6. **Negative ratings stay in bounds.** The weight of dislikes an element has given in a role never exceeds the reviewable weight of its
   orders in that role.
7. **Every deal can end.** A deal past its delivery deadline with no delivery can always be refunded by the customer, and a delivered
   deal past its dispute window can always be closed by the provider: within 104 days of the lock, every deal has a call that ends it.

```solidity
function invariant_EscrowSolvency() public view {
    assertGe(usdc.balanceOf(address(escrow)), escrow.totalLockedFunds(), "Escrow is insolvent");
}

function invariant_MarkedNeverActive() public view {
    for (uint256 i; i < handler.markedCount(); i++) {
        address wallet = handler.marked(i);
        assertTrue(registry.provenViolation(wallet), "Mark was cleared");
        assertFalse(registry.isActiveSuperNode(wallet), "Marked wallet holds a place");
    }
}
```

## 7.3 Static analysis (Slither)

Slither translates the code into an intermediate representation and looks for common vulnerabilities:

- **Reentrancy:** protection — the checks → effects → interactions order and OpenZeppelin's `ReentrancyGuard`.
- **Authorization via `tx.origin`:** forbidden; Slither warns about any use of it.
- **Unchecked low-level calls:** USDC transfers only through `SafeERC20`.
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
