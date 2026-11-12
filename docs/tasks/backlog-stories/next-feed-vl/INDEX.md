# next-feed-vl — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) · visual-language / DS atoms on `#/next/feed*`  
> **Sibling (Done wiring):** [next-feed](../next-feed/INDEX.md) NF-01…12 — **Related only; do not reopen**  
> **Epic:** [EPIC-SPA-21-next-feed-vl](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)  
> **DS SSOT:** [DOGEstonia-next-feed-component-design-system-v1.0.md](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md)  
> **Arch delta:** [ARCH-DELTA-visual-language-plane-2026-10-12.md](ARCH-DELTA-visual-language-plane-2026-10-12.md)  
> **Target tech arch:** [architecture/next-feed-vl/00-overview.md](../../../architecture/next-feed-vl/00-overview.md) · [interview 2026-10-12](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md)  
> **Gap map (post-VL):** [analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md](../../../analysis/analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md)  
> **Gap map (history):** [analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md](../../../analysis/analysis-next-feed-ux-ds-element-mapping-and-gaps-2026-10-12.md)  
> **UX artboards:** [feed INDEX](../../../UX/next/feed/INDEX.md) M149–M160  
> **Mode:** постановка + Technical subtasks · **VL-01–12 Done** · package tip complete  
> **Arch siblings:** [01 boundaries](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) · [02 surface map](../../../architecture/next-feed-vl/02-ds-surface-map.md) · [03 verify](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)  
> **Anti-mixing:** classic `#/board` chrome stays; next-feed Done = DS-named surfaces  
> **Runtime:** `./scripts/shell/local-five-serve-and-health.sh`  
> **Next:** Await OP P4/P8 on **VL-12** · package complete  
> **Lab sibling (isolated debug):** [next-feed-lab](../next-feed-lab/INDEX.md) `#/lab/feed` — Related only

## Product stories (Todo)

| Key | File | Status | DS focus | Artboards |
|-----|------|--------|----------|-----------|
| VL-01 | [STORY-SPA-NF-VL-01-issue-identity-plane.md](STORY-SPA-NF-VL-01-issue-identity-plane.md) | Done · P3 gate PASS | `IssueIdentityHeader`, `IssueTypeIcon` | M150 |
| VL-02 | [STORY-SPA-NF-VL-02-board-search-field.md](STORY-SPA-NF-VL-02-board-search-field.md) | Done · P3 gate PASS | `BoardSearchField` | M149 |
| VL-03 | [STORY-SPA-NF-VL-03-reactions-chrome-atoms.md](STORY-SPA-NF-VL-03-reactions-chrome-atoms.md) | Done · P8 | `ReactionAggregateStrip`, `ReactionPicker`, footer/hint | M154 |
| VL-04 | [STORY-SPA-NF-VL-04-discussion-summary-atoms.md](STORY-SPA-NF-VL-04-discussion-summary-atoms.md) | Done · P8 | `DiscussionHeader`, `ThreadSummary`, `CommentPreview` | M152 |
| VL-05 | [STORY-SPA-NF-VL-05-discussion-layout-light-plane.md](STORY-SPA-NF-VL-05-discussion-layout-light-plane.md) | Done · P8 | `DiscussionLayout`, light `CommentTree` plane | M152–M153 |
| VL-06 | [STORY-SPA-NF-VL-06-composer-atoms.md](STORY-SPA-NF-VL-06-composer-atoms.md) | Done · P8 | `ComposerEntry`, `ThreadComposer`, `ReplyContext`, `DraftDiscardDialog` | M153 |
| VL-07 | [STORY-SPA-NF-VL-07-presentation-overlay-layouts.md](STORY-SPA-NF-VL-07-presentation-overlay-layouts.md) | Done · P8 | `IssuePresentationLayout`, `OverlayLayout`, `OverlayHost` | M158 |
| VL-08 | [STORY-SPA-NF-VL-08-board-results-context.md](STORY-SPA-NF-VL-08-board-results-context.md) | Done · P8 | `BoardHeading`, `ResultsContext`, `StaleResultsNotice` | M149 |
| VL-09 | [STORY-SPA-NF-VL-09-board-page-layouts.md](STORY-SPA-NF-VL-09-board-page-layouts.md) | Done · P8 | `BoardLayout`, `PageContentLayout` | M149, layout pack |
| VL-10 | [STORY-SPA-NF-VL-10-map-chrome-atoms.md](STORY-SPA-NF-VL-10-map-chrome-atoms.md) | Done · P8 | `MapSubsetNotice`, `MapIssuePreview`, map chrome | M151 |
| VL-11 | [STORY-SPA-NF-VL-11-verify-gate-chrome.md](STORY-SPA-NF-VL-11-verify-gate-chrome.md) | Done · P8 | `VerifyWriteGate`, `VerifyReturnFeedback`, `WriteDeniedNotice` | M157 |
| VL-12 | [STORY-SPA-NF-VL-12-escalation-stub-chrome.md](STORY-SPA-NF-VL-12-escalation-stub-chrome.md) | Done · P3 gate PASS | `EscalationStub`, `CollaborationFeedback` | M156 |

**Progress:** 12/12 Done · package tip complete
**OOS:** M155 people · schema/media · shell · invent API/icons · classic board mutate

## Cross-links

- Sibling next-feed: [../next-feed/INDEX.md](../next-feed/INDEX.md)  
- Why classic look: [analysis-next-feed-why-still-looks-classic-2026-10-12.md](../../../analysis/analysis-next-feed-why-still-looks-classic-2026-10-12.md)  
- Parent backlog: [../INDEX.md](../INDEX.md)
