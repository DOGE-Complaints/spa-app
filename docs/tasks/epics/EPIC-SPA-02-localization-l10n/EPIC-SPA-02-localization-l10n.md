# EPIC-SPA-02 — Localization (L10N)

> **ID:** `EPIC-SPA-02` · **Статус:** Done (L10N track closed 2026-06-16)
> **Layer:** spa-app i18n / localization — locale registry, labels, content l10n
> **Зависит от:** —
> **Блокирует:** L10N-02..04; закрытие GL-1/GL-6 (L10N-01)

---

## 1. Назначение

Единый реестр локалей и последующие волны локализации UI (метки, контент, телеметрия) по backlog [localization/README.md](../../backlog-stories/localization/README.md).

Парадигма-якорь: [localization-target-and-gap-analysis-2026-06-15.md](../../../analysis/localization-target-and-gap-analysis-2026-06-15.md); [localization-architecture-cto-interview-2026-06-15.md](../../../analysis/localization-architecture-cto-interview-2026-06-15.md) (D7, D8). Бэк-мост: [backend-l10n-integration-bridge-2026-06-16.md](../../../analysis/backend-l10n-integration-bridge-2026-06-16.md).

---

## 2. Pipeline stories (nested)

| Story | Source | Status | Pkg |
|-------|--------|--------|-----|
| [STORY-SPA-L10N-01-locale-registry-foundation](./stories/STORY-SPA-L10N-01-locale-registry-foundation/STORY-SPA-L10N-01-locale-registry-foundation.md) | [backlog L10N-01](../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md) | Done | pkg-000003 |
| [STORY-SPA-L10N-02-dynamic-label-filter](./stories/STORY-SPA-L10N-02-dynamic-label-filter/STORY-SPA-L10N-02-dynamic-label-filter.md) | [backlog L10N-02](../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md) | Done | pkg-000004 |
| [STORY-SPA-L10N-03-translation-fallback-markers](./stories/STORY-SPA-L10N-03-translation-fallback-markers/STORY-SPA-L10N-03-translation-fallback-markers.md) | [backlog L10N-03](../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md) | Done | pkg-000005 |
| [STORY-SPA-L10N-04-untranslated-label-telemetry](./stories/STORY-SPA-L10N-04-untranslated-label-telemetry/STORY-SPA-L10N-04-untranslated-label-telemetry.md) | [backlog L10N-04](../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) | Done | pkg-000006 |

---

## 3. Вне scope эпика

- Gateway REQ-BE (GW-L10N — Done на бэке)
- Doc-gap G3–G8 (отдельные P1.3 волны)
- Фактическое добавление 4-го языка в production (только N-готовность структуры в L10N-01)
