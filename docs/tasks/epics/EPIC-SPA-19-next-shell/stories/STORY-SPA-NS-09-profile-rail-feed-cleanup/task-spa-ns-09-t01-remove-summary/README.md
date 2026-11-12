# SPA-NS-09-T01 — Remove summary Profile block

**Status:** Done
**Done:** `2026-10-22T13:13:43Z`
**Note:** P3 structure Pass · gate BLOCK · Path A fails:[]  
**Story:** [`../STORY-SPA-NS-09-profile-rail-feed-cleanup.md`](../STORY-SPA-NS-09-profile-rail-feed-cleanup.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:07:53Z`  
**Package:** `pkg-000202`  
**Path A:** code lock · Interview R2 · soft M149 / Component §10

## Purpose

FR-NS-09.1 · 09.2: Drop top summary Profile block (icon + meta + non-working chevron). Keep lower nav **Profile** as sole Profile entry.

## Code Facts (verify)

- AS-IS: `ProfileRail.jsx` `profile-rail__summary` · chevron · session meta
- Target: remove summary · hold `profile-rail__nav` Profile link

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · Logo/locale/activity API OOS

## AC / DoD

- [x] Summary block Absent
- [x] Lower nav Profile Present
- [x] Visual Done not claimed without OP eye

## Where changed

`ProfileRail.jsx` · `ProfileRail.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "profile-rail__summary|profile-rail-summary" spa-app/src/components/AppShell
```
