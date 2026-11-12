# Icon inventory — mockups (initiation + epic-04)

> **Exclude:** [`user profile/`](user%20profile/) — operator-owned; see [STORY-SPA-CAB-icon-assets.md](../../tasks/backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md)  
> **Identity M128 catalog:** [STORY-SPA-ID-12-icon-assets.md](../../tasks/backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) (19 PNG in `story-handoff/`)

## Конвенции

| Rule | Value |
|------|-------|
| Base path | `public/icons/<scope>/` |
| Filename | `ic-<kebab>.png` (256×256 RGBA) |
| Runtime | `/icons/<scope>/ic-<kebab>.png` |
| Brand | `public/assets/DOGEstonia-logo-big.png`, `ET.svg`, `RU.svg`, `US.svg` |
| Style | thin 2px stroke, Lucide-like, dark civic-tech UI |

## Disk snapshot (2026-07-09)

`public/icons/story-handoff/` — **19 PNG** (see Reuse table).  
`public/icons/user-cabinet/` — empty (CAB catalog).  
Cleanup: removed duplicate `ic-info.png.png`.

---

## Initiation (`docs/UX/mockups/initiation/`)

| # | Иконка | Mockup | Файл | Status | Промпт / notes |
|---|--------|--------|------|--------|----------------|
| 1 | App logo | M01, M19 | `public/assets/DOGEstonia-logo-big.png` | **exists** | reuse; fallback `DOGEstonia-logo-fallback.svg` |
| 2 | Locale flags | M17, M20 | `public/assets/ET.svg`, `RU.svg`, `US.svg` | **exists** | reuse [`core.js`](../../src/i18n/core.js) |
| 3 | Empty board | M06 | `ic-empty-board.png` | **missing** | `Neutral doge head silhouette outline, thin 2px line, #f5f7fa on transparent 256×256, calm empty state, no text. PNG alpha.` — today: [`favicon.svg`](../../public/favicon.svg) in [`EmptyState.jsx`](../../src/components/EmptyState/EmptyState.jsx) |
| 4 | Load error | M08 | reuse `ic-cloud-error.png` | **exists** | `/icons/story-handoff/ic-cloud-error.png` |
| 5 | No results | M07 | reuse `ic-empty-board.png` or favicon | **partial** | same as #3 |
| 6 | Status badge VERIFIED | M03 | — | **n/a** | Spec: no icon (legacy `verified.svg` removed); text + color only |
| 7 | Issue card hover | M04 | — | **n/a** | CSS states only |

**Initiation gaps:** 1 dedicated asset (`ic-empty-board.png`) optional; favicon acceptable interim.

---

## Epic-04 identity (`docs/UX/mockups/epic-04/`)

Functional icons for M120–M128 are cataloged in [ID-12 icon assets](../../tasks/backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md). Runtime usage verified in [`StorySubmitPage.jsx`](../../src/pages/StorySubmitPage.jsx), [`StoryHandoffPanels.jsx`](../../src/components/StoryHandoff/StoryHandoffPanels.jsx).

| Mockup | Story | Catalog | Status |
|--------|-------|---------|--------|
| M128 handoff | ID-12 | ID-12 table (19 icons) | **exists** in `story-handoff/` |
| M127 phone format | ID-11 | — | **n/a** | UI text/diagnostic; no product PNG |
| M126 country selector | ID-10 | flags reuse | **exists** assets |
| M28 civic status | ID-03 / CAB-03 | unicode in [`CivicStatusCard.jsx`](../../src/components/CivicStatus/CivicStatusCard.jsx); PNG set in CAB catalog #5–#9 | **partial** — PNG for cabinet not yet generated |
| M121 auth | ID-01 | — | **n/a** | form UI; no custom icons in spec |
| M120 GPT OAuth | ID-08 | — | **n/a** | flow diagram; bridge uses text CTAs |
| M124 session shell | ID-02 | — | **n/a** | overlay states; CSS spinner |
| M32 phone verify | ID-04 | `ic-phone.png` | **exists** |
| M37 verify errors | ID-05 | `ic-warning-triangle.png`, `ic-cloud-error.png` | **exists** |

**Epic-04 gaps:** Civic status PNGs deferred to CAB-03 / [`STORY-SPA-CAB-icon-assets.md`](../../tasks/backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md).

---

## Reuse — `public/icons/story-handoff/` (exists)

| File | Used in |
|------|---------|
| `ic-auto-resubmit.png` | Story handoff retry |
| `ic-clock-expired.png` | Expired draft |
| `ic-cloud-error.png` | Service unavailable / load error |
| `ic-copy.png` | Copy story ID |
| `ic-doc-new.png` | New draft |
| `ic-field-category.png` | Handoff preview fields |
| `ic-field-description.png` | |
| `ic-field-institution.png` | |
| `ic-field-labels.png` | |
| `ic-field-location.png` | |
| `ic-field-summary.png` | |
| `ic-field-title.png` | |
| `ic-info.png` | Info panel |
| `ic-lock.png` | Locked state |
| `ic-phone.png` | Phone verification |
| `ic-spinner.png` | Loading |
| `ic-success-check.png` | Success |
| `ic-verify-shield.png` | Verify CTA |
| `ic-warning-triangle.png` | Warning / load failed |

---

## Cross-references

| Doc | Scope |
|-----|-------|
| [STORY-SPA-ID-12-icon-assets.md](../../tasks/backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) | M128 full prompts |
| [STORY-SPA-CAB-icon-assets.md](../../tasks/backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) | User cabinet (operator) |
| [ui-story-icons-catalog.md](../../../docs/methodology/Zeya888-builder-queue/tools/ui-story-icons-catalog.md) | Methodology |
| [design-system.md](../design-system.md) §3 | Canon rules |
