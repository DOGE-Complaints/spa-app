# SPA-HL-07-T01 — Baseline Vite chunk metrics

**Story:** [`../STORY-SPA-HL-07-bundle-size-split.md`](../STORY-SPA-HL-07-bundle-size-split.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `devops-engineer`  
**Status:** Todo

## Purpose
Записать текущий размер main JS chunk после production build.

## Risk
Нет baseline → нет outcome.

## Code Facts (re-verify at execute)
- audit: ~662 kB JS / gzip ~185 kB
- vite chunk warning >500 kB

## AC / DoD
- [ ] Metric note with date/HEAD
- [ ] Command used documented

## Where to change
- `docs/analysis/ or pipeline story`

## Out of scope
- Implement split

## Verification
```bash
npm run build  # record dist/assets/*.js sizes
```
