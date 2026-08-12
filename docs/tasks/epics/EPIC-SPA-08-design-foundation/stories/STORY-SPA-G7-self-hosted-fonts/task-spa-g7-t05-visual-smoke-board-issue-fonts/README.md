# SPA-G7-T05 — Visual smoke board + issue fonts

**Status:** ✅ Done  
**Story:** [`../STORY-SPA-G7-self-hosted-fonts.md`](../STORY-SPA-G7-self-hosted-fonts.md)  
**Decision Ref:** backlog §FR-G7.3, FR-G7.6, T05  
**Depends on:** T01–T04  
**ui_scope:** `visual`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T21:48:40Z

## Purpose
Visual smoke: board (Inter) + issue-details (JetBrains Mono на txid/hash); Network — нет CDN font requests; layout parity; `npm test` зелёный.

## Risk
FOUT/layout shift; silent CDN fallback; false-green tests without visual check.

## Code Facts (re-verify at execute)
- No `@mockup:` PNG artboard — SSOT = design-system §2.2 + ui-mockups local-assets rule.
- G4 visual pattern: screenshots under story or `screenshots/` as used by team.

## AC / DoD
- [ ] (P0) FR-G7.3/6: board shows Inter (self-hosted); issue txid/hash show JetBrains Mono.
- [ ] (P0) Network: no requests to fonts.googleapis.com / fonts.gstatic.com / other font CDNs.
- [ ] (P0) No material layout regressions vs pre-smoke.
- [ ] (P0) `npm test` green.

## Where to change
- Screenshots / smoke notes only (implementation already in T01–T04).

## Out of scope
- Doc INDEX / gap-report (T06). New font weights.

## Verification
```bash
cd spa-app && npm test
# Manual: DevTools Network filter Font; Computed font-family on body + txid
```

Gate: [`acceptance-verification-spa-g7-t05.md`](./acceptance-verification-spa-g7-t05.md)
