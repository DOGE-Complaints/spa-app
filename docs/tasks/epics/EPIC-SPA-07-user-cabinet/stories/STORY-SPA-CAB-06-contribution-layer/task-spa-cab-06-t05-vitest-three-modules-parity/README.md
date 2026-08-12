# SPA-CAB-06-T05 — Vitest three modules + parity

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) T08, AC #1–#5  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-27T14:45:14Z

## Purpose
Закрыть backlog T08: Vitest coverage for 3 modules × (empty / populated / unavailable) + locale/flat-key parity + AC guards (no HTTP, no Submit Story CTA, C1 Coming Later).

## Risk
Missing state/locale tests → false confidence at story gate; regressions on comingSoon / L10N unnoticed.

## Code Facts (re-verify at execute)
- Pattern: CAB-05 T05 WalletStatus Vitest; StoryActivity multi-state tests.
- Target: `src/components/ContributionLayer/__tests__/` (+ UserCabinetPage mount if needed).
- Guards: no `fetch`/`/contribution/` in component; no Submit Story button in A1; C1 copy path.

## AC / DoD
- [ ] (P0) Vitest covers Receipts A1/A2/A3, Records B1/B2/B3, Reputation C1/C2/C3 (via preview/props).
- [ ] (P0) Assert no Submit Story CTA on A1; C1 Coming Later / comingSoon path.
- [ ] (P0) Assert no contribution HTTP calls in unit scope.
- [ ] (P0) Locale / flat-key parity assertions for `cabinet.contrib.*`.
- [ ] (P1) Icon src assertions for wired paths (T03).

## Where to change
- `spa-app/src/components/ContributionLayer/__tests__/`
- Possibly `src/pages/__tests__/UserCabinetPage.test.jsx` mount assertion

## Out of scope
- Puppeteer full-cycle (T06 / P3 UI). Live GW-CAB-03.

## Verification
```bash
cd spa-app && npm test -- --run ContributionLayer UserCabinetPage cabinetDictionary
```

Gate: [`acceptance-verification-spa-cab-06-t05.md`](./acceptance-verification-spa-cab-06-t05.md)
