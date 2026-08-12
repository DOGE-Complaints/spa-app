# STORY-SPA-PH-05-how-it-works-page — How It Works Page

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-05-how-it-works-page`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 3**
- **Пакет:** `public-home/` · active `pkg-000050-20260804-epic-spa-09-ph-05-how-it-works.yaml`
- **Status:** Done — P3 gate PASS 2026-08-04T13:22:05Z (`pkg-000050`)
- **Severity:** 🟡 MED
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md)
- **decision_ref:** backlog story + [mockup-133-public-how-it-works-page-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md) + [mockup-133-…-localized-copy-appendix.md](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) + [STORY-SPA-PH-api-requirements.md](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §3.1 + [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md` (+ L10N appendix; page PNG `mockup-133-public-how-it-works-page-state-sheet-estonia.png` in HEAD `f245451`)
- **Post-audit:** P6 CLOSED 2026-08-05T09:20:08Z · `run_mode=spa_ph_05_audit_2026_08_04` · commits `f245451` / `ea22145` / `a6484ab`
- **Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z
- **Depends on:** PH-01 / PH-03 chrome Done; PH-04 `/board` link target Done; Submit CTA uses `VITE_STORY_GPT_URL` (Header pattern); PH-06 later extracts shared helper

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M133** | How it works page | [mockup-133-public-how-it-works-page-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md) |
| **M133 appendix** | Full en/et/ru copy SSOT | [mockup-133-…-localized-copy-appendix.md](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) |

## Зачем простыми словами
Публичная tutorial-страница `/how-it-works`: ровно 4 шага (civic issues → dashboard → useful story → GPT submit). Не marketing landing и не onboarding wizard.

## Текущее состояние (verified)
- **As-of-Done (P3 `pkg-000050` gate 2026-08-04T13:22:05Z):** [`HowItWorksPage.jsx`](../../../../../../src/pages/HowItWorksPage.jsx) — M133 tutorial (`how-it-works-page`); **4 steps**; CTAs `/board` + `VITE_STORY_GPT_URL`; stub removed.
- [`howItWorksDictionary.js`](../../../../../../src/i18n/howItWorksDictionary.js) + FLAT_KEYS in `publicHomeDictionary.js`.
- Evidence: story-root [`screenshots/`](./screenshots/) · H1 live happy.
- API/CMS: none ✅ ([api-req §3.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)).

## Функциональные требования (FR)
- **FR-PH-05.1** Public route `/how-it-works` inside AppShell / PH chrome (header+footer).
- **FR-PH-05.2** Exactly four steps in fixed order (appendix); identical structure en/et/ru.
- **FR-PH-05.3** CTA row: **Go to Dashboard** → internal `/board`; **Submit a story** → PH-06 env GPT URL (external).
- **FR-PH-05.4** Inline dashboard action in step 2 same as CTA dashboard.
- **FR-PH-05.5** No in-app story editor; external handoff explicit in copy + a11y.
- **FR-PH-05.6** Product names / routes / env names not translated (`DOGEstonia GPT`, `/board`).
- **FR-PH-05.L10N** Namespace `howItWorks.*` (appendix primary) in `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`. Header/footer chrome keys owned by PH-01/PH-03 (`publicHome.nav.*` / `publicHome.footer.*`) — do not duplicate appendix `header.*` / `footer.*` under wrong namespace.

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 1 | [task-spa-ph-05-t01-route-how-it-works-page](./task-spa-ph-05-t01-route-how-it-works-page/README.md) | Confirm public route; replace stub shell |
| **T02** | 1 | [task-spa-ph-05-t02-four-step-layout](./task-spa-ph-05-t02-four-step-layout/README.md) | Four-step layout M133 · **ui_anchor** |
| **T03** | 1 | [task-spa-ph-05-t03-wire-ctas-board-and-gpt](./task-spa-ph-05-t03-wire-ctas-board-and-gpt/README.md) | Wire CTAs `/board` + `VITE_STORY_GPT_URL` |
| **T04** | 1 | [task-spa-ph-05-t04-step-icons-reuse](./task-spa-ph-05-t04-step-icons-reuse/README.md) | Step icons reuse |
| **T05** | 1 | [task-spa-ph-05-t05-l10n-howitworks-keys](./task-spa-ph-05-t05-l10n-howitworks-keys/README.md) | L10N howItWorks.* full appendix |
| **T06** | 1 | [task-spa-ph-05-t06-vitest-route-steps-cta](./task-spa-ph-05-t06-vitest-route-steps-cta/README.md) | Vitest route + steps + CTAs |
| **T07** | 1 | [task-spa-ph-05-t07-story-gate-ph-05](./task-spa-ph-05-t07-story-gate-ph-05/README.md) | Story gate PH-05 |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md).
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Step 1 document | `ic-doc-new.png` | `/icons/story-handoff/ic-doc-new.png` | ID-12 #16 |
| Step 3 summary | `ic-field-summary.png` | `/icons/story-handoff/ic-field-summary.png` | ID-12 #5 |
| External submit *(опц.)* | `ic-external-link.png` | `/icons/public-home/ic-external-link.png` | NEW #3 → PH-06 |
| Chevron *(опц.)* | `ic-chevron-right.png` | `/icons/public-home/ic-chevron-right.png` | NEW #4 |

## Routes / API
- [api-req §3.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md): static i18n; **no CMS**.
- Public route — not protected (no session overlay required for read).

## Зависимости
- PH-01 / PH-03 — chrome.
- PH-06 — Submit CTA env URL (shared helper later); this wave uses Header `VITE_STORY_GPT_URL` pattern.
- PH-04 — Dashboard target `/board` feed semantics (link only).

## Вне scope
- CMS / admin-editable tutorial. Marketing landing sections. Rewards language. In-app compose.

## Тексты и переводы (en / et / ru)

> Полный канон: [M133 localized-copy appendix](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md). Ниже — flat keys для DoD (не выдумывать).

### `howItWorks.*` — intro

| key | en | et | ru |
|-----|----|----|----|
| `howItWorks.eyebrow` | How DOGEstonia works | Kuidas DOGEstonia töötab | Как работает DOGEstonia |
| `howItWorks.title` | How It Works | Kuidas see töötab | Как это работает |
| `howItWorks.intro` | DOGEstonia helps people turn real civic experiences into structured public issues that can be understood, reviewed and acted upon. | DOGEstonia aitab muuta inimeste tegelikud ühiskondlikud kogemused struktureeritud avalikeks teemadeks, mida saab mõista, läbi vaadata ja mille alusel tegutseda. | DOGEstonia помогает превращать реальный гражданский опыт людей в структурированные публичные темы, которые можно понять, рассмотреть и использовать как основу для действий. |

### Step 1 — Civic Issues

| key | en | et | ru |
|-----|----|----|----|
| `howItWorks.steps.civicIssues.number` | 01 | 01 | 01 |
| `howItWorks.steps.civicIssues.title` | Understand Civic Issues | Mõista ühiskondlikke teemasid | Поймите, что такое гражданские темы |
| `howItWorks.steps.civicIssues.body` | A civic issue is a structured public record of a real need, problem, observation or proposal. It helps turn individual experience into information that others can understand and review. | Ühiskondlik teema on struktureeritud avalik kirjeldus tegelikust vajadusest, probleemist, tähelepanekust või ettepanekust. See aitab muuta isikliku kogemuse teabeks, mida teised saavad mõista ja läbi vaadata. | Гражданская тема — это структурированное публичное описание реальной потребности, проблемы, наблюдения или предложения. Она помогает превратить личный опыт в информацию, которую другие люди могут понять и рассмотреть. |
| `howItWorks.steps.civicIssues.point1` | Based on real-life experience | Põhineb tegelikul elukogemusel | Основана на реальном жизненном опыте |
| `howItWorks.steps.civicIssues.point2` | Structured for public understanding | On struktureeritud avalikuks mõistmiseks | Структурирована для публичного понимания |
| `howItWorks.steps.civicIssues.point3` | Connected to place, topic and responsible institutions | On seotud koha, teema ja vastutavate asutustega | Связана с местом, темой и ответственными учреждениями |
| `howItWorks.steps.civicIssues.point4` | Presented factually rather than as campaign content | Esitatakse faktiliselt, mitte kampaaniasisuna | Излагается фактически, а не как агитационный материал |

### Step 2 — Public Dashboard

| key | en | et | ru |
|-----|----|----|----|
| `howItWorks.steps.dashboard.number` | 02 | 02 | 02 |
| `howItWorks.steps.dashboard.title` | Read The Public Dashboard | Loe avalikku juhtpaneeli | Читайте публичную доску |
| `howItWorks.steps.dashboard.body` | The public dashboard shows civic issues in one structured feed. Each item includes a title, status, labels and available context, and opens into a detailed issue view. | Avalik juhtpaneel kuvab ühiskondlikke teemasid ühes struktureeritud voos. Iga kirje sisaldab pealkirja, staatust, silte ja olemasolevat konteksti ning avaneb detailseks teemavaateks. | На публичной доске гражданские темы представлены в едином структурированном потоке. Каждая запись содержит заголовок, статус, метки и доступный контекст, а также открывается в подробном представлении темы. |
| `howItWorks.steps.dashboard.point1` | Search and filter the feed | Otsi ja filtreeri voogu | Используйте поиск и фильтры |
| `howItWorks.steps.dashboard.point2` | Read status as issue metadata | Käsitle staatust teema metaandmena | Читайте статус как метаданные темы |
| `howItWorks.steps.dashboard.point3` | Open any item for full details | Ava iga kirje täieliku info vaatamiseks | Открывайте любую запись для просмотра подробностей |
| `howItWorks.steps.dashboard.point4` | Use labels and context to understand scope | Kasuta silte ja konteksti ulatuse mõistmiseks | Используйте метки и контекст, чтобы понять охват темы |
| `howItWorks.steps.dashboard.inlineAction` | Go to Dashboard | Ava juhtpaneel | Перейти к доске |
| `howItWorks.steps.dashboard.inlineActionHint` | Opens `/board` | Avab `/board` | Открывает `/board` |

### Step 3 — Useful Story

| key | en | et | ru |
|-----|----|----|----|
| `howItWorks.steps.story.number` | 03 | 03 | 03 |
| `howItWorks.steps.story.title` | Prepare A Useful Story | Valmista ette kasulik lugu | Подготовьте полезную историю |
| `howItWorks.steps.story.body` | A useful story explains what happened, where it happened, who is affected and why the situation matters. Clear facts and context help DOGEstonia structure the story correctly. | Kasulik lugu selgitab, mis juhtus, kus see juhtus, keda see mõjutab ja miks olukord on oluline. Selged faktid ja kontekst aitavad DOGEstonial loo õigesti struktureerida. | Полезная история объясняет, что произошло, где это произошло, кого это затрагивает и почему ситуация важна. Ясные факты и контекст помогают DOGEstonia правильно структурировать историю. |
| `howItWorks.steps.story.point1` | Describe the real situation | Kirjelda tegelikku olukorda | Опишите реальную ситуацию |
| `howItWorks.steps.story.point2` | Explain the impact | Selgita mõju | Объясните её влияние |
| `howItWorks.steps.story.point3` | Include location or institution when relevant | Lisa asukoht või asutus, kui see on asjakohane | Укажите место или учреждение, если это уместно |
| `howItWorks.steps.story.point4` | Separate facts from assumptions | Erista faktid oletustest | Отделяйте факты от предположений |
| `howItWorks.steps.story.point5` | Avoid sharing unnecessary personal data | Väldi ebavajalike isikuandmete jagamist | Не сообщайте лишние персональные данные |
| `howItWorks.steps.story.privacyNote` | Do not include sensitive personal information unless it is necessary and explicitly supported by the submission flow. | Ära lisa tundlikke isikuandmeid, välja arvatud juhul, kui need on vajalikud ja esitamisprotsess neid selgesõnaliselt toetab. | Не включайте чувствительные персональные данные, если они не являются необходимыми и их обработка прямо не предусмотрена процессом подачи истории. |

### Step 4 — GPT Submission

| key | en | et | ru |
|-----|----|----|----|
| `howItWorks.steps.submit.number` | 04 | 04 | 04 |
| `howItWorks.steps.submit.title` | Submit Through DOGEstonia GPT | Esita DOGEstonia GPT kaudu | Подайте историю через DOGEstonia GPT |
| `howItWorks.steps.submit.body` | DOGEstonia GPT guides you through the story, structures the information and prepares a draft. The submission process starts through the external DOGEstonia GPT experience. | DOGEstonia GPT juhendab sind loo koostamisel, struktureerib teabe ja valmistab ette mustandi. Esitamisprotsess algab välises DOGEstonia GPT keskkonnas. | DOGEstonia GPT проводит вас через процесс создания истории, структурирует информацию и подготавливает черновик. Процесс подачи начинается во внешней среде DOGEstonia GPT. |
| `howItWorks.steps.submit.point1` | External service handoff | Üleminek välisele teenusele | Переход во внешний сервис |
| `howItWorks.steps.submit.point2` | Opens DOGEstonia GPT | Avab DOGEstonia GPT | Открывает DOGEstonia GPT |
| `howItWorks.steps.submit.point3` | Uses an environment-backed URL | Kasutab keskkonnaseadistusest pärinevat URL-i | Использует URL из конфигурации окружения |
| `howItWorks.steps.submit.warning` | Submit does not open an in-app compose page. | Loo esitamine ei ava rakendusesisest koostamislehte. | Подача истории не открывает встроенную страницу редактирования в приложении. |
| `howItWorks.externalHandoff` | Opens DOGEstonia GPT in an external service. | Avab DOGEstonia GPT välises teenuses. | Открывает DOGEstonia GPT во внешнем сервисе. |

### CTA row

| key | en | et | ru |
|-----|----|----|----|
| `howItWorks.cta.dashboard` | Go to Dashboard | Ava juhtpaneel | Перейти к доске |
| `howItWorks.cta.dashboardHint` | Internal navigation to `/board` | Rakendusesisene navigeerimine aadressile `/board` | Внутренний переход на `/board` |
| `howItWorks.cta.submit` | Submit a story | Esita lugu | Подать историю |
| `howItWorks.cta.submitHint` | Opens DOGEstonia GPT | Avab DOGEstonia GPT | Открывает DOGEstonia GPT |
| `howItWorks.cta.submitAccessibleLabel` | Submit a story. Opens DOGEstonia GPT in an external service. | Esita lugu. Avab DOGEstonia GPT välises teenuses. | Подать историю. Открывает DOGEstonia GPT во внешнем сервисе. |

> Shared chrome labels: PH-01 `publicHome.nav.*`, PH-03 `publicHome.footer.*` (appendix header/footer sections map there).

## Acceptance Criteria
- [x] Public route `/how-it-works` renders tutorial page (not protected redirect).
- [x] Exactly four steps; order identical in en/et/ru; no status-column board language.
- [x] Dashboard CTA → `/board`; Submit → env GPT URL via PH-06; external handoff explicit.
- [x] Full `howItWorks.*` L10N from appendix; api-req §3.1 + icons linked.
- [x] No marketing/campaign/rewards fluff; `DOGEstonia GPT` untranslated.

## Швы
- [`App.jsx`](../../../../../../src/App.jsx), [`HowItWorksPage.jsx`](../../../../../../src/pages/HowItWorksPage.jsx), PH chrome, `VITE_STORY_GPT_URL` (Header pattern; PH-06 helper later), `publicHomeDictionary.js`.

## Tasks

- [SPA-PH-05-T01](task-spa-ph-05-t01-route-how-it-works-page/README.md) — Confirm public route; replace stub
- [SPA-PH-05-T02](task-spa-ph-05-t02-four-step-layout/README.md) — Four-step layout M133 · **ui_anchor**
- [SPA-PH-05-T03](task-spa-ph-05-t03-wire-ctas-board-and-gpt/README.md) — Wire CTAs `/board` + env GPT
- [SPA-PH-05-T04](task-spa-ph-05-t04-step-icons-reuse/README.md) — Step icons reuse
- [SPA-PH-05-T05](task-spa-ph-05-t05-l10n-howitworks-keys/README.md) — L10N howItWorks.*
- [SPA-PH-05-T06](task-spa-ph-05-t06-vitest-route-steps-cta/README.md) — Vitest route + steps + CTAs
- [SPA-PH-05-T07](task-spa-ph-05-t07-story-gate-ph-05/README.md) — Story gate PH-05
