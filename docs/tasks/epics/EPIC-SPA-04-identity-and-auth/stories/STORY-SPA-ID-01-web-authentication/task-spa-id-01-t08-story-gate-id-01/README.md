## Task workspace — `task-spa-id-01-t08-story-gate-id-01`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: [`story-acceptance-gate-template.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- **Depends on:** T01–T07 Todo
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-ID-01)

### Цель
Проверить все 5 AC story; создать `acceptance-verification-spa-id-01.md`; обновить pipeline story + bullrun + backlog INDEX → Done; EPIC §2 row.

### Почему это важно (риск)
Без gate нельзя закрыть pkg-000013 и продолжить Wave 1 (ID-02).

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#5 — [`STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md).
2. Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).
3. Puppeteer: `npm run test:ui:auth-login` (T07).
4. Out of scope verbatim: story-draft/GPT (ID-06/08), phone verify (ID-04), OAuth (ID-08).

### Gap / Проблема
Story not verified end-to-end.

### AC/DoD
- [ ] (P0) All Story AC #1–#5 — PASS with evidence paths.
- [ ] (P0) Out-of-scope items documented (no phone at signup, no GPT chrome, no OAuth).
- [ ] (P0) `npx vitest run` in `spa-app` — green.
- [ ] (P0) Artifact `acceptance-verification-spa-id-01.md` in this task folder.
- [ ] (P0) Pipeline story Status → Done; bullrun STORY + T01–T08 → Done; backlog INDEX ID-01 → Done with pipeline link.
- [ ] (P0) `python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify` — PASS.
- [ ] (P1) §UI verification: M121 states checklist; `npm run test:ui:auth-login` — PASS or documented waiver.

### Где менять код
- This task: `acceptance-verification-spa-id-01.md`
- [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md) — Status
- [`../../../../../../bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md)
- [`../../../../../../backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).

### Проверка
```bash
cd spa-app
npx vitest run
npm run test:ui:auth-login
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
