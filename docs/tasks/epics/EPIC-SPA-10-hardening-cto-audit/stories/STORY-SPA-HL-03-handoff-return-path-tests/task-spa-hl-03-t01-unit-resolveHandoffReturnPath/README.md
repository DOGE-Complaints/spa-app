# SPA-HL-03-T01 — Unit tests for resolveHandoffReturnPath

**Status:** Done — P3 PASS 2026-08-09T13:05:32Z  
**Story:** [`../STORY-SPA-HL-03-handoff-return-path-tests.md`](../STORY-SPA-HL-03-handoff-return-path-tests.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-03-handoff-return-path-tests.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-03-handoff-return-path-tests.md) §FR-HL-03.1 · audit §F2  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T12:56:53Z  
**Package:** `pkg-000061`

## Purpose

Закрыть FR-HL-03.1 / AC: table-driven vitest на `resolveHandoffReturnPath` — safe paths pass; `//` и non-`/` → `/board`; happy handoff `draft_id` query preserved. File must be picked by default `vitest run` / `verify:security` (FR-HL-03.2).

## Risk

Open-redirect regression silent without dedicated tests.

## Code Facts (As-of-Done)

1. [`storyHandoffFlowState.js`](../../../../../../../src/auth/storyHandoffFlowState.js) L75–84: helper unchanged (read-only).
2. New [`storyHandoffFlowState.test.js`](../../../../../../../src/auth/__tests__/storyHandoffFlowState.test.js) — 9 cases green.
3. [`package.json`](../../../../../../../package.json): `verify:security` = `vitest run && …` — file under `src/auth/__tests__/` included automatically.
4. [`LoginPage.jsx`](../../../../../../../src/pages/LoginPage.jsx) L39–41 — unchanged.

## Gap

High F2 — untested return-path helper → **CLOSED** (this task).

## AC / DoD

- [x] (P0) New `src/auth/__tests__/storyHandoffFlowState.test.js` exists and is green under `npx vitest run src/auth/__tests__/storyHandoffFlowState.test.js`.
- [x] (P0) Cases covered (FR-HL-03.1): valid internal path; path with query `/story/submit?draft_id=…`; empty/absent → `/board`; `//…` → `/board`; absolute URL / non-`/` → `/board`.
- [x] (P0) AC: dangerous candidates cut; happy `next=/story/submit?draft_id=…` allowed.
- [x] (P0) No product allowlist / Login UX change (helper read-only).

## Where to change

- `src/auth/__tests__/storyHandoffFlowState.test.js` (**new**)
- [`storyHandoffFlowState.js`](../../../../../../../src/auth/storyHandoffFlowState.js) — read-only

## Out of scope

Product redirect UX; Puppeteer full handoff; OAuth GPT bridge (HL-08); allowlist rule change.

## Verification

```bash
npx vitest run src/auth/__tests__/storyHandoffFlowState.test.js
# 2026-08-09T13:05:32Z — Test Files 1 passed · Tests 9 passed
```
