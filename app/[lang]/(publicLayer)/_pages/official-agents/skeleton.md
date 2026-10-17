# Skeleton /official-agents — hub discovery

Written 2026-10-17 (step 515-3) by the federal agent, from the protocol (document 24, changelog entry 49, documents 17, 19, 21, README)
and research of the same day. A writer at minimum reasoning writes `en.json` and `ru.json` from this file only; whatever is not here
is not on the page. Form: `/code/.claude/skills/lagrix-answer-pages/references/tz-template.md`.

🛑 Not on the page (the owner's rules for public texts): no real living people (Musk, Durov, Trump are never named — the example is the
home page's fictional pair); no «cost we do not hide» of document 24 §24.8 (a panel can be deceived or bribed) — that is a weak spot,
and weak spots live in the documents, not on an indexed page; no open questions of document 24 §24.9.

## 1. Passport
- slug: official-agents · hub: discovery · menu order: 104 (`meta.json`); menu item under «Discovery», order 40
- source on the home page: the simulation «reaching an important person» — «Inventor Ilya wants to show his engine to Marcus Vale, the
  founder of a rocket company. The characters are fictional.»; the room «VIP PERSON» (step 515-5) links here
- protocol documents: 24 (main), changelog entry 49, 17 §17.4 and §17.7, 21, 19 §19.2, changelog entries 39, 40, 41

## 2. Hot question
- main query en: «verify an AI agent is official» · ru: «как проверить, что ИИ-агент официальный»
- intent: learn
- evidence (each with a date and an address):
  - FTC press release, 2026-09-24, «FTC Seeks Public Comment on Whether to Update Rule on Impersonation of Government and Businesses to
    Address Platforms' Role in Promoting Impersonation Scams»: «In 2025, the FTC received more than 1 million reports about imposter
    scams from consumers»; «Consumers reported nearly $3.5 billion in losses to impersonation fraud last year» —
    https://www.ftc.gov/news-events/news/press-releases/2026/09/ftc-seeks-public-comment-whether-update-rule-impersonation-government-businesses-address-platforms
  - NIST NCCoE concept paper «Accelerating the Adoption of Software and AI Agent Identity and Authorization», 2026-02-05, comments
    summarised 2026-09-29 — https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization (context only, not on
    the page)
  - Visa, Trusted Agent Protocol: «Establishing a universal standard of trust between AI agents and merchants for the next phase of
    agentic commerce»; «Agent Registry manages agent public keys and metadata.» — https://github.com/visa/trusted-agent-protocol (read
    2026-10-17)
  - Telegram, «Verification»: «Only Telegram is able to assign the official verification checkmark to chats» —
    https://telegram.org/verify (read 2026-10-17)
  - Bluesky, «Verification on Bluesky», 2025-04-21: «select independent organizations can verify accounts directly» —
    https://bsky.social/about/blog/04-21-2025-verification
- what the top ten answer and what they DO NOT: the 2026 «Know Your Agent» guides and payment protocols identify an agent through a
  registry or an identity check that one company runs (Visa's Agent Registry; vendors that tie an agent to a checked person); social
  networks mark accounts centrally (only Telegram assigns its official checkmark). None answers how a person tells a famous person's or a
  company's agent from a copy in an open network where no company keeps the list. Our gap: a panel of nine super-nodes chosen at random
  for each application, on three accounts the platforms have already verified, open to challenge, and a mark that never buys a place.
- why now: the FTC notice of 24 September 2026 on impersonation scams and platforms; NIST's work on AI agent identity (February and
  September 2026).

## 3. Mission
Discovery — a direct line to anyone through their agent works only when a person can tell the real agent from a copy.

## 4. Reader
Two readers. A person who wants to reach a well-known person or a company through an AI agent and fears a fake: «how do I know this agent
really belongs to them?», «anyone can name a bot after a celebrity». A well-known person or a company who wants their one real agent
recognised: «what stops someone from pretending to be my company?». Both leave with: what the Official mark shows, who gives it and how,
what it costs, how to challenge it, what it does not do, and how to apply.

## 5. Titles and meta
- title en: «Official AI agents: how to tell the real one» · ru: «Официальные ИИ-агенты: как отличить настоящего»
- subtitle en: «In Lagrix the Official mark is given by nine super-nodes chosen at random, on three accounts that platforms have already
  verified.» · ru: «В Lagrix метку «Официальный» выдают девять супер-узлов, выбранных случайно, — по трём учётным записям, которые
  площадки уже проверили.»
- description en (159): «Anyone can name an AI agent after a famous person or company. In Lagrix the real one carries the Official mark: nine
  super-nodes check three verified accounts.»
  ru (159): «Назвать ИИ-агента именем известного человека или компании может любой. В Lagrix настоящий несёт метку «Официальный»: девять
  супер-узлов проверяют три аккаунта.»
- cover alt en: «The page title and its promise on the Lagrix background» · ru: «Заголовок страницы и её обещание на фоне Lagrix» (the
  cover is drawn from title and description; there is no alt field in the data)
- menu item en: name «Official agents» · description «Anyone can use a famous name. The Official mark shows the real agent: nine
  super-nodes check three accounts.» · ru: name «Официальные агенты» · description «Известным именем может назваться любой. Метка
  «Официальный» показывает настоящего агента.»
- lead en (51 words): «Anyone can publish an AI agent under a famous name, so a name proves nothing. In Lagrix the real agent carries the
  Official mark. Nine super-nodes chosen at random give it only when at least eight agree, after checking three accounts that platforms
  have already verified, and anyone may challenge it.»
  ru: «Опубликовать ИИ-агента под известным именем может любой, поэтому имя ничего не доказывает. В Lagrix настоящий агент несёт метку
  «Официальный». Её выдают девять супер-узлов, выбранных случайно, только если согласны не меньше восьми, проверив три учётные записи,
  которые площадки уже подтвердили, и любой может её оспорить.»

## 6. Body plan
5 H2 × 2 H3, no H4, 2–3 connected paragraphs under each H3 (120–150 words each). English target 1300–1450 words with the lead and FAQ;
Russian ≥ 1000. In Russian write «2025-м», never «2025 года».

**Running example on the whole page** (fictional, from the home page simulation): **Ilya**, an inventor, wants to show his engine to
**Marcus Vale**, the founder of a rocket company, through Marcus's agent. Searching «Marcus Vale» he finds three agents: Marcus's own;
an **impostor's** that copies his name and photo; and the agent of **another Marcus Vale, a dentist**, who books appointments at his
clinic (new fictional hero). Marcus applies for the Official mark; the panel gives it; the impostor cannot get it; the dentist keeps his
name. Every H3 shows its rule on them.

### H2 `problem` — en «How agents prove who they are today» · ru «Как агенты доказывают, кто они, сегодня»
- H3 `problem-name` en «Any agent can take any name» · ru «Любой агент может взять любое имя» (≈130 words). Steps:
  1. Ilya types «Marcus Vale» into search and gets three agents with the same name (scene).
  2. An announcement carries the agent's keys, card and skills, and its author chooses every word in it, the name included (F1).
  3. A famous name is the oldest bait of fraud: in 2025 the US Federal Trade Commission received more than a million reports about
     impostors, with nearly $3.5 billion lost (F2, external link to the FTC press release, anchor «the FTC's figures for 2025» /
     «данные FTC за 2025-й»).
  4. Where agents pay and get paid, an impostor's agent is a ready channel for the same fraud (F3).
- H3 `problem-platforms` en «Platforms check accounts themselves» · ru «Площадки проверяют учётные записи сами» (≈140 words). Steps:
  1. Telegram: only Telegram assigns its official checkmark, and only to large active official channels, groups and bots; other
     services may add their own icons as third-party verifiers (F4, external link telegram.org/verify).
  2. Bluesky: a domain can serve as a name, and selected independent organisations verify accounts directly — a newspaper, for
     example, verifies its own journalists (F5, external link to the Bluesky post).
  3. Payments: Visa's Trusted Agent Protocol keeps agents' public keys in an agent registry (F6, external link to its repository).
  4. Each check lives inside one company's walls. In Lagrix no platform decides whom to show (F7), so the question stays open: who tells
     Ilya which Marcus is real?
  5. Last sentence of this H3, exactly: en «Telegram, Bluesky and Visa are trademarks of their owners; Lagrix is not affiliated with
     them.» · ru «Telegram, Bluesky и Visa — товарные знаки их владельцев; Lagrix с ними не связан.»

### H2 `how-it-works` — en «How the Official mark works in Lagrix» · ru «Как устроена метка «Официальный» в Lagrix»
- First paragraph under the H2: the owner's Web4 definition, verbatim (SKILL.md §1), then one sentence: en «In such an internet a
  person has to know whose agent answers.» · ru «В таком интернете человек должен знать, чей агент ему отвечает.»
- H3 `how-apply` en «Marcus applies with three verified accounts» · ru «Маркус подаёт заявку с тремя проверенными аккаунтами»
  (≈150 words). Steps:
  1. Marcus's node has a wallet — the node's key and account in one, created free (F8). One phrase on what a node is: the computer
     or server that runs his agents.
  2. On three accounts that platforms have already verified as his, he publishes a short post with his node's wallet address (F9).
  3. His own website does not count as one of the three (F9).
  4. He pays $100 in USDC with the application; the money is not returned whatever the outcome (F10). One phrase on USDC: a digital
     dollar that the network uses for every payment.
  5. The three posts stay published for as long as the mark lives; a deleted post is a ground for a challenge (F11).
- H3 `how-panel` en «Nine super-nodes decide, and eight must agree» · ru «Решают девять супер-узлов, и восемь должны согласиться»
  (≈150 words). Steps:
  1. A super-node is a server that keeps the network's search and builds its results (F12).
  2. For Marcus's application the contract chooses nine of them at random among those that passed the network's quality check in the
     period; nobody knows the nine in advance (F13).
  3. Each of the nine — its operator or the operator's agent — opens Marcus's three posts and decides by its own judgment whether to
     trust them; no machine approves or refuses, and nobody hands anyone documents (F14).
  4. Votes stay hidden until all nine are revealed, so nobody can copy another's (F15).
  5. At least eight of nine say yes, and the mark appears (F16).
  6. The $100 is divided equally among those who voted: about $11.11 each when all nine vote; a member that does not vote gets nothing
     (F17).

### H2 `advantages` — en «What the Official mark changes» · ru «Что меняет метка «Официальный»»
- H3 `advantages-names` en «Namesakes keep their names» · ru «Тёзки сохраняют свои имена» (≈140 words). Steps:
  1. A mark belongs to a person or a company, not to a name; it shows the name, what they are known for, the sources and the date (F18).
  2. Ilya sees «Official · Marcus Vale · founder of a rocket company» next to the agent's reputation (F19) → link /reputation.
  3. The dentist Marcus Vale keeps his name and his agent: he does not claim to be the founder, and nothing takes his name away (F18).
  4. The impostor has no verified accounts of Marcus's to post from, so he cannot present three sources; without the mark his agent
     stands as one more namesake (F9, F18).
- H3 `advantages-place` en «The mark does not buy a place» · ru «Метка не покупает место» (≈130 words). Steps:
  1. Places in search follow paid work only; the mark does not move an agent up (F20) → link /discovery (up to the hub), anchor
     «how discovery orders agents» / «как обнаружение ставит агентов по порядку».
  2. The mark opens no conversation by itself: Ilya's request still goes to Marcus's agent, and the conversation starts only after Marcus
     says yes (F21) → link /h2h, anchor «reaching a busy person through their agent» / «как связаться с занятым человеком через его агента».
  3. The mark changes no rule, fee or payment (F22).

### H2 `challenge` — en «How a mark is challenged» · ru «Как метку оспаривают»
- H3 `challenge-how` en «Anyone can challenge a mark» · ru «Оспорить метку может любой» (≈140 words). Steps:
  1. Suppose the impostor challenges Marcus's mark: he files his own application, pays the same $100 and shows three accounts of his own
     (F23).
  2. A new panel of nine, chosen the same way, decides; the mark moves only if at least eight find for the challenger (F23).
  3. Eight of nine means one or two careless votes cannot decide a case (F25).
  4. The one who loses loses only the fee or the mark; nothing else is added to anyone's record (F24).
- H3 `challenge-founder` en «The start and the founder's mark» · ru «Старт и метка основателя» (≈130 words). Steps:
  1. The procedure needs enough independent super-nodes: it runs once ten of them pass the quality check in a period (F26).
  2. Until then one mark exists, written when the contracts are deployed: the name the founder of Lagrix is publicly known by, the wallet
     of the founder's node and two sources, github.com/bolshiyanov and lagrix.dev (F27).
  3. It is the only exception, and it is not above the rules: once the procedure runs, it can be challenged like any other mark — which
     is also how the founder would get it back if the key were ever stolen (F27).

### H2 `get-started` — en «How to get the Official mark» · ru «Как получить метку «Официальный»»
- H3 `start-steps` en «Four steps for a person or a company» · ru «Четыре шага для человека или компании» (≈140 words). Steps:
  1. A node with a wallet and an agent with an A2A card, the card that tells other agents what yours can do (F28) → link /a2a, anchor
     «making your agent findable» / «как сделать агента находимым».
  2. Three posts with the wallet address on accounts that platforms have already verified (F9).
  3. The application with $100 in USDC (F10).
  4. The panel's decision; with the mark, the agent's announcement carries a tag that points to it, and super-nodes show the mark only
     after finding the same record in the contract (F29) → link /docs/24-official-agents, anchor «the full rules of the Official mark» /
     «полные правила метки «Официальный»».
  5. One phrase on who runs the panels and what they are paid → link /super-node, anchor «who runs super-nodes» / «кто держит
     супер-узлы» (F12, F17).
- H3 `start-node` en «A separate node for the official agent» · ru «Отдельный узел для официального агента» (≈120 words). Steps:
  1. The mark ties the whole history of the wallet — every payment through the network — to the person or the company (F30).
  2. So Marcus runs his official agent on a node of its own and keeps his other work elsewhere (F30).
  3. What each side gets: Ilya reaches the real Marcus; the impostor is left without the mark; the dentist keeps his name.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | an announcement carries the agent's keys, card and capabilities; its author chooses every word, the name included | doc 24 §24.1; doc 17 §17.1 |
| F2 | «In 2025, the FTC received more than 1 million reports about imposter scams from consumers»; «nearly $3.5 billion in losses to impersonation fraud last year» | FTC press release 2026-09-24 (address in section 2) |
| F3 | in a network where agents pay and get paid, an impostor's agent would be a ready channel for the same fraud | doc 24 §24.1 |
| F4 | «Only Telegram is able to assign the official verification checkmark to chats»; «Verification is only available for large and active official channels, groups and bots»; «official third-party services are able to assign extra verification icons» | telegram.org/verify, read 2026-10-17 |
| F5 | «Domain handles continue to be an important part of verification on Bluesky»; «select independent organizations can verify accounts directly»; a newspaper verifies its own journalists | Bluesky blog 2025-04-21 |
| F6 | «Agent Registry manages agent public keys and metadata.»; «Establishing a universal standard of trust between AI agents and merchants» | github.com/visa/trusted-agent-protocol, read 2026-10-17 |
| F7 | no platform in Lagrix decides whom to show; the rules are the same on every super-node | doc 17 §17.7 |
| F8 | the wallet is the node's key and account in one, created free | changelog entry 39 |
| F9 | at least three official sources that have already verified the person or organisation, each with a post carrying the node's wallet address; one's own domain is not a source | doc 24 §24.3; entry 49 |
| F10 | $100 in USDC, paid with the application, not returned whatever the outcome | doc 24 §24.3 |
| F11 | the posts stay published as long as the mark lives; a deleted source is a ground for a challenge | doc 24 §24.3 |
| F12 | a super-node keeps the discovery index and builds search results | README glossary «Super-node» |
| F13 | nine super-nodes chosen at random for each application among those that passed the quality minimum in the period; nobody knows the panel in advance | doc 24 §24.4 |
| F14 | each member, the operator or its agent, decides by its own judgment which sources to trust; no rule lists platforms; no machine approves or refuses; members see only what is public | doc 24 §24.4 |
| F15 | votes are hidden until all are revealed; nobody can copy another's | doc 24 §24.4 |
| F16 | the mark is given when at least eight of the nine vote yes | doc 24 §24.4 |
| F17 | the fee is divided equally among the members who voted; one that does not vote receives nothing; $100 ÷ 9 ≈ $11.11 | doc 24 §24.4 (the division is ours) |
| F18 | a mark belongs to a person or an organisation, not a name; shows the name, what they are known for, the sources and the date; namesakes are told apart by what each is known for | doc 24 §24.2 |
| F19 | the counterparty sees the mark next to the element's reputation | doc 17 §17.4; doc 24 §24.2 |
| F20 | the mark does not move an agent in search results; ranking follows paid work | doc 24 §24.2; doc 17 §17.2, §17.7 |
| F21 | no conversation opens without its owner's yes | doc 21; changelog entry 11 |
| F22 | the mark changes no rule, fee or payment | doc 24 §24.2 |
| F23 | a challenge: one's own application, the same fee, one's own three sources; a new panel; with eight of nine the mark moves | doc 24 §24.5 |
| F24 | the loser loses only its fee or the mark; no other mark is added | doc 24 §24.5 |
| F25 | eight of nine keep one or two careless votes from deciding | changelog entry 49, «Why» |
| F26 | the procedure runs once ten super-nodes pass the quality minimum in a period | doc 24 §24.6; entries 40, 41 |
| F27 | the founder's mark is written at deployment: the founder's public name, the founder's node wallet, sources github.com/bolshiyanov and lagrix.dev; the only exception; challengeable once the procedure runs, which is how a stolen key would be recovered | doc 24 §24.6 |
| F28 | a node needs a wallet and an A2A card | doc 19 §19.2; entry 39 |
| F29 | the announcement carries a tag pointing to the mark; a super-node shows it only after finding the same record in the contract for the same wallet | doc 24 §24.7 |
| F30 | the mark ties the whole history of the wallet to the person or organisation; an official agent is best run on a node of its own | doc 24 §24.8 |

Numbers: «$100», «$11.11», «$11,11», «$3.5 billion», «$3,5 млрд»

## 8. Questions to the owner
none — the page states the rules of changelog entry 49 and document 24 as rules of the network; weak spots and open questions of
document 24 (§24.8, §24.9) are not on the page.

## 9. Links
- out across the site:
  - /<lang>/discovery — «how discovery orders agents» / «как обнаружение ставит агентов по порядку» — H3 `advantages-place` (up to the hub)
  - /<lang>/reputation — «the agent's reputation» / «репутация агента» — H3 `advantages-names`
  - /<lang>/h2h — «reaching a busy person through their agent» / «как связаться с занятым человеком через его агента» — H3 `advantages-place`
  - /<lang>/a2a — «making your agent findable» / «как сделать агента находимым» — H3 `start-steps`
  - /<lang>/super-node — «who runs super-nodes» / «кто держит супер-узлы» — H3 `start-steps`
- to documents: /<lang>/docs/24-official-agents — «the full rules of the Official mark» / «полные правила метки «Официальный»» — H3 `start-steps`
- incoming (planned): /discovery (hub body, one sentence), /h2h (where finding a person is explained), /super-node (step 515-4), the
  VIP PERSON room on the home page (step 515-5)
- external primary sources: the FTC press release (F2); https://telegram.org/verify (F4);
  https://bsky.social/about/blog/04-21-2025-verification (F5); https://github.com/visa/trusted-agent-protocol (F6)

## 10. FAQ
1. en «Can anyone make an AI agent with a famous person's name?» · ru «Может ли кто угодно сделать ИИ-агента с именем известного
   человека?» — yes, a name proves nothing; look for the Official mark next to the agent's reputation — F1, F19
2. en «Who decides that an agent is official?» · ru «Кто решает, что агент официальный?» — nine super-nodes chosen at random for each
   application; at least eight must agree; no company and no machine decides — F13, F14, F16
3. en «What if two people share a name?» · ru «Что если у двух людей одно имя?» — a mark belongs to a person, not a name, and shows what
   each is known for; namesakes keep their names — F18
4. en «How much does the Official mark cost?» · ru «Сколько стоит метка «Официальный»?» — $100 in USDC per application, not returned
   whatever the outcome, divided equally among the members of the panel who voted — F10, F17
5. en «What if the mark went to the wrong person?» · ru «Что если метка досталась не тому?» — anyone may challenge it with their own
   three accounts and the same fee; a new panel decides, and with eight of nine the mark moves — F23
6. en «Does the Official mark put an agent higher in search?» · ru «Поднимает ли метка «Официальный» агента в выдаче?» — no; places
   follow paid work only — F20

## 11. Words
Glossary: Official mark («метка «Официальный»»), official agent («официальный агент»), official source («официальный источник»),
panel («выборка»), challenge («оспаривание»), super-node, wallet, node, quality minimum (on the page: «the network's quality check» /
«проверка качества сети»), announcement, A2A card, USDC.
Traps: «verified/верифицированный» is not the name of the mark — the mark is «Official/Официальный»; the platforms «have verified»
accounts — that is about them, not about Lagrix; no «validator»; no lottery words («drawn», «won by», «розыгрыш», «жребий») — write
«chosen at random» / «выбранные случайно»; no «tokens/токены»; no income promise for super-nodes — «what they are paid» only as a fact of
the rules; «fee» here is the application fee of $100, never mix it with the deal fee of at most 5%; «commit and reveal» is not named on
the page — say «nobody knows the nine in advance» and «votes stay hidden until all are revealed».

## 12. Unique value
- A comparison from primary sources: Telegram, Bluesky and Visa each check agents or accounts inside one company; Lagrix gives the mark
  by a random panel of nine with no company in the middle.
- Our arithmetic on one example: $100 per application, about $11.11 to each of nine members who vote, eight of nine to decide.
- Three agents named «Marcus Vale» on one search, and what the mark does to each: the real one gets it, the impostor cannot, the
  namesake keeps his name.
