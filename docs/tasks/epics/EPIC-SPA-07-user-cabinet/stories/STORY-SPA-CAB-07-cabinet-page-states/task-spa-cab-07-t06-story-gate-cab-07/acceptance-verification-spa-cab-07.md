# Story acceptance gate — STORY-SPA-CAB-07-cabinet-page-states

- **Story:** STORY-SPA-CAB-07 — Cabinet Page States: New User & Load Error
- **Package:** `pkg-000037-20260728-epic-spa-07-cab-07-cabinet-page-states.yaml`
- **Result:** PASS
- **Date:** 2026-07-28T14:05:08Z
- **Scaffolded:** 2026-07-28T13:48:38Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| New user видит M23 composite (структура + local empties). | PASS | T01 + Vitest UserCabinetPage; H3 mock; live H1 |
| Profile load fail показывает M22 с Retry и Back to Board. | PASS | `AppErrorState` + E1; shell nav stays |
| Shell не коллапсирует; инженерный тон сообщений. | PASS | no `session-shell-overlay` on `/profile` for backend/network; M22 copy |
| Error codes из списка M22 §6 поддерживаемы в UI contract. | PASS | `resolveProfileLoadErrorCode` + `cabinet.common.codeLabel` |
| M22 строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет. | PASS | `cabinet.error.profileLoad.*` + dictionary test; E2 ru |

## UI acceptance (story-root + anchor T01)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec.md Path A M23 (+ M22 md) | PASS | [ui-mockup-spec.md](../task-spa-cab-07-t01-m23-composite-new-user-empty/ui-mockup-spec.md) |
| M22 Path A (spec.md; error PNG absent) | PASS | load-error-spec.md only — loading PNG not SSOT |
| Story-root screenshots index | PASS | [screenshots/README.md](../../screenshots/README.md) |
| Live happy H1 | PASS | [01-happy-live-profile-composite-1536x1024.png](../../screenshots/full-cycle/01-happy-live-profile-composite-1536x1024.png) |
| Live auth H2 | PASS | [02-happy-live-auth-success-1536x1024.png](../../screenshots/full-cycle/02-happy-live-auth-success-1536x1024.png) |
| Happy mock H3 | PASS | [03-happy-mock-m23-new-user-composite-1536x1024.png](../../screenshots/full-cycle/03-happy-mock-m23-new-user-composite-1536x1024.png) |
| Edge E1–E3 | PASS | [04](../../screenshots/full-cycle/04-edge-mock-m22-profile-load-error-1536x1024.png)·[05](../../screenshots/full-cycle/05-edge-mock-m22-locale-ru-1536x1024.png)·[06](../../screenshots/full-cycle/06-edge-mock-m22-network-error-1536x1024.png) |
| archive UI-0/3 baselines | PASS | [screenshots/archive/](../../screenshots/archive/) |
| Icons warning + retry wired | PASS | AppErrorState + Vitest |

## Commands (live verification 2026-07-28T14:05:08Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-page-states-cab07-full
```

## Notes

P3 Execute — Path A M23 md+png; M22 md-only. Loading PNG out of CAB-07 AC.
