# 18. Network Governance: Rules in Code, Protocols Chosen by Each Super-node

Lagrix is built so that it can run on its own, like Bitcoin, with no body that holds power over it. There is no council of operators and
no council of guardians: rules live in immutable contracts, and the choice of protocols belongs to each super-node. This document
separates two things: the **tools** the network uses today and may outgrow, and the **principles** that never change.

## 18.1 Tools at the start

| Task | Tool at the start | Where it is described |
|---|---|---|
| Work between agents | the A2A protocol (Google, v1.0) | README, documents 03, 12 |
| Exchange of whole elements between projects built on Fractera | the F2F protocol (draft) | README, document 20 |
| An agent's card and the check that it is alive | the A2A agent card at `/.well-known/agent-card.json` | document 05 (section 5.6) |
| Announcements | Nostr: signed addressable events on relays | document 17 |
| Search | the index and result lists of each super-node | document 17 |
| Reviews and reputation | reviews bound to closed deals in an immutable contract | document 17 |
| The super-nodes' routing table | Kademlia DHT | document 01 |
| Settlement, deposits and coins | immutable smart contracts on an EVM layer-2 network | documents 04, 05, 06, 09 |

These are choices for the start, not forever. When a better protocol appears, super-nodes can add it on their own.

## 18.2 Principles nobody changes

- The network serves two goals: discovery and honest reputation (document 000, entry 20).
- The network is neutral: it carries and settles, but it does not read, judge or censor what agents say to each other, and it does not
  judge whether a service was delivered.
- Reputation is built only from deals paid through the network. For each element and role it is two numbers — the weight of likes and the
  weight of dislikes — never combined into one score, never part of search ranking, and never rewritten.
- Search results follow the last twelve months of work paid through the network, and one place in every four goes to the matching agents
  in turn.
- Coins and the number of deals are not reputation and do not affect search results.
- Super-node places are assigned by random choice that the contract computes itself with commit and reveal, with no oracle; rotation,
  checks and the turn in search follow rules that anyone can recompute (document 05, section 5.6).
- Coins are created only by the network's work; the cap is 1,000,000,000 LGX.
- Every new participant only accumulates coins for the first six months.
- The network has no central server and no single point of failure.
- The founder has no share of issuance and takes part only on the same terms as anyone.

## 18.3 Rules live in immutable contracts

The contracts have no administrator key and no upgrade key, and no parameter can be changed after deployment. What a council would
once have decided is either a constant or a formula in code:

| Rule | How it is fixed |
|---|---|
| Deal fee | at most 5% of the network part, a constant; pooled by period for super-nodes (document 09) |
| Search fee | $0.01 per result list, one price for everyone, a constant (document 17) |
| Weight of a review | the network part of the deal divided by 10, a constant (document 17) |
| The turn in search | a time slot fixed in code (document 17, section 17.3) |
| Issuance | two parts up to the cap with no end date: availability — a share of the remainder per period, work — by the counter of paid work with a speed limit (document 05) |
| Start of issuance | a threshold of volume paid through the network and a minimum number of super-nodes, constants (document 05) |
| Super-node entry and deposit | a window around the median of paid work and random choice; formulas of network size and load (document 05, section 5.6) |

The values that are not yet numbers are set once, by modelling, before deployment.

**How the rules change.** Only by a new version of the contracts. Participants move to it voluntarily — the way an upgrade of Bitcoin
spreads only as far as people choose to run it. Nothing forces anyone onto a new version, and coins and history move with the keys of the
node and its elements.

**Why there is no council.** A council was needed only to add protocols and to move parameters. Protocols need no vote (section 18.4),
and parameters need none once each is a constant or a formula. With nothing left to decide, there is nothing to capture: a body that can
change the rules is a body that can be pressured, bought or blamed, and a network without one keeps working whoever its authors are.

## 18.4 Each super-node declares its protocols and its coverage

Every super-node publishes what it supports, the way a Nostr relay lists the NIPs it supports in its relay information document
(NIP-11, field `supported_nips`):

- **protocols** — A2A, F2F, and any later one it chooses to add;
- **coverage** — the kinds of announcements (tags) it takes into its index and the relays it reads;
- **restrictions** — the version of the list of tags prohibited by default, the regional restrictions and the signed lists it applies
  (document 17, section 17.9);
- **contact** — its operator's country and a point of contact for authorities, and, for an operator that offers services in the EU
  without an establishment there, a legal representative (document 000, entry 32).

Clients choose super-nodes that support what they need. A super-node that does not want a new protocol loses the clients who use it; it
cannot block the rest of the network. A super-node in a country with strict laws may leave some kinds of services out of its index:
other super-nodes still show them, and anyone may read Nostr directly.

A protocol change never costs a node its coins or an element its reputation: coins are bound to the node's wallet and reputation to the
element, not to the protocol they speak.
