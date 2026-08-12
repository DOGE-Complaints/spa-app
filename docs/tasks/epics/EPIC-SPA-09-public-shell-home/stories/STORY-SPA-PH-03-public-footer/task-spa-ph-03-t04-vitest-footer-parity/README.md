# SPA-PH-03-T04 — Vitest footer structure + key parity

**Status:** Done — P3 2026-08-04T10:46:36Z  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md) AC #1–#3  
**Depends on:** T01–T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T10:35:41Z

## Purpose
Vitest coverage: PublicFooter structure (brand + tagline TBD + three links); L10N key parity for `publicHome.footer.*`; assert no social icon cluster.

## Risk
False green without structure asserts; missing locale key checks.

## Code Facts (re-verify at execute)
- Existing patterns: AccountControl / publicHome vitest under `src/**/__tests__` or co-located `*.test.jsx`.
- Keys SSOT: backlog table + `publicHomeDictionary.js` after T03.
- Tagline must assert literal `[TAGLINE_TBD]`.

## AC / DoD
- [x] (P0) Tests assert Footer A structure: brand + `[TAGLINE_TBD]` + About/Privacy/Contact → backlog AC #1/#2.
- [x] (P0) Key parity for `publicHome.footer.*` across locales → backlog AC #3.
- [x] (P0) No social/icon cluster assertions (or absence checks) → backlog AC #2.

## Where to change
- New/update: `spa-app/src/components/PublicFooter/*.test.jsx` (or `__tests__/`)
- Possibly dictionary key-parity helper tests

## Out of scope
Puppeteer / full-cycle UI (optional later); story gate (T05); inventing copy; CMS.

## Verification
```bash
cd spa-app && npm test -- --run PublicFooter publicHome
```
