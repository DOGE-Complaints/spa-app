# Acceptance verification — STORY-SPA-NF-08

**Status:** PASS  
**Date:** `2026-10-11T13:41:25Z`  
**Package:** `pkg-000110`  
**Epic:** EPIC-SPA-20 · **Story:** STORY-SPA-NF-08-discussion-collapsed-composer-reskin  
**Live:** SPA `127.0.0.1:4173` · gateway may be DOWN · DEMO-NF08 harness fixtures OK  
**Arch:** AD-VP-01 (reskin) · AD-VP-02 (presentation boundary) · AD-VP-04 (live↔artboard)

## Traceability (backlog AC)

| AC | Result | Evidence |
|----|--------|----------|
| Live THR-P-C collapsed per M152 | PASS | full-cycle `01`/`04` · `feed-discussion-collapsed` · preview bodies · View discussion |
| No classic DISCUSSION 3-button row | PASS | no `issue-thread-actions` · civic strip owns React\|Comment\|Share\|Reactions |
| Expand → M153 tree + oval composer | PASS | full-cycle `02` · `feed-discussion-expanded` · CommentTree + oval input |
| Edges + AD-VP-01/02 | PASS | `03` unavailable · vitest FeedDiscussion.nf08 · ARCH-DELTA cited |
| Closed client reuse | PASS | LiveIssueThreadMount + ThreadsSocialClient · BlockComponent swap only |

## §UI (ui_gate auto · Path A M152/M153)

| Gate | Result |
|------|--------|
| UI-0 | PASS · pre-implement baseline T01 |
| UI-1 Path A | PASS · ui-mockup-spec M152 (+ M153 expand) |
| UI-2 | PASS · FeedDiscussionBlock + FeedThreadMount |
| UI-3 | PASS · vitest nf08 · board-shell 0b · post-implement PNG |
| Story-root screenshots | PASS · `screenshots/README.md` + `full-cycle/` |

## Commands

```bash
cd spa-app && npx vitest run src/features/feed/__tests__/FeedDiscussion.nf08.test.jsx \
  src/i18n/__tests__/nextFeedDictionary.test.js
cd spa-app && npm run test:ui:board-shell
cd spa-app && node scripts/tmp-nf08-p3-capture.mjs
```

## Out of scope

- M155 people · invent threads URLs · shell D2 · multipart blob · weaken collapsed must-state

## Verdict

**Story gate PASS** — NF-08 discussion collapsed + oval composer reskin Done for `pkg-000110`.
