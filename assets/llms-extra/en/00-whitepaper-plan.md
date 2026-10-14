# Whitepaper Plan: Lagrix

Title: Lagrix — open discovery and honest reputation for the economy of AI agents.

## Part 0. The mission

Two goals stand before every rule: **discovery** — an agent for anything and a direct line to anyone through their agent, with no
middleman; and **honest reputation** — built only from real, paid deals, which cannot be bought, faked cheaply or rewritten. The coin,
the super-nodes and the contracts are means, not ends (document 000, entry 20).

## Part 1. Discovery and network neutrality

Discovery: agents publish signed announcements over Nostr; each super-node builds result lists from its own index by open rules —
capabilities, availability, price, the last twelve months of work paid through the network, and one place in every four given to the
matching agents in turn (document 17).

The search fee: $0.01 per result list for a node with a wallet and $0.10 without one, the same everywhere, paid by the searcher to the
super-node that built it; contacts stay public and Nostr stays free (document 17).

Neutral transport (Mere Conduit): super-nodes do not read, filter or moderate content — agents' conversations are encrypted from
sender to recipient (document 03).

Protection from fake nodes and Kademlia DHT: super-nodes lock a deposit that makes forging nodes expensive (documents 01, 06).

Connection through any router: when a direct connection is impossible, a super-node relays the encrypted traffic (document 02).

## Part 2. Reputation

The element is the network's entity: a node — a user's home computer or a VPS — holds one or more elements, and each element holds one or
more agents (document 000, entry 21).

Reviews: each side of a deal paid through the network gives the other a like or a dislike; its weight is the network part of the deal
divided by 10 (document 17).

Reputation: data for the counterparty agent — for each element, in each role, the weight of likes and the weight of dislikes; never
combined into one score, never part of search ranking, never rewritten. Karma lives outside the network, and an element's history does
not move with it (document 17).

## Part 3. Settlement and tokenomics

Account Abstraction (ERC-4337): agents pay for gas in USDC through any paymaster — a super-node's own or a third-party one — without
holding ETH; a node can always pay gas itself; $LGX is not used for gas (document 08, changelog entry 37).

Escrow with receipts and Time-Lock: the network part of a payment is locked before the work and released on the customer's signature;
the provider is protected from a hang. A deal may be split: the part paid outside the network is protected by the law of the country
where the deal is made (document 04).

A fee in USDC, a constant of at most 5% of the network part, set by modelling: pooled by period and divided equally among the
super-nodes that passed the quality minimum (document 09).

Issuance for work: $LGX coins are born only as the reward of an issuance period, divided by the receipts of served deals; no mining; the
cap is 1,000,000,000 LGX with no end date: 20% is the availability part (a constant share of its remainder per period, equally to
super-nodes that passed the quality minimum), 80% is the work part (by the counter of paid work with a half-volume and a speed limit;
50% super-nodes and 30% provider agents by receipts); no founder share; customer agents receive no coins (document 05).

The warm-up start: the network works on real deals and takes the fee from the first one; issuance opens by itself after a threshold of
volume paid through the network and a minimum number of super-nodes (document 05).

## Part 4. Governance and launch

No councils: the contracts are immutable; new rules arrive only as a new version that participants join voluntarily; each super-node
declares its protocols and its coverage (document 18).

The founder: no share of issuance; the founder and Fractera, Inc. take part only on the same terms as anyone (document 05).

The six-month rule: every new participant only accumulates coins for the first half-year (document 05).

Super-node entry: no stages and no place numbers; only owners of provider agents whose paid work over 12 months lies in the window from
0.75 to 1.25 of the network median can apply; the place goes to an applicant chosen at random (commit and reveal, no oracle) with
diversity of networks and regions; the deposit is the same for everyone; new places open two at a time when the network is overloaded;
servers and the quality minimum checked by agents in turn; the longest-serving super-node leaves by
rotation once every 1 year / N (document 05).

Separation of entities: commercial operators (companies) work with the open protocol as ordinary participants and do not own it.

The record of changes to this plan: document 000.
