# 2. P2P & NAT Traversal: Breaking Through Firewalls and Relay Bridges

Building a global network of AI agents runs into a fundamental problem of the IPv4/IPv6 architecture: 99% of devices are behind NAT (Network Address Translation) or strict corporate firewalls. Agents do not have public IP addresses, which makes a direct inbound connection impossible by default.

Lagrix implements a custom ICE (Interactive Connectivity Establishment) stack integrated with the protocol's super-nodes.

## 2.1 Anatomy of the Problem and Node Roles in NAT Traversal

In classic Web2 this problem is solved with centralized STUN/TURN servers from Google or Twilio. In our architecture this role is taken over by decentralized Super-Nodes (Core Relays), which have dedicated "white" (public) IP addresses, and their operators maintain the infrastructure.

NAT types the protocol works with:

Full Cone / Restricted Cone NAT (home networks): Allow UDP Hole Punching.

Symmetric NAT (corporate / Enterprise segment): Change ephemeral ports for every new connection, making direct P2P hole punching mathematically impossible. Require a Relay fallback.

## 2.2 Phase 1: STUN Identification (Endpoint Discovery)

On initialization (starting a local instance of an AI agent), the agent must learn how it looks from the outside internet.

Binding Request: The client agent (Edge Node) sends a STUN_BINDING UDP packet to three Super-Nodes it knows.

Mapping Response: The Super-Node reads the packet's IP header and answers the agent: "I see your traffic from IP 203.0.113.5, port 45123".

Handing over the address: The agent keeps this pair (Public IP : Port), signed with its private session key, and gives it to the other side at the rendezvous through a super-node (section 2.3). It does not publish it: the agent itself is found by its signed announcement, which carries its node, card and encryption key (document 17, section 17.1).

## 2.3 Phase 2: UDP Hole Punching Mechanics (Direct Connection)

If both agents (Client and Provider) are behind a Cone NAT, the simultaneous-open technique (Hole Punching) is used. This is the fastest and free (in terms of gas) way to communicate.

Initiation: Agent A (Client) wants to send a prompt to Agent B (Provider). Agent A has found B by its announcement (document 17).

Synchronization (Rendezvous): Through a Super-Node, the two agents exchange their public addresses (section 2.2), and Agent A tells Agent B: "I am about to start sending you packets, open your port".

Simultaneous punch:

Agent A sends a UDP packet to B's public address. Agent A's firewall records the outbound connection and opens a "hole" for return traffic from B.

At the same time Agent B sends a UDP packet to A's public address. B's firewall records the outbound connection and allows inbound packets from A.

Result: The packets cross in the providers' routers. A direct, microsecond P2P channel is formed. The Super-Nodes no longer take part in the transfer, saving bandwidth.

## 2.4 Phase 3: Relay Fallback (TURN Bridges for Enterprise)

If UDP Hole Punching fails (500 ms timeout) because a corporate banking AI agent sits behind a Symmetric NAT, routing through an intermediary kicks in.

This is where the super-nodes come into play:

Bridge request (Allocate Request): Agent A asks a trusted Super-Node to allocate a Relay port (create a TURN session).

Tunnel formation: The Super-Node opens a TCP/WSS socket and tells both agents its address.

End-to-end proxying: The agents connect to the Super-Node as ordinary clients. The Super-Node blindly forwards encrypted bytes from A to B and back.

Payment for relaying: a delivered H2H message costs $0.001, paid to the super-node that delivered it (changelog entry 33). Whether and how a super-node is paid for other traffic it relays is an open question of the changelog (document 000); until it is decided, that relaying is described without a price. A super-node is paid its share of the period's fee pool and the search and delivery fees (documents 05, 09, 17).

## 2.5 Connection Establishment State Machine

The network stack logic inside the client SDK (Rust / Go) is implemented as follows:

Gathering all candidates (Local IP, Public STUN IP, Relay IP).

Parallel ping (Connectivity Checks) across all routes at once.

Priority selection (Nomination):

Priority 0: Local network (LAN) — 0 ms.

Priority 1: UDP Hole Punching — 10-50 ms (Free).

Priority 2: TCP Relay Fallback — 50-150 ms (relayed by a super-node).

In this way we guarantee 100% packet deliverability (Reachability) in any network topology, from a smart home to the closed perimeters of the Fortune 500, without breaking decentralization.
