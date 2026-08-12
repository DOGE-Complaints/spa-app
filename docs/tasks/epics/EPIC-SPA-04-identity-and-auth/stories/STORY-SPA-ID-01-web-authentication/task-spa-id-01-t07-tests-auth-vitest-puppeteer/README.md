## Task workspace — `task-spa-id-01-t07-tests-auth-vitest-puppeteer`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- UX Brief: [`../STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)
- **Depends on:** T01–T06 Todo
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — Vitest auth unit tests + Puppeteer login smoke

### Цель
Vitest: supabase mock, error mapping, redirect logic. Puppeteer `test:ui:auth-login` smoke for states A, C, E selectors on `/#/login`.

### Почему это важно (риск)
Regression guard for all 5 story AC; puppeteer gate for visual story.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#5 — [`STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md).
2. UX brief selectors: `data-auth-state`, `data-testid="auth-*"`.
3. Precedent: [`tests/puppeteer/filters-and-query-state-smoke.mjs`](../../../../../../../../tests/puppeteer/filters-and-query-state-smoke.mjs).
4. T01–T06 deliver auth modules + LoginPage.

### Gap / Проблема
No auth test suite; no puppeteer script for login route.

### AC/DoD
- [ ] (P0) Vitest suite covers: session hook, identityService mock, mapAuthError all 5 codes, redirect helper.
- [ ] (P0) `tests/puppeteer/auth-login-smoke.mjs` — navigates `/#/login`; asserts states A/C/E via `data-auth-state`.
- [ ] (P0) `package.json` script `test:ui:auth-login`.
- [ ] (P1) Integration test: mock supabase login → fetchMe mock → redirect path.
- [ ] (P1) Full `npx vitest run` in spa-app — green with new tests.

### Где менять код
- `src/auth/__tests__/` (consolidate/extend)
- `tests/puppeteer/auth-login-smoke.mjs` (new)
- [`package.json`](../../../../../../../../package.json) — `test:ui:auth-login`

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Story gate artifact (T08).

### Проверка
```bash
cd spa-app
npx vitest run
npm run test:ui:auth-login
```
