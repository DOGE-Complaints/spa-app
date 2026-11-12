# SPA-NF-03-T03 — Add `nextFeed.map.*` en/et/ru

**Status:** Done · P3 (`2026-10-10T18:53:45Z`) · story gate  
**Story:** [`../STORY-SPA-NF-03-list-map-toggle.md`](../STORY-SPA-NF-03-list-map-toggle.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md)  
**ui_scope:** `feed`  
**ui_complexity:** `trivial`  
**ui_anchor:** false  
**extends ui-mockup:** [`../task-spa-nf-03-t01-list-map-toggle/ui-mockup-spec.md`](../task-spa-nf-03-t01-list-map-toggle/ui-mockup-spec.md) _(created at P3 UI-1)_  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T18:48:34Z`  
**Package:** `pkg-000105`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png)

## Purpose
Add `nextFeed.map.*` en/et/ru.

## Arch anchors
- [02 §1 i18n plane](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Draft `nextFeed.map.*` for toggle/partial/error; shared i18n plane — 00 L4 · 02 §1.

## Implement notes
- en/et/ru keys per backlog; `t()` wired.
- OOS: inventing map provider copy.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; i18n via `nextFeedDictionary.js`.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-03
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Map L10N keys present en/et/ru
- [x] No duplicate shell `nextShell.*` ownership

## Code Facts (re-verify at execute)
- Backlog draft: `nextFeed.map.*` (en/et/ru)
- Reuse plane: `nextFeedDictionary.js` (NF-01/02)

## Where to change
- spa-app i18n dictionaries / flat keys (existing pattern)
- Consume via `t()` in feed list/map toggle

## Verification
```bash
rg -n "nextFeed\.map\." spa-app/src -g '*.js' -g '*.jsx' | head -40
```
