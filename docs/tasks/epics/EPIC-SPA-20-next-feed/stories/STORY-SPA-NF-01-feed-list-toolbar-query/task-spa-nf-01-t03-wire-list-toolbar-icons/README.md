# SPA-NF-01-T03 — Wire filter/retry/status icons to `/icons/next-feed/…` (+ shell close/chevron reuse)

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
Wire filter/retry/status icons to `/icons/next-feed/…` (+ shell close/chevron reuse).


## Arch anchors
- [02 §3 tokens / theme consumption](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 L0 tokens / data-theme](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Icons are static public assets under `/icons/next-feed/…` (promote Done ADMIN-NF-02) — not an HTTP API.
- Consume via `currentColor` + semantic tokens / `data-theme` — 00 L0 · 02 §3; no dual hex in JSX.
- Shared chrome glyphs (`close`, `chevron-down`) reuse `/icons/next-shell/…` — do not duplicate into next-feed.

## Implement notes
- Wire filter/retry/status slots from NF icon catalog; shell reuse where catalog says so.
- OOS: re-copy masters; Lucide/`ic-*` generate; logo work.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for NF-01
- [ ] Runtime icon URLs from catalog (no docs masters)
- [ ] No shell D2 ownership claim
- [ ] Toolbar/list icons resolve under `/icons/next-feed/…` or documented next-shell reuse
- [ ] No docs-master paths in runtime src

## Code Facts (re-verify at execute)
- Runtime: `public/icons/next-feed/{actions,status}/` Present (ADMIN-NF-02)
- Reuse: `/icons/next-shell/actions/{close,chevron-down}.svg`

## Where to change
- Feed list/toolbar icon `src` / CSS `url()` under `features/feed/`
- No re-copy masters unless 404 gap

## Verification
```bash
ls spa-app/public/icons/next-feed/actions/{filter,retry}.svg spa-app/public/icons/next-feed/status/{info,error,unavailable}.svg
```
