# STORY-SPA-NF-VL-12 — Escalation stub chrome

## Meta
- **Key:** `STORY-SPA-NF-VL-12-escalation-stub-chrome`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T16:47:57Z`) · gate PASS · pkg-000126 · Await OP P4/P8
- **Depends on:** NF-05 Done; VL-05 soft; DS §10; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** DS `EscalationStub` / `CollaborationFeedback` on next-feed; classic InviteOrganizationStub ≠ Done chrome
- **Concern folder:** `features/feed/escalation/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `escalation/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §10 |

## Зачем
Invite stub Present; chrome still classic secondary control.

## UX elements (DS names)
- `EscalationStub`
- `CollaborationFeedback`

## UX SSOT
- [M156](../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md)
- No send HTTP — stub honesty

## Функциональные требования (FR)
- **FR-VL-12.1** Next-feed Discussion exposes DS `EscalationStub` (idle / info / soon-unavailable).
- **FR-VL-12.2** Activation feedback = `CollaborationFeedback` (not sent / handoff not connected).
- **FR-VL-12.3** Stub is **not** a fifth PostActionStrip action.
- **FR-VL-12.4** Classic board invite stub unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Idle | Stub visible secondary |
| Activate | CollaborationFeedback honesty |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ unre-skinned classic stub as next-feed Done
- [x] `#/board` not regressed

## Вне scope
Real invite send API · M155

## Acceptance Criteria
- [x] Live stub chrome matches DS + M156
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** classic invite stub on next discussion.
- **Шаги:**
  1. `FeedDiscussionBlock.jsx` imports `InviteOrganizationStub` (L4); mounts ~258 inside expanded discussion.
  2. Ban: unre-skinned classic stub as next-feed Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
  3. FR-VL-12.3: must not become fifth PostActionStrip action (civic actions stay 4-zone in `FeedCivicPost`).
- **AC/DoD:**
  - [ ] As-is cites
  - [ ] Ban + not-fifth-action noted
- **Out:** runtime this wave
- **Проверка:** Grep `InviteOrganizationStub` under `features/feed`

### t02 — DS modules (target `escalation/`)
- **Цель:** DS stub + feedback.
- **Шаги:**
  1. Target `features/feed/escalation/` — `EscalationStub` (idle/info/soon-unavailable), `CollaborationFeedback` (not sent / handoff not connected).
  2. Honesty: **no send HTTP** (PRODUCT-BRIEF / story OOS).
- **AC/DoD:**
  - [ ] Named exports
  - [ ] States per M156
- **Out:** real invite API
- **Проверка:** idle + activate feedback

### t03 — Semantics seam
- **Цель:** stub has no backend send; any flags stay Closed.
- **Шаги:**
  1. No invent invite POST.
  2. If classic stub mixes copy helpers, extract pure strings/flags to `semantics/` only if shared; else keep local.
  3. Board keeps `InviteOrganizationStub` presentation.
- **AC/DoD:**
  - [ ] No invent send API
  - [ ] Next Done path does not import InviteOrganizationStub as chrome
- **Out:** M155
- **Проверка:** network: no new invite calls

### t04 — Wire / displace shelter
- **Цель:** DiscussionLayout stub slot uses DS escalation.
- **Шаги:**
  1. Replace `InviteOrganizationStub` mount in `FeedDiscussionBlock` (~258) with `EscalationStub` + feedback.
  2. Place in VL-05 layout stub slot (secondary), not civic PostActionStrip.
  3. Remove classic stub import from next Done path.
- **AC/DoD:**
  - [ ] Live DS stub
  - [ ] `#/board` invite stub unchanged
- **Out:** board mutate
- **Проверка:** local-five expanded discussion stub

### t05 — Anti-mixing + verify
- **Шаги:** local-five M156; ban classic stub Done; confirm not fifth action; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [ ] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [ ] Gap map VL-12 when Done
  - [ ] Package tip complete note when all VL Done
- **Out:** NEW STORY
- **Проверка:** links
