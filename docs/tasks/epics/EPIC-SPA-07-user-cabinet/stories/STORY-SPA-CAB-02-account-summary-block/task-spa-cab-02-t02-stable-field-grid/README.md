# SPA-CAB-02-T02 — Stable field grid

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) §FR-CAB-02.2, T02  
**Depends on:** [T01](../task-spa-cab-02-t01-account-summary-slot-profile-data/README.md)  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть FR-CAB-02.2 / T02: стабильная сетка строк Email / Account Created / Role / Account Status (M24–M26); layout не collapse при partial data.

## Risk
Без фиксированной сетки partial fields ломают карточку (AC #2).

## Code Facts (re-verify at execute)
- [`me_response.py:17-46`](../../../../../../../../doge-identity-service/src/core/api/me_response.py) — `/me` без `email`, `created_at`, account `status`.
- [mockup-24 §4–5](../../../../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.md) — четыре поля, табличная структура.

## AC / DoD
- [x] (P0) FR-CAB-02.2: четыре строки полей с label + value в `AccountSummary.jsx`.
- [x] (P0) AC #2: partial fields не ломают карточку (стабильный grid).
- [x] (P1) Layout соответствует M24–M26 §5 (иконка + label + value rhythm).

## Where to change
- `spa-app/src/components/AccountSummary/AccountSummary.jsx`
- `spa-app/src/components/AccountSummary/AccountSummary.css` (if needed)

## Out of scope
- State derivation complete/minimal/missing-email (T03). L10N wiring (T05). Icon PNG wiring (T06).

## Verification
```bash
cd spa-app && npm test -- --run AccountSummary
```
