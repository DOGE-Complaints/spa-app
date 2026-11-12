# SPA-NS-09-T03 — Remove «No stories yet» empty copy

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
**Path A:** code lock · Interview R2

## Purpose

FR-NS-09.5: Remove «No stories yet» empty copy — honest omit or metrics-only when metrics Present.

## Code Facts (verify)

- AS-IS: `profile-rail__empty` · `t('nextShell.rail.empty')` when `!hasMetrics`
- Target: omit empty paragraph · do **not** invent activity API / fake counts

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent activity API

## AC / DoD

- [x] «No stories yet» Absent
- [x] Metrics-only when metrics Present (held)

## Where changed

`ProfileRail.jsx` · soft i18n `nextShell.rail.empty`

## Verification

```bash
rg -n "profile-rail-empty|rail\\.empty|No stories yet" spa-app/src/components/AppShell spa-app/src/i18n
```
