# SPA-THR-01-T04 — Continuous shell M143 + testids

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** FR-THR-01.3 / FR-THR-01.4 / FR-THR-01.10 / FR-THR-01.17 · M143 rev 1.1 · M148 narrow  
**Depends on:** T01 · T02 · T03  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T20:38:39Z
**Done:** 2026-09-22T20:46:40Z  
**Package:** `pkg-000077`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.png
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.png
```

## Purpose
Enforce M143 visual revision **1.1**: one continuous outer shell; Issue vs thread separated by **internal hairline dividers** (not two nested rounded boxes with a large gap). Projected testids present. Narrow stack OK (THR-P-E / THR-I-C).

## Risk
Reverting to pre-1.1 two-box layout; horizontal overflow on narrow.

## Code Facts (re-verify at execute)
- Visual SSOT = M143/M148 PNG
- Testids: `board-issue-post`, `issue-thread-block`

## AC / DoD
- [x] (P0) Continuous shell matches M143 rev 1.1 hierarchy
- [x] (P0) Testids projected on both mounts
- [x] (P0) Narrow: vertical stack; no horizontal overflow
- [x] (P0) No two-box technical panels from pre-1.1 drafts

## Where to change
- `BoardIssuePost` / `IssueThreadBlock` CSS · layout

## Out of scope
L10N file (T05) · invent HTTP · THR-02 tree interactions

## Verification
```bash
rg -n 'board-issue-post|issue-thread-block' spa-app/src || true
```
