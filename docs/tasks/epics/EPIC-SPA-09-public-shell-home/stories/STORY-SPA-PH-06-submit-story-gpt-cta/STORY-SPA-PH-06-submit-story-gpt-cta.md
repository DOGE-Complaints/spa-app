# STORY-SPA-PH-06-submit-story-gpt-cta — Submit Story → GPT CTA

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-06-submit-story-gpt-cta`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 3**
- **Пакет:** `public-home/` · active `pkg-000051-20260805-epic-spa-09-ph-06-submit-gpt-cta.yaml`
- **Status:** Done — P3 gate PASS 2026-08-05T10:31:01Z (`pkg-000051`)
- **Severity:** 🟡 MED
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md)
- **decision_ref:** backlog story + [api-req §3.3](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) + [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) + M129 / M133 (+ appendix)
- **ui_scope:** `mixed`
- **mockup SSOT:** M129 header Submit · M133 page CTA / step 4 · StorySubmitPage env pattern
- **Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z
- **Depends on:** PH-01 nav Done; PH-05 page CTAs Done; PH-04 board Submit entry present

## Артборд (SSOT дизайна)

| Мокап | Контекст | Спека |
|-------|----------|-------|
| **M129** | Nav «Submit a story» | [mockup-129-…](../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |
| **M133** | Page CTA + step 4 handoff | [mockup-133-…](../../../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md) + [appendix](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) |
| **StorySubmitPage** | Env pattern reference | [`StorySubmitPage.jsx`](../../../../../../src/pages/StorySubmitPage.jsx) |

## Зачем простыми словами
Все «Submit a story» CTA открывают DOGEstonia GPT по `VITE_STORY_GPT_URL` (external). Запрет hardcoded ChatGPT URL на board/nav.

## Текущее состояние (verified P3 2026-08-05T10:31:01Z)
- Shared helper: [`src/config/storyGptUrl.js`](../../../../../../src/config/storyGptUrl.js) — `getStoryGptUrl` / `getStoryGptHref` / `openStoryGpt`.
- Header / HowItWorks / Board / StorySubmitPage use helper; Board hardcoded GPT URL **removed**.
- Screenshots: [`screenshots/`](./screenshots/) · gate: [`task-spa-ph-06-t07-story-gate-ph-06/acceptance-verification-spa-ph-06.md`](./task-spa-ph-06-t07-story-gate-ph-06/acceptance-verification-spa-ph-06.md).
- Not an HTTP API to gateway/identity.

## Функциональные требования (FR)
- **FR-PH-06.1** Shared helper (e.g. `getStoryGptUrl()` / `openStoryGpt()`) reads `import.meta.env.VITE_STORY_GPT_URL`.
- **FR-PH-06.2** All Submit CTAs use that helper: PH-01 nav, PH-05 CTA/step-4, board/legacy submit entry points touched by public-home wave.
- **FR-PH-06.3** **Forbidden:** hardcoded GPT/ChatGPT URLs in product UI code paths for Submit.
- **FR-PH-06.4** Open external (new tab / location) with clear external affordance; optional `ic-external-link`.
- **FR-PH-06.5** Accessible name includes external handoff meaning (`howItWorks.cta.submitAccessibleLabel` or equivalent).
- **FR-PH-06.6** Missing/empty env: calm failure (no crash; no silent wrong URL) — document behavior in tech task (ADMIN-06); do not fall back to hardcoded production GPT URL.
- **FR-PH-06.L10N** Reuse `publicHome.nav.submitStory` + `howItWorks.cta.submit*` / `howItWorks.externalHandoff` — no parallel marketing keys. Do not reuse legacy `createIssue`.

## Acceptance Criteria
- [x] Every public-home Submit CTA opens `VITE_STORY_GPT_URL` (env), not a hardcoded ChatGPT URL.
- [x] Board legacy hardcoded URL removed/replaced on Submit path.
- [x] a11y label communicates external DOGEstonia GPT handoff.
- [x] Optional external-link icon from catalog #3; api-req §3.3 linked.
- [x] No in-app compose implied.

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

> **Не reuse** `createIssue` from `dictionaries.js`.

## Tasks

- [SPA-PH-06-T01](task-spa-ph-06-t01-env-gpt-url-helper/README.md) — Env GPT URL helper
- [SPA-PH-06-T02](task-spa-ph-06-t02-wire-nav-submit/README.md) — Wire PH-01 nav Submit (`ui_anchor`)
- [SPA-PH-06-T03](task-spa-ph-06-t03-wire-how-it-works-cta/README.md) — Wire PH-05 Submit CTAs
- [SPA-PH-06-T04](task-spa-ph-06-t04-replace-board-hardcoded-url/README.md) — Replace Board hardcoded GPT URL
- [SPA-PH-06-T05](task-spa-ph-06-t05-external-link-icon/README.md) — Optional ic-external-link
- [SPA-PH-06-T06](task-spa-ph-06-t06-vitest-env-no-hardcode/README.md) — Vitest env used; no hardcode
- [SPA-PH-06-T07](task-spa-ph-06-t07-story-gate-ph-06/README.md) — Story gate PH-06

## UX ready

Path A — brief skip. `@mockup` SSOT on T02–T05 READMEs.
