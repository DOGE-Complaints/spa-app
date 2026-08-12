# SPA-HL-07-T03 — Implement split per plan

**Story:** [`../STORY-SPA-HL-07-bundle-size-split.md`](../STORY-SPA-HL-07-bundle-size-split.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md)  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Status:** Todo

## Purpose
Выполнить plan T02.

## Risk
Bundle regression / broken lazy routes.

## Code Facts (re-verify at execute)
- T02 plan

## AC / DoD
- [ ] Measurable improvement OR explicit waive
- [ ] App still boots

## Where to change
- `src/i18n/*`
- `src/pages/*`
- `vite config if any`

## Out of scope
- Remove locales

## Verification
```bash
npm run build  # compare to baseline
```
