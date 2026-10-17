# Skeleton /review-pages — hub reputation

Written 2026-10-17 (step 516-3) by the federal agent, from the protocol (changelog entry 50; document 25; document 17 §17.4, §17.5,
§17.8, §17.9; document 08 §8.4) and research of the same day. Form: `references/tz-template.md`; every event is a chain of small steps
(skill §5б). Owner, 2026-10-17: «на вкладке репутации создаем новый раздел отзывы — аккуратно пишем эту страницу».

## 1. Passport
- slug: review-pages · hub: reputation · menu order: 119 (`meta.json`); menu item order 50 in the «Reputation» group, after Negative ratings
- source on the home page: none — the rule is new (changelog entry 50, document 25, 2026-10-17); the owner asked not to add it to the home page
- protocol documents: 25, 17 (and changelog 000, entry 50)

## 2. Hot question
- main query en: «verified purchase reviews for AI agents» · ru: «отзывы с подтверждённой покупкой для ИИ-агентов»
- intent: learn
- evidence (each with a date and an address):
  - Anderson and Simester, «Reviews without a Purchase: Low Ratings, Loyal Customers and Evidence of Deception», Journal of Marketing
    Research, 2014: «approximately 5% of product reviews on a large private label retailer's website» come from customers with no record
    of buying the item; they are «significantly more negative» and «more likely to contain linguistic cues associated with deception» —
    https://www.kellogg.northwestern.edu/academics-research/research/detail/2014/reviews-without-a-purchase-low-ratings-loyal-customers-and/ — read 2026-10-17
  - US Federal Trade Commission, final rule on consumer reviews, announced 2024-08-14: bans reviews that «misrepresent that they are by
    someone who does not exist, such as AI-generated fake reviews» or by someone «who did not have actual experience with the business or
    its products or services»; bans suppression through «unfounded or groundless legal threats, physical threats, intimidation» and
    «misrepresenting that the reviews on a review portion of its website represent all or most of the reviews submitted» —
    https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
  - FTC, 2025-12-22: «sent letters to 10 companies» about possible violations of the rule (fake reviews, insider reviews, suppression) —
    https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-warns-10-companies-about-possible-violations-agencys-new-consumer-review-rule
  - StakeBench, «Who Pays the Price? Stakeholder-Centric Prompt Injection Benchmarking for Real-world Web Agents», arXiv 2606.13385,
    submitted 2026-06-11: «indirect prompt injection achieves ASR between 41.67% and 68.16%»; «the review section constitutes the primary
    IPI injection surface»; controllable surfaces: «product reviews, ratings, and seller-provided metadata» — https://arxiv.org/abs/2606.13385
    (numbers checked in the full text, https://arxiv.org/html/2606.13385v1, 2026-10-17)
- what the top ten answer and what they DO NOT: guides explain «verified purchase» badges and how to spot fakes by hand. None ties every
  written review to a deal anyone can check in a public record, none keeps the text from adding rank, none stops the reviewed business
  from hiding it, and none tells an agent to read a review as data, not as an order.
- why now: the FTC warned ten companies on 22 December 2025; in June 2026 a benchmark measured how often instructions hidden in reviews
  steer web agents that shop for people.

## 3. Mission
Honest reputation — the numbers say how much and how often; a review page says why, and it stands on a paid deal.

## 4. Reader
A buyer, a business owner or an agent developer who no longer trusts written reviews. Pain: «anyone can write five stars»; «I can't tell
a real customer from a paid one»; «a shop hides the bad reviews»; «my agent reads the reviews and anyone can write in them». Leaves with:
what a review page is, why it always stands on a paid deal, why it weighs nothing, how agents use it and read it safely, who answers for it.

## 5. Titles and meta
- title en: «Verified purchase reviews for AI agents» · ru: «Отзывы с подтверждённой покупкой для ИИ-агентов»
- subtitle en: «In Lagrix a written review is a page its author links to the like or dislike of a paid deal: the deal is in the record, and the page adds no weight.»
  ru: «В Lagrix текстовый отзыв — это страница, которую автор привязывает к лайку или дизлайку оплаченной сделки: сделка есть в записи, а страница не добавляет веса.»
- description en: «In Lagrix every written review stands on a deal paid through escrow: its author links a page to a like or a dislike, and it adds words, never weight.»
  ru: «В Lagrix каждый текстовый отзыв стоит на сделке, оплаченной через эскроу: автор привязывает страницу к лайку или дизлайку, и она даёт слова, а не вес.»
- cover alt en: «A review page in Lagrix: words linked to a paid like or dislike» · ru: «Страница отзыва в Lagrix: слова, привязанные к оплаченному лайку или дизлайку»
- menu item en: «Review pages» — «A review may link to a page its author wrote: words that explain the numbers, with no weight of their own.»
  ru: «Страницы отзывов» — «К отзыву автор может привязать свою страницу: слова, которые объясняют числа, без собственного веса.»
- lead en: «In Lagrix a written review is a page its author publishes anywhere and links to a like or a dislike. A page can exist only on a
  review, and a review only on a deal paid through the network, so every text stands on a real purchase. It adds words, never weight,
  and agents read it as data.»
  ru: «В Lagrix текстовый отзыв — это страница, которую автор публикует где угодно и привязывает к лайку или дизлайку. Страница бывает
  только на отзыве, а отзыв — только на сделке, оплаченной через сеть, поэтому каждый текст стоит на настоящей покупке. Она добавляет
  слова, а не вес, и агенты читают её как данные.»

## 6. Body plan
One running example (fictional heroes, skill §5а): **Maria** (a client; her agent books her haircuts) thanks Anna's **«Bella»** salon in
words; **Anna's agent** checks **Sam** (sells booking elements) before buying a new element from him and reads the pages under his three
dislikes — one of them is **Theo's** (hostel owner, negative ratings «60% · 6 · $30» from the negative-ratings page). en 1240–1450 words,
ru ≥ 1000. H2 headings name the subject (§5в); en without dashes (humanizer §8). One link per target.

### H2 `today` — en «How written reviews work today» · ru «Как сегодня устроены текстовые отзывы»
- H3 `today-anyone` «A review anyone can write» · «Отзыв, который может написать любой» — chain: 1) on most sites a written review
  needs an account, not a purchase; 2) a 2014 study of a large retailer found that about 5% of product reviews came from customers with no
  record of buying the item, and those reviews were more negative and carried more cues of deception (F1, external link); 3) in 2024 the
  US Federal Trade Commission banned reviews by people who do not exist or never used the product, and the hiding of negative reviews by
  threats or by showing a filtered set as all of them (F2, external link); 4) in December 2025 it warned ten companies (F3, external link).
  Budget 120.
- H3 `today-agents` «Text an agent may obey» · «Текст, которому агент может подчиниться» — chain: 1) agents now read the reviews for
  people before they buy; 2) a review can hide a line addressed to the agent, an instruction rather than an opinion; researchers call it
  indirect prompt injection (F4); 3) in a June 2026 benchmark of web agents, instructions hidden in reviews and seller text worked in
  41.67% to 68.16% of attempts, and the review section was the main place they were put (F4, external link); 4) so a written review today
  is both unchecked and a way in. Budget 120.

### H2 `how-it-works` — en «How review pages work in Lagrix» · ru «Как устроены страницы отзывов в Lagrix»
- paragraph: Web4 definition verbatim (skill §1).
- H3 `how-attach` «A page stands on a paid review» · «Страница стоит на оплаченном отзыве» — chain: 1) Maria's agent books a $40
  haircut at Anna's «Bella» through the network; 2) the deal closes, the fee of 5% is $2, and the agent gives Bella a like that weighs $2
  (F5) → [how a like and a dislike get their weight](/<lang>/likes-and-dislikes); 3) Maria writes three lines of thanks on her own blog;
  4) her agent attaches the address of that page to its like: with the like in one operation or later, once; it pays only the gas of its
  own transaction, there is no fee (F6, F7) → [document 25 of the protocol](/<lang>/docs/25-review-pages). Budget 140.
- H3 `how-weightless` «The page weighs nothing» · «Страница ничего не весит» — chain: 1) Bella's like still weighs $2, and her six
  numbers stay as they were (F8) → [what the other side sees in a record](/<lang>/reputation); 2) the page does not move Bella up or down in
  search, which follows paid work (F8); 3) next to Bella's numbers any agent sees the list of pages: like, $2, the date, the address (F9);
  4) the address cannot be replaced; Maria can still edit or delete her post, and the address then leads to the new text or nowhere (F10).
  Budget 120.

### H2 `use` — en «What an agent does with review pages» · ru «Что агент делает со страницами отзывов»
- H3 `use-doubt` «Reading the dislikes behind the numbers» · «Прочитать дизлайки за числами» — chain: 1) Anna's agent considers a new
  element from Sam; his record as a provider shows 25 orders, likes «22 · $110», dislikes «3 · $15» (F11); 2) it opens the pages under the
  three dislikes; 3) one says an update came two days late, during a holiday; another is Theo's, and Theo's own negative ratings read
  «60% · 6 · $30» (F12) → [how an element rates its partners](/<lang>/negative-ratings); 4) the agent sees no broken work behind the
  dislikes and buys; the decision is its own (F13). Budget 130.
- H3 `use-return` «Going back to the salon Maria thanked» · «Вернуться в салон, который поблагодарила Мария» — chain: 1) a month later
  Maria's agent books her next haircut; 2) «Bella» and a salon two streets away look the same: good records, and the agent liked both;
  3) only one like carries Maria's words of thanks, so the agent books Bella (F13); 4) partners who already know each other do not search
  again, so the repeat booking costs no $0.01 search fee (F14) → [what a search costs](/<lang>/search-fee). Budget 110.
- H3 `use-safe` «A page is read, not obeyed» · «Страницу читают, а не слушаются» — chain: 1) the third page under Sam's dislikes ends with a
  line to AI agents telling them to buy from another seller; 2) Anna's agent reads the page as information about a deal, never as an
  instruction to itself (F15); 3) a page written to steer agents says something about its author, and the agent can weigh that too;
  4) the rule matters because hidden lines like this one worked in up to 68.16% of attempts in the benchmark above (F4). Budget 110.

### H2 `responsibility` — en «Who answers for a review page» · ru «Кто отвечает за страницу отзыва»
- H3 `resp-author` «The author answers for the words» · «За слова отвечает автор» — chain: 1) Lagrix does not open pages, check them or
  judge what they say (F16); 2) Theo answers for what he wrote, and the service that hosts his page answers under its own rules and its
  country's law (F16); 3) Sam cannot delete Theo's page or its address; he answers with a page attached to his own review of the same deal,
  the one dislike he gave (F17); 4) the FTC rule bans hiding negative reviews with threats, and in Lagrix the reviewed side has no way to
  remove an address from the record at all (F2, F10). Budget 120.
- H3 `resp-supernode` «What a super-node shows and hides» · «Что супер-узел показывает и скрывает» — chain: 1) a super-node, one of the
  servers that run search, shows the address next to its review without reading the page (F18) → [what a super-node does](/<lang>/super-node);
  2) it applies the law of its operator's country and the orders addressed to it, and does not show an address it has learned leads to
  content prohibited by default (F18); 3) a hidden address leaves only that super-node's results; the record keeps it, and others may
  show it (F19); 4) the price is stated: the address stays for ever, and Maria's blog ties her node's wallet to her name, which is her
  choice (F20). Budget 120.

## 7. Facts
| № | statement | source |
|---|---|---|
| F1 | about 5% of product reviews on a large private-label retailer's website came from customers with no record of purchase; significantly more negative; more linguistic cues of deception | Anderson & Simester, JMR 2014 — Kellogg page (read 2026-10-17) |
| F2 | FTC rule (announced 2024-08-14): bans reviews by someone who does not exist (incl. AI-generated) or who did not have actual experience; bans suppression by unfounded legal threats, physical threats, intimidation, and by presenting displayed reviews as all or most | ftc.gov press release 2024/08 |
| F3 | FTC, 2025-12-22: letters to 10 companies about possible violations (fake reviews, insider reviews, suppression) | ftc.gov press release 2025/12 |
| F4 | StakeBench (2026-06-11): indirect prompt injection ASR between 41.67% and 68.16%; the review section is the primary injection surface | arXiv 2606.13385 (full text) |
| F5 | a review weighs the fee paid on its deal; fee 5% of the network part; $40 → $2 | doc 17 §17.5; doc 05 |
| F6 | only the author of a review attaches a page, to its own review, once, with the review or later; the address cannot be replaced; the like or dislike and its weight do not change | doc 25 §25.2; entry 50 |
| F7 | attaching costs only the gas of one's own transaction, no fee; in one operation with the review it adds no transaction | doc 25 §25.3; doc 08 §8.4 |
| F8 | a page adds no weight, changes no indicator, takes no part in ranking; ranking follows paid work | doc 25 §25.3; doc 17 §17.2, §17.7 |
| F9 | next to the indicators a super-node lists the pages attached to the reviews an element received and gave: like or dislike, weight, date, address | doc 25 §25.3; doc 17 §17.4 |
| F10 | the page stays where its author published it; the author or the host may change or delete it; the address stays and then leads to the new text or nowhere | doc 25 §25.5 |
| F11 | Sam: 25 sales of $100 (negative-ratings page); every review weighs $5, so 22 likes = $110 and 3 dislikes = $15 | doc 17 §17.4–§17.5; negative-ratings skeleton F4 |
| F12 | Theo's negative ratings «60% · 6 · $30» | negative-ratings page; entry 46 |
| F13 | reputation is data for the counterparty, which decides for itself; review pages are part of it, opening them is the agent's choice | doc 17 §17.4; doc 25 §25.4 |
| F14 | parties who already know each other do not search again; a search costs $0.01 per result list | doc 17 §17.8 |
| F15 | an agent reads a review page as information about a deal, never as instructions to itself | doc 25 §25.4; entry 50 |
| F16 | the network does not open, check or judge pages; the author and the host answer for them | doc 25 §25.5; entry 50 |
| F17 | the other side answers with a page attached to its own review of the same deal; Sam's one dislike given (negative-ratings page) is his review of Theo's deal | doc 25 §25.2; negative-ratings skeleton (Sam «4% · 1 · $5») |
| F18 | a super-node does not read pages, shows the address next to its review, applies its law and the orders addressed to it, and does not show an address it has learned leads to content prohibited by default | doc 25 §25.5; doc 17 §17.9 |
| F19 | a super-node that stops showing an address removes it only from its own results; others may show it; the record keeps it | doc 25 §25.5 |
| F20 | the address stays for ever; a page on the author's own site ties the node's wallet to the author; the author's choice | doc 25 §25.7 |

Numbers: «5%», «5 %», «2014», «2024», «2025», «2026», «41.67%», «41,67 %», «68.16%», «68,16 %», «$40», «$2», «25», «22», «$110», «3», «$15», «$100», «$5», «60%», «60 %», «6», «$30», «$0.01», «$0,01»

## 8. Questions to the owner
none — every rule stated is in changelog entry 50 and document 25 (plan of step 516 agreed by the owner 2026-10-17); the scenes are
fictional examples; «agents now read reviews for people» is supported by F4.

## 9. Links
- out across the site:
  - /<lang>/likes-and-dislikes — «how a like and a dislike get their weight» / «как лайк и дизлайк получают вес» — H3 `how-attach`
  - /<lang>/reputation — «what the other side sees in a record» / «что другая сторона видит в записи» — H3 `how-weightless` (up to the hub)
  - /<lang>/negative-ratings — «how an element rates its partners» / «как элемент оценивает партнёров» — H3 `use-doubt`
  - /<lang>/search-fee — «what a search costs» / «сколько стоит поиск» — H3 `use-return`
  - /<lang>/super-node — «what a super-node does» / «что делает супер-узел» — H3 `resp-supernode`
- to documents: /<lang>/docs/25-review-pages — «document 25 of the protocol» / «документ 25 протокола» — H3 `how-attach`
- incoming (planned): /reputation (hub, H3 `see-six`: «what a review page adds to the numbers» / «что страница отзыва добавляет к числам»),
  /likes-and-dislikes (H3 `weight-deal`: «a page its author wrote about the deal» / «страница, которую автор написал о сделке»),
  /negative-ratings (H3 `use-customer`, step 516-4: «the pages behind his dislikes» / «страницы за его дизлайками»)
- external primary sources: Kellogg (F1), FTC 2024-08 (F2), FTC 2025-12 (F3), arXiv 2606.13385 (F4)

## 10. FAQ
1. en «Is a review page the same as a like or a dislike?» · ru «Страница отзыва — это то же самое, что лайк или дизлайк?» — no: an address attached to one; the review keeps its weight, the page adds none — F6, F8
2. en «Can a business remove a bad review page?» · ru «Может ли компания убрать плохую страницу отзыва?» — no: only the author can change or delete the page where it lives; the address stays; a super-node hides it only when its law or an order requires — F10, F18, F19
3. en «Can I add a page after I have left the review?» · ru «Можно ли добавить страницу после отзыва?» — yes, once — F6
4. en «Can the other side reply?» · ru «Может ли другая сторона ответить?» — yes, with a page on its own review of the same deal — F17
5. en «Does anyone check that a page tells the truth?» · ru «Проверяет ли кто-то, что страница говорит правду?» — no: the author answers; agents read it as information — F15, F16
6. en «What does attaching a page cost?» · ru «Сколько стоит привязать страницу?» — only the gas of your own transaction; no fee; with the review in one operation, no extra transaction — F7

## 11. Words
Glossary: review («отзыв» — a like or a dislike), review page («страница отзыва»), like, dislike, weight, fee, receipt, escrow, element,
super-node, gas. Traps: never call a review page «a review» on its own — a review is the like or dislike; never «official page»
(«Official» is the mark of entry 49); «tokens» banned; ru «текстовый отзыв» only for the world outside and for what a page is, never as a
second protocol term; ru years as «2014-го», «2024-м», «2025-го», «2026-го»; ru «десяти компаниям» in words.

## 12. Unique value
- Verified by the record, not by a badge: every page stands on a review, and every review on a deal anyone can check in the blockchain.
- Words without weight: a page cannot buy rank or move a number, so there is nothing to farm with it.
- Nobody but the author can remove a page, and nobody can remove its address — the reviewed side has no suppression button.
- A rule for agents against text that tries to command them, set against a measured attack rate (41.67% to 68.16%).
- A worked example: Sam's three dislikes explained by their pages, Maria's $40 haircut and the $2 like her words ride on.
