# STORY-SPA-NF-05-reactions-invite-write-gate — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md`  
> **Status:** Done · P3 (`2026-10-10T19:27:30Z`) · Wave 5 · `pkg-000107`  
> **Package:** next-feed · REQ-22 feed · active `pkg-000107`  
> **ui_scope:** `feed` · UX ready M154/M156/M157 Path A (no STORY-UX-MOCKUP-BRIEF) · M155 OOS  
> **Skill declared:** `react-expert`

## Purpose
Reactions + invite stub + write gate — see backlog FR/AC. Feed content only; shell chrome → next-shell.

## Acceptance Criteria (verbatim backlog)
- [x] Reactions + stub + write-gate match M154/M156/M157; no M155
- [x] PUT reactions + catalog; invite = no HTTP; gate = `/me` `identity_verified`
- [x] Icons from next-feed reactions/actions (+ shell verified/close)
- [x] L10N reuse + draft; no invent API

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-05-t01-reactions-strip-picker](task-spa-nf-05-t01-reactions-strip-picker/README.md) | Reactions.v1 strip/picker + Closed PUT + local catalog | Done · ui_anchor · M154 |
| T02 | [task-spa-nf-05-t02-invite-stub-honesty](task-spa-nf-05-t02-invite-stub-honesty/README.md) | Invite organization stub only — no invent escalate HTTP | Done · M156 |
| T03 | [task-spa-nf-05-t03-write-gate-identity-verified](task-spa-nf-05-t03-write-gate-identity-verified/README.md) | Verify-before-write via `identity_verified` on GET `/me` | Done · M157 |
| T04 | [task-spa-nf-05-t04-wire-reaction-invite-icons](task-spa-nf-05-t04-wire-reaction-invite-icons/README.md) | Wire reaction + collaboration-invite icons (+ shell verified/close) | Done · story gate |

## Out of scope
Shell D2 ownership · invent HTTP · M155 people · real invite send · invent reaction ids · schema/media production.

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+ PNG)
- `spa-app/docs/UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md` (+ PNG)
- `spa-app/docs/UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md` (+ PNG)
- OOS: M155 people — no story key
- Register: `spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md` row NF-R → NF-05
