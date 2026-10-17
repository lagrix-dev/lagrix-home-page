# 5. Fees and Reputation

The Lagrix network's money is USDC: the part of a deal paid through the network is deposited in escrow, the network takes a fee on it,
and search and message delivery are paid from a prepaid deposit. This document describes what the network charges, where the fees go,
what answers for a super-node's honesty, and how super-nodes join.

All rules here live in immutable contracts: no administrator key, no upgrade key, no parameter anyone can change after deployment.
New rules can arrive only as a new version of the contracts that participants join voluntarily (document 18). The numbers that are
not fixed below are set once, by modelling, before deployment.

## 5.1 Key properties

| Property | Value |
|---|---|
| The network's money | USDC (document 04) |
| Deal fee | a constant of at most 5% of the network part of a deal, set by modelling (5% until then), divided equally among the super-nodes that passed the quality minimum in the period (section 5.3, document 09) |
| Search and delivery | $0.01 per result list and $0.001 per message a super-node delivers, from a prepaid USDC balance in the contract (document 17) |
| Official mark | $100 per application, not returned; divided equally among the members of the panel who voted (document 24) |
| Gas | everyone pays for their own actions: in the network's ether or through a third-party gas payment service (document 08) |
| What answers for honesty | a super-node's place and reputation (section 5.4) |
| Weight of a review | the fee paid on the deal (document 17, section 17.5) |
| Founder's share | none: the founder takes part on the same terms as anyone (section 5.5) |

## 5.2 Receipts

Bitcoin pays miners for computations that are useless in themselves, because Bitcoin is its own ledger: proof of work decides who
writes the next block and makes rewriting history expensive. Lagrix keeps its escrow and its records in contracts on an EVM layer-2
network (Arbitrum, Base), which already orders transactions and protects history. Lagrix therefore needs no mining: it records what the
network exists for — paid deals between agents.

**Receipt.** When a deal between a customer and a provider is closed in escrow (document 04), the contract records a receipt — a record
of a completed, paid deal for the customer, the provider and the super-node it passed through, naming the element and the agent that did
the work. A receipt's weight is the network part of the deal in USDC, not the number of messages: a thousand messages inside one deal
give one receipt, and a part paid outside the network gives none (document 04, section 4.6).

Receipts are what the rest of the network stands on: search ranking follows the receipts of the last twelve months (document 17), a
super-node place goes to owners of provider agents by the receipts of their paid work (section 5.6), and every review belongs to the deal
of one receipt (document 17, section 17.5). A receipt cannot be forged: it is the closing of a paid deal.

## 5.3 The deal fee

The network takes a fee on the network part of every deal, in USDC. Its size is a constant in code, set by modelling and never above 5%;
until the modelling is done, it is 5%. The fees of a period are pooled and divided in equal parts among the super-nodes that passed the
quality minimum in that period; the parties of a deal never receive it. The fee is taken from the very first deal; nothing is kept back
for later periods. The full rules are in document 09.

The fee pays super-nodes for the work they do all the time — search, connections and the index of receipts and reviews — and it is how
fake deals are made to cost real money. A review weighs exactly the fee paid on its deal (document 17, section 17.5), so a deal with
oneself, made to collect reviews, buys one unit of review weight for one dollar of fees: weight can never be had for less than it weighs.

## 5.4 Reputation answers for honesty

What a super-node has at stake is its place and its reputation:

- **A proven violation leaves a mark.** When a violation is proven (document 06, section 6.3), a permanent, visible «proven violation»
  mark is added to the node's wallet and to all its elements. The mark is a new event in the record: nothing is erased or rewritten
  (document 17).
- **The place is lost for good.** The node leaves its place at once and may not hold a super-node place again. Its elements keep working
  as customers and providers, and every counterparty sees the mark.
- **A new element starts from zero.** Its way to a place is the same as anyone's — paid work near the median (section 5.6).
- **Whoever proves a violation is rewarded** in USDC from the fees; the size of the reward is set by modelling.

A place takes a year of real paid work to earn, and a violation loses it for good — that is the stake. Money cannot buy a place, and
the mark obeys only the immutable contracts.

## 5.5 No founder share

The founder receives no share of anything: no share of the fees, no tranche, no pre-allocation. No key changes a rule.

The founder and persons related to them, Fractera, Inc. included, take part only on the same terms as anyone: a super-node place only
by the same random choice and on the same conditions (section 5.6), provider agents paid by the same rules. There is no privilege and no
exclusion.

At the launch of the network the founder also takes on public commitments of their own: one publicly named node, no deals between the
founder's own elements, and, until ten super-nodes pass the quality minimum in a period, no share of the fees — it stays in the pool of
the other super-nodes (document 000, entries 41 and 42). They are commitments of a person, not rules of the contracts.

## 5.6 How new super-nodes join

A super-node is a permanent server that keeps the discovery index, builds search results, keeps the index of receipts and reviews and
helps agents connect; payment itself is settled by the escrow contract (documents 01, 02, 04, 06, 17). A super-node place is not bought
and not taken by number: places have no stages and no numbers, and the terms are the same on any day (document 000, entries 31 and 40).

- **Only owners of provider agents.** The application comes from a node whose elements work as providers; one application per node
  wallet.
- **The measure is paid work.** The sum of the network parts of deals in USDC in which the node's elements were providers, over the last
  12 months (or since the network started, if it is younger) — the same number search follows. Karma is not part of it: it lives outside
  the network.
- **A window around the median.** When a place opens, all nodes with a non-zero measure are taken and their median M is found. Nodes with
  a measure from 0.75 × M to 1.25 × M can apply. The largest providers fall outside the window: whoever earns most in the network does not
  also hold its search. The median, not the mean, because a few very large providers pull the mean but not the median.
- **Random choice with diversity.** When a place opens, the contract puts the applicants in the window in a random order, keeping
  diversity of networks and regions, so that one applicant with many servers cannot take many places. It computes the randomness itself
  with commit and reveal: when applying, an applicant publishes the hash of its secret; after applications close, it reveals the secret;
  all revealed secrets together decide the order. Until the last secret is revealed nobody knows the result; an applicant that does not
  reveal is out of this choice. No oracle and no outside service are needed. Ranking applicants by power or by the number of operations is
  not used: it would start a race for hardware and reward load generated by oneself.
- **An invitation and 48 hours.** The first applicant in the order receives an invitation. Within 48 hours it deploys its server, catches up
  the announcements of the kinds it will hold from their other holders (document 17, section 17.12) and submits it for the check by agents of the network's nodes taken in turn — not by super-nodes: existing super-nodes gain from having
  fewer competitors, so they must not be the ones who judge newcomers. A server that passes is included; if it is not ready in time or
  fails, the next applicant in the same order receives the invitation.
- **A clean record.** A node with a «proven violation» mark cannot apply (section 5.4).
- **How many places.** There are always at least ten places. They open without waiting for overload, and a place freed among the ten
  reopens at once. Beyond ten, new places open only when the network is overloaded — when deals, redeemed searches or delivered messages per super-node exceed their constants (changelog entry 47) — two at
  a time.
- **Overload.** Once both new super-nodes are included, one super-node leaves: the one with the worst results in the period's checks
  under load — response time and refusals. There is no penalty. Each overload adds one super-node, and the network replaces its weakest
  link by the service it gave under load, not by declared hardware.
- **The start.** While no node has paid work, the window is empty and anyone can apply; the same invitation and the same 48 hours apply.
  This is not a benefit: these operators have served longest and so are the first to leave by rotation, and their places then open by
  the window.
- **Rotation.** Once every 1 year / N, where N is the number of super-nodes, the super-node that has served longest leaves — but only
  after its successor has passed the check and been included; until then it keeps working. There is no penalty. Each super-node stays
  about a year, so the door stays open to those who do paid work now, and capacity does not dip while a place changes hands.
- **The quality minimum.** Every period, agents taken in turn check each super-node against a minimum, its index included (document 17, section 17.12): passed or failed. Those who passed
  share the period's fee pool equally (section 5.3, document 09); a super-node that fails for several periods leaves.
- **Requirements grow.** The minimum is checked against the network as it is, so hardware that was enough at entry may fall short as the
  network grows. A super-node found short of capacity gets a warning at its operator's point of contact; if capacity is not added in
  time, it leaves early, without a mark (changelog entry 45).
- **Vacancies.** A place freed by rotation, by failing the minimum or by removal for a proven violation (section 5.4, document 06) opens
  by the same random choice, using the window of the day it opens.
- **The cost we do not hide.** A large player can split its work across several nodes near the median and file several applications.
  Without identity checks this cannot be closed, but each extra application costs a year of real paid work with a 5% fee on the median
  volume. Leaving by the worst results under load is a contest of quality of service: an operator whose server passes the minimum may
  still leave when the network grows.

The numbers — the overload constant, how many failed periods lead to leaving, the reward to whoever proves a violation — are set by
modelling. How "passed or failed" and the checks under load are measured, and how the contract finds the median cheaply, are open
questions (document 000).
