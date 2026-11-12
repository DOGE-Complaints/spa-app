# STORY-SPA-ES-04-coverage-gaps-contribution — Coverage Gaps + Contribution CTAs

## Meta (pipeline)

- **Key:** `STORY-SPA-ES-04-coverage-gaps-contribution`
- **Parent Epic:** [`../../EPIC-SPA-12-early-signal-dashboard.md`](../../EPIC-SPA-12-early-signal-dashboard.md)
- **Epic:** EPIC-SPA-12 Early Signal Dashboard · **Wave 3**
- **Package:** `pkg-000069`
- **Status:** Done
- **Severity:** MED
- **source:** [`../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md)
- **decision_ref:** backlog + [M139](../../../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md) + [api-req §4](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) + [icons](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md) + [ADMIN-ESD-06 ADR](../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md`
- **Scaffolded:** 2026-08-16 · **P1.3:** 2026-08-17T11:54:44Z
- **Depends on:** M139 · api-req §4 · icon catalog · ES-01 shell slots · PH-06 Submit · optional ES-02 Pulse labels

## Артборд (SSOT дизайна)

| Мокап | Поверхности | Спека |
|-------|-------------|-------|
| **M139** ESD-C | Picture Forming · What's Missing · Help Complete | [mockup-139-…-spec.md](../../../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md) |

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

## Зачем простыми словами

Закрыть coverage-trio: картина формируется (viz), пробелы — **абстрактно** (без coverage %), Help → существующий Submit GPT (`VITE_STORY_GPT_URL`).

## Текущее состояние (verified)

**As-of-Done / Current** (P3 gate `2026-08-17T12:02:25Z` · T07):
- Coverage HTTP / DTO: **none** (api-req §4).
- Submit helper: [`storyGptUrl.js`](../../../../../src/config/storyGptUrl.js) `getStoryGptUrl` / `VITE_STORY_GPT_URL` — ✅ PH-06.
- Discovery host: `showEmptyBoard` ([`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx) L162) → `<EarlySignalDiscovery />` L326.
- Slots filled P3: [`EarlySignalDiscovery.jsx`](../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) — `PictureFormingBlock` / `WhatsMissingBlock` / `HelpCompleteBlock`.
- Pulse/Emerging **already wired** (ES-02/03) — do not reopen those AC.
- L10N ES-04 keys **in dictionary** (`earlySignal.forming.message` · `missing.intro` / `areas` / `languages` / `groups` / `themes` · `help.message` / `submit` / `submitAccessible`) — [`earlySignalDictionary.js`](../../../../../src/i18n/earlySignalDictionary.js) + `EARLY_SIGNAL_FLAT_KEYS`.
- Help mascot + gap/help PNG: **ON DISK** (`public/assets/es-help-mascot.png`).

**Historical** (pre-P3 ES-04):
- L10N titles only (`earlySignal.forming.title` / `missing.title` / `help.title`); remaining backlog keys not in dictionary yet.

## Функциональные требования (FR)

- **FR-ES-04.1** What's Missing: qualitative categories (Areas / Languages / Groups / Themes) as framing — **no** coverage % / gap score / «N more Stories» (AC-SPA-ES-03).
- **FR-ES-04.2** Optional: if Pulse data available, reuse `areas`/`languages`/`topics` **keys as labels only** — never invent gap counts (api-req §4.2).
- **FR-ES-04.3** Help Complete: CTA = existing PH-06 Submit → GPT external; optional `ic-external-link` / lock reuse.
- **FR-ES-04.4** Picture Forming block: viz/CSS only — no fake relationship metrics.
- **FR-ES-04.5** No Offers (AC-SPA-ES-06).
- **FR-ES-04.L10N** `earlySignal.missing.*` · `earlySignal.help.*` · `earlySignal.forming.*`; reuse PH Submit accessible labels where shared.

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-04-t01-whats-missing-abstract](./task-spa-es-04-t01-whats-missing-abstract/README.md) | What's Missing abstract · **ui_anchor** |
| **T02** | [task-spa-es-04-t02-help-ph06-cta](./task-spa-es-04-t02-help-ph06-cta/README.md) | Help + PH-06 CTA |
| **T03** | [task-spa-es-04-t03-picture-forming-viz](./task-spa-es-04-t03-picture-forming-viz/README.md) | Picture Forming viz |
| **T04** | [task-spa-es-04-t04-coverage-icons-mascot](./task-spa-es-04-t04-coverage-icons-mascot/README.md) | Icons + mascot |
| **T05** | [task-spa-es-04-t05-vitest-coverage-cta](./task-spa-es-04-t05-vitest-coverage-cta/README.md) | Vitest coverage/CTA |
| **T06** | [task-spa-es-04-t06-story-gate-es-04](./task-spa-es-04-t06-story-gate-es-04/README.md) | Story gate ES-04 |
| **T07** | [task-spa-es-04-t07-as-of-done-pipeline-backlog-ssot](./task-spa-es-04-t07-as-of-done-pipeline-backlog-ssot/README.md) | P5 F1 pipeline/backlog As-of-Done |
| **T08** | [task-spa-es-04-t08-as-of-done-api-req-ssot](./task-spa-es-04-t08-as-of-done-api-req-ssot/README.md) | P5 F2 api-req §0 As-of-Done |

## Иконки (из каталога)

> Источник: [STORY-SPA-ES-icon-assets.md](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md). NEW PNG + mascot **ON DISK** (2026-08-17).

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Gap Areas | `/icons/story-handoff/ic-field-location.png` | `public/icons/story-handoff/ic-field-location.png` | abstract category |
| Gap Languages | `/icons/early-signal-dashboard/ic-gap-languages.png` | `public/icons/early-signal-dashboard/ic-gap-languages.png` | NEW |
| Gap Groups | `/icons/identity/ic-profile-conflict.png` | `public/icons/identity/ic-profile-conflict.png` | reuse users |
| Gap Themes | `/icons/story-handoff/ic-field-institution.png` | `public/icons/story-handoff/ic-field-institution.png` | reuse |
| Gap other | `/icons/early-signal-dashboard/ic-gap-ellipsis.png` | `public/icons/early-signal-dashboard/ic-gap-ellipsis.png` | NEW |
| Help share story | `/icons/early-signal-dashboard/ic-help-share.png` | `public/icons/early-signal-dashboard/ic-help-share.png` | NEW |
| Help together | `/icons/early-signal-dashboard/ic-help-together.png` | `public/icons/early-signal-dashboard/ic-help-together.png` | NEW |
| Help see | `/icons/identity/ic-eye.png` | `public/icons/identity/ic-eye.png` | reuse |
| Help mascot | `/assets/es-help-mascot.png` | `public/assets/es-help-mascot.png` | illustration, not Lucide |
| Submit CTA | `/icons/public-home/ic-external-link.png` | `public/icons/public-home/ic-external-link.png` | PH-06 |
| Secure lock | `/icons/story-handoff/ic-lock.png` | `public/icons/story-handoff/ic-lock.png` | reuse |
| Narrow chevron | `/icons/public-home/ic-chevron-right.png` | `public/icons/public-home/ic-chevron-right.png` | IssueCard reuse |
| Picture-forming viz | — | — | CSS — **not** `ic-*` |

## Routes / API

- [api-req §4](../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md): **no** new gateway path; env GPT only.
- Optional Pulse labels — ES-02 consumer reuse, not a coverage API.

## Зависимости

- ES-01 slot. PH-06 helper ✅. Optional ES-02 for qualitative labels. Pulse/Emerging FE already wired — do not reopen ES-02/03 AC.

## Вне scope

- Coverage DTO / % complete. Gamified unlock. Voices. New GPT URL hardcode. ES-05 continuum. Product JSX this P1.

## Acceptance Criteria

- [x] Missing = abstract/qualitative; no coverage score API.
- [x] Help CTA uses `VITE_STORY_GPT_URL` helper (PH-06); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03).
- [x] Links: M139 · icons · api-req §4 · L10N.
