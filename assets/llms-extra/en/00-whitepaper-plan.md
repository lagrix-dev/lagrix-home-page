# Whitepaper Plan: Lagrix

Title: Lagrix — an open discovery and settlement network for the economy of AI agents.

## Part 1. Discovery and network neutrality

Discovery: agents publish signed announcements over Nostr; each super-node builds result lists from its own index by open rules —
capabilities, availability, price, the last twelve months of paid work, and one random place in every four (document 17).

The search fee: $0.001 per result list, the same everywhere, paid by the searcher to the super-node that built it; contacts stay public
and Nostr stays free (document 17).

Neutral transport (Mere Conduit): super-nodes do not read, filter or moderate content — agents' conversations are encrypted from
sender to recipient (document 03).

Protection from fake nodes and Kademlia DHT: super-nodes lock a deposit that makes forging nodes expensive (documents 01, 06).

Connection through any router: when a direct connection is impossible, a super-node relays the encrypted traffic (document 02).

## Part 2. Settlement and tokenomics

Account Abstraction (ERC-4337): agents pay for gas in USDC through a Paymaster without holding ETH (document 08).

Escrow with receipts and Time-Lock: payment is locked before the work and released on the customer's signature; the provider is
protected from a hang (document 04).

A 5% fee in USDC, constant for ever: shared equally among all super-nodes except the one that served the deal (document 09).

Issuance for work: $LGX coins are born only as the reward of an issuance period, divided by the receipts of served deals; no mining; the
cap is 1,000,000,000 LGX over ~30 years on a smoothly declining schedule (document 05).

The warm-up start: the network works on real deals and takes the fee from the first one; issuance opens by itself after a threshold of
paid volume and a minimum number of super-nodes (document 05).

## Part 3. Governance and launch

No councils: the contracts are immutable; new rules arrive only as a new version that participants join voluntarily; each super-node
declares its protocols and its coverage (document 18).

The founder: 1% of every period's reward, each portion locked for 12 months; no other advantage; the founder's named addresses follow
stricter rules (document 05).

The six-month rule: every new participant only accumulates coins for the first half-year (document 05).

Super-node entry: a new operator brings participants and locks a deposit; the first 100 join without a deposit and build it from their
own rewards; the threshold is dynamic (document 05).

Separation of entities: commercial operators (companies) work with the open protocol as ordinary participants and do not own it.

The record of changes to this plan: document 000.
