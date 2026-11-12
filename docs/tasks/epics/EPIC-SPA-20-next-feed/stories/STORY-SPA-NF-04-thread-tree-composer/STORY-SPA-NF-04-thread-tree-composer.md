# STORY-SPA-NF-04-thread-tree-composer — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md`  
> **Status:** Done · P3 (`2026-10-10T19:13:32Z`) · Wave 4 · `pkg-000106`  
> **Package:** next-feed · REQ-22 feed · active `pkg-000106`  
> **ui_scope:** `feed` · UX ready M152/M153 Path A (no STORY-UX-MOCKUP-BRIEF)  
> **Skill declared:** `react-expert`

## Purpose
Thread tree + composer — see backlog FR/AC. Feed content only; shell chrome → next-shell.

## Acceptance Criteria (verbatim backlog)
- [x] Thread + composer states per M152/M153; text path only
- [x] Uses Closed threads paths; no invent URLs
- [x] Icons = next-feed / next-shell catalog URLs
- [x] L10N reuse threadsFeed + draft gaps; shell/people OOS

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-04-t01-compose-closed-thread-tree](task-spa-nf-04-t01-compose-closed-thread-tree/README.md) | Compose Closed `ThreadsSocialClient` tree into feed presentation | Done · ui_anchor · M152 |
| T02 | [task-spa-nf-04-t02-composer-text-attach-gated](task-spa-nf-04-t02-composer-text-attach-gated/README.md) | Composer text path (Q06) + attach gated; no multipart invent | Done · M153 |
| T03 | [task-spa-nf-04-t03-wire-thread-icons](task-spa-nf-04-t03-wire-thread-icons/README.md) | Wire reply/send/attach/retry (+ shell chevron/close) | Done · extends mockup |
| T04 | [task-spa-nf-04-t04-l10n-reuse-threadsfeed](task-spa-nf-04-t04-l10n-reuse-threadsfeed/README.md) | L10N reuse `threadsFeed.*` + draft `nextFeed.thread.*` gaps | Done · story gate |
| T05 | [task-spa-nf-04-t05-audit-f1-backlog-ac-as-of-done](task-spa-nf-04-t05-audit-f1-backlog-ac-as-of-done/README.md) | Audit F1 backlog AC As-of-Done | Done · P6 CLOSED |

## Out of scope
Shell D2 ownership · invent HTTP · M155 people · real invite send · multipart blob invent · reactions product (NF-05).

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md` (+ PNG)
- `spa-app/docs/UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md` (+ PNG)
- Register: `spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md` row NF-T → NF-04
