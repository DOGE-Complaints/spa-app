# Acceptance verification — SPA-PH-04-T09

- **Task:** Commit PH-04 board feed to git HEAD (F1)
- **Package:** `pkg-000049-20260804-epic-spa-09-ph-04-post-audit.yaml`
- **Result:** PASS
- **Date:** 2026-08-04T12:48:38Z
- **Commit:** `7e8604d` — `feat(SPA-PH-04): replace board columns with single issue feed`

## AC

| AC | Status | Evidence |
|----|--------|----------|
| PH-04-scoped feed + dict/tests + IssueCard + package.json scripts + puppeteer committed | PASS | `git show 7e8604d --stat` (15 files; no `docs/tasks/**`) |
| HEAD BoardPage has no `board-columns`; has `board-feed` / `publicHome.board` | PASS | `git show HEAD:src/pages/BoardPage.jsx \| rg` |
| Vitest BoardPage.feed + publicHome on committed tree | PASS | `npm test -- --run BoardPage.feed publicHome` |

## Commands

```bash
cd spa-app && git rev-parse --short HEAD   # 7e8604d
cd spa-app && git show HEAD:src/pages/BoardPage.jsx | rg 'board-columns|board-feed|publicHome\.board'
cd spa-app && npm test -- --run BoardPage.feed publicHome
```
