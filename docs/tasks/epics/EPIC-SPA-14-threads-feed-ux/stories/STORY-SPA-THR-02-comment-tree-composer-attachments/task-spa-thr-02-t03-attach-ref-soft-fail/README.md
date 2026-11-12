# SPA-THR-02-T03 — Attach ref chip + denied soft-fail (no floor bypass)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** FR-THR-02.5–02.8 · AC-SPA-THR-06 · M144 THR-T-D/E/F  
**Depends on:** SPA-THR-02-T02  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T21:00:23Z
**Done:** 2026-09-22T21:05:21Z  
**Package:** `pkg-000078`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png
```

## Purpose
Allowed attach = compact reference chip (not gallery). Denied = persistent inline warning; rejected item not shown as attached; draft text preserved. **No** control to disable legal floor. Post soft-fail preserves draft + valid refs.

## Risk
Gallery product; floor bypass UI; invent upload HTTP; silent draft erase.

## Code Facts (re-verify at execute)
- Attachment transport: **Open** — presentation refs only
- Icons ON DISK per story §Иконки

## AC / DoD
- [x] (P0) THR-T-D compact attach chip + remove
- [x] (P0) THR-T-E denied persistent warning; no floor bypass
- [x] (P0) Denied attach does not erase draft (FR-THR-02.7)
- [x] (P0) THR-T-F post soft-fail preserves draft (if not completed in T02)
- [x] (P0) No invent upload HTTP / hashes in UI

## Where to change
- `src/components/threads/` attach chip + soft-fail banners

## Out of scope
Icons path audit (T04) · L10N merge (T05) · invent HTTP

## Verification
```bash
rg -n 'attachDenied|attachment|floor|issue-thread-attach' spa-app/src/components/threads || true
```
