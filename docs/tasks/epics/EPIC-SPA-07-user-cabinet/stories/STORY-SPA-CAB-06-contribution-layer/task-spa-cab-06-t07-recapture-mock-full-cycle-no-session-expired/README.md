# SPA-CAB-06-T07 — Re-capture mock full-cycle without Session Expired

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-06-execution-2026-07-28.md`](../../../../../../analysis/audit-STORY-SPA-CAB-06-execution-2026-07-28.md) §V1  
**Depends on:** T06 Done (story gate); identity/gateway up for live segment; `USER_EMAIL` / `USER_PASSWORD` in `spa-app/.env`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T11:01:12Z  
**Completed:** 2026-07-28T11:13:39Z  
**Post-audit wave:** `run_mode=spa_cab_06_audit_2026_07_28`

## Purpose
Закрыть audit **V1**: пере-снять mock full-cycle кадры `03`–`10` так, чтобы **не** было overlay «Session Expired» / «Sessioon aegus» / «Сессия истекла»; состояния Contribution Layer (A2/A3/retry/B2/C2/et/ru + default stub) читаемы без dimmed-модалки.

## Risk
Оставить 8/10 mock-кадров с Session Expired → Done CAB-06 держит evidence, где non-default состояния видны только тускло за модалкой (evidence gap Med).

## Code Facts (re-verify at execute)
- Audit: [`audit-STORY-SPA-CAB-06-execution-2026-07-28.md`](../../../../../../analysis/audit-STORY-SPA-CAB-06-execution-2026-07-28.md) §V1 — mock `03`–`10` с Session Expired; live `01` чистый.
- Current shots: [`../screenshots/full-cycle/`](../screenshots/full-cycle/) — `03-happy-mock-…` … `10-edge-mock-locale-ru-…`.
- Runner: `npm run test:ui:cabinet-contrib-cab06-full` → [`tests/puppeteer/cabinet-contrib-cab06-full-cycle.mjs`](../../../../../../../tests/puppeteer/cabinet-contrib-cab06-full-cycle.mjs) (`seedMockAuthSession` ~L126–L173; TTL `expires_at` +3600).
- Indexer: [`../screenshots/README.md`](../screenshots/README.md).
- Gap = artifact/runner quality на mock-фазе, **не** дефект `ContributionLayer` (код+Vitest покрывают состояния; live H1 PASS).

## AC / DoD
- [x] (P0) Re-run full-cycle with identity/gateway up and `USER_*` from `.env`.
- [x] (P0) Replace `screenshots/full-cycle/03`…`10` — no Session Expired / Sessioon aegus / Сессия истекла overlay; contribution states readable.
- [x] (P0) Mock shots: account not stuck on «Not Available» when mock profile is seeded.
- [x] (P1) Harden runner if needed: assert no Session Expired text before each mock shot; re-seed JWT/`expires_at` before each capture.
- [x] (P0) Update `screenshots/README.md` capture timestamp / note for V1 re-shot.
- [x] (P1) Live `01`/`02` remain clean (or re-captured clean in same run).
- [x] (P0) [`acceptance-verification-spa-cab-06-t07.md`](./acceptance-verification-spa-cab-06-t07.md) PASS with live `Date:` post verify.

## Where to change
- `spa-app/docs/tasks/epics/.../STORY-SPA-CAB-06-contribution-layer/screenshots/full-cycle/03-*.png` … `10-*.png` (replace)
- `spa-app/docs/tasks/epics/.../STORY-SPA-CAB-06-contribution-layer/screenshots/README.md`
- Optionally harden `spa-app/tests/puppeteer/cabinet-contrib-cab06-full-cycle.mjs` (assert + re-seed)

## Out of scope
- V-code / V-content / V-icon (INFO). ContributionLayer product changes. CAB-07 P1. New pkg / active package pointer.

## Verification
```bash
cd spa-app && npm run test:ui:cabinet-contrib-cab06-full
ls docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-06-contribution-layer/screenshots/full-cycle/0{3,4,5,6,7,8,9}-*.png \
  docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-06-contribution-layer/screenshots/full-cycle/10-*.png
# visual: no Session Expired overlay on 03–10
```

Gate: [`acceptance-verification-spa-cab-06-t07.md`](./acceptance-verification-spa-cab-06-t07.md) PASS.
