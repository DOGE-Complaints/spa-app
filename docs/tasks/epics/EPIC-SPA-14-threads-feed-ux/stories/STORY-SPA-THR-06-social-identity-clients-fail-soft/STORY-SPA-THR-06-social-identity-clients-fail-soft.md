# STORY-SPA-THR-06-social-identity-clients-fail-soft — Social + identity clients

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-06-social-identity-clients-fail-soft`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave A**
- **Status:** Done (P6 gap CLOSED · OPEN empty · skip P7 → P8)
- **orientation:** tech_first
- **ui_scope:** `none`
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-06-social-identity-clients-fail-soft.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-06-social-identity-clients-fail-soft.md)
- **decision_ref:** backlog + [ADMIN-THR-04](../../../../backlog-stories/threads-feed/ADMIN-THR-04-api-requirements.md) + [arch 02](../../../../../architecture/threads-feed-ux/02-clients-and-write-gates.md) + [arch 04](../../../../../architecture/threads-feed-ux/04-verify-and-fail-soft.md)
- **Depends on:** ADMIN-04 partial Open · THR-05 write gate Done
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md) AC-SPA-THR-01
- **Scaffolded:** `2026-09-23T06:49:11Z`
- **Completed:** `2026-09-23T06:53:32Z`
- **P6 gap CLOSED:** `2026-09-23T06:57:47Z`
- **Package:** `pkg-000082` **unchanged**
- **Gate:** [acceptance-verification-spa-thr-06.md](task-spa-thr-06-t05-story-gate-thr-06/acceptance-verification-spa-thr-06.md)
- **Run summary P3:** [run-summary-20260923-0653-spa-thr-06-p3.md](../../../../run-reports/run-summary-20260923-0653-spa-thr-06-p3.md)
- **Run summary P6:** [run-summary-20260923-0657-spa-thr-06-p6.md](../../../../run-reports/run-summary-20260923-0657-spa-thr-06-p6.md)
- **Audit:** [audit-STORY-SPA-THR-06-execution-2026-09-22.md](../../../../../analysis/audit-STORY-SPA-THR-06-execution-2026-09-22.md)

## Зачем простыми словами

Typed seams: social ops → Unavailable while HTTP Open; Me → `identity_verified`; Issues list must not regress.

## Текущее состояние (verified · As-of-Done)

| Fact | Status | Evidence |
|------|--------|----------|
| Issues list/detail | **Closed** | `GatewayIssueRepository` `/node/issues` |
| Me / write gate | **Closed** | `meIdentityVerified` → `canWriteThreadsWithMe` · composer wired |
| Social HTTP paths | **Open** | ADMIN-04 — **no invent** |
| Social client seam | **On disk** | `ThreadsSocialClient` → Unavailable / no fetch |
| Product AC | **Done** | P3 gate PASS |
| Gap F1–F3 | **CLOSED** | T06–T07 P6 |

### Historical (pre-P3)

Pipeline § once labeled «verified · pre-P3» with task Todo / AC `[ ]` while README Status Done — corrected this P6 (audit F1).

## Субтаски

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-06-t01-social-client-closed-or-unavailable` | Social client Closed-or-Unavailable | **Done** |
| **T02** | `task-spa-thr-06-t02-me-identity-verified-cutover` | Me consumer identity_verified | **Done** |
| **T03** | `task-spa-thr-06-t03-fail-soft-issues-regress` | Fail-soft must not break getIssues | **Done** |
| **T04** | `task-spa-thr-06-t04-vitest-fixtures-no-invent-urls` | Vitest fixtures; no invent URLs | **Done** |
| **T05** | `task-spa-thr-06-t05-story-gate-thr-06` | Story gate THR-06 | **Done** |
| **T06** | `task-spa-thr-06-t06-as-of-done-pipeline-bullrun-me-ssot` | Pipeline/bullrun/Me As-of-Done (F1+F3) | **Done** · P6 |
| **T07** | `task-spa-thr-06-t07-epic-tip-wave-thr-06-done` | Epic tip + wave Done (F2) | **Done** · P6 |

## Acceptance Criteria

- [x] No invent production social URLs
- [x] Social calls → Unavailable while Open
- [x] Issues gateway path regression-covered
- [x] Write gate / Me reads `identity_verified`
- [x] ADMIN-04 needs table cited
