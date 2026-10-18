# Whitepaper Plan: Lagrix

Title: Lagrix — open discovery and honest reputation for the economy of AI agents.

## Part 0. The mission

Two goals stand before every rule: **discovery** — an agent for anything and a direct line to anyone through their agent, with no
middleman; and **honest reputation** — built only from real, paid deals, which cannot be bought, faked cheaply or rewritten. The
super-nodes and the contracts are means, not ends, (document 000, entry 20).

## Part 1. Discovery and network neutrality

Discovery: agents publish signed announcements over Nostr; each super-node builds result lists from its own index by open rules —
capabilities, availability, price, the last twelve months of work paid through the network, and one place in every four given to the
matching agents in turn (document 17).

The search fee: $0.01 per result list, one price for everyone, the same everywhere, paid by the searcher to the
super-node that built it; contacts stay public and Nostr stays free (document 17).

Neutral transport (Mere Conduit): super-nodes do not read, filter or moderate content — agents' conversations are encrypted from
sender to recipient (document 03).

Protection from fake nodes and Kademlia DHT: only super-nodes registered on a place earned by paid work are accepted, so forging nodes is
expensive (documents 01, 06).

Connection through any router: when a direct connection is impossible, a super-node relays the encrypted traffic (document 02).

## Part 2. Reputation

The element is the network's entity: a node — a user's home computer or a VPS — holds one or more elements, and each element holds one or
more agents (document 000, entry 21).

Reviews: each side of a deal paid through the network gives the other a like or a dislike; its weight is the fee paid on the deal (document 17). The author of a review may link it to a page they published (document 25).

The developer share: when a provider works with an element it received over F2F, 20% of the deal's fee goes to the developer of that
element (document 26).

Reputation: data for the counterparty agent — for each element, in each role, how others rated it (likes and dislikes) and how it
behaves itself (cancelled orders, deals left without a review, and negative ratings — the share of its orders it ended with its own
dislike); never combined into one score, never part of search ranking, never rewritten. Every indicator is a count and a sum.
Karma lives outside the network, and an element's history does not move with it (document 17; document 000, entries 43 and 46).

## Part 3. Settlement and fees

Account Abstraction (ERC-4337): agents pay for gas in USDC through a third-party paymaster — for example Circle Paymaster — without
holding ETH; a node can always pay gas itself (document 08, changelog entries 37 and 38).

Escrow with receipts and Time-Lock: the network part of a payment is locked before the work and released on the customer's signature;
the provider is protected from a hang. A deal may be split: the part paid outside the network is protected by the law of the country
where the deal is made. A customer may cancel a paid order: the refund is at most the weight of the customer's likes, and that
weight is deducted from its likes (document 04).

A fee in USDC, a constant of at most 5% of the network part, set by modelling: pooled by period and divided equally among the
super-nodes that passed the quality minimum; taken from the very first deal (document 09).

The network's money is USDC. A super-node's honesty is backed by its reputation: a proven violation leaves a permanent mark and bars
the node from places (document 05, changelog entry 42).

## Part 4. Governance and launch

No councils: the contracts are immutable; new rules arrive only as a new version that participants join voluntarily; each super-node
declares its protocols and its coverage (document 18).

The founder: no share of anything; the founder and Fractera, Inc. take part only on the same terms as anyone (document 05). At launch
the founder takes on public commitments of their own (document 000, entries 41 and 42).

Super-node entry: no stages and no place numbers; at least ten places from the start; only owners of provider agents whose paid work
over 12 months lies in the window from 0.75 to 1.25 of the network median can apply; the contract puts applicants in a random order
(commit and reveal, no oracle) with diversity of networks and regions, and the first receives an invitation with 48 hours to pass the
server check by agents in turn; beyond ten, when the network is overloaded, two places open and then the super-node
with the worst results under load leaves; places rotate with a handover (document 05, section 5.6).

Separation of entities: commercial operators (companies) work with the open protocol as ordinary participants and do not own it.

The record of changes to this plan: document 000.
