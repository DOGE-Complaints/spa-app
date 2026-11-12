# SPA-NS-09-T02 — Feed label (was Board) · mobile soft

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

FR-NS-09.3 · 09.4: Nav label **Feed** (was Board) · `to=/next/feed` held · soft MobileBottomNav Feed.

## Code Facts (verify)

- AS-IS: `t('nextShell.rail.board')` · `t('nextShell.mobile.navBoard')` · `FEED_HOME = '/next/feed'`
- Target: Feed copy et/ru/en · route held · soft mobile label

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent routes beyond `/next/feed`

## AC / DoD

- [x] Feed label Present on rail
- [x] Soft mobile Feed Present
- [x] `to=/next/feed` held

## Where changed

`nextShellDictionary.js` · `ProfileRail.jsx` · soft `MobileBottomNav.jsx`

## Verification

```bash
rg -n "rail\\.board|navBoard|Feed|/next/feed" spa-app/src/components/AppShell spa-app/src/i18n/nextShellDictionary.js
```
