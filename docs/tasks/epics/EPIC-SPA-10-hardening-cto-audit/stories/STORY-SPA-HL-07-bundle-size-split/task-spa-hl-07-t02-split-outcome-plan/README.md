# SPA-HL-07-T02 — Split outcome plan with file seams

**Story:** [`../STORY-SPA-HL-07-bundle-size-split.md`](../STORY-SPA-HL-07-bundle-size-split.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `architecture-designer`  
**Status:** Todo

## Purpose
Целевая метрика + candidate seams (dictionaries/routes) с paths.

## Risk
Blind split.

## Code Facts (re-verify at execute)
- identityDictionary.js ~1818 lines
- LoginPage/BoardPage sizes
- i18n EN/ET/RU critical

## AC / DoD
- [ ] Written plan: target + seams (cite files)
- [ ] Risk to i18n noted

## Where to change
- `pipeline story`

## Out of scope
- Implement

## Verification
```bash
Plan section exists
```
