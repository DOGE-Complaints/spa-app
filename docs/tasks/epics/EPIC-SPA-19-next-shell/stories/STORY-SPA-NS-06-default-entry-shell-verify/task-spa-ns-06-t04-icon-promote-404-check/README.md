# SPA-NS-06-T04 — Shell icon runtime URLs 404-free after promote

**Status:** ✅ Done · P3 (`2026-10-09T17:50:50Z`)  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Depends on:** NS-02 promote (may already be Done)  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:35:01Z`  
**Package:** `pkg-000102`  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@icons:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)

## Purpose
Icon promote completed for shell subset; smoke no 404 on catalog URLs; logo reuse 404-free — FR-NS-06.4.

## Code Facts (re-verify at execute)
- Runtime: `public/icons/next-shell/{navigation,actions,status}/` — **Present** after NS-02 (verify at execute)
- Logo: `/assets/DOGEstonia-logo-horizontal.png` (+ fallback)
- **No** new SVG masters invent

## AC / DoD
- [x] (P0) Shell icon runtime URLs 404-free after promote
- [x] (P0) Logo reuse verified 404-free in shell smoke
- [x] (P0) Masters remain under docs icon-system (no invent)

## Where to change
- Verify/promote only if missing · smoke fixture or live GET

## Out of scope
New icon masters · feed body icons invent

## Verification
```bash
ls spa-app/public/icons/next-shell/navigation/*.svg | head
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/icons/next-shell/navigation/menu.svg
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/assets/DOGEstonia-logo-horizontal.png
```
