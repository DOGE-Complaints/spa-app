# STORY-SPA-NF-07 — screenshots pack (story-root)

**Date:** `2026-10-11T13:33:02Z` · **pkg-000109** · Path A M150 · DEMO-NF07  
**Gate:** [acceptance-verification-spa-nf-07.md](../task-spa-nf-07-t05-live-vitest-edges/acceptance-verification-spa-nf-07.md)  
**P6 gaps:** F1 CLOSED T06 · F2 CLOSED T07 · `run_mode=spa_nf_07_audit_2026_10_11`  
**Arch:** AD-VP-01 · AD-VP-04

## Matrix (SSOT)

Full-cycle evidence lives in [`full-cycle/`](./full-cycle/) — see [`full-cycle/README.md`](./full-cycle/README.md).

| # | File | Claim | Notes |
|---|------|-------|-------|
| 01 | `full-cycle/01-feed-civic-four-zone-strip-demo-fixture-1536x1024.png` | M150 four-zone strip · light chrome · full host | md5 `d9345183…` |
| 02 | `full-cycle/02-feed-civic-no-media-status-honesty-demo-fixture-1536x1024.png` | ISSUE-CARD-NO-MEDIA · PUBLISHED honesty | **element crop** civic post · md5 `95e9ff3a…` ≠ `01` (P6 F1) |
| 03 | `full-cycle/03-feed-civic-sparse-meta-reactions-empty-demo-fixture-1536x1024.png` | Missing geo/date · Reactions zone present | md5 `b08622e1…` |
| 04 | `full-cycle/04-feed-civic-narrow-four-zone-demo-fixture-390x844.png` | Narrow 390 · four zones unclipped | **feed-body** `board-issue-post` crop · no AppBar claim (P6 F2) |

UI-0 / post-implement baselines: `task-spa-nf-07-t01-…/ui-baseline/`.

Shell chrome OOS (AppBar «Feed coming soon» residual not used as feed evidence). No invent M155. Civic paw = catalog gap (honest omit).
