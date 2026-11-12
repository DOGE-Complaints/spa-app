# SPA-CT-19-T04 — Chip computedStyle / visual audit vs M153b §7

**Status:** Done  
**Story:** [`../STORY-SPA-CT-19-attachment-ref-token-paint.md`](../STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:32:12Z`  
**Package:** `pkg-000177`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §7

## Purpose

FR-CT-19.1–19.5: Assert Ready/Denied computedStyle vs M153b §7 · Path A shots · Partial=**BLOCK** until OP eye.

## Constraints

- No invent OP PASS · no invent MIME/HTTP  
- Hard-fail green Ready / pink-red Denied wash  
- Precedence M153b §7 > M153a raster

## AC / DoD

- [x] Chip computedStyle audit vs §7 PASS  
- [x] Path A full-cycle shots Present (structure)  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/__tests__/` · `tests/puppeteer/` · `scripts/tmp-ct19-capture.mjs` as needed

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
