# STORY-SPA-ES-03-emerging-signals-provisional — Emerging Signals Provisional

## Meta (pipeline)

- **Key:** `STORY-SPA-ES-03-emerging-signals-provisional`
- **Parent Epic:** [`../../EPIC-SPA-12-early-signal-dashboard.md`](../../EPIC-SPA-12-early-signal-dashboard.md)
- **Epic:** EPIC-SPA-12 Early Signal Dashboard · **Wave 2**
- **Package:** `pkg-000068`
- **Status:** Done
- **Severity:** HIGH
- **source:** [`../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md`](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md)
- **decision_ref:** backlog + [M138](../../../../../UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md) + [api-req §3](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) + [icons](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md) + [ADMIN-ESD-06 ADR](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md`
- **P1.3:** 2026-08-17T11:30:36Z
- **P3:** 2026-08-17T11:36:37Z
- **Depends on:** M138 · api-req §3 · icon catalog · ES-01 shell slot · PH-04 board host

## Артборд (SSOT дизайна)

| Мокап | Состояния | Спека |
|-------|-----------|-------|
| **M138** ESD-E | ESD-E-empty · ESD-E-cards · weaken/disappear | [mockup-138-…-spec.md](../../../../../UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md) |

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

## Зачем простыми словами

Показать **provisional Level-2** паттерны из Stories (`data.signals`) — не Issues. Пустой список = честное empty / omit секции.

## Текущее состояние (verified)

- Backend: `GET /tallinn/emerging-signals?top_n` public · REQ-50 · `EmergingSignalsService` — ✅.
- SPA consumer: **wired** P3 `2026-08-17T11:36:37Z` — [`GatewayEmergingSignalsRepository.js`](../../../../../src/repositories/GatewayEmergingSignalsRepository.js) L32 GET `{base}/tallinn/emerging-signals?top_n=`; [`emergingSignalsService.js`](../../../../../src/services/emergingSignalsService.js) fail/empty → `{ status: 'empty', cards: [] }`; [`bindEmergingSignals.js`](../../../../../src/domain/bindEmergingSignals.js) `label`/`axis`/`story_count` only.
- Discovery host: `showEmptyBoard` ([`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx) L162) → `<EarlySignalDiscovery />` L326 · slot `early-signal-slot-emerging` · Emerging child [`EarlySignalDiscovery.jsx`](../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L44 `<EmergingSignalsBlock />`.
- Shape: `signals[{label, axis, story_count}]`, `top_n`; Emerging ≠ Issues (`signals` vs `issues`).

## Функциональные требования (FR)

- **FR-ES-03.1** FE client calls `GET /tallinn/emerging-signals` (default `top_n=10`, clamp `[1,50]`).
- **FR-ES-03.2** Cards bind `label` / `axis` / `story_count` only; language = topic/label / provisional — **never** Issue cards or Issue ids as primary identity (AC-SPA-ES-02).
- **FR-ES-03.3** `signals: []` or fetch failure → ESD-E-empty / omit section — **no** fabricated provisional rows (AC-SPA-ES-08).
- **FR-ES-03.4** No «N Stories until Issue» / unlock / confidence score (AC-SPA-ES-03).
- **FR-ES-03.5** Density viz = CSS (api-req §5); marker icon for card chrome only.
- **FR-ES-03.L10N** `earlySignal.emerging.*`.

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-03-t01-emerging-repository](./task-spa-es-03-t01-emerging-repository/README.md) | Emerging repository GET /tallinn/emerging-signals |
| **T02** | [task-spa-es-03-t02-emerging-cards-empty](./task-spa-es-03-t02-emerging-cards-empty/README.md) | Cards + empty/omit · **ui_anchor** |
| **T03** | [task-spa-es-03-t03-emerging-icons](./task-spa-es-03-t03-emerging-icons/README.md) | Emerging marker/empty icons |
| **T04** | [task-spa-es-03-t04-vitest-emerging-shape](./task-spa-es-03-t04-vitest-emerging-shape/README.md) | Vitest signals ≠ issues; empty honest |
| **T05** | [task-spa-es-03-t05-story-gate-es-03](./task-spa-es-03-t05-story-gate-es-03/README.md) | Story gate ES-03 |
| **T06** | [task-spa-es-03-t06-as-of-done-api-req-ssot](./task-spa-es-03-t06-as-of-done-api-req-ssot/README.md) | P5 F1 As-of-Done api-req SSOT · **Done** |

## Иконки (из каталога)

> Источник: [STORY-SPA-ES-icon-assets.md](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md). NEW PNG **ON DISK** (2026-08-17).

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Card leading marker | `/icons/early-signal-dashboard/ic-emerging-marker.png` | `public/icons/early-signal-dashboard/ic-emerging-marker.png` | provisional L2 chrome |
| Empty state | `/icons/early-signal-dashboard/ic-emerging-empty.png` | `public/icons/early-signal-dashboard/ic-emerging-empty.png` | ESD-E-empty |
| Story ladder | `/icons/early-signal-dashboard/ic-pulse-stories.png` | `public/icons/early-signal-dashboard/ic-pulse-stories.png` | Story ≠ Issue |
| Issue L3 crest | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` | brand mark — do not invent Issue crest |
| Density clusters | — | — | CSS — **not** `ic-*` |

## Routes / API

- [api-req §3](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) · REQ-50 · envelope `{ data, trace_id }`.
- Do not reuse `GET /tallinn/issues` as Emerging source.
- Degrade: HTTP failure → ESD-E-empty / omit (api-req §3 / §7).

## Зависимости

- ES-01 slot. Gateway Emerging ✅. Optional after ES-02 (independent HTTP). Pulse FE already wired — do not reopen ES-02 AC.

## Вне scope

- Persistent `EmergingSignal` entity. Issues-shaped list. Voices. Promotion gates.

## Тексты и переводы (en / et / ru)

| key | en | et | ru |
|-----|----|----|----|
| `earlySignal.emerging.title` | Emerging Signals | Ilmnevad signaalid | Формирующиеся сигналы |
| `earlySignal.emerging.provisionalBadge` | Provisional | Esialgne | Предварительно |
| `earlySignal.emerging.cardHelper` | A provisional relationship is beginning to appear across submitted Stories. | Esialgne seos hakkab ilmnema esitatud lugude vahel. | Между поданными историями начинает проявляться предварительная связь. |
| `earlySignal.emerging.empty` | No provisional patterns to show yet. | Esialgseid mustreid pole veel näidata. | Пока нет предварительных паттернов для показа. |
| `earlySignal.emerging.storyCount` | {count} Stories | {count} lugu | {count} историй |
| `earlySignal.emerging.weaken` | This pattern is becoming less clear as new Stories arrive. | See muster muutub uute lugudega ebaselgemaks. | Этот паттерн становится менее ясным по мере новых историй. |

> Forbidden: «2 more Stories until Issue», Issue language for L2 cards (AC-SPA-ES-03).

## Acceptance Criteria

- [x] Live Emerging fetch; cards from `signals` only; empty/failure honest.
- [x] Topic/provisional ≠ Issue (AC-SPA-ES-02); no fabricated counts (AC-SPA-ES-08); no forbidden strings (AC-SPA-ES-03).
- [x] Links: M138 · icons · api-req §3 · L10N.

## ADR / bans

See [ADMIN-ESD-06](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) D1–D10. No invented GW paths; no Offers/Voices; no `/dashboard`. Do not mix ES-01/02/04/05 into `pkg-000068`.
