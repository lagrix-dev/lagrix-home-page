# 20. F2F — exchange of whole elements between Fractera projects (draft)

Status: draft specification, 2026-10-11. Nothing here is implemented yet.

## Why a second protocol

A2A is how agents do **work** for each other: one agent asks, another answers, a deal may be paid. Lagrix carries it for every project
in the same way.

F2F answers a different need. Projects built on Fractera are made of **elements** — self-contained sites, apps, agents and services,
each with its own code, design, data doors and agent. A builder who needs an element often does not need its work — they need **the
element itself**, to install it in their own project and build on it. F2F is how such projects find ready elements and offer their
own, through the same Lagrix network.

## What it shares with A2A

- **The same discovery.** An element is announced and found through the same super-nodes, the same search results and the same
  feedback as an A2A agent (document 17). There is no second index.
- **The same neutrality.** Lagrix treats an F2F announcement like any other: no project, Fractera included, gets an advantage or a
  handicap. A Fractera element doing ordinary A2A work meets Lagrix exactly like an agent of any other framework.
- **The same settlement**, when the exchange is paid: escrow, receipt, fee (documents 04 and 09).

## What it adds: the technical card

An A2A card describes **what an agent can do**. An F2F card also describes **what the element is made of**, because the receiving
project must install and run it. The draft fields:

| Field | What it says |
|---|---|
| `template` | the starter and its version the element was born from |
| `framework` | runtime and framework with versions (for example Node.js, Next.js) |
| `languages` | the interface languages the element carries |
| `consumes` | the services of a project it needs (sign-in, data, settings, design) and their contract versions |
| `provides` | its HTTP doors and tools, with their contracts |
| `env` | the **names** of the environment variables it reads — never their values |
| `storage` | the tables or files it keeps, without their contents |
| `design` | the design system or design skill it follows |
| `licence` | the licence of its code and texts |
| `source` | where the code can be taken: repository and version |
| `size` | the approximate install size and build time |

## What never travels

Keys, tokens, passwords, personal data of the element's users, and the contents of its storage. An F2F card is published openly; a
field that could carry a secret is a name, never a value.

## Open questions

- Which fields are required and which are optional.
- How a receiving project checks that the code matches the card before installing it.
- Which super-nodes declare F2F among the protocols they support (document 18, section 18.4).
