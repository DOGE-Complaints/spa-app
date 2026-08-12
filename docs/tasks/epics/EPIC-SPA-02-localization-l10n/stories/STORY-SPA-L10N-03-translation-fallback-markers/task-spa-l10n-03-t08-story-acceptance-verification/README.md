## Task workspace — `task-spa-l10n-03-t08-story-acceptance-verification`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** T01–T07

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** react-expert  
---

## Task: verify — STORY-SPA-L10N-03 story acceptance gate

### Цель
Пройти все Acceptance Criteria backlog story verbatim; создать `acceptance-verification-spa-l10n-03.md`; закрыть story gate.

### Почему это важно (риск)
Без story gate GL-3 / GL-7(маркер) не закрываются в индексе; pkg-000005 не считается завершённым.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#6 — [`STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md) §Acceptance Criteria.
2. T01–T07 deliverables — domain, resolver, label meta, markers UI, pages, tests, docs.

### Gap / Проблема
Story не verified end-to-end.

### AC/DoD
- [x] (P0) Story AC #1: `original_locale` + MT marker logic verified.
- [x] (P0) Story AC #2: absent/empty `original_locale` — no MT marker, no crash.
- [x] (P0) Story AC #3: content fallback marker visible.
- [x] (P0) Story AC #4: humanize label marker visible.
- [x] (P0) Story AC #5: layout OK; markers not error-styled.
- [x] (P0) Story AC #6: `npx vitest run` green.
- [x] (P0) Артефакт `acceptance-verification-spa-l10n-03.md` в этой task folder — PASS.

### Где менять код
- Этот task folder: `acceptance-verification-spa-l10n-03.md`
- Sync: [`bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md), [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

### Out of scope
- Новый pkg
- Post-audit override

### Проверка
```bash
cd spa-app
npx vitest run
```
