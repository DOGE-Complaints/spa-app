# Next Shell — mockup intake register (ADMIN-NS-02)

| Field | Value |
|-------|--------|
| **Package** | [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) |
| **Admin** | [ADMIN-NS-02-ux-mockup-intake.md](ADMIN-NS-02-ux-mockup-intake.md) |
| **Method** | **Register only** — map shell surfaces to **existing** UX files; do **not** create artboards/PNG/specs under `docs/UX/next/feed/` |
| **Authority** | Written specs override PNG · [feed INDEX](../../../UX/next/feed/INDEX.md) reading order |
| **Implementer brief** | [UX-PROMPTS.md](UX-PROMPTS.md) (state checklists; legacy filename) |

**UX SSOT root:** `spa-app/docs/UX/next/feed/` (`artboards/` + packs).  
**Mockup SSOT:** feed UX already present — **no new mockup files** from this package.

---

## Shell surfaces → existing SSOT

| NS surface | Future story | Spec / pack path | § / panels | PNG | Notes |
|------------|--------------|------------------|------------|-----|-------|
| _(routes)_ | NS-01 | [arch 01 §2](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) · as-is [`App.jsx`](../../../../src/App.jsx) | `#/next/feed*` host | — | name ≠ create until implement; placeholder content OK |
| NS-H | NS-02 | [mockup-m149-…spec](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · [Component §8 `PublicHeader`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) | M149 §4 Header | [same stem `.png`](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png) | brand → `#/next/feed`; logo reuse `/assets/DOGEstonia-logo-*` |
| NS-R | NS-03 | M149 (above) · [Component §10 `ProfileRail`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) · [DUI-Q15](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | ProfileRail | M149 `.png` | metrics/status + nav only; no fake story cards; no cabinet redesign |
| NS-G | NS-04 | [Layout spec](../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md) · [layout artboard png](../../../UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.png) · [Component §12 `NodeContextRail`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) · [DUI-Q16](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | grid / right slot | layout png | **omit/empty** production right-rail module |
| NS-M | NS-04 | M149 §5 panel E / `SHELL-MOBILE` · [Mobile pack](../../../UX/next/feed/DOGEstonia-mobile-responsive-design-pack-v1.0.md) · [mobile artboard png](../../../UX/next/feed/DOGEstonia-mobile-responsive-design-artboard-v1.0.png) · [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) **chrome-only** · [Component §9 `MobileAppBar`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) | narrow / bottom nav chrome | [M149 png](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png) · [M159 png](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png) | shell only; feed stress body → next-feed |
| NS-X | NS-05 | [arch 01 §3 D2.3](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) · [arch 03 risks](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) | classic routes + same shell | — | hybrid new chrome + old board content ≠ Feed Product Done |
| _(verify)_ | NS-06 | [arch 03](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) · PRODUCT-BRIEF verify lock | `/` flip + shell smoke | — | Vitest + browser-smoke **shell**; page-map update on implement |

Zero rows require «create artboard».

---

## Deferred → next-feed (not missing)

These exist on disk under `docs/UX/next/feed/artboards/` but are **out of next-shell claim**. Implement via [next-feed](../next-feed/INDEX.md):

| Scope | Artboards / packs | Notes |
|-------|-------------------|--------|
| M149 feed/toolbar **content** | same M149 spec — BoardToolbar / BoardFeed panels | Shell keeps chrome; content AC = next-feed |
| Issue / thread / reactions / gates | M150–M154, M156–M158 | Production claim matrix REQ-22 §5 |
| People surfaces | M155 | OOS production (DUI) |
| Theme/L10n stress **body** | M160 | Shell reuses theme runtime; stress of feed UI = next-feed |
| Data / interaction packs | Data-to-UI, Interaction, USI | Consumed by next-feed stories |

---

## Handoff

- Next admin: [ADMIN-NS-03](ADMIN-NS-03-icon-assets-catalog.md) — icon index + promote to `public/icons/next-shell/`.  
- Stories that cite this register: NS-01…06 (after ADMIN-NS-05).
