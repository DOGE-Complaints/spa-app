# Acceptance verification — SPA-THR-01

**Date:** 2026-09-22T20:46:40Z  
**Story:** STORY-SPA-THR-01-board-issue-post-mounts  
**Package:** `pkg-000077` (immutable)  
**Result:** **PASS**

## Product AC

| Check | Result |
|-------|--------|
| M143 continuous shell rev 1.1 on `/board` | PASS · happy PNG |
| `board-issue-post` wraps Issue + `issue-thread-block` | PASS |
| Fail-soft unavailable keeps Issue readable (component) | PASS · vitest |
| `/issue/:id` mounts same thread block (M148) | PASS · happy PNG |
| No invent social HTTP · route retained | PASS |
| Links M143 · M148 | PASS · Path A |

## §UI

| Check | Result |
|-------|--------|
| Path A mockups M143+M148 | PASS |
| story-root `screenshots/full-cycle` ≥1 happy PNG | PASS · 01 + 02 + narrow |
| `npm run test:ui:board-shell` | PASS |
| vitest | PASS · **588** passed / 2 skipped |

## Tasks

T01–T07 **Done** · L10N `threadsFeedDictionary.js` · harness `thr01-board-issue-post-screenshot.mjs`

## Guards

- No invent social HTTP · no THR-02…06 · no delete `/issue/:id` · no push · pkg-000077 unchanged
