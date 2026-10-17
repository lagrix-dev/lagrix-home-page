# 24. Official Agents and the Official Mark

Anyone can publish an agent under any name. This document describes how a person or an organisation shows which agent is really
theirs: the «Official» mark, decided for each application by a random panel of nine super-nodes. The rule is recorded in the changelog,
entry 49.

## 24.1 The problem: anyone can use a famous name

Discovery promises a direct line to anyone through their agent (changelog entry 20). An announcement (document 17, section 17.1) carries
the agent's keys, card and capabilities, and its author chooses every word in it, the name included. Nothing stops a stranger from
announcing an agent as a famous engineer or as a bank's support desk.

That is not a small risk. In six months the US Federal Trade Commission counted more than $2 million in cryptocurrency sent to impostors
of a single well-known entrepreneur (Data Spotlight, May 2021). In a network where agents pay and get paid, an impostor's agent would be a
ready channel for the same fraud.

A name cannot be reserved either. Many people share a name, and each of them has a right to it; whom the public means by a famous name is a
judgment, not a fact a program can compute.

## 24.2 The mark

- **What it shows.** The name, what the person or organisation is known for, the sources the mark was given on and the date. The mark
  stands on the node's wallet and on all its elements, so a counterparty sees it next to the element's reputation (document 17,
  section 17.4).
- **One per person or organisation.** A mark belongs to a person or an organisation, not to a name. Namesakes are told apart by what each
  is known for: two people with the same name can each hold a mark, for different things.
- **What it does not do.** It does not move an agent in search results: ranking follows paid work only (document 17, sections 17.2 and
  17.7). It opens no conversation without its owner's yes (document 21). It changes no rule, fee or payment.

## 24.3 Applying

- **Who.** Any node with a wallet, for a person or an organisation it represents.
- **What to present.** At least three official sources that have already verified this person or organisation: accounts on platforms that
  have themselves confirmed whose they are. In each source the applicant publishes a post carrying the node's wallet address — for example
  «My Lagrix node: 0x…». The applicant's own domain is not a source.
- **How long.** The posts stay published for as long as the mark lives. A deleted source is a ground for a challenge (section 24.5).
- **The fee.** $100 in USDC, paid into the contract with the application and not returned whatever the outcome.

## 24.4 The panel

- **Who votes.** Nine super-nodes chosen at random for each application among those that passed the quality minimum in the period. The
  contract computes the choice with commit and reveal, as for super-node places (document 05, section 5.6), so nobody knows the panel in
  advance.
- **How each member decides.** Each member — the operator or the operator's agent — opens the sources and decides by its own judgment which
  of them to trust. No rule lists platforms, and no machine approves or refuses. Members see only what is public: nobody hands documents
  to an operator.
- **How votes are cast.** Each member first publishes the hash of its vote, then reveals the vote; until every vote is revealed, nobody can
  copy another's. After the reveal, votes are public.
- **The decision.** The mark is given when at least eight of the nine vote yes; otherwise the application is refused.
- **The pay.** The fee is divided equally among the members who voted. A member that does not vote receives nothing.

## 24.5 Challenges

- Anyone may challenge a mark: with an application of their own, the same fee and their own three sources.
- A new panel decides. If at least eight of the nine find for the challenger, the mark moves to the challenger's wallet; otherwise it
  stays.
- **What the loser loses.** A refused applicant loses its fee; a holder that loses a challenge loses the mark. No other mark is added —
  unlike a super-node's proven violation (document 06, section 6.4).

## 24.6 The start and the founder's mark

- **The start.** The procedure runs once ten super-nodes have passed the quality minimum in a period (changelog entries 40 and 41). With
  fewer, a decision would rest with a handful of operators.
- **The founder's mark.** Until then the contracts carry one mark, written at deployment: the founder's name as the founder is publicly
  known, the wallet address of the founder's node (changelog entry 41) and two sources — github.com/bolshiyanov and lagrix.dev. No
  documents are written into the contracts. It is the only exception to this procedure, and it lasts only until the procedure runs: from
  then on the founder's mark can be challenged like any other, which is also how the founder would recover it if the key were stolen.

## 24.7 How the mark reaches announcements

The marks live in the contract `OfficialMarks.sol`. An announcement of a marked element may carry a tag that points to its mark — for example
`["official", "<mark id>"]` in the announcement of document 17, section 17.1. A super-node shows the mark only after it finds the same
record in the contract for the same wallet; a tag without a matching record is ignored. The exact name of the tag is chosen at
implementation.

## 24.8 The cost we do not hide

- A panel can be deceived or bribed, and votes made public after the reveal can be checked by whoever paid for them. Eight of nine and a
  new panel for every challenge limit the damage; they do not remove it.
- A mark ties the whole history of a wallet — every payment through the network — to a person or an organisation. An official agent is
  best run on a node of its own.
- Until ten super-nodes pass the quality minimum, nobody except the founder can carry the mark.

## 24.9 Open questions

- How long the commit and reveal windows last.
- How often a mark may be challenged.
- Whether a panel member that does not vote is replaced by another chosen at random.
- Whether a holder may move its mark to a new wallet of its own without a challenge.
- How a super-node reads the marks of `OfficialMarks.sol` cheaply.

## Sources

- US Federal Trade Commission, Data Spotlight «Cryptocurrency buzz drives record investment scam losses», May 2021 —
  [ftc.gov](https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2021/05/cryptocurrency-buzz-drives-record-investment-scam-losses)
- Changelog, entry 49 — [000](000-changelog-2026-10-13.md)
