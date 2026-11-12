# UI mockup spec — STORY-SPA-ES-05 Issues Continuum (Path A)

**Path:** A (`@mockup` SSOT on disk — AskQuestion skipped)  
**Anchor task:** `task-spa-es-05-t01-continuum-layout`  
**ui_anchor:** true  
**ui_scope:** visual  
**Package:** `pkg-000070`  
**extends mockup:** `mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md` (M140 ESD-I)

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
```

Do **not** use `mockup-01-dashboard-main-spec.md`. Do **not** create `STORY-UX-MOCKUP-BRIEF.md`.

## Target (M140 / ES-05 continuum only)

| State | Condition | UI |
|-------|-----------|-----|
| ESD-I-feed | `issues.length ≥ 1` | Existing Issue feed/cards remain primary (FR-ES-05.1 · AC-SPA-ES-05) |
| ESD-I-residual | some material still forming | Lightweight discovery chrome alongside the feed; omit blocks without data (FR-ES-05.2 · M140 §15) |
| ESD-I-event | first confirmed Issue emerged | Transition without gamification / Stories→Issue ratios (AC-SPA-ES-03) |
| ESD-I-narrow | narrow/mobile reflow | Feed remains primary; residual stays compact |

Host: `/board` only — no `/issues` / `/discovery` / `/signals` / `/early-signal` (M140 §3). Empty board remains ES-01…04 `EarlySignalDiscovery` (do not reopen).

## Bind map (api-req §1 — SSOT)

| Mockup / UI | Bind to | Disposition |
|-------------|---------|-------------|
| Issue feed / cards | `issueService` → `GET /tallinn/issues` | **existing PH-04** (FR-ES-05.1 / FR-ES-05.5) |
| Residual Pulse | ES-02 Pulse client compact | **optional** — omit if no data (FR-ES-05.2) |
| Residual Emerging | ES-03 Emerging client compact | **optional** — omit if no data |
| Residual Missing | ES-04 qualitative compact | **optional** — omit if no data |
| Continuum copy | `earlySignal.continuum.*` | **static i18n** (FR-ES-05.L10N) |
| Feed empty/error/loading | `publicHome.board.*` | **reuse PH-04** |
| Topic icons | catalog paths iff real issue labels | **no invented taxonomy** (FR-ES-05.6) |
| Coverage % / «N Stories until Issue» | — | **omit** / forbidden (AC-SPA-ES-03) |
| Offers | — | **omit** (AC-SPA-ES-06) |
| `/dashboard` | — | **unchanged** (AC-SPA-ES-07) |
| New continuum HTTP | — | **none** (api-req §1 · M140) |

## Hard rules (M140 + story AC)

- Route **`/board` only** — no `/dashboard` change.
- Issues ≥ 1 → PH-04 feed still renders.
- Residual chrome **omit** blocks without data (PRODUCT-BRIEF #7).
- No Offers / Voices / fabricated ratios.
- L10N: backlog table `earlySignal.continuum.*`; reuse `publicHome.board.*` for feed chrome.
- Do not mix ES-01…04 empty-discovery AC. Do not invent category taxonomy.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` — capture P3 UI-0 on `/board` with Issues ≥ 1 (feed only; no residual).

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/`.
