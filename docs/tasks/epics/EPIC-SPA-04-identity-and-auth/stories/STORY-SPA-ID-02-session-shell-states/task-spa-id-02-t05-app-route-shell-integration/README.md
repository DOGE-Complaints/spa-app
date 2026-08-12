# SPA-ID-02-T05 — App route shell integration

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** backlog «Routes / API» + «Анонимный просмотр»; [`App.jsx`](../../../../../../../../src/App.jsx) current routes  
**Depends on:** T01–T04  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`

## Purpose
Wire `AppShell` + session overlay orchestration in [`App.jsx`](../../../../../../../../src/App.jsx): public vs protected routes; anonymous `/board` and `/issue/:id` when logged out.

## Risk
Over-guarding board breaks FR-02.2; under-guarding protected routes leaks cabinet/actions.

## Code Facts (re-verify at execute)
- [`App.jsx`](../../../../../../../../src/App.jsx) — routes: `/`, `/login`, `/board`, `/issue/:id` only.
- Backlog lists `/issues` — code uses `/issue/:id`; classify **public** by actual paths.
- Future protected: `/profile`, `/story/compose`, `/verify` — stub routes or guard hook OK if pages absent.
- [`main.jsx`](../../../../../../../../src/main.jsx) — `AuthSessionProvider` already wraps app.

## AC / DoD
- [ ] AppShell wraps routed content globally (story AC #2).
- [ ] Public routes (`/board`, `/issue/:id`, `/login`) render without forced logged-out overlay (FR-02.2).
- [ ] Protected routes show State B when no session (FR-02.2 guard).
- [ ] Session resolver drives overlay for restoring / expired / backend / network on protected paths and post-auth flows.
- [ ] Route classification documented in task-completion for future routes from backlog list.

## Where to change
- [`spa-app/src/App.jsx`](../../../../../../../../src/App.jsx)
- New: `spa-app/src/router/sessionRoutePolicy.js` (public vs protected path lists)
- Optional stub routes for `/profile`, `/verify`, `/story/compose`

## Out of scope
- Full Profile/Verify/Compose pages (later ID stories). BoardPage shell refactor to slot into AppShell — minimal integration only.

## Verification
```bash
cd spa-app && npm run dev
# logged out: /#/board loads board content; protected stub shows State B
# restoring: skeleton overlay on first load
cd spa-app && npm run test:run -- src/router/sessionRoutePolicy.test.js
```
