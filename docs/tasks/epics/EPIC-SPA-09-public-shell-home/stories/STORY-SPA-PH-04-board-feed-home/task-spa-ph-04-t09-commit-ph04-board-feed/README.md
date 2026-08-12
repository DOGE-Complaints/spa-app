# SPA-PH-04-T09 — Commit PH-04 board feed to git HEAD (post-audit F1)

**Status:** Done — P3 2026-08-04T12:48:38Z  
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [audit-STORY-SPA-PH-04-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-04-execution-2026-08-04.md) §F1  
**Depends on:** SPA-PH-04-T01…T08 Done (P3 gate PASS)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-04T12:33:45Z  
**Package:** `pkg-000049`  
**Commit:** `7e8604d`

## Purpose
Зафиксировать PH-04 board feed cutover + L10N + IssueCard affordance + tests в `git HEAD`: Story/gate Done на WT, но clone/reset восстанавливает `board-columns`.

## Risk
Done на диске/gate ≠ Done в committed дереве → HEAD снова kanban scaffold.

## Code Facts (re-verify at execute)
- Committed: BoardPage feed, index.css, IssueCard.*, publicHomeDictionary (+tests), BoardPage.feed.test, package.json scripts, puppeteer `public-board-ph04*`, M132 mockups.
- HEAD: no `board-columns`; has `board-feed` / `publicHome.board`.

## AC / DoD
- [x] (P0) PH-04-scoped feed runtime + dict/tests + IssueCard chevron + `package.json` `test:ui:board-feed-ph04*` + puppeteer scripts committed in **spa-app** git root.
- [x] (P0) `git show HEAD:src/pages/BoardPage.jsx` has **no** `board-columns`; has `board-feed` / `publicHome.board`.
- [x] (P0) HEAD contains `publicHome.board` keys; BoardPage.feed + publicHome vitest pass on committed tree.
- [x] (P0) Gate filled; Date from `--print-utc-now`. Exclude `docs/tasks/**` from commit.

## Where to change
- Commit (spa-app git root) per [git-commit.md](../../../../../../../docs/methodology/git-commit.md)
- Gate: [`acceptance-verification-spa-ph-04-t09.md`](./acceptance-verification-spa-ph-04-t09.md)

## Out of scope
F3–F7 (T10–T13). Changing active pkg / rewriting `pkg-000048`. Product PH-06.

## Verification
```bash
cd spa-app && git show HEAD:src/pages/BoardPage.jsx | rg 'board-columns|board-feed' || true
cd spa-app && git show HEAD:src/i18n/publicHomeDictionary.js | rg 'publicHome\.board'
cd spa-app && npm test -- --run BoardPage.feed publicHome
```
