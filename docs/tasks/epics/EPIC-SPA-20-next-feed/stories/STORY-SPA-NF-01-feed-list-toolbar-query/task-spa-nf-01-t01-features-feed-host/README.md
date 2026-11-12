# SPA-NF-01-T01 — Scaffold `features/feed/` and replace WIP host content with feed list host

**Status:** Done
**Story:** [`../STORY-SPA-NF-01-feed-list-toolbar-query.md`](../STORY-SPA-NF-01-feed-list-toolbar-query.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md)
**ui_scope:** `feed`
**ui_anchor:** true
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-10T17:39:48Z`
**Package:** `pkg-000103`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)

## Purpose
Scaffold `features/feed/` and replace WIP host content with feed list host.


## Arch anchors
- [00 §3 L2 thin pages / L3 features/feed](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)
- [01 §3 D2.2 feed content on `#/next/feed*`](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)
- [02 §1 Boundaries — feed visual plane](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Layer **L3** visual plane lives under target `src/features/feed/`; page host stays thin (**L2**) — arch 00/02.
- This epic is **D2.2** content: shell chrome already Done (D2.1 next-shell); do not re-own `AppShellLayout` — 01 §3.
- Q4: one data plane (`services`/`repositories`/`auth`/`i18n`); no second HTTP client — 00 Q4 · 02 §1.
- Exact filenames inside `features/feed/` = implement-wave choice (**name ≠ create** in arch) — 00 §4 Unknowns · 02 §1.
- Claimable home UI = `#/next/feed*` (not classic `#/board`) — 00 §3 · 01 §1.

## Implement notes
- Touch: thin next/feed page orchestrator + new `features/feed/` modules as needed.
- Replace WIP placeholder content with honest feed list host (loading/empty allowed).
- OOS: Header/ProfileRail/grid chrome; classic `features/board` fork; invent routes.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for NF-01
- [ ] Runtime icon URLs from catalog (no docs masters)
- [ ] No shell D2 ownership claim
- [ ] Feed content composes under existing `#/next/feed` host (shell unchanged)
- [ ] Uses `features/feed/` (or thin page → feature) without second layout framework
- [ ] No AppShell/Header ownership change (D2.1 OOS)

## Code Facts (re-verify at execute)
- Host: `#/next/feed` via [`NextFeedHostPage`](../../../../../../../src/pages/NextFeedHostPage.jsx) (WIP today)
- Target home: `spa-app/src/features/feed/` (create at P3)
- Shell chrome OOS — next-shell Done

## Where to change
- `spa-app/src/features/feed/**` (new) · thin next/feed page host
- Do not rewrite `AppShellLayout` / Header / ProfileRail

## Verification
```bash
test -d spa-app/src/features/feed || echo "features/feed pending P3"
rg -n "next/feed|NextFeedHost|features/feed" spa-app/src/pages/NextFeedHostPage.jsx spa-app/src/App.jsx | head -20
```
