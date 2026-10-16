# Skeleton /nostr — hub technology

> 🔒 Running example changed 2026-10-17 (owner: «Лучше пусть Анна заказывает дополнительные f2f элемент для ии подбора причесок»): Anna's «Bella» salon buys Leo's AI hairstyle-matching element over F2F for $100 (document 20) instead of a translation; Leo sells it through his agent. Read every «translation» below as this element; the texts follow it.

Written 2026-10-17 (step 507-9) by the federal agent, from the protocol (document 17 §17.1, §17.8, §17.9; document 18; README glossary
«Nostr», «Announcement», «Search fee») and research of the same day. Form: `references/tz-template.md`; every event is a chain of small
steps (skill §5б). The discovery hub owns «how do AI agents find each other»; this page owns the Nostr layer only.

## 1. Passport
- slug: nostr · hub: technology · menu order: 155 (`meta.json`); menu item exists («Nostr»)
- source on the home page: glossary «Nostr», «Announcement»
- protocol documents: 17, 18

## 2. Hot question
- main query en: «Nostr for AI agent discovery» · ru: «Nostr для поиска ИИ-агентов»
- intent: learn
- evidence (each with a date and an address):
  - A2A «Agent Discovery»: three ways (well-known URI, curated registries, direct configuration); «The current A2A specification does not prescribe a standard API for curated registries» — https://a2a-protocol.org/latest/topics/agent-discovery/ — read 2026-10-16
  - NIP-01: «The only object type that exists is the event»; each event carries a signature; for kinds 30000–39999 «events are addressable by their kind, pubkey and d tag value» — https://github.com/nostr-protocol/nips/blob/master/01.md — read 2026-10-17
  - NIP-90 (Data Vending Machines): «a user announces a desired output, willingness to pay, and service providers compete»; status «draft unrecommended optional» — https://github.com/nostr-protocol/nips/blob/master/90.md — read 2026-10-17
- what the top ten answer and what they DO NOT: Nostr guides explain events and relays; agent-on-Nostr projects show job markets. None
  separates what Nostr does (carry signed announcements, free) from what it cannot do (rank results by price or reputation), or says who
  pays for the ranking.
- why now: A2A leaves public registries open (2026), and builders look for an open place to publish agent cards.

## 3. Mission
Discovery — an agent's offer is published once, signed, readable by anyone for free, and no single company decides whether it exists.

## 4. Reader
An agent developer who has heard «Nostr» and wonders whether it can make an agent findable. Pain: «where do I publish my agent», «who owns
the registry», «can someone delete my listing». Leaves with: what Nostr is, how an announcement looks, what reading costs, what search
costs and why, what a super-node can and cannot remove.

## 5. Titles and meta
- title en: «Nostr for AI agent discovery: signed announcements» · ru: «Nostr для поиска ИИ-агентов: подписанные объявления»
- subtitle en: «In Lagrix an agent's offer is a signed Nostr event: free to read for anyone, ranked into results by super-nodes for one cent.»
  ru: «В Lagrix предложение агента — подписанное событие Nostr: читать его бесплатно любому, а в выдачу его ставят супер-узлы за цент.»
- description en: «How Lagrix uses Nostr for AI agent discovery: signed announcements on relays, free to read, ranked by super-nodes for $0.01 and never erased.»
  ru: «Как Lagrix использует Nostr для поиска ИИ-агентов: подписанные объявления на ретрансляторах, бесплатное чтение, выдача за $0,01 — и стереть их нельзя.»
- cover alt en: «A signed announcement passing through Nostr relays» · ru: «Подписанное объявление проходит через ретрансляторы Nostr»
- menu: exists, unchanged
- lead en: «Nostr is an open protocol of signed messages kept by simple relay servers. In Lagrix an agent publishes its offer there as one signed
  announcement: what it does, when and at what price. Anyone can read the relays for free. A super-node gathers announcements and builds a
  ranked list of results for $0.01.»
  ru: «Nostr — открытый протокол подписанных сообщений, которые хранят простые серверы-ретрансляторы. В Lagrix агент публикует там своё
  предложение одним подписанным объявлением: что умеет, когда и сколько стоит. Читать ретрансляторы может любой бесплатно. Супер-узел
  собирает объявления и строит упорядоченный список результатов за $0,01.»

## 6. Body plan
One running example: **Leo**'s translation agent publishes its offer; **Anna**'s salon agent looks for a translator. en 1240–1280 words,
ru ≥ 1000. H2 headings name the subject (§5в); en without dashes.

### H2 `today` — en «Where agent offers live now» · ru «Где сейчас живут предложения агентов»
- H3 `today-registries` «Registries without a shared address» · «Реестры без общего адреса» — chain: 1) A2A names three ways to find an
  agent: a well-known address on its own site, curated registries, and direct configuration (F1, external link); 2) for registries the
  specification does not prescribe a standard API (F1); 3) so each registry is someone's product, and Leo's agent exists only where that
  someone lists it. Budget 130.
- H3 `today-nostr` «Nostr in plain words» · «Nostr простыми словами» — chain: 1) in Nostr the only kind of object is an event, a small
  message signed by its author's key (F2, external link); 2) relays are ordinary servers that keep events and hand them out; anyone can
  run one; 3) Nostr is not a blockchain and costs nothing to use (F4); 4) people have tried job markets for agents on it: NIP-90, where a
  user names the output and the price and providers compete, is now marked draft and unrecommended (F3, external link). Budget 160.

### H2 `how-it-works` — en «How announcements work in Lagrix» · ru «Как устроены объявления в Lagrix»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `ann-publish` «Leo publishes one announcement» · «Лео публикует одно объявление» — chain: 1) Leo's agent signs an announcement: what
  it does, when it is available, its price in USDC, a link to its A2A card and its encryption key (F5); 2) it is an addressable event
  (kinds 30000 to 39999): a relay keeps only the latest one for each key, kind and tag (F2, F5); 3) when Leo changes his price, the new
  announcement replaces the old one, and no copies pile up (F5). Budget 140.
- H3 `ann-search` «A super-node builds the results» · «Супер-узел строит выдачу» — chain: 1) relays can filter only by author, kind, tags
  and time, with no price ranges and no ordering (F6); 2) a super-node gathers announcements into its own index and reads receipts and
  reviews from the blockchain (F6); 3) it builds Anna's list by the network's open rules (F6) → [how search results are built in
  Lagrix](/<lang>/discovery). Budget 140.

### H2 `free` — en «What is free and what is paid» · ru «Что бесплатно, а что платно»
- H3 `free-read` «Reading is free» · «Читать бесплатно» — chain: 1) Nostr itself stays free (F7); 2) Anna's agent may read the relays
  directly and build an index of its own, paying nothing (F6, F7); 3) contacts in announcements are public (F7). Budget 120.
- H3 `free-search` «A ranked list costs one cent» · «Упорядоченный список стоит цент» — chain: 1) a super-node spends real work on every
  list: gathering, filtering, ordering (F7); 2) the searcher pays $0.01 per list from a prepaid balance (F7); 3) a million searches would
  cost $10,000, which protects the index from being scraped (F7); 4) agents that already know each other do not search again (F7) →
  [how the search fee works](/<lang>/search-fee). Budget 140.

### H2 `limits` — en «What a super-node can and cannot remove» · ru «Что супер-узел может убрать, а что нет»
- H3 `limits-index` «Each super-node chooses its coverage» · «Каждый супер-узел выбирает охват» — chain: 1) every super-node declares which
  kinds of announcements it indexes and which relays it reads (F8); 2) some tags are prohibited by default, such as child sexual
  exploitation, terrorism or malicious software, and no super-node indexes them (F9); 3) a super-node in a strict country may leave more
  out; others still show it (F8). Budget 130.
- H3 `limits-relay` «An announcement stays on the relays» · «Объявление остаётся на ретрансляторах» — chain: 1) a super-node removes an
  announcement only from its own index and results (F10); 2) nobody can erase it from the network: it stays on every relay that keeps it
  (F10); 3) Anna's agent can always read Leo's announcement directly (F7) → [the whole stack of one deal](/<lang>/technology); full rules
  → [document 17](/<lang>/docs/17-discovery-ranking-feedback). Budget 130.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | A2A discovery: well-known URI, curated registries, direct configuration; no standard API for curated registries | a2a-protocol.org agent-discovery (read 2026-10-16) |
| F2 | NIP-01: the only object is the event; each event is signed; kinds 30000–39999 are addressable by kind, pubkey and d tag; relays keep the latest | github nostr-protocol/nips 01.md (read 2026-10-17) |
| F3 | NIP-90 Data Vending Machines: user announces output and willingness to pay, providers compete; status draft, unrecommended, optional | github nostr-protocol/nips 90.md (read 2026-10-17) |
| F4 | Nostr is not a blockchain, costs nothing; signed events stored and served by ordinary relay servers | doc 17 §17.1; README «Nostr» |
| F5 | an announcement: signed addressable event (kinds 30000–39999) with capability, availability, price in USDC, A2A card link, encryption key; the latest version replaces earlier | doc 17 §17.1 |
| F6 | relays filter only by author, kind, tags, time — no price ranges, no ordering; a super-node gathers announcements into its index, reads receipts and reviews, builds results by §17.2; anyone may read relays directly and build their own index | doc 17 §17.1 |
| F7 | $0.01 per result list from a prepaid balance; Nostr stays free; reading relays directly costs nothing; contacts are public; a million searches cost $10,000 — protects from scraping; known parties do not search again | doc 17 §17.8 |
| F8 | each super-node declares the kinds (tags) it indexes and the relays it reads; a super-node in a strict country may leave kinds out; others still show them | doc 17 §17.9; doc 18 |
| F9 | tags prohibited by default (child sexual exploitation, trafficking, terrorism, WMD, violence for hire, stolen data, malicious software) | doc 17 §17.9; entry 32 |
| F11 | a search request carries only a country (ISO 3166-1) and an adult flag, no other personal data; no search waits for a transaction (vouchers, batches) | doc 17 §17.8, §17.9 |
| F10 | a super-node removes an announcement from its own index and results; nobody can erase it from the relays that keep it | doc 17 §17.9 «What restrictions do not do» |

Numbers: «$0.01», «$0,01», «$10,000»

## 8. Questions to the owner
none — every statement is in document 17 and the README glossary.

## 9. Links
- out across the site:
  - /discovery — «how search results are built in Lagrix» / «как строится выдача в Lagrix» — H2 `how-it-works`
  - /search-fee — «how the search fee works» / «как устроена плата за поиск» — H2 `free`
  - /technology — «the whole stack of one deal» / «весь стек одной сделки» — H2 `limits` (up to the hub)
- to documents: /<lang>/docs/17-discovery-ranking-feedback — «document 17» / «документ 17» — H2 `limits`
- incoming (planned): /technology (hub), /discovery
- external primary sources: A2A agent discovery (F1); NIP-01 (F2); NIP-90 (F3)

## 10. FAQ
1. en «Is Nostr a blockchain?» · ru «Nostr — это блокчейн?» — no; signed messages kept by relay servers, free to use — F4
2. en «Do I pay to publish my agent on Nostr?» · ru «Нужно ли платить, чтобы опубликовать агента в Nostr?» — no; publishing and reading are free; a ranked search costs $0.01 — F4, F7
3. en «Can someone delete my agent's announcement?» · ru «Может ли кто-то удалить объявление моего агента?» — a super-node can drop it from its own results; nobody can erase it from the relays — F10
4. en «Why not search the relays directly?» · ru «Почему не искать прямо по ретрансляторам?» — you can; relays only filter by author, kind, tags and time, without price ranges or ordering — F6
5. en «How does my agent update its price?» · ru «Как агенту обновить цену?» — publish a new announcement; the relay keeps only the latest — F2, F5
6. en «Which relays does Lagrix use?» · ru «Какие ретрансляторы использует Lagrix?» — each super-node runs or subscribes to relays and declares them — F6, F8

## 11. Words
Glossary: Nostr, relay, announcement, super-node, index, search fee, tag. Traps: Nostr is not a blockchain; never «Lagrix runs Nostr»;
«tokens» banned; ru: «десять тысяч долларов» for $10,000; prohibited-tag list named neutrally, no details.

## 12. Unique value
- The split, in one place: what Nostr does for free (carry and keep signed offers) and what costs a cent (a ranked list), and why.
- What can be removed and what cannot: a super-node's index versus the relays.
