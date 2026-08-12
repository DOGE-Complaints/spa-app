# SPA-DEPLOY-01-T04 — Story GPT URL wiring tests

**Status:** Done  
**Closed:** 2026-07-06T13:53:57Z  

**Story:** [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) §Scope C — AC #3  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-06T13:39:53Z

## Purpose
Закрыть Scope **C** + AC **#3**: Vitest-покрытие, что веб-кнопки «создать историю» / GPT entry используют `VITE_STORY_GPT_URL` из env.

## Risk
`VITE_STORY_GPT_URL` задокументирован, но не проверен в тестах → регрессия href на `#` или пустую строку.

## Code Facts (re-verify at execute)
- [`StorySubmitPage.jsx:29`](../../../../../../../../src/pages/StorySubmitPage.jsx) — `STORY_GPT_URL = import.meta.env.VITE_STORY_GPT_URL`.
- [`StorySubmitPage.jsx:167`](../../../../../../../../src/pages/StorySubmitPage.jsx) — `openGptUrl = STORY_GPT_URL || '#'` (EMPTY/EXPIRED CTA).
- [`StorySubmitPage.jsx:260-261`](../../../../../../../../src/pages/StorySubmitPage.jsx) — `submitAnother` → `window.location.assign(STORY_GPT_URL)`.
- [`StorySubmitPage.test.jsx`](../../../../../../../../src/pages/__tests__/StorySubmitPage.test.jsx) — на scaffold нет assert на GPT URL.

## AC / DoD
- [x] (P0) AC #3: Vitest — при `vi.stubEnv('VITE_STORY_GPT_URL', 'https://chatgpt.com/g/...')` EMPTY state CTA `href` / link указывает на GPT URL.
- [x] (P0) EXPIRED `createNew` link и SUBMITTED `submitAnother` используют тот же URL (или `assign` mock).
- [x] (P1) `npm run test:run -- StorySubmitPage` green.

## Where to change
- [`spa-app/src/pages/__tests__/StorySubmitPage.test.jsx`](../../../../../../../../src/pages/__tests__/StorySubmitPage.test.jsx)

## Out of scope
- `.env.example` content (T02). Railway deploy live (T06). Новые UI-маршруты.

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/StorySubmitPage.test.jsx
```
