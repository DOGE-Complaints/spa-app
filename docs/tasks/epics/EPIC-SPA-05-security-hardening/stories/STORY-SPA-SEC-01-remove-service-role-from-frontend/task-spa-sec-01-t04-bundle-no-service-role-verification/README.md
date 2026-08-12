# SPA-SEC-01-T04 — Bundle no service_role verification

**Story:** [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Depends on:** T01, T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
После `npm run build` — scan `dist/assets/*.js` на substring `service_role` / JWT role claim `"role":"service_role"`.

## Risk
Даже без `src/` usage, leaked `VITE_*` попадает в bundle at build time.

## Code Facts (re-verify at execute)
- Vite inlines `import.meta.env.VITE_*` at build.
- T01 must purge local `.env` before build for meaningful scan.
- False positives: document if string appears in comments/docs copied to bundle (expect empty after T01).

## AC / DoD
- [ ] `npm run build` succeeds.
- [ ] `grep -r service_role spa-app/dist/assets/*.js` → empty (story AC #1, bundle half).
- [ ] Verification steps documented in task artifact or README (script optional).

## Where to change
- Build output: `spa-app/dist/assets/*.js` (verify only)
- Optional: npm script `verify:bundle:no-service-role` in `package.json`

## Out of scope
- Guard test — T03.
- Production deploy audit — T05 rotation decision.

## Verification
```bash
cd spa-app && npm run build
grep -r service_role dist/assets/*.js && exit 1 || echo "ok: bundle clean"
grep -r 'role":"service_role' dist/assets/*.js && exit 1 || echo "ok: no JWT service_role claim"
```
