# SPA-PH-04-T06 — L10N publicHome.board.*

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.L10N  
**Depends on:** — (can land with/before T04)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
Add `publicHome.board.*` keys (en/et/ru) + `PUBLIC_HOME_FLAT_KEYS` parity. EN = M132 canon. No «Oops». Reuse SEARCH filter labels — do not duplicate.

## Risk
Inventing copy; missing locale parity; leaving legacy `noIssuesRecorded` / `noResultsMatch` as primary empty copy.

## Code Facts (re-verify at execute)
- [`publicHomeDictionary.js`](../../../../../../../src/i18n/publicHomeDictionary.js) — nav/account/footer only; **no** `publicHome.board.*` yet.
- Verbatim table in backlog §`publicHome.board.*`.
- Forbidden: «Oops», blame language, campaign invitation copy.

## AC / DoD
- [x] (P0) All `publicHome.board.*` keys from backlog table in en/et/ru (FR-PH-04.L10N) → backlog AC #5 L10N.
- [x] (P0) FLAT_KEYS parity; no «Oops».
- [x] (P0) Filter chrome reuses SEARCH keys (not re-authored under board.*).

## Where to change
- `spa-app/src/i18n/publicHomeDictionary.js` (+ FLAT_KEYS)
- Consumers in BoardPage (with T04)

## Out of scope
New SEARCH filter strings; inventing keys outside backlog table; footer/nav keys.

## Verification
```bash
rg -n 'publicHome\.board|PUBLIC_HOME_FLAT_KEYS' spa-app/src/i18n/publicHomeDictionary.js
```
