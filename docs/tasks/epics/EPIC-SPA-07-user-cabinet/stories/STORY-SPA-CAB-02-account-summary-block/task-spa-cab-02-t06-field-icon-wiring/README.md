# SPA-CAB-02-T06 — Field icon wiring

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) §Иконки, T06; [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #1–#4  
**Depends on:** [T02](../task-spa-cab-02-t02-stable-field-grid/README.md)  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть T06: icon-wiring полей (ic-field-*); missing-email (M26) БЕЗ warning-иконки.

## Risk
Missing icons or warning icon on M26 email row violates mockup-26 §7 and icon catalog §Заметки.

## Code Facts (re-verify at execute)
- [`public/icons/user-cabinet/ic-field-email.png`](../../../../../../../public/icons/user-cabinet/ic-field-email.png) — exists.
- [`public/icons/user-cabinet/ic-field-created.png`](../../../../../../../public/icons/user-cabinet/ic-field-created.png) — exists.
- [`public/icons/user-cabinet/ic-field-role.png`](../../../../../../../public/icons/user-cabinet/ic-field-role.png) — exists.
- [`public/icons/user-cabinet/ic-field-status.png`](../../../../../../../public/icons/user-cabinet/ic-field-status.png) — exists.
- Runtime path: `/icons/user-cabinet/ic-<name>.png` per icon catalog.

## AC / DoD
- [x] (P0) Four field rows use ic-field-email/created/role/status PNGs with `aria-hidden="true"`.
- [x] (P0) M26 missing-email: Email value = `Not Available` text only — **no warning icon**.
- [x] (P1) AC #1 visual parity with M24 §5 (icon + label + value).

## Where to change
- `spa-app/src/components/AccountSummary/AccountSummary.jsx`
- `spa-app/src/components/AccountSummary/AccountSummary.css` (icon sizing)

## Out of scope
- Generating new PNG assets (already in repo). Civic/wallet icons (CAB-03…06).

## Verification
```bash
cd spa-app && npm test -- --run AccountSummary
```
