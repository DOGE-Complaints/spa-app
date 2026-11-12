# SPA-NF-02-T01 — Render civic issue-as-post (no schema/media production)

**Status:** Done · P3 (`2026-10-10T18:41:45Z`)  

**Story:** [`../STORY-SPA-NF-02-civic-issue-post.md`](../STORY-SPA-NF-02-civic-issue-post.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/next/feed`  
**puppeteer_gate:** `test:ui:board-shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:12:38Z`  
**Package:** `pkg-000104`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)

## Purpose
Render civic issue-as-post (no schema/media production).

## Arch anchors
- [02 §1 feed cards presentation · §2 honesty](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [01 §4 feed owns new UI; board residual](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)

## Arch context
- Civic Issue-as-post is feed visual plane content (M150 claim) on `#/next/feed*` — D2.2 — 02 §1.
- Confirmed issue payload only — no schema overlay / media production invent — 02 §2 · PRODUCT-BRIEF.
- One data plane: same gateway issue object as list/detail — 00 Q4.
- Fail-soft: missing fields collapse honestly — do not fake production schema — 02 §2.

## Implement notes
- Touch: feed card/post presentation modules under `features/feed/`.
- OOS: schema runtime production claim; media upload; shell chrome.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-02
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Civic post renders from existing issue fields without schema/media prod claim
- [x] Honest missing/collapse states
- [x] Composes under `#/next/feed` host (shell unchanged)

## Code Facts (re-verify at execute)
- Host: `#/next/feed` via `NextFeedHostPage` + `features/feed/` (NF-01 Done)
- Reuse: `IssueCard` / `BoardIssuePost` patterns — evolve in feed plane, not classic BoardPage claim
- Shell chrome OOS — next-shell Done

## Where to change
- `spa-app/src/features/feed/**` civic post modules · thin host only if needed
- Do not rewrite `AppShellLayout` / Header / ProfileRail

## Verification
```bash
rg -n "FeedListArea|IssueCard|BoardIssuePost|features/feed" spa-app/src/features/feed spa-app/src/pages/NextFeedHostPage.jsx | head -30
test -f spa-app/docs/UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md
```
