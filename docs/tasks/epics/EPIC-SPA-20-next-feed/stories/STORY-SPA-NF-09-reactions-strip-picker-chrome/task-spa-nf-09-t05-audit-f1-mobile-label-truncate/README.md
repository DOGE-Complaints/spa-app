# SPA-NF-09-T05 — Mobile picker readable labels (F1)

**Status:** ✅ Done · P6 `2026-10-11T14:11:39Z`  
**Story:** [`../STORY-SPA-NF-09-reactions-strip-picker-chrome.md`](../STORY-SPA-NF-09-reactions-strip-picker-chrome.md)  
**Decision Ref:** [audit-STORY-SPA-NF-09-execution-2026-10-11.md](../../../../../../analysis/audit-STORY-SPA-NF-09-execution-2026-10-11.md) · F1 Medium  
**ui_scope:** `feed`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-11T14:09:55Z`  
**Package:** `pkg-000111` (unchanged · `run_mode=spa_nf_09_audit_2026_10_11`)  
**Gaps:** F1 → **CLOSED**  
**Done:** `2026-10-11T14:11:39Z`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)

## Purpose

Close F1: M154 mobile sheet must show readable reaction labels (no `Supp…` / `Needs evide…` truncation). Re-layout sheet choices + re-capture `04`.

## AC / DoD

- [x] Sheet choices wrap/stack with full labels at 390
- [x] `full-cycle/04` shows readable Emotional/Epistemic labels
- [x] Gap F1 CLOSED in P6

## Where to change

- `FeedReactionsStrip.css` / sheet picker choice layout
- `…/screenshots/full-cycle/04-…png`
- screenshots README

## Out of scope

M155 · F2 AppBar (T06) · F3–F4 WAIVED · P7/P8
