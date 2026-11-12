# UI mockup spec — STORY-SPA-ES-03 Emerging Signals (Path A)

**Path:** A (`@mockup` SSOT on disk — AskQuestion skipped)  
**Anchor task:** `task-spa-es-03-t02-emerging-cards-empty`  
**ui_anchor:** true  
**ui_scope:** visual  
**Package:** `pkg-000068`  
**extends mockup:** `mockup-138-emerging-signals-provisional-state-sheet-spec.md` (M138 ESD-E)

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

Do **not** use `mockup-01-dashboard-main-spec.md`. Do **not** create `STORY-UX-MOCKUP-BRIEF.md`.

## Target (M138 / ES-03 Emerging only)

| State | Condition | UI |
|-------|-----------|-----|
| ESD-E-empty | `signals: []` or fetch failure | honest empty / omit section; **no** fabricated provisional rows (FR-ES-03.3 · AC-SPA-ES-08) |
| ESD-E-cards | Emerging HTTP success | cards bind `label` / `axis` / `story_count` only (FR-ES-03.2 · AC-SPA-ES-02) |
| weaken/disappear | pattern less clear | L10N `earlySignal.emerging.weaken` — not Issue unlock copy |

Host: ES-01 `data-testid="board-early-signal-discovery"` · slot `early-signal-slot-emerging` on `/board`.

## Bind map (api-req §3 — SSOT)

| Mockup / UI | Bind to | Disposition |
|-------------|---------|-------------|
| Card label | `signals[].label` | **bind** |
| Card axis | `signals[].axis` | **bind** |
| Story count | `signals[].story_count` | **bind** (honest Stories language) |
| Issue id / Issue card | — | **omit** (AC-SPA-ES-02) |
| «N Stories until Issue» / unlock / confidence | — | **omit** / forbidden (AC-SPA-ES-03) |
| Density clusters | CSS | **not** `ic-*` (FR-ES-03.5) |

## Hard rules (M138 + story AC)

- Route **`/board` only** — no `/dashboard`.
- Do not reuse `GET /tallinn/issues` as Emerging source.
- No Offers / Voices.
- No fabricated provisional rows (AC-SPA-ES-08).
- L10N: backlog table `earlySignal.emerging.*`.
- Do not mix ES-04/05 Forming/Missing/Help fill.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` — captured P3 UI-0 before Emerging UI (slot title only).

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/`.
