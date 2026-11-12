# EPIC-SPA-21 — Next Feed VL (visual-language / DS atoms)

> **ID:** `EPIC-SPA-21` · **Статус:** Done tip — **VL-12 P3 Done** `pkg-000126` (`2026-10-12T16:47:57Z`) · VL-01–12 Done  
> **Тип:** Product / UX visual-language on `#/next/feed*`  
> **source:** [`../../backlog-stories/next-feed-vl/INDEX.md`](../../backlog-stories/next-feed-vl/INDEX.md)  
> **Sibling Done:** [EPIC-SPA-20-next-feed](../EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md) NF-01…12 — **Related only; do not reopen**  
> **DS SSOT:** [`DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md)  
> **Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md)  
> **Artboards:** M149–M160 (same as next-feed)  
> **Mode:** VL-01–12 Done · package tip complete · Await OP P4/P8

---

## Назначение

Доставить **именованные DS-поверхности** на `#/next/feed*` (identity, search field, reactions/discussion/composer atoms, layouts, map/gate/stub chrome) так, чтобы Done ≠ unre-skinned classic. Classic `#/board` **сохраняется**.

## Anti-mixing (epic lock)

| Rule | Enforcement |
|------|-------------|
| Classic board chrome | Out of mutate scope |
| Next-feed Done | DS-named surfaces from component DS |
| Shared | Closed data/semantics only |
| NF-01…12 | Related; no body reopen |

## Состав

| Story | Тема | Tip | Status | Backlog |
|-------|------|-----|--------|---------|
| VL-01 | Issue identity plane | 1 | Done · P3 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-01-issue-identity-plane.md) |
| VL-02 | BoardSearchField | 2 | Done · P3 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-02-board-search-field.md) |
| VL-03 | Reactions chrome atoms | 3 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-03-reactions-chrome-atoms.md) |
| VL-04 | Discussion summary atoms | 4 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-04-discussion-summary-atoms.md) |
| VL-05 | DiscussionLayout + light tree | 5 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md) |
| VL-06 | Composer atoms | 6 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md) |
| VL-07 | Presentation/overlay layouts | 7 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md) |
| VL-08 | Board results context | 8 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-08-board-results-context.md) |
| VL-09 | Board/page layouts | 9 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md) |
| VL-10 | Map chrome atoms | 10 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md) |
| VL-11 | Verify gate chrome | 11 | Done · P8 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-11-verify-gate-chrome.md) |
| VL-12 | Escalation stub chrome | 12 | Done · P3 | [STORY](../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-12-escalation-stub-chrome.md) |

## Порядок

```
VL-01 → VL-02 → VL-03 → VL-04 → VL-05 → VL-06 → VL-07 → VL-08 → VL-09 → VL-10 → VL-11 → VL-12
```

## Active tip

**P3 VL-12 Done `2026-10-12T16:47:57Z`.** [`pkg-000126`](../../spa-active-packages/pkg-000126-20261012-epic-spa-21-nf-vl-12-escalation-stub-chrome.yaml) · gate PASS · escalation/ Present · Await OP P4/P8. Do not invent escalation API. Not fifth action. Classic `#/board` invite OOS. Do not git push unless operator asks.
