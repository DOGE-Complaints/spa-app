# Threads feed UX — Product Brief (locked)

> **Дата:** 2026-09-22  
> **Статус:** locked для ADMIN-THR-01…06  
> **Пакет:** [INDEX.md](INDEX.md)  
> **REQ:** [17-issue-thread-feed-ux-and-reactions.md](../../../requirements/17-issue-thread-feed-ux-and-reactions.md)  
> **Architecture:** [threads-feed-ux/00-overview.md](../../../architecture/threads-feed-ux/00-overview.md)  
> **Interview:** [zeya888.req-target-tech-arch-interview-17-…-2026-09-22.md](../../../analysis/zeya888.req-target-tech-arch-interview-17-issue-thread-feed-ux-and-reactions-2026-09-22.md)  
> **Parent:** [REQ7](../../../../../docs/requirements%20backlog/REQ7-DOGEstonia-Threads-Entity-Social-Governance.md)  
> **Siblings:** threads `01` · gateway `52` · identity `21` · [REQ8](../../../../../docs/requirements%20backlog/REQ8-DOGEstonia-Threads-Metrics-Voice-Governance.md) (OOS)  
> **REQ-17 status:** Draft — awaiting PA.2. Package admin-complete does **not** close PA.2 / claim REQ Done.

## Locked intent

Facebook-like **dashboard feed**: Issue = post slot; under it — comment tree, `reactions.v1` picker, attachments honouring legal media floor, escalation stub; verification before write via **`identity_verified`**. DOGEstonia palette/DS — no Facebook trademarks. **Do not delete** `/issue/:id`. **No** invent HTTP (AC-SPA-THR-01). **No** cabinet / votes / hold-shadow (**AC-SPA-THR-03** → REQ8). **No** rate-limit / near-dup UX (AC-SPA-THR-07).

## AC-SPA-THR map (REQ-17 §5)

| AC | Lock | Package home |
|----|------|--------------|
| AC-SPA-THR-01 | No invent HTTP | [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md); all stories |
| AC-SPA-THR-02 | Feed shell duties (post/tree/reactions/attach/stub); keep Issue page | THR-01…04 · M143–M146 |
| AC-SPA-THR-03 | No cabinet metrics (→ REQ8) | BRIEF OOS · every story OOS |
| AC-SPA-THR-04 | M132 artboard exclusion; product = `/board` feed | THR-01 · mockups README |
| AC-SPA-THR-05 | Verify boolean + opaque result; pack CTA optional | THR-05 · M147 |
| AC-SPA-THR-06 | Legal media floor; no disable control | THR-02 · M144 |
| AC-SPA-THR-07 | No rate-limit / near-dup UX | BRIEF OOS · THR-02 OOS |

## Architect Studio locks

| # | Decision |
|---|----------|
| Q1 | `BoardIssuePost` wraps as-is `IssueCard` + `IssueThreadBlock` |
| Q2 | Clients: Issues = gateway; social = threads (when Closed); verified = identity |
| Q3 | Verify via `/verify` + returnTo |
| Q4 | Mount on `/board` **and** `/issue/:id` |
| Q5 | Attach = refs + floor + soft fail; no disable-floor control |
| Q6 | Summary strip + picker gesture; full enabled `reactions.v1` |
| Q7 | Escalation = visible non-dead stub (separate story THR-04) |
| Q8 | Progressive shell + fail-soft; no spa mocks |

## Out of scope

- **AC-SPA-THR-03** / REQ8: cabinet / votes / hold-shadow  
- **AC-SPA-THR-07:** rate-limit / near-dup warning UX  
- Invent client endpoints; invent reaction `ic-*` (M145)  
- Rewriting mockup-132 (AC-SPA-THR-04)  
- Landing; thread storage / sanctions / pack editing  

## Planned STORY keys

| Key | orientation | Surface |
|-----|-------------|---------|
| STORY-SPA-THR-01 | ui_first | Post slot + mounts (board + issue) |
| STORY-SPA-THR-02 | ui_first | Tree + composer + attachments/floor |
| STORY-SPA-THR-03 | ui_first | reactions.v1 strip + picker (3 layers) |
| STORY-SPA-THR-04 | ui_first | Escalation stub |
| STORY-SPA-THR-05 | ui_first | Verify-before-write → `/verify` |
| STORY-SPA-THR-06 | tech_first | Clients + fail-soft wiring |

## Verified baseline (code)

| Fact | Evidence |
|------|----------|
| `/board` feed → `IssueCard` | `BoardPage.jsx` ~375–383 |
| `/issue/:id`, `/verify` | `App.jsx` |
| Issues list | `GatewayIssueRepository.js` → `/node/issues` |
| Me | `identityService.js` → `GET /me` |
| Opaque boolean (sibling) | Identity wire `identity_verified` |
| **SPA FE gap** | `identity_verified` **0** matches in `spa-app/src` — UI still `phone_verified` (cutover THR-05/06 @ P1.3) |
| No thread UI in feed yet | REQ §3 · grep comment/thread/reaction → 0 |
| `threadsFeedDictionary.js` | **named, not on disk** until P1.3 (THR-01 T05) |
| Epic folders | **not created** — ADMIN-06 slugs only until P1.3 materialize |

## Mockup ID → file (ADMIN-THR-02)

SSOT: [`docs/UX/mockups/threads-feed/`](../../../UX/mockups/threads-feed/README.md)

| Artboard | Mockup | Future story | Spec |
|----------|--------|--------------|------|
| THR-P | M143 | THR-01 | [mockup-143-…](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md) |
| THR-T | M144 | THR-02 | [mockup-144-…](../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md) |
| THR-R | M145 | THR-03 | [mockup-145-…](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) |
| THR-E | M146 | THR-04 | [mockup-146-…](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) |
| THR-V | M147 | THR-05 | [mockup-147-…](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md) |
| THR-I | M148 | THR-01 | [mockup-148-…](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md) |

PNG artboards: **on disk** (same basename `.png`). Do not rewrite M132.
