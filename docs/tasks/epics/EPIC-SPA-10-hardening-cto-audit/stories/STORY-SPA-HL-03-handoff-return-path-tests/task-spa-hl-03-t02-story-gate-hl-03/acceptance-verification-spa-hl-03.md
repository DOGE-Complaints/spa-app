# Story acceptance gate — STORY-SPA-HL-03-handoff-return-path-tests

- **Story:** Handoff return-path automated tests
- **Package:** `pkg-000061-20260809-epic-spa-10-hl-03-handoff-return-path.yaml`
- **Result:** PASS
- **Date:** 2026-08-09T13:08:31Z
- **Scaffolded:** 2026-08-09T12:56:53Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Dedicated tests существуют и зелёные | PASS | [`storyHandoffFlowState.test.js`](../../../../../../../src/auth/__tests__/storyHandoffFlowState.test.js) · `npx vitest run …` 9/9 · 2026-08-09T13:05:32Z / reconfirm 13:08:31Z |
| Опасные candidates стабильно режутся в тестах | PASS | cases `//evil…`, `https://evil…`, `board` (non-`/`) → `/board` |
| Handoff happy `next=/story/submit?draft_id=…` остаётся разрешённым | PASS | case `path with draft_id query` → same path |

## FR checklist

| FR | Status | Evidence |
|----|--------|----------|
| FR-HL-03.1 helper cases (valid / query / empty / `//` / absolute) | PASS | T01 table-driven 9 cases |
| FR-HL-03.2 in `verify:security` / `vitest run` | PASS | file under `src/auth/__tests__/` · [`package.json`](../../../../../../../package.json) `verify:security` = `vitest run && …` · no manual-only runner |
| FR-HL-03.3 S5 re-audit note | PASS | Criterion S5 can be re-scored **Pass** on re-audit with this gate + T01 evidence |

## Commands

```bash
npx vitest run src/auth/__tests__/storyHandoffFlowState.test.js
# Test Files 1 passed · Tests 9 passed (2026-08-09T13:08:31Z)
```

Helper / Login product code unchanged (`git diff` empty for `storyHandoffFlowState.js` / `LoginPage.jsx`).
