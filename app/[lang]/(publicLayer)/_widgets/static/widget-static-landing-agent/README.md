# landing-agent — the home page landing redrawn by the element agent on the reference maquette

Page: the root of the public branch — `(publicLayer)/_data/` (`meta.json` → `"bare": true`; the sequence holds
`widget-static-landing-agent`), listed in `(publicLayer)/_widgets/index.tsx`, named in the exceptions of
`scripts/check-typography.mjs`.

- **Words** come from the home page data through `landingWords(lang)` (`words.ts` in this folder), the three
  destinations included (`x.outcomes`). This widget holds no text.
- **World and composition are the maquette's:** station sign → departure board (origin, destinations, platforms, departure
  time) → ticker with «?» → the signal action and the outline action → timetable poster → ticket → closing band.
- **The board is fixed to the wall** (owner, 2026-09-28): no tilt, no parallax, no cursor-following shadow or glare.
- **Motion = a real split-flap (Solari) mechanism**, island `split-flap.client.tsx`, character set `drum.ts`:
  - every board word (origin «your idea», the three row names, the main display) is a row of drums; a cell has four
    layers — static upper half of the next flap, static lower half of the current, the falling leaf (face = upper half of
    the current, back = lower half of the next, `backface-visibility: hidden`) and the axle line. Letters are drawn by CSS
    from `data-c`, so the layers add no text to the markup; the real word sits beside in a visually hidden span;
  - one step = the leaf turns `rotateX` 0 → −180° around the middle line, 65 ms, eased like a falling flap;
  - the drum turns one way: steps = `(index(target) − index(current) + length) mod length` over `DRUM` (blank, А–Я with Ё,
    A–Z, 0–9, a few signs); flaps are capitals; a character missing from `DRUM` stands as a blank — add it to `DRUM`;
  - all cells of a word start together, each stops on its own flap — the word settles as a ripple; shorter words are
    padded with blanks; one `requestAnimationFrame` loop per word, steps derived from the start time, no React state;
  - starts when the word comes into view (IntersectionObserver, 40 %); leaving resets it to blanks; coming back rattles
    again. The main display then holds 3.2 s and rattles from the current letters to the next destination
    (agent → application → automation) and writes `data-shown` on the board — the matching row's platform lights up;
  - without JavaScript the first word stands; under `prefers-reduced-motion` the island puts the letters on the target at
    once, no rattle, and the display stays on the first destination.
- **The first screen is two columns** (owner, 333-16): ≥ 1024 px the station sign is `100dvh` minus the site header
  (`components/shell/project-header.tsx`: `h-14` + `border-b` = 3.5rem + 1px — measured from the shell, change both
  together); left — the «Open source» plate in the top-left corner, the title and the subtitle; right — the agents chat.
  Below 1024 px the sign is as before and there is no chat. The departure board below takes the full width.
- **Agents chat** (`agent-chat.client.tsx`, owner's word 333-12/333-16): no container of its own — no frame, background or
  shadow; it lies on the sign (board role) and only the message list scrolls, its scrollbar hidden. Message cards are the
  dark flaps role, so they stand out on the sign. No black text: AI Elements paint themselves with theme tokens, so inside
  `.chat` the tokens (`--foreground`, `--muted-foreground`, `--card`, `--secondary`, `--muted`, `--border`, and the
  `--color-*` pair Shimmer reads) are re-pointed at the poster and chalk roles; `components/ai-elements/` is not edited.
  Monospace like code in Telegram (`--font-mono-user`, else JetBrains Mono), a2a / m2m / h2a on every line (Badge), a
  person with an avatar icon. Words: `landingWords(lang).x.chat`.
- **«Open source» plate** in the station sign: an enamel station plate (chalk enamel, double board-coloured rim, a platform
  square with the code sign); words `landing.openSource` of the home page data. On a narrow screen it stands above the title.
- **Timetable rows are one grid:** `.timetable` owns the two columns (`max-content` of the longest title, then the text),
  each row is a `subgrid` of it, so the text column starts at the same x in every row.

## Highlight addresses

Every container here carries `data-block` stamped by `npm run widgets:ids` (node step 335). After any edit of this widget run
it again; `prebuild` fails on a container without an address.

## Colours: relations to `--primary` (impeccable-on-design.md, measured on the maquette)

| Role | Maquette | Relation | Fallback |
|---|---|---|---|
| board: sign, board, closing band, outline action | board blue | `oklch(from var(--primary) 0.286 0.094 h)` | `--primary` |
| flaps: letter tiles | flap navy | `oklch(from var(--primary) 0.197 0.06 h)` | `--foreground` |
| poster: timetable, ticker, departure time, lit platform | yellow | `oklch(from var(--primary) 0.881 0.181 calc(h + 182))` | `--accent` |
| signal: the one action | red | `oklch(from var(--primary) 0.546 0.224 calc(h + 117.5))` | `--destructive` |
| floor | concrete | `oklch(from var(--primary) 0.928 0.004 h)` | `--muted` |
| chalk: text on board and signal, the ticket | chalk | `oklch(from var(--primary) 0.97 0.01 h)` | `--background` |
| ink: text on poster and floor | ink | `oklch(from var(--primary) 0.2 0.03 h)`, soft `0.38 0.02` | `--foreground` |

The board's darker edge and the shadow are derived from the board itself (`oklch(from var(--board) calc(l - …) …)`).
With a primary of hue ≈ 272 the relations give back the maquette. Contrast by lightness: chalk (L 0.97) on board (0.286)
and on flaps is far above 7:1; ink (0.2) on poster (0.881) and on floor (0.928) is above 10:1; chalk on signal (0.546) is
≈ 5:1 and carries only bold text ≥ 20 px. Not measured in a browser for every preset yet.

Faces: `--font-heading` / `--font-body`; Barlow Condensed / Barlow (the maquette's faces, local `@fontsource`) only as the
fallback after the tokens. Corners: `--radius` (tiles and buttons `calc(var(--radius) * 0.25)`).
- **«Fractera vs LLM»** (owner, 2026-09-30; brief from Google, built with the impeccable skill — launcher not run, owner's
  pick «transit map»): the second-to-last section, before the closing band. Words — `x.compare` in the home page data
  (`landing.compare`). On the light floor: the glowing title plate, then two dark screens with scan lines — left «on foot»
  (`lost-route.tsx`, server SVG, still: a lone station and rails ending at a red buffer stop), right «day-zero main line»
  (island `transit-map.client.tsx`: hub + four branches to subdomain stations, the fourth dashed «being built»). Without
  JavaScript the map stands fully drawn; the island draws the branches once when the map comes into view (30 %), then
  stations pop and train lights (SVG `animateMotion`) run — paused off-screen, absent under `prefers-reduced-motion`.
  Colours: `--signal` left, `--go` right (a new relation to `--primary`, hue −127 ≈ green); monospace (`--mono`) only for
  board data — domains, statuses, labels. Station labels: the four strings of `stations`, geometry fixed in `LINES`/`TAGS`.
  Revision (owner, 2026-09-30): both screens are always the same height — one grid stretches both, the card fills it, any
  difference goes into free space above the status list (`margin-top: auto`); both pictures are squares (viewBox 600×600,
  `aspect-ratio: 1`); badges have one width = the longest tag of both cards (`--tagn`, set by the markup, monospace `ch`);
  left texts have exactly as many words as the matching right ones (paragraph and each status). The left scheme now shows two
  chat stations whose tracks run parallel, merge into one and hit a red buffer stop («dead end»): streams of separate chats
  cannot be joined without your own server.
- **Information desk** (node steps 348–349, owner 2026-09-30; impeccable, the page's world): section `#help-desk`, third from the
  bottom, above the pipeline. Island `help-desk.client.tsx`: a station kiosk (enamel plate, «Open 24 hours» lamp, chat window,
  counter with mic, GitHub button and the Send action); on ≥ 1024 px six question signboards hang at the sides plus the two main
  ones at the bottom — «Departure» (signal red, left) and «Transfers en route» (`--ring` orange, right); on phones a row of quick
  buttons. **Signs and quick buttons answer with ready text on the page** (`landing.helpDesk.answers`, `departure.answer`,
  `transfer.answer`) — instant, unlimited, even offline; **only typed messages go to the model**: `useChat` → public door
  `(publicLayer)/api/help-desk/route.ts` (`gpt-6-luna`, facts only from `(publicLayer)/_libs/help-desk.ts`, 40 messages an hour per address, short
  answers). The door passes only plain text of the history (✗ useChat's OpenAI metadata made the second turn fail). Every landing
  button (red CTAs, the portal «Жми», the chat's end button) leads to `#help-desk`; the procedure ends at the fork of
  `github.com/fractera/agi`. Words — `landing.helpDesk` of the home page data.

## Step 453 (2026-10-11): mission concept

- **Lost route** (`lost-route.tsx`): the station behind the dead end flies the flag «AI Freedom»; each left station has its agent with a
  flag — Google: an Android-style robot «I'm in charge», ChatGPT: a light-blue two-legged buddy «Max dependency», Claude: the Claude
  Code crab «Burn the tokens». Words — `landing.compare.left.flags`, `landing.compare.left.free`.
  Attribution: the robot is our own drawing in the spirit of the Android robot, which is reproduced or modified from work created and
  shared by Google and used according to terms described in the Creative Commons 3.0 Attribution License.
- **First screen**: the plate is the H1 («Open Source …»); `landing.titleSubLink` turns part of the subtitle into a link in the
  `--poster` inversion (like the «?») to `#zero-day`; the «?» explains why to run a super-node at the start (mechanics of Lagrix
  documents 05/06/09 only, no promise of income); `hero.cta` leads to `github.com/lagrix-dev/lagrix` and gets the GitHub icon.
- **Zero-day infrastructure** (`zero-day.tsx`, `#zero-day`): after «Fractera vs LLM», above the help desk. Mirrored patrols (officer in
  a peaked cap, a yellow barrier post, a policewoman, a German Shepherd with the sloped back) around a dark cell whose text reads
  through bars. Phone (≤ 720 px): only the left group, a quarter of the width, the row height is the officers' height, text scrolls
  inside the cell. Words — `landing.zeroDay`.
- **Unlock** (453-6, `zero-day-stage.client.tsx`): the lock is a button; on hover a label «Unlock» slides out of it (always visible on
  touch screens). Click: the bars slide aside, the left patrol leaves to the left, the right one to the right, the text brightens to
  full contrast; on a phone the art column closes. One-way, one state (`data-open` on the grid), all motion in CSS; reduced motion —
  no animation. Without JavaScript the text still reads through the bars. Words — `landing.zeroDay.unlock`.
- **People** (453-8): after the patrols leave, a cook, a locksmith and a teacher (`People` in `zero-day.tsx`) come in from the screen
  edges onto their place. Timing (owner): bars 1 s → pause 0.3 s → patrols out 0.5 s → pause 0.2 s → people in 0.5 s (delays 1.3 s
  and 2 s in CSS). A red target (150 px, 72 px on a phone) stands left of the section title — the main goal of the product.
- **Ticket** (453-9): an invitation for super-node operators — `landing.ticket` (kicker, fields, keep, `reserve` → GitHub), three
  `landing.chips`; shape, stub, barcode and stamp unchanged. Title and text — the `under-the-hood` section head and its paragraph.

## Step 467 (2026-10-12): zero-day sign and the customs room

- **Zero-day sign** (467-1, `zero-day.tsx`): the section title is a plate `.zeroPlate` on two dotted chains `.gateRods` inside
  `.zeroSign`, centred, in the same manner as the waiting-room plate; the red target is the plate's emblem on its left edge (5.6rem,
  3.4rem on a phone). Floor (467-5): `.zeroDay::before` — a 6rem band with a 4px board-coloured skirting, the same colour as
  `.hallFloor` of the customs room; patrols, people and the camera stand on it.
- **Customs** (467-2, `customs.tsx`, `#customs`): below zero-day, above the help desk. The plate (same classes as the waiting room,
  `waitingSign`/`waitingPlate`) stands on the right with the yellow regulators line (owner's wording: «designed to answer the questions
  of regulators», not «fully compliant»; SEC and MiCA checked at the source); on the left a red alarm lamp «Attention, inspection in
  progress», pulsing once in 2 s in CSS. The hall spans the screen: floor, a conveyor on legs standing on the floor, suitcases, and in the
  centre the X-ray box `min(44rem, 100vw − 2rem)` (the help-desk kiosk width; it does not shrink, suitcases get cut by the edges). The box
  display has two stacked containers: question (`--signal`) and answer (`--go`); phases are `data-phase` = `off` · `question` · `answer`.
  Six question/answer pairs come from the protocol README «Built with regulators in mind», condensed. Words — `landing.customs`.
  Phone (≤ 640 px): only the plate and the box.
- **Live cycle** (467-3, `customs-hall.client.tsx`): the island renders the same still scene on the server (without JavaScript: the
  first pair in the «answer» state). Live: suitcases every 15rem, belt 80 px/s (the walkers' `SPEED`); a suitcase reaching the box
  centre stops → question 2 s (red lamp blinks) → answer 5 s (question dimmed, green lamp blinks) → display off, belt moves, next pair.
  Time runs in rAF frames and only while the hall is on screen (IntersectionObserver). Phone and `prefers-reduced-motion`: no belt, the
  display cycles pairs by itself (2 s, 5 s, 0.7 s pause). The display is hidden from screen readers; all six pairs are in an `srOnly`
  list beside it.
- **Machine copy** (467-4): `markdown.ts` builds `/<lang>/index.md` and the home part of `llms-full.txt` BY HAND — a new section or a
  new visible field in `landing` without a line there never reaches the copy. Add a section to the page → add it to `markdown.ts` in the
  same change. 467-4 added the customs room and the fields that were visible but missing (`board.from/fromValue`, `waiting.scene`,
  `waiting.video`, `route`, `closingImage.alt`; the final section title is `board.closing`).
- **Typography guard**: a new widget file with a raw `h2` must be listed in `ALLOWED_RAW_HEADINGS` of `scripts/check-typography.mjs`,
  otherwise the build fails with `TYPOGRAPHY_FAILED` (467-2, `customs.tsx`).

## Step 469 (2026-10-13): help desk under the first screen, new board texts

- **Help desk** (`#help-desk`) stands right after the first screen (below the gate sign to the chat), above the departure board; the
  machine copy (`markdown.ts`) follows the same order. Wide screens: `.sign + .desk` leaves room for the hanging gate sign
  (11.5rem), as `.sign + .hall` did when the board came first.
- **Board**: «Departing from» — home computer; four destinations (Agent, Application, Automation, Messenger) — `outcomes` in
  `_data`, the board takes up to four (`slice(0, 4)`, platform highlight in CSS up to row 4); the line under the board — «From idea
  to revenue, 99% faster».
- **Split-flap**: a still caption of several words (`SplitFlap` with one word containing spaces) keeps each word's cells in a
  `.flapGroup`, so it wraps only between words; single words and cycling words wrap by cell as before.

## Step 470 (2026-10-13): why Lagrix — night city and the word train

- **Scene** (`why-night.tsx`, server; after «Route built»): night sky in the board colour, one-tone skyscraper silhouettes (a fixed
  pattern, `CITY`), ground, rails with sleepers (rectangles a little darker than the rail). The train: a one-tone cartoon
  locomotive facing LEFT (SVG mirrored by coordinates, so the «$LGX» flag reads normally; lit cab window and headlamp, yellow beam
  ahead) and one wagon per word of `landing.why.answer` (a punctuation-only token rides with the previous word). The locomotive is
  first and on the left — the train reads left to right. Font of the train = h2 size (`.waitingTitle` clamp), each wagon is
  measured by its word; windows fill the wagon width (window 0.5em + gap 0.3em, `background-repeat: space` — as many whole windows
  as fit); >3 letters → two wheels. A moon rim (`drop-shadow` on top edges) separates the train from the city.
- **Plate button** (`why-ride.client.tsx`, island `WhyStage`): the question is `h2 > Button(bare)`; until pressed it blinks
  inverted once a second (CSS, only after hydration). The scene has its full height from the start. Press (one-way): rails slide in
  left to right (700 ms), 1 s later the first train. No press — no rails, no train. The answer is never shown as text on screen —
  only for screen readers and search (`.whyAnswer` is visually hidden).
- **Ride**: the train enters from the RIGHT edge, moves left at 80 px/s, wheels turn with the speed (counter-clockwise), leaves on
  the left, 2 s gap, next train; rAF only while the scene is on screen. Reduced motion: no blink, rails at once, the train stands.
- Guards: both files are in `ALLOWED_RAW_HEADINGS`; a control must be the ui `Button` (`check-shadcn-rules`, ✗ a build failed on a
  raw `<button>`).

## Step 471 (2026-10-13): help desk signs and long answers

- **Signs** (`landing.helpDesk.questions/answers`): Fare, Refund guarantees, Glossary | Telegraph (the H2A/H2H messengers), Zero-day
  infrastructure, To «Super-node Junction». Every sign answer (and Departure, Transfer) is a ready text of 150–200 words, no AI:
  a `# ` answer heading, a paragraph, then two or three `## ` related topics. Facts only from the Lagrix documents.
- **Window** (`help-desk.client.tsx`, `Rich`): `#` → `.kioskH1`, `##` → `.kioskH2`, blank lines split paragraphs; a new answer opens
  in the window from its question (long answers are read from the top). The machine copy (`markdown.ts`) turns those headings into
  bold lines so the document keeps its own levels.
- **Model** (`_libs/help-desk.ts`): about 150 words in the same shape, `maxOutputTokens` 900; knowledge = llms-full.

## Step 477 (2026-10-14): station of the future, the board, the help desk

Owner's order of screens (verbatim): «второй экран — табло … третьим экраном будет справочная служба» and «Экран с чатом временно
оставляем»: the former first screen (station sign with the «Open source» H1 and the agents chat) stands under the help desk for now.

- **Station of the future** (`station-facade.tsx`, first screen; words `landing.facade`): a 2880 × 900 SVG (16 : 5) drawn at the full
  height of the first screen, so the building is wider than the screen. Owner's revision of the same day: «вывеска висит внутри
  вокзала, при наведении она подсвечивается» — three layers: the building (SVG), the mission banners and the «Entrance to the future»
  plate (HTML in the drawing's coordinates: percent and `cqh`), the glass of the wings (a second SVG over the banners: mullions,
  reflections, tint). Each banner fills its wing's glass with an equal 48-unit margin on all four sides, two columns (number, title,
  line | text, stops); behind the glass it is dimmed, hover lifts the tint and lights it (only where hover exists). Centre: a modern
  glass hall — no columns — with the glowing scales of justice (owner: «весы как иконку справедливости»), BONA FIDES on the canopy,
  the clock with the visitor's real time (`ClockHands`), the dome with the orbit and its satellite, the beacon.
- **Mission 1 / Mission 2 buttons** (`facade-pan.client.tsx`, owner's names): yellow tabs at the screen edges; hover or focus slides the
  big button out (left from left to right, right from right to left), at rest it hides; the mission in view is disabled; a click pans
  the building in 1.1 s (instantly under reduced motion), and the state is recomputed at the end of the pan (scroll events do not
  arrive in a hidden tab — measured). Without JavaScript the building is a plain horizontal scroll. Phones (< 768 px): the drawing is
  cropped to its centre, the banners follow below, no buttons, no glass layer.
- **Board** (second screen): «Заглянуть внутрь» moved into the board's ticker — the claim on the left, the button on the right; the text
  «Это не просто шаблон сайта…» is removed (hero description emptied). **The old yellow sign to the chat hangs on the board** — its
  chains touch the board's lower edge (`gateOnBoard`), arrow down: the chat is below the help desk.
- **Help desk** (third screen): two green signs (role `--go`), first in their columns — left «Simulation of one project» (above «Trip
  cost»), right «Simulation: finding an important person»; on phones two green chips. Both lead to the agents chat (`#agent-chat`) for
  now — owner: «пока эту кнопку будет возвращать тот же самый чат с Анной и парикмахерской»; the chat of the second simulation is
  future work.
- The machine copy (`markdown.ts`) follows the page: station, board with the yellow sign, help desk with the simulations, station sign
  and chat, then the rest.
- **Owner corrections (same day, «Абсолютно идеально, несколько поправок»):** the tab of the mission in view disappears (slides
  out past the edge), not just dims; hover lights only the banner of the wing in view (`data-focus` on the stage, set by the buttons
  island; without JavaScript both light); the «Entrance to the future» plate is a link to the board (`#board`); on wide screens the
  help desk kiosk stretches to the height of the row set by the sign columns and the chat window takes the free space (at least the
  former 17rem).
- **New first screen** (`first-screen.tsx`, owner 2026-10-14: «создаём новый первый экран взамен того, который мы удалим»): the
  «Open source» plate (H1) centred, the title across the full width, the label «Zero-day infrastructure» (the zero-day section title,
  link to `#zero-day`), on the same starry sky as the station (`stars.ts` — one star field for both; the sky colour is the top of
  the facade sky, so the border is invisible). Height: the device screen minus the header. The station becomes the second screen,
  the board the third. **The former first screen (station sign with the chat) is removed**; the old yellow sign on the board now
  leads to the help desk.
- **Simulations in the help desk** (owner: «нажатие на кнопку симуляции … должно запускать чат внутри справочного бюро»): the green
  signs (and phone chips) are buttons; each press plays the agents chat (Anna and the salon) from the start inside the kiosk window,
  at the window size; a question sign, a typed message or the green «Ask the information desk» button returns to the desk dialogue.
- **Crabs at the doors** (`door-crabs.client.tsx`, `crab.tsx`; owner 2026-10-14): hovering the central doors slides the two glass leaves
  open; six Claude Code crabs (three from each wing) run behind the wing glass at the walkers' speed (80 px/s of screen, converted
  to drawing units), become fully visible in the hall, stack into a 3-2-1 pyramid in the doorway and, a second later, raise yellow
  «agent» flags at six different heights on both sides of the pyramid (`landing.facade.crabFlag`); leaving the doors makes them
  jump down and run back out. Wide screens only; reduced motion shows the pyramid with flags at once. The crab is one drawing for
  the whole landing (`CrabShape`), orange (`--claude` re-pointed from a muted brown to a clear orange), the lost-route crab included.
- **Banner badges**: Mission 1 adds «Developer», «Driver»; Mission 2 adds «100% privacy», «Absolute rating», «Personal brand».
- **Zero-day characters** (owner: «как будто не соответствуют по стилю»): redrawn as station pictograms — ink silhouettes without
  faces, one profession sign each (cap with a yellow badge, bob, chef's toque, cap and wrench, bun and a yellow book), a floor-coloured
  gap between cap and head; the German Shepherd as a pictogram too. Layout and the unlock animation are unchanged.
- **Final section** (owner: «изображение по всем смысловым характеристикам правильное, но мы используем другой стиль»): the raster
  `agi-journey.jpg` is replaced by `closing-art.tsx` — the same meaning (ring station with a dome, agent and service modules, glowing
  routes, ships, planet) drawn flat in the station palette, with the shared star field. Its title is now the former first-screen
  subtitle («Transfer to zero-day infrastructure…», `board.closing`).
- **Order at the end** (owner): final section → yellow sign «Have a good trip to the future» (`landing.farewell`, gate-sign anatomy,
  hanging on chains from the final section) → night scene with the train → «Route built» last, only the footer below.
