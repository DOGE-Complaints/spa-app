## Task workspace — `task-spa-id-01-t03-login-route-page-shell`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- UX Brief: [`../STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)
- Decision Ref: [mockup-121](../../../../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md); [06-login-page.md](../../../../../../../requirements/06-login-page.md)
- **Depends on:** T01 Todo
- **ui_scope:** `visual` · **ui_anchor:** true

---
**Приоритет:** P0  
**Сложность:** L  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — `/login` route, LoginPage shell, state machine A–F layout

### Цель
Добавить route `/login` в [`App.jsx`](../../../../../../../../src/App.jsx); `LoginPage` с state machine shell и M121 layout/tokens; `data-auth-state` selectors для states A–F (flows — T04–T06).

### Почему это важно (риск)
Без route-level shell нет автономного auth экрана (Story AC #5); UI anchor для P3 @mockup M121.

### Факты из кода (Code Facts / SSOT)
1. [`App.jsx`](../../../../../../../../src/App.jsx) — routes `/`, `/board`, `/issue/:id` only; **нет `/login`**.
2. M121: route `/login`; states A Login · B Signup · C Magic Link · D Forgot · E Error · F Success.
3. [06-login-page.md](../../../../../../../requirements/06-login-page.md) — Planned.
4. Design tokens — reuse existing CSS vars from board shell where applicable.

### Gap / Проблема
Auth page и routing отсутствуют; нет visual container для auth states.

### AC/DoD
- [ ] (P0) HashRouter route `/#/login` → `LoginPage`.
- [ ] (P0) State machine enum + `data-auth-state` attribute per M121 states A–F.
- [ ] (P0) Layout shell per M121: centered card, logo slot, tab/login-signup toggle placeholders.
- [ ] (P0) Story AC #5: no story-draft/GPT chrome on page.
- [ ] (P1) `ui-mockup-spec.md` in this task folder (UI-1 baseline from M121).
- [ ] (P1) Placeholder transitions between states (wire only; logic in T04–T06).

### Где менять код
- [`src/App.jsx`](../../../../../../../../src/App.jsx)
- `src/pages/LoginPage.jsx` (new)
- `src/pages/LoginPage.css` (new)
- `src/auth/authPageState.js` (new — state enum/helpers)
- `ui-mockup-spec.md` (this task folder)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Supabase auth calls (T04/T05). Error mapping logic (T06).

### Проверка
```bash
cd spa-app
npm run dev
# open http://localhost:5173/#/login — shell renders states A–F via dev toggle or query
```
