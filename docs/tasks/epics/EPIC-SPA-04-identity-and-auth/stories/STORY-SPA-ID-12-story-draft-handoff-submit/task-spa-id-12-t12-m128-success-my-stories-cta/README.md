## Task workspace — `task-spa-id-12-t12-m128-success-my-stories-cta`

- Story: [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-12-execution-2026-07-05.md`](../../../../../../analysis/audit-STORY-SPA-ID-12-execution-2026-07-05.md) §2 F2; [mockup-128-story-draft-handoff-submit-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) §State F
- **Depends on:** SPA-ID-12-T01..T10 Done (pkg-000026); T11 optional parallel
- **activation:** `run_mode=spa_id_12_audit_2026_07_05`
- **ui_scope:** `extends` (M128 State F; anchor T08)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-07-05T10:05:40Z
**Wave:** `run_mode=spa_id_12_audit_2026_07_05` (post-audit; **не** pkg-000026)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T10:00:56Z  
---

## Task: fix — M128 State F «My Stories» CTA (render path)

### Цель
Закрыть audit F2 (render path, оператор): добавить третью кнопку State F с `t('storyHandoff.cta.myStories')` per M128 §State F (Go To Board / **My Stories** / Submit Another). Ключ уже в словаре — **не** удалять.

### Почему это важно (риск)
`StoryHandoffSuccessPanel` рендерит только `goToBoard` + `submitAnother`; `storyHandoff.cta.myStories` заведён в EN/ET/RU + `IDENTITY_FLAT_KEYS`, но **не используется** — orphan i18n + визуальный drift от M128.

### Факты из кода (Code Facts / SSOT)
1. Ключ `storyHandoff.cta.myStories` в EN/ET/RU + `IDENTITY_FLAT_KEYS` — [`identityDictionary.js:425,925,1424,1771`](../../../../../../../../src/i18n/identityDictionary.js) — **не используется** в JSX.
2. `StoryHandoffSuccessPanel` — только `goToBoard` + `submitAnother` — [`StoryHandoffPanels.jsx:179-196`](../../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx#L179).
3. `onGoToBoard` → `navigate('/board')` — [`StorySubmitPage.jsx:257`](../../../../../../../../src/pages/StorySubmitPage.jsx#L257).
4. `/my-stories` в [`App.jsx`](../../../../../../../../src/App.jsx) **отсутствует** — dedicated screen out of MVP.
5. M128 State F — три CTA: Go To Board (primary) → My Stories → Submit Another.

### Gap / Проблема
Post-audit Low: нет CTA «My Stories» на success panel; мёртвый i18n-ключ.

### AC/DoD
- [x] (P0) **Render path:** добавить кнопку с `t('storyHandoff.cta.myStories')`, `data-testid="story-handoff-my-stories"`.
- [x] (P0) Проп `onMyStories` из `StorySubmitPage`; навигация `navigate('/board')` (interim MVP до dedicated `/my-stories`).
- [x] (P0) Порядок CTA per M128: Go To Board (primary) → My Stories → Submit Another.
- [x] (P1) Vitest: success panel — кнопка visible + click вызывает `onMyStories`.
- [x] (P1) UI-3 partial: обновить `f-submitted-m128-1536x1024.png` в T08 `ui-baseline/post-implement/`.
- [x] (P1) `npm run test:run` green.
- [x] (P1) **Не** удалять `storyHandoff.cta.myStories` из словаря; **не** менять `pkg-000026`, `spa-active-package.current.yaml`, story Status Done.

### Где менять код
- [`src/components/StoryHandoff/StoryHandoffPanels.jsx`](../../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) — `StoryHandoffSuccessPanel`
- [`src/pages/StorySubmitPage.jsx`](../../../../../../../../src/pages/StorySubmitPage.jsx) — wire `onMyStories`
- [`src/pages/__tests__/StorySubmitPage.test.jsx`](../../../../../../../../src/pages/__tests__/StorySubmitPage.test.jsx)
- Anchor UI: [`task-spa-id-12-t08-.../ui-baseline/post-implement/f-submitted-m128-1536x1024.png`](../task-spa-id-12-t08-ui-anchor-m128-icons/ui-baseline/post-implement/)

### Out of scope
- Dedicated route `/my-stories` (отдельная story). Delete path для `myStories` key. F3 `verify_url`. T11 icons.

### Verification
Gate: [acceptance-verification-spa-id-12-t12.md](./acceptance-verification-spa-id-12-t12.md)

```bash
cd spa-app && npm run test:run -- src/pages/__tests__/StorySubmitPage.test.jsx
cd spa-app && npm run test:ui:story-handoff-m128
```
