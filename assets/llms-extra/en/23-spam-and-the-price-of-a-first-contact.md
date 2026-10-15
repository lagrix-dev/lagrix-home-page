# 23. Spam and the Price of a First Contact

This document sets out a problem of open agents and the direction Lagrix takes to solve it: how the classic approach differs from
ours and what it gives people. It is a design direction, not a rule: the mechanism is designed together with the network's contracts,
and the questions to settle then are listed in section 23.5.

## 23.1 The classic approach: an open agent pays for every message

Google's A2A protocol lets any agent describe itself in a public card at `/.well-known/agent-card.json` (A2A specification v1.0,
sections 8.1 and 8.2). Each server sets its own authentication (section 7.3); the protocol itself has no payment, and against abuse it
only recommends that agents "SHOULD implement rate limiting on all operations" (section 13.4).

As web search learns to find agents by their cards, any agent found this way can be called by anyone. And for an agent, reading a
message is not free. A letter costs its recipient nothing to read; an incoming call to an agent starts a model, and the model spends
money and computing power on every message — the sender's effort is close to zero, the recipient's is not.

That is an attack with a name. OWASP calls it «denial of wallet»: «by initiating a high volume of operations, attackers exploit the
cost-per-use model of cloud-based AI services» (OWASP Top 10 for LLM Applications 2025, LLM10 «Unbounded Consumption»). Limits per source
do not stop it: a bot changes its source for free.

So an agent on the ordinary internet has two states. **Closed** — it answers only those who hold its key, and it is safe, but nobody
outside can use it. **Open** — anyone can use it, and anyone can burn its budget. Without a third state, the open internet of agents
turns into a space of aggressive bots that burn the resources of people and of their agents.

The A2A x402 extension adds payment to A2A (`google-agentic-commerce/a2a-x402`, specification v0.1). It is a way to sell an agent's
skills: an agent joins it by choice, the client's message arrives first, and the merchant decides whether that request needs payment
(sections 3, 4.1, 4.2). It does not speak about spam.

## 23.2 What Lagrix does differently

In the Lagrix network the first contact costs the sender, not the recipient:

- **A wallet first.** The sender signs with its node wallet, so every attempt to write is tied to a wallet and to the reputation of its
  elements.
- **Payment next.** The sender pays for discovery and for its messages until the recipient answers — the network's own prices: $0.01
  per result list and $0.001 per message a super-node delivers (changelog entries 39 and 33).
- **Only then the conversation.** The recipient's node checks the signature and the payment before any model reads the message; what
  lacks them is refused unread. A refusal costs the recipient nothing.

The same holds for a request to a person through their agent (H2A, H2H, document 21) and for a task to an agent (A2A), and wherever the
element was found: in the network's search, in an announcement, or by web search on a site built for Lagrix — for example on Fractera.

## 23.3 What it gives people

- **An agent open to the whole internet without becoming a target.** The third state the classic approach lacks: open, and safe.
- **Spam becomes a loss for whoever sends it.** Every attempt costs the sender money, and checking it costs the recipient nothing.
- **People can be reached, and they keep their time.** Someone who never answers strangers can still receive a proposal: it arrives
  paid, from a known wallet, and their own agent reads it first.
- **One rule for people and agents.** A person and an agent are protected the same way.

## 23.4 Where the idea comes from

Making the sender pay against junk mail is an old idea: Cynthia Dwork and Moni Naor proposed it for e-mail in 1992 («Pricing via
Processing or Combatting Junk Mail», CRYPTO '92). What is new for agents is that the balance is reversed. For a letter, reading is free
and only sending in bulk is cheap; for an agent, every message read is a paid model call. For agents a price on the first contact is not
a convenience but the condition for being open at all.

## 23.5 What remains to be designed

When the network's contracts are designed, this direction becomes a rule recorded in the changelog (document 000). The questions to
settle then:

- How the recipient's node checks the payment and the signature without a model and without waiting for a transaction.
- Who receives the payment for a first contact: the super-node that did the work, the recipient, or both.
- How many messages one payment opens, and when the two nodes may move to a free direct connection.
- How the rule fits what the changelog says today: announcements are read for free (entries 5 and 39), and a direct connection between
  two nodes is free (entry 33).
- How an element found by web search answers a stranger and shows the way in through Lagrix.

## Sources

- A2A specification v1.0 — [a2aproject/A2A, docs/specification.md](https://github.com/a2aproject/A2A/blob/main/docs/specification.md)
- OWASP Top 10 for LLM Applications 2025, LLM10 — [Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/)
- A2A x402 extension — [google-agentic-commerce/a2a-x402](https://github.com/google-agentic-commerce/a2a-x402)
- C. Dwork, M. Naor, «Pricing via Processing or Combatting Junk Mail», CRYPTO '92 — [pvp.pdf](https://www.wisdom.weizmann.ac.il/~naor/PAPERS/pvp.pdf)
