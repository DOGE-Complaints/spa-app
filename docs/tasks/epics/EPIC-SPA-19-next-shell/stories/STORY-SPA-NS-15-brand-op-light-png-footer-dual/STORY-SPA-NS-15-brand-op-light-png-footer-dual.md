# STORY-SPA-NS-15-brand-op-light-png-footer-dual — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md)  
> **Status:** P5 APPLY · T01–T04 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-24T09:44:53Z` · `pkg-000220` · `activation: none` · Await P8  
> **Package:** `pkg-000220` · next-shell · Interview **M1·M4·M5** · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** next-shell / brand · **mixed** · Path A tip masters Present · copy only · **no invent PNG** · Partial visual=**BLOCK** · NO BRIEF · no invent PASS / mascot  
> **Skill declared:** `react-expert`  
> **Depends:** NS-14 tagline omit Present · tip masters Present · tip after `pkg-000219`  
> **Runtime:** Header+Footer tip PNG dual · footer no adjacent text · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK**

## Purpose

OP light/dark PNG promote · footer dual match header · cleanup (soft supersede NS-14 masters gap): copy tip masters → `public/assets/` · wire header+footer both themes · no invent PNG · Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NS-15.1** Copy tip masters `dogestonia-brand-{light,dark}.png` → `public/assets/` · wire **header** + **footer** both themes.  
- **FR-NS-15.2** Footer brand group: mark (+ optional wordmark **inside** asset only) · **no** separate text/tagline beside logo.  
- **FR-NS-15.3** Footer **dark** uses tip dark master (same family as header dark) — not `DOGEstonia-logo-big.png`.  
- **FR-NS-15.4** Cleanup кривых / obsolete brand files from runtime path (keep tip shelf).  
- **FR-NS-15.5** Vitest · OP eye — no invent PASS · no invent mascot.

## Acceptance Criteria (backlog verbatim)

- [x] Tip masters Present (docs shelf)  
- [x] Light+dark header+footer use promoted masters (structure)  
- [x] Footer no adjacent text  
- [x] Cleanup noted · Vitest · OP eye Absent → **BLOCK** (Partial visual)

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-15-t01-promote](task-spa-ns-15-t01-promote/README.md) | Tip → public/assets | **Done** |
| T02 | [task-spa-ns-15-t02-header](task-spa-ns-15-t02-header/README.md) | Header light+dark | **Done** |
| T03 | [task-spa-ns-15-t03-footer](task-spa-ns-15-t03-footer/README.md) | Footer dual · no text | **Done** |
| T04 | [task-spa-ns-15-t04-cleanup-vitest](task-spa-ns-15-t04-cleanup-vitest/README.md) | Cleanup · Vitest | **Done** |

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/m169-brand-source/
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md
```
