# Индекс backlog-стори spa-app (doc-gap 2026-06-12)

> **Источник:** [spa-app-doc-code-gap-report.md](../../analysis/spa-app-doc-code-gap-report.md)  
> **Статус:** без эпиков — плоский backlog по gap ID (G1–G11).  
> **Порядок ниже** — рекомендуемая последовательность реализации.

## Сводка

| # | Gap | Story | Priority | Status | Doc touchpoints |
|---|-----|-------|----------|--------|-----------------|
| 1 | G1 | [STORY-SPA-G1-gateway-endpoint-alignment](search-and-filters/STORY-SPA-G1-gateway-endpoint-alignment.md) | P0 | ✅ Done — **перенесён в search-and-filters** (SEARCH-00a) | technical-architecture, domain-facade-contract, reality-mode |
| 2 | G2 | [STORY-SPA-G2-labels-i18n-dictionary](design-foundation/STORY-SPA-G2-labels-i18n-dictionary.md) | P1 | Done | mock-layer-issues-guide, i18n-architecture, mockup-12/17 |
| 3 | G3 | [STORY-SPA-G3-search-input-toolbar](search-and-filters/STORY-SPA-G3-search-input-toolbar.md) | P1 | Done — [pipeline](../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-G3-search-input-toolbar/STORY-SPA-G3-search-input-toolbar.md) (pkg-000007, 2026-06-16) | reusable-ui-components-architecture, ui-mockups, mockup-01/15 |
| 4 | G4 | [STORY-SPA-G4-design-tokens-foundation](design-foundation/STORY-SPA-G4-design-tokens-foundation.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G4-design-tokens-foundation/STORY-SPA-G4-design-tokens-foundation.md) | P2 | ✅ Done — pkg-000038 (2026-07-28) | design-system, reusable-ui-components-architecture |
| 5 | G7 | [STORY-SPA-G7-self-hosted-fonts](design-foundation/STORY-SPA-G7-self-hosted-fonts.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G7-self-hosted-fonts/STORY-SPA-G7-self-hosted-fonts.md) | P2 | ✅ Done — pkg-000039 (2026-07-28) | design-system, ui-mockups §24.7 |
| 6 | G8 | [STORY-SPA-G8-app-shell-refactor](design-foundation/STORY-SPA-G8-app-shell-refactor.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G8-app-shell-refactor/STORY-SPA-G8-app-shell-refactor.md) | P2 | ✅ Done — pkg-000040 (2026-07-29T08:27:15Z); post-audit closed `run_mode=spa_g8_audit_2026_07_29` → [T07](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G8-app-shell-refactor/task-spa-g8-t07-deduplicate-language-selector/README.md) gate 2026-07-29T09:39:05Z | design-system §4.1/4.2, reusable-ui-components-architecture |
| 7 | G9† | [STORY-SPA-G9-brand-color-palette-tokens](design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G9-brand-color-palette-tokens/STORY-SPA-G9-brand-color-palette-tokens.md) | P2 | ✅ Done — pkg-000042 | Color Palette v1.0 → tokens.css |
| 8 | G10 | [STORY-SPA-G10-button-system-ds-btn](design-foundation/STORY-SPA-G10-button-system-ds-btn.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/STORY-SPA-G10-button-system-ds-btn.md) | P2 | ✅ Done — pkg-000044 · T15 leftovers F3/F5/F6 CLOSED (2026-08-03T09:34:04Z) | DS-BTN / M134; [guide](../runtime-docs/button-system-developer-guide.md) |
| 9 | G11‡ | [STORY-SPA-G11-brand-token-adoption-glue](design-foundation/STORY-SPA-G11-brand-token-adoption-glue.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/STORY-SPA-G11-brand-token-adoption-glue.md) | P2 | ✅ Done — pkg-000043 (2026-08-02T12:55:51Z) | G9 leftovers F3–F8 closed; [reaudit](../../analysis/reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md) |

> † **G9 (design-foundation)** — brand palette → G4 tokens. Не путать с историческим doc-gap G9 (GPT CTA) в §«Закрыто документально». Leftovers → **G11**.  
> ‡ **G11 (design-foundation)** — token adoption / glue. Не путать с hist. G11 (битые ссылки) в §«Закрыто документально».

## Локализация (тематический набор)

Целевое + gap: [localization-target-and-gap-analysis-2026-06-15.md](../../analysis/localization-target-and-gap-analysis-2026-06-15.md). Пакет: [localization/INDEX.md](localization/INDEX.md) · [README.md](localization/README.md). **Бэк-мост (2026-06-16):** [backend-l10n-integration-bridge-2026-06-16.md](../../analysis/backend-l10n-integration-bridge-2026-06-16.md) — REQ-BE-1/2 доставлены.

| Стори | Gap | Статус | Зависит от |
|-------|-----|--------|------------|
| [L10N-01 — Реестр локалей](localization/STORY-SPA-L10N-01-locale-registry-foundation.md) | GL-1, GL-6 | ✅ Done (pkg-000003, 2026-06-16) | pipeline story |
| [L10N-02 — Динамический фильтр меток](localization/STORY-SPA-L10N-02-dynamic-label-filter.md) | GL-2, GL-7(фильтр) | ✅ Done (pkg-000004 + post-audit T08/T09, 2026-06-16) | [pipeline story](../epics/EPIC-SPA-02-localization-l10n/stories/STORY-SPA-L10N-02-dynamic-label-filter/STORY-SPA-L10N-02-dynamic-label-filter.md) |
| [L10N-03 — Маркеры fallback/перевода](localization/STORY-SPA-L10N-03-translation-fallback-markers.md) | GL-3, GL-7(маркер) | ✅ Done (pkg-000005, 2026-06-16) | [pipeline story](../epics/EPIC-SPA-02-localization-l10n/stories/STORY-SPA-L10N-03-translation-fallback-markers/STORY-SPA-L10N-03-translation-fallback-markers.md) |
| [L10N-04 — Телеметрия + privacy](localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) | GL-5 | ✅ Done (pkg-000006, 2026-06-16) | [pipeline story](../epics/EPIC-SPA-02-localization-l10n/stories/STORY-SPA-L10N-04-untranslated-label-telemetry/STORY-SPA-L10N-04-untranslated-label-telemetry.md) |
| [REQ-BE — Требования к бэку](localization/REQUIREMENTS-BACKEND-L10N.md) | GL-4, sink GL-5 | ✅ Done (GW-L10N-01/02/03); REQ-BE-3 ⏸️ | bridge 2026-06-16 |

## Поиск и фильтры (тематический набор)

Решения: [search-filters-cto-interview-2026-06-15.md](../../analysis/search-filters-cto-interview-2026-06-15.md). Пакет: [search-and-filters/INDEX.md](search-and-filters/INDEX.md) · [README.md](search-and-filters/README.md). **Включает G1 + G3** (перенесены сюда как foundation — состыковка с реальным API, идут первыми).

| Стори | Что | Статус | Зависит от |
|-------|-----|--------|------------|
| [SEARCH-00a / G1 — Gateway connection](search-and-filters/STORY-SPA-G1-gateway-endpoint-alignment.md) | real-API соединение `GET /tallinn/issues` | ✅ Done (pkg-000001) | — |
| [SEARCH-00b / G3 — Контракт фильтров + SearchInput-исток](search-and-filters/STORY-SPA-G3-search-input-toolbar.md) | SSOT контракта фильтр-API (§1–8); SearchInput foundation (кросс-язычный→SEARCH-03) | ✅ Done (pkg-000007, 2026-06-16) | G1 |
| [SEARCH-01 — Выравнивание словарей под gateway](search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) | блокёр server-фильтров; коорд. с локализацией | Done — [pipeline](../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-01-vocabulary-alignment/STORY-SPA-SEARCH-01-vocabulary-alignment.md) (pkg-000008, 2026-06-17) | G1, G3 |
| [SEARCH-02 — Панель фильтров (Jira-like)+чипы+батч+URL+адаптив](search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md) | UX-контейнер | Done — [pipeline](../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-02-filter-panel-shell/STORY-SPA-SEARCH-02-filter-panel-shell.md) (pkg-000009, UI closure 2026-06-17) | SEARCH-01 |
| [SEARCH-03 — SearchInput (кросс-язычный)](search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) | поиск et+ru+en; debounce; clear | ✅ Done (pkg-000010, 2026-06-18) | [pipeline](../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-03-cross-language-search-input/STORY-SPA-SEARCH-03-cross-language-search-input.md) |
| [SEARCH-04 — Institution + Дата](search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) | + проброс в репозиторий | ✅ Done (pkg-000011, 2026-06-18) | [pipeline](../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-04-institution-date-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) |
| [SEARCH-05 — Geo](search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md) | admin-единицы; bbox=future | ✅ Done (pkg-000012, 2026-06-18) | [pipeline](../epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-05-geo-filter/STORY-SPA-SEARCH-05-geo-filter.md) |

## Identity & Auth (EPIC-SPA-04 mirror)

Набор: [identity-auth/INDEX.md](identity-auth/INDEX.md) · [README.md](identity-auth/README.md). **G10** — identity planned, 0% в коде → Wave 1 Foundation.

| Стори | Что | Статус | Зависит от |
|-------|-----|--------|------------|
| [ID-01 — Web Authentication](identity-auth/STORY-SPA-ID-01-web-authentication.md) | login/signup/magic-link/reset; `/login` M121 | ✅ Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-01-web-authentication/STORY-SPA-ID-01-web-authentication.md) (pkg-000013, 2026-06-27) | — |
| [ID-02 — Session Shell States](identity-auth/STORY-SPA-ID-02-session-shell-states.md) | global app-shell session restore | ✅ Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-02-session-shell-states/STORY-SPA-ID-02-session-shell-states.md) (pkg-000016, 2026-06-28) | ID-01 |
| [ID-03 — Civic Status Component](identity-auth/STORY-SPA-ID-03-civic-status-component.md) | CivicStatusCard reuse | 🟢 Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-03-civic-status-component/STORY-SPA-ID-03-civic-status-component.md) (pkg-000017, 2026-06-28) | Done |
| [ID-04 — Phone Verification Flow](identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) | lazy phone verify | 🟢 Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-04-phone-verification-flow/STORY-SPA-ID-04-phone-verification-flow.md) (pkg-000018, 2026-06-28) | — |
| [ID-05 — Verification Error States](identity-auth/STORY-SPA-ID-05-verification-error-states.md) | phone error UI | 🟢 Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-05-verification-error-states/STORY-SPA-ID-05-verification-error-states.md) (pkg-000019, 2026-06-29) | ID-04 |
| [ID-09 — Identity UI Localization](identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) | L10N retrofit ID-01…05 | 🟢 Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-09-identity-ui-localization/STORY-SPA-ID-09-identity-ui-localization.md) (pkg-000020, 2026-06-29) | ID-01…05 Done |
| [ID-06 — Protected Action Gate](identity-auth/STORY-SPA-ID-06-protected-action-gate.md) | web gate | 🟢 Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-06-protected-action-gate/STORY-SPA-ID-06-protected-action-gate.md) (pkg-000021, 2026-06-29) | ID-04 |
| [ID-07 — Country Waitlist](identity-auth/STORY-SPA-ID-07-country-waitlist.md) | waitlist UX | Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-07-country-waitlist/STORY-SPA-ID-07-country-waitlist.md) (pkg-000022, 2026-06-30) | ID-05 |
| [ID-10 — Country selector + waitlist routing](identity-auth/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) | phone country selector; unsupported→waitlist | Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-10-phone-country-selector-waitlist-routing/STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) (pkg-000023, 2026-06-30) | ID-07 |
| [ID-11 — Per-country phone format validation](identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md) | country-driven phone format/validation (M127) | Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-11-per-country-phone-format-validation/STORY-SPA-ID-11-per-country-phone-format-validation.md) (pkg-000024, 2026-06-30) | ID-10 |
| [ID-08 — GPT Verification Entry](identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md) | GPT OAuth bridge | Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-08-gpt-verification-entry/STORY-SPA-ID-08-gpt-verification-entry.md) (pkg-000025, 2026-07-02) | ID-04, ID-05 |
| [ID-12 — Story draft handoff submit](identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md) | GPT draft_id → preview → browser submit (M128) | Done — [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/STORY-SPA-ID-12-story-draft-handoff-submit.md) (pkg-000026, 2026-07-05) | ID-08, ID-04, ID-06 |
| [ID-13 — Public route regression gate](identity-auth/STORY-SPA-ID-13-public-route-regression.md) · [pipeline](../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-13-public-route-regression/STORY-SPA-ID-13-public-route-regression.md) | M-5 public board/issue policy tests | ✅ Done (`pkg-000041`, gate 2026-08-01T20:02:31Z) | ID-12 |

## Railway deploy (EPIC-SPA-06 mirror)

Пакет: [railway-deploy/INDEX.md](railway-deploy/INDEX.md). M-2 из [mvp-integration-plan-2026-07-02.md](../../../docs/analysis/mvp-integration-plan-2026-07-02.md).

| Стори | Что | Статус | Зависит от |
|-------|-----|--------|------------|
| [DEPLOY-01 — Railway deployability](railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) | spa-app на railway; VITE_* bake; GPT URL | Done — [pipeline](../epics/EPIC-SPA-06-railway-deploy/stories/STORY-SPA-DEPLOY-01-railway-deployability/STORY-SPA-DEPLOY-01-railway-deployability.md) (pkg-000027, 2026-07-06) | GW-DEPLOY-01, IDS-DEPLOY-01 (CORS) |
| [DEPLOY-02 — Static production serve](railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) | замена vite preview → static serve `dist/` | Done — [pipeline](../epics/EPIC-SPA-06-railway-deploy/stories/STORY-SPA-DEPLOY-02-static-production-serve/STORY-SPA-DEPLOY-02-static-production-serve.md) (pkg-000028, 2026-07-09) | DEPLOY-01 |

## Security hardening (EPIC-SPA-05 mirror)

Набор: [security-hardening/INDEX.md](security-hardening/INDEX.md) · [EPIC-SPA-SEC.md](security-hardening/EPIC-SPA-SEC.md). **SEC-01** — 🔴 CRITICAL (service_role leak in VITE_*).

| Стори | Что | Статус | Зависит от |
|-------|-----|--------|------------|
| [SEC-01 — Remove service_role from frontend](security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) | purge env/bundle; guard + rotation | ✅ Done — [pipeline](../epics/EPIC-SPA-05-security-hardening/stories/STORY-SPA-SEC-01-remove-service-role-from-frontend/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) (pkg-000014, 2026-06-27) | — |
| [SEC-02 — Supabase credential boundary](security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md) | anon-public vs identity-BFF ADR | Deferred | SEC-01 |
| [SEC-03 — Remove debug instrumentation](security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md) | debug-ingest cleanup in `src/` | ✅ Done — [pipeline](../epics/EPIC-SPA-05-security-hardening/stories/STORY-SPA-SEC-03-remove-debug-instrumentation/STORY-SPA-SEC-03-remove-debug-instrumentation.md) (pkg-000015, 2026-06-28) | SEC-01 |

## Накопительные (housekeeping, без gap ID)

| Story | Назначение | Статус | Пунктов в реестре |
|-------|-----------|--------|-------------------|
| [STORY-SPA-HK01-housekeeping-cleanup-sweep](housekeeping/STORY-SPA-HK01-housekeeping-cleanup-sweep.md) | Реестр-накопитель мелкого dead-code/tech-debt; разовый batch-проход | Accumulating | 1 (HK-001: мёртвый `languages.*` — теперь поглощён [L10N-01](localization/STORY-SPA-L10N-01-locale-registry-foundation.md)) |

## Design foundation (тематический набор)

Пакет: [design-foundation/INDEX.md](design-foundation/INDEX.md). G2/G4/G7/G8/G9/G10/G11 Done (`pkg-000044` G10).

| Стори | Gap | Статус |
|-------|-----|--------|
| [G2 — Labels i18n](design-foundation/STORY-SPA-G2-labels-i18n-dictionary.md) | G2 | Done (pkg-000002) |
| [G4 — Design tokens](design-foundation/STORY-SPA-G4-design-tokens-foundation.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G4-design-tokens-foundation/STORY-SPA-G4-design-tokens-foundation.md) | G4 | ✅ Done — pkg-000038 |
| [G7 — Self-hosted fonts](design-foundation/STORY-SPA-G7-self-hosted-fonts.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G7-self-hosted-fonts/STORY-SPA-G7-self-hosted-fonts.md) | G7 | ✅ Done — pkg-000039 |
| [G8 — App shell refactor](design-foundation/STORY-SPA-G8-app-shell-refactor.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G8-app-shell-refactor/STORY-SPA-G8-app-shell-refactor.md) | G8 | ✅ Done — pkg-000040 (2026-07-29T08:27:15Z); post-audit T07 Done (2026-07-29T09:39:05Z) |
| [G9 — Brand color palette → G4 tokens](design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G9-brand-color-palette-tokens/STORY-SPA-G9-brand-color-palette-tokens.md) | G9† | ✅ Done — pkg-000042; leftovers → [G11](design-foundation/STORY-SPA-G11-brand-token-adoption-glue.md) |
| [G10 — Button system (DS-BTN)](design-foundation/STORY-SPA-G10-button-system-ds-btn.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/STORY-SPA-G10-button-system-ds-btn.md) | G10 | ✅ Done — pkg-000044 · T15 leftovers CLOSED (2026-08-03T09:34:04Z) · [spec](../UX/design-system-buttons-spec.md) · [guide](../runtime-docs/button-system-developer-guide.md) |
| [G11 — Brand token adoption / glue](design-foundation/STORY-SPA-G11-brand-token-adoption-glue.md) · [pipeline](../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/STORY-SPA-G11-brand-token-adoption-glue.md) | G11‡ | ✅ Done — pkg-000043 (2026-08-02T12:55:51Z) · F3–F8 closed |

† Не путать с закрытым doc-gap G9 (GPT CTA) ниже.  
‡ Не путать с hist. G11 (битые ссылки) в §«Закрыто документально».

## User Cabinet — EPIC-SPA-07 (тематический набор)

Пакет: [cabinet/INDEX.md](cabinet/INDEX.md) · Roadmap: [UserprofileRoadmap.md](cabinet/UserprofileRoadmap.md)

| Стори | Что | Статус |
|-------|-----|--------|
| [CAB-01 — Shell assembly](cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) | M21/M99 shell | Done — [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-01-profile-cabinet-shell-assembly/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) (`pkg-000030`, gate 2026-07-25) |
| [CAB-02 — Account summary](cabinet/STORY-SPA-CAB-02-account-summary-block.md) | M24–M26 | Done — [pipeline story](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-02-account-summary-block/STORY-SPA-CAB-02-account-summary-block.md) (`pkg-000029`, gate 2026-07-12) |
| [CAB-03 — Civic status](cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) | M28 reuse | Done — [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-03-civic-status-in-cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) (`pkg-000033`, gate 2026-07-25) |
| [CAB-04 — Story activity](cabinet/STORY-SPA-CAB-04-story-activity-card.md) | M45 | Done — [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-04-story-activity-card/STORY-SPA-CAB-04-story-activity-card.md) (`pkg-000034`, gate 2026-07-26) |
| [CAB-05 — Wallet](cabinet/STORY-SPA-CAB-05-wallet-status-card.md) | M50 | Done — [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-05-wallet-status-card/STORY-SPA-CAB-05-wallet-status-card.md) (`pkg-000035`, gate 2026-07-26; post-audit T07–T09 closed 2026-07-26T20:35:05Z) |
| [CAB-06 — Contribution](cabinet/STORY-SPA-CAB-06-contribution-layer.md) | M53 | Done — [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-06-contribution-layer/STORY-SPA-CAB-06-contribution-layer.md) (`pkg-000036`, gate 2026-07-28T09:28:43Z) |
| [CAB-07 — Page states](cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) | M22, M23 | Done — [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-07-cabinet-page-states/STORY-SPA-CAB-07-cabinet-page-states.md) (`pkg-000037`, gate 2026-07-28T14:05:08Z) |
| [CAB-08 — Layout · story-activity wire](cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md) | M170+M45 · hide wallet/contrib · `GET /story-activity` | P5 APPLY · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000217` · `activation: none` · Await P8 — [disposition](../run-reports/p5-disposition-STORY-SPA-CAB-08-2026-10-23.md) · [pipeline](../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md) |

## Public Home + Shell

Пакет: [public-home/INDEX.md](public-home/INDEX.md) · [PRODUCT-BRIEF.md](public-home/PRODUCT-BRIEF.md) · [README.md](public-home/README.md) · **Epic:** [EPIC-SPA-09](../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md)

> **Режим:** **PH-10 Done** · **PH-09 Done · P7** · **PH-08 Done · P7 WAVE COMPLETE** (`pkg-000058` · [reaudit](../analysis/reaudit-STORY-SPA-PH-08-gap-closure-2026-08-09.md)). Drafts PH-11 · BUG-04. Admin ADMIN-PH-01…06 Done.

| Admin | Что | Статус |
|-------|-----|--------|
| [ADMIN-PH-01](public-home/ADMIN-PH-01-product-ux-prompts.md) | UX prompts / state matrix | ✅ Done |
| [ADMIN-PH-02](public-home/ADMIN-PH-02-ux-mockup-intake.md) | Mockup specs intake | ✅ Done — M129–M133 + L10N appendix |
| [ADMIN-PH-03](public-home/ADMIN-PH-03-icon-assets-catalog.md) | Icon catalog | ✅ Done — [STORY-SPA-PH-icon-assets.md](public-home/STORY-SPA-PH-icon-assets.md) |
| [ADMIN-PH-04](public-home/ADMIN-PH-04-api-requirements.md) | API requirements | ✅ Done — [STORY-SPA-PH-api-requirements.md](public-home/STORY-SPA-PH-api-requirements.md) |
| [ADMIN-PH-05](public-home/ADMIN-PH-05-backlog-stories-l10n.md) | PH-01…06 + L10N | ✅ Done |
| [ADMIN-PH-06](public-home/ADMIN-PH-06-tech-decomposition.md) | Epic + subtasks | ✅ Done — [EPIC-SPA-09](../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) |

| Story | Surface | Status |
|-------|---------|--------|
| [PH-01 — Header brand/nav](public-home/STORY-SPA-PH-01-header-brand-nav.md) | M129 · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/STORY-SPA-PH-01-header-brand-nav.md) | Done — P3 gate PASS 2026-08-04T07:07:39Z (`pkg-000045`) |
| [PH-02 — Account/logout](public-home/STORY-SPA-PH-02-account-logout-chrome.md) | M130 · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-02-account-logout-chrome/STORY-SPA-PH-02-account-logout-chrome.md) | Done — P3 gate PASS 2026-08-04T09:57:03Z (`pkg-000046`) |
| [PH-03 — Public footer](public-home/STORY-SPA-PH-03-public-footer.md) | M131 · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-03-public-footer/STORY-SPA-PH-03-public-footer.md) | Done — P3 gate PASS 2026-08-04T10:46:36Z (`pkg-000047`) |
| [PH-04 — Board feed home](public-home/STORY-SPA-PH-04-board-feed-home.md) | M132 · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-04-board-feed-home/STORY-SPA-PH-04-board-feed-home.md) | Done — P3 gate PASS 2026-08-04T12:16:21Z (`pkg-000048`) |
| [PH-05 — How it works](public-home/STORY-SPA-PH-05-how-it-works-page.md) | M133 · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-05-how-it-works-page/STORY-SPA-PH-05-how-it-works-page.md) | Done — P3 gate PASS 2026-08-04T13:22:05Z (`pkg-000050`) · P6 post-audit CLOSED 2026-08-05T09:20:08Z |
| [PH-06 — Submit GPT CTA](public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) | env GPT · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/STORY-SPA-PH-06-submit-story-gpt-cta.md) | Done — P3 gate PASS 2026-08-05T10:31:01Z (`pkg-000051`) |
| [PH-07 — Board feed backdrop for chrome evidence](public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) | M132 backdrop · chrome/CTA · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-07-board-feed-backdrop-evidence/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) | Done — P3 gate PASS 2026-08-06T13:45:10Z (`pkg-000052`) |
| [PH-08 — HIW first-class page](public-home/STORY-SPA-PH-08-how-it-works-first-class-page.md) | HIW composition · **`pkg-000058`** · [pipeline](../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/STORY-SPA-PH-08-how-it-works-first-class-page.md) | Done · **P7 WAVE COMPLETE** ([reaudit](../analysis/reaudit-STORY-SPA-PH-08-gap-closure-2026-08-09.md)) |
| [PH-09 — Sidebar display mode](public-home/STORY-SPA-PH-09-public-sidebar-display-mode.md) | `showSidebar` · [pipeline](../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/STORY-SPA-PH-09-public-sidebar-display-mode.md) | Done · **P7 WAVE COMPLETE** ([reaudit](../analysis/reaudit-STORY-SPA-PH-09-gap-closure-2026-08-08.md)) |
| [PH-10 — Header horizontal logo + favicon](public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md) | inbound horizontal + favicon · [pipeline](../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-10-header-horizontal-logo-favicon/STORY-SPA-PH-10-header-horizontal-logo-favicon.md) | Done — **P7 WAVE COMPLETE** ([reaudit](../analysis/reaudit-STORY-SPA-PH-10-gap-closure-2026-08-08.md)) |
| [PH-11 — EmptyState favicon glyph](public-home/STORY-SPA-PH-11-empty-state-favicon-glyph.md) | EmptyState `/favicon.svg` vs tab PNG · draft from PH-10 F3 | Todo · draft · optional PA.3 |
| [PH-14 — How It Works deep redesign](public-home/STORY-SPA-PH-14-how-it-works-deep-redesign.md) | M171 · RU verbatim · no invent ET · CTA leftward | P8 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000218` closed — [disposition](../run-reports/p5-disposition-STORY-SPA-PH-14-2026-10-23.md) |
| [PH-15 — Static pages content](public-home/STORY-SPA-PH-15-static-pages-content.md) | M172 + privacy downloads · no invent legal body · no invent RU/ET download labels | P8 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000219` closed — [disposition](../run-reports/p5-disposition-STORY-SPA-PH-15-2026-10-23.md) |
| [PH-16 — Env CTA Story GPT + Landing FAQ](public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md) | `VITE_STORY_GPT_URL` + `VITE_LANDING_FAQ_URL` · no invent GPT URL | **P8 Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000222` closed — [disposition](../run-reports/p5-disposition-STORY-SPA-PH-16-2026-10-24.md) |
| [PH-17 — Privacy dark icons + Contact story CTA](public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md) | dark Privacy icons · Contact CTA → Story GPT · no invent PASS | **P8** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000223` closed · SHAs `5c9784b`/`b8eb86f`/`5c9c87f` — [disposition](../run-reports/p5-disposition-STORY-SPA-PH-17-2026-10-24.md) |
| [CR-26 — Own React empty/filled harmony](component-reactions/STORY-SPA-CR-26-own-react-empty-harmony.md) | M173 empty+filled rhythm vs Comment · no invent PASS | **P8** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000224` closed · SHAs `4469a57`/`f15f3e0`/`54eb9a0` — [disposition](../run-reports/p5-disposition-STORY-SPA-CR-26-2026-10-24.md) |
| [CR-27 — List own reactions hydrate](component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md) | List Bearer hydrate selected[] · no invent gateway schema | **P1.3** · gate **PENDING** · `pkg-000225` · activation **active** · Await P2 — [pipeline](../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-27-list-own-reactions-hydrate/STORY-SPA-CR-27-list-own-reactions-hydrate.md) |

Execute waves: 1 PH-01→02→03 · 2 PH-04 · 3 PH-05→PH-06 · **4 PH-07 Done** (`pkg-000052`) · **5 PH-10 Done** (`pkg-000056`) · post-audit P6 override. Interview lock unchanged. Wave4 tip **PH-15** P1.3.

## Hardening CTO audit (2026-08)

Пакет: [hardening-cto-audit-2026-08/INDEX.md](hardening-cto-audit-2026-08/INDEX.md) · **Epic:** [EPIC-SPA-10](../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Story | Surface | Status |
|-------|---------|--------|
| [HL-01 — React Router advisory triage](hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md) | npm audit High · HashRouter · **`pkg-000059`** · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/STORY-SPA-HL-01-react-router-advisory-triage.md) | **Done** · **P7 WAVE COMPLETE** ([reaudit](../analysis/reaudit-STORY-SPA-HL-01-gap-closure-2026-08-09.md)) |
| [HL-02 — Prod env-bake gate](hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md) | release ≠ local dist · **`pkg-000060`** · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/STORY-SPA-HL-02-prod-env-bake-gate.md) | **Done** · **P7 WAVE COMPLETE** ([reaudit](../../analysis/reaudit-STORY-SPA-HL-02-gap-closure-2026-08-09.md)) |
| [HL-03 — Handoff return-path tests](hardening-cto-audit-2026-08/STORY-SPA-HL-03-handoff-return-path-tests.md) | `resolveHandoffReturnPath` vitest · **`pkg-000061`** · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/STORY-SPA-HL-03-handoff-return-path-tests.md) | **Done** · P3 · **P4 Ready** ([audit](../../analysis/audit-STORY-SPA-HL-03-execution-2026-08-09.md)) |
| [HL-04 — PROD fail-fast identity URL](hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) | shared `resolveIdentityServiceUrl` · **`pkg-000062`** · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) | **Done** · **P7 WAVE COMPLETE** ([reaudit](../../analysis/reaudit-STORY-SPA-HL-04-gap-closure-2026-08-09.md)) |
| [HL-05 — Orphan ProtectedRouteRedirect](hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md) | overlay SSOT · delete orphan · **`pkg-000063`/`000064`** · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/STORY-SPA-HL-05-orphan-protected-route-redirect.md) | **Done** · **P7 WAVE COMPLETE** |
| [HL-09 — npm prod transitive High triage](hardening-cto-audit-2026-08/STORY-SPA-HL-09-npm-prod-transitive-high-triage.md) | serve / brace-expansion / minimatch High · OOS HL-01 F3 | Todo · **draft** (P5 from HL-01) |
| HL-06…08 | see package INDEX | Todo · tech decomp Ready |

## Early Signal / Pre-Cluster dashboard (ADMIN intake)

Пакет: [early-signal-dashboard/INDEX.md](early-signal-dashboard/INDEX.md) · [PRODUCT-BRIEF.md](early-signal-dashboard/PRODUCT-BRIEF.md) · **REQ-15:** [15-early-signal-pre-cluster-public-dashboard.md](../../requirements/15-early-signal-pre-cluster-public-dashboard.md)

| Key | Surface | Status |
|-----|---------|--------|
| [ADMIN-ESD-01](early-signal-dashboard/ADMIN-ESD-01-product-ux-prompts.md) | UX prompts / state matrix A–E · [UX-PROMPTS.md](early-signal-dashboard/UX-PROMPTS.md) | **Done** |
| [ADMIN-ESD-02](early-signal-dashboard/ADMIN-ESD-02-ux-mockup-intake.md) | Mockup specs intake (files on disk) | Todo |
| [ADMIN-ESD-03](early-signal-dashboard/ADMIN-ESD-03-icon-assets-catalog.md) | Icon catalog · [ES icons](early-signal-dashboard/STORY-SPA-ES-icon-assets.md) | **Done** |
| [ADMIN-ESD-04](early-signal-dashboard/ADMIN-ESD-04-api-requirements.md) | API requirements · [ES api-req](early-signal-dashboard/STORY-SPA-ES-api-requirements.md) | **Done** |
| [ADMIN-ESD-05](early-signal-dashboard/ADMIN-ESD-05-backlog-stories-l10n.md) | ES-01…05 + L10N `earlySignal.*` | **Done** |
| [ADMIN-ESD-06](early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) | ADR + [EPIC-SPA-12](../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md) scaffold | **Done** |

Product stories: [ES-01](early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) **Done** · [ES-02](early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) **Done** · [ES-03](early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) **Done** · [ES-04](early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) **Done** · [ES-05](early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) **Done** · P3 `pkg-000070`. Epic: [EPIC-SPA-12](../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md). Sibling gateway: [REQ-48](../../../doge-complaints-gateway/docs/requirements/48-early-signal-pre-cluster-data-readiness.md).

## Semantic Schema Runtime — board overlay + map (ADMIN intake)

Пакет: [semantic-schema-runtime/INDEX.md](semantic-schema-runtime/INDEX.md) · [PRODUCT-BRIEF.md](semantic-schema-runtime/PRODUCT-BRIEF.md) · **REQ-16:** [16-semantic-schema-spa-compatibility.md](../../requirements/16-semantic-schema-spa-compatibility.md)

> **Режим:** ADMIN queue **6/6 Done** · product **SSR-01/02/03 Done** · Epic [EPIC-SPA-13](../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md)

| Admin | Что | Статус |
|-------|-----|--------|
| [ADMIN-SSR-01](semantic-schema-runtime/ADMIN-SSR-01-product-ux-prompts.md) | UX prompts / artboards SSR-C · SSR-M · [UX-PROMPTS.md](semantic-schema-runtime/UX-PROMPTS.md) | **Done** |
| [ADMIN-SSR-02](semantic-schema-runtime/ADMIN-SSR-02-ux-mockup-intake.md) | Mockup specs intake · [semantic-schema/](../../UX/mockups/semantic-schema/README.md) M141–M142 | **Done** |
| [ADMIN-SSR-03](semantic-schema-runtime/ADMIN-SSR-03-icon-assets-catalog.md) | Icon catalog · [STORY-SPA-SSR-icon-assets.md](semantic-schema-runtime/STORY-SPA-SSR-icon-assets.md) | **Done** |
| [ADMIN-SSR-04](semantic-schema-runtime/ADMIN-SSR-04-api-requirements.md) | API + naming · [STORY-SPA-SSR-api-requirements.md](semantic-schema-runtime/STORY-SPA-SSR-api-requirements.md) | **Done** |
| [ADMIN-SSR-05](semantic-schema-runtime/ADMIN-SSR-05-backlog-stories-l10n.md) | SSR-01…03 + L10N glue `schemaRuntime.*` | **Done** |
| [ADMIN-SSR-06](semantic-schema-runtime/ADMIN-SSR-06-tech-decomposition.md) | [EPIC-SPA-13](../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) scaffold | **Done** |

| Story | Surface | orientation | Status |
|-------|---------|-------------|--------|
| [SSR-01 — Issue public shape consume](semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md) | typedef + repository pass-through | tech_first | **Done** · Wave 0 · P3 2026-09-02T19:37:42Z · `pkg-000074` |
| [SSR-02 — Schema card overlay](semantic-schema-runtime/STORY-SPA-SSR-02-schema-card-overlay.md) | Issue card + detail overlay | ui_first | **Done** · Wave 1 · P3 2026-09-02T20:06:33Z · `pkg-000075` |
| [SSR-03 — Board list \| map toggle](semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md) | `/board` list\|map · [ADR](semantic-schema-runtime/ADR-SSR-03-map-library.md) | ui_first | **Done** · Wave 2–3 · P3 2026-09-02T20:42:09Z · `pkg-000076` |

Execute: P1.3 on [EPIC-SPA-13](../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) (operator). Sibling gateway: [REQ-51](../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md).

## Threads feed UX (REQ-17 shell)

Пакет: [threads-feed/INDEX.md](threads-feed/INDEX.md) · [PRODUCT-BRIEF.md](threads-feed/PRODUCT-BRIEF.md) · **REQ-17:** [17-issue-thread-feed-ux-and-reactions.md](../../requirements/17-issue-thread-feed-ux-and-reactions.md) · **Arch:** [threads-feed-ux](../../architecture/threads-feed-ux/00-overview.md)

> **Режим:** ADMIN queue **6/6 Done** · chrome THR-01…06 **Done** (`pkg-000077`…`082`) · wire **THR-07…09 Done** (`pkg-000083`…`085`) · threads HTTP-06 **Closed** · mockups [M143–M148](../../UX/mockups/threads-feed/README.md) · [api-req](threads-feed/STORY-SPA-THR-api-requirements.md) · [ADMIN-THR-04](threads-feed/ADMIN-THR-04-api-requirements.md)

| Key | File | orientation | Status |
|-----|------|-------------|--------|
| ADMIN-THR-01…06 | [INDEX](threads-feed/INDEX.md) | admin | **Done** |
| [THR-01](threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md) | mounts M143+M148 · [pipeline](../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts/STORY-SPA-THR-01-board-issue-post-mounts.md) | ui_first | **Done** (pkg-000077) |
| [THR-02](threads-feed/STORY-SPA-THR-02-comment-tree-composer-attachments.md) | tree/composer M144 | ui_first | **Done** (pkg-000078) |
| [THR-03](threads-feed/STORY-SPA-THR-03-reactions-v1-picker.md) | reactions.v1 M145 | ui_first | **Done** (pkg-000079) |
| [THR-04](threads-feed/STORY-SPA-THR-04-escalation-stub.md) | invite org M146 | ui_first | **Done** (pkg-000080) |
| [THR-05](threads-feed/STORY-SPA-THR-05-verify-write-gate.md) | verify gate M147 | ui_first | **Done** (pkg-000081) |
| [THR-06](threads-feed/STORY-SPA-THR-06-social-identity-clients-fail-soft.md) | clients fail-soft seam | tech_first | **Done** (pkg-000082) |
| [THR-07](threads-feed/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) | env + knobs/tree wire · [pipeline](../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-07-threads-client-knobs-tree-wire/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) | tech_first | **Done** (pkg-000083 · P3) |
| [THR-08](threads-feed/STORY-SPA-THR-08-comment-write-wire.md) | comment POST + Bearer · [pipeline](../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-08-comment-write-wire/STORY-SPA-THR-08-comment-write-wire.md) | tech_first | **Done** (pkg-000084 · P3) |
| [THR-09](threads-feed/STORY-SPA-THR-09-reactions-attach-wire.md) | react + attach-ref · [pipeline](../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-09-reactions-attach-wire/STORY-SPA-THR-09-reactions-attach-wire.md) | tech_first | **Done** (pkg-000085 · P3) |

Next: OP → **P8** on THR-09 (or Skip P7). OPEN gap-list **empty**. **STOP before P7/P8** this packet.

## REQ9 — `VITE_IDENTITY_BASE_URL` naming

Пакет: [req9-vite-identity-base-url/INDEX.md](req9-vite-identity-base-url/INDEX.md) · **REQ-18:** [18-req9-vite-identity-base-url.md](../../requirements/18-req9-vite-identity-base-url.md) · Parent REQ9 R3

| Key | File | Status | Depends |
|-----|------|--------|---------|
| [REQ9-01](req9-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md) | hard cut → `VITE_IDENTITY_BASE_URL` · [pipeline](../epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md) · **`pkg-000086`** | **Done** · P3 (2026-09-26T12:09:47Z) | — |

Operator locks: Railway checklist **A** · keep `VITE_` · env key only (no symbol rename). Epic: [EPIC-SPA-15](../epics/EPIC-SPA-15-req9-vite-identity-base-url/EPIC-SPA-15-req9-vite-identity-base-url.md).

## REQ10 — threads reaction reload honesty

Пакет: [req10-threads-reaction-reload-honesty/INDEX.md](req10-threads-reaction-reload-honesty/INDEX.md) · **REQ-19:** [19-req10-threads-reaction-reload-honesty.md](../../requirements/19-req10-threads-reaction-reload-honesty.md) · Parent REQ10

| Key | File | Status | Depends |
|-----|------|--------|---------|
| [REQ10-01](req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-01-debug-ingest-cleanup.md) | remove Cursor `7840/ingest` from spa `src` | **Done** · P3 [`pkg-000087`](../spa-active-packages/pkg-000087-20260928-epic-spa-16-req10-01-debug-ingest-cleanup.yaml) · [pipeline](../epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-01-debug-ingest-cleanup/STORY-SPA-REQ10-01-debug-ingest-cleanup.md) · gate PASS | — |
| [REQ10-02](req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-02-reaction-selected-reload.md) | Option A `selected` → pickers (root + comments) | **Done** · P3 [`pkg-000088`](../spa-active-packages/pkg-000088-20260928-epic-spa-16-req10-02-reaction-selected-reload.yaml) · gate PASS | threads [REQ10-05](../../../../doge-threads/docs/tasks/backlog-stories/req10-tree-marks-read-and-contract/STORY-THREADS-REQ10-05-actor-selected-server.md) **Done** |

Operator locks: **Option A** · `selected` thread-root **+** comments · REQ10-01 independent.

## REQ11 — demo life sim board + threads verify

Пакет: [req11-demo-life-sim-board-threads-verify/INDEX.md](req11-demo-life-sim-board-threads-verify/INDEX.md) · **REQ-20:** [20-req11-demo-life-sim-board-threads-verify.md](../../requirements/20-req11-demo-life-sim-board-threads-verify.md) · Parent REQ11

| Key | File | Status | Depends |
|-----|------|--------|---------|
| [REQ11-01](req11-demo-life-sim-board-threads-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md) | verify `#/board` + `#/issue/:id` after replay · anonymous Pass | **BLOCKED** · P3 [`pkg-000089`](../spa-active-packages/pkg-000089-20260929-epic-spa-17-req11-01-board-threads-demo-verify.yaml) · gate BLOCKED | gateway [55](../../../../doge-complaints-gateway/docs/requirements/55-req11-demo-life-sim-fixtures-and-replay.md) + threads [04](../../../../doge-threads/docs/requirements/04-req11-demo-life-sim-threads-reactions-seed.md) incomplete |

Operator locks: **1A** paths `#/board`·`#/issue/:id` · **2A** anonymous Pass.

## REQ-22 — Next shell (feed visual Phase 1 · shell slice)

Пакет: [next-shell/INDEX.md](next-shell/INDEX.md) · [PRODUCT-BRIEF.md](next-shell/PRODUCT-BRIEF.md) · **REQ-22:** [22-feed-visual-redesign-phase-1.md](../../requirements/22-feed-visual-redesign-phase-1.md) §2a shell · Arch [feed-visual-redesign-phase-1](../../architecture/feed-visual-redesign-phase-1/00-overview.md)

> **Режим:** ADMIN intake **6/6 Done** · shell wave **NS-01…06 Done** (`pkg-000097`…`102`) · tip markstack **NS-16** P5 APPLY · `pkg-000221` · gate **BLOCK** · Story **BLOCKED** (OP eye) · `activation: none` · Await P8 · soft NS-15 P8 BLOCKED OP eye · epic [EPIC-SPA-19](../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md) **In Progress** · sibling feed → [next-feed](next-feed/INDEX.md)

| Item | Path | Mode | Status |
|------|------|------|--------|
| ADMIN-NS-01…06 | [INDEX](next-shell/INDEX.md) | admin | **Done** |
| EPIC-SPA-19 | [EPIC-SPA-19-next-shell](../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md) | epic | **In Progress** · tip NS-16 P1.3 |
| [NS-01](next-shell/STORY-SPA-NS-01-next-routes-shell-host.md) | `#/next/feed*` host + placeholder | story | **Done** · P3 `pkg-000097` |
| [NS-02](next-shell/STORY-SPA-NS-02-public-header-next-chrome.md) | PublicHeader next chrome | story | **Done** · P3 `pkg-000098` |
| [NS-03](next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md) | ProfileRail + shelter nav | story | **Done** · P3 `pkg-000099` |
| [NS-04](next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md) | Grid + mobile chrome | story | **Done** · P3 `pkg-000100` |
| [NS-05](next-shell/STORY-SPA-NS-05-classic-shell-apply.md) | D2.3 classic shell | story | **Done** · P3 `pkg-000101` |
| [NS-06](next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md) | `/` flip + shell verify | story | **Done** · P3+P6 `pkg-000102` |
| [NS-15](next-shell/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) | OP light+dark PNG · footer dual | story | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000220` |
| [NS-16](next-shell/STORY-SPA-NS-16-default-theme-light.md) | default theme light when unset | story | P5 APPLY · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000221` · `activation: none` · Await P8 |
| Runtime icons | `spa-app/public/icons/next-shell/<group>/` | promote from icon-system | **on disk** |

## REQ-22 — Next feed (feed visual Phase 1 · content slice · phase 2)

Пакет: [next-feed/INDEX.md](next-feed/INDEX.md) · [PRODUCT-BRIEF.md](next-feed/PRODUCT-BRIEF.md) · **REQ-22:** [22-feed-visual-redesign-phase-1.md](../../requirements/22-feed-visual-redesign-phase-1.md) FR feed/Issue/reactions · Arch [02-features-feed](../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

> **Режим:** ADMIN intake **5/5 Done** · epic [EPIC-SPA-20](../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md) · tip **NF-26** P8 `pkg-000233` · Story **BLOCKED** (OP eye) · `activation: none` · soft NF-25 P8 BLOCKED OP eye · [register](next-feed/NF-feed-mockup-intake-register.md) · [icon catalog](next-feed/STORY-SPA-NF-icon-assets.md) · [API](next-feed/STORY-SPA-NF-api-requirements.md) · runtime `public/icons/next-feed/` **on disk**

| Item | Path | Mode | Status |
|------|------|------|--------|
| ADMIN-NF-01…05 | [INDEX](next-feed/INDEX.md) | admin | **5/5 Done** |
| Epic | [EPIC-SPA-20-next-feed](../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md) | epic | **In Progress** · NF-26 P8 BLOCKED |
| Next | [NF-26](next-feed/STORY-SPA-NF-26-filters-mobile-scroll-lock.md) | story | P8 local close · **BLOCKED** OP eye · `pkg-000233` · SHAs `60878ef`/`e9a07b5`/`09cd217` |
| [NF-01](next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md) | feed list + toolbar | story | **Done** · P3 |
| [NF-02](next-feed/STORY-SPA-NF-02-civic-issue-post.md) | civic issue-as-post | story | **Done** · P3 |
| [NF-03](next-feed/STORY-SPA-NF-03-list-map-toggle.md) | list \| map | story | **Done** · P3 |
| [NF-04](next-feed/STORY-SPA-NF-04-thread-tree-composer.md) | thread + composer | story | **Done** · P3 |
| [NF-05](next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md) | reactions + stub + gate | story | **Done** · P3 |
| [NF-06](next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md) | mounts + verify | story | **Done** · P3 |
| Runtime icons | `spa-app/public/icons/next-feed/<group>/` | promote Done (+ reuse next-shell) | **on disk** (24 SVG) |

## Next feed lab — isolated visual debug (`#/lab/feed`)

Пакет: [next-feed-lab/INDEX.md](next-feed-lab/INDEX.md) · [PRODUCT-BRIEF.md](next-feed-lab/PRODUCT-BRIEF.md) · [interview](../../analysis/zeya888.feed-lab-interview-next-feed-lab-2026-10-13.md) · Related: [next-feed-vl](next-feed-vl/INDEX.md) · [post-VL gaps](../../analysis/analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md)

> **Режим:** LAB-07 P3 structure Done · gate BLOCK `pkg-000133` (`2026-10-13T15:48:00Z`) · EPIC-SPA-22 · OP eye Absent · tip **LAB-08**

| Key | File | Status |
|-----|------|--------|
| LAB-01…10 | [INDEX](next-feed-lab/INDEX.md) · [EPIC-SPA-22](../epics/EPIC-SPA-22-next-feed-lab/EPIC-SPA-22-next-feed-lab.md) | LAB-01–02/06 Done · LAB-03/04/05/07 Blocked · 08–10 Todo |

## REQ-24 — Component reactions mount + `#/lab/reactions` (ADMIN Variant B)

Пакет: [component-reactions/INDEX.md](component-reactions/INDEX.md) · [PRODUCT-BRIEF.md](component-reactions/PRODUCT-BRIEF.md) · **REQ-24:** [24-reactions-mount-lab.md](../../requirements/24-reactions-mount-lab.md) · parent [REQ-22](../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.6 · UX M154/M155/M160 · **data plane reuse** `ThreadsSocialClient` (NF-api §2)

> **Режим:** tip **CR-16** · polish+M155 docs · [mirror](component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [EPIC-23](../epics/EPIC-SPA-23-component-reactions/EPIC-SPA-23-component-reactions.md)

| Key | File | Status |
|-----|------|--------|
| ADMIN-CR-03…06 | [INDEX](component-reactions/INDEX.md) | **Done** |
| CR-01…15 | [INDEX](component-reactions/INDEX.md) | structure Present · visual **BLOCK** · CR-15 P8 |
| CR-16 | [STORY-SPA-CR-16](component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md) | Todo · **tip** · chip hover + media flush |
| CR-17 | [STORY-SPA-CR-17](component-reactions/STORY-SPA-CR-17-reactors-popover.md) | Todo · M155 A ReactorsPopover |
| CR-18 | [STORY-SPA-CR-18](component-reactions/STORY-SPA-CR-18-reactions-dialog.md) | Todo · M155 B ReactionsDialog |
| CR-19 | [STORY-SPA-CR-19](component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md) | Todo · M155 C + lab wire |
| CR-icon Gap v2 | [STORY-SPA-CR-icon-assets](component-reactions/STORY-SPA-CR-icon-assets.md) | open · reactions dual-circle (CR-17 dep) |

## REQ-21 — UI modularity, theme & redesign-prep (Phase 0)

Пакет: [ui-modularity-theme-redesign-prep/INDEX.md](ui-modularity-theme-redesign-prep/INDEX.md) · **REQ-21:** [21-ui-modularity-theme-and-redesign-prep.md](../../requirements/21-ui-modularity-theme-and-redesign-prep.md) · Arch [00-overview](../../architecture/ui-modularity-theme-redesign-prep/00-overview.md)

| Key | File | Status | Depends |
|-----|------|--------|---------|
| [REQ21-01](ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-01-shell-chrome-ownership.md) | layout owns chrome; pages content-only | **Done** · `pkg-000092` | — |
| [REQ21-02](ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-02-css-ownership-board-migrate.md) | migrate board CSS out of `index.css` | **Done** · `pkg-000093` | 01 soft |
| [REQ21-03](ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-03-theme-tokens-data-theme.md) | tokens + `data-theme` | **Done** · `pkg-000094` | G4/G9 Done |
| [REQ21-04](ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-04-theme-toggle-header.md) | ThemeToggle + `dogestonia.theme` | **Done** · `pkg-000095` | **03** |
| [REQ21-05](ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-05-board-features-extract.md) | board → `features/` | **Done** · `pkg-000096` | **01** |

Operator locks: dark default · `dogestonia.theme` · no OS · `#/next` / cutover **Out of package**. Materialized 2026-10-06T19:05:34Z.

## Housekeeping

Пакет: [housekeeping/INDEX.md](housekeeping/INDEX.md)

## Bugs (defect intake)

Пакет: [bugs/INDEX.md](bugs/INDEX.md) · Workflow: [bug-intake-workflow.md](../../../docs/methodology/Zeya888-builder-queue/workflow/bug-intake-workflow.md)

| Story | Status |
|-------|--------|
| [BUG-05 — Railway env-bake × identity localhost fallback](bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) | **In Progress** · P6 `run_mode=spa_bug_05_audit_2026_08_16` · T06 BLOCKED · F1 OPEN · T07/T08 Done · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) · [investigation](../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) |
| [BUG-06 — Dist provenance × `npm start`](bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) | **In Progress** · P6 `pkg-000071` · T01–T05 Done · T06 BLOCKED F1 OPEN · T07/T08 Done · §8.4 PENDING · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) · [investigation](../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) |
| [BUG-07 — start vs preview docs drift](bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) | **Done** · P3 `pkg-000072` · T01–T08 Done · P6 F1–F3 CLOSED · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/STORY-SPA-BUG-07-start-preview-docs-drift.md) |
| [BUG-08 — Vite public-env normalize seam](bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) | **Done** · P3 `pkg-000073` · T01–T07 Done · P6 F1–F2 CLOSED · [pipeline](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-08-vite-public-env-normalize-seam/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) |
| [BUG-04 — Horizontal logo transparent pad](bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md) | Todo · draft (PH-10 audit F4) |

## Закрыто документально (без story)

| Gap | Решение | Где зафиксировано |
|-----|---------|-------------------|
| G5 | Список label keys синхронизирован с `AVAILABLE_LABELS` | [i18n-architecture.md](../../i18n-architecture.md) §7.2 |
| G6 | Флаги ET/RU/US узаконены в MVP | i18n-architecture, mockup-17, mockup-20 |
| G9 *(hist.)* | CTA всегда активная ссылка на GPT | ui-mockups §24.1, mockup-01 — **не** [STORY-SPA-G9 brand palette](design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) |
| G10 | Identity — planned, 0% в коде | [requirements/README-index.md](../../requirements/README-index.md) |
| G11 | Битые ссылки заменены | technical-architecture, mock-layer-issues-guide |

## Логика порядка

1. **G1** — интеграция с gateway; без правильного пути `GFL-DRIVEN` не работает.
2. **G2, G3** — видимые UX-гапы на доске (метки, поиск).
3. **G4, G7** — дизайн-фундамент (токены + шрифты); G7 логично после G4.
4. **G8** — рефакторинг shell; лучше после стабилизации UI-компонентов из G2/G3.
5. **G9 (design-foundation)** — brand Color Palette v1.0 → `tokens.css` поверх G4 (после G4 Done).
6. **G11 (design-foundation)** — token→CSS glue + G9 leftovers F3–F8; желательно до/вместе с G10 Wave 1 (hover/ink). Не путать с hist. G11 (битые ссылки) ниже.
7. **G10** — shared Button system (DS-BTN) + migrate legacy `<button>`; guide в `runtime-docs/`.
