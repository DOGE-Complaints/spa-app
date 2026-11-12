# UI mockup spec — STORY-SPA-ES-01 Discovery shell (Path A)

**Path:** A (`@mockup` SSOT on disk — AskQuestion skipped)  
**Anchor task:** `task-spa-es-01-t01-discovery-root-testid`  
**ui_anchor:** true  
**Package:** `pkg-000066`  
**extends mockup:** `mockup-136-early-signal-discovery-composition-state-sheet-spec.md` (M136 ESD-D)

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png
```

Do **not** use `mockup-01-dashboard-main-spec.md`.

## Target (M136 / ES-01 shell only)

| State | Condition | UI |
|-------|-----------|-----|
| Discovery (this story) | `!loading && !error && !hasActiveBoardFilters && issues.length === 0` | Root `data-testid="board-early-signal-discovery"`; five conceptual slots (Pulse · Forming · Emerging · Missing · Help) as **placeholders** — child HTTP/viz = ES-02…04 |
| Load error (preserve PH-04) | Issues list fetch fail | `data-testid="board-load-error"` + `publicHome.board.error.*` + `ic-cloud-error` — **not** discovery |
| Filtered empty (preserve PH-04) | filters active, zero match | `data-testid="board-filtered-empty"` — **not** discovery |
| Results | `filteredIssues.length > 0` | PH-04 `.board-feed` — ES-05 continuum later |

## Layout (M136 §22–23)

Desktop conceptual stack: Pulse (full) → Forming (primary field, full) → Emerging \| What's Missing (two columns) → Help (full).  
Narrow: one vertical flow; no squeezed two-column cards.

## Hard rules (M136 §25–28 + story AC)

- Route **`/board` only** — no `/dashboard`.
- No Offers / Solutions UI (do not show disabled Offers either).
- No fabricated counts / «N more Stories to unlock Issue» / «% understood».
- No trending / majority / consensus copy.
- No invented gateway paths (`network-pulse` / `emerging-signals` consumers = ES-02/03).
- Topic/taxonomy language ≠ Issue feed language in discovery chrome.
- L10N: backlog table `earlySignal.discovery.*` + block titles; namespace **not** `publicHomeDictionary`.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` — live GFL-DRIVEN load-error board before discovery cutover.

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/`.
