# STORY-SPA-ES-01-board-pre-cluster-discovery-shell — Board Pre-Cluster Discovery Shell

## Meta (pipeline)

- **Key:** `STORY-SPA-ES-01-board-pre-cluster-discovery-shell`
- **Parent Epic:** [`../../EPIC-SPA-12-early-signal-dashboard.md`](../../EPIC-SPA-12-early-signal-dashboard.md)
- **Epic:** EPIC-SPA-12 Early Signal Dashboard · **Wave 1**
- **Package:** `pkg-000066`
- **Status:** Done · P3 2026-08-17T10:32:24Z
- **Severity:** HIGH
- **source:** [`../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)
- **decision_ref:** backlog + [M136](../../../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md) + [api-req §1](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) + [icons](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md) + [ADMIN-ESD-06 ADR](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md`
- **P1.3:** 2026-08-17T10:14:14Z
- **Depends on:** M136 · api-req §1 · icon catalog · PH-04 board host · PH chrome

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека |
|-------|-----------|-------|
| **M136** ESD-D | Zero Issues → Pre-Cluster discovery composition (five blocks) | [mockup-136-…-spec.md](../../../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md) |

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png
```

## Зачем простыми словами

Когда на `/board` нет Issues, пользователь видит **discovery composition** (Network Pulse · Picture Forming · Emerging · What's Missing · Help), а не единственный placeholder «No Issues Yet».

## Текущее состояние (verified)

**As-of-Done / Current** (P3 gate `2026-08-17T10:32:24Z` · T07):
- `/` → `/board` ([`App.jsx`](../../../../../src/App.jsx)); Issues via `issueService.getIssues` → `GET /tallinn/issues` ([`GatewayIssueRepository.js:76`](../../../../../src/repositories/GatewayIssueRepository.js)).
- Unfiltered empty: `showEmptyBoard` ([`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx) L162) → `<EarlySignalDiscovery />` L326 · `data-testid="board-early-signal-discovery"` ([`EarlySignalDiscovery.jsx`](../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L21–24). `board-empty` **absent** in BoardPage.
- Pulse / Emerging HTTP consumers in `spa-app/src`: still **0** (titled placeholder slots; ES-02…04).
- Host chrome: PH Header / Footer / Submit — reuse; do not reopen PH-01…06.

**Historical** (pre-ES-01 cutover):
- Empty was `data-testid="board-empty"` + `publicHome.board.empty.*` as the **sole** empty message.

## Функциональные требования (FR)

- **FR-ES-01.1** When `issues.length === 0` (unfiltered empty dataset), `/board` renders Pre-Cluster **discovery root** with `data-testid="board-early-signal-discovery"` (AC-SPA-ES-01).
- **FR-ES-01.2** Composition hosts slots for five conceptual blocks (PRODUCT-BRIEF #3); child blocks may ship in ES-02…04 — shell must not collapse to sole `board-empty` copy.
- **FR-ES-01.3** Route stays **`/board` only** — no REQ-12 `/dashboard` surface.
- **FR-ES-01.4** Topic/taxonomy language ≠ Issue language in discovery chrome (AC-SPA-ES-02).
- **FR-ES-01.5** No Offers/Solutions on Issue-less board (AC-SPA-ES-06).
- **FR-ES-01.6** Load / error for Issues list: reuse PH-04 patterns (`publicHome.board.error.*`, `ic-cloud-error`); discovery does not invent a parallel Issues error API.
- **FR-ES-01.7** Filtered-empty (filters active, zero match) remains PH-04 `filteredEmpty` — **not** discovery shell.
- **FR-ES-01.L10N** Namespace `earlySignal.discovery.*` (+ block titles shared with child stories). Forbidden: AC-SPA-ES-03 patterns (§22–23).

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-01-t01-discovery-root-testid](./task-spa-es-01-t01-discovery-root-testid/README.md) | Discovery root + testid · **ui_anchor** |
| **T02** | [task-spa-es-01-t02-slot-layout-m136](./task-spa-es-01-t02-slot-layout-m136/README.md) | Slot layout M136 · visual / extends mockup |
| **T03** | [task-spa-es-01-t03-preserve-filtered-error](./task-spa-es-01-t03-preserve-filtered-error/README.md) | Preserve filtered/error |
| **T04** | [task-spa-es-01-t04-l10n-discovery-keys](./task-spa-es-01-t04-l10n-discovery-keys/README.md) | L10N discovery + dictionary bootstrap |
| **T05** | [task-spa-es-01-t05-vitest-discovery-empty](./task-spa-es-01-t05-vitest-discovery-empty/README.md) | Vitest discovery empty |
| **T06** | [task-spa-es-01-t06-story-gate-es-01](./task-spa-es-01-t06-story-gate-es-01/README.md) | Story gate ES-01 |
| **T07** | [task-spa-es-01-t07-as-of-done-pipeline-backlog-ssot](./task-spa-es-01-t07-as-of-done-pipeline-backlog-ssot/README.md) | P5 F1 As-of-Done pipeline/backlog · **Done** |
| **T08** | [task-spa-es-01-t08-sync-bullrun-es-01-task-table](./task-spa-es-01-t08-sync-bullrun-es-01-task-table/README.md) | P5 F2 sync bullrun table · **Done** |
| **T09** | [task-spa-es-01-t09-edge-state-screenshots-pack](./task-spa-es-01-t09-edge-state-screenshots-pack/README.md) | P5 F3 edge screenshots · **Done** |

## Вне scope

- Invent gateway paths. Voices. Offers. `/dashboard`. Changing clustering thresholds. Sole reliance on `publicHome.board.empty` as the only zero-Issues product message.

## Acceptance Criteria

- [x] Zero Issues (unfiltered) → discovery root with `data-testid="board-early-signal-discovery"` (AC-SPA-ES-01).
- [x] Not solely `board-empty` / `publicHome.board.empty` as the only product message.
- [x] Topic ≠ Issue language in chrome (AC-SPA-ES-02); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03).
- [x] Links: M136 · icon catalog · api-req §1 · L10N table above.

## Швы

- [`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx), new discovery shell component(s), i18n dictionary (ADMIN-06), PH AppShell.

## ADR / bans

See [ADMIN-ESD-06](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) D1–D10. No invented GW paths; no Offers/Voices; no `/dashboard`.

## Backlog product story

Full FR / L10N / AC: [STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)
