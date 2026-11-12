# Next Feed — mockup intake register (ADMIN-NF-01)

| Field | Value |
|-------|--------|
| **Package** | [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · sibling [next-shell](../next-shell/INDEX.md) |
| **Admin** | [ADMIN-NF-01-ux-mockup-intake.md](ADMIN-NF-01-ux-mockup-intake.md) |
| **Method** | **Register only** — map feed surfaces to **existing** UX files; do **not** create artboards/PNG/specs under `docs/UX/next/feed/` |
| **Authority** | Written specs override PNG · [feed INDEX](../../../UX/next/feed/INDEX.md) reading order |
| **No** | Separate `UX-PROMPTS.md` (layer removed in ADMIN rework) |

**UX SSOT root:** `spa-app/docs/UX/next/feed/` (`artboards/` + packs).  
**Mockup SSOT:** feed UX already present — **no new mockup files** from this package.  
**Verified on disk (2026-10-10):** M149–M160 each have colocated `.md` + `.png` under `artboards/`.  
**Visual parity wave (2026-10-11):** M149–M160 remain SSOT for NF-07…12 Path A (≥ artboard) — [INDEX](INDEX.md) · [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md).  
**Runtime map (2026-10-12):** [layouts/pages/components catalog](../../../UX/next/feed/DOGEstonia-next-feed-layouts-pages-components-catalog-v1.0.md).

## Global constraints

- Product home claimable UI: `#/next/feed` + `#/next/feed/issue/:id`
- Code home: `features/feed/` (implement later) — reuse threads modules behind presentation
- **No invent** gateway/threads fields or endpoints
- **Shell OOS:** PublicHeader / ProfileRail / layout chrome ownership → [NS-shell-mockup-intake-register.md](../next-shell/NS-shell-mockup-intake-register.md)
- M155 people surfaces → **OOS** register row only (no story key)

---

## Feed surfaces → existing SSOT

| NF surface | Future story | Spec / pack path | § / panels | PNG | Notes |
|------------|--------------|------------------|------------|-----|-------|
| NF-F | NF-01 | [M149 spec](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · feed/toolbar **content** panels (not Header/rails) | BoardFeed / BoardToolbar / query states | [M149 png](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png) | Shell chrome already Done in next-shell |
| NF-P | NF-02 | [M150 spec](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) | Issue-as-post civic | [M150 png](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png) | no schema/media production claim |
| NF-M | NF-03 | [M151 spec](../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md) | List \| Map toggle | [M151 png](../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png) | Q14 ship gate |
| NF-T | NF-04 | [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) | Thread block + composer | [M152 png](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png) · [M153 png](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png) | text path only in UI |
| NF-R | NF-05 | [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [M156](../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md) · [M157](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md) | Reactions · invite stub · write gate | [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) · [M156](../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png) · [M157](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png) | stub honesty; no real invite send |
| NF-I | NF-06 | [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) · [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) · [M160](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) | Mounts · mobile feed body · theme/L10n stress | [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png) · [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png) · [M160](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png) | M159 chrome-only already claimed by shell; feed uses body stress |
| M155 | — | [M155 spec](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) | People surfaces | [M155 png](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png) | **OOS** — no STORY-SPA-NF-* key |

Zero rows require «create artboard».

---

## State checklists (implementer)

| ID | Surface | States to call out |
|----|---------|-------------------|
| NF-F | BoardFeed + toolbar | load / empty / error / stale / retry / structural filter |
| NF-P | Issue-as-post | no-media civic; collapse missing; no schema overlay prod |
| NF-M | List \| Map | list / map / partial / error |
| NF-T | Thread + composer | empty / load / populated / unavailable; text path |
| NF-R | Reactions + stub + gate | aggregates / picker; invite stub; verify-before-write (403 draft) |
| NF-I | Mounts + responsive | modal / sheet / route parity; narrow feed body; theme / L10n stress |

Packs (consume later in stories, not duplicated here): Data-to-UI · Interaction · USI · Component variants — under `docs/UX/next/feed/` per [feed INDEX](../../../UX/next/feed/INDEX.md).

---

## Shell chrome (not missing)

| Scope | Where |
|-------|--------|
| PublicHeader / ProfileRail / shell grid / mobile chrome | [NS-shell-mockup-intake-register.md](../next-shell/NS-shell-mockup-intake-register.md) · next-shell Done |
| M149 Header / rails panels | Owned by shell; this package uses **feed/toolbar content** panels only |

---

## Handoff

- Next admin: [ADMIN-NF-02](ADMIN-NF-02-icon-assets-catalog.md) — icon index + **promote** to `public/icons/next-feed/`.  
- Stories that cite this register: NF-01…06 (after ADMIN-NF-04).
