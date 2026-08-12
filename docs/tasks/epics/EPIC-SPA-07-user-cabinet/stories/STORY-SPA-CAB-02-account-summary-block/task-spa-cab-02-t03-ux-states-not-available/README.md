# SPA-CAB-02-T03 — UX states + Not Available

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) §FR-CAB-02.3–02.4, T03  
**Depends on:** [T02](../task-spa-cab-02-t02-stable-field-grid/README.md)  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть FR-CAB-02.3–02.4 / T03: три UX-состояния complete (M24) / minimal-data (M25) / missing-email (M26); отсутствующее поле → `cabinet.common.notAvailable` (muted, не error).

## Risk
Неверный state derivation → AC #3 не достижим; error styling на missing fields нарушает M26.

## Code Facts (re-verify at execute)
- [mockup-25-account-summary-minimal-data-spec.md](../../../../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.md) — partial secondary fields.
- [mockup-26-account-summary-missing-email-spec.md](../../../../../../UX/mockups/user%20profile/mockup-26-account-summary-missing-email-spec.md) §7 — missing email без warning icon.
- Email/status/created_at — placeholder до расширения backend contract (pipeline story §Routes/API).

## AC / DoD
- [x] (P0) FR-CAB-02.3: три состояния M24/M25/M26 достижимы при соответствующих данных.
- [x] (P0) FR-CAB-02.4: отсутствующее поле → `Not Available` muted, не error state, не collapse layout.
- [x] (P0) AC #2: partial fields с `Not Available` без поломки карточки.
- [x] (P0) AC #3: три состояния M24/M25/M26 достижимы.

## Where to change
- `spa-app/src/components/AccountSummary/AccountSummary.jsx` — state derivation + muted placeholder styling
- `spa-app/src/components/AccountSummary/accountSummaryState.js` (optional helper)

## Out of scope
- Privacy guard (T04). L10N dictionary (T05). Field icons (T06).

## Verification
```bash
cd spa-app && npm test -- --run AccountSummary
```
