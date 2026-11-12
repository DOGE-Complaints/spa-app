# Acceptance verification — SPA-NF-02-T02

**Status:** PASS  
**Date:** `2026-10-10T18:41:45Z`  
**Package:** `pkg-000104`  
**Task:** Wire open-issue/more/comment/react/share (+ shell location)

## AC

| AC | Result | Evidence |
|----|--------|----------|
| Catalog runtime icon URLs | PASS | `/icons/next-feed/actions/{open-issue,more,comment,react,share}.svg` in FeedCivicPost |
| Location shell reuse | PASS | `/icons/next-shell/actions/location.svg` when `geo` present |
| No docs-master paths in src | PASS | `rg` on `features/feed` — runtime `/icons/…` only |
| Affordances only (no invent write) | PASS | buttons without NF-04/05 handlers |

## Commands

```bash
ls spa-app/public/icons/next-feed/actions/{open-issue,more,comment,react,share}.svg \
  spa-app/public/icons/next-shell/actions/location.svg
```
