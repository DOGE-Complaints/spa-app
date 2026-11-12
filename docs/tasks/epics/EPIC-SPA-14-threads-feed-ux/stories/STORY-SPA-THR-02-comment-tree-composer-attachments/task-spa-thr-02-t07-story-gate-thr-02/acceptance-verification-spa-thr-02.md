# Acceptance verification — STORY-SPA-THR-02

- **Date:** 2026-09-22T21:05:21Z
- **Package:** `pkg-000078-20260922-epic-spa-14-thr-02-comment-tree-composer-attachments.yaml`
- **Story:** STORY-SPA-THR-02-comment-tree-composer-attachments
- **Mockup Path A:** M144

## Result: **PASS**

| Check | Evidence |
|-------|----------|
| FR-THR-02.1–02.2 tree + max-depth | `CommentTree.jsx` · screenshots 01–02 |
| FR-THR-02.3–02.4 composer | `CommentComposer.jsx` · screenshot 03 |
| FR-THR-02.5–02.7 attach + denied draft | screenshots 04–05 · vitest |
| FR-THR-02.8 post soft-fail draft | screenshot 06 · vitest |
| FR-THR-02.9–02.10 no invent HTTP | presentation props + harness force only |
| L10N `threadsFeed.composer.*` | `threadsFeedDictionary.js` |
| Icons §Иконки | wired Runtime paths ON DISK |
| Screenshots story-root | `screenshots/README.md` · 7 PNGs |
| Vitest | **592** passed / 2 skipped |
| `--verify` | ok 7 paths · pkg-000078 |

## Guards

- Social Open → chrome + fail-soft only  
- No invent upload/thread HTTP  
- THR-03…06 not started  
- No git push · P4 not run (OP → Validator)
