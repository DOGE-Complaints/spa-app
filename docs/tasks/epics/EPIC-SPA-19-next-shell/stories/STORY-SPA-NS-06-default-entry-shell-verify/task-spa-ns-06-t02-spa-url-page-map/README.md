# SPA-NS-06-T02 — Update spa-url-page-map for next shell + home flip

**Status:** ✅ Done · P3 (`2026-10-09T17:50:50Z`)  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Depends on:** T01 default entry flip  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:35:01Z`  
**Package:** `pkg-000102`  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row _(verify)_

## Purpose
Update spa-url-page-map for next shell routes + home flip — FR-NS-06.2.

## Code Facts (re-verify at execute)
- Page map file: `spa-app/docs/spa-url-page-map.md` (create/update as needed)
- Next routes `#/next/feed*` · classic shelter `#/board` · home → feed

## AC / DoD
- [x] (P0) spa-url-page-map updated for next shell + home flip
- [x] (P0) Classic shelter routes documented honestly (not product home)

## Where to change
- `spa-app/docs/spa-url-page-map.md`

## Out of scope
Feed body route invent · BoardFeed E2E

## Verification
```bash
test -f spa-app/docs/spa-url-page-map.md && rg -n 'next/feed|/board' spa-app/docs/spa-url-page-map.md | head -30
```
