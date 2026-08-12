# SPA-G8-T05 — Visual smoke board + issue shell

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** backlog AC visual/nav parity  
**Depends on:** T01–T04  
**ui_scope:** `visual`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T08:03:20Z

## Purpose
Visual smoke: board + issue-details; визуальный и навигационный паритет с pre-refactor UI.

## Risk
Layout shift / missing header-controls / wrong active nav.

## Code Facts (re-verify at execute)
- No `@mockup:` artboard — SSOT = current Board/Issue UI + design-system §4.1/4.2.
- G7 pattern: `ui-baseline/pre-implement` + `post-implement` + story-root `screenshots/`.

## AC / DoD
- [ ] (P0) Board and issue screenshots show shell parity (header, sidebar, locale, nav).
- [ ] (P0) No material layout regressions vs baseline.
- [ ] (P0) `test:ui:board-shell` exit 0 (if still applicable).

## Where to change
- Screenshots / smoke notes only (impl in T01–T03).

## Out of scope
- Docs INDEX (T06). New routes.

## Verification
```bash
cd spa-app && npm run test:ui:board-shell
# Manual: board + issue screenshots 1536×1024
```

Gate: [`acceptance-verification-spa-g8-t05.md`](./acceptance-verification-spa-g8-t05.md)

Gate Date: 2026-07-29T08:27:15Z.
