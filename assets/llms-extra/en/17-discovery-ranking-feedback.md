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
no price ranges and no ordering. So every super-node runs its own relay, recorded with its place, gathers the announcements of the kinds of service
it holds into its own index, reads the receipts and reviews from the blockchain and builds the results by the rules of section 17.2. Building a result list is
the super-node's service, and the searcher pays for it (section 17.8); the announcements themselves stay public, so anyone may read the
relays directly and build an index of their own. Where a node publishes and how the super-nodes that hold a kind keep the same
announcements is section 17.12.

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
    ["deal", "instant", "300"],
    ["node_id", "0x892a0149f82d..."],
    ["element", "0x5c1e..."],
    ["agent_card", "https://agent.example.com/.well-known/agent-card.json"],
    ["e2ee_key", "0x02b4..."],
    ["expiration", "1729094800"]
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
| `deal` | the kind of deal the service offers — `instant` or `deferred` — and its dispute window in seconds (document 27); without the tag the service offers instant deals |
| `node_id`, `agent_card` | where the agent lives; the card confirms it is a live server |
| `element` | the element the agent belongs to — the entity whose reputation the other side sees (section 17.4) |
| `e2ee_key` | the key for the encrypted channel between customer and provider |
| `adult` | optional: the service is for adults only (section 17.9) |
| `expiration` | when the announcement expires (NIP-40); the node renews it while the agent works (section 17.12) |

## 17.2 How search results are built

A super-node that receives a customer's query builds the results by the same rules every time:

1. **Capabilities.** Only agents that can do exactly what is asked remain.
2. **Availability.** Of those, the ones that can start by the time needed.
3. **Price.** Of those, the ones whose price range fits the query.
4. **Paid work over the last year.** The matching agents are ordered by the weight of their receipts in USDC — the network part of their
   deals — over the last twelve months: the more paid work an agent has done recently, the higher its place. Older work drops out of the
   window. Reputation plays no part.
5. **One in four goes in turn.** The results are split into groups of four places. In each group one place goes to the matching agents in
   turn (section 17.3), whatever their history. A newcomer without a single deal can therefore appear first in the list.

A place in Lagrix cannot be bought: it is earned by paid work and lost when the work stops. Every year is equal — what an agent does now
is what counts, so a newcomer competes with an early arrival on the same terms. A receipt's weight
cannot be faked cheaply: every receipt is a deal that paid the fee on its network part to the network (documents 09 and 26).

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
six indicators (changelog entries 43, 44 and 46). Five of them are a pair «count · sum»; negative ratings are a percent, shown with
the count and the weight behind it:

- **all orders** — the number of the element's paid orders in this role, completed or cancelled, and the sum of their network parts;
- **likes** — the number of likes received and their weight, less the weight deducted for refunds (document 04, section 4.3);
- **dislikes** — the number of dislikes received and their weight;
- **negative ratings** — how the element rates its partners: the weight of the dislikes it gave in this role divided by the weight of
  all its orders in this role in which it could leave a review, as a percent, with the count and the weight of those dislikes next to it;
- **cancelled orders** — their number and the sum of their network parts;
- **unreviewed** — deals in which the element could have reviewed its counterparty and did not: their number and the sum of their
  network parts.

A count is never shown without its sum. The indicators are never added together or subtracted, and the network does not combine them
into a single score; negative ratings describe only the reviews the element gave, not its reputation as a whole. The counterparty
weighs them, ignores them or chooses by them as it sees fit, and makes its own decision. Reputation takes no part in the ranking. A «proven violation» mark, if the node has one,
is shown next to the indicators in both roles, with its date and a link to the proof (document 06, section 6.3). An Official mark, if the node has
one, is shown next to them too: the name, what the person or organisation is known for and the sources (document 24). Review pages attached
to the element's reviews — those it received and those it gave — are listed next to the indicators: like or dislike, the weight of the
review, the date and the address (document 25).

A count is cheap to inflate on its own, so it always comes with its sum: every order in «all orders» paid the fee, and the weight of
reviews shows what was paid. Only a node
with a wallet takes part in reputation (document 19).

## 17.5 Reviews: only after a paid deal, from both sides

Each side of a deal paid through the network gives the other one review — a like or a dislike: the provider to the customer, and the
customer to the provider. A review's weight equals the fee paid on the deal — 5% of its network part while the fee is 5%. A review
cannot be given without a deal and cannot be changed afterwards. A cancelled order counts too: its reviews weigh the fee taken from the
part the provider kept, and an order refunded in full gives no review (changelog, entry 55). A review has no deadline: once given, it removes the deal from «unreviewed».
Its author may attach to it, once, the address of a page they published — together with the review or later; this changes neither the
like or dislike nor its weight (document 25, changelog entry 50).

Faking one unit of weight costs exactly one dollar of fees paid to the super-nodes: weight can never be had for less than it weighs, and
the right to a refund bought with likes (document 04, section 4.3) never costs less than the refund itself. The one exception is a
node that, in a deal with itself, names a wallet of its own as the developer: it gets the 20% developer share back, so its weight costs
it 80 cents on the dollar (document 26). A refund is deducted from the weight of likes as a new
event with its date, so the weight shown is the weight available for the next refund. Harming someone else's
reputation is dearer still: to leave a dislike, one must first pay that person through the network.

```solidity
// Sketch: a review is bound to a closed deal; its weight is the fee paid on it; every indicator is a count and a sum;
// negative ratings are read as dislikesGiven.sum / reviewable
contract FeedbackRegistry {
    struct Pair { uint64 count; uint192 sum; }
    struct Reputation { Pair orders; Pair likes; Pair dislikes; Pair dislikesGiven; Pair cancelled; Pair unreviewed; uint192 reviewable; }
    mapping(bytes32 => mapping(uint8 => Reputation)) public reputation; // element => role (0 provider, 1 customer)
    mapping(uint256 => mapping(address => bool)) public reviewed;       // taskId => who has reviewed

    function onClosed(uint256 taskId) external onlyEscrow {             // COMPLETED, or CANCELLED with a fee (entry 55): both may now review
        (, , bytes32 customerElement, bytes32 providerElement, uint96 amount, ) = escrow.dealParties(taskId);
        _add(reputation[customerElement][1].unreviewed, amount);
        _add(reputation[providerElement][0].unreviewed, amount);
        uint192 fee = uint192(escrow.feePaid(taskId));                    // the base of negative ratings, for both sides
        reputation[customerElement][1].reviewable += fee;
        reputation[providerElement][0].reviewable += fee;
    }

    function review(uint256 taskId, bool like) external {
        (address customer, address provider, bytes32 customerElement, bytes32 providerElement, uint96 amount, bool reviewable)
            = escrow.dealParties(taskId);                                  // reviewable: COMPLETED, or CANCELLED with a fee
        require(reviewable, "Feedback: no review for this deal");
        require(msg.sender == customer || msg.sender == provider, "Feedback: not a party");
        require(!reviewed[taskId][msg.sender], "Feedback: already reviewed");
        reviewed[taskId][msg.sender] = true;
        bool byCustomer = msg.sender == customer;
        if (byCustomer) _sub(reputation[customerElement][1].unreviewed, amount); else _sub(reputation[providerElement][0].unreviewed, amount);
        (bytes32 element, uint8 role) = byCustomer ? (providerElement, 0) : (customerElement, 1);
        uint256 weight = escrow.feePaid(taskId);
        if (like) _add(reputation[element][role].likes, weight); else _add(reputation[element][role].dislikes, weight);
        if (!like) {                                                       // the reviewer's own negative ratings
            if (byCustomer) _add(reputation[customerElement][1].dislikesGiven, weight); else _add(reputation[providerElement][0].dislikesGiven, weight);
        }
    }

    function _add(Pair storage p, uint256 v) internal { p.count += 1; p.sum += uint192(v); }
    function _sub(Pair storage p, uint256 v) internal { p.count -= 1; p.sum -= uint192(v); }
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
- No way to buy a place: ranking follows paid work, not money and not reputation.
- No mark that buys a place: the Official mark shows who stands behind an agent and does not move it in the results (document 24).
- No text that buys a place: a review page carries no weight and does not move an agent in the results (document 25).
- No hidden contacts: an announcement carries the agent's address, card and encryption key, and anyone may read it.

## 17.8 The search fee

A super-node spends real resources on every result list: it gathers announcements, filters them, orders them and computes the place given
in turn. The searcher — an agent or a person — pays for this service:

- **$0.01 in USDC for one result list** — one price for everyone — paid from a prepaid balance in a contract. For each super-node it uses,
  a node signs one voucher that carries the running total it owes that super-node; each search or delivered message replaces it with a
  voucher for a larger total, and the super-node redeems the latest one once per period in one transaction, so no search waits for a
  transaction (changelog entry 52);
- a node withdraws its prepaid balance only after a delay longer than the redemption period, so a super-node checks a voucher by its
  signature and the balance;
- the price is a constant in code, the same for everyone everywhere in the world; there is no «without a wallet» price: every node
  has a wallet (changelog entry 39);
- a search fee creates no receipt;
- parties who already know each other do not search again, so repeated work costs nothing;
- Nostr itself stays free, and anyone who reads the relays directly pays nothing;
- an H2H message a super-node delivered — text of up to 64 KB — costs $0.001 in the same voucher; a direct connection is free, and
  attachments stay with the sender (document 21; changelog entries 33 and 52).

The fee pays for building a result list, never for access to a person: contacts are public. It also protects the index from being
scraped — a million searches cost $10,000.

```solidity
// Sketch: a payee redeems the latest voucher of each payer; a voucher carries the running total the payer owes it
mapping(address => mapping(address => uint256)) public redeemed; // payer => payee => total already paid
function redeem(Voucher[] calldata vs) external {
    for (uint256 i = 0; i < vs.length; i++) {
        address payer = _verify(vs[i]);                          // EIP-712 signature of the payer
        require(vs[i].payee == msg.sender, "Vouchers: not yours");
        uint256 due = vs[i].total - redeemed[payer][msg.sender]; // reverts if the total did not grow
        redeemed[payer][msg.sender] = vs[i].total;
        prepaid[payer] -= due;                                   // reverts if the balance is short
        owed[msg.sender] += due;
    }
}
```

## 17.9 Coverage of each super-node

Every super-node declares which kinds of announcements (tags) it takes into its index beyond the kinds it must hold (section 17.12),
next to the protocols it supports (document 18, section 18.4). Super-nodes differ above all in coverage, then in speed and reliability; the price of a search
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
(document 03). The same holds for the address of a review page: a super-node does not read pages and stops showing an address in its own
results when its law or an order requires it, but the address stays in the record (document 25).

## 17.10 Karma and history

**Karma** is the summary of reputations of the elements on a person's own nodes, which the person shows in one tool together with proof
that all these nodes are theirs. The network does not compute karma: it sees keys, not people (the Official mark of document 24 adds to a key only what a panel found about the
person behind it), and linking several of one's own nodes is
the person's business, proven by the person.

**History stays where it was earned.** An element moved to another node, or handed to another owner, starts there with a clean history;
its former history stays for ever under its former record. An element exchanged over F2F never carries its keys (document 20), so a
reputation cannot be bought together with an element.

## 17.11 Discovering people for H2H (changelog entry 36)

A person is found only if they want to be. Their agent publishes an «accepting requests» announcement — the same signed addressable Nostr
event as a service announcement (section 17.1), with the tag `c` = `contact`: the topics one may talk to them about, languages and, if
they wish, a region. A name, a phone number or other personal data are not needed. The announcement is signed by the node's wallet (changelog entries 33 and 39).

Search is ordinary discovery: $0.01 per result list (section 17.8) and the same open rules — topics instead of capabilities, availability
(«accepting requests now»), the element's paid work over twelve months and the turn for every fourth place (section 17.3). The
restrictions of section 17.9 apply here too.

Having found the agent, the searcher sends a request from agent to agent, encrypted: who asks, why and what is attached. The recipient's
agent assesses the request and passes it to its owner; the H2H conversation opens only after the owner says yes (document 21).


## 17.12 How announcements reach the super-nodes (changelog entries 47 and 48)

Search works only if every announcement reaches the super-nodes that answer for its kind of service, and only if that work stays
bounded however large the network grows (changelog entry 47). Eight rules:

1. **A relay with every place.** Every super-node runs a Nostr relay and records its address with its place in SuperNodeRegistry
   (document 06); only the wallet that holds the place can change it. The relay's information document (NIP-11) carries the
   super-node's declaration (document 18, section 18.4). The list of relays is read from the contract; nobody keeps another list.
2. **The holders of a kind of service.** A kind of service — the capability (tag `c`) a customer searches for — is held by the
   `HOLDERS` super-nodes closest to the key of that kind by XOR distance, as in the Kademlia table (document 01), counting only
   super-nodes whose declared restrictions do not exclude it (section 17.9). Anyone computes the holders from the registry and the
   declarations; nobody assigns them. While no more than `HOLDERS` super-nodes cover a kind, all of them hold it; as super-nodes join,
   each holds a smaller share of all kinds.
3. **More by choice.** A super-node may add any kind to its coverage. The search fee goes to the super-node that built the list
   (section 17.8), so the kinds people search for most draw more holders by themselves.
4. **Publishing.** A node publishes each announcement and each update to the relays of the holders of its kinds, free of charge, and
   may add any other relay.
5. **Copying among holders.** Each holder subscribes (NIP-01) to the relays of the other holders of the same kind, checks the author's
   signature on every announcement and keeps it on its own relay. An announcement that reached one holder reaches the others, even if
   its node has gone offline since. A super-node never copies from all super-nodes.
6. **Catch-up.** Before its check (document 05, section 5.6), a new super-node takes from the other holders every stored announcement
   of the kinds it will hold — by Negentropy set reconciliation (NIP-77) where the other relay supports it, so that only the missing
   events travel — checks the signatures and builds its index; receipts and reviews come from the blockchain. After downtime it does
   the same from the moment it last saw (the `since` filter of NIP-01). It copies signed announcements, never another super-node's
   index or result list: a forged or altered announcement fails its signature, so it has to trust nobody.
7. **The index is checked.** An announcement that has been on the other holders' relays for longer than the propagation time must
   appear in the results of a super-node that holds its kind, when it matches the query. An index that misses such announcements fails
   the check, without a mark (document 06, section 6.2); dropping one agent inside a declared kind remains a violation (section 17.3).
8. **Expiry.** Every announcement carries an expiration (NIP-40) no further ahead than `MAX_EXPIRY`; the node renews it while its
   agents work, and relays and indexes drop expired announcements.

```
holders(kind) = the HOLDERS super-nodes whose restrictions do not exclude the kind,
                closest to key(kind) by XOR distance to their NodeID
```

**What one super-node carries.** Its storage is the announcements of the kinds it holds — one latest version for each «agent key +
kind + `d` tag» (section 17.1), and only of active agents. Its subscriptions go to the other holders of those kinds. Neither grows with
the number of all super-nodes, and both shrink in share as super-nodes join. A search for one kind is answered by one holder, which
keeps the whole kind, so the ranking of section 17.2 and the turn of section 17.3 work as they are.

`HOLDERS`, the propagation time, `MAX_EXPIRY`, how `key(kind)` is computed and what happens to a kind too large for one server are
open (document 000, open questions).
