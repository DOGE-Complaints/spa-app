# SPA-PH-10-T06 — As-of-Done backlog SSOT (F1)

**Status:** Done — P6 PASS 2026-08-08T08:33:15Z · F1  
**Story:** [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)  
**Decision Ref:** [audit-STORY-SPA-PH-10-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-PH-10-execution-2026-08-07.md) §F1  
**Depends on:** SPA-PH-10-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T08:22:48Z  
**Package:** `pkg-000056` (unchanged) · `run_mode=spa_ph_10_audit_2026_08_07`

## Purpose
Привести persistent SSOT в соответствие с As-of-Done после P3/P4: backlog + pipeline §Зачем / §Verified facts всё ещё present-tense «круглый mark + span» / «нет link rel=icon» при disk horizontal logo + favicon link.

## Risk
Оператор/аудит читают pre-fix circular+text / missing favicon link как текущее состояние; Done AC противоречит тексту SSOT.

## Code Facts (closed)
1. [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) L19: `logoSrc=/assets/DOGEstonia-logo-horizontal.png`; L99–105 brand `img` only (no `.header-brand-name`).
2. [`index.html`](../../../../../../../index.html) L6: `<link rel="icon" href="./favicon.png" type="image/png" />`.
3. Backlog + pipeline: **As-of-Done** vs **Historical (pre-PH-10)** — no present-tense circular+span / missing icon as current.

## Gap
Persistent SSOT drift — Medium F1 → **CLOSED**.

## AC / DoD
- [x] (P0) Backlog: §Зачем / §Verified facts — **Historical (pre-PH-10)** vs **As-of-Done (current)**; no present-tense circular+span / missing icon link as current → F1.
- [x] (P0) Pipeline story mirror sections same As-of-Done split.
- [x] (P0) No product SPA code change; close Date from `--print-utc-now` at P6.

## Where to change
- [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md)
- [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)
- [`acceptance-verification-spa-ph-10-t06.md`](./acceptance-verification-spa-ph-10-t06.md)

## Out of scope
Screenshot pack (T07 / F2); EmptyState svg (F3 WAIVED); transparent pad (F4 WAIVED); product JSX/CSS.

## Verification
```bash
rg -n "круглый|header-brand-name|без \`<link rel=\\\"icon\\\">\`|logo-big.png\` — RGBA \(BUG-02" spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md
# After fix: Historical / pre-PH-10 only; current = horizontal + favicon link
rg -n "As-of-Done|Historical|DOGEstonia-logo-horizontal|rel=.icon" spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md
```
