# SPA-NS-06-T01 — `/` and `*` → `/next/feed` after shell works

**Status:** ✅ Done · P3 (`2026-10-09T17:50:50Z`)  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Depends on:** NS-01…05 shell Done  
**ui_scope:** `shell`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:35:01Z`  
**Package:** `pkg-000102`  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row _(verify)_ → NS-06  
**@brief:** [`../../../../../backlog-stories/next-shell/PRODUCT-BRIEF.md`](../../../../../backlog-stories/next-shell/PRODUCT-BRIEF.md) verify lock

## Purpose
Default entry: `/` and catch-all `*` → `/next/feed` after NS-01…05 ready — FR-NS-06.1.

## Risk
Flipping before shell works; inventing BoardFeed/feed E2E; inventing new HTTP; dual shell.

## Code Facts (re-verify at execute)
- `/` → `/board` today in [`App.jsx`](../../../../../../../src/App.jsx) (backlog verified)
- `#/next/feed*` registered above catch-all (NS-01)

## AC / DoD
- [x] (P0) `/` and `*` land on `#/next/feed`
- [x] (P0) No BoardFeed invent · no classic retire

## Where to change
- `spa-app/src/App.jsx` (or router table) redirects only

## Out of scope
Retire classic permanently · full feed product verify · invent CI beyond existing patterns

## Verification
```bash
rg -n "Navigate|path=['\"]/['\"]|next/feed|/board" spa-app/src/App.jsx spa-app/src/**/*Router* 2>/dev/null | head -40
```
