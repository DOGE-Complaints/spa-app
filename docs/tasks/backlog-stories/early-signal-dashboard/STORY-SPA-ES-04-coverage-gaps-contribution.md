# STORY-SPA-ES-04 — Coverage Gaps + Contribution CTAs

## Meta
- **Key:** `STORY-SPA-ES-04-coverage-gaps-contribution`
- **Epic:** [EPIC-SPA-12](../../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/STORY-SPA-ES-04-coverage-gaps-contribution.md)
- **Package:** [early-signal-dashboard/](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** Done
- **Severity:** 🟡 MED
- **Depends on:** [M139](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md); [api-req §4](STORY-SPA-ES-api-requirements.md); [icon catalog](STORY-SPA-ES-icon-assets.md); ES-01; PH-06 Submit

## Артборд (SSOT дизайна)

| Мокап | Поверхности | Спека |
|-------|-------------|-------|
| **M139** ESD-C | Picture Forming · What's Missing · Help Complete | [mockup-139-…-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md) |

## Зачем простыми словами
Закрыть coverage-trio: картина формируется (viz), пробелы — **абстрактно** (без coverage %), Help → существующий Submit GPT (`VITE_STORY_GPT_URL`).

## Текущее состояние (verified)

**As-of-Done / Current** (P3 gate `2026-08-17T12:02:25Z` · T07):
- No coverage HTTP / DTO (api-req §4).
- Submit: PH-06 `getStoryGptUrl` / `VITE_STORY_GPT_URL` ✅.
- Help mascot asset: `/assets/es-help-mascot.png` **ON DISK** (`public/assets/es-help-mascot.png`).
- Picture-forming = viz only (api-req §5).
- L10N ES-04 keys **in dictionary** (`forming.message` · `missing.*` · `help.*`) — see pipeline.

**Historical** (pre-P3 / catalog extract):
- Help mascot catalog NEW `/assets/es-help-mascot.png` (may be missing until extract — non-blocking).

## Функциональные требования (FR)
- **FR-ES-04.1** What's Missing: qualitative categories (Areas / Languages / Groups / Themes) as framing — **no** coverage % / gap score / «N more Stories» (AC-SPA-ES-03).
- **FR-ES-04.2** Optional: if Pulse data available, reuse `areas`/`languages`/`topics` **keys as labels only** — never invent gap counts (api-req §4.2).
- **FR-ES-04.3** Help Complete: CTA = existing PH-06 Submit → GPT external; optional `ic-external-link` / lock reuse.
- **FR-ES-04.4** Picture Forming block: viz/CSS only — no fake relationship metrics.
- **FR-ES-04.5** No Offers (AC-SPA-ES-06).
- **FR-ES-04.L10N** `earlySignal.missing.*` · `earlySignal.help.*` · `earlySignal.forming.*`; reuse PH Submit accessible labels where shared.

## Субтаски
| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-04-t01-whats-missing-abstract](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t01-whats-missing-abstract/README.md) | What's Missing abstract |
| **T02** | [task-spa-es-04-t02-help-ph06-cta](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t02-help-ph06-cta/README.md) | Help + PH-06 CTA |
| **T03** | [task-spa-es-04-t03-picture-forming-viz](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t03-picture-forming-viz/README.md) | Picture Forming viz |
| **T04** | [task-spa-es-04-t04-coverage-icons-mascot](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t04-coverage-icons-mascot/README.md) | Icons + mascot |
| **T05** | [task-spa-es-04-t05-vitest-coverage-cta](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t05-vitest-coverage-cta/README.md) | Vitest coverage/CTA |
| **T06** | [task-spa-es-04-t06-story-gate-es-04](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t06-story-gate-es-04/README.md) | Story gate ES-04 |
| **T07** | [task-spa-es-04-t07-as-of-done-pipeline-backlog-ssot](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t07-as-of-done-pipeline-backlog-ssot/README.md) | P5 F1 pipeline/backlog As-of-Done |
| **T08** | [task-spa-es-04-t08-as-of-done-api-req-ssot](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/task-spa-es-04-t08-as-of-done-api-req-ssot/README.md) | P5 F2 api-req §0 As-of-Done |

## Иконки (из каталога)
> Источник: [STORY-SPA-ES-icon-assets.md](STORY-SPA-ES-icon-assets.md). NEW PNG + mascot **ON DISK** (2026-08-17).

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
- [api-req §4](STORY-SPA-ES-api-requirements.md): **no** new gateway path; env GPT only.
- Optional Pulse labels — ES-02 consumer reuse, not a coverage API.

## Зависимости
- ES-01 · PH-06 · optional ES-02 for qualitative labels.

## Вне scope
- Coverage DTO / % complete. Gamified unlock. Voices. New GPT URL hardcode.

## Тексты и переводы (en / et / ru)

| key | en | et | ru |
|-----|----|----|----|
| `earlySignal.forming.title` | The Picture Is Forming | Pilt kujuneb | Картина формируется |
| `earlySignal.forming.message` | Different Stories are beginning to reveal relationships across shared experiences. | Erinevad lood hakkavad paljastama seoseid ühiste kogemuste vahel. | Разные истории начинают выявлять связи между общим опытом. |
| `earlySignal.missing.title` | What's Missing | Mis puudub | Чего не хватает |
| `earlySignal.missing.intro` | Some parts of the picture are still uncertain. | Mõned osa pildist on endiselt ebaselged. | Некоторые части картины ещё неясны. |
| `earlySignal.missing.areas` | Areas | Piirkonnad | Районы |
| `earlySignal.missing.languages` | Languages | Keeled | Языки |
| `earlySignal.missing.groups` | Groups | Rühmad | Группы |
| `earlySignal.missing.themes` | Themes | Teemad | Темы |
| `earlySignal.help.title` | Help Complete the Picture | Aita pilti täiendada | Помогите дополнить картину |
| `earlySignal.help.message` | Share a civic Story to strengthen what the network can see. | Jaga kodanikulugu, et tugevdada seda, mida võrk näeb. | Поделитесь гражданской историей, чтобы усилить то, что видит сеть. |
| `earlySignal.help.submit` | Submit a story | Esita lugu | Подать историю |
| `earlySignal.help.submitAccessible` | Submit a story. Opens DOGEstonia GPT in an external service. | Esita lugu. Avab DOGEstonia GPT välises teenuses. | Подать историю. Открывает DOGEstonia GPT во внешнем сервисе. |

> Reuse PH-06 keys for Submit where product wants single SSOT — listed here for ES-04 DoD. Forbidden: coverage % / «3 more Stories needed» (AC-SPA-ES-03).

## Acceptance Criteria
- [x] Missing = abstract/qualitative; no coverage score API.
- [x] Help CTA uses `VITE_STORY_GPT_URL` helper (PH-06); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03).
- [x] Links: M139 · icons · api-req §4 · L10N.

## Швы
- Discovery slots Forming/Missing/Help, PH-06 helper, assets/mascot, i18n.
