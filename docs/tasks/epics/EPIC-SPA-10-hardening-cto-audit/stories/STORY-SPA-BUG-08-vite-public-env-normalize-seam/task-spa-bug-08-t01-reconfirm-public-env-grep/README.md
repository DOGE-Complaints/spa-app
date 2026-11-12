# SPA-BUG-08-T01 — Reconfirm grep inventory + `.env` space

**Status:** Done — P3 PASS 2026-08-18T11:09:52Z  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) Diagnostic playbook T01  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:05:39Z  
**Package:** `pkg-000073`

## Purpose
Reconfirm: grep inventory (backlog §Verified facts table) + local `.env` trailing space on `VITE_GATEWAY_BASE_URL` (do **not** paste secrets). File/`rg` only — not product fix.

## Risk
P3 without reconfirm pins the wrong layer (UI / H6 bake / LoginPage).

## Code Facts (re-verify at execute)

**Historical** (T01 `2026-08-18T11:09:52Z`, pre-T03):
- `src/config/publicEnv.js` **absent**.
- Raw gateway/mode: [`issueService.js`](../../../../../../../src/services/issueService.js) L30–31.
- Pulse/Emerging module raw; resolver trims L8.
- `assertBaseUrl` trim + `/+$/`: [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) L8–13.
- `supabaseClient` **no trim** L4–5.
- `.env` L20 trailing space confirmed without dumping value.
- Evidence: [`reconfirm-spa-bug-08-public-env-2026-08-18.md`](../../../../../run-reports/reconfirm-spa-bug-08-public-env-2026-08-18.md)

**As-of-Done / Current** (T03 `2026-08-18T11:11:32Z`): seam exists — see T03.

## AC / DoD
- [x] (P0) Evidence: backlog inventory table matches disk `rg` → FR-BUG-08 playbook T01 · backlog AC pin evidence. Note: [`../../../../../run-reports/reconfirm-spa-bug-08-public-env-2026-08-18.md`](../../../../../run-reports/reconfirm-spa-bug-08-public-env-2026-08-18.md)
- [x] (P0) `.env` gateway trailing space reconfirmed **without** dumping the value. Do **not** treat E4 as root (H6 / BUG-06 remains root).

## Where to change
- Short reconfirm note under `spa-app/docs/tasks/run-reports/` — written.
- No product code in T01.

## Out of scope
Paste `.env` values; treat E4 as root; T03 implement; BUG-05/06/07 product.

## Verification
```bash
cd spa-app
rg -n 'import\.meta\.env\.VITE_' src --glob '*.{js,jsx}'
test ! -f src/config/publicEnv.js && echo 'publicEnv.js absent'
```
