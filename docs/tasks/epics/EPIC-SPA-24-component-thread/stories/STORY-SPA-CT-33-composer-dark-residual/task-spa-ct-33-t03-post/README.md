# SPA-CT-33-T03 — Post label contrast

**Status:** Done  
**Story:** [`../STORY-SPA-CT-33-composer-dark-residual.md`](../STORY-SPA-CT-33-composer-dark-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md)  
**ui_scope:** `thread-mount` / composer · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:41:36Z`  
**Package:** `pkg-000207`  
**Path A:** Interview T5–6 · ARCHITECTURE §19 · p13UxReady

## Purpose

FR-CT-33.3: Post button label contrast — dark text on accent (icon already black) — readable.

## Code Facts (verify)

- AS-IS: `.tm-thread-composer__post` uses `--color-action-yellow` + `--color-text-primary`
- Target: confirm/adjust label contrast readable on dark · light held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN

## AC / DoD

- [x] Post label readable on accent (dark + light) · `--color-btn-on-primary`
- [x] Visual Done not claimed without OP eye · gate **BLOCK**

## Where changed

`ThreadComposer.css` Post button

## Verification

```bash
rg -n "tm-thread-composer__post|action-yellow" spa-app/src/features/thread-mount/composer/ThreadComposer.css
```
