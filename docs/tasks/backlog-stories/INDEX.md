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

Execute waves: 1 PH-01→02→03 · 2 PH-04 · 3 PH-05→PH-06 · **4 PH-07 Done** (`pkg-000052`) · **5 PH-10 Done** (`pkg-000056`) · post-audit P6 override. Interview lock unchanged.

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
| [ADMIN-ESD-02](early-signal-dashboard/ADMIN-ESD-02-ux-mockup-intake.md) | Mockup specs intake | Todo |
| [ADMIN-ESD-03](early-signal-dashboard/ADMIN-ESD-03-icon-assets-catalog.md) | Icon catalog | Todo |
| [ADMIN-ESD-04](early-signal-dashboard/ADMIN-ESD-04-api-requirements.md) | API requirements (no invent paths) | Todo |
| [ADMIN-ESD-05](early-signal-dashboard/ADMIN-ESD-05-backlog-stories-l10n.md) | ES-01…05 + L10N (later) | Todo |
| [ADMIN-ESD-06](early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md) | Epic + subtasks plan (later) | Todo |

Product stories: none yet (appear after ADMIN-ESD-05). Sibling gateway: [REQ-48](../../../doge-complaints-gateway/docs/requirements/48-early-signal-pre-cluster-data-readiness.md).

## Housekeeping

Пакет: [housekeeping/INDEX.md](housekeeping/INDEX.md)

## Bugs (defect intake)

Пакет: [bugs/INDEX.md](bugs/INDEX.md) · Workflow: [bug-intake-workflow.md](../../../docs/methodology/Zeya888-builder-queue/workflow/bug-intake-workflow.md)

| Story | Status |
|-------|--------|
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
