# STORY-SPA-NS-16-default-theme-light — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-16-default-theme-light.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-16-default-theme-light.md)  
> **Status:** P5 APPLY · T01–T02 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-24T09:54:48Z` · `pkg-000221` · `activation: none` · Await P8  
> **Package:** `pkg-000221` · next-shell · Interview **M8** · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** next-shell / theme · **mixed** · Path A arch Present · Partial visual=**BLOCK** · NO BRIEF · no invent PASS  
> **Skill declared:** `react-expert`  
> **Depends:** `bootTheme.js` Present · tip after `pkg-000220`  
> **Runtime:** unset→light · stored dark held · bootTheme **7/7** · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK**

## Purpose

Default theme **light** when `dogestonia.theme` unset · stored dark/light win · no OS invent · Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NS-16.1** When `dogestonia.theme` unset (and no prior `data-theme`), default **`light`**.  
- **FR-NS-16.2** Stored `dark` / `light` still win · no OS prefers-color-scheme invent.  
- **FR-NS-16.3** Update Vitest (`bootTheme.test.js` expects dark today) · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Unset → light (structure)  
- [x] Stored dark held (structure)  
- [x] Vitest green · OP eye Absent → **BLOCK** (Partial visual)

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-16-default-theme-light.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-16-t01-default](task-spa-ns-16-t01-default/README.md) | Default unset → light | **Done** |
| T02 | [task-spa-ns-16-t02-vitest](task-spa-ns-16-t02-vitest/README.md) | Flip Vitest asserts | **Done** |

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/16-default-theme-light.md
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md
```
