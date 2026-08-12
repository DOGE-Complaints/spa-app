# Story acceptance gate — STORY-SPA-CAB-04-story-activity-card

- **Story:** STORY-SPA-CAB-04 — Story Activity Card
- **Package:** `pkg-000034-20260726-epic-spa-07-cab-04-story-activity-card.yaml`
- **Result:** PASS
- **Date:** 2026-07-26T11:31:11Z (code + UI gate); story-root screenshots PASS **2026-07-26T11:31:07Z**

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| 5 runtime states A–E реализованы как **UI layout** (кроме Submit First Story CTA). | PASS | `StoryActivityCard.jsx` states; Vitest 5 states; full-cycle H3–H5 + E1–E2 |
| Empty state: `Go to Board`, не Submit. | PASS | `story-activity-go-to-board` + `storyHandoff.cta.goToBoard`; H3/E5 |
| **Нет HTTP** к gateway в MVP; Resume Draft / data-load → `cabinet.common.comingSoon`. | PASS | no `fetch` / story-activity paths in component; Resume/retry → comingSoon notice; Vitest |
| Verify Account → `/verify` (без gateway). | PASS | `onVerify` → `navigate('/verify')`; E6 |
| Privacy rules соблюдены (нет full story text в UI). | PASS | metadata-only table; Vitest privacy assert |
| Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет. | PASS | `cabinetDictionary.js` + flat keys; cabinetDictionary test; E3/E4 locale shots |

## UI acceptance (story-root + anchor T01)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec.md Path A M45+M23 | PASS | [ui-mockup-spec.md](../task-spa-cab-04-t01-mount-story-activity-card/ui-mockup-spec.md) |
| Story-root screenshots index | PASS | [screenshots/README.md](../../screenshots/README.md) |
| Live happy H1 | PASS | [01-happy-live-profile-story-activity-1536x1024.png](../../screenshots/full-cycle/01-happy-live-profile-story-activity-1536x1024.png) |
| Live auth H2 | PASS | [02-happy-live-auth-success-1536x1024.png](../../screenshots/full-cycle/02-happy-live-auth-success-1536x1024.png) |
| Happy mock H3–H5 | PASS | [03](../../screenshots/full-cycle/03-happy-mock-story-empty-go-to-board-1536x1024.png)·[04](../../screenshots/full-cycle/04-happy-mock-story-active-history-1536x1024.png)·[05](../../screenshots/full-cycle/05-happy-mock-story-draft-coming-soon-1536x1024.png) |
| Edge E1–E6 | PASS | [06](../../screenshots/full-cycle/06-edge-mock-story-verify-required-1536x1024.png)…[11](../../screenshots/full-cycle/11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png) |
| archive UI-0/3 baselines | PASS | [screenshots/archive/](../../screenshots/archive/) |
| Icons ic-story-* / reuse | PASS | `ICONS` map + Vitest header icon |

## Commands (screenshots closed 2026-07-26T11:31:07Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run StoryActivity UserCabinetPage cabinetDictionary
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-story-cab04-full
```

- `test:ui:cabinet-story-cab04-full`: exit 0 (live H1/H2 + mock suite)
- H1 PNG on disk: verified (`ls` full-cycle)

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
