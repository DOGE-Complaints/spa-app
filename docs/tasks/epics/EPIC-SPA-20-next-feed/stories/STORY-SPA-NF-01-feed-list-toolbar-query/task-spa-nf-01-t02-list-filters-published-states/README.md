# SPA-NF-01-T02 — Wire gateway list + structural filters + `status=PUBLISHED` + load/empty/error/stale/retry

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
Wire gateway list + structural filters + `status=PUBLISHED` + load/empty/error/stale/retry.


## Arch anchors
- [02 §1–2 data plane + honesty](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 Q4 one data plane](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)
- [01 §4 coexistence — feed owns new UI](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)

## Arch context
- List/filters are **feed visual** claims on `#/next/feed` (M149 content) — D2.2 — 01 §3.
- Reuse existing gateway issue list path via current services/repos — **no invent** fields/endpoints — 02 §2 · AC-02.
- Public Phase-1 lock: request `status=PUBLISHED` (product/DUI; FE wiring gap called in NF api-req) — honesty over invent SEARCH.
- Fail-soft and honest empty/error/stale/retry — WIP must not claim Product Done — 03 §3.
- Live server text search OOS until contract exists (DUI-Q12) — do not invent SEARCH HTTP — 02 §2.

## Implement notes
- Touch: feed list/toolbar state machine binding to `issueService` / gateway repository options.
- Structural filters only (status/type/labels/institution/dates/geo as today).
- OOS: invent pagination/sort APIs; classic BoardPage as claim URL.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for NF-01
- [ ] Runtime icon URLs from catalog (no docs masters)
- [ ] No shell D2 ownership claim
- [ ] Public list includes `status=PUBLISHED` on `#/next/feed`
- [ ] States load/empty/error/stale/retry (+ structural filter) honest
- [ ] No invent gateway endpoints/fields

## Code Facts (re-verify at execute)
- Gateway list via existing issue service/repo (no invent endpoints)
- Public lock: always `status=PUBLISHED` (DUI-Q01)
- Live text search OOS until FE enable (REQ-56 Ready / DUI-Q12)

## Where to change
- `spa-app/src/features/feed/**` list/toolbar state · gateway query options
- Do not invent SEARCH HTTP or classic BoardPage as claim URL

## Verification
```bash
rg -n "PUBLISHED|status=|buildIssuesQuery|search" spa-app/src/features/feed spa-app/src/services spa-app/src/repositories 2>/dev/null | head -40
```
