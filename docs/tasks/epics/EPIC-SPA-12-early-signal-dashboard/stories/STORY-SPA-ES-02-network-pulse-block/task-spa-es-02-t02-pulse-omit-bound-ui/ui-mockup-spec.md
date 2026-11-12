# UI mockup spec — STORY-SPA-ES-02 Network Pulse (Path A)

**Path:** A (`@mockup` SSOT on disk — AskQuestion skipped)  
**Anchor task:** `task-spa-es-02-t02-pulse-omit-bound-ui`  
**ui_anchor:** true  
**ui_scope:** visual  
**Package:** `pkg-000067`  
**extends mockup:** `mockup-137-network-pulse-block-state-sheet-spec.md` (M137 ESD-P)

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

Do **not** use `mockup-01-dashboard-main-spec.md`. Do **not** create `STORY-UX-MOCKUP-BRIEF.md`.

## Target (M137 / ES-02 Pulse only)

| State | Condition | UI |
|-------|-----------|-----|
| ESD-P-omit | fetch failure / unavailable / intentional omit | copy-only canonical message; **no** empty fake KPI slots; **no** client-fabricated counts (FR-ES-02.3 · AC-SPA-ES-08) |
| ESD-P-bound | Pulse HTTP success | metric slots **only** for api-req §2.2 bind map (FR-ES-02.2) |
| ESD-P-narrow | Narrow/mobile | same honesty / hierarchy as M137 |

Host: ES-01 `data-testid="board-early-signal-discovery"` · slot `early-signal-slot-pulse` on `/board`.

## Bind map (api-req §2.2 — SSOT)

| Mockup / UI slot | Bind to | Disposition |
|------------------|---------|-------------|
| Stories | `stories_collected` | **bind** |
| Areas | `areas` | **bind** (honesty copy: not city coverage) |
| Languages | `languages` | **bind** |
| Topics | `topics` | **bind** (Topic ≠ Issue) |
| Activity (recent / 7d) | `recent_stories_7d` | **bind only** with honest label |
| Contributors / Voices | — | **omit** |
| «N Stories until Issue» | — | **omit** / forbidden |

## Hard rules (M137 + story AC)

- Route **`/board` only** — no `/dashboard`.
- No Offers / Voices / Contributors KPI.
- No fabricated counts / unlock-threshold copy (AC-SPA-ES-03).
- Particle / density viz = CSS/component (FR-ES-02.5) — not fake metrics.
- L10N: backlog table `earlySignal.pulse.*`; do **not** add `earlySignal.pulse.metric.contributors`.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` at P3 — live discovery with Pulse slot still a titled placeholder.

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/`.
