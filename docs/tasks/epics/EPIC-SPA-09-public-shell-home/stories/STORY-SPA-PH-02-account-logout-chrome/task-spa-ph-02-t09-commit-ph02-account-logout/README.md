# SPA-PH-02-T09 — Commit PH-02 account logout chrome to git HEAD (post-audit F1)

**Status:** Done — P6 PASS 2026-08-04T10:21:47Z · commit `81eec52`  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** [audit-STORY-SPA-PH-02-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-02-execution-2026-08-04.md) §F1  
**Depends on:** SPA-PH-02-T01…T08 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_02_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T10:17:54Z

## Purpose
Зафиксировать PH-02 AccountControl runtime + Header slot + L10N в `git HEAD`: сейчас Story/gate Done на working tree, но clone/reset теряет account chrome (паттерн G10/G11-F1).

## Risk
Done на диске/gate ≠ Done в committed дереве → empty PH-01 `header-account-slot` after reset.

## Code Facts (re-verify at execute)
- Audit `2026-08-04T10:05:48Z`: `?? src/components/AccountControl/`; `M Header.jsx`; `M publicHomeDictionary.js` (+ test).
- HEAD Header: `accountSlot` render only — **no** AccountControl import (`git ls-tree HEAD …AccountControl` empty).
- WT: `AccountControlSlot` default in Header; `supabase.auth.signOut` in `AccountControl.jsx`.

## AC / DoD
- [x] (P0) PH-02-scoped `src/components/AccountControl/**`, Header default slot wiring, `publicHomeDictionary.js` (+ `publicHomeDictionary.test.js`), and related `package.json` `test:ui:public-header-ph02*` scripts (if uncommitted) committed in **spa-app** git root.
- [x] (P0) `git ls-tree HEAD --name-only | rg AccountControl` nonempty; `git show HEAD:src/components/AppShell/Header.jsx` references `AccountControlSlot`.
- [x] (P0) HEAD contains `signOut` under AccountControl; AccountControl + publicHome vitest pass on committed tree.
- [x] (P0) Gate filled; Date from `--print-utc-now` after live verify. Exclude `docs/tasks/**` from commit (gitignored / methodology default).

Gate Date: 2026-08-04T10:21:47Z · Commit: `81eec52`.

## Where to change
- Commit (spa-app git root) per [git-commit.md](../../../../../../../docs/methodology/git-commit.md) — plan commit for operator approval first if required by local habit.
- Scope: AccountControl package + Header + dict/test + puppeteer ph02 scripts / package.json scripts only.
- Gate: `acceptance-verification-spa-ph-02-t09.md`.

## Out of scope
- F3 As-of-Done docs (T10). F4 chevron art. Changing active pkg / rewriting `pkg-000046`. Product PH-03.

## Verification
```bash
cd spa-app && git ls-tree -r HEAD --name-only | rg 'AccountControl' | head
cd spa-app && git show HEAD:src/components/AppShell/Header.jsx | rg 'AccountControlSlot'
cd spa-app && git show HEAD:src/components/AccountControl/AccountControl.jsx | rg 'signOut'
cd spa-app && npm test -- --run AccountControl publicHome
```

Gate: [`acceptance-verification-spa-ph-02-t09.md`](./acceptance-verification-spa-ph-02-t09.md)
