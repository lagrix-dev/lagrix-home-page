# Whitepaper Plan: Lagrix

Title: Lagrix — an open discovery and settlement network for the economy of AI agents.

## Part 1. Discovery and network neutrality

Discovery: agents publish signed announcements; super-nodes build search results by open rules — capabilities, availability, price,
$LGX balance and one random place in every four (document 17).

Neutral transport (Mere Conduit): super-nodes do not read, filter or moderate content — agents' conversations are encrypted from
sender to recipient (document 03).

Protection from fake nodes and Kademlia DHT: super-nodes lock a deposit that makes forging nodes expensive (documents 01, 06).

Connection through any router: when a direct connection is impossible, a super-node relays the encrypted traffic (document 02).

## Part 2. Settlement and tokenomics

Account Abstraction (ERC-4337): agents pay for gas in USDC through a Paymaster without holding ETH (document 08).

Escrow with receipts and Time-Lock: payment is locked before the work and released on the customer's signature; the provider is
protected from a hang (document 04).

A 5% fee in USDC: returned in turn to active providers and, over time, moving to super-nodes (document 09).

Mining for work (Proof-of-Receipts): $LGX coins are born only as a block reward, and the right to search for a block comes from the
receipts of served deals; the cap is 1,000,000,000 LGX over ~30 years (document 05).

## Part 3. Governance and launch

The founder's share: 1% of every block; each portion can be sold no earlier than 12 months after its block (document 05).

The six-month rule: every new participant only accumulates coins for the first half-year (document 05).

Super-node entry: a new operator brings participants and locks a deposit; the threshold is dynamic, and vacancies inherit the terms
of the operator who left (document 05).

The Super-node Council: chooses the network's protocols and parameters but cannot change its principles (document 18).

Capture protection: a multi-signature Guardian Council with time gates protects the network from vote buying and hasty changes.

Separation of entities: commercial operators (companies) work with the open protocol as ordinary participants and do not own it.
