# SPA-NF-01-T04 — Add `nextFeed.list.*` / `nextFeed.toolbar.*` en/et/ru

**Status:** Done
**Story:** [`../STORY-SPA-NF-01-feed-list-toolbar-query.md`](../STORY-SPA-NF-01-feed-list-toolbar-query.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md)
**ui_scope:** `feed`
**ui_anchor:** false
**extends ui-mockup:** [`../task-spa-nf-01-t01-features-feed-host/ui-mockup-spec.md`](../task-spa-nf-01-t01-features-feed-host/ui-mockup-spec.md) _(created at P3 UI-1)_
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-10T17:39:48Z`
**Package:** `pkg-000103`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)

## Purpose
Add `nextFeed.list.*` / `nextFeed.toolbar.*` en/et/ru.


## Arch anchors
- [02 §1 i18n stays one data/i18n plane](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 L4 services/auth/i18n unchanged plane](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- i18n remains the shared plane — add `nextFeed.list.*` / `nextFeed.toolbar.*` without forking i18n architecture — 00 L4 · 02 §1.
- Reuse existing board/filter keys where valid; draft only gaps (backlog L10N table).
- Theme/locale stress of feed body is NF-06; this task is key materialization only.

## Implement notes
- Add en/et/ru keys via existing dictionary patterns (`t()`).
- OOS: marketing copy fluff; inventing keys for shell chrome.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for NF-01
- [ ] Runtime icon URLs from catalog (no docs masters)
- [ ] No shell D2 ownership claim
- [ ] Listed backlog keys present en/et/ru and used via `t()`
- [ ] No duplicate shell `nextShell.*` ownership

## Code Facts (re-verify at execute)
- Backlog draft keys: `nextFeed.list.*` / `nextFeed.toolbar.*` (en/et/ru)
- Reuse board/filter keys where valid

## Where to change
- spa-app i18n dictionaries / flat keys (existing pattern)
- Consume via `t()` in feed list/toolbar

## Verification
```bash
rg -n "nextFeed\.list\.|nextFeed\.toolbar\." spa-app/src -g '*.js' -g '*.jsx' -g '*.json' | head -40
```
