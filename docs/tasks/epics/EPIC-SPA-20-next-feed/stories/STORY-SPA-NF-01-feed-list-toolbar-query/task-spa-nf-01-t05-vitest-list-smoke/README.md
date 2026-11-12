# SPA-NF-01-T05 — Vitest smoke for feed list/toolbar critical states

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
Vitest smoke for feed list/toolbar critical states.


## Arch anchors
- [03 §1 Verify surfaces — Vitest](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)
- [00 Q6 Vitest and browser-smoke](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Q6-B: Vitest covers `features/feed` states from first next/feed code — 03 §1 · 00 Q6.
- This task = list/toolbar unit/component smoke; full browser-smoke + mounts = NF-06-T05.
- Tests will break as feed lands — repair/extend is mandatory, not optional — 03 intro.
- Claim URLs for Done remain `#/next/feed*` — 03 §4 risk false Done.

## Implement notes
- Add/extend Vitest for load/empty/error/retry (+ filter) on feed list host.
- OOS: puppeteer full suite (NF-06); classic board golden as primary claim.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for NF-01
- [ ] Runtime icon URLs from catalog (no docs masters)
- [ ] No shell D2 ownership claim
- [ ] Vitest covers critical list/toolbar states for `#/next/feed`
- [ ] Does not mark Product Done without honest states

## Code Facts (re-verify at execute)
- Vitest patterns: ns01…06 / features tests under `src/**/__tests__/`
- Browser full-cycle pack → NF-06; this task = list/toolbar unit smoke + story acceptance at P3 Done

## Where to change
- `spa-app/src/features/feed/**/__tests__/**` (or adjacent)
- Story gate file at P3: `acceptance-verification-spa-nf-01.md` in this folder

## Verification
```bash
cd spa-app && npx vitest run src/features/feed 2>&1 | tail -30
```
