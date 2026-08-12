# Story acceptance gate — STORY-SPA-CAB-03-civic-status-in-cabinet

- **Story:** STORY-SPA-CAB-03 — Civic Status in Cabinet
- **Package:** `pkg-000033-20260725-epic-spa-07-cab-03-civic-status-in-cabinet.yaml`
- **Result:** PASS
- **Date:** 2026-07-25T21:40:18Z (code gate); screenshots story-root closed **2026-07-26T08:12:03Z**

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Civic block — визуально доминирующий на `/profile` (M99 hierarchy). | PASS | `UserCabinetPage.jsx` civic slot + CSS; H1 live + mock H3–H4; `[data-testid="cabinet-slot-civic"]` + `[data-civic-status-card]` |
| `phone_verified=true/false` корректно отображаются через `CivicStatusCard`. | PASS | `UserCabinetPage.test.jsx`; H3/H4 mock; live H1 from `/me` |
| CTA Verify → `/verify`; verified без лишнего prompt. | PASS | E6 navigate shot; H4 verified without Verify CTA; Vitest |
| Отдельный civic component для cabinet не создан. | PASS | Mount reuses `components/CivicStatus/CivicStatusCard.jsx` only |
| Civic strings только через `civic.*` reuse; нет дублей в `cabinet.*`. | PASS | `rg cabinet.civic` empty; E4/E5 locale shots |

## UI acceptance (story-root + anchor T01)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec.md Path A M28 | PASS | [ui-mockup-spec.md](../task-spa-cab-03-t01-mount-civic-status-card/ui-mockup-spec.md) |
| Story-root screenshots index | PASS | [screenshots/README.md](../../screenshots/README.md) |
| Live happy H1 | PASS | [01-happy-live-profile-civic-from-me-1536x1024.png](../../screenshots/full-cycle/01-happy-live-profile-civic-from-me-1536x1024.png) |
| Live auth H2 | PASS | [02-happy-live-auth-success-1536x1024.png](../../screenshots/full-cycle/02-happy-live-auth-success-1536x1024.png) |
| Happy mock H3–H5 | PASS | [03](../../screenshots/full-cycle/03-happy-mock-civic-unverified-verify-cta-1536x1024.png)·[04](../../screenshots/full-cycle/04-happy-mock-civic-verified-no-reprompt-1536x1024.png)·[05](../../screenshots/full-cycle/05-happy-mock-dashboard-civic-reuse-1536x1024.png) |
| Edge E1–E6 | PASS | [06](../../screenshots/full-cycle/06-edge-mock-civic-verification-available-1536x1024.png)…[11](../../screenshots/full-cycle/11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png) |
| archive UI-0/3 baselines | PASS | [screenshots/archive/](../../screenshots/archive/) |
| Icons ic-civic-* | PASS | `CIVIC_ICON_SRC` + Vitest icon map |

## Commands (screenshots closed 2026-07-26T08:12:03Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run UserCabinetPage CivicStatusCard civicStatusState DashboardPage
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-civic-cab03-full
```

- `test:ui:cabinet-civic-cab03-full`: exit 0 (live H1/H2 + mock suite)
- H1 PNG on disk: verified (`ls` full-cycle)

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
