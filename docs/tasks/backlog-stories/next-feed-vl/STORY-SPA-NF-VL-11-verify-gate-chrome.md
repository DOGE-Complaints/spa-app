# STORY-SPA-NF-VL-11 — Verify write-gate chrome

## Meta
- **Key:** `STORY-SPA-NF-VL-11-verify-gate-chrome`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P8 (`2026-10-12T16:42:09Z`) · SHAs `1556675/f2a8574/00b51da` · `pkg-000125`
- **Depends on:** NF-05 Done; VL-06 soft (composer slot); DS §10; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** next-feed DS chrome for gates; classic `VerifyWriteGate` module may stay on board — next-feed needs DS presentation
- **Concern folder:** `features/feed/verify/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `verify/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §10 |

## Зачем
Gate semantics Done; feed presentation still classic module chrome.

## UX elements (DS names)
- `VerifyWriteGate`
- `VerifyReturnFeedback`
- `WriteDeniedNotice`

## UX SSOT
- [M157](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)
- identity `/me` Closed — no invent

## Функциональные требования (FR)
- **FR-VL-11.1** Next-feed write restriction uses DS-named `VerifyWriteGate` chrome.
- **FR-VL-11.2** Return from verify uses `VerifyReturnFeedback` (verified/cancelled/failed) without auto-send.
- **FR-VL-11.3** Unknown deny uses `WriteDeniedNotice` (not false «unverified»).
- **FR-VL-11.4** Classic board gate chrome unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Unverified write | Gate chrome |
| Return verified | Feedback · draft kept |
| 403 unknown | WriteDeniedNotice |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ unre-skinned classic gate as next-feed Done
- [x] `#/board` not regressed

## Вне scope
VerifyScreen internals · invent identity fields

## Acceptance Criteria
- [x] Live next-feed gate chrome matches DS + M157
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** classic gate chrome reaches next via composer.
- **Шаги:**
  1. Classic module: `components/threads/VerifyWriteGate.jsx` (export ~8+; variants verified/blocked ~22–63).
  2. Mounted from `CommentComposer.jsx` (~299+) — next path uses CommentComposer via `FeedDiscussionBlock` until VL-06 displace; after VL-06, DS composer must not leave classic gate as Done.
  3. Policy helper: `components/threads/verifyWriteGate.js` (opaque `identity_verified`).
  4. Ban: unre-skinned classic gate as next-feed Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [x] As-is cites
  - [x] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `VerifyWriteGate` under threads + feed

### t02 — DS modules (target `verify/`)
- **Цель:** DS-named gate chrome (same names as product, next-owned files).
- **Шаги:**
  1. Target `features/feed/verify/` — DS `VerifyWriteGate`, `VerifyReturnFeedback`, `WriteDeniedNotice` presentation.
  2. Return feedback: verified/cancelled/failed — **no auto-send** (FR-VL-11.2).
  3. Unknown deny ≠ false «unverified» (FR-VL-11.3).
- **AC/DoD:**
  - [x] Named exports under `features/feed/verify/`
  - [x] M157 must-states
- **Out:** VerifyScreen rewrite
- **Проверка:** unverified / return / 403 paths

### t03 — Semantics seam
- **Цель:** identity policy shared; UI split.
- **Шаги:**
  1. Move/keep opaque verify policy (`verifyWriteGate.js` /me Closed) into `features/feed/semantics/` (or shared semantic import both board and next call — Q3).
  2. Board keeps classic `VerifyWriteGate.jsx` chrome; next uses DS verify presentation.
  3. No invent identity fields.
- **AC/DoD:**
  - [x] One policy seam
  - [x] Next Done path does not import classic VerifyWriteGate.jsx as chrome
- **Out:** invent /me fields
- **Проверка:** import graph + board smoke

### t04 — Wire / displace shelter
- **Цель:** next composer mounts DS gate chrome.
- **Шаги:**
  1. Wire DS verify into VL-06 composer action/feedback slots (or discussion write path).
  2. Ensure classic gate no longer appears as Done on `#/next/feed*` after wire.
  3. Board CommentComposer gate path unchanged.
- **AC/DoD:**
  - [x] Live next-feed gate = DS
  - [x] `#/board` classic gate unchanged
- **Out:** VerifyScreen internals
- **Проверка:** local-five unverified write on next-feed

### t05 — Anti-mixing + verify
- **Шаги:** local-five M157 matrix; ban classic gate Done; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [ ] Gap map VL-11 when Done
  - [ ] Depends VL-06 noted if composer not yet DS
- **Out:** NEW STORY
- **Проверка:** links
