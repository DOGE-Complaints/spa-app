# SPA-NS-09-T04 — Vitest markers (NS-03 update)

**Status:** Done
**Done:** `2026-10-22T13:13:43Z`
**Note:** P3 structure Pass · gate BLOCK · Path A fails:[]  
**Story:** [`../STORY-SPA-NS-09-profile-rail-feed-cleanup.md`](../STORY-SPA-NS-09-profile-rail-feed-cleanup.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:07:53Z`  
**Package:** `pkg-000202`  
**Path A:** code lock · Interview R2

## Purpose

FR-NS-09.6: Update NS-03 tests · Board→Feed · no summary · no empty copy · soft ns09 markers · Path A capture at P3.

## Code Facts (verify)

- AS-IS: `ProfileRail.ns03.test.jsx` expects Board / summary / No stories yet
- Target: Feed · summary Absent · empty Absent · OP eye not invent PASS

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS

## AC / DoD

- [x] Vitest green for rail NS-09 claims
- [x] Visual Done not claimed without OP eye

## Where changed

`ProfileRail.ns03.test.jsx` · soft `ProfileRail.ns09.test.jsx` · soft mobile tests

## Verification

```bash
cd spa-app && npm test -- --run src/components/AppShell
```
