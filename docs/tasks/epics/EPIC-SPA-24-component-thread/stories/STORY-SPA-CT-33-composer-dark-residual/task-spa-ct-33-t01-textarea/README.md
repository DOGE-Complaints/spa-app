# SPA-CT-33-T01 — Tokenize composer input colors

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

FR-CT-33.1: Composer textarea background + typed text contrast readable in dark (no white field + white text).

## Code Facts (verify)

- AS-IS: `ThreadComposer.css` `.tm-thread-composer__textarea` `background: #fff`
- Target: theme tokens for fill + text · dark readable · light held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN

## AC / DoD

- [x] Dark textarea typed text readable
- [x] Visual Done not claimed without OP eye · gate **BLOCK**

## Where changed

`ThreadComposer.css` (textarea)

## Verification

```bash
rg -n "tm-thread-composer__textarea|background: #fff" spa-app/src/features/thread-mount/composer/ThreadComposer.css
```
