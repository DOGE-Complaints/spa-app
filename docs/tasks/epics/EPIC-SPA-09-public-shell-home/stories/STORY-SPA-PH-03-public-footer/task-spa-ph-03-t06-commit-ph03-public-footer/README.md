# SPA-PH-03-T06 — Commit PH-03 PublicFooter to git HEAD (post-audit F1)

**Status:** Done — P6 PASS 2026-08-04T11:10:14Z · commit `9710bdc`  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [audit-STORY-SPA-PH-03-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-03-execution-2026-08-04.md) §F1  
**Depends on:** SPA-PH-03-T01…T05 Done (P3 gate PASS)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_03_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T10:58:42Z

## Purpose
Зафиксировать PH-03 PublicFooter runtime + AppShell footer replace + page mounts + L10N в `git HEAD`: Story/gate Done на working tree, но clone/reset теряет Footer A (паттерн PH-02/G10-F1).

## Risk
Done на диске/gate ≠ Done в committed дереве → HEAD снова legacy `t('footer')` / `appShell.footer` one-liner.

## Code Facts (re-verify at execute)
- Audit `2026-08-04T10:52:22Z`: `?? src/components/PublicFooter/`; `M` AppShell (+index), Board/Issue/HowItWorks, `publicHomeDictionary.js` (+ tests); likely uncommitted `package.json` + `tests/puppeteer/public-footer-ph03*`.
- HEAD: no PublicFooter tree (`git ls-tree HEAD …PublicFooter` empty); Board still embeds `t('footer')` one-liner.
- WT: `footer={<PublicFooter />}` on Board/Issue/HowItWorks; AppShell full-element replace when `footer` prop set.

## AC / DoD
- [x] (P0) PH-03-scoped `src/components/PublicFooter/**`, AppShell footer wiring (+index export), Board/Issue/HowItWorks mounts, `publicHomeDictionary.js` (+ tests), and related `package.json` `test:ui:public-footer-ph03*` + puppeteer scripts committed in **spa-app** git root.
- [x] (P0) `git ls-tree HEAD --name-only | rg PublicFooter` nonempty; `git show HEAD:src/pages/BoardPage.jsx` references `PublicFooter`.
- [x] (P0) HEAD contains `publicHome.footer` keys; PublicFooter + publicHome vitest pass on committed tree.
- [x] (P0) Gate filled; Date from `--print-utc-now` after live verify. Exclude `docs/tasks/**` from commit (gitignored / methodology default).

Gate Date: 2026-08-04T11:10:14Z · Commit: `9710bdc`.

## Where to change
- Commit (spa-app git root) per [git-commit.md](../../../../../../../docs/methodology/git-commit.md) — plan commit for operator approval first if required by local habit.
- Scope: PublicFooter package + AppShell + pages + dict/test + puppeteer ph03 scripts / package.json scripts only.
- Gate: `acceptance-verification-spa-ph-03-t06.md`.

## Out of scope
- F2 narrow touch CSS (T07). F3 api-req As-of-Done (T08). F4–F6 WAIVED. Changing active pkg / rewriting `pkg-000047`. Product PH-04.

## Verification
```bash
cd spa-app && git ls-tree -r HEAD --name-only | rg 'PublicFooter' | head
cd spa-app && git show HEAD:src/pages/BoardPage.jsx | rg 'PublicFooter'
cd spa-app && git show HEAD:src/i18n/publicHomeDictionary.js | rg 'publicHome\.footer'
cd spa-app && npm test -- --run PublicFooter publicHome
```

Gate: [`acceptance-verification-spa-ph-03-t06.md`](./acceptance-verification-spa-ph-03-t06.md)
