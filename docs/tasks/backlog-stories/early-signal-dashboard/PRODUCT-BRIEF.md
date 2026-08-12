# Early Signal / Pre-Cluster — Public Board Discovery — Product Brief

> **Источник:** [REQ-15](../../../requirements/15-early-signal-pre-cluster-public-dashboard.md)  
> **Статус:** locked для ADMIN-ESD-01…06 (REQ itself may remain Draft awaiting PA.2)  
> **Пакет:** [INDEX.md](INDEX.md)  
> **Parent:** `docs/requirements backlog/DOGEstonia-Early-Signal-Dashboard-Pre-Cluster-Product-Requirements.md` · parent-id `early-signal-dashboard-pre-cluster`  
> **Sibling:** [gateway REQ-48](../../../../doge-complaints-gateway/docs/requirements/48-early-signal-pre-cluster-data-readiness.md) — public L1/L2 aggregates **TBD**; no invented HTTP paths  
> **Verified baseline (код):** `/` → `/board` ([`App.jsx:24–25`](../../../../src/App.jsx)); Issues via `issueService.getIssues` ([`BoardPage.jsx:101`](../../../../src/pages/BoardPage.jsx)); empty today = `data-testid="board-empty"` ([`BoardPage.jsx:326–334`](../../../../src/pages/BoardPage.jsx)); `GET {base}/tallinn/issues` ([`GatewayIssueRepository.js:76`](../../../../src/repositories/GatewayIssueRepository.js)); no Early Signal UI in `spa-app/src` (grep 0).

## Решения (locked)

| # | Тема | Решение |
|---|------|---------|
| 1 | Host | **`/board` only** (public continuum) — not REQ-12 `/dashboard` |
| 2 | Zero Issues UX | Pre-Cluster **discovery composition** (five conceptual blocks), not sole «no issues» placeholder |
| 3 | Blocks | Network Pulse · The Picture Is Forming · Emerging Signals · What's Missing · Help Complete the Picture |
| 4 | Levels | Story / Emerging Signal / Issue; Level 2 ≠ Level 3; Topics ≠ Issues |
| 5 | Metrics honesty | Pulse metrics **only** if sibling-approved fields exist; else omit or Story-presence framing — **no fabricated counts** |
| 6 | States A–E | UX modes from data density; illustrative Story counts ≠ clustering thresholds |
| 7 | Continuum | Issues ≥1 → existing Issue feed **and** discovery framing where data allows |
| 8 | Contribution | Help Complete / Missing → existing GPT / Submit entry points on board — no gamified «N more unlock Issue» |
| 9 | Offers | **Never** on Pre-Cluster / Issue-less board |
| 10 | i18n | et / ru / en for new strings |

## Вне scope

- spa REQ-12 personal `/dashboard` / cabinet
- Offers / Solutions
- Inventing gateway HTTP paths or response fields
- Voices / unique-person metrics
- Civic Search & Matching / Companions
- Clustering algorithm thresholds
- Implementing backend aggregates (gateway 48 / ES exposure)

## Предполагаемые продуктовые стори (выход ADMIN-ESD-05)

| Key | Поверхность |
|-----|-------------|
| ES-01 | Board Pre-Cluster discovery shell (zero Issues) |
| ES-02 | Network Pulse block (honest / omit) |
| ES-03 | Emerging Signals provisional |
| ES-04 | Coverage gaps + contribution CTAs |
| ES-05 | Issues continuum + feed regression |

## Зависимости

- Sibling gateway 48 + TASK-GW-ES-04 seam for Pulse/Emerging **live** fields
- Existing Issue read L3 (`GET /tallinn/issues`) — consume as-is
- Public shell PH (Header/Submit GPT) — reuse; do not reopen PH chrome stories
- Not blocked on identity for MVP discovery shell

## Open (carry from REQ §6 — operator PA.2)

1. Ship UX shell + copy-only Pulse vs block Pulse until API PA.2?
2. Confirm `/board` only (default) vs extra route?
3. Voices — defer MVP forever?
4. Who owns UX artboards before visual P3?
5. How much Pre-Cluster chrome when Issues exist?
