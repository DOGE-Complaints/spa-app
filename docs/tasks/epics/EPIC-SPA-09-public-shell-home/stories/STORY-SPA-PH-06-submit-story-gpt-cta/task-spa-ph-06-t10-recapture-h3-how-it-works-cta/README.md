# SPA-PH-06-T10 — Recapture H3 How It Works Submit CTA evidence (post-audit F3)

**Status:** Done — P6 PASS 2026-08-06T09:51:14Z · H3 CTA in-view (F3)  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [audit-STORY-SPA-PH-06-execution-2026-08-06.md](../../../../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md) §F3  
**Depends on:** SPA-PH-06-T08 (script/tests in HEAD preferred)  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_06_audit_2026_08_06`  
**Scaffolded:** 2026-08-06T07:46:38Z  
**Package:** `pkg-000051` (unchanged)

## Purpose
Переснять H3 how-it-works Submit CTA evidence так, чтобы в кадре был виден `how-it-works-cta-submit` / CTA row (M133), а не только steps 01–03 выше fold.

## Risk
Changing product UI instead of capture; losing live happy H1; committing secrets.

## Code Facts (re-verify at execute)
- Current `03-happy-mock-how-it-works-submit-cta-1536x1024.png`: waits for CTA selector but `fullPage: false` → CTA below fold (audit §2.3).
- Script: [`tests/puppeteer/public-submit-ph06-full-cycle.mjs`](../../../../../../../tests/puppeteer/public-submit-ph06-full-cycle.mjs).
- Indexer: [`../screenshots/README.md`](../screenshots/README.md).

## AC / DoD
- [x] (P0) Capture uses scrollIntoView on `[data-testid="how-it-works-cta-submit"]` and/or `fullPage: true` so CTA row is visible in PNG.
- [x] (P0) New/updated H3 under `screenshots/full-cycle/`; README indexer updated (viewport/notes).
- [x] (P0) H1 live happy still present (`ls` verify).
- [x] (P0) Gate Date from `--print-utc-now`; optional commit of script+PNG if operator asks (else leave for P8).

Gate Date: 2026-08-06T09:51:14Z. Script+PNG commit deferred to P8.
Gate: [`acceptance-verification-spa-ph-06-t10.md`](./acceptance-verification-spa-ph-06-t10.md)

## Where to change
- `spa-app/tests/puppeteer/public-submit-ph06-full-cycle.mjs` (and/or dedicated H3 shot helper)
- `…/STORY-SPA-PH-06-…/screenshots/full-cycle/` + `screenshots/README.md`
- Gate: `acceptance-verification-spa-ph-06-t10.md` (create at P6)

## Out of scope
F6 board load-error backdrop (PH-07); F4 placeholder icon art; product Submit wiring (Done).

## Verification
```bash
cd spa-app && npm run test:ui:submit-ph06-full
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/full-cycle/
# Visual: H3 PNG must show how-it-works-cta-submit / CTA row
```
