# EPIC-SPA-12 — Early Signal / Pre-Cluster Public Board Discovery (spa-app)

> **ID:** `EPIC-SPA-12` · **Статус:** In Progress — Wave 1–4 ES-01…ES-05 **Done** (`pkg-000070` P3 2026-08-17T13:10:12Z)  
> **Тип:** Product / UX  
> **source:** [`../../backlog-stories/early-signal-dashboard/INDEX.md`](../../backlog-stories/early-signal-dashboard/INDEX.md)  
> **Prerequisite:** PH-04 board feed Done · PH chrome Done · gateway REQ-49/50 Pulse/Emerging live · spa FE unwired  
> **Admin:** ADMIN-ESD-01…06 intake complete → [ADMIN-ESD-06](../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)

---

## Назначение

На публичном `/board` показать Pre-Cluster **discovery** при нуле Issues и **continuum** при Issues ≥ 1:

1. Discovery shell (M136) — `data-testid="board-early-signal-discovery"`
2. Network Pulse L1 — bind/omit `GET /tallinn/network-pulse` (REQ-49)
3. Emerging Signals L2 — `GET /tallinn/emerging-signals` (REQ-50); ≠ Issues
4. Coverage trio — abstract Missing + Help → PH-06 GPT CTA; Forming viz CSS
5. Continuum residual chrome + PH-04 feed regression (AC-SPA-ES-05/07)

Мокапы SSOT: [`docs/UX/mockups/early-discovery-dashboard/`](../../../UX/mockups/early-discovery-dashboard/) M136–M140.

## Контекст (verified)

- Board: [`BoardPage.jsx`](../../../src/pages/BoardPage.jsx) — unfiltered empty → `EarlySignalDiscovery` (`board-early-signal-discovery`); filtered-empty / load-error PH-04 kept.
- Issues: `issueService` → `GatewayIssueRepository` → `GET /tallinn/issues`.
- Pulse/Emerging: Pulse FE **wired** (ES-02); Emerging FE **wired** (ES-03).
- ADR: [ADMIN-ESD-06](../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) D1–D10.
- API FE contract: [STORY-SPA-ES-api-requirements.md](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md).
- Icons: [STORY-SPA-ES-icon-assets.md](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md).

## Состав

| Story | Тема | Wave | Mockup | Pipeline | Backlog |
|-------|------|------|--------|----------|---------|
| ES-01 | Discovery shell | 1 | M136 | [pipeline](stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) **Done** | [backlog](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) |
| ES-02 | Network Pulse | 2 | M137 | [pipeline](stories/STORY-SPA-ES-02-network-pulse-block/STORY-SPA-ES-02-network-pulse-block.md) **Done** | [backlog](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) |
| ES-03 | Emerging Signals | 2 | M138 | [pipeline](stories/STORY-SPA-ES-03-emerging-signals-provisional/STORY-SPA-ES-03-emerging-signals-provisional.md) **Done** | [backlog](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) |
| ES-04 | Coverage + Help | 3 | M139 | [pipeline](stories/STORY-SPA-ES-04-coverage-gaps-contribution/STORY-SPA-ES-04-coverage-gaps-contribution.md) **Done** | [backlog](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) |
| ES-05 | Continuum + regression | 4 | M140 | [pipeline](stories/STORY-SPA-ES-05-issues-continuum-regression/STORY-SPA-ES-05-issues-continuum-regression.md) **Done** `pkg-000070` | [backlog](../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) |

## Порядок волн

```
Wave 1: ES-01 (shell + earlySignalDictionary bootstrap)
Wave 2: ES-02 Pulse ∥ ES-03 Emerging
Wave 3: ES-04 Forming / Missing / Help
Wave 4: ES-05 continuum residual + feed regression
```

## Cross-epic references

| Epic / Story | Relation |
|--------------|----------|
| [EPIC-SPA-09](../EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) | PH-04 feed host · PH-06 Submit GPT |
| [EPIC-SPA-03](../EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md) | SEARCH filters on board |
| Gateway REQ-49/50 | Pulse / Emerging HTTP SSOT |

## Локализация (L10N)

- **SSOT:** §«Тексты и переводы» in each ES backlog story
- **Код (execute):** `earlySignalDictionary.js` + `EARLY_SIGNAL_FLAT_KEYS` → `dictionaries.js`
- **Namespace:** `earlySignal.*`
- **Reuse:** `publicHome.board.*` only for shared feed chrome (ES-05)
- **Forbidden:** AC-SPA-ES-03 patterns (REQ-15 §22–23)

## Вне scope эпика

- New gateway paths/fields; Voices; Offers; REQ-12 `/dashboard`
- Icon PNG generation execute; bullrun/`pkg-*` activate (operator separate)
- Closing ADMIN-ESD-02
