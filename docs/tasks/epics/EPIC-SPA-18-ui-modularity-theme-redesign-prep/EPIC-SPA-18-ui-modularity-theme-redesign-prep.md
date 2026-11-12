# EPIC-SPA-18 — UI modularity, theme & redesign-prep (REQ-21)

> **ID:** `EPIC-SPA-18` · **Статус:** **In Progress** · REQ21-01…05 **Done** · tip `pkg-000096` historical P3  
> **Тип:** layout / shell ownership + theme prep (Phase 0)  
> **source:** [`../../backlog-stories/ui-modularity-theme-redesign-prep/INDEX.md`](../../backlog-stories/ui-modularity-theme-redesign-prep/INDEX.md)  
> **Parent REQ:** [`21-ui-modularity-theme-and-redesign-prep.md`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md)  
> **Architecture:** [`ui-modularity-theme-redesign-prep/00-overview.md`](../../../architecture/ui-modularity-theme-redesign-prep/00-overview.md)  
> **created_at:** `2026-10-06T19:20:56Z` · **P1.3:** `2026-10-06T19:20:56Z` · **P3 Done:** `2026-10-06T19:33:20Z` · **REQ21-02 P1.3:** `2026-10-06T19:53:15Z` · **REQ21-02 P3:** `2026-10-06T19:58:42Z` · **REQ21-03 P1.3:** `2026-10-06T20:08:53Z` · **REQ21-03 P3:** `2026-10-06T20:14:06Z` · **REQ21-04 P1.3:** `2026-10-06T20:21:56Z` · **REQ21-04 P3:** `2026-10-06T20:27:07Z` · **REQ21-05 P1.3:** `2026-10-06T20:47:18Z` · **REQ21-05 P3:** `2026-10-06T20:59:52Z`

---

## Назначение

Phase 0 prep for REQ-21: one chrome owner (`AppShellLayout`), modular CSS, theme-capable tokens + Header toggle — without `#/next` sidecar delivery or visual redesign cutover.

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| Parent REQ-21 on disk | Yes |
| Backlog package INDEX | Yes · REQ21-01…05 Done |
| G8 AppShell foundation | Done (story Dependencies) |
| Artboard for REQ21-01 | **Absent** → UX mockup brief |

## Состав

| Story | Тема | Pipeline | Status |
|-------|------|----------|--------|
| REQ21-01 | Shell chrome ownership (layout-only) | [pipeline](stories/STORY-SPA-REQ21-01-shell-chrome-ownership/STORY-SPA-REQ21-01-shell-chrome-ownership.md) | **Done** · P3 `pkg-000092` · gate PASS |
| REQ21-02 | CSS ownership board migrate | [pipeline](stories/STORY-SPA-REQ21-02-css-ownership-board-migrate/STORY-SPA-REQ21-02-css-ownership-board-migrate.md) | **Done** · P3 `pkg-000093` · gate PASS · UX SKIP |
| REQ21-03 | Theme tokens + data-theme | [pipeline](stories/STORY-SPA-REQ21-03-theme-tokens-data-theme/STORY-SPA-REQ21-03-theme-tokens-data-theme.md) | **Done** · P3 `pkg-000094` · gate PASS · UX SKIP |
| REQ21-04 | ThemeToggle Header + `dogestonia.theme` | [pipeline](stories/STORY-SPA-REQ21-04-theme-toggle-header/STORY-SPA-REQ21-04-theme-toggle-header.md) | **Done** · P3 `pkg-000095` · gate PASS · mockup-150 |
| REQ21-05 | Board features extract | [pipeline](stories/STORY-SPA-REQ21-05-board-features-extract/STORY-SPA-REQ21-05-board-features-extract.md) | **Done** · P3 `pkg-000096` · gate PASS · UX SKIP |

## Operator locks (from package INDEX)

| Theme | Decision |
|-------|----------|
| Default theme | **dark** |
| Persistence | `localStorage` `dogestonia.theme` |
| Toggle host | Public Header |
| `#/next` / cutover | Out of package |

## Active tip

**REQ21-05** P3 **Done** · [`pkg-000096`](../../spa-active-packages/pkg-000096-20261006-epic-spa-18-req21-05-board-features-extract.yaml) · T01–T06 Done · gate PASS · `src/features/board/` · EPIC-SPA-18 Phase 0 stories Done. Do not invent redesign. Do not git push.
