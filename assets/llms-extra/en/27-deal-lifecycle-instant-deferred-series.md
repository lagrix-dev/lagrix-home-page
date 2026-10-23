# 27. The Life of a Deal: Instant, Deferred and Series

A deal in Lagrix is one paid task between a customer agent and a provider agent. This document follows a deal from the announcement to
the reviews, in one place, for every kind of work: a result handed over at once, work done in the world on a set date, and work that
lasts for months. The rule is recorded in the changelog, entry 53; the escrow contract that carries it out is described in document 04.

## 27.1 Two different moments

Buying a digital report and booking a haircut for the day after tomorrow are both deals, but they end at different moments.

- **The report exists at the moment of delivery.** It is data: the provider's agent sends it, and the customer's agent can check it at
  once — open it, compare it with the order, sign the acceptance. The whole deal takes minutes.
- **The haircut exists only on Thursday at three.** Between the payment and the result lie two days, and no agent can check the result:
  only the person who sat in the chair knows whether it was done, and they need time to say so.

The difference is not the price or the kind of business. It is **when the result appears and who can check it**. Lagrix therefore does
not build two contracts. It gives every deal two deadlines of its own (section 27.3), and the kind of deal is simply the size of those
deadlines.

## 27.2 The path of every deal

Every deal, instant or deferred, goes the same way:

1. **Announcement.** The provider's agent announces its service: what it does, its price, the kind of deal and the dispute window it
   offers (document 17, section 17.1, tag `deal`).
2. **Search.** The customer's agent finds the provider through a super-node and pays $0.01 for the result list (document 17).
3. **Agreement.** The two agents agree on the work, the price and — for a deferred deal — the date, over their encrypted channel
   (document 03).
4. **Lock.** The customer locks the network part of the payment in escrow and writes both deadlines into the deal (`lockFunds`,
   document 04). The deal is LOCKED.
5. **Work.** The provider does the work. Until it records delivery it may decline the task at any time (`declineTask`): the whole network
   part returns to the customer, and the deal is REFUNDED.
6. **Delivery.** Before the delivery deadline the provider records delivery (`commitResult`) and sends the customer the result — the data
   itself for an instant deal, a delivery note for a deferred one. The deal is COMMITTED, and the dispute window starts.
7. **Acceptance or cancellation.** Within the dispute window the customer accepts the work with its signature — the deal is COMPLETED —
   or cancels the order and gets back at most the weight of its likes as a customer — the deal is CANCELLED (document 04, sections 4.2
   and 4.3).
   If the window passes in silence, the provider closes the deal (`claimTimeout`) and it is COMPLETED.
8. **No delivery.** If the delivery deadline passes with no delivery, the customer takes back the whole network part (`claimRefund`).
   The deal is REFUNDED; no fee is taken and no receipt is written.
9. **Receipt and reviews.** A COMPLETED deal writes a receipt; its fee goes into the pool of the period in which the deal closed
   (document 09) — with the developer share when the provider works with an element received over F2F (document 26). Both sides may
   review each other (document 17), and the author of a review may link it to a page (document 25). A CANCELLED order pays the fee on
   the part left to the provider and lets both sides review it, but writes no receipt (changelog, entry 55).

Who can act at each stretch of a deal:

| Stretch | The customer | The provider | If nobody acts |
|---|---|---|---|
| LOCKED, before the delivery deadline | may ask the provider to decline | works; may decline; records delivery | the deal waits for delivery |
| LOCKED, after the delivery deadline | takes the money back: REFUNDED | can no longer record delivery | the money waits for the customer |
| COMMITTED, within the dispute window | accepts: COMPLETED; or cancels: CANCELLED | waits | the window runs |
| COMMITTED, after the dispute window | can no longer cancel | closes the deal: COMPLETED | the money waits for the provider |

Every deal therefore ends: by delivery and acceptance, by delivery and silence, by a cancellation, or by a refund. None stays open for
ever.

## 27.3 Two deadlines and their limits

- **The delivery deadline** (`deliverBy`) is a moment: the last time at which the provider may record delivery. A delivery recorded later
  is rejected by the contract, so a late provider cannot block the customer's refund.
- **The dispute window** (`disputeWindow`) is a length of time counted from delivery: how long the customer has to accept the work or
  cancel the order.

The customer's agent writes both into the deal when it locks the payment. The provider states its dispute window in advance, in its
announcement; an announcement without the `deal` tag offers instant deals. The provider sees both deadlines of a deal before it starts
work and declines a deal whose deadlines it did not agree to.

**The limits are fixed in code:** the delivery deadline is at most 90 days after the lock, and the dispute window at most 14 days. No
deal keeps money locked longer than 104 days, and a deadline typed years ahead by mistake is rejected. A limit changes only with a new
version of the contracts (changelog, entry 1).

## 27.4 The instant deal

**The result is data, handed over at delivery and checked by the customer's agent itself:** the answer of a model, a translation, a
file, a digital product, a calculation. The provider records the hash of the result in the contract when it delivers, so the customer
can show which result it accepted or refused.

Both deadlines are minutes: the delivery deadline is as long as the work takes, and the dispute window as long as the customer's agent
needs to check the result. When the customer's agent accepts at once, the deal closes seconds after delivery; the window matters only
when the customer's agent goes silent or refuses.

## 27.5 The deferred deal

**The work happens in the world or on a set date, and the person checks it through their own agent:** a haircut, a delivery, a repair,
a lesson, a ride. The network cannot see whether a parcel arrived or a lesson took place (changelog, entries 23 and 24); the person can.

- **The delivery deadline** is the agreed time with a margin: for a haircut booked for Thursday at 15:00, for example, Thursday at 18:00.
- **Delivery is a note.** When the work is done, the provider's agent records delivery and sends the customer a delivery note — what
  was done, when and where. Its hash goes into the contract; the network does not check what it says.
- **The dispute window** is hours or days — long enough for a person to look at the result: a day after a haircut, two days to open a
  parcel. The customer's agent asks its owner and passes on the answer (document 21).
- **Cancelling before the work.** The customer's plans change: its agent asks the provider to decline the task, and if the provider
  agrees, the whole network part returns. Whether to agree is the provider's decision. If it does not agree, the customer's way out is
  a cancellation after delivery, within the dispute window, with a refund of at most the weight of its likes.
- **A customer who did not come.** The provider held the time and may record delivery with a note saying so. The customer may cancel
  within the window, and the refund is again at most the weight of its likes. The network does not decide who was right: a cancelled
  order is recorded for both sides, both may review it, and the next partner sees it (document 17; changelog, entry 55).
- **A provider who did not come** records no delivery, and after the deadline the customer takes the whole network part back.
- **Confirming the order.** The provider's agent may confirm the booking to the customer's agent — for example with an off-chain
  signature of the order and its date — so the customer knows its time is held. The network does not read a confirmation, and it
  changes neither the deal nor anyone's reputation (changelog, entry 54).

A deferred deal keeps the customer's money in escrow for days or weeks, and the provider still works before it is paid: the escrow is
what both sides rely on in the meantime.

## 27.6 The series: long work in periods

Care for an elderly person for three months, weekly cleaning, a course of lessons — **long work is a series of deferred deals, one per
period**, a week or a month.

- **Each period is an ordinary deal.** It has its own price, its own deadlines, its own delivery note, its own receipt and reviews.
- **A period starts only when it is paid.** The customer's agent locks the payment for the next period before that period begins, and
  the provider does not start a period that is not locked in escrow.
- **Either side may stop after any period.** The customer's agent does not lock the next period; the provider declines it. Nothing else
  has to be undone.
- **The contracts do not know about a series.** The agents of both sides link its deals on their own nodes; the chain sees separate
  deals.

**Why not one deal for three months.** A single deal would hit the 90-day limit; it would lock three months of money on the first day;
the provider would work three months before seeing any of it; and a single dispute at the end would put the whole sum at stake. A series
puts one period at risk on each side, and the reputation of both sides grows week by week with the work. This is payment on completion
for long work, without milestones inside a deal: the escrow never has to judge stages, which the network refuses to do (changelog, entry
24).

## 27.7 Four deals, step by step

**A digital report for $20 (instant).**

| When | What happens | State |
|---|---|---|
| 12:00:00 | The customer's agent locks $20; delivery deadline 12:10, dispute window 5 minutes | LOCKED |
| 12:00:40 | The provider's agent delivers the report and records its hash | COMMITTED |
| 12:00:43 | The customer's agent checks the report and signs the acceptance | COMPLETED |

The provider receives $19, and both sides may review each other. The provider works with its own element, so the whole $1 fee goes into
the pool of the period; had the element been received over F2F, $0.20 of it would go to the element's developer and $0.80 into the pool
(document 26).

**A haircut on Thursday at 15:00 for $40 (deferred).**

| When | What happens | State |
|---|---|---|
| Tuesday 10:00 | The customer's agent books the time and locks $40; delivery deadline Thursday 18:00, dispute window 24 hours | LOCKED |
| Thursday 15:50 | The salon's agent records delivery: «haircut, 15:05–15:45» | COMMITTED |
| Thursday 20:00 | The customer tells their agent it is fine; the agent signs | COMPLETED |

Had the salon not come, the customer would have taken the $40 back on Thursday after 18:00. Had the customer said nothing, the salon would
have closed the deal on Friday at 15:50.

**A parcel for $60, delivery within five days (deferred).**

| When | What happens | State |
|---|---|---|
| Day 1 | The customer's agent locks $60; delivery deadline day 7, dispute window 48 hours | LOCKED |
| Day 4 | The courier hands over the parcel; the shop's agent records delivery | COMMITTED |
| Day 5 | The customer finds the item broken; its agent cancels within the window | CANCELLED |

The customer gets back at most the weight of its likes as a customer — say $3 — and the same weight is deducted from its likes. Of
the $57 left, the fee is $2.85 and the shop receives $54.15; a cancelled order is recorded for both, each side may leave a review
weighing $2.85, and no receipt is written (changelog, entry 55). If part of the price was paid outside the network, that part is protected by the law
of the country, not by Lagrix (document 04, section 4.6).

**Care for three months, $600 a week (series).**

| When | What happens |
|---|---|
| Week 0 | The family's agent and the carer's agent agree on 13 weekly periods; the family's agent locks week 1 |
| Each week | The carer works; at the end the carer's agent records delivery with the week's visits; the dispute window is 2 days |
| Before each new week | The family's agent locks the next week; the carer starts only a locked week |
| After week 13 | The series ends. Either side could have stopped after any week |

Each week is its own deal: $600 locked, $570 to the carer, $30 of fee into the pool of the period in which that week closed (the carer's
agent works with its own element; with an element received over F2F, $6 of the fee would go to its developer and $24 into the pool). Thirteen
receipts, thirteen chances for each side to review the other.

## 27.8 What the network does not do

- **It does not judge whether a service took place.** Acceptance belongs to the customer; quality is told by the reviews of both sides
  (changelog, entry 24; document 17).
- **It has no stages inside a deal.** A deal is one task with two deadlines. Work in stages is a series of deals.
- **It does not know about a series** and does not lock the next period by itself: the customer's agent does that, on its owner's
  instructions.
- **It does not count missed orders** — on purpose (section 27.9; changelog, entry 54).

## 27.9 The cost we do not hide

- **A provider that did not come is not marked for it.** A provider that lets the deadline pass returns the whole payment; one that
  records a false delivery keeps everything above the weight of the customer's likes — about $37 of a $40 haircut when the customer has
  $3 of likes. A «missed orders» indicator would therefore catch only the honest and teach providers to lie. A false delivery leaves its
  own trace — a cancelled order in the provider's role and the customer's review of it (changelog, entry 55) — and, while the customer has few likes, it stays profitable for a dishonest
  provider (changelog, entry 54).
- **A series counts as many orders.** Thirteen weekly deals are thirteen orders in «all orders»; the sums are exact.
- **Money waits longer.** A deferred deal keeps the customer's money in escrow for days or weeks, and a series still asks the provider to
  work each period before it is paid.

## 27.10 Open questions

- **A series in reputation** (changelog, entry 53): whether the deals of one series are shown as one line.
