# STORY-SPA-NF-VL-01 — Issue identity plane

## Meta
- **Key:** `STORY-SPA-NF-VL-01-issue-identity-plane`
- **Package:** [next-feed-vl](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-21-next-feed-vl](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T12:38:32Z`) · `pkg-000115` · gate PASS · icon lock Absent
- **Depends on:** next-feed NF-07 Done (Related); [DS SSOT](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §5; [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) **AD-VL-01**, **AD-VL-02**
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
- **Code boundary:** new DS-named surfaces under `features/feed/identity/` · **not** classic `#/board` `IssueCard` / UUID-first chrome as Done
- **Concern folder:** `features/feed/identity/` ([02 surface map](../../../architecture/next-feed-vl/02-ds-surface-map.md))
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `identity/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA-visual-language-plane-2026-10-12.md](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02/(03) |
| DS SSOT | [DOGEstonia-next-feed-component-design-system-v1.0.md](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) |
| Gap map | [analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md](../../../analysis/analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md) |

## Зачем
Gap P0: live civic header = UUID + omit icon; M150 identity = branded icon + readable id. NF-07 documented omit — VL owns delivery or explicit forever-lock.

## UX elements (DS names)
- `IssueIdentityHeader`
- `IssueTypeIcon`
- `IssueStatusBadge` (semantic framing within identity)
- `IssueMetadataRow` (adjacent, not UUID-as-title)

## UX SSOT
- [M150 spec](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) · [png](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
- Must: civic identity visible per DS; API status honesty (`PUBLISHED` etc. — no invent OPEN enum)

## Функциональные требования (FR)
- **FR-VL-01.1** Next-feed civic card exposes `IssueIdentityHeader` as named surface (not anonymous UUID-only row).
- **FR-VL-01.2** `IssueTypeIcon` Present via promote-or-operator-lock; **no invent** SVG masters.
- **FR-VL-01.3** Human-readable public label when Closed field exists; else honest collapse — no fake `ISSUE UV-*`.
- **FR-VL-01.4** Classic `#/board` identity chrome unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Happy card | Identity plane reads as DS civic, not admin UUID dump |
| Missing icon master | Lock documented · no silent invent |
| Narrow 390 | Identity reflow without clip |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] Next-feed PASS does **not** accept unre-skinned classic header as Done
- [x] `#/board` not regressed

## Icon lock (Q6)
| Surface | Decision | Notes |
|---------|----------|-------|
| `IssueTypeIcon` | **Absent** | Honest omit (`omit-catalog-gap`) until Promote path; no invent SVG · P3 `2026-10-12T12:38:32Z` |

## Вне scope
Invent icons/API · M155 · schema/media · shell · reopen NF-07 body

## Acceptance Criteria
- [x] Live `#/next/feed` identity matches DS + M150 must-states (or locked omit with OP sign-off)
- [x] Anti-mixing AC checked
- [x] Gap map VL-01 cite closed
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

> Target paths = arch logical homes (**name ≠ create** until P1.3). As-is cites verified in spa-app src.

### t01 — As-is / shelter map
- **Цель:** зафиксировать, что сейчас на next path ≠ VL Done.
- **Шаги:**
  1. Identity chrome сегодня в `FeedCivicPost` header: UUID-first `issue.id` + `StatusBadge` + type chip (`FeedCivicPost.jsx` ~102–133; `data-civic-identity-icon="omit-catalog-gap"` ~98).
  2. List card shell wraps civic via classic `BoardIssuePost` (`FeedListArea.jsx` 15–33) — ban-matrix item ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [ ] As-is paths cited in implement notes
  - [ ] Ban: unre-skinned classic header / `BoardIssuePost` as Done presentation
- **Out:** runtime edit in this docs wave
- **Проверка:** Grep `feed-civic-post-id` / `BoardIssuePost` on next path

### t02 — DS modules (target `identity/`)
- **Цель:** named exports matching DS.
- **Шаги:**
  1. Target: `spa-app/src/features/feed/identity/` — `IssueIdentityHeader`, `IssueTypeIcon`, `IssueStatusBadge` (or compose Closed status into badge slot), `IssueMetadataRow` ([02](../../../architecture/next-feed-vl/02-ds-surface-map.md)).
  2. Props from Closed issue fields only (status/type/geo/date/public label) — no invent enums.
  3. CSS/tokens: next-feed theme tokens; no dual hex invent.
- **AC/DoD:**
  - [ ] Exports named exactly as UX elements
  - [ ] Mountable without importing classic IssueCard chrome
- **Out:** invent SVG masters
- **Проверка:** unit smoke on named components (optional) + live route

### t03 — Semantics seam
- **Цель:** данные без «похода» в classic UI.
- **Шаги:**
  1. Identity is mostly field formatting already in `FeedCivicPost` (`formatDate`, `formatGeoLabel` ~18–41) — if reused by board later, move pure helpers to `features/feed/semantics/` (Q2–Q3).
  2. Do **not** import presentation from `components/threads` for identity Done.
- **AC/DoD:**
  - [ ] Next identity path does not import banned chrome modules
  - [ ] Any shared formatter lives in `semantics/` or stays local pure fn
- **Out:** new API fields
- **Проверка:** import graph review

### t04 — Wire / displace shelter
- **Цель:** civic card on `#/next/feed*` mounts DS identity; list shell stops claiming classic as Done.
- **Шаги:**
  1. Replace `FeedCivicPost` meta header block (~102–133) with `IssueIdentityHeader` (+ slots).
  2. Plan displace of `BoardIssuePost` wrapper in `FeedListArea` toward next-owned card chrome (may span VL-01 + layout stories; VL-01 must not leave UUID-first as Done).
  3. Shelter wrappers remain until replaced ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) Q7) — not claimable Done.
- **AC/DoD:**
  - [ ] Live card shows DS identity plane
  - [ ] Classic `#/board` identity untouched
- **Out:** board mutate
- **Проверка:** local-five `#/next/feed` + `#/board` smoke

### t05 — Anti-mixing + verify (AD-VL-03)
- **Цель:** Partial identity = **block** Done.
- **Шаги:**
  1. local-five serve; visual vs M150 / DS §5.
  2. Ban-list import gate: next Done path must not import classic IssueCard / unre-skinned BoardIssuePost as identity Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md), [03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
  3. Narrow 390 reflow.
- **AC/DoD:**
  - [ ] Anti-mixing AC checked
  - [ ] AD-VL-03 identity Partial not accepted
- **Out:** src-unit-only as sole proof
- **Проверка:** checklist in gate evidence

### t06 — Icon lock residual (Q6)
- **Цель:** `IssueTypeIcon` / civic paw — Promote path **or** Operator-lock Absent/collapse; no invent.
- **Шаги:**
  1. Document row in lock table (story or gap map): Promote `path` | Absent.
  2. Keep honest omit (`data-civic-identity-icon="omit-catalog-gap"` pattern) until lock filled — do not borrow classic icon for PASS.
- **AC/DoD:**
  - [ ] Lock row written before claiming icon Present
  - [ ] Gap map VL-01 cite updated when Done
- **Out:** invent SVG
- **Проверка:** OP sign-off if forever-omit
