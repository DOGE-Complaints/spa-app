# STORY-SPA-ES-05-issues-continuum-regression — Issues Continuum + Feed Regression

## Meta (pipeline)

- **Key:** `STORY-SPA-ES-05-issues-continuum-regression`
- **Parent Epic:** [`../../EPIC-SPA-12-early-signal-dashboard.md`](../../EPIC-SPA-12-early-signal-dashboard.md)
- **Epic:** EPIC-SPA-12 Early Signal Dashboard · **Wave 4**
- **Package:** `pkg-000070`
- **Status:** Done
- **Severity:** HIGH
- **source:** [`../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md`](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md)
- **decision_ref:** backlog + [M140](../../../../../UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md) + [api-req §1](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) + [icons](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md) + [ADMIN-ESD-06 ADR](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md`
- **Scaffolded:** 2026-08-16 · **P1.3:** 2026-08-17T12:26:25Z
- **Depends on:** M140 · api-req §1 · icon catalog · ES-01…04 residual blocks · PH-04 board host

## Артборд (SSOT дизайна)

| Мокап | Состояния | Спека |
|-------|-----------|-------|
| **M140** ESD-I | Issues feed + residual discovery (ESD-I-residual) | [mockup-140-…-spec.md](../../../../../UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md) |

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
```

Path A: [`task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md`](./task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md). Do **not** use mockup-01. No `STORY-UX-MOCKUP-BRIEF`.

## Зачем простыми словами

Когда Issues ≥ 1, существующая лента PH-04 **остаётся**; лёгкий discovery chrome может остаться для того, что ещё формируется — без ломки `/dashboard` и без Offers.

## Текущее состояние (verified As-of-Done P3 2026-08-17T13:10:12Z)
- Issues feed: PH-04 + continuum — [`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx) `showResults` → `board-continuum` / `board-feed` + `IssueCard`.
- Empty board: `showEmptyBoard` → `<EarlySignalDiscovery />` (ES-01…04 — not reopened).
- Residual: [`ContinuumResidual.jsx`](../../../../../src/components/earlySignal/ContinuumResidual.jsx) compact Pulse/Emerging omit-if-empty; Missing + Help.
- L10N `earlySignal.continuum.*` in [`earlySignalDictionary.js`](../../../../../src/i18n/earlySignalDictionary.js).
- Topic icons: [`issueTopicIcons.js`](../../../../../src/i18n/issueTopicIcons.js) exact catalog keys only.
- REQ-12 `/dashboard`: unchanged (`App.jsx`).

## Функциональные требования (FR)

- **FR-ES-05.1** When `issues.length ≥ 1`, existing Issue cards/feed still render — regression on `BoardPage` list path (AC-SPA-ES-05).
- **FR-ES-05.2** Optional residual discovery rail/chrome (M140) where data allows — Pulse/Emerging/Missing compact; omit blocks without data (PRODUCT-BRIEF #7).
- **FR-ES-05.3** REQ-12 `/dashboard` behavior unchanged (AC-SPA-ES-07).
- **FR-ES-05.4** No Offers/Solutions on continuum board (AC-SPA-ES-06).
- **FR-ES-05.5** Filters / load-error / card → `/issue/:id` remain PH-04 contracts.
- **FR-ES-05.6** Topic icons on Issue cards only if product maps real issue labels — do not invent category taxonomy beyond catalog paths.
- **FR-ES-05.L10N** `earlySignal.continuum.*`; reuse `publicHome.board.*` for feed empty/error/loading.

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-05-t01-continuum-layout](./task-spa-es-05-t01-continuum-layout/README.md) | Continuum layout feed + residual · **ui_anchor** |
| **T02** | [task-spa-es-05-t02-feed-regression](./task-spa-es-05-t02-feed-regression/README.md) | Feed regression Issues ≥ 1 |
| **T03** | [task-spa-es-05-t03-residual-compact-slots](./task-spa-es-05-t03-residual-compact-slots/README.md) | Residual compact Pulse/Emerging/Missing |
| **T04** | [task-spa-es-05-t04-rail-topic-icons](./task-spa-es-05-t04-rail-topic-icons/README.md) | Rail/topic icons from catalog |
| **T05** | [task-spa-es-05-t05-vitest-ac05-ac07](./task-spa-es-05-t05-vitest-ac05-ac07/README.md) | Vitest AC-05/07; no Offers |
| **T06** | [task-spa-es-05-t06-story-gate-es-05](./task-spa-es-05-t06-story-gate-es-05/README.md) | Story gate ES-05 |
| **T07** | [task-spa-es-05-t07-screenshot-pack-h1-h2-distinct](./task-spa-es-05-t07-screenshot-pack-h1-h2-distinct/README.md) | P5 F2 screenshot pack H1≠H2 |

## Иконки (из каталога)

> Источник: [STORY-SPA-ES-icon-assets.md](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md). NEW PNG **ON DISK** (2026-08-17). Topic icons = feed category affordances, not handoff `ic-field-category`.

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Topic transit | `/icons/early-signal-dashboard/ic-issue-topic-transit.png` | `public/icons/early-signal-dashboard/ic-issue-topic-transit.png` | NEW |
| Topic greenspace | `/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` | `public/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` | NEW |
| Topic lighting | `/icons/early-signal-dashboard/ic-issue-topic-lighting.png` | `public/icons/early-signal-dashboard/ic-issue-topic-lighting.png` | NEW |
| Topic waste | `/icons/early-signal-dashboard/ic-issue-topic-waste.png` | `public/icons/early-signal-dashboard/ic-issue-topic-waste.png` | NEW |
| Topic housing | `/icons/early-signal-dashboard/ic-issue-topic-housing.png` | `public/icons/early-signal-dashboard/ic-issue-topic-housing.png` | NEW |
| Rail Emerging | `/icons/early-signal-dashboard/ic-emerging-marker.png` | `public/icons/early-signal-dashboard/ic-emerging-marker.png` | residual |
| Rail What's Missing | `/icons/early-signal-dashboard/ic-rail-missing.png` | `public/icons/early-signal-dashboard/ic-rail-missing.png` | NEW |
| Rail Help | `/icons/early-signal-dashboard/ic-help-share.png` | `public/icons/early-signal-dashboard/ic-help-share.png` | same family as ES-04 |
| Submit / view | `/icons/public-home/ic-external-link.png` | `public/icons/public-home/ic-external-link.png` | reuse |
| Feed error | `/icons/story-handoff/ic-cloud-error.png` | `public/icons/story-handoff/ic-cloud-error.png` | PH-04 reuse |
| Try again | `/icons/story-handoff/ic-auto-resubmit.png` | `public/icons/story-handoff/ic-auto-resubmit.png` | PH-04 reuse |
| Issue crest | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` | brand |
| Density continuum | — | — | CSS — **not** `ic-*` |

## Routes / API

- [api-req §1](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md): same `GET /tallinn/issues` via `issueService`.
- Residual Pulse/Emerging: same §2/§3 clients as ES-02/03 when shown compact.
- No new continuum endpoint (M140).

## Тексты и переводы (en / et / ru)

| key | en | et | ru |
|-----|----|----|----|
| `earlySignal.continuum.title` | Issues and discovery | Teemad ja avastus | Темы и обнаружение |
| `earlySignal.continuum.message` | Discovery continues for other Stories still taking shape. | Avastus jätkub teiste lugude jaoks, mis alles kujunevad. | Обнаружение продолжается для других историй, которые ещё формируются. |
| `earlySignal.continuum.residualHint` | Some civic material is still forming alongside confirmed Issues. | Osa kodanikuteemadest alles kujuneb kinnitatud teemade kõrval. | Часть гражданских материалов ещё формируется рядом с подтверждёнными темами. |
| `earlySignal.continuum.viewIssues` | View Issues | Vaata teemasid | Смотреть темы |

> Feed chrome: **reuse** `publicHome.board.*` (PH-04). Forbidden: «10 Stories created an Issue» ratio claims / unlock (AC-SPA-ES-03).

## Acceptance Criteria

- [x] Issues ≥ 1 → feed still renders (AC-SPA-ES-05).
- [x] `/dashboard` unchanged (AC-SPA-ES-07); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03).
- [x] Links: M140 · icons · api-req §1 · L10N · PH-04 reuse noted.

## ADR / bans

See [ADMIN-ESD-06](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) D1–D10. No invented GW paths; no Offers/Voices; no `/dashboard`. Do not mix ES-01…04 product AC into this pkg.

## Backlog product story

Full FR / L10N / AC: [STORY-SPA-ES-05-issues-continuum-regression.md](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md)
