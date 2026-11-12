# SPA-CT-18-T06 — Audit F2 story-root screenshots README indexer

**Status:** Done · P6 (`2026-10-20T12:27:40Z`) · P5 scaffold (`2026-10-20T12:25:15Z`) · `run_mode=spa_ct18_p5_gap`  
**Story:** [`../STORY-SPA-CT-18-depth2-token-chrome.md`](../STORY-SPA-CT-18-depth2-token-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-CT-18-execution-2026-10-20.md`](../../../../../../analysis/audit-STORY-SPA-CT-18-execution-2026-10-20.md) · **F2 High**  
**Disposition:** [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-18-2026-10-20.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-18-2026-10-20.md)  
**Package:** `pkg-000176` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `thread-mount` / `feed-lab` · docs  
**Scaffolded:** `2026-10-20T12:25:15Z`  
**run_mode:** `spa_ct18_p5_gap`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · Path A M153b A–D  
**Runtime:** P6 Done · `2026-10-20T12:27:40Z` · ui_anchor docs

## Purpose

Close audit **F2**: create story-root `screenshots/README.md` indexer linking Happy/Edge + `full-cycle/` pack (01–05 md5 Present). Docs-only · no new captures if pack Present · no invent OP PASS · no invent hex · no product code.

## Code Facts (verified at scaffold)

- Pack Present: [`../screenshots/full-cycle/`](../screenshots/full-cycle/) · README + PNG `01`–`05`
- Story-root indexer: [`../screenshots/README.md`](../screenshots/README.md) — **Present** (P6)
- Gate/checklist claim md5 ≡ full-cycle README

## Constraints

- Partial visual = BLOCK · no invent OP PASS
- No product CSS/JS · no invent hex outside M153b · `#/next/feed` OOS

## AC / DoD

- [x] Story-root `screenshots/README.md` Present
- [x] Links `full-cycle/` pack + gate/checklist
- [x] md5/claims ≡ gate · OP eye not invented

**Closed:** `2026-10-20T12:27:40Z` · [acceptance-verification-spa-ct-18-t06.md](./acceptance-verification-spa-ct-18-t06.md)

## Where to change

`spa-app/docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-18-depth2-token-chrome/screenshots/README.md`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
test -f spa-app/docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-18-depth2-token-chrome/screenshots/README.md
```
