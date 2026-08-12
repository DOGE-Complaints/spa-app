# SPA-BUG-02-T04 — Desktop + narrow verify

**Status:** Done — P3 PASS 2026-08-07T11:54:23Z · **P4 PARTIAL** · F2 ([audit](../../../../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-02-logo-background-mismatch.md`](../STORY-SPA-BUG-02-logo-background-mismatch.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) FR-BUG-02.2 · AC desktop + narrow  
**Depends on:** SPA-BUG-02-T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T11:41:33Z  
**Package:** `pkg-000054`

## Purpose
Подтвердить отсутствие **outer PNG pad** на desktop и narrow (strip `#111C2B` shows through).

## Code Facts (closed)
- `viewport_checks.desktop/narrow: pass` — [`evidence-…115423Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-viewports-2026-08-07T115423Z.md)
- Crops: `bug02-header-logo-crop-desktop.png` · `bug02-header-logo-crop-narrow.png`

## AC / DoD
- [x] (P0) Нет видимой **outer** подложки pad на header+footer (desktop + narrow) → FR-BUG-02.2 · AC #3.
- [x] (P0) Evidence updates viewport_checks.
- [x] (P0) No placeholder-icon sweep.

## Verification
```bash
rg -n "viewport_checks" spa-app/docs/analysis/evidence-STORY-SPA-BUG-02-viewports*
```
