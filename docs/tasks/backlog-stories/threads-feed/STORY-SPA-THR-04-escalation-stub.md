# STORY-SPA-THR-04 — Escalation / collaboration invitation stub

## Meta

- **Key:** `STORY-SPA-THR-04-escalation-stub`
- **orientation:** ui_first
- **ui_scope:** visual
- **Status:** Done
- **Blocked-on:** — (P3 `pkg-000080` · STOP before P4)
- **Depends on:** [M146](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md); [icon catalog](STORY-SPA-THR-icon-assets.md); host [M143](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md)
- **Package:** [threads-feed/](INDEX.md)
- **Architecture:** [03-reactions-attachments-escalation](../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md)
- **Parent REQ:** §2, §4.5, AC-SPA-THR-02; interview Q7

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M146** THR-E | Idle · activated feedback · soon/disabled | [mockup-146-…-spec.md](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) | [mockup-146-…-spec.png](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png) |

Resident-facing label per M146: **`Invite organization`** (internal names THR-E / “escalation stub” are not resident copy).

## Зачем простыми словами

Мягкое приглашение к сотрудничеству в chrome поста — видимое, с честным ответом по клику, без фейкового org/admin workflow.

## Функциональные требования (FR)

### Naming & placement (M146 §2–5 · M143 action row)

- **FR-THR-04.1** Affordance uses resident copy **`Invite organization`** (or L10N equiv.); “Escalation stub” / THR-E are internal only (M146 §2).
- **FR-THR-04.2** Compact **secondary** control in post/thread chrome (action row slot from M143); must not overpower Issue title/Open issue (M146 §5; M143 §3.4).

### States THR-E-A…C (M146 §4, §6)

- **FR-THR-04.3** **THR-E-A Idle:** affordance visible and enabled for the invitation preview path (M146 §THR-E-A).
- **FR-THR-04.4** **THR-E-B Activated:** click is **non-dead** — lightweight toast/popover/modal explains handoff is **not connected**; **no false success** / no simulated ticket (M146 §THR-E-B, §7; arch Q7).
- **FR-THR-04.5** **THR-E-C Soon/disabled:** unavailable control with **persistent** honest helper copy (M146 §THR-E-C).

### Boundaries (M146 §11 · REQ §5.5)

- **FR-THR-04.6** No admin queue, SLA, org org-chart, escalate HTTP, or invent handoff API this wave (M146 anti-patterns; AC-SPA-THR-01).
- **FR-THR-04.7** Feedback is informational preview, not a transaction confirmation (M146 §7).

## Вне scope

- Full escalate/org API; invent routes (AC-SPA-THR-01)  
- **AC-SPA-THR-03** / REQ8: cabinet / votes / hold-shadow  
- **AC-SPA-THR-07:** rate-limit / near-dup UX  
- Tree/reactions/verify internals (siblings)  

## §Иконки

> SSOT: [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md). Wiring: **Runtime** в `<img src>` / CSS; **Disk** = путь от `spa-app/`. Все PNG **ON DISK**. Не показывать `ic-*` filenames резиденту (M145).

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Invite organization | `/icons/threads-feed/ic-invite-organization.png` | `public/icons/threads-feed/ic-invite-organization.png` | thr NEW · same as THR-01 action row |
| Activated info feedback | `/icons/story-handoff/ic-info.png` | `public/icons/story-handoff/ic-info.png` | Reuse · non-dead stub feedback |

## §L10N

> EN — канон M146. Namespace `threadsFeed.escalate.*`. Dictionary merge → ADMIN-06 / P1.3.

| key | en | et | ru |
|-----|----|----|----|
| `threadsFeed.escalate.inviteOrganization` | Invite organization | Kutsu organisatsioon | Пригласить организацию |
| `threadsFeed.escalate.inviteShort` | Invite | Kutsu | Пригласить |
| `threadsFeed.escalate.inviteDescription` | Invite an organization to join the discussion | Kutsu organisatsioon aruteluga liituma | Пригласить организацию к обсуждению |
| `threadsFeed.escalate.notConnectedYet` | Collaboration handoff isn’t connected yet | Koostöö üleandmine pole veel ühendatud | Передача сотрудничества ещё не подключена |
| `threadsFeed.escalate.noInvitationSent` | No invitation was sent. This capability will be connected in a future release. | Kutset ei saadetud. See võimalus ühendatakse tulevikus. | Приглашение не отправлено. Возможность будет подключена в будущем релизе. |
| `threadsFeed.escalate.gotIt` | Got it | Selge | Понятно |
| `threadsFeed.escalate.soonHelper` | Collaboration invitations are coming soon. | Koostöö kutsed tulevad peagi. | Приглашения к сотрудничеству скоро появятся. |
| `threadsFeed.escalate.comingSoon` | Coming soon | Peagi | Скоро |

## Субтаски

> Projected pipeline IDs — folders **not** created (ADMIN-THR-06). Arch: [03 escalate stub](../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md). **No invent escalate HTTP.**

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-04-t01-invite-organization-control` | Secondary Invite organization affordance |
| **T02** | `task-spa-thr-04-t02-stub-activated-feedback` | Non-dead stub feedback (no send / no API) |
| **T03** | `task-spa-thr-04-t03-l10n-escalate-keys` | `threadsFeed.escalate.*` dictionary keys |
| **T04** | `task-spa-thr-04-t04-vitest-stub-no-http` | Vitest: click → feedback; no network invent |
| **T05** | `task-spa-thr-04-t05-story-gate-thr-04` | Story gate THR-04 |

## Acceptance Criteria

- [ ] THR-E-A/B/C match M146 sheet
- [ ] Resident label Invite organization; non-dead activated feedback; no false success
- [ ] No invent escalate API (AC-SPA-THR-02 stub spirit)
- [ ] Links: M146 · M143 · REQ-17
