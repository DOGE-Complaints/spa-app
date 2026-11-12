# STORY-SPA-ES-02-network-pulse-block — Network Pulse Block

## Meta (pipeline)

- **Key:** `STORY-SPA-ES-02-network-pulse-block`
- **Parent Epic:** [`../../EPIC-SPA-12-early-signal-dashboard.md`](../../EPIC-SPA-12-early-signal-dashboard.md)
- **Epic:** EPIC-SPA-12 Early Signal Dashboard · **Wave 2**
- **Package:** `pkg-000067`
- **Status:** Done
- **Severity:** HIGH
- **source:** [`../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md`](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md)
- **decision_ref:** backlog + [M137](../../../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md) + [api-req §2](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) + [icons](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md) + [ADMIN-ESD-06 ADR](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md`
- **P1.3:** 2026-08-17T11:02:15Z
- **Depends on:** M137 · api-req §2 · icon catalog · ES-01 shell slot · PH-04 board host

## Артборд (SSOT дизайна)

| Мокап | Состояния | Спека |
|-------|-----------|-------|
| **M137** ESD-P | ESD-P-omit · ESD-P-bound · ESD-P-narrow | [mockup-137-…-spec.md](../../../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md) |

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

## Зачем простыми словами

Блок Network Pulse показывает, что Stories уже формируют картину. Числа — **только** из `GET /tallinn/network-pulse` (REQ-49); иначе omit / copy-only (AC-SPA-ES-08).

## Текущее состояние (verified)

**As-of-Done / Current** (P3 gate `2026-08-17T11:10:56Z` · T07):
- Backend: `GET /tallinn/network-pulse` public · REQ-49 · `NetworkPulseService` — ✅.
- SPA consumer: **wired** (`GatewayNetworkPulseRepository` → `GET /tallinn/network-pulse`); bind-or-omit in `NetworkPulseBlock`.
- Discovery host (ES-01 Done): `showEmptyBoard` ([`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx) L162) → `<EarlySignalDiscovery />` L326 · pulse slot child [`NetworkPulseBlock`](../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L42.
- Approved `data` fields: `stories_collected`, `languages`, `areas`, `topics`, `recent_stories_7d` — see api-req §2.2 bind map.
- **No** Contributors / Voices field — omit.

**Historical** (pre-P3 Pulse cutover):
- Pulse slot was titled placeholder, **no Pulse HTTP**.

## Функциональные требования (FR)

- **FR-ES-02.1** FE client calls `GET /tallinn/network-pulse` (gateway base URL parity with Issues); no invented path.
- **FR-ES-02.2** **ESD-P-bound:** render metric slots only for fields in api-req §2.2 bind map (Stories → `stories_collected`; Areas → `areas`; Languages → `languages`; Topics → `topics`; Activity/7d → `recent_stories_7d` only with honest label).
- **FR-ES-02.3** **ESD-P-omit:** on fetch failure / unavailable / intentional omit → copy-only canonical message; **no** empty fake KPI slots; **no** client-fabricated counts (AC-SPA-ES-08).
- **FR-ES-02.4** Forbidden UI: Contributors/Voices, «N Stories until Issue», `/metrics`, cabinet `story-activity` (api-req §8).
- **FR-ES-02.5** Particle / density viz = CSS/component (api-req §5) — not fake metrics.
- **FR-ES-02.L10N** `earlySignal.pulse.*`; metric labels only for bindable slots.

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-02-t01-pulse-repository-service](./task-spa-es-02-t01-pulse-repository-service/README.md) | Pulse repository/service GET /tallinn/network-pulse |
| **T02** | [task-spa-es-02-t02-pulse-omit-bound-ui](./task-spa-es-02-t02-pulse-omit-bound-ui/README.md) | Pulse UI omit vs bound · **ui_anchor** |
| **T03** | [task-spa-es-02-t03-pulse-bind-map](./task-spa-es-02-t03-pulse-bind-map/README.md) | Bind map §2.2; no Contributors |
| **T04** | [task-spa-es-02-t04-pulse-icons](./task-spa-es-02-t04-pulse-icons/README.md) | Pulse icons from catalog |
| **T05** | [task-spa-es-02-t05-vitest-pulse-honesty](./task-spa-es-02-t05-vitest-pulse-honesty/README.md) | Vitest omit on fail; no fabricated counts |
| **T06** | [task-spa-es-02-t06-story-gate-es-02](./task-spa-es-02-t06-story-gate-es-02/README.md) | Story gate ES-02 |
| **T07** | [task-spa-es-02-t07-as-of-done-pipeline-ssot](./task-spa-es-02-t07-as-of-done-pipeline-ssot/README.md) | P5 F1 As-of-Done pipeline SSOT · **Done** |
| **T08** | [task-spa-es-02-t08-prefers-reduced-motion](./task-spa-es-02-t08-prefers-reduced-motion/README.md) | P5 F2 prefers-reduced-motion CSS · **Done** |

## Иконки (из каталога)

> Источник: [STORY-SPA-ES-icon-assets.md](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md). NEW PNG **ON DISK** (2026-08-17). Languages/Topics — labels from Pulse payload, no dedicated `ic-*`.

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Pulse header mark | `/icons/early-signal-dashboard/ic-pulse-mark.png` | `public/icons/early-signal-dashboard/ic-pulse-mark.png` | bind compact header |
| Stories metric | `/icons/early-signal-dashboard/ic-pulse-stories.png` | `public/icons/early-signal-dashboard/ic-pulse-stories.png` | bind `stories_collected` |
| Activity metric | `/icons/early-signal-dashboard/ic-pulse-activity.png` | `public/icons/early-signal-dashboard/ic-pulse-activity.png` | bind `recent_stories_7d` — **not** CAB `ic-story-activity` |
| Areas metric | `/icons/story-handoff/ic-field-location.png` | `public/icons/story-handoff/ic-field-location.png` | bind `areas` |
| Listening info | `/icons/story-handoff/ic-info.png` | `public/icons/story-handoff/ic-info.png` | honesty / listening copy |
| Contributors / Voices | — | — | **omit** — do not wire `/icons/user-cabinet/ic-field-role.png` |
| Particle / density viz | — | — | CSS — **not** `ic-*` |

## Routes / API

- [api-req §2](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) · REQ-49 · envelope `{ data, trace_id }`.
- Degrade: HTTP failure → ESD-P-omit (api-req §7).

## Зависимости

- ES-01 discovery slot. Gateway Pulse ✅.

## Вне scope

- Voices / Contributors metrics. Invent fields. `/metrics`. Changing Issues list API.

## Тексты и переводы (en / et / ru)

> EN — канон M137 (`Stories are already shaping a collective picture.`).

| key | en | et | ru |
|-----|----|----|----|
| `earlySignal.pulse.title` | Network Pulse | Võrgu pulss | Пульс сети |
| `earlySignal.pulse.omitMessage` | Stories are already shaping a collective picture. | Lood kujundavad juba ühist pilti. | Истории уже формируют общую картину. |
| `earlySignal.pulse.metric.stories` | Stories | Lood | Истории |
| `earlySignal.pulse.metric.areas` | Areas | Piirkonnad | Районы |
| `earlySignal.pulse.metric.languages` | Languages | Keeled | Языки |
| `earlySignal.pulse.metric.topics` | Topics | Teemad | Темы |
| `earlySignal.pulse.metric.activity` | Recent activity | Hiljutine aktiivsus | Недавняя активность |
| `earlySignal.pulse.areasHonesty` | A small sample of areas is not city-wide coverage. | Väike piirkondade valim ei ole linna katvus. | Небольшая выборка районов — не покрытие всего города. |
| `earlySignal.pulse.listening` | The network is listening for civic Stories. | Võrk kuulab kodanike lugusid. | Сеть принимает гражданские истории. |

> Do **not** add `earlySignal.pulse.metric.contributors`. Forbidden: unlock/threshold copy (AC-SPA-ES-03).

## Acceptance Criteria

- [x] Live Pulse fetch wired; bind-or-omit per §2.2 (AC-SPA-ES-08).
- [x] Failure → omit copy; no fabricated counts; no Contributors/Voices.
- [x] No forbidden strings (AC-SPA-ES-03).
- [x] Links: M137 · icons · api-req §2 · L10N.

## Швы

- New Pulse repository/service, discovery shell slot, BoardPage composition, i18n.

## ADR / bans

See [ADMIN-ESD-06](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) D1–D10. No invented GW paths; no Offers/Voices; no `/dashboard`.
