# SPA-CAB-06-T02 — Runtime states A1–C3 stub (no contribution HTTP)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) §FR-CAB-06.2–06.6, T02–T05, Routes/API, AC  
**Depends on:** T01  
**ui_scope:** `mixed`  
**extends:** T01 / ui-mockup M53 (+ M23 empty composite)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-27T14:45:14Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-53-contribution-layer-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-53-contribution-layer-state-sheet-spec.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Закрыть FR-CAB-06.2–.6 и backlog T02–T05: UI для Receipts A1/A2/A3, Records B1/B2/B3, Reputation C1/C2/C3; MVP defaults A1 empty (**без** Submit Story) + C1 Coming Later; **нет HTTP** к contribution endpoints; retry/affordances → `cabinet.common.comingSoon`; privacy M53 §5; ledger aesthetic (не social reputation / gamification).

## Risk
Live HTTP / Submit Story CTA / numeric score-rank нарушают MVP AC; false “live ledger” UX.

## Code Facts (re-verify at execute)
- MVP Routes/API (backlog): UI without HTTP; affordances → `cabinet.common.comingSoon`; no `GET /contribution/receipts|records`.
- FR-CAB-06.5: A1 empty **без** primary `Submit Story`.
- FR-CAB-06.4: C2 available **без** numeric score/rank; C1 Coming Later / Coming soon.
- `cabinet.common.comingSoon` / `comingLater` / `retry` already in [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js).
- DEV hook (pipeline story): `sessionStorage['doge.contrib-preview']` — see story §DEV.

## AC / DoD
- [ ] (P0) AC #1: Три модуля видны (states render in layout).
- [ ] (P0) AC #2: **Нет HTTP** к contribution endpoints; клики → `cabinet.common.comingSoon`.
- [ ] (P0) AC #3: Reputation C1 `Coming Later` / Coming soon (MVP default).
- [ ] (P0) AC #4: A1 empty **без** Submit Story CTA.
- [ ] (P0) FR-CAB-06.2–.4: UI layouts A1–C3 available (populated/unavailable via DEV preview; live backend = follow-up GW-CAB-03).
- [ ] (P0) FR-CAB-06.6: ledger aesthetic; no social reputation / leaderboard / XP copy.

## Where to change
- `spa-app/src/components/ContributionLayer/` (+ helpers/state if needed)
- `spa-app/src/pages/UserCabinetPage.jsx` — props / `doge.contrib-preview` hook

## Out of scope
- Icon asset wiring paths (T03). Dictionary keys table (T04). Vitest (T05). Live GW-CAB-03. Submit Story CTA (post-MVP).

## Verification
```bash
cd spa-app && npm test -- --run ContributionLayer UserCabinetPage
rg -n "fetch\(|/contribution/" src/components/ContributionLayer || true
rg -n "Submit Story|submitStory" src/components/ContributionLayer || true
```

Gate: [`acceptance-verification-spa-cab-06-t02.md`](./acceptance-verification-spa-cab-06-t02.md)
