# STORY-SPA-PH-06 — Submit Story → GPT CTA

## Meta
- **Key:** `STORY-SPA-PH-06-submit-story-gpt-cta`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/STORY-SPA-PH-06-submit-story-gpt-cta.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md)
- **Status:** Done — P3 gate PASS 2026-08-05T10:31:01Z (`pkg-000051`) · As-of-Done backlog §состояние T09 · HEAD `16e7733` (T08)
- **Severity:** 🟡 MED
- **Depends on:** [api-req §3.3](STORY-SPA-PH-api-requirements.md); [M133 appendix CTA](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md); PH-01 nav; PH-05 page CTAs; [icon catalog #3](STORY-SPA-PH-icon-assets.md)

## Артборд (SSOT дизайна)

| Мокап | Контекст | Спека |
|-------|----------|-------|
| **M129** | Nav «Submit a story» | [mockup-129-…](../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |
| **M133** | Page CTA + step 4 handoff | [mockup-133-…](../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md) + [appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) |
| **StorySubmitPage** | Env pattern reference | [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx) |

## Зачем простыми словами
Все «Submit a story» CTA открывают DOGEstonia GPT по `VITE_STORY_GPT_URL` (external). Запрет hardcoded ChatGPT URL на board/nav.

## Текущее состояние (verified As-of-Done · HEAD `16e7733` · T09 2026-08-06)
- Shared helper: [`src/config/storyGptUrl.js`](../../../../src/config/storyGptUrl.js) — `getStoryGptUrl` / `getStoryGptHref` / `openStoryGpt` / `hasStoryGptUrl` (reads `VITE_STORY_GPT_URL` only; no hardcoded GPT-id fallback).
- Env documented in [`.env.example`](../../../../.env.example).
- Header / HowItWorks / Board / StorySubmitPage use the helper; Board legacy hardcoded GPT URL **removed** (HEAD).
- Pipeline gate: [acceptance-verification-spa-ph-06.md](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/task-spa-ph-06-t07-story-gate-ph-06/acceptance-verification-spa-ph-06.md) · pkg `pkg-000051`.
- Not an HTTP API to gateway/identity.

## Функциональные требования (FR)
- **FR-PH-06.1** Shared helper (e.g. `getStoryGptUrl()` / `openStoryGpt()`) reads `import.meta.env.VITE_STORY_GPT_URL`.
- **FR-PH-06.2** All Submit CTAs use that helper: PH-01 nav, PH-05 CTA/step-4, board/legacy submit entry points touched by public-home wave.
- **FR-PH-06.3** **Forbidden:** hardcoded GPT/ChatGPT URLs in product UI code paths for Submit.
- **FR-PH-06.4** Open external (new tab / location) with clear external affordance; optional `ic-external-link`.
- **FR-PH-06.5** Accessible name includes external handoff meaning (`howItWorks.cta.submitAccessibleLabel` or equivalent).
- **FR-PH-06.6** Missing/empty env: calm failure (no crash; no silent wrong URL) — document behavior in tech task (ADMIN-06); do not fall back to hardcoded production GPT URL.
- **FR-PH-06.L10N** Reuse `publicHome.nav.submitStory` + `howItWorks.cta.submit*` / `howItWorks.externalHandoff` — no parallel marketing keys. Do not reuse legacy `createIssue`.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Env URL helper + open external | config / util |
| **T02** | Wire PH-01 nav Submit | PublicHeader |
| **T03** | Wire PH-05 CTAs | HowItWorks page |
| **T04** | Replace Board hardcoded GPT URL | `BoardPage.jsx` / related |
| **T05** | Optional `ic-external-link` | `/icons/public-home/` |
| **T06** | Vitest: env used; no hardcoded URL in Submit paths | `__tests__` |
| **T07** | Story gate PH-06 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md).
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| External handoff *(опц.)* | `ic-external-link.png` | `/icons/public-home/ic-external-link.png` | NEW #3 |

## Routes / API
- [api-req §3.3](STORY-SPA-PH-api-requirements.md): `VITE_STORY_GPT_URL` only — **not** HTTP endpoint.
- Reference implementation: [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx).

## Зависимости
- PH-01 — nav CTA surface.
- PH-05 — tutorial CTA surface.
- PH-04 — board may host Submit entry (wire when present).

## Вне scope
- In-app story compose. Gateway submit API. Changing GPT product prompt. New BE.

## Тексты и переводы (en / et / ru)

> Reuse keys owned by PH-01 / PH-05 — listed here for wiring DoD.

| key | en | et | ru | Owner |
|-----|----|----|----|-------|
| `publicHome.nav.submitStory` | Submit a story | Esita lugu | Подать историю | PH-01 |
| `howItWorks.cta.submit` | Submit a story | Esita lugu | Подать историю | PH-05 |
| `howItWorks.cta.submitHint` | Opens DOGEstonia GPT | Avab DOGEstonia GPT | Открывает DOGEstonia GPT | PH-05 |
| `howItWorks.cta.submitAccessibleLabel` | Submit a story. Opens DOGEstonia GPT in an external service. | Esita lugu. Avab DOGEstonia GPT välises teenuses. | Подать историю. Открывает DOGEstonia GPT во внешнем сервисе. | PH-05 |
| `howItWorks.externalHandoff` | Opens DOGEstonia GPT in an external service. | Avab DOGEstonia GPT välises teenuses. | Открывает DOGEstonia GPT во внешнем сервисе. | PH-05 |

> **Не reuse** `createIssue` («Create Issue» / «Loo kaebus») from [`dictionaries.js`](../../../../src/i18n/dictionaries.js).

## Acceptance Criteria
- [x] Every public-home Submit CTA opens `VITE_STORY_GPT_URL` (env), not a hardcoded ChatGPT URL.
- [x] Board legacy hardcoded URL removed/replaced on Submit path.
- [x] a11y label communicates external DOGEstonia GPT handoff.
- [x] Optional external-link icon from catalog #3; api-req §3.3 linked.
- [x] No in-app compose implied.

## Швы
- Env config, PublicHeader, HowItWorks page, BoardPage / StorySubmitPage parity, `publicHomeDictionary.js` (reuse keys).
