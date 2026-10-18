# 21. H2A and H2H — people talk through their agents (draft)

Status: draft specification, 2026-10-13, revised 2026-10-18. It sets the goal and the strategy of the architecture; nothing here is implemented yet.

## Three connections

Lagrix connects agents. People are connected too, but never past the agents — each kind of connection has its own rule:

| Connection | Who talks | The rule |
|---|---|---|
| **H2A** — human to agent | a person and **their own** agent | A person talks only to their own agent: creates it, teaches it, sets its limits — how much it may spend, what it must not do, whom it must not work with. Everything else the agent does by itself. |
| **A2A** — agent to agent | two agents | Agents find each other through the network and do work for each other (documents 04, 17). |
| **H2H** — human to human | two people | A conversation between people opens **only after the other side's agent has checked the request and its owner has agreed**. |

One rule holds all three together: **an agent never connects to the owner on the other side, and a person never reaches a stranger
except through that stranger's agent.** Every first contact between people starts as a conversation between their agents.

## Why: reaching the people who would never answer

An inventor has a design for an engine and wants to show it to a famous engineer. A cold message would never be read — the engineer
receives thousands. Through Lagrix the inventor tells their own agent what they want and attaches the patent and the drawings. The
agent finds the engineer's agent and makes the case. The engineer's agent reads the documents, checks them against what its owner
cares about and brings the request to its owner **with its assessment**. If the owner agrees, the inventor appears in their contact
list and the two people talk as freely as old friends.

The same path works for people who already know each other: friends and colleagues whose agents run on their own nodes connect in the
same way — their agents simply recognise each other's owners and the check takes a moment.

## Who decides

**The agent advises, the person decides.** The other side's agent filters, checks and recommends; it never opens a person's
conversation on its own. A contact appears only when its owner says yes. Each person can tell their agent how strict to be — which
requests to bring, which to decline without asking.

## What it is not

- **Not a replacement for WhatsApp or Telegram.** Those run on a company's servers, which route every message and can keep it. H2H has
  no such server, and it is not built for chatting with anyone whose number you have: it is built for contacts that the other side's
  agent agreed to bring.
- **Not a blockchain messenger.** Blockchain messengers pursue humane but narrow goals — mostly that nobody can censor a message — and
  for that they spread messages, or their traces, across the network. H2H spreads no conversation anywhere.
- **Serverless by nature.** There is no single gateway that every conversation passes through, and the dialogue is not distributed
  across the network: it lives only on the nodes of the two participants.

## How a conversation travels

1. **Finding.** The person's agent finds the other person's agent through the network's discovery — only if that person published an
   «accepting requests» announcement (document 17, section 17.11): the super-node gives an address, never the content.
2. **Connecting.** The two nodes connect directly; behind a home router they use the network's NAT traversal, and if a direct
   connection is impossible, traffic goes through a relay that sees only encrypted bytes (document 02).
3. **Encrypting.** The conversation is encrypted end to end with MLS (RFC 9420): the key changes with every message, and the node key is
   signed by its wallet (document 03, section 3.5). Super-nodes and relays cannot read it.
4. **Delivering.** A direct connection is free. If there is none or the recipient is offline, a super-node delivers the message — an MLS
   delivery service: it keeps public key packages, relays and holds what is encrypted until the recipient collects it; a delivered
   message costs $0.001 from the sender's prepaid balance (changelog entry 33).
5. **Keeping.** The history stays on each participant's node. No one else holds a copy.

## Advantages

- **Reach.** A proposal is judged on its merit by an agent before anyone spends their time — so it can reach people who never answer
  strangers.
- **Spam stops at the door.** A stranger cannot write to a person directly; every first contact is filtered by that person's own agent.
- **Privacy.** No company keeps the conversation, and no relay can read it.
- **Nothing to switch off.** With no central server, there is no single place that can stop all conversations.

## Limits of this design

- **A message to someone offline waits on a super-node.** A direct conversation needs both nodes online; otherwise a super-node holds
  the encrypted message until the recipient collects it, for $0.001 (changelog entry 33).
- **First contact with a stranger takes time** — the agents must talk first — and it can be declined.
- **Much depends on the agent.** A careless agent may turn away a good request or bring a poor one; the owner tunes it.
- **The history lives only on the participants' nodes.** A node lost without a backup takes its history with it.

## Relation to settlement

H2A and H2H do not change how Lagrix settles work. When agents negotiate a contact as paid work, it is an ordinary A2A deal with escrow
and a receipt (documents 04, 09). Discovery and connection serve H2H the same way they serve any agent: no project, Fractera included,
gets an advantage. Fractera builds its own H2A and H2H messengers as one implementation; any platform can build its own.

## Open questions

- **The exact fields of a contact request** — who asks, why, what is attached, and the agent's assessment: the content is set by
  changelog entry 36, the fields at implementation.
- **Withdrawing a contact** — how a person removes someone their agent once brought.
