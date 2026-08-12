# Story acceptance gate — STORY-SPA-CAB-06-contribution-layer

- **Story:** STORY-SPA-CAB-06 — Contribution Layer
- **Package:** `pkg-000036-20260727-epic-spa-07-cab-06-contribution-layer.yaml`
- **Result:** PASS
- **Date:** 2026-07-28T09:28:43Z (code + UI gate); story-root screenshots PASS **2026-07-28T09:28:43Z**

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Три модуля видны на `/profile` bottom section (UI layout). | PASS | `ContributionLayer` + Receipts/Records/Reputation; H1/H3; UserCabinetPage Vitest |
| **Нет HTTP** к contribution endpoints; клики → `cabinet.common.comingSoon`. | PASS | no fetch / no `/contribution/*`; Retry → comingSoon (E2); Vitest |
| Reputation C1 `Coming Later` / Coming soon. | PASS | default later + badge; H1/H3 |
| A1 empty без Submit Story CTA. | PASS | empty copy only; Vitest + live/mock shots |
| Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет. | PASS | `cabinet.contrib.*` + flat keys; E3/E4; dictionary tests |

## UI acceptance (story-root + anchor T01)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec.md Path A M53 (+ M23) | PASS | [ui-mockup-spec.md](../task-spa-cab-06-t01-mount-contribution-layer/ui-mockup-spec.md) |
| Story-root screenshots index | PASS | [screenshots/README.md](../../screenshots/README.md) |
| Live happy H1 | PASS | [01-happy-live-profile-contrib-stub-1536x1024.png](../../screenshots/full-cycle/01-happy-live-profile-contrib-stub-1536x1024.png) |
| Live auth H2 | PASS | [02-happy-live-auth-success-1536x1024.png](../../screenshots/full-cycle/02-happy-live-auth-success-1536x1024.png) |
| Happy mock H3–H6 | PASS | [03](../../screenshots/full-cycle/03-happy-mock-contrib-a1-b1-c1-stub-1536x1024.png)·[04](../../screenshots/full-cycle/04-happy-mock-receipts-populated-1536x1024.png)·[07](../../screenshots/full-cycle/07-happy-mock-records-populated-1536x1024.png)·[08](../../screenshots/full-cycle/08-happy-mock-reputation-available-1536x1024.png) |
| Edge E1–E4 | PASS | [05](../../screenshots/full-cycle/05-edge-mock-receipts-unavailable-1536x1024.png)…[10](../../screenshots/full-cycle/10-edge-mock-locale-ru-contrib-stub-1536x1024.png) |
| archive UI-0/3 baselines | PASS | [screenshots/archive/](../../screenshots/archive/) |
| Icons ic-contrib-* + reuse wired | PASS | ICONS map + Vitest |

## Commands (screenshots closed 2026-07-28T09:28:43Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-contrib-cab06-full
```

## Notes

- Live A2/B2 after GW-CAB-03 — **out of this gate** (DEV preview only).
- Icons #19–#21 may still be placeholder byte-size; wire paths OK.
