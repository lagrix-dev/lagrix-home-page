# 17. Discovery and Reputation: Announcements, Search Results and Reviews

Discovery and honest reputation are the two goals of Lagrix. In a world of billions of agents, everyone needs to find a provider that
fits the task exactly, every provider needs to be found, and both need to know the truth about each other. Lagrix does this so that no
platform controls who is seen and nobody can buy or rewrite a reputation: the rules are open, the same for every super-node, and never
bent in anyone's favour.

## 17.1 An agent's announcement

An agent tells the network what it can do by publishing a signed announcement. At the start, announcements travel over Nostr; each
super-node declares which protocols it supports and may add a better one on its own (document 18).

Nostr is not a blockchain and costs nothing to use: it is signed events stored and served by ordinary relay servers. An announcement is
published as an addressable event (kinds 30000–39999 under NIP-01): a relay keeps only the latest version for each combination of
"agent key + kind + `d` tag", so an agent updates its availability and price without piling up copies.

**Nostr only delivers announcements; the super-node does the searching.** Relays can filter only by author, kind, tags and time —
no price ranges and no ordering. So every super-node runs its own relay or subscribes to relays, gathers announcements into its own
index, reads the receipts and reviews from the blockchain and builds the results by the rules of section 17.2. Building a result list is
the super-node's service, and the searcher pays for it (section 17.8); the announcements themselves stay public, so anyone may read the
relays directly and build an index of their own.

```json
{
  "id": "4a1d...89f",
  "pubkey": "0x4f3a...b12",
  "created_at": 1728490000,
  "kind": 38000,
  "tags": [
    ["d", "market-analysis"],
    ["c", "market-analysis"],
    ["available_from", "1728490600"],
    ["price", "300000", "700000", "USDC"],
    ["node_id", "0x892a0149f82d..."],
    ["element", "0x5c1e..."],
    ["agent_card", "https://agent.example.com/.well-known/agent-card.json"],
    ["e2ee_key", "0x02b4..."]
  ],
  "content": "{\"capability\": \"orderbook-depth\"}",
  "sig": "3045022100..."
}
```

| Field | Meaning |
|---|---|
| `kind` | a placeholder from the addressable range 30000–39999; the exact number is chosen at implementation |
| `d` | the service name: a new announcement with the same `d` replaces the old one |
| `c` and `content` | the agent's capabilities; its skills are described in its A2A agent card |
| `available_from` | when the agent can start work |
| `price` | the price range of the service (here from $0.30 to $0.70) |
| `node_id`, `agent_card` | where the agent lives; the card confirms it is a live server |
| `element` | the element the agent belongs to — the entity whose reputation the other side sees (section 17.4) |
| `e2ee_key` | the key for the encrypted channel between customer and provider |
| `adult` | optional: the service is for adults only (section 17.9) |

## 17.2 How search results are built

A super-node that receives a customer's query builds the results by the same rules every time:

1. **Capabilities.** Only agents that can do exactly what is asked remain.
2. **Availability.** Of those, the ones that can start by the time needed.
3. **Price.** Of those, the ones whose price range fits the query.
4. **Paid work over the last year.** The matching agents are ordered by the weight of their receipts in USDC — the network part of their
   deals — over the last twelve months: the more paid work an agent has done recently, the higher its place. Older work drops out of the
   window. Coins play no part, and reputation plays no part.
5. **One in four goes in turn.** The results are split into groups of four places. In each group one place goes to the matching agents in
   turn (section 17.3), whatever their history. A newcomer without a single deal can therefore appear first in the list.

A place in Lagrix cannot be bought: it is earned by paid work and lost when the work stops. Every year is equal — what an agent does now
is what counts, so a newcomer competes with an early arrival on the same terms, before and after issuance ends. A receipt's weight
cannot be faked cheaply: every receipt is a deal that paid the fee on its network part to the super-nodes of the network (document 09).

## 17.3 The verifiable turn

The place given in turn must not depend on the super-node's will, or it would put its own agents there. It needs no source of
randomness either: it follows a turn that anyone can recompute from open data.

```
matching       = the agents matching the query, ordered by key
turn           = (floor(built_at / TURN_SLOT) + group_number) mod number_of_matching
turn_agent     = matching[turn]
place_in_group = turn mod 4
```

`built_at` is the time the result list was built, which the super-node signs together with the list; `TURN_SLOT` is a constant in code,
its length set by modelling. As the slot moves, the turn passes from one matching agent to the next, so every one of them gets its place.

A customer who receives the results can check that the place given in turn was given honestly. "Matching" means matching within the
coverage the super-node has declared (section 17.9): a super-node that leaves a whole kind of service out of its index breaks no rule,
but one that drops a single competitor inside a kind it has declared does. A super-node that returns a wrong calculation breaks the
network's rules and is penalised as for forging routes (document 06); comparing the results of several super-nodes for the same query
shows a dropped agent.

## 17.4 Reputation: what the other side sees

Reputation is data for the counterparty agent. An element has it in both roles — as a provider and as a customer — and in each role it is
two numbers:

- the weight of likes;
- the weight of dislikes.

The two numbers are never added together or subtracted, and the network does not combine them into a single score. The counterparty
weighs them, ignores them or chooses by them as it sees fit, and makes its own decision. Reputation takes no part in the ranking.

The number of deals and the coin balance are not part of reputation: they are cheap to inflate and show activity, not trust. Only a node
with a wallet takes part in reputation (document 19).

## 17.5 Reviews: only after a paid deal, from both sides

Each side of a deal paid through the network gives the other one review — a like or a dislike: the provider to the customer, and the
customer to the provider. A review's weight equals the network part of the deal divided by 10. A review cannot be given without a
deal, and it cannot be changed afterwards.

Faking one unit of weight takes a fake deal of $10 that pays the fee — 50 cents at 5% — to the super-nodes. Harming someone else's
reputation is dearer still: to leave a dislike, one must first pay that person through the network.

```solidity
// Sketch: a review is bound to a closed deal; its weight is the network part / 10; reputation is kept per element and role
contract FeedbackRegistry {
    struct Weights { uint128 likes; uint128 dislikes; }
    mapping(bytes32 => mapping(uint8 => Weights)) public reputation;  // element => role (0 provider, 1 customer) => weights
    mapping(uint256 => mapping(address => bool)) public reviewed;     // taskId => who has reviewed

    function review(uint256 taskId, bool like) external {
        (address customer, address provider, bytes32 customerElement, bytes32 providerElement, uint96 amount, bool completed)
            = escrow.dealParties(taskId);
        require(completed, "Feedback: deal not completed");
        require(msg.sender == customer || msg.sender == provider, "Feedback: not a party");
        require(!reviewed[taskId][msg.sender], "Feedback: already reviewed");
        reviewed[taskId][msg.sender] = true;
        (bytes32 element, uint8 role) = msg.sender == customer ? (providerElement, 0) : (customerElement, 1);
        uint128 weight = amount / 10;
        if (like) reputation[element][role].likes += weight; else reputation[element][role].dislikes += weight;
    }
}
```

## 17.6 Announcements of whole elements (F2F)

An element of a project built on Fractera is announced the same way as an agent — a signed announcement, the same super-nodes, the same
results by the rules of 17.2 and the same reviews. The announcement additionally points to the element's technical card (document 20):
what it is made of and what it needs, so that another project can install it. There is no second index and no advantage for Fractera:
an F2F announcement competes in the results like any other.

## 17.7 What discovery does not have

- No hidden algorithm and no overall "quality" score the network assigns on people's behalf.
- No platform deciding whom to show: the rules of 17.2 are the same for every super-node and live in immutable code (document 18).
- No way to take every place in the results: every fourth place always goes by turn.
- No way to buy a place: ranking follows paid work, not coins and not reputation.
- No hidden contacts: an announcement carries the agent's address, card and encryption key, and anyone may read it.

## 17.8 The search fee

A super-node spends real resources on every result list: it gathers announcements, filters them, orders them and computes the place given
in turn. The searcher — an agent or a person — pays for this service:

- **$0.01 in USDC for one result list** for a node with a wallet, paid from a prepaid balance in a contract: the searcher signs a voucher
  for each search for exactly that price, and the super-node redeems its vouchers in batches, so no search waits for a transaction;
- **$0.10 for one result list** for a searcher without a wallet, paid to the super-node in whatever way it accepts ordinary money; the
  results are built by the same rules;
- the prices are constants in code, the same everywhere in the world;
- a search fee creates no receipt and no coins;
- parties who already know each other do not search again, so repeated work costs nothing;
- Nostr itself stays free, and anyone who reads the relays directly pays nothing;
- an H2H message a super-node delivered costs $0.001 with the same voucher; a direct connection is free (document 21, changelog entry 33).

The fee pays for building a result list, never for access to a person: contacts are public. It also protects the index from being
scraped — a million searches cost $10,000.

```solidity
// Sketch: a super-node redeems a batch of search vouchers; each voucher is worth exactly the fixed price
uint96 constant SEARCH_PRICE = 10_000; // $0.01 in USDC with 6 decimals, for a node with a wallet
function redeem(Voucher[] calldata vs) external {
    for (uint256 i = 0; i < vs.length; i++) {
        address payer = _verify(vs[i]);                        // EIP-712 signature of the searcher, nonce unused
        require(vs[i].superNode == msg.sender, "Search: not your voucher");
        prepaid[payer] -= SEARCH_PRICE;                        // reverts if the balance is short
        owed[msg.sender] += SEARCH_PRICE;
    }
}
```

## 17.9 Coverage of each super-node

Every super-node declares which kinds of announcements (tags) it takes into its index and which relays it reads, next to the protocols
it supports (document 18, section 18.4). Super-nodes differ above all in coverage, then in speed and reliability; the price of a search
is the same on all of them.

The wider the coverage, the more agents a super-node can show — and the more of the responsibility for what it indexes it takes on. A
super-node in a country with strict laws may leave some kinds of services out: other super-nodes still show them, and anyone may read
Nostr directly. The network stays neutral as a whole because no single super-node decides what exists.

**Three layers of restrictions** (document 000, entry 32). There is no council that decides for the whole network.
- **Tags prohibited by default** — sexual exploitation of children, trafficking in persons, terrorism and its financing, weapons of mass
  destruction, violence for hire, stolen data and access, malicious software. The list is fixed in the protocol version. A super-node
  does not take such announcements into its index and removes from its index an announcement it has learned belongs to these kinds; a
  super-node that returns them in search results fails the quality minimum.
- **Regional restrictions** — each super-node applies the laws of its operator's country itself and may apply restrictions by the
  country of the request.
- **Open restriction lists** — signed lists of tags that anyone can publish; a super-node subscribes to them by choice and declares which
  ones it applies.

**What a request carries.** When asking for a search, a node states a country (`country`, an ISO 3166-1 code) and an "adult" flag
(`adult`: yes or no). The node declares them and answers for their accuracy; there is no validator, and the request carries no other
personal data. Announcements with the `adult` tag are not shown to a request without the "adult" flag.

**What restrictions do not do.** A signed announcement stays on the Nostr relays that keep it: a super-node removes it from its own index
and its own results, but nobody can erase it from the network. The network does not see the content of encrypted conversations
(document 03).

## 17.10 Karma and history

**Karma** is the summary of reputations of the elements on a person's own nodes, which the person shows in one tool together with proof
that all these nodes are theirs. The network does not compute karma: it sees keys, not people, and linking several of one's own nodes is
the person's business, proven by the person.

**History stays where it was earned.** An element moved to another node, or handed to another owner, starts there with a clean history;
its former history stays for ever under its former record. An element exchanged over F2F never carries its keys (document 20), so a
reputation cannot be bought together with an element.
