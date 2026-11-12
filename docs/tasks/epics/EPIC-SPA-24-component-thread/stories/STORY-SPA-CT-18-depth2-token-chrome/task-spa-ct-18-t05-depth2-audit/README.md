# SPA-CT-18-T05 — Depth 2.0 computedStyle A–D audit

**Status:** Done  
**Story:** [`../STORY-SPA-CT-18-depth2-token-chrome.md`](../STORY-SPA-CT-18-depth2-token-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:12:55Z`  
**Package:** `pkg-000176`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §§3–6 · §8

## Purpose

FR-CT-18.6: Re-run Depth 2.0 computedStyle harness so A–D atoms **PASS** vs M153b (px honest).

## Constraints

- No invent hex · no invent OP PASS · Partial=**BLOCK** until OP eye  
- Update harness targets to M153b register if still AS-IS Drift

## AC / DoD

- [x] Depth 2.0 harness A–D PASS
- [x] Visual Done not claimed without OP eye

## Where to change

`tests/puppeteer/lab-feed-thread-visual-depth2-audit.mjs` · Path A capture as needed

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/tests/puppeteer/lab-feed-thread-visual-depth2-audit.mjs
```
