# UI mockup spec — STORY-SPA-ES-04 Coverage Trio (Path A)

**Path:** A (`@mockup` SSOT on disk — AskQuestion skipped)  
**Anchor task:** `task-spa-es-04-t01-whats-missing-abstract`  
**ui_anchor:** true  
**ui_scope:** visual  
**Package:** `pkg-000069`  
**extends mockup:** `mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md` (M139 ESD-C)

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

Do **not** use `mockup-01-dashboard-main-spec.md`. Do **not** create `STORY-UX-MOCKUP-BRIEF.md`.

## Target (M139 / ES-04 Coverage trio only)

| State | Condition | UI |
|-------|-----------|-----|
| ESD-C-default | empty-board discovery | Forming + Missing + Help visible; coherent flow (M139 §7) |
| ESD-C-cta | Help contribution emphasized | PH-06 GPT external handoff (FR-ES-04.3) |
| ESD-C-narrow | narrow/mobile reflow | three functions remain distinct when stacked |

Host: ES-01 `data-testid="board-early-signal-discovery"` · slots `early-signal-slot-forming` · `early-signal-slot-missing` · `early-signal-slot-help` on `/board`.

## Bind map (api-req §4 — SSOT)

| Mockup / UI | Bind to | Disposition |
|-------------|---------|-------------|
| Missing categories | static i18n Areas / Languages / Groups / Themes | **framing** (FR-ES-04.1) |
| Optional Pulse keys | `areas` / `languages` / `topics` **labels only** | **optional** — never invent gap counts (FR-ES-04.2) |
| Coverage % / gap score / «N more Stories» | — | **omit** / forbidden (AC-SPA-ES-03) |
| Help CTA href | `getStoryGptUrl()` / `VITE_STORY_GPT_URL` | **reuse PH-06** (FR-ES-04.3) |
| Picture Forming viz | CSS (api-req §5) | **not** `ic-*` (FR-ES-04.4) |
| Offers | — | **omit** (AC-SPA-ES-06) |

## Hard rules (M139 + story AC)

- Route **`/board` only** — no `/dashboard`.
- **No** coverage HTTP / DTO.
- No Offers / Voices.
- No fabricated gap counts (AC-SPA-ES-08 / api-req §4.2).
- L10N: backlog table `earlySignal.forming.*` / `missing.*` / `help.*`.
- Do not mix ES-05 continuum. Do not reopen ES-02/03 Pulse/Emerging AC.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` — capture P3 UI-0 before Forming/Missing/Help fill (slot titles only).

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/`.
