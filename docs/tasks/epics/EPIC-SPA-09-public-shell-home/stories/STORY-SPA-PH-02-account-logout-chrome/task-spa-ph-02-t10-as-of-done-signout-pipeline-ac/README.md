# SPA-PH-02-T10 — As-of-Done signOut snapshot + pipeline AC checkboxes (post-audit F3)

**Status:** Done — P6 PASS 2026-08-04T10:23:31Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** [audit-STORY-SPA-PH-02-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-02-execution-2026-08-04.md) §F3  
**Depends on:** SPA-PH-02-T08 Done · T09 may run first (order in run_mode)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_02_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T10:17:54Z

## Purpose
Закрыть audit **F3**: backlog + pipeline §«Текущее состояние» всё ещё утверждают «`signOut` не вызывается»; pipeline Acceptance Criteria `[ ]` при Status Done / gate PASS / backlog AC `[x]`.

## Risk
Doc drift → ложный FE gap для следующего intake; противоречие Status Done vs unchecked AC.

## Code Facts (re-verify at execute)
- WT: `supabase.auth.signOut()` in [`AccountControl.jsx`](../../../../../../../src/components/AccountControl/AccountControl.jsx) (~L96).
- Backlog §состояние (pre-T10): «`signOut` не вызывается нигде в `spa-app/src`».
- Pipeline AC lines remain `[ ]` while Meta Status Done (`pkg-000046`).

## AC / DoD
- [x] (P0) Backlog [STORY-SPA-PH-02-account-logout-chrome.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md) §«Текущее состояние» As-of-Done: signOut wired in AccountControl; no FE gap claim.
- [x] (P0) Pipeline story §«Текущее состояние» (if present) matches; Acceptance Criteria all `[x]` aligned with backlog/gate.
- [x] (P0) Gate filled; Date from `--print-utc-now` after verify (`rg signOut` + AC checkboxes).

Gate Date: 2026-08-04T10:23:31Z.

## Where to change
- EDIT backlog `public-home/STORY-SPA-PH-02-account-logout-chrome.md`
- EDIT pipeline `STORY-SPA-PH-02-account-logout-chrome.md`
- Gate: `acceptance-verification-spa-ph-02-t10.md`

## Out of scope
- F1 commit (T09). F4 icon art. Runtime code changes. New stories.

## Verification
```bash
rg -n 'signOut' spa-app/src/components/AccountControl/AccountControl.jsx
rg -n 'не вызывается|signOut' spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-02-account-logout-chrome/STORY-SPA-PH-02-account-logout-chrome.md
rg -n '^\- \[x\]' spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-02-account-logout-chrome/STORY-SPA-PH-02-account-logout-chrome.md | head
```

Gate: [`acceptance-verification-spa-ph-02-t10.md`](./acceptance-verification-spa-ph-02-t10.md)
