# DOGEstonia — M149 Board Shell, Feed & Query States: State-Sheet Specification v1.0

**Status:** **accepted** current visual reference (revision 1); written implementation contract remains authoritative · package INDEX 2026-10-08 · residual catalog → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md)  

**Date:** 2026-10-07  
**Target:** current light-first `/board` design; canonical desktop 1440 × 1024 and a 390 × 844 narrow expectation  
**Package:** M149 of the approved M149–M160 sequence  
**Artboard:** `generated_images/exec-813a754e-1a6f-490c-8cab-c2970417bcee.png`, revision 1, accepted by product owner on 2026-10-07

**Accepted visual limitation:** panel A does not show the `Clear filters` affordance beside the selected `Needs` chip. Panel C1 does show the clear action. Implement the explicit rule in §§6 and 14: when a filter differs from default, the user can clear filters in both populated and empty states. This accepted omission does not weaken the written contract.

## 1. Purpose

Communicate how the already approved DOGEstonia board shell and feed behave when the Issue query loads, succeeds, returns no matching Issues, fails, or shows cached content during refresh. Keep query controls visually and behaviorally stable across these states. This sheet establishes page-level ownership; the later packages cover post detail, map, thread and reaction states.

## 2. Scope and non-goals

Included: `PublicHeader`, `ProfileRail`, `BoardToolbar`, `BoardFeed`, `NodeContextRail`, list-mode Issue cards, query feedback, retry, and one mobile shell expectation. Cover every required M149 state ID in §5, using grouped detail callouts where necessary.

Excluded: Early Signal / Emerging Signal zero-Issues discovery, map canvas and pin states (M151), schema overlay (M150), comprehensive thread states (M152–M153), reaction picker (M154), verification (M157), and full mobile stress cases (M159). No new dashboard layout, backend field, search endpoint, metric, or production claim is authorized by this sheet.

## 3. Authority and continuity

1. Current product instruction for M149 and the approved *Current Design State-Artboard Coverage & Generation Backlog v1.0*.
2. *Unified State Inventory v1.0*, especially §§2, 4, 6–7 and 22–25.
3. *Component & Variants Specification v1.0*, especially `PublicHeader`, `ProfileRail`, `NodeContextRail`, `BoardToolbar`, `FilterChipGroup`, `ListMapToggle`, `BoardFeed` and `BoardIssuePost`.
4. *Interaction & Behavior Specification v1.0*, §§8–10, 38–41.
5. *Data-to-UI Contract v1.0*, §§6, 10, 24, 28–31. It is authoritative for current API support and blockers.
6. *Dashboard Layout Specification v1.0*; *Mobile Responsive Design Pack v1.0*; *Design Tokens Package v1.0*; *Accessibility & Localization Pack v1.0*; *Asset Manifest v1.0*.
7. Current light reference `exec-26720537-2028-4b60-af0b-67df6f385bc3.png` is the composition anchor. Current light Issue modal and reaction references establish continuity of chrome only. M143–M148 images are **previous visual skin — state logic only**. The supplied brand assets are read-only references; do not redraw the logo.

Written specifications override generated pixels. The latest accepted revision of the same state wins over an older mockup. The reference feed contains illustrative residents, artwork and labels; it is not evidence that those fields are supplied by today's API.

## 4. Shared anatomy and ownership

```text
PublicHeader (fixed, global)
└─ Board page grid
   ├─ ProfileRail (profile, navigation, Tell a story, active node)
   ├─ Board main
   │  ├─ BoardToolbar (heading, node search, filters, result context, List | Map)
   │  └─ BoardFeed (ordered BoardIssuePost list or feed-level state)
   └─ NodeContextRail (node, explanation, participation)
```

- `BoardToolbar` owns visible query value, selected chips, result context and view selection. `BoardFeed` owns only the result region, including skeleton, empty/error/retry message and ordered posts.
- Shell, known filters and unaffected rail modules persist when the Issue list fails. Own-story and right-rail requests fail independently; neither may turn the whole board into an error.
- `BoardIssuePost` remains the civic Issue identity. When a populated example includes its compact actions, the one row reads `React`, `Comment`, `Share`, `Reactions`. Do not add a second social card.
- This sheet depicts list mode. `List | Map` remains in its approved toolbar position; map behavior and map eligibility details are specified in M151.

## 5. State matrix and panel mapping

| Required state | Trigger | Visible result | Sheet location | Contract status |
|---|---|---|---|---|
| `BOARD-FEED-POPULATED` | Issue list succeeds with ≥1 item | Current three-column light board and ordered cards | A | Supported civic list; demo media/social details illustrative |
| `BOARD-FEED-LOADING` | Initial Issue query pending | Stable shell and toolbar; card-shaped skeletons without content/counts | B | Supported UI state |
| `BOARD-FEED-EMPTY-FILTERED` | Successful structured-filter query returns zero | Selected filters, explicit zero-result explanation, clear filters | C1 | Supported for confirmed API filters |
| `BOARD-SEARCH-NO-RESULTS` | Successful approved text-search policy returns zero | Query retained, zero-result context, clear search/reset | C2 linked detail | **Future-contract/prototype visual** until search policy is approved |
| `BOARD-FEED-ERROR` | Issue list fails with no readable cached results | Shell and known controls persist; scoped error and Retry in feed | D1 | Supported UI state |
| `BOARD-FEED-STALE` | Cached Issues remain after refresh failure | Readable cached cards with persistent stale label and Retry | D2 linked detail | Conditional on valid cache |
| `BOARD-FEED-RETRYING` | Retry is in progress | Bounded progress; retain cached cards when available | D2 companion state | Supported UI state |
| `BOARD-FILTER-ACTIVE` | At least one supported filter selected | Selected chip(s), contextual copy and scoped Clear filters | A and C1 | Supported for API filter parameters |
| `SHELL-MOBILE` / narrow expectation | 390 × 844 | Compact app bar, same query semantics, one-column feed and bottom nav | E | Supported presentation contract |

`BOARD-SEARCH-IDLE`, `BOARD-SEARCH-TYPING`, `BOARD-SEARCH-LOADING`, `BOARD-SEARCH-RESULTS`, `BOARD-FILTER-OVERFLOW`, `BOARD-FILTER-ERROR` and known offline are inventory states, but M149's prescribed panels do not require separate primary frames. Their behavioral rules below prevent the sheet from contradicting them; later state packages may expand them. C2 must never appear as a confirmed current production response.

## 6. Exact panel content

### A — Canonical populated board + active filter (1440 × 1024)

- Reproduce the approved light dashboard hierarchy: fixed public header; left profile/navigation rail; center heading `Uus Veerenni board` and supporting sentence; board search; `All Issues`, `Needs`, `Ideas`, `Open` filter family; right-aligned `List | Map`; result-context line; full-width Issue posts; right civic-node/explanation/participation modules.
- Show one active supported filter (for example `Needs`/`type`, subject to the actual value mapping) with selected fill and text, plus `Clear filters` if it differs from default. State copy may say “Showing Issues matching selected filters”; do not fabricate a global result total.
- At least one complete Issue card establishes density, hierarchy and post width, and a second card may be partially visible to show feed rhythm. Fixture title, illustration, profile and social badges are **demo only**, not a production data claim. The Issue metadata follows the approved civic order; media is optional and only illustrative pending its public URL/alt contract.
- Do not force thread previews or invent reaction counts in this board-level sheet. If the reference action strip appears, keep all four actions and no fabricated aggregate number.

### B — Initial feed loading

- Keep the same header, left rail, board title, visible toolbar geometry and right rail. Session restoration and rail data may resolve independently.
- In the center result region show two or three stable card-shaped skeletons approximating the Issue identity block, title/summary and optional media/action geometry. Neutral shapes only: no fake Issue ID, words, resident faces, number, pin, reaction, or comment.
- Reserve the space occupied by a normal card. One restrained `Loading issues…` status can accompany the feed, without a spinner in each row. The user should perceive that the result region is pending, not that the whole app disappeared.

### C1 — Filtered empty result

- The selected supported filter remains visibly active and the toolbar stays in the same location. The feed region contains a compact plain empty message: “No Issues match these filters” and a scoped `Clear filters` control.
- Explain what is empty and the next action. Clearing filters does not clear unrelated node/session or any entered text. Do not substitute the Early Signal discovery treatment and do not show recommendation cards or fake content.

### C2 — Search with no results (linked query detail)

- Show the board search value, a zero-match message and `Clear search` (plus a separate filter reset only if filters are active). Label this detail **prototype / future text-search contract** in an annotation outside UI chrome.
- The current reviewed `GET /node/issues` does **not** accept a text query. This detail communicates an approved UX state, not a working server search or an authoritative result claim. If no policy is approved at implementation time, the product must withhold or clearly mark the unsupported committed-search behavior; it must not simulate a server response.

### D1 — Feed query error

- Shell, heading, known query input and selected filters stay visible. Replace only the result region with persistent inline text such as “Issues couldn’t load” and a clear `Retry` control.
- Do not render a blank page, zero-results message, fabricated Issue cards or stale content unless a valid cached result actually exists.

### D2 — Stale cached feed and retrying (linked comparison)

- On refresh failure, show previously confirmed Issue cards unchanged and readable. A visible `Showing saved results; update failed` label and `Retry` live near the result context; do not substitute an invented updated time.
- When Retry is activated, use a bounded “Updating…” status in the result context and retain the readable cards. A failed retry returns to the persistent stale/error marker. If no cached content exists, use D1 instead. Do not imply an offline write queue.

### E — Narrow 390 × 844 expectation

- Compact 56 px app bar with square mark/navigation trigger, active node, search action and one utility/account action. One column, 16 px page gutters, 24/32 heading, full-width 44 px board search, one horizontally scrollable 36 px filter row, result context and `List | Map` together, then full-width Issue card or a compact C1/B/D state crop.
- Bottom navigation has `Board`, `My stories`, `Tell a story`, `Profile` with text labels and 64 px height plus safe area. The left rail moves to a drawer, and right-rail modules move after feed or to contextual access. Do not crop away the only access to them.
- This panel should demonstrate stable shell and a selected filter with a compact empty or loading result, not attempt to fit all desktop states into a phone frame. M159 owns full mobile coverage.

## 7. Responsive and theme treatment

At 1440 px use a 64 px fixed header and three-column grid: 28 px outer gutters, 240 px left rail, 20 px gaps, approximately 824 px feed, 280 px right rail. Main top gap 24 px; card gap 20 px. Rails may be sticky at top 80 px and scroll with the document, not as independent panes. Board search is at least 280 × 40 px; chips 36 px high; `List | Map` approximately 144 × 40 px at the far right. Cards span the feed, with 12 px radius and 20 px desktop inner padding.

At 1024–1199 px preserve a feed of at least 640 px before allowing the left rail to remain; the right modules relocate. At 768–1023 px use a centered one-column feed and compact header. At 320–767 px use mobile shell, with 16 px gutters at 360/390 and 12 px below 360. Same query state and Issue identity across viewports; no mobile data fork.

M149 is light-first. Use semantic light tokens: page `#F7F6F2`, surface `#FFFFFF`, warm Issue surface `#FFFDF8`, primary text `#101828`, secondary `#667085`, border `#E7E4DC`, selected/primary `#F5C542` with dark text, accessible orange text link `#B54708`. Do not use bright decorative orange as small text. Dark parity is inherited from semantic mappings (page `#141417`, surface `#1B1C1F`, primary text `#F2F2F2`) with **identical geometry**; full side-by-side theme stress belongs to M160.

## 8. Interaction, focus and return behavior

- On first `/board` entry, render public shell, toolbar and feed loading independently of session restoration; only feed region changes on Issue-query completion. Progressive thread data never blocks the civic card.
- A filter selection updates the chip immediately and starts a query. Keep selected chips during loading and on failure; failure offers retry rather than resetting intent. `Clear filters` clears board filters only.
- For a future approved text-search policy: input echoes immediately; committed work starts after approximately 300 ms inactivity, Enter commits immediately, Clear commits immediately. The latest committed query wins and obsolete responses cannot overwrite it. Short pending periods retain current cards and display bounded progress instead of repeated full-card skeleton flashes.
- Preserve focused control and scroll position through background refresh. Feed error Retry retains query/filter context. A visible keyboard focus ring uses the semantic focus token. Opening search/filter surfaces on mobile does not reset the feed scroll.
- Keep `List | Map` selection in the toolbar. Switching views preserves filters, but M151 defines map eligibility and failure behavior. Avoid depicting a map that claims results before eligibility is known.

## 9. Data dependencies and unavailable fields

| Surface | Current source / derivation | Boundary |
|---|---|---|
| Feed | `GET /node/issues`, `data.issues` | Response array length is the received set, not an independently reported server total; no cursor/sort metadata. |
| Supported filters | `status[]`, `type`, `labels[]`, `institution`, date bounds, and approved geo filters | Visible chip mapping to API values must be confirmed; do not assume human copy equals wire value. |
| Text search | No confirmed query parameter or semantics | C2 is future-contract/prototype only; see `DUI-Q12`. |
| Issue media | `image_txid` / `image_hash` without public URL/alt presentation contract | Illustrated image is demo-only; production rendering blocked by `DUI-Q03`. |
| Social aggregate | No batch summary on Issue list | Never fabricate counts; a per-Issue tree fetch risks N+1 (`DUI-Q11`). |
| Left own-story detail | Current activity lacks full title/link data | Demo rail wording is not a verified production field (`DUI-Q15`). |
| Right modules | No confirmed data owner for all current mockup content | Treat illustrative copy as fixture; `DUI-Q16`. |
| Public Issue exposure | Draft/public default unclear | `DUI-Q01` must be resolved before claiming production public feed safety. |

Use deterministic fixtures with conspicuous `demo` provenance in handoff, not fake production metrics. Do not invent endpoint or JSON fields beyond the cited contract.

## 10. Accessibility and localization

- Use page landmarks and a labelled board search distinct from the global header search. Placeholder alone is insufficient. Filter group has a name, selected state is programmatic, Clear filters identifies its scope, and the view toggle has a labelled selected state.
- Announce results after a committed action through one polite status region, not on every keystroke or skeleton. Persistent inline error and Retry remain available to keyboard and screen reader users. Empty, stale and error must use words as well as color.
- Maintain logical focus order: header → rail/navigation → board heading/query controls → results → contextual modules. Background refresh does not move focus. Retry is a real button.
- ET/RU/EN labels may grow by 30–40%. Heading and empty/error copy wrap; chips stay legible and scroll as a row on mobile. Do not ellipsize primary action labels. At 200% zoom or 320 px, preserve a single-column reflow without horizontal page overflow.
- All informative demo imagery needs meaningful alt text only if the pictured content is actually part of the Issue; decorative graphics are hidden from assistive technology. Skeletons are not announced row by row. Respect reduced motion and visible focus.

## 11. Forbidden representations

- A new all-dark default dashboard, generic SaaS/crypto skin, marketing hero, Meta/Facebook logo or copied assets, or redrawn DOGEstonia logo.
- Empty Issue card shells masquerading as data, fake social counts/comments or reaction people, invented global totals, fake timestamps or results.
- A search no-results panel labelled as live production behavior before `DUI-Q12` is decided.
- Early Signal zero-Issues discovery inserted into filtered empty; hidden filters in list/map; blank page for feed error; stale cached data presented as fresh.
- Three independent desktop scrolling columns, a parallel social post replacing the civic Issue, or right-rail loss on mobile.

## 12. Artboard composition instructions

One consolidated, sharp, presentation-ready light state sheet titled `M149 · BOARD SHELL / FEED / QUERY · rev 1`. Use **four large primary desktop panels** A, B, C1, D1 in a balanced grid, with linked detail sub-panels C2 and D2, and one 390 px narrow expectation E along a side/bottom band. Label every state ID clearly outside functional UI. If legibility would suffer, use enlarged crops of the center feed while a single canonical A panel anchors the complete three-column shell; show rails/header continuity through aligned miniatures or callouts. Keep controls readable and annotations outside content. Do not squeeze a full 1440 board into every small panel.

The C2 annotation explicitly reads `Future-contract / prototype: text search`. The D2 crop shows both stale and retrying states. The visual contrast between initial skeleton, successful empty, network error and cached stale result is a key acceptance criterion. No backend schema or executable code appears in the artwork.

## 13. Implementation handoff notes

Model shell, query controls and feed result as independent regions. Keep filter intent while requesting, key results by active node plus supported filters, and reject late results for obsolete node/query. Treat text search as an unresolved product/API dependency. Error ownership is the feed result region; rail data and social data remain separately fallible. A valid cache can render stale with a visible freshness warning; its absence selects the ordinary error panel. Populate media only after its public resolution and alt contract exist.

## 14. Acceptance checklist

- [ ] A retains the latest light header, left rail, feed width, toolbar placement, Issue identity/action rhythm and right modules.
- [ ] B preserves shell geometry and uses non-semantic card skeletons without counts or fake copy.
- [ ] C1 preserves selected filters and supplies a scoped clear action; C2 is visibly labelled future-contract.
- [ ] D1 has persistent scoped Retry; D2 keeps actual cached cards readable and distinctly marked stale/retrying.
- [ ] E shows 390 px single-column shell, selected filter, labelled bottom navigation and a reachable node context.
- [ ] Light semantic tokens and dark parity rule are honored; no old dark default skin or logo reconstruction.
- [ ] Every required M149 state in §5 is labelled and traceable to a panel or linked detail.
- [ ] An implementer can distinguish supplied data, derived values, demo fixtures and blocked fields.
- [ ] Keyboard focus, live-region timing, copy expansion and narrow reflow are annotated.
- [ ] Audit the generated sheet against this specification; correct only mismatches that would cause incorrect implementation.

## 15. Open decisions requiring product/API answer

| Decision | Why it matters | Proposed handling for M149 |
|---|---|---|
| `DUI-Q12`: text-search scope and query contract | Current Issues endpoint has no text search. | Keep C2 as labelled future-contract visual; do not assert live production behavior. |
| `DUI-Q01`: public status exposure | API default does not document safe Draft exclusion. | Treat A as approved visual fixture; do not infer public exposure guarantee. |
| Filter chip → wire-value mapping | `Needs`, `Ideas`, `Open` are visible design labels; backend types/status values require explicit mapping. | Preserve visual controls; implementation must use the confirmed mapping. |
| `DUI-Q03`, `DUI-Q11`, `DUI-Q15`, `DUI-Q16` | Media resolution, social summary, own-story detail and right module ownership remain incomplete. | Mark shown rich content as demo/reference; do not create replacement fields. |

These decisions do not block review of the M149 specification or generation of a clearly labelled visual sheet. They block presenting the affected details as working production data.
