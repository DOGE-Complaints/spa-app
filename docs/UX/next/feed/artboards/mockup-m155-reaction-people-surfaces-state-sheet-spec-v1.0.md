# DOGEstonia — M155 Reaction People Surfaces State-Sheet Specification v1.0

**Package:** M155, seventh in the approved M149–M160 queue  
**Status:** **accepted** for handoff (revision 3); written implementation contract remains authoritative · shipping people/Connect still gated on Data-to-UI · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** compact `ReactorsPopover`, full `ReactionsDialog`, mobile bottom sheet and dark sample in the current light-first dashboard  
**Predecessors:** M152 rev4, M153 rev2 and M154 rev2 **accepted** (handoff 2026-10-08).  

**Artboard:** `generated_images/exec-fc070f2f-737b-4434-a267-ca3eabd1121f.png`, revision 3.

**Visual audit, 2026-10-08:** Revision 1 showed a positive-count Acknowledge tab as empty. Revision 2 selected a zero-count Concerned tab instead. Revision 3 aligns the compact Issue aggregate `14` with the full dialog and mobile `All 14`. A/D remain combined lists without Connect; B/C reserve Connect for eligible full rows and mark self as You; badges overlap avatars. All people and relationship examples are illustrative because the reviewed read API provides only aggregates. Small inset text and illustrated avatar details are presentation examples; this specification governs implementation. Product acceptance pending.

## 1. Purpose and authority

Consolidate the accepted latest all-reactors popover and reaction-distribution dialog visuals and add their missing states. Preserve the difference between a quick combined people list and the full filterable distribution. The current light reference `exec-344bf785-bece-4699-89f8-330de3b98dd3.png` establishes compact positioning and reaction badge on avatar. `exec-71fa6cec-cda0-4b92-808a-3a0feaffbf26.png` establishes full tabs, `Connect` on the right, self `You`, close and scroll. Earlier right-side reaction chips are superseded.

Approved backlog M155, Unified State Inventory §17, Component & Variants Specification §§32–34, Interaction & Behavior Specification §§26–27, Data-to-UI Contract §20 and Accessibility & Localization Pack govern behavior. M154's `reactions.v1` labels and target eligibility govern reaction marks. Written semantics override illustrative image details.

## 2. Critical data boundary

The reviewed Threads read supplies `summary_marks` and `aggregate_count`, but **no reactor list**, public actor identity, actor-to-reaction mapping, self flag, relationship eligibility or Connect API. Thus aggregate trigger and counts are currently implementable; people rows, tabs by person, `You` and `Connect` are **target UI states blocked on `DUI-Q08`**. `Connect` also needs `DUI-Q17` for relationship eligibility and presently remains a non-dead concept stub: activating it shows `Connection feature is not available yet.` without creating a request. Do not synthesize people from aggregate counts in production.

The artboard uses deterministic illustrative names `Member A`, `Member B`, `Member C`, `Member D`, and `You`, with simple neutral avatar illustrations/initials. Label outside UI: `Illustrative people fixture · public reactor/relationship API pending`. These are visual design fixtures, not actual residents or production response fields. Badges on avatars use approved catalog meaning, e.g. Support, Acknowledge, Agree, Concerned; no Facebook-style Like/Love badges. Illustrative tab counts must be coherent with fixture rows or omitted. Avoid implying one person equals one reaction, since multi-select is allowed; one person may have multiple marks and needs a defined display strategy.

## 3. Ownership and state matrix

| State | Trigger | Required result | Panel |
|---|---|---|---|
| `REACTORS-POPOVER-ALL` | Compact aggregate activation | Combined list across enabled types, avatar badge, no Connect | A |
| `REACTORS-POPOVER-LOADING` | People read pending | Stable rows, no fake names | A1 |
| `REACTORS-POPOVER-ERROR` | People read fails | Scoped retry, aggregate unchanged | A2 |
| `REACTORS-POPOVER-MORE` | More than visible maximum | Internal scroll or explicit full-list path | A |
| `REACTIONS-DISTRIBUTION-ALL` | Full distribution opened | All tab, people rows, eligible Connect, You | B |
| `REACTIONS-DISTRIBUTION-TYPE` | Type tab selected | Matching people, active type label | B1 |
| `REACTIONS-DISTRIBUTION-EMPTY` | Selected type has no people | Honest empty tab, tabs/close persist | B2 |
| `REACTIONS-DISTRIBUTION-LOADING/ERROR` | Read pending/fails | Dialog-scoped skeleton/error and retry | B3 |
| `REACTIONS-ROW-CONNECT/SELF/UNAVAILABLE` | Per-person relationship state | Connect stub / You / honest unavailable state | B rows/inset |
| `OVERLAY-DISTRIBUTION-MOBILE` | Mobile activation | Bounded bottom sheet with tabs and list | C |
| `DARK-PARITY-SAMPLE` | Dark theme | Same compact popover semantics and badge position | D |

Keep 2–4 large primary panels with clear substate insets; do not squeeze ten full dialogs into tiny tiles.

## 4. Panel A — quick `ReactorsPopover`

Anchor a ~320 px popover to a confirmed reaction aggregate on the current Issue post or comment. Header `People who reacted`, one combined list across reaction types, no tabs, no type filter and **no `Connect` anywhere**. Each ~52 px row has neutral avatar 36 px with a tiny approved reaction badge overlapping its lower edge, name label and accessible reaction name. Badge is not a right-side button. Keep the first several fixture people visible and an internal scroll region at about 440 px maximum; a full-list path may open B if supported. The popover does not cover the aggregate trigger or create a parallel Issue card.

A1 loading shows only generic row skeletons and a meaningful `Loading people…` status, not invented names or badges. A2 error reads `People who reacted are unavailable.` and offers `Try again`; the confirmed aggregate remains intact. An empty confirmed people list when counts are zero should not open an empty people popover by default; if a selected type is empty, B2 owns that explicit state. If count > 0 but people read is empty, do not silently equate that to no reactions; surface a contract/availability problem.

## 5. Panel B — full `ReactionsDialog`

Centered desktop dialog about 560 px wide, viewport-safe height, header `Reactions`, close. Horizontal tabs `All`, then only enabled reaction types with authoritative localized labels. Active tab uses underline plus aria-selected and remains visible if tabs scroll under long ET/RU/EN copy. `All` rows show each person once with reaction badge(s) on avatar according to the eventual actor mapping; a type tab filters by confirmed mark and can still show the relevant badge. Do not infer per-type people by distributing aggregate counts. Rows are about 64 px, list scrolls internally while header/tabs/close remain stable.

Illustrative row variants: `Member A` with `Connect`; `Member B` with `Connect`; current actor `You` with no Connect; `Member C` with unobtrusive `Connection unavailable` if ineligible. `Connect` appears **only in full dialog**. Until the relationship product exists, activating it gives immediate concept-ready feedback and does not silently create an edge. A self row must never be connectable. A row with unknown eligibility must not present an actionable Connect promise.

B1 selects `Support`, shows matching fixture rows and a clear selected tab. B2 selects a reaction type with no people and displays `No people for this reaction yet.` within the list region; counts/tabs remain honest, no invented residents. B3 loading uses stable people-row skeletons; error reads `Couldn’t load people who reacted.` plus `Try again`, with close and confirmed aggregate still available. Tab changes preserve dialog context; loading/error never wipes the civic Issue behind it.

The accepted example used a footer about moderation only on comments. Show that helper only for thread-root targets, or omit if context would make it confusing. Moderation reaction people tabs may appear for comments only where the product/privacy contract approves public visibility; no root moderation tabs.

## 6. Panel C — mobile bottom sheet

At 390 × 844 show a bounded sheet, no larger than about 88dvh, over the current Issue context. `Reactions` header and close remain reachable. Tabs scroll horizontally with clear active indicator; the people list scrolls vertically within remaining sheet height. Rows show badge on avatar and `Connect`/`You` semantics only for the full distribution sheet. Safe-area padding prevents the last row from hiding behind the home indicator. A compact all-reactors mobile sheet follows A semantics and never gains Connect by shrinking B. System Back dismisses the topmost sheet first and restores focus to aggregate trigger. No horizontal document overflow.

## 7. Panel D — dark parity sample

Show a single dark compact popover with the same header, combined rows, badge-over-avatar and **no Connect**, using semantic dark page `#141417`, surface `#1B1C1F`, primary `#F2F2F2`, muted `#9A9DA6`. This is a parity sample, not a redesign of the light-first board; M160 performs the full theme stress sheet. Badge, focus and row dividers remain discernible in dark and forced-colors contexts.

## 8. Interaction, focus and accessibility

`ReactorsPopover` opens by click/tap/keyboard from aggregate; outside click/Escape closes when appropriate; focus returns to origin. Full dialog traps focus, Escape/close dismisses topmost overlay, and focus returns to its trigger. Mobile sheet supports Back with the same rule. Internal list scroll does not move the entire board. A dirty composer elsewhere is unaffected. Opening people is a read action and does not demand write verification. Error retry is scoped to people read; no reaction mutation occurs.

Each row exposes a meaningful person label and reaction label once the API exists; badge color/icon alone is insufficient. `You` is plain identity text, never a disabled Connect control. `Connect` stub has an accessible name and honest feedback. Skeleton rows are not individually announced; a scoped polite status is. Tabs have tablist/tabpanel semantics, visible focus/selected styles and keyboard reachability. Every touch control at least 44 px. ET/RU/EN labels can grow 30–40%; tabs scroll and names truncate with accessible full text. Do not show hidden personal data or infer identities from counts.

## 9. Artboard composition and visual tokens

Title `M155 · REACTION PEOPLE SURFACES · rev 1`. One consolidated sharp current light landscape sheet. A compact popover and B full dialog are the two large anchors, C mobile sheet is a sizeable linked panel, D a modest dark sample. A1/A2 and B1/B2/B3 are legible substate insets, not microscopic full-page repeats. If needed, B3 combines loading/error as side-by-side inner-list crops. Preserve current DOGEstonia typography, warm page `#F7F6F2`, warm white surface `#FFFDF8`, navy `#101828`, border `#E7E4DC`, yellow `#F5C542` accent. Only approved small reaction symbols; their exact graphic assets remain illustrative. Do not regenerate logo from reference; omit branding if accurate asset cannot be placed.

External annotations: `Compact: combined list, no Connect`; `Full: tabs + conditional Connect`; `Reaction badge overlays avatar`; `Illustrative people fixture; reactor/relationship API pending`. Do not place these explanations as misleading functional UI messages.

## 10. Forbidden representations

- `Connect` in compact popover, or reaction marker on right as a row action.
- A fake people list populated from aggregate counts in production; invented public profile fields or self detection.
- Current actor with Connect; unknown eligibility shown as available Connect.
- A mere count converted into fabricated avatar thumbnails.
- One person assumed to have exactly one reaction when multi-select is possible.
- Facebook Like/Love marks in place of `reactions.v1` semantics.
- Loading people rows with names, or error shown as genuinely empty.
- Reaction picker/catalog repeated inside people dialog; this is M154's role.
- Modal/sheet scrolling the underlying board, focus lost on close, unusable last mobile row.
- Full dark duplicate sheet or new relationship request/approval workflow.

## 11. Acceptance checklist

- [ ] A has one combined list, badge-over-avatar, bounded scroll, no Connect.
- [ ] A1/A2 distinguish loading from error without changing confirmed aggregate.
- [ ] B has All/type tabs, active indicator, row variants Connect/You/unavailable and close.
- [ ] B1/B2/B3 distinguish populated type, empty type, loading/error honestly.
- [ ] C has keyboard/touch-safe mobile sheet and scrollable tabs/list; compact mobile behavior remains separate.
- [ ] D shows same compact semantics in dark without expanding scope.
- [ ] All people/relationship examples are visibly identified as fixtures pending API; no production inference from counts.
- [ ] Visual audit verifies badge placement, conditional Connect, selected tab, focus/scroll restoration and no fabricated Like model.

## 12. Open decisions

| ID | Question | M155 treatment |
|---|---|---|
| `DUI-Q08` | Reactor people endpoint, identity/mark mapping, privacy and self detection | Target visual only; no fake production people. |
| `DUI-Q17` | Relationship/Connect eligibility and outcome | Conditional stub with honest feedback, no relationship mutation. |
| Multi-select row display | How many badges per actor, All row uniqueness and tab count semantics? | One compact representative badge in fixture; full contract must define all marks. |
| Moderation visibility | Which moderation reactors are public in a comment context? | No unapproved root or private people exposure. |
