# UX Prompts — Next Shell (ADMIN-NS-01)

> **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Admin:** [ADMIN-NS-01-product-ux-prompts.md](ADMIN-NS-01-product-ux-prompts.md)  
> **Parent REQ:** [22-feed-visual-redesign-phase-1.md](../../../requirements/22-feed-visual-redesign-phase-1.md) §2a shell  
> **Arch:** [01-routes-shell-coexistence.md](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)  
> **Method:** Implementer brief — **read existing** accepted UX; do **not** generate artboards/PNG or new `*-spec.md`.

## Global constraints

- Product home = `#/next/feed` (+ `#/next/feed/issue/:id` host). Classic `#/board` / `#/issue/:id` = **temporary shelter**, not home.
- Sole chrome owner: `AppShellLayout` — no long-lived parallel NextShell framework ([arch 01](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) D2).
- Shell order: **D2.1** new shell on next → **D2.3** same composition on classic (feed **content** = [next-feed](../next-feed/INDEX.md), not this package).
- After working next shell + feed route: `/` and `*` → `/next/feed` (Q8; implement with NS-06).
- Theme: existing `data-theme` / `dogestonia.theme` / Header `ThemeToggle` (REQ-21).
- **Logo:** reuse `/assets/DOGEstonia-logo-horizontal.png` (+ fallback `/assets/DOGEstonia-logo-fallback.svg`) — no new logo asset.
- Icons: promote later from icon-system → `/icons/next-shell/<group>/…` (ADMIN-NS-03); do **not** invent new masters here.
- **No artboard generation.** Written UX specs override PNG tone.
- **No invent** gateway/threads fields or endpoints.
- Authority when sources disagree: [feed INDEX](../../../UX/next/feed/INDEX.md) §1 order → product/REQ → Phase 1 DUI locks → packs → PNG last.

## As-is anchors (until implement)

- Routes: [`App.jsx`](../../../../src/App.jsx) — `/board`, `/issue/:id`; `/` → `/board`; **no** `#/next/*` yet.
- Chrome: [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx) — `Header` + `PublicFooter` + PH-09 sidebar flag.
- Header cluster: [`Header.jsx`](../../../../src/components/AppShell/Header.jsx) — brand currently → `/board`; locale; `ThemeToggle`; account.

## Out of scope (must stay out of shell implementer brief)

- `BoardFeed` cards, BoardToolbar **product** filters/query UX, map, threads, reactions, invite stub, write-gate UI, mount-parity **body** → [next-feed](../next-feed/INDEX.md) (M150–M158 content and M149 feed panels as **content** work).
- Creating new files under `docs/UX/next/feed/artboards/` or new icon SVG masters.
- Cabinet / Profile **product** redesign (Profile / My stories = navigate-only; DUI-Q15).
- Live production text search (DUI-Q12) and invented right-rail module content (DUI-Q16).
- Retire classic; greenfield second SPA; invent HTTP.

## Surface → future story mapping

| ID | Surface | Future story |
|----|---------|--------------|
| _(routes)_ | `#/next/feed*` host + placeholder | NS-01 |
| NS-H | PublicHeader next chrome | NS-02 |
| NS-R | ProfileRail + shelter nav | NS-03 |
| NS-G | Shell grid + empty/omit right slot | NS-04 |
| NS-M | Mobile shell chrome | NS-04 |
| NS-X | Classic under same new shell (D2.3) | NS-05 |
| _(verify)_ | `/` flip + shell smoke + page-map | NS-06 |

---

## NS-H — PublicHeader

### Read (existing)

| Source | What to use |
|--------|-------------|
| [M149 §4](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | Anatomy: fixed `PublicHeader` above board grid |
| [Component pack §8 `PublicHeader`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) | Logo, nav, language/theme/notification/account utilities; session variants |
| PRODUCT-BRIEF locks 1, 9, 12 | Home → `#/next/feed`; theme runtime; logo reuse |

### State checklist

| State | Required |
|-------|----------|
| NS-H-guest | Guest account control → login |
| NS-H-auth | Authenticated account control → profile / menu |
| NS-H-locale | Locale selector open in header |
| NS-H-theme | Light and dark via `data-theme` (ThemeToggle) |
| NS-H-narrow | Narrow/mobile header / menu adaptation |

### Implementer notes

- Brand home link target becomes `#/next/feed` (not `/board`).
- Search **affordance** may appear in chrome per Component pack; **live server text search** remains OOS (DUI-Q12) — do not claim production search results in shell stories.
- Do not redraw logo; use existing `/assets/DOGEstonia-logo-*`.

---

## NS-R — ProfileRail

### Read (existing)

| Source | What to use |
|--------|-------------|
| [M149 §4](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | Left `ProfileRail` in board grid |
| [Component pack §10 `ProfileRail`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) | Desktop profile/node navigation |
| [DUI-Q15](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | Own-story **metrics/status/date** only; Profile / My stories = **navigation only**; no fake story cards |

### State checklist

| State | Required |
|-------|----------|
| NS-R-default | Rail visible with nav to shelter targets (board residual, profile, dashboard, … per arch shelter-list) |
| NS-R-metrics | Own-story metrics/status strip only when data exists — no invented titles/issue links |
| NS-R-nav-only | Profile / My stories click → existing routes; no cabinet redesign |

### Implementer notes

- Keep shelter-list reachable while next/feed WIP ([arch 03](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)).

---

## NS-G — Shell grid + right slot

### Read (existing)

| Source | What to use |
|--------|-------------|
| [Dashboard layout spec](../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md) | Column geometry / z-index for public dashboard chrome |
| [M149 §4](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | Three-column board grid; right `NodeContextRail` in mockup anatomy |
| [Component pack §12 `NodeContextRail`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) | Right-rail role (target visual) |
| [DUI-Q16](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | **No** production right-rail module without data owner — omit / empty / hide |

### State checklist

| State | Required |
|-------|----------|
| NS-G-desktop | Header + left rail + main content slot + right region policy |
| NS-G-right-omit | Production: empty/omit right module (Q16) — fixture copy in PNG is non-production |
| NS-G-main-placeholder | Until next-feed: honest WIP/empty in main (not Product Done feed) |

### Implementer notes

- Shell owns slots; **BoardFeed body** is next-feed. Placeholder in main must not claim M149 feed AC Done.

---

## NS-M — Mobile shell chrome

### Read (existing)

| Source | What to use |
|--------|-------------|
| [M149 §5 panel E / `SHELL-MOBILE`](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | Compact app bar, one-column expectation, bottom nav |
| [Mobile pack](../../../UX/next/feed/DOGEstonia-mobile-responsive-design-pack-v1.0.md) | Narrow / tablet shells |
| [Component pack §9 `MobileAppBar`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) (+ bottom nav notes in pack) | Mobile chrome anatomy |
| [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) | Responsive critical states — use **chrome-only**; feed/thread body → next-feed |

### State checklist

| State | Required |
|-------|----------|
| NS-M-appbar | Compact app bar at ~390 width |
| NS-M-bottom-nav | Bottom nav chrome for primary shelter/home targets |
| NS-M-narrow | Shell usable without claiming full M159 feed stress Done |

---

## NS-X — Classic under new shell (D2.3)

### Read (existing)

| Source | What to use |
|--------|-------------|
| [Arch 01 §3 D2.3](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) | Apply **same** shell composition to classic routes |
| PRODUCT-BRIEF lock 2–3 | Classic shelter; hybrid accepted temporarily |
| [Arch 03 risks](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) | False Done: new shell + old cards ≠ Phase 1 feed Product Done |

### State checklist

| State | Required |
|-------|----------|
| NS-X-board | `#/board` shows new chrome; content may remain `features/board` |
| NS-X-issue | `#/issue/:id` same shell composition |
| NS-X-honesty | Docs/tests do not treat hybrid classic as feed AC Pass |

---

## Handoff

- Next admin layer: [ADMIN-NS-02](ADMIN-NS-02-ux-mockup-intake.md) — register existing artboards (no new specs).  
- Feed content briefs: [next-feed](../next-feed/INDEX.md) ADMIN-NF-01….
