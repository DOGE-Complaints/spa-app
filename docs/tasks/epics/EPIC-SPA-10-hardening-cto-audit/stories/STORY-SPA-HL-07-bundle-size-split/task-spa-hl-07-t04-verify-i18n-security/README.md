# SPA-HL-07-T04 — Verify i18n critical + verify:security

**Story:** [`../STORY-SPA-HL-07-bundle-size-split.md`](../STORY-SPA-HL-07-bundle-size-split.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md)  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Status:** Todo

## Purpose
Критические экраны + security harness.

## Risk
Silent i18n break.

## Code Facts (re-verify at execute)
- localeHardcodeGuard / i18n tests
- verify:security

## AC / DoD
- [ ] verify:security exit 0
- [ ] Smoke EN/ET/RU switch still works

## Where to change
- —

## Out of scope
- Full copy audit

## Verification
```bash
npm run verify:security
```
