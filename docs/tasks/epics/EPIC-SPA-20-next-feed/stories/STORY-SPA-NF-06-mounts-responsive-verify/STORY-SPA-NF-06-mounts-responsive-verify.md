# STORY-SPA-NF-06-mounts-responsive-verify — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md`  
> **Status:** Done · P3 (`2026-10-10T19:40:00Z`) · Wave 6 · `pkg-000108`  
> **Package:** next-feed · REQ-22 feed · active `pkg-000108`  
> **ui_scope:** `feed` · UX ready M158/M159/M160 Path A (no STORY-UX-MOCKUP-BRIEF)  
> **Skill declared:** `react-expert`

## Purpose
Mounts + responsive + feed verify — see backlog FR/AC. Feed content only; shell chrome → next-shell.

## Acceptance Criteria (verbatim backlog)
- [x] Issue mount parity modal / sheet / route for claimed feed content
- [x] Narrow feed body usable; shell chrome OOS
- [x] Theme + locale stress: critical feed controls OK
- [x] Vitest + browser-smoke + icon URL smoke; no invent API

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-06-t01-mounts-modal-sheet-route](task-spa-nf-06-t01-mounts-modal-sheet-route/README.md) | Issue mount parity modal / sheet / `#/next/feed/issue/:id` | Done · ui_anchor · M158 |
| T02 | [task-spa-nf-06-t02-narrow-feed-body](task-spa-nf-06-t02-narrow-feed-body/README.md) | Narrow viewport feed **body** stress (shell chrome OOS) | Done · M159 |
| T03 | [task-spa-nf-06-t03-theme-l10n-stress](task-spa-nf-06-t03-theme-l10n-stress/README.md) | Theme + locale stress on critical feed controls | Done · M160 |
| T04 | [task-spa-nf-06-t04-icon-404-verify](task-spa-nf-06-t04-icon-404-verify/README.md) | Verify catalog `/icons/next-feed/…` 404-free | Done |
| T05 | [task-spa-nf-06-t05-vitest-browser-feed-smoke](task-spa-nf-06-t05-vitest-browser-feed-smoke/README.md) | Vitest + browser-smoke feed critical states | Done |
| T06 | [task-spa-nf-06-t06-story-epic-gate](task-spa-nf-06-t06-story-epic-gate/README.md) | Story/epic acceptance gate rollup | Done · story gate |
| T07 | [task-spa-nf-06-t07-audit-f1-screenshots-readme](task-spa-nf-06-t07-audit-f1-screenshots-readme/README.md) | Audit F1 screenshots README | Done · P6 |
| T08 | [task-spa-nf-06-t08-audit-f2-invite-clip-narrow](task-spa-nf-06-t08-audit-f2-invite-clip-narrow/README.md) | Audit F2 Invite clip narrow | Done · P6 |

## Out of scope
Shell D2 ownership · invent HTTP · M155 people · real invite send · schema/media production · re-promote icons (unless 404 gap) · `/` flip / classic shelter.

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md` (+ PNG)
- `spa-app/docs/UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md` (+ PNG) · feed body only
- `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md` (+ PNG)
- Register: `spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md` row NF-I → NF-06
