# SPA-PH-06-T09 — As-of-Done backlog §состояние (post-audit F2)

**Status:** Done — P6 PASS 2026-08-06T09:49:54Z · backlog As-of-Done (HEAD `16e7733`)  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [audit-STORY-SPA-PH-06-execution-2026-08-06.md](../../../../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md) §F2  
**Depends on:** SPA-PH-06-T08 (prefer HEAD after commit; may draft WT snapshot with HEAD caveat)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_06_audit_2026_08_06`  
**Scaffolded:** 2026-08-06T07:46:38Z  
**Package:** `pkg-000051` (unchanged)

## Purpose
Обновить backlog [STORY-SPA-PH-06-submit-story-gpt-cta.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) §«Текущее состояние» — убрать stale claim «Board CTA today: **hardcoded**…»; зафиксировать As-of-Done (helper + Board wired).

## Risk
Leaving stale hardcode sentence; inventing AC; rewriting FR/AC verbatim sections.

## Code Facts (re-verify at execute)
- Backlog lines still claim Board hardcoded GPT URL (audit §F2 / Index / docs drift).
- Pipeline story §состояние already reflects WT helper + Board hardcode removed.
- After T08: HEAD should match WT for Submit paths.

## AC / DoD
- [x] (P0) Backlog §состояние reflects helper + Board env Submit (no «today hardcoded» claim).
- [x] (P0) Note Status Done + gate/pkg; optional one-line HEAD caveat only if T08 not yet merged (should be after T08).
- [x] (P0) FR / AC / Субтаски wording **not** rewritten except checkbox/status already Done.
- [x] (P0) Gate Date from `--print-utc-now`.

Gate Date: 2026-08-06T09:49:54Z · HEAD: `16e7733`.
Gate: [`acceptance-verification-spa-ph-06-t09.md`](./acceptance-verification-spa-ph-06-t09.md)

## Where to change
- `spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md` §состояние only
- Gate: `acceptance-verification-spa-ph-06-t09.md` (create at P6)

## Out of scope
Product code; F1 commit (T08); F3 screenshots (T10); PH-07.

## Verification
```bash
rg -n "hardcoded|g-RkVU9xLWN|getStoryGpt|As-of-Done" spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md
```
