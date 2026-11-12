# STORY-SPA-THR-04-escalation-stub — Invite organization stub (M146)

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-04-escalation-stub`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave B**
- **Status:** Done
- **orientation:** ui_first
- **ui_scope:** `visual`
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-04-escalation-stub.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-04-escalation-stub.md)
- **decision_ref:** backlog + [M146](../../../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) + [arch 03](../../../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md) + [ADMIN-04](../../../../backlog-stories/threads-feed/ADMIN-THR-04-api-requirements.md)
- **mockup SSOT:** `docs/UX/mockups/threads-feed/mockup-146-…`
- **Depends on:** M146 · M143 host · icon catalog · THR-01 Done
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md) §2, §4.5, AC-SPA-THR-02
- **Scaffolded:** `2026-09-22T21:42:26Z`
- **Completed:** `2026-09-22T21:46:48Z`
- **Package:** `pkg-000080`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png
```

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M146** THR-E | Idle · activated feedback · soon/disabled | [mockup-146-…-spec.md](../../../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) | [mockup-146-…-spec.png](../../../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png) |

Resident label **`Invite organization`**. Implement **THR-E-A…C**. **No invent escalate HTTP. No false success.**

## Зачем простыми словами

Мягкое приглашение к сотрудничеству в chrome поста — видимое, с честным ответом по клику, без фейкового org/admin workflow.

## Текущее состояние (verified · As-of-Done · P3)

### As-of-Done
- `InviteOrganizationStub` in IssueThreadBlock action row
- THR-E-A Idle · THR-E-B Activated informational feedback · THR-E-C Soon/disabled helper
- L10N `threadsFeed.escalate.*` · icons `ic-invite-organization` + `ic-info`
- Escalate HTTP: **Open** — stub only; **no invent**; **no false success**
- Screenshots 01–04 · vitest · gate PASS · `pkg-000080`

### Historical
- Pre-P3: dead `thread-action-invite` chrome from THR-01

## Функциональные требования (FR)

- **FR-THR-04.1** Resident copy Invite organization
- **FR-THR-04.2** Compact secondary control in action row
- **FR-THR-04.3** THR-E-A Idle enabled affordance
- **FR-THR-04.4** THR-E-B Activated non-dead feedback; no false success
- **FR-THR-04.5** THR-E-C Soon/disabled + persistent helper
- **FR-THR-04.6** No invent escalate HTTP / admin queue / SLA
- **FR-THR-04.7** Feedback informational, not transaction confirmation

## Вне scope

Invent escalate API · cabinet metrics · tree/reactions/verify internals · THR-05/06

## §Иконки / §L10N

See backlog STORY-SPA-THR-04 verbatim.

## Субтаски

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-04-t01-invite-organization-control` | Secondary Invite organization affordance | Done |
| **T02** | `task-spa-thr-04-t02-stub-activated-feedback` | Non-dead stub feedback (no send / no API) | Done |
| **T03** | `task-spa-thr-04-t03-l10n-escalate-keys` | threadsFeed.escalate.* | Done |
| **T04** | `task-spa-thr-04-t04-vitest-stub-no-http` | Vitest stub no HTTP | Done |
| **T05** | `task-spa-thr-04-t05-story-gate-thr-04` | Story gate THR-04 | Done |

## Acceptance Criteria

- [x] THR-E-A/B/C match M146 sheet
- [x] Resident label Invite organization; non-dead activated feedback; no false success
- [x] No invent escalate API
- [x] Links: M146 · M143 · REQ-17
