# EPIC-SPA-07 — User Cabinet (spa-app)

> **ID:** `EPIC-SPA-07` · **Статус:** Done (CAB-01…07 Done; `pkg-000037` gate 2026-07-28T14:05:08Z)
> **Тип:** Product / UX
> **source:** [`../../backlog-stories/cabinet/README.md`](../../backlog-stories/cabinet/README.md)
> **Источник:** [`mvp-integration-plan-2026-07-02.md`](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) §M-4
> **Roadmap SSOT:** [`../../backlog-stories/cabinet/UserprofileRoadmap.md`](../../backlog-stories/cabinet/UserprofileRoadmap.md)

---

## Назначение

Реализовать **User Cabinet** на `/profile` — civic control center (не social profile): account summary, civic verification, story activity, wallet, contribution layer. Мокапы: [`docs/UX/mockups/user profile/`](../../../UX/mockups/user%20profile/).

**Маршрут:** `/profile` = кабинет (M21/M99). `/dashboard` **не трогаем** (уже `CivicStatusCard` + `/me`).

## Контекст (verified)

- `/profile` сегодня — `ProtectedPlaceholder` ([`AppShellLayout.jsx:12-18`](../../../src/layout/AppShellLayout.jsx)).
- `GET /me`: `display_name`, `role`, `phone_verified*`; **без** `email`, `created_at`, story counts ([`me_response.py`](../../../../../doge-identity-service/src/core/api/me_response.py)).
- `CivicStatusCard` — Done ([ID-03](../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md)).

## Post-MVP (только story submit)

- M110 Story Submission Workspace
- M45 State B `Submit First Story`, M53 A1 `Submit Story` — создание истории **не** из кабинета

## Состав

| Story | Тема | Wave | Mockups |
|-------|------|------|---------|
| [CAB-01 pipeline](stories/STORY-SPA-CAB-01-profile-cabinet-shell-assembly/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) | Shell & assembly | 1 | M21, M99 · `pkg-000030` Done 2026-07-25 |
| [CAB-02 pipeline](stories/STORY-SPA-CAB-02-account-summary-block/STORY-SPA-CAB-02-account-summary-block.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) | Account Summary | 2 | M24–M26 · `pkg-000029` |
| [CAB-03 pipeline](stories/STORY-SPA-CAB-03-civic-status-in-cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) | Civic Status placement | 2 | M28 reuse · `pkg-000033` Done |
| [CAB-05 pipeline](stories/STORY-SPA-CAB-05-wallet-status-card/STORY-SPA-CAB-05-wallet-status-card.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) | Wallet M50 stub | 3 | M50 A/B/C · `pkg-000035` Done 2026-07-26 |
| [CAB-06 pipeline](stories/STORY-SPA-CAB-06-contribution-layer/STORY-SPA-CAB-06-contribution-layer.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) | Contribution M53 UI stub | 3 | M53, M23 · `pkg-000036` Done 2026-07-28 |
| [CAB-04 pipeline](stories/STORY-SPA-CAB-04-story-activity-card/STORY-SPA-CAB-04-story-activity-card.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) | Story Activity | 3 | M45, M23 §Story · `pkg-000034` Done 2026-07-26 |
| [CAB-07 pipeline](stories/STORY-SPA-CAB-07-cabinet-page-states/STORY-SPA-CAB-07-cabinet-page-states.md) · [backlog](../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) | New user + load error | 4 | M23, M22 · `pkg-000037` Done 2026-07-28 |

## Порядок волн

```
Wave 1: CAB-01 Shell
Wave 2: CAB-02 + CAB-03 (parallel)
Wave 3: CAB-05 + CAB-06 + CAB-04 (parallel; CAB-04 after civic for verify-required)
Wave 4: CAB-07 integration gate
```

## Cross-epic references

| Epic / Story | Relation |
|--------------|----------|
| [EPIC-SPA-04](../EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md) | ID-02 session shell, ID-03 civic card, ID-04 `/verify`, ID-12 draft resume |
| [mvp-integration-plan M-4](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) | Gap `/profile` placeholder |

## Локализация (L10N)

- **SSOT переводов:** §«Тексты и переводы» в каждой CAB-стори + [cabinet/README.md](../../backlog-stories/cabinet/README.md) §L10N policy.
- **Код:** [`cabinetDictionary.js`](../../../src/i18n/cabinetDictionary.js) при реализации соответствующей CAB (не отдельный retrofit-эпик).
- **Reuse:** civic/storyHandoff ключи из EPIC-SPA-04 — см. reuse matrix в README.

## Вне scope эпика

- Иконки/ассеты, mobile layout
- Изменение `/dashboard`
- M110 и Submit-from-cabinet CTAs (post-MVP)
