# UI mockup spec — STORY-SPA-PH-04 Board Feed Home (Path A)

**Path:** A (`@mockup` SSOT on disk — human AskQuestion gate skipped)  
**Anchor task:** `task-spa-ph-04-t01-remove-columns-single-feed`  
**ui_anchor:** true  
**Package:** `pkg-000048`  
**UTC:** 2026-08-04T11:32:02Z (P3 start)

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.png
@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec-estonia.png
```

Operator also attached estonia PNG as visual reference for P3.

## Target (M132 / PH-B)

| State | Code | Condition | UI |
|-------|------|-----------|-----|
| A | PH-B-A | Loading | CSS skeleton feed — **not** spinner icon; toolbar visible |
| B | PH-B-B | Empty dataset, no active filters | `ic-empty-board` + `publicHome.board.empty.*` |
| C | PH-B-C | Results | Single vertical feed; status on card metadata; item → `/issue/:id` |
| D | PH-B-D | Filtered zero | Distinct copy + Reset; not generic empty |
| E | PH-B-E | Load failed | `ic-cloud-error` + Try Again; no «Oops»; no raw API |

## Hard rules

- **Remove** status/kanban `board-columns` (M132 supersedes M01).
- Reuse SEARCH filter toolbar → `getIssues` (no new list API).
- L10N: `publicHome.board.*` (EN = M132 canon).
- Optional: `ic-chevron-right` open affordance on cards.
- Out of scope: metrics; restore columns; PH-06 Submit CTA required; new gateway APIs.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` — legacy columns board before cutover.

## Verify (UI-3)

See `ui-baseline/post-implement/` states `a-`…`e-` + story-root `screenshots/full-cycle/`.
