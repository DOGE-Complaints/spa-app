# cabinet/ — User Cabinet (EPIC-SPA-07)

> **Эпик:** [EPIC-SPA-07-user-cabinet](../../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md)  
> **Roadmap:** [UserprofileRoadmap.md](UserprofileRoadmap.md) — operational progress tracker  
> **Источник:** [mvp-integration-plan M-4](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md)  
> **UX SSOT:** [`docs/UX/mockups/user profile/`](../../../UX/mockups/user%20profile/)

## Stories (MVP)

| Key | File | Wave |
|-----|------|------|
| CAB-01 | [STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) | 1 |
| CAB-02 | [STORY-SPA-CAB-02-account-summary-block.md](STORY-SPA-CAB-02-account-summary-block.md) | 2 |
| CAB-03 | [STORY-SPA-CAB-03-civic-status-in-cabinet.md](STORY-SPA-CAB-03-civic-status-in-cabinet.md) | 2 |
| CAB-04 | [STORY-SPA-CAB-04-story-activity-card.md](STORY-SPA-CAB-04-story-activity-card.md) | 3 |
| CAB-05 | [STORY-SPA-CAB-05-wallet-status-card.md](STORY-SPA-CAB-05-wallet-status-card.md) | 3 |
| CAB-06 | [STORY-SPA-CAB-06-contribution-layer.md](STORY-SPA-CAB-06-contribution-layer.md) | 3 |
| CAB-07 | [STORY-SPA-CAB-07-cabinet-page-states.md](STORY-SPA-CAB-07-cabinet-page-states.md) | 4 |

## Legacy

- [STORY-SPA-CAB-01-profile-from-me.md](STORY-SPA-CAB-01-profile-from-me.md) — superseded by **CAB-02** (2026-07-08)

## L10N policy

- **SSOT переводов:** §«Тексты и переводы» в каждой CAB-стори (образец: [STORY-SPA-ID-11](../identity-auth/STORY-SPA-ID-11-per-country-phone-format-validation.md)).
- **Канон EN:** мокапы [`user profile/`](../../../UX/mockups/user%20profile/) (M21–M26, M45, M50, M53, M99, M22, M23); при расхождении story vs mockup — **mockup wins**.
- **Реализация в коде:** [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) (`cabinet.*`) + `CABINET_FLAT_KEYS`; гид — [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md).
- **DoD каждой CAB:** строки через `t()`; et/ru/en; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет; vitest parity зелёный.

### Общие ключи пакета (`cabinet.common.*`)

Определены в [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md); reuse во всех стори:

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.common.notAvailable` | Not Available | Pole saadaval | Недоступно |
| `cabinet.common.comingLater` | Coming Later | Tulekul | Скоро |
| `cabinet.common.retry` | Retry | Proovi uuesti | Повторить |
| `cabinet.common.codeLabel` | Code: {code} | Kood: {code} | Код: {code} |
| `cabinet.common.discardDraft` | Discard Draft | Loobu mustandist | Отменить черновик |

**Не локализуются:** error codes (`PROFILE_LOAD_FAILED`), story/receipt IDs, masked email, даты, truncated wallet address.

### Reuse matrix (не дублировать)

| Потребность | Ключ | Источник |
|-------------|------|----------|
| Verify Account CTA | `civic.unverified.cta` | ID-03 |
| Civic copy/states | `civic.unverified.*`, `civic.verified.*`, `civic.label.*` | ID-03 |
| Go to Board | `storyHandoff.cta.goToBoard` | ID-12 |
| Back to Board | `storyHandoff.cta.backToBoard` | ID-12 |

## Icon assets

- **Каталог (SSOT):** [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md) — MVP mockups M21–M26, M45, M50, M53, M99, M22, M23; промпты для генерации.
- **Загрузка PNG:** [`public/icons/user-cabinet/`](../../../../public/icons/user-cabinet/) → runtime `/icons/user-cabinet/ic-*.png`
- **Reuse:** часть иконок из [`public/icons/story-handoff/`](../../../../public/icons/story-handoff/) — см. appendix в каталоге.

## Post-MVP (не в backlog stories)

| Ref | Причина |
|-----|---------|
| M110 Story Submission Workspace | In-cabinet compose; GPT handoff = ID-12 |
| M45 `Submit First Story`, M53 A1 `Submit Story` | Создание истории не из кабинета |

### Post-MVP L10N (ключи зарезервированы, не в MVP AC)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.story.empty.submitFirst` | Submit First Story | Esita esimene lugu | Отправить первую историю |
| `cabinet.contrib.receipts.submitStory` | Submit Story | Esita lugu | Отправить историю |
