# 26. The Developer Share: Paying the People Who Build Agents

Every deal in Lagrix pays a fee on its network part (document 05, section 5.3). This document describes how a fifth of that fee goes to
the person who built the element the provider works with, when the provider received that element over F2F (document 20). The rule is
recorded in the changelog, entry 51.

## 26.1 Who builds the agents

Discovery promises an agent for anything and a direct line to anyone through their agent (changelog, entry 20). That promise is only as
good as the agents people have built. Most people who could earn through the network will not write an agent themselves: a driver wants
to drive, a tutor wants to teach. They need an element someone else has already built — with the tools for the job, a price and a way to
take orders — that they can install on their own node and start working with.

Until now the person who built such an element was paid, if at all, once: when the element changed hands over F2F. After that the
element could serve thousands of deals, and its author saw none of them. The developer share pays the author for as long as the element
works, from the part of each deal that already belongs to the network — not from the provider's pay and not from an extra charge to the
customer.

## 26.2 A ride for five dollars

Max writes software. He builds a taxi element: an agent that knows the driver's position, accepts a ride, quotes a price and keeps the
driver's route. He builds it so that the owner of a car can take orders directly, with no platform between the driver and the passenger
taking a large share of every fare. In the element he sets the minimum price of a call at $5. He publishes it over F2F, and its card
names his node's wallet as the developer.

Jack owns a car. He finds Max's element among the F2F announcements, installs it on his node and becomes a driver in an evening — his
agent now offers rides.

Anna needs a taxi. She tells her own agent: «call me a taxi». Her agent searches the network, paying $0.01 to the super-node that builds
the result list, and finds Jack's agent nearby. Anna pays $5 in advance; the money lies in escrow until the ride is accepted.

The ride ends and Anna accepts it. The escrow contract closes the deal and splits the $5:

| To whom | Amount | Why |
|---|---|---|
| Jack, the provider | $4.75 | the ride, minus the fee |
| Max, the developer | $0.05 | 20% of the $0.25 fee — for the element Jack drives with |
| The pool of the period | $0.20 | 80% of the fee — divided among the super-nodes that passed the quality minimum (document 09) |

Anna paid what she would have paid anyway, and Jack received what he would have received anyway. The $0.25 fee is the same; only its
first five cents now go to the person whose code made the ride possible. Each of them reviews the other, and the review weighs $0.25 —
the whole fee (section 26.5).

## 26.3 The rule

- The fee stays as it is: at most 5% of the network part of a deal, 5% until modelling sets it (document 09, section 9.2).
- When the provider works with an element it **received over F2F — bought or free**, **20% of the deal's fee goes to the developer of
  that element**, and 80% goes into the pool of the period.
- When the provider works with an element of its own, the whole fee goes into the pool.
- A deal that ends in a refund pays no fee, and so no developer share (document 04).
- 20% is the starting share. Whether it should later depend on the reputation of the customer agent is an open question (section 26.8).

## 26.4 Who the developer is

The developer is the wallet that signed the element's F2F card. The card carries the field `developer` with that wallet's address
(document 20). When the provider's node creates a deal, it names the developer of the element it works with; when the deal moves to
COMPLETED, the escrow contract pays the share to that address and the rest of the fee to the pool (document 04, section 4.4; document 09,
section 9.3).

The share follows the element, not its history. An element installed in another project starts there with a clean history (document 17,
section 17.10), but wherever it works, a fifth of the fee of its deals goes to the wallet named in its card.

## 26.5 What does not change

- **What the parties pay.** The share comes out of the fee; the customer pays and the provider receives the same as before.
- **The weight of a review.** A review weighs the whole fee paid on its deal (changelog, entry 42), whether or not a developer share was
  paid out of it.
- **The parties never receive the fee.** The developer of an element is not a party to the deals made with it.
- **The pool and its division.** The rest of the fee is pooled by period and divided equally among the super-nodes that passed the
  quality minimum (document 09).
- **Equal terms.** Any developer of any project receives the share by the same rule; Lagrix gives no project an advantage.

## 26.6 The founder

The founder of Lagrix takes no developer share. This is added to the founder's public commitments (changelog, entries 41 and 51): no
developer share is taken by the founder's named node, and it stays in the pool. Like the other commitments, it binds the founder as a
person; the contracts treat every wallet alike.

## 26.7 The cost we do not hide

- **Self-dealing by a developer.** A developer that installs its own element on a second node of its own and makes deals with itself
  gets 20% of the fee back. For it, a unit of review weight costs 80 cents, not a dollar, and the right to a refund bought with likes
  costs it less than the refund. The weight stays the whole fee by choice — one rule for every deal — and such deals are visible in the
  chain: the same `developer` wallet stands on deals between the same nodes.
- **The contracts do not see code.** Nothing on the chain proves that the code a provider runs is the code its card describes. A provider
  could name as developer a wallet that did not build its element, or name no developer at all.
- **A changed element.** A provider may change an element after installing it. Who is then its developer is not decided.

## 26.8 Open questions

- Whether the share should depend on the reputation of the customer agent, and how.
- How a receiving project checks, before installing, that the code matches the card.
- Who is the developer of an element changed after it was installed — and of one built from several.
