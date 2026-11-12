# SPA-CT-20-T03 — Puppeteer harness dual-append + picker

**Status:** Done · P3 (`2026-10-20T13:13:37Z`)  
**Story:** [`../STORY-SPA-CT-20-lab-audit-fixtures.md`](../STORY-SPA-CT-20-lab-audit-fixtures.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:48:51Z`  
**Package:** `pkg-000178`  
**@mockup:** [puppeteer gaps](../../../../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) · CT-16 · CT-17

## Purpose

FR-CT-20.5: Puppeteer harness asserts dual-append fixed (depends CT-16) · picker present · no synthetic-only Ready path (depends CT-17).

## Constraints

- Depends CT-16/17 for green asserts  
- No invent HTTP · no invent OP PASS · no invent MIME  
- Expand `tests/puppeteer/lab-feed-thread-*.mjs` / capture scripts

## AC / DoD

- [x] dual-append asserts green (unique ids · forest held)  
- [x] native picker present · no synthetic-only Ready  
- [x] Suite exit 0 on covered asserts (or listed WAIVE via T04)  
- [x] Visual Done not claimed without OP eye

## Where to change

`tests/puppeteer/lab-feed-thread-*.mjs` · `spa-app/scripts/tmp-ct20-*.mjs` (if needed)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# puppeteer dual-append + picker (Chrome + CT20_BASE)
```
