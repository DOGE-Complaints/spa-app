# SPA-PH-02-T05 — Account icons reuse

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog icons table · AC «icon catalog reuse rows referenced»  
**Depends on:** T01  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Wire catalog paths: account/profile `ic-field-role.png`; dropdown chevron `ic-chevron-down.png`. Placeholder PNG OK (non-blocking).

## Risk
Wrong paths; inventing new icon files under public-home.

## Code Facts (re-verify at execute)
- On disk: `spa-app/public/icons/user-cabinet/ic-field-role.png`, `spa-app/public/icons/identity/ic-chevron-down.png`.
- Catalog: [STORY-SPA-PH-icon-assets.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md).

## AC / DoD
- [ ] (P0) Markup uses `/icons/user-cabinet/ic-field-role.png` and `/icons/identity/ic-chevron-down.png` (or documented fallback).
- [ ] (P0) README/gate links catalog reuse rows (backlog AC #4).

## Where to change
- `AccountControl` img `src` attributes

## Out of scope
Final art replacement; new icon generation.

## Verification
```bash
test -f spa-app/public/icons/user-cabinet/ic-field-role.png
test -f spa-app/public/icons/identity/ic-chevron-down.png
rg -n 'ic-field-role|ic-chevron-down' spa-app/src/components/AccountControl 2>/dev/null || true
```
